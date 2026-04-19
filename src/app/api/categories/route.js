import { NextResponse } from "next/server";
import categories from "../../../data/categories.json" with { type: "json" };

// GET /api/categories — returns all categories
export async function GET() {
  return NextResponse.json(categories);
}
