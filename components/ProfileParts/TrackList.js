import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const TrackList = (props) => {
  // console.log("⭐️TRACK LIST", props.items);
  return (
    <div className="w-full ">
      {props.items.map((item, number) => (
        <div key={number} className="grid grid-cols-8 text-left my-2">
          <div className="col-span-1 text-xs">{number + 1 + "."} </div>
          <div className="col-span-1">
            <img className="w-[32px] h-[32px]" src={item["image"]}></img>
          </div>
          <div className="col-span-3 text-xs truncate">{item["title"]}</div>
          <div className="col-span-3 text-xs truncate">{item["artist"]}</div>
        </div>
      ))}
    </div>
  );
};

export default TrackList;
