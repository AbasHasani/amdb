"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { createList } from "@/lib/actions/user.actions";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const CreateList = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  return (
    <div className="flex flex-col gap-3 items-start my-10 ">
      <div className="flex flex-col gap-3 items-start w-full lg:w-[30rem] bg-gray-950/80 p-3 rounded-md hover:border-green-800/50 border transition-all">
        <h2>Create new list</h2>
        <div className="w-full">
          <Label className="text-zinc-400" htmlFor="name">
            Name
          </Label>
          <Input
            className="w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="w-full">
          <Label className="text-zinc-400" htmlFor="name">
            Description
          </Label>
          <Input
            className="w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <Button
          onClick={() => {
            createList(name, description);
            router.refresh();
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default CreateList;
