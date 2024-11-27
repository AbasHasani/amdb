"use client";
import { Button } from "@/components/ui/button";
import { deleteList } from "@/lib/actions/user.actions";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const DeleteBtn = ({ id }: { id: string | number }) => {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        deleteList(id);
        router.push("/user");
      }}
      className="mt-5 p-5 text-gray-400 hover:bg-red-400/40 bg-red-600/10 hover:text-red-300 [&_svg]:size-5 border rounded-md py-2 px-4"
    >
      <Trash2 />
      Delete
    </Button>
  );
};

export default DeleteBtn;
