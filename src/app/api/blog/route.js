import { NextResponse } from 'next/server';
import blogData from '../../../data/blog.json' with { type: 'json' };

export async function GET() {
  // Return articles sorted by date (newest first)
  const articles = [...blogData].sort((a, b) => new Date(b.date) - new Date(a.date));
  return NextResponse.json(articles);
}
