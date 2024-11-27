"use client";
import React, { useEffect, useState } from "react";
import { ScrollProgressBasic } from "./motion-ui/ScrollProgress";

const Biography = ({ bio }: { bio: string }) => {
  
  return (
    <div className="m-5 p-5 border border-gray-800 rounded-md relative">
      <ScrollProgressBasic height={400}>
        <h2 className="heading_title">Biography</h2>
        <p className="p-5">{bio}</p>
      </ScrollProgressBasic>
    </div>
  );
};

export default Biography;
