import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import ArtistList from "../ProfileParts/ArtistList";

const SharedArtists = (props) => {
  // console.log("⭐️TRACK LIST", props.items);

  if (props.syncData.sharedArtists) {
    return (
      <div className="w-full">
        <div className="text-2xl py-8">Shared Artists</div>
        <ArtistList items={props.syncData.sharedArtists.items} />
      </div>
    );
  }
};

export default SharedArtists;
