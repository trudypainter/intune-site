import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const ArtistList = (props) => {
  console.log("⭐️ ARTIST LIST", props.items);
  return (
    <div className="w-full grid grid-cols-2 ">
      {props.items.map((item, key) => (
        <div key={key} className="flex my-1 text-left">
          <div>
            <img className="w-[40px] h-[40px] mx-1" src={item["image"]}></img>
          </div>
          <div className="text-xs truncate">{item["name"]}</div>
        </div>
      ))}
    </div>
  );
};

export default ArtistList;
