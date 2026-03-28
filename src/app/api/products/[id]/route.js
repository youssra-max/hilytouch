import { NextResponse } from 'next/server';
import products from '../../../../data/products.json' with { type: 'json' };

// GET /api/products/:id — returns a single product by ID
export async function GET(request, { params }) {
  const { id } = await params;
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return NextResponse.json(
      { error: 'Produit non trouvé' },
      { status: 404 }
    );
  }

  // Also include related products (same type, exclude current)
  const related = products
    .filter(p => p.type === product.type && p.id !== product.id)
    .slice(0, 4);

  return NextResponse.json({ product, related });
}
