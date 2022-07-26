import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import TrackList from "../ProfileParts/TrackList";

const SharedTracks = (props) => {
  // console.log("⭐️TRACK LIST", props.items);
  if (props.syncData.sharedTracks) {
    return (
      <div className="w-full">
        <div className="text-2xl py-8">Shared Tracks</div>
        <TrackList items={props.syncData.sharedTracks.items} />
      </div>
    );
  }
};

export default SharedTracks;
