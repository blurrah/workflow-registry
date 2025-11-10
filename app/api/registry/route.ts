import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function GET() {
  const registryPath = path.join(process.cwd(), "registry.json");
  const registry = JSON.parse(fs.readFileSync(registryPath, "utf-8"));
  return NextResponse.json(registry);
}
