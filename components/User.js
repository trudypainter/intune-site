import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import TrackList from "./ProfileParts/TrackList";
import ArtistList from "./ProfileParts/ArtistList";
import ProfileBox from "./ProfileParts/ProfileBox";
import FriendsList from "./ProfileParts/FriendsLIst";
import UserBox from "./UserParts/UserBox";
import UserStats from "./UserParts/UserStats";
import Loading from "./ProfileParts/Loading";

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

  console.log(session);

  const getUserItem = async () => {
    const res = await fetch(`${server}api/user`, {
      method: "POST",
      body: JSON.stringify({
        slug: props.slug,
      }),
    });
    const userData = await res.json();
    console.log("😀 USER DATA", userData);
    setUserData(userData);
    setLoading(false);
  };

  useEffect(() => {
    // console.log("🍇 use effect");
    if (props.slug) {
      console.log("calling user endpoint");
      getUserItem();
    }
  }, [props.slug]);

  if (loading) {
    return <Loading />;
  } else {
    if (session) {
      if (userData.email === session.session.user.email) {
        window.open("/", "_self");
      }
    }
    return (
      <div className="w-full">
        {userData !== {} && (
          <div className="w-10/12 mx-auto">
            <UserBox session={session} userData={userData} />
            <FriendsList userData={userData} />
            <UserStats userData={userData} />
          </div>
        )}
      </div>
    );
  }
};

export default User;
