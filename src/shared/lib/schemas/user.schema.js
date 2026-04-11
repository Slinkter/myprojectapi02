import { z } from "zod";

/**
 * Schema for the User entity based on JSONPlaceholder structure.
 * Validates the raw API response for users.
 */
export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.string().email().or(z.string()),
  phone: z.string().or(z.number().transform(val => String(val))),
  website: z.string(),
  company: z.object({
    name: z.string(),
    catchPhrase: z.string().optional(),
    ceo: z.string().optional(),
  }),
  address: z.object({
    street: z.string(),
    suite: z.string().optional(),
    city: z.string(),
    zipcode: z.string(),
    geo: z.object({
      lat: z.string(),
      lng: z.string(),
    }).optional(),
  }),
});
