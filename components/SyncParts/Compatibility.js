import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const Compatibility = (props) => {
  // console.log("⭐️TRACK LIST", props.items);

  console.log(props);
  if (props.syncData.requester) {
    return (
      <div className="w-full mx-auto max-w-[600px]">
        <div className="grid grid-cols-2 mt-8">
          <Link href={"/" + props.syncData.requester.slug}>
            <div className="w-50% hover:cursor-pointer text-xl text-center">
              <img
                className="m-auto rounded-full object-cover"
                style={{
                  width: "40vw",
                  height: "40vw",
                  maxHeight: "200px",
                  maxWidth: "200px",
                }}
                src={props.syncData.requester.image}
              ></img>
              <div className="pt-4 truncate">
                {props.syncData.requester.slug}
              </div>
            </div>
          </Link>
          <Link href={"/" + props.syncData.receiver.slug}>
            <div className="w-50% hover:cursor-pointer text-xl text-center">
              <img
                className="m-auto rounded-full object-cover"
                style={{
                  width: "40vw",
                  height: "40vw",
                  maxHeight: "200px",
                  maxWidth: "200px",
                }}
                src={props.syncData.receiver.image}
              ></img>
              <div className="pt-4 truncate">
                {props.syncData.receiver.slug}
              </div>
            </div>
          </Link>
        </div>
        <div className="p-8 text-xl w-full text-center">
          {props.syncData.compatibility}%<br></br>
          compatible
        </div>
      </div>
    );
  }
};

export default Compatibility;
