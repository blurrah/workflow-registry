import { z, type ZodSchema } from "zod"
import { FatalError } from "workflow"

interface ValidateDataParams {
  data: unknown
  schema: ZodSchema
}

/**
 * Validate data against a Zod schema with clear error messages.
 *
 * This step is useful for ensuring data quality at various stages
 * of your workflow. It throws FatalError on validation failures since
 * invalid data typically indicates a configuration or logic error.
 *
 * @param data - The data to validate
 * @param schema - Zod schema to validate against
 * @returns Validated and typed data
 */
export async function validateData({ data, schema }: ValidateDataParams) {
  "use step"

  try {
    const validatedData = schema.parse(data)

    return {
      valid: true,
      data: validatedData,
    }
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map((err) => `${err.path.join(".")}: ${err.message}`).join(", ")

      throw new FatalError(`Validation failed: ${errorMessages}`)
    }

    throw new FatalError("Unknown validation error")
  }
}
