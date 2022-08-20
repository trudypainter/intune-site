import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { RWebShare } from "react-web-share";
import Image from "next/image";

const server =
  process.env.NODE_ENV === "production"
    ? "https://in-tune.vercel.app/"
    : "http://localhost:3000/";

const Footer = (props) => {
  const { data: session } = useSession();

  console.log("🔴session", session);
  return (
    <div className="z-10  w-full flex sticky bottom-0">
      <div className="w-full bg-neongreen text-center p-2">
        <RWebShare
          data={{
            text: "Check out this InTune profile.",
            url: server + props.link,
            title: "InTune",
          }}
        >
          <button>
            Share
            <Image width="38px" height="36px" src="/assets/share.png" />
          </button>
        </RWebShare>
      </div>
    </div>
  );
};

export default Footer;
