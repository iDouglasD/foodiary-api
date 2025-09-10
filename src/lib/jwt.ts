import { JwtPayload, sign, verify } from "jsonwebtoken"

export function signAccessTokenFor({ userId }: { userId: string }) {
  const accessToken = sign(
    { sub: userId },
    process.env.JWT_SECRET!,
    { expiresIn: '3d' }
  )

  return accessToken
}

export function validateAccessToken({ accessToken }: { accessToken: string }) {
  try {
    const { sub } = verify(accessToken, process.env.JWT_SECRET!) as JwtPayload
    const userId = sub ?? null

    return userId
  } catch {
    return null
  }
}