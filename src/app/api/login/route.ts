import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const user = await prisma.user.findUnique({ where: { email: body.email } });
    // check for user not found
    if (!user) {
      return NextResponse.json(
        { error: "User is not found!" },
        { status: 400 }
      );
    }

    // check for valid password
    const validPassword = await bcrypt.compare(body.password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Wrong Password!" }, { status: 400 });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "5m",
    });

    return NextResponse.json(
      { token, message: "logged in successfully!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "login failed" }, { status: 500 });
  }
}
