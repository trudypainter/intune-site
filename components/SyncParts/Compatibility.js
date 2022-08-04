import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const Compatibility = (props) => {
  // console.log("⭐️TRACK LIST", props.items);

  console.log(props);
  if (props.syncData.requester) {
    return (
      <div className="w-full">
        <div className="grid grid-cols-2 mt-8">
          <Link href={"/" + props.syncData.requester.slug}>
            <div className="w-50% hover:cursor-pointer text-2xl text-center">
              <img
                className="m-auto rounded-full object-cover"
                style={{ width: "40vw", height: "40vw" }}
                src={props.syncData.requester.image}
              ></img>
              <div className="pt-4">{props.syncData.requester.slug}</div>
            </div>
          </Link>
          <Link href={"/" + props.syncData.receiver.slug}>
            <div className="w-50% hover:cursor-pointer text-2xl text-center">
              <img
                className="m-auto rounded-full object-cover"
                style={{ width: "40vw", height: "40vw" }}
                src={props.syncData.receiver.image}
              ></img>
              <div className="pt-4">{props.syncData.receiver.slug}</div>
            </div>
          </Link>
        </div>
        <div className="p-12 text-4xl w-full text-center">
          {props.syncData.compatibility}%<br></br>
          compatible
        </div>
      </div>
    );
  }
};

export default Compatibility;
