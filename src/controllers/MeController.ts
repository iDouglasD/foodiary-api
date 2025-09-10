import { eq } from "drizzle-orm";
import { db } from "../db";
import { HttpResponse, ProtectedHttpRequest } from "../types/Http";
import { notFound, ok } from "../utils/http";
import { usersTable } from "../db/schema";

export class MeController {
  static async handle({ userId }: ProtectedHttpRequest): Promise<HttpResponse> {
    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.id, userId),
      columns: {
        id: true,
        name: true,
        email: true,
        calories: true,
        carbohydrates: true,
        fats: true,
        proteins: true,
      }
    });

    if (!user) {
      return notFound({
        error: "Usuário não encontrado."
      })
    }

    return ok({
      ...user
    })
  }
}