import { Request } from "@hapi/hapi";
import jwt, { JwtPayload } from "jsonwebtoken";
import { db } from "../models/db.js";
import { User } from "../types/model-types.js";

const jwtSecret = process.env.jwt_secret as string;

export function createToken(user: User): string {
  const payload = {
    id: user._id,
    email: user.email,
    scope: [],
  };
  const options: jwt.SignOptions = {
    algorithm: "HS256",
    expiresIn: "1h",
  };
  return jwt.sign(payload, jwtSecret, options);
}

export function decodeToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
    return {
      id: decoded.id as string,
      email: decoded.email as string,
      scope: decoded.scope as string[],
    } as JwtPayload;
  } catch (error) {
    console.log(error);
  }
  return null;
}

export async function validate(decoded: JwtPayload) {
  const user = (await db.userStore!.findById(decoded.id as string)) as User;
  if (user === null) {
    return { isValid: false };
  }
  return { isValid: true, credentials: user };
}

export function getUserIdFromRequest(request: Request): string | null {
  let userId = null;
  try {
    const { authorization } = request.headers as { authorization: string };
    const token = authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "secretpasswordnotrevealedtoanyone") as JwtPayload;
    userId = decodedToken.id as string;
  } catch {
    userId = null;
  }
  return userId;
}
