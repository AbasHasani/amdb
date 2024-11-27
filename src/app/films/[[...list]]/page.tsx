import MovieGrid from "@/components/MovieGrid";
import { getDiscover, getFilms } from "@/lib/api/tmdb";
import { UrlTypes } from "@/lib/urls";
import React, { FC } from "react";

interface props {
  params: Promise<{
    list: UrlTypes[] | [];
  }>;
  searchParams: Promise<
    {
      query: string;
    } & DiscoverParams
  >;
}

const Flims: FC<props> = async ({ params, searchParams }) => {
  const { list } = await params;
  const items = await searchParams;
  const List: UrlTypes = list ? list[0] : UrlTypes.TOP_RATED;
  const type = list ? (list.length > 1 ? list[1] : null) : null;
  // @ts-ignore
  const data = await getFilms(List, items.query, { ...items, type });
  return (
    <div>
      <h2 className="capitalize text-lg text-gray-400 italic m-5">
        {List.replaceAll("_", " ")}
      </h2>
      {/* <pre>{JSON.stringify({ ...items, type }, null, 2)}</pre> */}
      <MovieGrid data={data.results} />
    </div>
  );
};

export default Flims;
