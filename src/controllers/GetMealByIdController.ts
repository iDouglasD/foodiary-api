import { HttpResponse, ProtectedHttpRequest } from "../types/Http";
import { badRequest, ok } from "../utils/http";
import { db } from "../db";
import { mealsTable } from "../db/schema";
import { and, eq, gte, lte } from "drizzle-orm";
import z from "zod";

const schema = z.object({
  mealId: z.uuid()
})


export class GetMealByIdController {
  static async handle({ userId, params }: ProtectedHttpRequest): Promise<HttpResponse> {
    const { success, error, data } = schema.safeParse(params)

    if (!success) {
      return badRequest({
        errors: error.issues
      })
    }

    const meal = await db.query.mealsTable.findFirst({
      where: and(
        eq(mealsTable.userId, userId),
        eq(mealsTable.id, data.mealId),
      ),
      columns: {
        id: true,
        icon: true,
        name: true,
        foods: true,
        status: true,
        createdAt: true
      }
    })

    return ok({
      meal
    })
  }
}