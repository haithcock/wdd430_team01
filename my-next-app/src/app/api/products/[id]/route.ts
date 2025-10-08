import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../lib/auth";
import postgres from "postgres";
import { del as delBlob } from "@vercel/blob";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export const runtime = 'nodejs';

export async function DELETE(
  request: NextRequest,
  context: any
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const maybeParams = context?.params;
  const params = (maybeParams && typeof maybeParams.then === 'function')
    ? await maybeParams
    : maybeParams;
  const { id } = params ?? {};
  const idNum = Number(id);
  if (!Number.isFinite(idNum)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const artisan = session.user.name ?? "";

  // Fetch image URL first to delete from Blob after DB delete
  const rows = await sql`
    SELECT image_url FROM products WHERE product_id = ${idNum} AND artisan = ${artisan}
  `;
  if (!Array.isArray(rows) || rows.length === 0) {
    return new NextResponse("Not found", { status: 404 });
  }
  const imageUrl: string | null = (rows[0] as any).image_url ?? null;

  // Delete the row
  const deleted = await sql`
    DELETE FROM products
    WHERE product_id = ${idNum} AND artisan = ${artisan}
    RETURNING product_id
  `;
  if (!Array.isArray(deleted) || deleted.length === 0) {
    return new NextResponse("Not found", { status: 404 });
  }

  // Best-effort delete from Vercel Blob if the URL points there
  if (imageUrl && imageUrl.includes("vercel-storage.com")) {
    try {
      await delBlob(imageUrl);
    } catch {
      // ignore blob deletion errors to not block DB deletion response
    }
  }

  return new NextResponse(null, { status: 204 });
}
