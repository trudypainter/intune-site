import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import TrackList from "./TrackList";
import ArtistList from "./ArtistList";
import User from "../User";

import Modal from "react-modal";

const server =
  process.env.NODE_ENV === "production"
    ? "https://in-tune.vercel.app/"
    : "http://localhost:3000/";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ProfileBox = (props) => {
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
      <div className=" ">
        <img className="rounded-full" src={props.session?.token?.picture}></img>{" "}
      </div>
      <div className="text-center ">
        <div className="p-2 text-2xl">{props.session?.token?.name}</div>

        <div id="slug-label" className="text-xl">
          in-tune.app/{props.userData.slug}
        </div>

        <div className="pt-8 flex justify-center space-x-4">
          <button onClick={() => signOut()}>Sign out</button>

          <button onClick={openModal}>Settings</button>
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div className="w-96">
              <label className="mt-4">Username</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
              />

              <div className="w-full grid grid-cols-2 text-center">
                <button className="p-2 m-2" onClick={closeModal}>
                  Back
                </button>
                <button
                  className="p-2 m-2 rounded-md text-white bg-indigo-500"
                  onClick={() =>
                    updateSlug(document.getElementById("username").value)
                  }
                >
                  Update
                </button>
              </div>
              <div className="w-full text-center" id="status">
                {status}
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ProfileBox;
