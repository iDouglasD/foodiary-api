import { z } from "zod";
import { compare } from 'bcryptjs'

import { eq } from "drizzle-orm";
import { db } from "../db";
import { usersTable } from "../db/schema";
import { HttpRequest, HttpResponse } from "../types/Http";
import { badRequest, ok, unauthorized } from "../utils/http";


const schema = z.object({
  email: z.email("E-mail inválido"),
  password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres")
})

export class SignInController {
  static async handle({ body }: HttpRequest): Promise<HttpResponse> {
    const { success, error, data } = schema.safeParse(body)

    if (!success) {
      return badRequest({
        errors: error.issues
      })
    }

    const user = await db.query.usersTable.findFirst({
      columns: {
        id: true,
        email: true,
        password: true,
      },
      where: eq(usersTable.email, data.email)
    })

    if (!user) {
      return unauthorized({
        error: "E-mail ou senha inválidos."
      })
    }

    const isPasswordValid = await compare(data.password, user.password)

    if (!isPasswordValid) {
      return unauthorized({
        error: "E-mail ou senha inválidos."
      })
    }

    return ok({
      user
    })
  }
}