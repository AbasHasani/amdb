"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSession } from "../session";

const requestTokenUrl = "https://api.themoviedb.org/4/auth/request_token";
const accessTokenUrl = "https://api.themoviedb.org/4/auth/access_token";

const options = {
  method: "POST",
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    Authorization: process.env.TMDB_API_KEY!,
  },
  body: JSON.stringify({
    redirect_to: process.env.REDIRECT_URL!,
  }),
};

export const generateRequestToken = async () => {
  const res = await fetch(requestTokenUrl, options);
  const data = await res.json();
  // console.log(data);

  (await cookies()).set("request_token", data.request_token);
  redirect(
    `https://www.themoviedb.org/auth/access?request_token=${data.request_token}`
  );
};

const userDetailesUrl = "https://api.themoviedb.org/3/account/";

export const generateSession = async () => {
  const requestToken = (await cookies()).get("request_token")?.value;
  // console.log("Request token: ",requestToken);
  if (requestToken) {
    const atRes = await fetch(accessTokenUrl, {
      ...options,
      body: JSON.stringify({ request_token: requestToken }),
    });
    const data = await atRes.json();
    const adRes = await fetch(userDetailesUrl + data.account_id, {
      method: "GET",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: process.env.TMDB_API_KEY!,
      },
    });
    const user = await adRes.json();

    (await cookies()).delete("request_token");
    // console.log("User: ", userDetailesUrl + data.account_id);
    const sessionIdRes = await fetch(`https://api.themoviedb.org/3/authentication/session/convert/4`, {
      ...options,
      body: JSON.stringify({
        access_token: data.access_token
      })
    });
    const sessionId = await sessionIdRes.json();

    await createSession({
      accountId: data.account_id,
      profile: user.avatar.tmdb.avatar_path,
      username: user.username,
      sessionId: sessionId.session_id
    });

    return data;
  }
};
