import { NextResponse } from "next/server";
import { ZodError } from "zod";

export class AppError extends Error {
  constructor(
    public override message: string,
    public statusCode: number = 500,
    public code: string = "INTERNAL_SERVER_ERROR",
    public details?: unknown
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, 400, "VALIDATION_ERROR", details);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = "Autentikasi diperlukan untuk mengakses resource ini") {
    super(message, 401, "UNAUTHORIZED");
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = "Anda tidak memiliki akses ke resource ini") {
    super(message, 403, "FORBIDDEN");
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = "Resource tidak ditemukan") {
    super(message, 404, "NOT_FOUND");
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = "Terlalu banyak request. Silakan coba beberapa saat lagi.") {
    super(message, 429, "RATE_LIMIT_EXCEEDED");
  }
}

export class AIProviderError extends AppError {
  constructor(message: string = "Layanan AI mengalami kendala sementara", details?: unknown) {
    super(message, 502, "AI_PROVIDER_ERROR", details);
  }
}

export function handleApiError(error: unknown) {
  // Rethrow Next.js internal signals (such as prerendering abort, DynamicServerError, hanging promises)
  if (
    error &&
    typeof error === "object" &&
    "digest" in error &&
    typeof (error as { digest: unknown }).digest === "string"
  ) {
    throw error;
  }

  // Zod Validation Error
  if (error instanceof ZodError) {
    const formattedDetails = error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));

    return NextResponse.json(
      {
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "Data input tidak valid",
          details: formattedDetails,
        },
      },
      { status: 400 }
    );
  }

  // AppError instance
  if (error instanceof AppError) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: error.code,
          message: error.message,
          ...(error.details ? { details: error.details } : {}),
        },
      },
      { status: error.statusCode }
    );
  }

  // Unexpected server error (log internally, do not leak raw stack in production)
  console.error("[API_UNHANDLED_EXCEPTION]", error);

  return NextResponse.json(
    {
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Terjadi kesalahan internal pada server",
      },
    },
    { status: 500 }
  );
}

