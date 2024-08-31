import bcrypt from "bcrypt";
import prisma from "../../../../prisma/client";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const hashedPassword = await bcrypt.hash(body.password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
      },
    });

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    // Return user data and token
    return NextResponse.json(
      { user: { name: user.name, email: user.email }, token },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "user registration failed" },
      { status: 500 }
    );
  }
}
