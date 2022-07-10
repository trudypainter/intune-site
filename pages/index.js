import { PrismaClient } from "@prisma/client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

export default function Home() {
  const { data: session } = useSession();
  const [list, setList] = useState([]);

  console.log("🟢", session?.token);

  const getMyPlaylists = async () => {
    const res = await fetch("/api/playlists");
    const { items } = await res.json();
    setList(items);
  };

  const getUserItem = async () => {
    const res = await fetch("/api/user");
    const json = await res.json();
    console.log("⭐️ looking ofr user obj", json);
  };

  const saveToDatabase = async (item) => {
    const res = await fetch("api/playlists", {
      method: "POST",
      body: JSON.stringify(item),
    });
    const data = await res.json();
    console.log(data);
  };

  if (session) {
    return (
      <>
        Signed in as {session?.token?.name} <br />
        <button onClick={() => signOut()}>Sign out</button>
        <button onClick={() => getUserItem()}>Get user</button>
        <hr />
        <button onClick={() => getMyPlaylists()}>Get all my playlists</button>
        {list.map((item) => (
          <div key={item.id}>
            <h1>{item.name}</h1>
            <img src={item.images[0]?.url} width="100" />
            <button onClick={() => saveToDatabase(item)}>
              Save in database
            </button>
          </div>
        ))}
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
