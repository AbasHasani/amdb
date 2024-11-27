import Gallery from "@/components/Gallery";
import Heading from "@/components/Heading";
import List from "@/components/List";
import { getCast } from "@/lib/api/tmdb";
import { originalImgUrl } from "@/lib/utils";
import Image from "next/image";
import { FC } from "react";
import { DataTable } from "./data-table";
import { columns, Payment } from "./columns";
import SocialItem from "@/components/SocialItem";
import Biography from "@/components/Biography";

const Cast: FC<Params> = async ({ params }) => {
  const { id } = await params;
  const data: Person = await getCast(id);
  console.log(data);
  if (!data) return null;

  return (
    <div className="container text-green-100">
      <Heading type="cast" data={data} />
      <div className="m-5 p-5 lg:hidden flex gap-2 justify-center">
        <SocialItem link={data.external_ids.imdb_id} name="imdb" />
        <SocialItem link={data.external_ids["twitter_id"]} name="twitter" />
        <SocialItem link={data.external_ids["instagram_id"]} name="instagram" />
        <SocialItem link={data.external_ids["youtube_id"]} name="youtube" />
      </div>
      <Biography bio={data.biography} />

      {data.images.profiles?.length && data.images.profiles?.length > 0 && (
        <Gallery isCast backdrops={data.images.profiles} />
      )}
      <div>
        <h2 className="heading_title text-center p-5">
          Best Credits: {data.combined_credits.cast.length}
        </h2>
        <List data={data.combined_credits.cast.slice(0, 9)} type="movie" />
      </div>
      <div>
        <DataTable data={data.combined_credits.cast} columns={columns} />
      </div>
    </div>
  );
};

export default Cast;
