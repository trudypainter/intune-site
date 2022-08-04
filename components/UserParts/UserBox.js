import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

import Modal from "react-modal";
import QRCode from "react-qr-code";

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

const UserBox = (props) => {
  const [qrIsOpen, setQrOpen] = useState(false);

  function openQr() {
    setQrOpen(true);
  }
  function closeQr() {
    setQrOpen(false);
  }

  const makeSyncLoggedIn = async () => {
    // set loading page
    props.setLoading(true);
    console.log("🔵 making new sync request");
    const res = await fetch(`${server}api/sync`, {
      method: "POST",
      body: JSON.stringify({
        requester: props.session.session.user,
        receiver: props.userData.email,
      }),
    });
    const data = await res.json();
    console.log("🟡 sync response", data);
    // redirect to new sync page
    window.open("/sync/" + data.id, "_self");
  };

  let syncedWith = undefined;
  console.log(props.session);
  if (props.session && props.userData.syncReceived) {
    for (let sync of props.userData.syncReceived) {
      if (sync.requester.email === props.session.session.user.email) {
        syncedWith = sync;
      }
    }
    for (let sync of props.userData.syncRequested) {
      if (sync.receiver.email === props.session.session.user.email) {
        syncedWith = sync;
      }
    }
  }
  console.log("🏁 SYNCHED WIHT", syncedWith);

  return (
    <div className="mt-10 mx-auto grid grid-cols-2">
      <div className="">
        <img
          className="rounded-full object-cover"
          style={{ width: "40vw", height: "40vw" }}
          src={props.userData.image}
        ></img>
      </div>
      <div className="text-center">
        <div className="p-2 text-2xl">{props.userData.name}</div>

        <div id="slug-label" className="text-xl">
          in-tune.app/{props.userData.slug}
        </div>

        <div className="pt-8 flex justify-center space-x-4">
          {syncedWith === undefined ? (
            <div
              onClick={() => makeSyncLoggedIn()}
              className="text-3xl mt-4 p-8 rounded-md bg-indigo-500 text-white hover:cursor-pointer"
            >
              SYNC
            </div>
          ) : (
            <Link href={"/sync/" + syncedWith.id}>
              <div className="text-3xl mt-4 p-8 rounded-md bg-indigo-100 text-black hover:cursor-pointer">
                View Sync
              </div>
            </Link>
          )}
        </div>

        <div className="pt-8 flex justify-center space-x-4">
          <Link
            href={"https://open.spotify.com/user/" + props.userData.accounts}
          >
            Spotify
          </Link>
          <RWebShare
            data={{
              text: "Check out this InTune profile.",
              url: server + props.userData.slug,
              title: "InTune",
            }}
          >
            <button>Share</button>
          </RWebShare>
          <button onClick={openQr}>QR Code</button>
        </div>
      </div>

      <Modal isOpen={qrIsOpen} onRequestClose={closeQr} style={customStyles}>
        <div style={{ background: "white", padding: "16px" }}>
          <QRCode value={server + "qr/" + props.userData.id} />
        </div>
      </Modal>
    </div>
  );
};

export default UserBox;
