/**
 * Validates data against a given Zod schema.
 * If validation fails, it returns null and logs the error.
 * This ensures that corrupted API data does not crash the application.
 * 
 * @function validateSchema
 * @param {any} data - Data to validate.
 * @param {z.ZodSchema} schema - Zod schema to validate against.
 * @returns {any|null} Validated data if successful, otherwise null.
 */
export const validateSchema = (data, schema) => {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error("Schema Validation Error:", result.error.format());
    return null;
  }
  return result.data;
};

/**
 * Validates an array of items against a Zod schema.
 * Filters out any items that fail validation.
 * 
 * @function validateSchemaArray
 * @param {any[]} dataArray - Array of data to validate.
 * @param {z.ZodSchema} schema - Zod schema for individual items.
 * @returns {any[]} Array containing only the successfully validated items.
 */
export const validateSchemaArray = (dataArray, schema) => {
  if (!Array.isArray(dataArray)) return [];
  return dataArray
    .map(item => schema.safeParse(item))
    .filter(result => result.success)
    .map(result => result.data);
};
