import { describe, it, expect } from "vitest";
import { isNumericId, findUserByUsername, resolveSearchQuery } from "@/features/user-search/services/search-engine";

describe("Search Engine", () => {
  const cachedUsers = {
    "bret": 1,
    "antonette": 2,
    "samantha": 3
  };

  describe("isNumericId", () => {
    it("should return true for strings containing only digits", () => {
      expect(isNumericId("123")).toBe(true);
      expect(isNumericId("1")).toBe(true);
      expect(isNumericId("0")).toBe(true);
    });

    it("should return false for strings with non-digit characters", () => {
      expect(isNumericId("123a")).toBe(false);
      expect(isNumericId("a123")).toBe(false);
      expect(isNumericId("12.3")).toBe(false);
      expect(isNumericId("-123")).toBe(false);
      expect(isNumericId(" ")).toBe(false);
      expect(isNumericId("")).toBe(false);
    });
  });

  describe("findUserByUsername", () => {
    it("should find the user ID by username (case-insensitive)", () => {
      expect(findUserByUsername("Bret", cachedUsers)).toBe(1);
      expect(findUserByUsername("bret", cachedUsers)).toBe(1);
      expect(findUserByUsername("BRET", cachedUsers)).toBe(1);
      expect(findUserByUsername("Antonette", cachedUsers)).toBe(2);
    });

    it("should return null if user is not found", () => {
      expect(findUserByUsername("Unknown", cachedUsers)).toBeNull();
    });

    it("should return null if cachedUsers is not an object", () => {
      expect(findUserByUsername("Bret", null)).toBeNull();
      expect(findUserByUsername("Bret", "string")).toBeNull();
    });
  });

  describe("resolveSearchQuery", () => {
    it("should resolve a numeric ID string to a number", () => {
      expect(resolveSearchQuery("123", {})).toBe(123);
      expect(resolveSearchQuery(" 456 ", {})).toBe(456);
    });

    it("should resolve a username to an ID using cached users", () => {
      expect(resolveSearchQuery("Bret", cachedUsers)).toBe(1);
      expect(resolveSearchQuery(" antonette ", cachedUsers)).toBe(2);
    });

    it("should return null for empty or whitespace-only strings", () => {
      expect(resolveSearchQuery("", cachedUsers)).toBeNull();
      expect(resolveSearchQuery("   ", cachedUsers)).toBeNull();
    });

    it("should return null for non-string inputs", () => {
      expect(resolveSearchQuery(null, cachedUsers)).toBeNull();
      expect(resolveSearchQuery(123, cachedUsers)).toBeNull();
      expect(resolveSearchQuery({}, cachedUsers)).toBeNull();
    });

    it("should return null if neither numeric ID nor username match", () => {
      expect(resolveSearchQuery("UnknownUser", cachedUsers)).toBeNull();
      expect(resolveSearchQuery("not-a-number-or-user", {})).toBeNull();
    });
  });
});
