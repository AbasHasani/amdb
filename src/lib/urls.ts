export enum UrlTypes {
  MOVIE = "movie",
  CAST = "cast",
  TV = "tv",
  POPULAR = "popular",
  SEARCH = "search",
  TOP_RATED = "top_rated",
  UPCOMING = "upcoming",
  NOW_PLAYING = "now_playing",
  AIRING_TODAY = "airing_today",
  POPULAR_TV = "popular_tv",
  ON_THE_AIR = "on_the_air",
  TOP_RATED_TV = "top_rated_tv",
  TRENDING = "trending",
  DISCOVER = "discover",
}


export enum urlTypes {
  // DETAILS = "details",
  // LISTS = "lists",
  FAVORITES = "favorites",
  RATED = "rated",
  WATCHLIST = "watchlist",
}


export const generateDiscoverUrl = ({
  with_origin_country,
  language,
  with_genres,
  primary_release_year,
  type,
  first_air_date_year,
  // rating
  ["vote_average.gte"]: rating,
}: DiscoverParams) => {
  // Base URL for Discover endpoint
  const baseUrl = "https://api.themoviedb.org/3/discover/";

  // Construct query parameters
  const params = {
    with_origin_country, // ISO 3166-1 code for the country
    language: language || "en-US", // Fallback to English if language is not provided
    with_genres: with_genres || undefined, // Genre ID from TMDB (comma-separated if multiple)
    primary_release_year: type == "movie" ? primary_release_year || undefined : undefined, // Only for TV shows
    "vote_average.gte": rating || undefined, // Minimum vote average
    first_air_date_year:  type == "tv" && primary_release_year || first_air_date_year || undefined,
  };
  // Remove undefined keys
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => {
      console.log(_);
      return value !== undefined
    })
  );

  // Generate the query string
  const queryString = Object.entries(filteredParams)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value!)}`
    )
    .join("&");

  // Return the full URL
  return {
    fullUrl: `${baseUrl}${type}?${queryString}`,
    urlForPage: `/films/discover/${type}?${queryString}`,
  };
};

export const urlGenerator = ({
  type,
  id,
  query,
}: {
  type: UrlTypes;
  id?: string;
  query?: string;
}) => {
  const baseUrl3 = "https://api.themoviedb.org/3";
  switch (type) {
    case UrlTypes.MOVIE:
      return (
        baseUrl3 +
        `/movie/${id}?language=en-US&include_image_language=en&append_to_response=credits,recommendations,images,videos,watch/providers,account_states`
      );
    case UrlTypes.CAST:
      return (
        baseUrl3 +
        `/person/${id}?language=en-US&include_image_language=en&append_to_response=combined_credits,images,external_ids&sort_by=popularity`
      );
    case UrlTypes.TV:
      return (
        baseUrl3 +
        `/tv/${id}?language=en-US&include_image_language=en&append_to_response=credits,recommendations,images,account_states,videos,watch/providers`
      );
    case UrlTypes.POPULAR:
      return baseUrl3 + "/movie/popular?language=en-US&page=1";
    case UrlTypes.SEARCH:
      return (
        baseUrl3 +
        `/search/multi?include_adult=true&query=${query}&language=en-US&page=1`
      );
    case UrlTypes.TOP_RATED:
      return baseUrl3 + `/movie/top_rated?language=en-US&page=1`;
    case UrlTypes.UPCOMING:
      return baseUrl3 + `/movie/upcoming?language=en-US&page=1`;
    case UrlTypes.NOW_PLAYING:
      return baseUrl3 + `/movie/now_playing?language=en-US&page=1`;
    case UrlTypes.AIRING_TODAY:
      return baseUrl3 + `/tv/airing_today?language=en-US&page=1`;
    case UrlTypes.POPULAR_TV:
      return baseUrl3 + `/tv/popular?language=en-US&page=1`;

    case UrlTypes.ON_THE_AIR:
      return baseUrl3 + `/tv/on_the_air?language=en-US&page=1`;

    case UrlTypes.TOP_RATED_TV:
      return baseUrl3 + `/tv/top_rated?language=en-US&page=1`;
    case UrlTypes.TRENDING:
      return baseUrl3 + `/trending/all/day?language=en-US&page=1`;
    default:
      return "";
  }
};
