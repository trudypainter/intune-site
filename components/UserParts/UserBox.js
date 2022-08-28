import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

import Modal from "react-modal";
import QRCode from "react-qr-code";
import { RWebShare } from "react-web-share";

const icon_size = "40px";

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

const UserBox = (props) => {
  const [qrIsOpen, setQrOpen] = useState(false);

  function openQr() {
    setQrOpen(true);
  }
  function closeQr() {
    setQrOpen(false);
  }

  const makeSyncLoggedIn = async (session) => {
    console.log("🔵 making new sync request");
    const res = await fetch(`${server}api/sync`, {
      method: "POST",
      body: JSON.stringify({
        requester: session,
        receiver: props.userData.email,
      }),
    });
    const data = await res.json();
    console.log("🟡 sync response", data);
    // redirect to new sync page
    window.open("/sync/" + data.id, "_self");
  };

  const makeSync = async () => {
    // set loading page
    props.setLoading(true);

    if (props.session) {
      makeSyncLoggedIn(props.session);
    } else {
      console.log("💗 about to log in....");
      signIn("spotify", {
        callbackUrl:
          server +
          `/syncnoauth?email=${encodeURIComponent(props.userData.email)}`,
      });
    }
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
    <div className="pt-4 grid grid-cols-2 mx-auto w-[370px]">
      <div className="w-full ">
        <img
          className="rounded-full object-cover w-[160px] h-[160px] mx-auto"
          src={props.userData.image}
        ></img>{" "}
      </div>
      <div className="text-left text-xs ">
        <div className="px-1">{props.userData.name}</div>

        <div id="slug-label" className=" px-1  truncate w-[200px] ">
          @{props.userData.slug}
        </div>

        <div className="mt-1  flex justify-center space-x-4">
          {syncedWith === undefined ? (
            <h1
              onClick={() => makeSync()}
              className=" m-1 text-center w-full p-2 text-black bg-neongreen hover:cursor-pointer"
            >
              SYNC
            </h1>
          ) : (
            <Link href={"/sync/" + syncedWith.id}>
              <div className=" m-auto text-center w-[180px] p-2 text-white bg-black hover:cursor-pointer">
                View Sync
              </div>
            </Link>
          )}
        </div>

        <div className="mt-2 flex justify-center space-x-">
          <Link
            href={"https://open.spotify.com/user/" + props.userData.accounts}
          >
            <Image
              width="36px"
              height="36px"
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
              <Image width="38px" height="36px" src="/assets/share.png" />
            </button>
          </RWebShare>
          <button onClick={openQr}>
            {" "}
            <Image width="36px" height="36px" src="/assets/qr.png" />
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
        in-tune.app/{props.userData.slug}
      </Modal>
    </div>
  );
};

export default UserBox;
