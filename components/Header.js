import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();

  console.log("🔴session", session);
  return (
    <div className="z-10  w-full flex sticky top-0">
      <div className=" bg-neongreen text-red-100 w-1/2 text-center p-2">
        <Link href="/about">Intune</Link>
      </div>
      <div className=" bg-black text-white w-1/2 text-center p-2">
        {!session ? (
          <div onClick={() => signIn()}>Sign In</div>
        ) : (
          <Link href="/">
            {/* <div className="h-12 w-12 m-2 rounded-full hover:cursor-pointer text-center pt-t">
              <img
                className=" rounded-full"
                src={session?.token?.picture}
              ></img>{" "}
            </div> */}
            Profile
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
