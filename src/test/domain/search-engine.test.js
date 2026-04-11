import { describe, it, expect } from "vitest";
import { isNumericId, findUserByUsername, resolveSearchQuery } from "@/entities/user/domain/search-engine";

describe("Search Engine", () => {
  const cachedUsers = {
    bret: 1,
    antonette: 2,
  };

  describe("isNumericId", () => {
    it("should return true for numeric strings", () => {
      expect(isNumericId("123")).toBe(true);
      expect(isNumericId("0")).toBe(true);
    });

    it("should return false for alphanumeric strings", () => {
      expect(isNumericId("abc")).toBe(false);
      expect(isNumericId("12a")).toBe(false);
    });
  });

  describe("findUserByUsername", () => {
    it("should return the ID for a matching username (case-insensitive)", () => {
      expect(findUserByUsername("Bret", cachedUsers)).toBe(1);
      expect(findUserByUsername("bret", cachedUsers)).toBe(1);
    });

    it("should return null for non-matching usernames", () => {
      expect(findUserByUsername("unknown", cachedUsers)).toBeNull();
    });

    it("should return null if cache is invalid", () => {
      expect(findUserByUsername("bret", null)).toBeNull();
    });
  });

  describe("resolveSearchQuery", () => {
    it("should resolve a numeric ID string to a number", () => {
      expect(resolveSearchQuery("123", cachedUsers)).toBe(123);
      expect(resolveSearchQuery(" 456 ", cachedUsers)).toBe(456);
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
      expect(resolveSearchQuery("not-a-number-or-user", cachedUsers)).toBeNull();
    });
  });
});
