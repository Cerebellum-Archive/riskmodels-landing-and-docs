"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    // Lakukan logic auth di sini jika perlu, lalu redirect
    router.replace("/");
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-muted-foreground">Signing you in...</div>
    </div>
  );
}