import { NextResponse } from "next/server";
import categories from "../../../../data/categories.json" with { type: "json" };
import products from "../../../../data/products.json" with { type: "json" };

// GET /api/categories/:id — returns a single category + its products
export async function GET(request, { params }) {
  const { id } = await params;
  const category = categories.find((c) => c.id === id);

  if (!category) {
    return NextResponse.json(
      { error: "Catégorie non trouvée" },
      { status: 404 },
    );
  }

  // Get products that belong to this category
  const categoryProducts = products.filter((p) => p.type === id);

  return NextResponse.json({ category, products: categoryProducts });
}
