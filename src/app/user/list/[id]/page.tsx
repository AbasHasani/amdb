import List from "@/components/List";
import { Button } from "@/components/ui/button";
import { getList } from "@/lib/actions/user.actions";
import { Trash2 } from "lucide-react";
import React, { FC } from "react";
import DeleteBtn from "./deleteBtn";

interface props {
  params: Promise<{
    id: string | number;
  }>;
}

const ListPage: FC<props> = async ({ params }) => {
  const { id } = await params;
  const list = await getList(id);
  return (
    <div className="mt-3">
      <div>
        <ul className="grid grid-cols-4 gap-4">
          <li className="border border-green-900/20 p-3 rounded-md shadow">
            <span className="text-gray-400 italic font-light mr-2">Name:</span>
            {list.name}
          </li>
          <li className="border border-green-900/20 p-3 rounded-md shadow">
            <span className="text-gray-400 italic font-light mr-2">Total:</span>{" "}
            {list.item_count}
          </li>
          <li className="border border-green-900/20 p-3 rounded-md shadow">
            <span className="text-gray-400 italic font-light mr-2">
              Average rating:
            </span>{" "}
            {list.average_rating}
          </li>
          <li className="border border-green-900/20 p-3 rounded-md shadow">
            <span className="text-gray-400 italic font-light mr-2">
              Runtime:
            </span>{" "}
            {list.runtime}
          </li>
        </ul>
        <DeleteBtn id={list.id} />
        <div className="mt-5 p-5">
          <p className="text-gray-400 italic">Description:</p>
          <p>{list.description}</p>
        </div>
      </div>
      <List data={list.results} type="movie" />
    </div>
  );
};

export default ListPage;
