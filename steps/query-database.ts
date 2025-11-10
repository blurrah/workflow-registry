import { FatalError } from "workflow"

interface QueryDatabaseOptions {
  query: string
  params?: any[]
}

/**
 * Execute SQL queries against PostgreSQL database
 *
 * @example
 * const users = await queryDatabase({
 *   query: 'SELECT * FROM users WHERE created_at > $1',
 *   params: [new Date('2024-01-01')]
 * });
 */
export async function queryDatabase(options: QueryDatabaseOptions) {
  "use step"

  const { query, params = [] } = options
  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) {
    throw new FatalError("DATABASE_URL environment variable is required")
  }

  if (!query) {
    throw new FatalError("query is required")
  }

  // Use @vercel/postgres for serverless environments
  const { sql } = await import("@vercel/postgres")

  try {
    // Execute query with parameters
    const result = await sql.query(query, params)

    return {
      rows: result.rows,
      rowCount: result.rowCount,
      fields: result.fields?.map((f) => f.name),
    }
  } catch (error) {
    if (error instanceof Error) {
      // Check if it's a constraint violation or other fatal error
      if (error.message.includes("constraint") || error.message.includes("syntax")) {
        throw new FatalError(`Database error: ${error.message}`)
      }
      throw error
    }
    throw new Error("Unknown database error")
  }
}
