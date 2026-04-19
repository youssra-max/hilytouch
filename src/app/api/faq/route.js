import { NextResponse } from "next/server";
import faqData from "../../../data/faq.json" with { type: "json" };

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  let result = [...faqData];
  if (category) {
    result = result.filter((f) => f.category === category);
  }

  // Get unique categories
  const categories = [...new Set(faqData.map((f) => f.category))];

  return NextResponse.json({ faqs: result, categories });
}
