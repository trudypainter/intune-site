import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();

  console.log("🔴session", session);
  return (
    <div className="z-10 w-full flex justify-between p-1 bg-indigo-500 sticky top-0">
      <div className="text-xl text-white m-4 ml-8">
        <Link href="/">Intune</Link>
      </div>
      <div>
        {!session ? (
          <div
            onClick={() => signIn()}
            className="m-2 px-4 py-2 w-fit rounded-3xl text-l text-indigo-500 bg-white   shadow-white hover:cursor-pointer "
          >
            Sign In
          </div>
        ) : (
          <div className="h-12 w-12 m-2 rounded-full">
            <img className=" rounded-full" src={session?.token?.picture}></img>{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
