import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export const runtime = "edge"; // Vercel Blob works great on edge

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Create a unique filename preserving extension
    const ext = file.name.includes(".") ? file.name.split(".").pop() : undefined;
    const now = Date.now();
    const random = Math.random().toString(36).slice(2, 8);
    const filename = `products/${now}-${random}${ext ? "." + ext : ""}`;

    // Upload to Vercel Blob as public
    const blob = await put(filename, file, { access: "public" });

    return NextResponse.json({ url: blob.url, pathname: blob.pathname });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
