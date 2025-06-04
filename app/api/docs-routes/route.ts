// app/api/docs-routes/route.ts
import { getDocsRoutes } from "@/lib/docs-routes";
import { NextResponse } from "next/server";

export async function GET() {
  const routes = getDocsRoutes();
  return NextResponse.json(routes);
}
