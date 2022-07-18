import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

import Modal from "react-modal";

const server =
  process.env.NODE_ENV === "production"
    ? "https://in-tune.vercel.app/"
    : "http://localhost:3000/";

const UserBox = (props) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState("");
  // const [slug, setSlug] = useState(props.userData.slug);
  console.log("⭐️ slug", props.userData.slug);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const updateSlug = async (newSlug) => {
    setStatus("Checking...");
    console.log("🔵", newSlug);
    const res = await fetch(`${server}api/updateSlug`, {
      method: "POST",
      body: JSON.stringify({
        slug: newSlug,
        email: props.session.session.user.email,
      }),
    });
    const data = await res.json();
    console.log("🟠 slug response", data);

    if (data.failure) {
      setStatus(data.failure);
    } else {
      setStatus("");
      setIsOpen(false);
      document.getElementById("slug-label").innerHTML =
        "in-tune.app/" + newSlug;
    }
  };

  return (
    <div className="mt-10 mx-auto grid grid-cols-2">
      <div className="">
        <img className="rounded-full" src={props.userData.image}></img>
      </div>
      <div className="text-center">
        <div className="p-2 text-2xl">{props.userData.name}</div>

        <div id="slug-label" className="text-xl">
          in-tune.app/{props.userData.slug}
        </div>

        <div className="pt-8 flex justify-center space-x-4">
          <div className="text-3xl mt-4 p-8 rounded-md bg-indigo-500 text-white hover:cursor-pointer">
            SYNC
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBox;
