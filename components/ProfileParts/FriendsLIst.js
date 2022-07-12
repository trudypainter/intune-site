import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const FriendsList = (props) => {
  return (
    <div className="mt-10 mx-auto ">
      <div className="text-2xl">Friends</div>
      friends will go here...
    </div>
  );
};
export default FriendsList;
