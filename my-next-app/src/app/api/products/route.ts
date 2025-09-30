import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { products } from "@/lib/products";

const productSchema = z.object({
  category: z.string().min(1),
  name: z.string().min(1),
  artisan: z.string().optional(),
  rating: z.number().min(0).max(5).default(5),
  reviews: z.number().min(0).default(0),
  price: z.number().min(0),
  originalPrice: z.number().min(0).optional(),
  onSale: z.boolean().default(false),
  imageUrl: z.string().url(),
});

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const json = await req.json().catch(() => null);
  const parsed = productSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ errors: parsed.error.flatten() }, { status: 400 });
  }
  const body = parsed.data;
  const newProduct = {
    id: products.length + 1,
    category: body.category,
    name: body.name,
    artisan: body.artisan ?? (session.user.name ?? "Unknown"),
    rating: body.rating,
    reviews: body.reviews,
    price: body.price,
    originalPrice: body.onSale ? body.originalPrice : undefined,
    onSale: body.onSale,
    imageUrl: body.imageUrl,
    sellerId: (session.user as any).id ?? "",
  };
  products.push(newProduct);
  return NextResponse.json(newProduct, { status: 201 });
}
