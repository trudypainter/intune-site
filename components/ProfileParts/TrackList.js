import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const TrackList = (props) => {
  // console.log("⭐️TRACK LIST", props.items);
  return (
    <div className="w-full ">
      {props.items.map((item, number) => (
        <div key={number} className="grid grid-cols-8 text-left my-2">
          <div className="col-span-1">{number + 1 + "."} </div>
          <div className="col-span-1">
            <img className="w-8 h-8" src={item["image"]}></img>
          </div>
          <div className="col-span-3 truncate">{item["title"]}</div>
          <div className="col-span-3 truncate">{item["artist"]}</div>
        </div>
      ))}
    </div>
  );
};

export default TrackList;
