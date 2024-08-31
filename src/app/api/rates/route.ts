import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "../../../../prisma/client";

const createRateSchema = z.object({
  rate: z.number(),
  description: z.string().min(1),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createRateSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const newRate = await prisma.rate.create({
    data: {
      description: body.description,
      rate: body.rate,
    },
  });

  return NextResponse.json(newRate, { status: 201 });
}
