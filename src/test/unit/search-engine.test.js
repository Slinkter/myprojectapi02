import { describe, it, expect } from "vitest";
import { resolveSearchQuery } from "@/features/user-search/services/search-engine";

describe("resolveSearchQuery", () => {
  /**
   * Test Case: Should resolve a numeric input as a user ID.
   */
  it("should resolve a numeric input as a user ID", () => {
    // Arrange
    const input = "123";
    const cachedUsers = {};

    // Act
    const result = resolveSearchQuery(input, cachedUsers);

    // Assert
    expect(result).toBe(123);
  });

  /**
   * Test Case: Should resolve a username to a user ID when the user is in the cache.
   */
  it("should resolve a username to a user ID when the user is in the cache", () => {
    // Arrange
    const input = "JohnDoe";
    const cachedUsers = {
      janedoe: 1,
      johndoe: 2,
    };

    // Act
    const result = resolveSearchQuery(input, cachedUsers);

    // Assert
    expect(result).toBe(2);
  });

  /**
   * Test Case: Should resolve a username regardless of casing when in cache.
   */
  it("should resolve a username regardless of casing when in cache", () => {
    // Arrange
    const input = "johndoe";
    const cachedUsers = { johndoe: 2 };

    // Act
    const result = resolveSearchQuery(input, cachedUsers);

    // Assert
    expect(result).toBe(2);
  });

  /**
   * Test Case: Should return null if the input is empty or whitespace.
   */
  it("should return null if the input is empty or whitespace", () => {
    // Arrange
    const input = "   ";
    const cachedUsers = {};

    // Act
    const result = resolveSearchQuery(input, cachedUsers);

    // Assert
    expect(result).toBeNull();
  });

  /**
   * Test Case: Should return null if the username is not found in the cache.
   */
  it("should return null if the username is not found in the cache", () => {
    // Arrange
    const input = "UnknownUser";
    const cachedUsers = { janedoe: 1 };

    // Act
    const result = resolveSearchQuery(input, cachedUsers);

    // Assert
    expect(result).toBeNull();
  });
});