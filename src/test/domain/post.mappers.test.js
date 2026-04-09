import { describe, it, expect } from "vitest";
import { mapPost, mapRawPosts } from "@/entities/post/domain/post.mappers";

describe("Post Mappers", () => {
  const validRawPost = {
    userId: 1,
    id: 1,
    title: "sunt aut facere repellat provident occaecati excepturi",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum"
  };

  describe("mapPost", () => {
    it("should map a valid raw post to a domain post", () => {
      const result = mapPost(validRawPost);
      expect(result).toEqual({
        id: 1,
        userId: 1,
        title: "sunt aut facere repellat provident occaecati excepturi",
        body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum"
      });
    });

    it("should return null for invalid data that fails PostSchema validation", () => {
      const invalidPost = { id: "not-a-number" };
      expect(mapPost(invalidPost)).toBeNull();
    });

    it("should return null for null or undefined input", () => {
      expect(mapPost(null)).toBeNull();
      expect(mapPost(undefined)).toBeNull();
    });
  });

  describe("mapRawPosts", () => {
    it("should map an array of raw posts", () => {
      const rawPosts = [validRawPost, { ...validRawPost, id: 2 }];
      const result = mapRawPosts(rawPosts);
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe(1);
      expect(result[1].id).toBe(2);
    });

    it("should filter out invalid posts from the array", () => {
      const rawPosts = [validRawPost, { id: "invalid" }, null, { ...validRawPost, id: 2 }];
      const result = mapRawPosts(rawPosts);
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe(1);
      expect(result[1].id).toBe(2);
    });

    it("should return an empty array if input is not an array", () => {
      expect(mapRawPosts(null)).toEqual([]);
      expect(mapRawPosts({})).toEqual([]);
      expect(mapRawPosts("string")).toEqual([]);
    });
  });
});
