import FadingImage from "@/components/FadingImage";
import Header from "@/components/Header";
import MovieGrid from "@/components/MovieGrid";
import MovieList from "@/components/List";
import Swiper from "@/components/Swiper";
import { getPopular, getTrending } from "@/lib/api/tmdb";
import axios from "axios";

type voteAverage = {
  vote_average: number;
};

const Home = async () => {
  const [trending, popular] = await getTrending();
  console.log(trending);

  return (
    <div className="pt-2 container">
      <Swiper
        data={trending
          .filter(
            (item: MovieDetailsType) =>
              item.backdrop_path || item.vote_average != 0
          )
          .sort(
            (a: voteAverage, b: voteAverage) => b.vote_average - a.vote_average
          )
          .slice(0, 6)}
      />
      <div className="mt-5">
        <MovieList data={trending} type="movie" title="Trending" />
      </div>
      <div className="my-5">
        <MovieGrid data={popular} />
      </div>
    </div>
  );
};

export default Home;
