import z from "zod";
import { HttpResponse, ProtectedHttpRequest } from "../types/Http";
import { badRequest, created } from "../utils/http";
import { db } from "../db";
import { mealsTable } from "../db/schema";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";

const schema = z.object({
  fileType: z.enum(['audio/m4a', 'image/jpeg']),
})

export class CreateMealController {
  static async handle({ userId, body }: ProtectedHttpRequest): Promise<HttpResponse> {
    const { success, error, data } = schema.safeParse(body)

    if (!success) {
      return badRequest({
        errors: error.issues
      })
    }

    const fileId = randomUUID()
    const ext = data.fileType === 'audio/m4a' ? '.m4a' : '.jpg'
    const fileKey = `${fileId}${ext}`

    const command = new PutObjectCommand({
      Bucket: 'foodiary-files-bucket-uploads',
      Key: fileKey,
    })

    const [meal] = await db
      .insert(mealsTable)
      .values({
        userId,
        inputFileKey: 'input_file_key',
        inputType: data.fileType === 'audio/m4a' ? 'audio' : 'picture',
        status: 'uploading',
        icon: '',
        name: '',
        foods: []
      }).returning({
        id: mealsTable.id
      })

    if (!meal) {
      return badRequest({
        errors: 'Não foi possível criar a refeição no momento.'
      });
    }

    return created({
      mealId: meal.id
    })
  }
}