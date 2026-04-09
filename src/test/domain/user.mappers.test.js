import { describe, it, expect } from "vitest";
import { mapRawUser, mapRawUsers } from "@/entities/user/domain/user.mappers";

describe("User Mappers", () => {
  const validRawUser = {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
      name: "Romaguera-Simpson",
      catchPhrase: "Multi-layered client-server neural-net",
      ceo: "Cameronresnet"
    },
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "//92999-1196",
      geo: { lat: "-37.3159", lng: "81.1496" }
    }
  };

  describe("mapRawUser", () => {
    it("should map a valid raw user to a domain user", () => {
      const result = mapRawUser(validRawUser);
      expect(result).toEqual({
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz",
        phone: "1-770-736-8031 x56442",
        website: "hildegard.org",
        company: {
          name: "Romaguera-Simpson",
          catchPhrase: "Multi-layered client-server neural-net"
        },
        address: {
          street: "Kulas Light",
          suite: "Apt. 556",
          city: "Gwenborough",
          zipcode: "//92999-1196"
        }
      });
    });

    it("should return null for null or undefined input", () => {
      expect(mapRawUser(null)).toBeNull();
      expect(mapRawUser(undefined)).toBeNull();
    });

    it("should return null for invalid data that fails Zod validation", () => {
      const invalidUser = { id: "not-a-number" };
      expect(mapRawUser(invalidUser)).toBeNull();
    });

    it("should provide 'Unknown' or 'N/A' for optional or missing fields that pass schema but are empty (if applicable)", () => {
      // Based on the implementation of mapRawUser:
      // name: data.name || "Unknown"
      // This means if name is an empty string, it becomes "Unknown"
      const rawUserWithEmptyStrings = {
        ...validRawUser,
        name: "",
        username: "",
        email: "",
        phone: "",
        website: "",
        company: { name: "", catchPhrase: "" },
        address: { street: "", suite: "", city: "", zipcode: "" }
      };
      const result = mapRawUser(rawUserWithEmptyStrings);
      expect(result.name).toBe("Unknown");
      expect(result.username).toBe("Unknown");
      expect(result.email).toBe("Unknown");
      expect(result.phone).toBe("Unknown");
      expect(result.website).toBe("Unknown");
      expect(result.company.name).toBe("Unknown");
      expect(result.company.catchPhrase).toBe("Unknown");
      expect(result.address.street).toBe("Unknown");
      expect(result.address.suite).toBe("N/A");
      expect(result.address.city).toBe("Unknown");
      expect(result.address.zipcode).toBe("Unknown");
    });
  });

  describe("mapRawUsers", () => {
    it("should map an array of raw users", () => {
      const rawUsers = [validRawUser, { ...validRawUser, id: 2 }];
      const result = mapRawUsers(rawUsers);
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe(1);
      expect(result[1].id).toBe(2);
    });

    it("should filter out invalid users from the array", () => {
      const rawUsers = [validRawUser, { id: "invalid" }, null, { ...validRawUser, id: 2 }];
      const result = mapRawUsers(rawUsers);
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe(1);
      expect(result[1].id).toBe(2);
    });

    it("should return an empty array if input is not an array", () => {
      expect(mapRawUsers(null)).toEqual([]);
      expect(mapRawUsers({})).toEqual([]);
      expect(mapRawUsers("string")).toEqual([]);
    });
  });
});
