import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { RWebShare } from "react-web-share";
import { MdIosShare } from "react-icons/md";

const server =
  process.env.NODE_ENV === "production"
    ? "https://in-tune.vercel.app/"
    : "http://localhost:3000/";

const Footer = (props) => {
  const { data: session } = useSession();

  console.log("🔴session", session);
  return (
    <div className="z-10  w-full flex sticky bottom-0">
      <div className="w-full bg-neongreen text-center p-1 hover:cursor-pointer">
        <RWebShare
          data={{
            text: "Check out this InTune profile.",
            url: server + props.link,
            title: "InTune",
          }}
        >
          <div className="flex justify-center">
            {" "}
            <div>Share</div>{" "}
            <div className="mt-1">
              <MdIosShare />
            </div>
          </div>
        </RWebShare>
      </div>
    </div>
  );
};

export default Footer;
