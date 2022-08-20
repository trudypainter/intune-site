import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import TrackList from "./ProfileParts/TrackList";
import ArtistList from "./ProfileParts/ArtistList";
import ProfileBox from "./ProfileParts/ProfileBox";
import ProfileStats from "./ProfileParts/ProfileStats";
import FriendsList from "./ProfileParts/FriendsLIst";
import UserBox from "./UserParts/UserBox";
import UserStats from "./UserParts/UserStats";
import Loading from "./ProfileParts/Loading";
import Footer from "./Footer";

const selectedButtonCSS =
  "bg-indigo-500 text-white p-4 rounded-2xl hover:cursor-pointer mx-1 sticky top-24";
const unSelectedButtonCSS =
  "bg-indigo-100 text-black p-4 rounded-2xl hover:cursor-pointer mx-1 sticky top-24";

const server =
  process.env.NODE_ENV === "production"
    ? "https://in-tune.vercel.app/"
    : "http://localhost:3000/";

const User = (props) => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  console.log("⚪️", session);

  const getUserItem = async (session) => {
    const res = await fetch(`${server}api/user`, {
      method: "POST",
      body: JSON.stringify({
        slug: props.slug,
      }),
    });
    const userData = await res.json();
    console.log("😀 USER DATA", userData, session);
    if (userData.email === session.session.user.email) {
      window.open("/", "_self");
    } else {
      setUserData(userData);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("🟢", session);

    // console.log("🍇 use effect");
    if (props.slug && session) {
      console.log("calling user endpoint");
      getUserItem(session);
    }
  }, [props.slug, session]);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className="w-full">
        <UserBox
          session={session}
          userData={userData}
          setLoading={setLoading}
        />
        <FriendsList userData={userData} />
        {userData.listening && (
          <ProfileStats session={session} userData={userData} />
        )}
        <Footer link={userData.slug} />
      </div>
    );
  }
};

export default User;
