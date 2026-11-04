import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import bcrypt from "bcryptjs";
import { registerSchema } from "@/lib/validation/auth.schema";
import { handleApiError, ValidationError } from "@/lib/error/api-error";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = registerSchema.parse(body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      throw new ValidationError("Email ini sudah terdaftar. Silakan login.");
    }

    // Hash password with bcrypt
    const passwordHash = await bcrypt.hash(validatedData.password, 12);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: newUser,
        message: "Akun berhasil didaftarkan. Silakan login.",
      },
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}

