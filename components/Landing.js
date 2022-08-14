import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

const Landing = () => {
  const { data: session } = useSession();

  return (
    <div className="w-full">
      {/* SPINNER */}
      <div className="w-10/12 text-center  mx-auto pt-20">In Tune </div>
      <div onClick={() => signIn()} className="w-24 mx-auto text-center">
        Sign In
      </div>
      {/* MIDDLE */}
      <div className="w-full bg-black text-white p-8">
        Scan. Sync. Connect.
        <br></br>
        <br></br>
        InTune finds your compatibility using music.
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
          <Link href={"/arisss"}>
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
