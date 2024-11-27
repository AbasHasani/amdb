declare type UserSession = {
  accountId: string;
  profile: string;
  username: string;
  expires: string;
  sessionId: string
  iat: number;
  exp: number;
};

declare type UserLists = {
  page: 1;
  results: [
    {
      account_object_id: string;
      adult: 0;
      average_rating: 8;
      backdrop_path: null;
      created_at: Date;
      description: string;
      featured: number;
      id: number;
      iso_3166_1: string;
      iso_639_1: string;
      name: string;
      number_of_items: number;
      poster_path: null;
      public: number;
      revenue: number;
      runtime: number;
      sort_by: number;
      updated_at: Date;
    }
  ];

  total_pages: number;
  total_results: number;
};
