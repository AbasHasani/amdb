"use server";
import { verifySession } from "../session";
import { generateDiscoverUrl, urlGenerator, UrlTypes } from "../urls";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: process.env.TMDB_API_KEY!,
  },
};
export const getFilm = async (id: string, isTvShow: boolean) => {
  try {
    const auth = await verifySession();
    const sessionId = auth ? "&session_id=" + auth.sessionId : "";
    const type = isTvShow ? UrlTypes.TV : UrlTypes.MOVIE;
    console.log(urlGenerator({ type, id }) + sessionId);

    const res = await fetch(urlGenerator({ type, id }) + sessionId, options);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch movie" + error);
  }
};

export const getPopular = async () => {
  try {
    const res = await fetch(urlGenerator({ type: UrlTypes.POPULAR }), options);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch movie ");
  }
};

export const getCast = async (id: string) => {
  try {
    const res = await fetch(urlGenerator({ type: UrlTypes.CAST, id }), options);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch cast " + error);
  }
};

export const getSearchResults = async (query: string) => {
  try {
    const res = await fetch(
      urlGenerator({ type: UrlTypes.SEARCH, query }),
      options
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Not Working");
  }
};

export const getFilms = async (
  list: UrlTypes | null | undefined,
  query: string,
  searchParams: DiscoverParams
) => {
  try {
    const type: UrlTypes = list || UrlTypes.TOP_RATED;
    const url =
      list == "discover"
        ? generateDiscoverUrl({ ...searchParams }).fullUrl
        : urlGenerator({ type, query });
    console.log(url);

    const res = await fetch(url, options);
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error("Films error");
  }
};

export const getDiscover = async ({
  searchParams,
}: {
  searchParams: DiscoverParams;
}) => {
  try {
    console.log("URL FOR TMDB ", generateDiscoverUrl({ ...searchParams }));
    const res = await fetch(
      generateDiscoverUrl({ ...searchParams }).fullUrl,
      options
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getTrending = async () => {
  try {
    const urls = [
      urlGenerator({ type: UrlTypes.TRENDING }),
      urlGenerator({ type: UrlTypes.POPULAR }),
    ];
    const films = await Promise.all(
      urls.map(async (url, i) => {
        const res = await fetch(url, options);
        const data: any = await res.json();
        if (i == 0) {
          const filteredPerson = data.results.filter(
            (item: { media_type: string }) => item.media_type != "person"
          );
          return filteredPerson;
        }
        return data.results;
      })
    );
    return films;
  } catch (error) {
    console.log(error);
    
    //@ts-ignore
    throw Error("Sorry your network did not work.", error);
  }
};
