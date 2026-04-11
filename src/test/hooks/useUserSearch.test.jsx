import { describe, it, expect, vi } from "vitest";
import { act } from "@testing-library/react";
import { useUserSearch } from "@/features/user-search/hooks/useUserSearch";
import { fetchUserAndPosts, fetchUsersList } from "@/entities/user/store/user.thunks";
import { renderHookWithProviders } from "../test-utils";

const createMockThunkResult = () => {
  const promise = Promise.resolve({});
  promise.abort = vi.fn();
  promise.unwrap = vi.fn().mockResolvedValue({});
  promise.catch = vi.fn().mockReturnValue(promise);
  return promise;
};

vi.mock("@/entities/user/store/user.thunks", () => ({
  fetchUserAndPosts: vi.fn(() => () => createMockThunkResult()),
  fetchUsersList: vi.fn(() => () => createMockThunkResult()),
}));

describe("useUserSearch", () => {
  const preloadedState = {
    user: {
      currentUser: null,
      fetchStatus: "idle",
      error: null,
      cachedUsersByUsername: { testuser: 10 },
    },
    post: {
        posts: [],
        fetchStatus: "idle",
        error: null,
        currentUserId: null
    }
  };

  it("should fetch users list on mount", () => {
    renderHookWithProviders(() => useUserSearch(1), { preloadedState });
    expect(fetchUsersList).toHaveBeenCalled();
  });

  it("should fetch initial user when initialUserId is provided", () => {
    const initialUserId = 1;
    renderHookWithProviders(() => useUserSearch(initialUserId), { preloadedState });
    expect(fetchUserAndPosts).toHaveBeenCalledWith(initialUserId);
  });

  it("should dispatch fetchUserAndPosts when search term is provided", () => {
    const { result } = renderHookWithProviders(() => useUserSearch(), { preloadedState });
    const searchTerm = "123";

    act(() => {
      result.current.performSearch(searchTerm);
    });

    expect(fetchUserAndPosts).toHaveBeenCalledWith(searchTerm);
  });

  it("should dispatch fetchUserAndPosts even for nonexistent terms (it fails inside thunk)", () => {
    vi.mocked(fetchUserAndPosts).mockClear();
    const { result } = renderHookWithProviders(() => useUserSearch(), { preloadedState });
    const searchTerm = "nonexistent";
    
    act(() => {
      result.current.performSearch(searchTerm);
    });

    expect(fetchUserAndPosts).toHaveBeenCalledWith(searchTerm);
  });
});
