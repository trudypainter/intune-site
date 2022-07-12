import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const TrackList = (props) => {
  console.log("⭐️TRACK LIST", props.items);
  return (
    <div className="w-full pb-20">
      {props.items.map((item, number) => (
        <div key={number} className="grid grid-cols-8 text-left my-2">
          <div className="col-span-1">{number + 1 + "."} </div>
          <div className="col-span-1">
            <img
              className="w-8 h-8"
              src={item["album"]["images"]["0"]["url"]}
            ></img>
          </div>
          <div className="col-span-3 truncate">{item["name"]}</div>
          <div className="col-span-3 truncate">
            {item["artists"][0]["name"]}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrackList;
