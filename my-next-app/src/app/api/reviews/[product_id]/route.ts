// src/app/api/reviews/[product_id]/route.ts
import { NextResponse } from "next/server";
import { getReviewsByProduct } from "../../../../../lib/data";

export async function GET(
  req: Request,
  context: { params: Promise<{ product_id: string }> }
) {
  const { product_id } = await context.params;
  if (!product_id) {
    return NextResponse.json({ error: "Invalid product id" }, { status: 400 });
  }

  try {
    const reviews = await getReviewsByProduct(product_id);
    return NextResponse.json(reviews);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
