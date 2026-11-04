import { auth } from "./auth";
import { UnauthorizedError } from "@/lib/error/api-error";

export async function getCurrentUser() {
  const session = await auth();
  return session?.user ?? null;
}

export async function requireAuthUser() {
  const user = await getCurrentUser();
  if (!user || !user.id) {
    throw new UnauthorizedError("Sesi login Anda tidak valid atau telah berakhir");
  }
  return user as typeof user & { id: string };
}

