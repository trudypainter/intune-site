import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import TrackList from "./TrackList";
import ArtistList from "./ArtistList";
import User from "../User";
import Image from "next/image";

import Modal from "react-modal";
import QRCode from "react-qr-code";
import { RWebShare } from "react-web-share";

const icon_size = "42px";

const server =
  process.env.NODE_ENV === "production"
    ? "https://intune.site/"
    : "http://localhost:3000/";

const qrStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#4AFE2C",
    textAlign: "center",
    border: "2px solid black",
    borderRadius: "0px",
  },
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "2px solid black",
    borderRadius: "0px",
  },
};

const ProfileBox = (props) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const [qrIsOpen, setQrOpen] = useState(false);

  const [status, setStatus] = useState("");
  // const [slug, setSlug] = useState(props.userData.slug);
  console.log("⭐️ slug", props.userData.slug);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  function openQr() {
    setQrOpen(true);
  }
  function closeQr() {
    setQrOpen(false);
  }

  const updateSlug = async (newSlug) => {
    setStatus("Checking...");
    console.log("🔵", newSlug);
    const res = await fetch(`/api/updateSlug`, {
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
      document.getElementById("slug-label").innerHTML = "@" + newSlug;
    }
  };

  return (
    <div className="pt-4 mx-auto grid grid-cols-2 w-[370px]">
      <div className="w-full ">
        <img
          className="rounded-full object-cover w-[160px] h-[160px] mx-auto"
          src={props.session?.token?.picture}
        ></img>{" "}
      </div>
      <div className="text-left text-xs ">
        <div className="px-1">{props.session?.token?.name}</div>

        <div id="slug-label" className=" px-1 ">
          @{props.userData.slug}
        </div>

        <div className=" flex justify-center space-x-2 mt-1">
          <button onClick={openModal}>
            <Image
              width={icon_size}
              height={icon_size}
              layout="fixed"
              src="/assets/settings.png"
            />
          </button>
          <button onClick={() => signOut()}>
            <Image
              width={icon_size}
              height={icon_size}
              layout="fixed"
              src="/assets/exit.png"
            />
          </button>
        </div>

        <div className=" flex justify-center space-x-2 ">
          <Link
            href={"https://open.spotify.com/user/" + props.userData.accounts}
          >
            <Image
              width={icon_size}
              height={icon_size}
              layout="fixed"
              src="/assets/spotify.png"
            />
          </Link>
          <RWebShare
            data={{
              text: "Check out this InTune profile.",
              url: server + props.userData.slug,
              title: "InTune",
            }}
          >
            <button>
              {" "}
              <Image
                width={icon_size}
                height={icon_size}
                src="/assets/share.png"
              />
            </button>
          </RWebShare>
          <button onClick={openQr}>
            {" "}
            <Image width={icon_size} height={icon_size} src="/assets/qr.png" />
          </button>
        </div>
      </div>

      <Modal isOpen={qrIsOpen} onRequestClose={closeQr} style={qrStyles}>
        SCAN TO SYNC
        <div style={{ background: "black", padding: "16px" }}>
          <QRCode
            bgColor="#4AFE2C"
            value={server + "qr/" + props.userData.id}
          />
        </div>
        @{props.userData.slug}
      </Modal>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="w-[300px]">
          <label className="mt-2">Username</label>
          <input
            className="shadow appearance-none border-2 w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
          />

          <div className="w-full grid grid-cols-2 text-center">
            <button className="p-1 m-1" onClick={closeModal}>
              Back
            </button>
            <button
              className="p-2 m-1 text-black bg-neongreen"
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
  );
};

export default ProfileBox;
