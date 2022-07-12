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

//   const getMyPlaylists = async () => {
//     const res = await fetch("/api/playlists");
//     const { items } = await res.json();
//     setList(items);
//   };

//   const getUserItem = async () => {
//     const res = await fetch("/api/user");
//     const json = await res.json();
//     console.log("⭐️ looking for user obj", json);
//   };

//   const saveToDatabase = async (item) => {
//     const res = await fetch("api/playlists", {
//       method: "POST",
//       body: JSON.stringify(item),
//     });
//     const data = await res.json();
//     console.log(data);
//   };

const Profile = () => {
  const { data: session } = useSession();

  return (
    <div className="w-full">
      <div className="w-10/12 mx-auto">
        <ProfileBox session={session} />
        <FriendsList />
        <ProfileStats session={session} />
      </div>
    </div>
  );
};

export default Profile;
