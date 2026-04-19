import { NextResponse } from "next/server";
import blogData from "../../../../data/blog.json" with { type: "json" };

export async function GET(request, { params }) {
  const { slug } = await params;
  const article = blogData.find((a) => a.slug === slug);

  if (!article) {
    return NextResponse.json({ error: "Article non trouvé" }, { status: 404 });
  }

  return NextResponse.json(article);
}
