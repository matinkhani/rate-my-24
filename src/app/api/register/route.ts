import bcrypt from "bcrypt";
import prisma from "../../../../prisma/client";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    // check for existing user
    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "user is already exist! try with another email." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

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
      {
        user: { name: user.name, email: user.email },
        token,
        message: "registered successfully.",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "user registration failed" },
      { status: 500 }
    );
  }
}
