import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import TrackList from "./TrackList";
import ArtistList from "./ArtistList";

const ProfileBox = (props) => {
  return (
    <div className="mt-10 mx-auto grid grid-cols-2">
      <div className=" ">
        <img className="rounded-full" src={props.session?.token?.picture}></img>{" "}
      </div>
      <div className="text-center ">
        <div className="p-4 text-2xl">{props.session?.token?.name}</div>
        <div className="grid grid-cols-1">
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileBox;
