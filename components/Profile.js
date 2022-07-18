import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import TrackList from "./ProfileParts/TrackList";
import ArtistList from "./ProfileParts/ArtistList";
import ProfileBox from "./ProfileParts/ProfileBox";
import FriendsList from "./ProfileParts/FriendsLIst";
import ProfileStats from "./ProfileParts/ProfileStats";

const selectedButtonCSS =
  "bg-indigo-500 text-white p-4 rounded-2xl hover:cursor-pointer mx-1 sticky top-24";
const unSelectedButtonCSS =
  "bg-indigo-100 text-black p-4 rounded-2xl hover:cursor-pointer mx-1 sticky top-24";

const server =
  process.env.NODE_ENV === "production"
    ? "https://in-tune.vercel.app/"
    : "http://localhost:3000/";

const Profile = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState({});

  console.log(session);

  const getUserItem = async () => {
    console.log("🍇 hitting user");
    const res = await fetch(`${server}api/user`, {
      method: "POST",
      body: JSON.stringify({
        token: session.token.accessToken,
        email: session.session.user.email,
      }),
    });
    const userData = await res.json();
    console.log("🍇 user data", userData);
    setUserData(userData);
  };

  useEffect(() => {
    console.log("🍇 use effect");
    getUserItem();
  }, []);

  return (
    <div className="w-full">
      <div className="w-10/12 mx-auto">
        <ProfileBox session={session} userData={userData} />
        <FriendsList userData={userData} />
        <ProfileStats session={session} userData={userData} />
      </div>
    </div>
  );
};

export default Profile;
