import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "../../../../prisma/client";
import jwt from "jsonwebtoken";

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

  const authHeader = request.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json(
      { error: "No authorization header" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: number;
    };

    const newRate = await prisma.rate.create({
      data: {
        description: body.description,
        rate: body.rate,
        userId: decoded.userId,
      },
    });

    return NextResponse.json(newRate, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create rate" },
      { status: 500 }
    );
  }
}
