import List from "@/components/List";
import MovieGrid from "@/components/MovieGrid";
import { getUserData } from "@/lib/actions/user.actions";
import { getRemote } from "@/lib/api/tmdb";
import { urlTypes } from "@/lib/urls";

import React, { Children, FC } from "react";

interface props {
  params: Promise<{
    list: string[];
  }>;
}

const Page: FC<props> = async ({ params }) => {
  const {
    list: [list, type],
  } = await params;
  //@ts-ignore
  const favorites = await getUserData(list, type);
  console.log(favorites);
  
  return (
    <div>
      <h1 className="p-6 text-xl font-bold text-gray-400">Favorites:</h1>
      <List data={favorites.results} type="movie" />
    </div>
  );
};

export default Page;
