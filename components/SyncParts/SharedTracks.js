import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import TrackList from "../ProfileParts/TrackList";

const SharedTracks = (props) => {
  // console.log("⭐️TRACK LIST", props.items);
  if (props.syncData.sharedTracks) {
    if (props.syncData.sharedTracks.items.length > 0) {
      return (
        <div className="w-full max-w-[800px] mx-auto">
          <div className="text-2xl pt-4 pb-1">Shared Tracks</div>
          <TrackList items={props.syncData.sharedTracks.items} />
        </div>
      );
    }
  }
};

export default SharedTracks;
