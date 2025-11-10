import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET() {
  const registryPath = path.join(process.cwd(), "public", "registry.json")
  const registry = JSON.parse(fs.readFileSync(registryPath, "utf-8"))
  return NextResponse.json(registry)
}
