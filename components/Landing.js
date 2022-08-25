import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

const Landing = () => {
  const { data: session } = useSession();

  return (
    <div className="w-full">
      {/* SPINNER */}
      <h1 className="w-10/12 text-center text-5xl mx-auto pt-12 pb-12">
        InTune{" "}
      </h1>
      <div
        onClick={() => signIn("spotify")}
        className="w-24 py-2 mx-auto text-center bg-black text-white mb-12 hover:cursor-pointer"
      >
        Sign In
      </div>
      {/* MIDDLE */}
      <div className="w-full  bg-black text-white p-8">
        <div className="mx-auto max-w-[600px]">
          We are InTune!
          <br></br>
          <br></br>3 students who came together because of our love for music.
          Our mission is to change the way people connect through music. We
          believe by sharing music interests we can make strengthen existing
          friendships and build new connections. And also find new music along
          the way!
          <br></br>
          <br></br>
          So let’s InTune!
        </div>
      </div>

      {/* FOUNDERS */}
      <div className="w-full bg-white text-black p-3 text-center">
        CONNECT WITH THE FOUNDERS
        <div className="w-full flex justify-center space-x-1 pt-2">
          <Link href={"/arisss"}>
            <div className="w-[180px] bg-white hover:cursor-pointer border-solid border-2">
              <img
                className="w-[160px] h-[160px] rounded-full object-cover m-auto mt-1"
                src="https://i.scdn.co/image/ab6775700000ee85cf7a46d5be41a8d3dfcd179d"
              />
              <div className="w-[180px] text-xs p-1">Aris</div>
              <div className="w-[180px] ml-[-2px] text-xs  border-2 border-b-0 bg-neongreen p-2 ">
                SYNC
              </div>
            </div>
          </Link>
          <Link href={"/trudy"}>
            <div className="w-[180px] bg-white hover:cursor-pointer border-solid border-2">
              <img
                className="w-[160px] h-[160px] rounded-full object-cover m-auto mt-1"
                src="https://i.scdn.co/image/ab6775700000ee85491ec692b12303c813c26bc4"
              />
              <div className="w-[180px] text-xs p-1">Trudy</div>
              <div className="w-[180px] ml-[-2px] mb-[-4px] text-xs  border-2 border-b-0 bg-neongreen p-2 ">
                SYNC
              </div>
            </div>
          </Link>
        </div>
      </div>
      {/* ELSEWHERE */}
      <div className="bg-black w-full text-center text-white py-4">
        ELSEWHERE
        <div className="flex w-10/12 text-center m-auto justify-center space-x-2">
          <Link href="insta"> IG</Link> <Link href="insta"> TIKTOK</Link>
        </div>{" "}
      </div>
    </div>
  );
};

export default Landing;
