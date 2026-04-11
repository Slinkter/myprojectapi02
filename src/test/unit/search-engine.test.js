import { describe, it, expect } from "vitest";
import { resolveSearchQuery } from "@/entities/user/domain/search-engine";

describe("resolveSearchQuery", () => {
  it("should resolve a numeric input as a user ID", () => {
    expect(resolveSearchQuery("123")).toBe(123);
  });

  it("should resolve a username to a user ID when the user is in the cache", () => {
    const cache = { johndoe: 2 };
    expect(resolveSearchQuery("JohnDoe", cache)).toBe(2);
  });

  it("should resolve a username regardless of casing when in cache", () => {
    const cache = { johndoe: 2 };
    expect(resolveSearchQuery("johndoe", cache)).toBe(2);
  });

  it("should return null if the input is empty or whitespace", () => {
    expect(resolveSearchQuery("   ")).toBeNull();
  });

  it("should return null if the username is not found in the cache", () => {
    expect(resolveSearchQuery("UnknownUser", {})).toBeNull();
  });
});
