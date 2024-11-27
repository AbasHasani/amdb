import { getFilm } from "@/lib/api/tmdb";
import MovieTrailer from "@/components/MovieTrailer";
import MovieList from "@/components/List";
import { Separator } from "@/components/ui/separator";
import Gallery from "@/components/Gallery";
import { FC } from "react";
import Heading from "@/components/Heading";
import StarFilms from "@/components/AccountStates";
import Details from "@/components/Details";

const Film: FC<Params> = async ({ params }) => {
  const { id } = await params;
  const isTvShow = id.includes("tv");
  const data: MovieDetailsType = await getFilm(id.replace("tv-", ""), isTvShow);
  console.log(data.account_states);
  
  if (!data) return null;
  // console.log(data);
  
  const vidoeId = data.videos.results.find(
    (item) => item.type === "Trailer"
  )?.key;
  return (
    <div className="text-green-100 container bg-cyan-40">
      <Heading type="movie" isTvShow={isTvShow} data={data} />

      <MovieList data={data.credits.cast} title="Cast" type="cast" />
      {data?.images?.backdrops?.length ? (
        <Gallery isCast backdrops={data.images.backdrops} />
      ) : (
        ""
      )}

      <section className="md:grid grid-cols-4 gap-2">
        {vidoeId ? (
          <MovieTrailer id={vidoeId} movieName={data.title || data.name} />
        ) : null}
        <Details data={data} hasTrailer />
      </section>

      {data?.recommendations?.results?.length > 0 && (
        <>
          <h1 className="text-xl font-semibold text-gray-400 italic m-5 mt-8">Recommndations</h1>
          <MovieList data={data.recommendations.results} type="movie" />
        </>
      )}
    </div>
  );
};

export default Film;
