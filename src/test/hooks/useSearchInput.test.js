import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSearchInput } from "@/features/user-search/hooks/useSearchInput";

describe("useSearchInput", () => {
  it("should initialize with the given initial value", () => {
    const initialValue = "test-search";
    const { result } = renderHook(() => useSearchInput(initialValue));
    expect(result.current.searchValue).toBe(initialValue);
  });

  it("should update searchValue immediately on input change", () => {
    const { result } = renderHook(() => useSearchInput());
    const event = { target: { value: "new-value" } };

    act(() => {
      result.current.onInputChange(event);
    });

    expect(result.current.searchValue).toBe("new-value");
  });

  it("should set helperMessage and hasError after debounce delay", async () => {
    const { result } = renderHook(() => useSearchInput());
    
    // Valid Numeric ID (within range 1-10)
    act(() => {
      result.current.onInputChange({ target: { value: "5" } });
    });

    expect(result.current.helperMessage).toBe("Buscando por ID numérico.");
    expect(result.current.hasError).toBe(false);

    // Invalid Numeric ID (out of range)
    act(() => {
      result.current.onInputChange({ target: { value: "99" } });
    });

    expect(result.current.hasError).toBe(true);
    expect(result.current.helperMessage).toContain("La API solo soporta IDs");

    // Text search
    act(() => {
      result.current.onInputChange({ target: { value: "John Doe" } });
    });

    expect(result.current.helperMessage).toBe("Buscando por nombre o usuario.");
    expect(result.current.hasError).toBe(false);
  });

  it("should clear helperMessage and hasError when input is empty", async () => {
    const { result } = renderHook(() => useSearchInput());

    act(() => {
      result.current.onInputChange({ target: { value: "5" } });
    });
    expect(result.current.helperMessage).not.toBe("");

    act(() => {
      result.current.onInputChange({ target: { value: "" } });
    });

    expect(result.current.helperMessage).toBe("");
    expect(result.current.hasError).toBe(false);
  });

  it("should update searchValue manually using setSearchValue", () => {
    const { result } = renderHook(() => useSearchInput());
    
    act(() => {
      result.current.setSearchValue("manual-update");
    });

    expect(result.current.searchValue).toBe("manual-update");
  });
});
