"use client";
import Link from "next/link";
import React, { FC, ReactNode } from "react";
import { FaImdb, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const fullLink = (name: string, link: string) => {
  switch (name) {
    case "imdb":
      return "https://www.imdb.com/name/" + link;
    case "youtube":
      return "https://www.youtube.com/@" + link;
    case "twitter":
      return "https://twitter.com/" + link;
    case "instagram":
      return "https://instagram.com/" + link;
    default:
      return "#";
  }
};

const Icon: FC<{ size: number; className: string; name: string }> = ({
  size,
  className,
  name,
}) => {
  switch (name) {
    case "imdb":
      return <FaImdb size={size} className={className} />;
    case "youtube":
      return <FaYoutube size={size} className={className} />;
    case "twitter":
      return <FaTwitter size={size} className={className} />;
    case "instagram":
      return <FaInstagram size={size} className={className} />;
    default:
      return null;
  }
};
const SocialItem: FC<{
  link: string;
  name: string;
}> = ({ link, name }) => {
  return (
    <Link
      href={link ? fullLink(name, link) : "#"}
      onClick={(e) => {
        if (!link) e.preventDefault();
      }}
      target="_blank"
      className={`max-w-[30rem] text-sm font-light text-gray-400 md:text-base md:text-green-100 flex items-center gap-3 ${
        link ? "group" : "opacity-70 cursor-default"
      }`}
    >
      <Icon
        size={50}
        className={`w-[3rem] opacity-50 group-hover:opacity-100 transition-all h-full object-cover rounded-md ${
        !link ? "text-gray-400" : ""
      }`}
        name={name}
      />
      <p className="hidden sm:block text-gray-400 group-hover:text-green-100 italic transition-all">
        {link ? name : "-"}
      </p>
    </Link>
  );
};

export default SocialItem;
