import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Compatibility from "./SyncParts/Compatibility";
import SharedArtists from "./SyncParts/SharedArtists";
import SharedTracks from "./SyncParts/SharedTracks";

const selectedButtonCSS =
  "bg-indigo-500 text-white p-4 rounded-2xl hover:cursor-pointer mx-1 sticky top-24";
const unSelectedButtonCSS =
  "bg-indigo-100 text-black p-4 rounded-2xl hover:cursor-pointer mx-1 sticky top-24";

const server =
  process.env.NODE_ENV === "production"
    ? "https://in-tune.vercel.app/"
    : "http://localhost:3000/";

const Sync = (props) => {
  const { data: session } = useSession();
  const [syncData, setSyncData] = useState({});

  console.log(session);

  const getSyncItem = async () => {
    console.log("🟢 hitting sync", props.id);
    const res = await fetch(`${server}api/sync?id=${props.id}`, {
      method: "GET",
    });
    const syncData = await res.json();
    console.log("🟢 sync DATA", syncData);
    setSyncData(syncData);
  };

  useEffect(() => {
    if (props.id) {
      getSyncItem();
    }
  }, [props.id]);

  return (
    <div className="w-full">
      <div className="w-10/12 mx-auto">
        <Compatibility syncData={syncData} />
        <SharedArtists syncData={syncData} />
        <SharedTracks syncData={syncData} />
      </div>
    </div>
  );
};

export default Sync;