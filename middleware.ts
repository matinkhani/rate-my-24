import { NextResponse } from "next/server";

export function middleware(request: Request) {
  console.log("running");
  return NextResponse.next();
}
