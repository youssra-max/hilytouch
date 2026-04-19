import { NextResponse } from "next/server";
import products from "../../../data/products.json" with { type: "json" };

// GET /api/products — returns all products, with optional filters
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type"); // e.g. "soins-visage"
  const featured = searchParams.get("featured"); // "true"
  const isNew = searchParams.get("new"); // "true"

  let result = [...products];

  if (type && type !== "all") {
    result = result.filter((p) => p.type === type);
  }

  if (featured === "true") {
    result = result.filter((p) => p.isFeatured);
  }

  if (isNew === "true") {
    result = result.filter((p) => p.isNew);
  }

  return NextResponse.json(result);
}
