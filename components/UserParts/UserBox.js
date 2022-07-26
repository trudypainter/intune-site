import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

import Modal from "react-modal";

const server =
  process.env.NODE_ENV === "production"
    ? "https://in-tune.vercel.app/"
    : "http://localhost:3000/";

const UserBox = (props) => {
  const makeSyncLoggedIn = async () => {
    // set loading page

    console.log("🔵 making new sync request");
    const res = await fetch(`${server}api/sync`, {
      method: "POST",
      body: JSON.stringify({
        requester: props.session.session.user,
        receiver: props.userData.email,
      }),
    });
    const data = await res.json();
    console.log("🟡 sync response", data);
    // redirect to new sync page
  };

  let syncedWith = undefined;
  console.log(props.session);
  if (props.session && props.userData.syncReceived) {
    for (let sync of props.userData.syncReceived) {
      if (sync.requester.email === props.session.session.user.email) {
        syncedWith = sync;
      }
    }
    for (let sync of props.userData.syncRequested) {
      if (sync.receiver.email === props.session.session.user.email) {
        syncedWith = sync;
      }
    }
  }
  console.log("🏁 SYNCHED WIHT", syncedWith);

  return (
    <div className="mt-10 mx-auto grid grid-cols-2">
      <div className="">
        <img className="rounded-full" src={props.userData.image}></img>
      </div>
      <div className="text-center">
        <div className="p-2 text-2xl">{props.userData.name}</div>

        <div id="slug-label" className="text-xl">
          in-tune.app/{props.userData.slug}
        </div>

        <div className="pt-8 flex justify-center space-x-4">
          {syncedWith === undefined ? (
            <div
              onClick={() => makeSyncLoggedIn()}
              className="text-3xl mt-4 p-8 rounded-md bg-indigo-500 text-white hover:cursor-pointer"
            >
              SYNC
            </div>
          ) : (
            <Link href={"/sync/" + syncedWith.id}>
              <div className="text-3xl mt-4 p-8 rounded-md bg-indigo-100 text-black hover:cursor-pointer">
                View Sync
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserBox;
