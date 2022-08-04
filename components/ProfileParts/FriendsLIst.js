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
    <div className="mt-10 mx-auto ">
      <div className="text-2xl">Friends</div>
      <div className="flex overflow-x-scroll">
        {allSyncs.map((sync) => (
          <Link
            key={sync.id}
            className="hover:cursor-pointer "
            href={"/sync/" + sync.id}
          >
            <div className="text-center hover:cursor-pointer px-2">
              <img
                className="w-20 h-20 rounded-full object-cover"
                src={sync.image}
              />
              <div className="w-full m-auto">{sync.slug}</div>
              <div className="w-full m-auto">{sync.compatibility}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default FriendsList;
