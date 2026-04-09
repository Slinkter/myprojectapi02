import { z } from "zod";

/**
 * Schema for the Post entity based on JSONPlaceholder structure.
 * Validates the raw API response for posts.
 */
export const PostSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string(),
});
