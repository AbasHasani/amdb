"use server";
import { verifySession } from "../session";
import { urlTypes } from "../urls";

const options = {
  headers: {
    "Content-Type": "application/json",
    Authorization: process.env.TMDB_API_KEY!,
  },
};

const filmUrlGenerator = (
  list: urlTypes,
  type: "movie" | "tv",
  accountId: string
) => {
  const urls = {
    // details: "https://api.themoviedb.org/3/account/",
    // lists: "https://api.themoviedb.org/4/account//lists",
    favorites: `https://api.themoviedb.org/4/account/${accountId}/${type}/favorites`,

    // https://api.themoviedb.org/3/account/{account_id}/favorite/movies
    rated: `https://api.themoviedb.org/4/account/${accountId}/${type}/rated`,
    watchlist: `https://api.themoviedb.org/4/account/${accountId}/${type}/watchlist`,
  };
  return urls[list];
};

export const getDetails = async () => {
  try {
    const auth = await verifySession();
    if (!auth) return;
    const res = await fetch(
      `https://api.themoviedb.org/3/account/${auth.accountId}`,
      options
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch user details");
  }
};

export const getLists = async () => {
  try {
    const auth = await verifySession();
    if (!auth) return;
    const res = await fetch(
      `https://api.themoviedb.org/4/account/${auth.accountId}/lists?page=1`,
      options
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch user lists");
  }
};

export const getList = async (id: string | number) => {
  const auth = await verifySession();
  if (!auth) return;
  try {
    const res = await fetch(`https://api.themoviedb.org/4/list/${id}`, options);
    const data = await res.json();
    return data;
  } catch (error) {}
};

export const getUserData = async (list: urlTypes, type: "movie" | "tv") => {
  try {
    const auth = await verifySession();
    if (!auth) return;
    console.log(filmUrlGenerator(list, type, auth.accountId));

    const res = await fetch(
      filmUrlGenerator(list, type, auth.accountId),
      options
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get favorites");
  }
};

export const getFilmAccountStatus = async (
  type: "movie" | "tv",
  id: string
) => {
  const auth = await verifySession();
  if (!auth) return;
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/account_states?session_id=${auth.sessionId}`,
      options
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get favorites");
  }
};

export const updateFaveWatch = async (
  action: string,
  id: string | number,
  type: "movie" | "tv",
  add: boolean
) => {
  const auth = await verifySession();
  if (!auth) return;
  try {
    console.log({
      media_id: id,
      media_type: type,
      favorite: add,
    });

    const res = await fetch(
      `https://api.themoviedb.org/3/account/${auth.accountId}/${action}`,
      {
        ...options,
        method: "POST",
        body: JSON.stringify({
          media_id: id,
          media_type: type,
          [action]: add,
        }),
      }
    );
    const data = await res.json();
    console.log(data);

    return data;
  } catch (error) {}
};

export const addRating = async (
  id: number | string,
  value: number,
  media_type: "tv" | "movie",
  typeDelete: boolean
) => {
  const auth = await verifySession();
  if (!auth) return;
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/${media_type}/${id}/rating?session_id=${auth.sessionId}`,
      {
        ...options,
        method: typeDelete ? "DELETE" : "POST",
        body: JSON.stringify({
          value,
        }),
      }
    );
    const data = await res.json();
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateListItems = async (
  listId: string | number,
  media_id: string | number,
  media_type: "tv" | "movie",
  typeDelete?: boolean
) => {
  const auth = await verifySession();
  if (!auth) return;
  try {
    const res = await fetch(
      `https://api.themoviedb.org/4/list/${listId}/items?session_id=${auth.sessionId}`,
      {
        ...options,
        method: typeDelete ? "DELETE" : "POST",
        body: JSON.stringify({
          items: [{ media_id, media_type }],
        }),
      }
    );

    const data = await res.json();
    return data;
  } catch (error) {}
};

export const createList = async (name: string, description: string) => {
  const auth = await verifySession();
  if (!auth) return;
  console.log(name);

  try {
    const res = await fetch(
      `https://api.themoviedb.org/4/list?session_id=${auth.sessionId}`,
      {
        ...options,
        method: "POST",
        body: JSON.stringify({
          name,
          description,
          iso_639_1: "en",
        }),
      }
    );

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteList = async (listId: string | number) => {
  const auth = await verifySession();
  if (!auth) return;
  try {
    const res = await fetch(
      `https://api.themoviedb.org/4/list/${listId}?session_id=${auth.sessionId}`,
      {
        ...options,
        method: "DELETE",
      }
    );

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
