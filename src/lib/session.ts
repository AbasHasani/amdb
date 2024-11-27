"use server";
import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT, jwtVerify } from "jose";

const key = new TextEncoder().encode(process.env.SECRET);

const cookie = {
  name: "session",
  options: {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  },
  duration: 24 * 60 * 60 * 1000,
};

export const encrypt = async (payload: {
  accountId: string;
  username: string;
  profile: string;
  sessionId: string
  expires: Date;
}) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1day")
    .sign(key);
};

export const decrypt = async (session: string) => {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createSession = async (data: {
  accountId: string;
  profile: string;
  username: string;
  sessionId: string
}) => {
  const expires = new Date(Date.now() + cookie.duration);
  const session = await encrypt({ ...data, expires });
  // console.log("Session", session);
  // console.log("Account id", data);

  (await cookies()).set(cookie.name, session, { ...cookies, expires });
};

export const verifySession = async (): Promise<UserSession | null> => {
  const cookieValue: string | null | undefined = (await cookies()).get(
    cookie.name
  )?.value;
  if (!cookieValue) return null;
  const session: any = await decrypt(cookieValue);
  if (!session?.username) {
    return null;
  }
  return session;
};

export const deleteSession = async () => {
  (await cookies()).delete(cookie.name);
  redirect("/");
};
