"use client";
import { signIn } from "next-auth/react";
import Button from "@/app/ui/Button";

export default function SignInPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-white via-orange-100 to-red-50">
      <div className="w-full max-w-md rounded-xl border border-gray-200 p-8 shadow-sm bg-white">
        <h1 className="text-2xl font-extrabold mb-2">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FB923C] to-[#EF4444]">
            Sign in
          </span>
        </h1>
        <p className="text-gray-600 mb-6">Sign in to list and manage your products.</p>
        <Button className="w-full" onClick={() => signIn("google", { callbackUrl: "/sell" })}>
          Continue with Google
        </Button>
      </div>
    </main>
  );
}
