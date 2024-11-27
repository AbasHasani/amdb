import CreateList from "@/components/forms/createList";
import HoverContent from "@/components/HoverContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getDetails, getLists, createList } from "@/lib/actions/user.actions";
import { deleteSession, verifySession } from "@/lib/session";
import { originalImgUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = async () => {
  const lists: UserLists = await getLists();
  return (
    <div className="p-5">
      <h2 className="text-center py-5">Total lists: {lists.total_results}</h2>
      <div className="relative grid lg:grid-cols-2 gap-3">
        {lists?.results?.map((list) => (
          <HoverContent key={list.id}>
            <Link
              href={`/user/list/${list.id}`}
              className="p-5 flex flex-col justify-between h-full"
            >
              <div className="flex-1 flex flex-col justify-center items-center">
                <p className="capitalize font-semibold text-zinc-300 text-[30px]">
                  {list.name}
                </p>
                <p className="font-light text-zinc-400">{list.description}</p>
              </div>
              <ul className="flex justify-between font-light text-gray-400">
                <li>Items: {list.number_of_items}</li>
                <li>Average rating: {list.average_rating}</li>
              </ul>
            </Link>
          </HoverContent>
        ))}
      </div>
      <CreateList />
    </div>
  );
};

export default Page;
