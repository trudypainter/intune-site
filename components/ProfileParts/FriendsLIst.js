import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const FriendsList = (props) => {
  let allSyncs = [];

  if (props.userData.syncReceived) {
    const relevantReceived = props.userData.syncReceived.map((sync) => ({
      compatibility: sync.compatibility,
      slug: sync.requester.slug,
      image: sync.requester.image,
      id: sync.id,
    }));
    allSyncs = [...allSyncs, ...relevantReceived];
  }
  if (props.userData.syncRequested) {
    const relevantRequested = props.userData.syncRequested.map((sync) => ({
      compatibility: sync.compatibility,
      slug: sync.receiver.slug,
      image: sync.receiver.image,
      id: sync.id,
    }));
    allSyncs = [...allSyncs, ...relevantRequested];
  }

  console.log("✅ ALL SYNCS", props.userData.syncReceived, allSyncs);
  return (
    <div className="w-full mt-4 mx-auto bg-black pb-4">
      <div className="text-white pt-4 px-2 pb-2">
        FRIENDS - {allSyncs.length}
      </div>
      <div className="flex overflow-x-scroll shrink-0 space-x-1 m-2 ">
        {allSyncs.map((sync) => (
          <Link key={sync.id} href={"/sync/" + sync.id}>
            <div className="text-center w-[200px] hover:cursor-pointer bg-white">
              <img
                className="w-[160px] h-[160px] rounded-full m-auto mt-2 object-cover"
                src={sync.image}
              />
              <div className=" w-[200px] text-xs m-auto truncate p-2">
                {sync.slug}
              </div>
              <div className=" w-[200px] text-xs m-auto bg-neongreen p-2">
                {sync.compatibility}%
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default FriendsList;
