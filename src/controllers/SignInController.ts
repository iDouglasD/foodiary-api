import { HttpRequest, HttpResponse } from "../types/Http";
import { badRequest, ok } from "../utils/http";

import { z } from "zod";

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

    return ok({
      data
    })
  }
}