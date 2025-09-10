import { eq } from "drizzle-orm";
import { db } from "../db";
import { hash } from 'bcryptjs'
import { HttpRequest, HttpResponse } from "../types/Http";
import { badRequest, conflict, created } from "../utils/http";

import { z } from "zod";
import { usersTable } from "../db/schema";

const schema = z.object({
  goal: z.enum(["lose", "maintain", "gain"]),
  gender: z.enum(["male", "female"]),
  birthDate: z.iso.date({
    message: "Data de nascimento inválida"
  }),
  height: z.number(),
  weight: z.number(),
  activityLevel: z.number().min(1).max(5),
  account: z.object({
    name: z.string().min(1, "O nome é obrigatório"),
    email: z.email("E-mail inválido"),
    password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres")
  })
})

export class SignUpController {
  static async handle({ body }: HttpRequest): Promise<HttpResponse> {
    const { success, error, data } = schema.safeParse(body)

    if (!success) {
      return badRequest({
        errors: error.issues
      })
    }

    const userAlreadyExists = await db.query.usersTable.findFirst({
      columns: {
        email: true
      },
      where: eq(usersTable.email, data.account.email)
    })

    if (userAlreadyExists) {
      return conflict({
        error: "Já existe uma conta com esse e-mail."
      })
    }

    const { account, ...rest } = data

    const hashedPassword = await hash(account.password, 8)

    const [user] = await db
      .insert(usersTable)
      .values({
        ...rest,
        ...account,
        password: hashedPassword,
        calories: 0,
        carbohydrates: 0,
        fats: 0,
        proteins: 0
      })
      .returning({
        id: usersTable.id,
      })

    return created({
      userId: user?.id
    })
  }
}