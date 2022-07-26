import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const ArtistList = (props) => {
  console.log("⭐️ ARTIST LIST", props.items);
  return (
    <div className="w-full grid grid-cols-2 ">
      {props.items.map((item, key) => (
        <div key={key} className="flex my-2 text-left">
          <div>
            <img className="w-8 h-8 mr-2" src={item["image"]}></img>
          </div>
          <div className="text-lg">
            <div>{item["name"]}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArtistList;
