import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Compatibility from "./SyncParts/Compatibility";
import SharedArtists from "./SyncParts/SharedArtists";
import SharedTracks from "./SyncParts/SharedTracks";
import Loading from "./ProfileParts/Loading";
import Footer from "./Footer";

const selectedButtonCSS =
  "bg-indigo-500 text-white p-4 rounded-2xl hover:cursor-pointer mx-1 sticky top-24";
const unSelectedButtonCSS =
  "bg-indigo-100 text-black p-4 rounded-2xl hover:cursor-pointer mx-1 sticky top-24";

const server =
  process.env.NODE_ENV === "production"
    ? "https://intune.site/"
    : "http://localhost:3000/";

const Sync = (props) => {
  const { data: session } = useSession();
  const [syncData, setSyncData] = useState({});
  const [loading, setLoading] = useState(true);

  console.log(session);

  const getSyncItem = async () => {
    console.log("🟢 hitting sync", props.id);
    const res = await fetch(`/api/sync?id=${props.id}`, {
      method: "GET",
    });
    const syncData = await res.json();
    console.log("🟢 sync DATA", syncData);
    setSyncData(syncData);
    setLoading(false);
  };

  useEffect(() => {
    if (props.id) {
      getSyncItem();
    }
  }, [props.id]);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className="w-full">
        <div className="w-11/12 mx-auto pb-12">
          <Compatibility syncData={syncData} />
          <SharedArtists syncData={syncData} />
          <SharedTracks syncData={syncData} />
        </div>
        <Footer link={"sync/" + syncData.id} />
      </div>
    );
  }
};

export default Sync;
