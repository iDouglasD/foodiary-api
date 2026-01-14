import { HttpResponse, ProtectedHttpRequest } from "../types/Http";
import { badRequest, ok } from "../utils/http";
import { db } from "../db";
import { mealsTable } from "../db/schema";
import { and, eq, gte, lte } from "drizzle-orm";
import z from "zod";

const schema = z.object({
  date: z.iso.date().transform(dateStr => new Date(dateStr))
})


export class ListMealsController {
  static async handle({ userId, queryParams }: ProtectedHttpRequest): Promise<HttpResponse> {
    const { success, error, data } = schema.safeParse(queryParams)

    if (!success) {
      return badRequest({
        errors: error.issues
      })
    }

    const endDate = new Date(data.date)
    endDate.setUTCHours(23, 59, 59, 59)

    const meals = await db.query.mealsTable.findMany({
      where: and(
        eq(mealsTable.userId, userId),
        eq(mealsTable.status, "success"),
        gte(mealsTable.createdAt, data.date),
        lte(mealsTable.createdAt, endDate)
      ),
      columns: {
        id: true,
        icon: true,
        name: true,
        foods: true,
        createdAt: true
      }
    })

    return ok({
      meals
    })
  }
}