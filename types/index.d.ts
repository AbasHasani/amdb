declare type MovieListType = {
  data: {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;

    profile_path: string;
    biography: string;
    name: string;
    media_type: string;
  }[];
};

declare type CastType = {
  data: {
    character: string;
    credit_id: string;
    gender: number;
    id: number;
    name: string;
    order: number;
    profile_path: string;
    popularity: number;
  }[];
};

declare type Department =
  | "Directing"
  | "Writing"
  | "Production"
  | "Costume & Make-Up"
  | "Editing"
  | "Visual Effects"
  | "Sound"
  | "Art"
  | "Crew"
  | "Acting"
  | "Creator"
  | "Characters";

declare type Images = {
  backdrops?: {
    aspect_ratio: number;
    height: number;
    iso_639_1: string;
    file_path: string;
    vote_average: number;
    vote_count: number;
    width: number;
  }[];
  posters?: {
    aspect_ratio: number;
    height: number;
    iso_639_1: string;
    file_path: string;
    vote_average: number;
    vote_count: number;
    width: number;
  }[];
  profiles?: {
    aspect_ratio: number;
    height: number;
    iso_639_1: string;
    file_path: string;
    vote_average: number;
    vote_count: number;
    width: number;
  }[];
};

declare type Videos = {
  results: {
    key: string;
    name: string;
    site: string;
    size: number;
    type: string;
  }[];
};

declare type AccountStates = {
  watchlist: boolean;
  favorite: boolean;
  rated: {
    value: number;
  };
};

declare type MovieDetailsType = {
  account_states: AccountStates;
  adult: true;
  backdrop_path: string;
  belongs_to_collection: {
    backdrop_path: string;
    id: number;
    name: string;
    poster_path: string;
  };
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  credits: {
    crew: {
      adult: boolean;
      credit_id: string;
      department: Department;
      gender: number;
      id: number;
      job: string;
      known_for_department: Department;
      name: string;
      original_name: string;
      popularity: number;
    }[];
    cast: {
      adult: boolean;
      cast_id: number;
      character: string;
      credit_id: string;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      order: number;
      original_name: string;
      popularity: number;
      profile_path: string;
    }[];
  };
  recommendations: {
    page: number;
    results: {
      adult: boolean;
      backdrop_path: string;
      genre_ids: number[];
      id: number;
      original_language: string;
      original_title: string;
      overview: string;
      popularity: number;
      poster_path: string;
      release_date: string;
      title: string;
      video: boolean;
      vote_average: number;
      vote_count: number;
    }[];
    total_pages: number;
    total_results: number;
  };
  images: Images;
  videos: Videos;
};

declare type Cast = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  character: string;
  credit_id: string;
  order: number;
  media_type: string;
};

declare type CombinedCredits = {
  cast: Cast[];
};

declare type Person = {
  adult: boolean;
  gender: number;
  also_known_as: string[];
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  imdb_id: string;
  place_of_birth: string;
  homepage: string | null;
  deathday: string | null;
  adult: boolean;
  biography: string;
  images: Images;
  combined_credits: CombinedCredits;
  external_ids: {
    imdb_id: string;
    youtube_id: string;
    instagram_id: string;
    twitter_id: string;
  };
};

declare interface Params {
  params: Promise<{
    id: string;
  }>;
}

declare type SearchResultType = {
  media_type: "tv" | "movie" | "person";
  known_for: {
    title: string;
    name: string;
  }[];
  name: string;
  profile_path: string;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

declare type DiscoverParams = {
  language?: string;
  primary_release_year?: string;
  "vote_average.gte"?: string;
  with_genres?: string;
  with_origin_country?: string;
  type: "movie" | "tv";
  first_air_date_year?: string;
};
