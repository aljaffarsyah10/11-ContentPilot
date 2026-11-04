import { describe, it, expect } from "vitest";
import bcrypt from "bcryptjs";

describe("Integration: Authentication & Password Hashing", () => {
  it("should securely hash a password with salt rounds >= 10", async () => {
    const rawPassword = "securePassword123!";
    const hash = await bcrypt.hash(rawPassword, 12);

    expect(hash).not.toBe(rawPassword);
    expect(hash.startsWith("$2")).toBe(true); // bcrypt signature
  });

  it("should successfully compare correct password against hash", async () => {
    const rawPassword = "superSecretPassword";
    const hash = await bcrypt.hash(rawPassword, 10);

    const isMatch = await bcrypt.compare(rawPassword, hash);
    expect(isMatch).toBe(true);
  });

  it("should fail comparison for wrong password", async () => {
    const rawPassword = "correctPassword";
    const hash = await bcrypt.hash(rawPassword, 10);

    const isMatch = await bcrypt.compare("wrongPassword", hash);
    expect(isMatch).toBe(false);
  });
});

