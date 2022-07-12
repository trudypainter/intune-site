import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

const Landing = () => {
  const { data: session } = useSession();

  return (
    <div className="w-full top-0 h-[800px] bg-gradient-to-b from-indigo-500">
      {" "}
      <div className="w-10/12  mx-auto pt-20">
        <div className="mx-auto tracking-tight w-fit text-8xl font-bold text-white">
          In Tune{" "}
        </div>
      </div>
      <div
        onClick={() => signIn()}
        className="mx-auto my-20 px-8 py-3 w-fit rounded-3xl text-xl text-indigo-500 bg-white  shadow-md shadow-white hover:cursor-pointer "
      >
        Sign In
      </div>
    </div>
  );
};

export default Landing;
