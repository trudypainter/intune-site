import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { useSession, signIn, signOut } from "next-auth/react";
import TrackList from "./TrackList";
import ArtistList from "./ArtistList";

const selectedButtonCSS =
  "bg-black text-white p-1 hover:cursor-pointer mx-0.5 border-2 text-xs";
const unSelectedButtonCSS =
  "bg-white text-black p-1 hover:cursor-pointer mx-0.5 border-2 text-xs";

const server =
  process.env.NODE_ENV === "production"
    ? "https://in-tune.vercel.app/"
    : "http://localhost:3000/";

const ProfileStats = (props) => {
  const [allInfo, setAllInfo] = useState(props.userData.listening);
  // console.log("✅PROFILE STATS", allInfo);
  const [selectedInfo, setSelectedInfo] = useState(
    props.userData.listening.tracks["short_term"]
  );

  const [trackSelected, setTrackSelected] = useState(true);
  const [dataType, setDataType] = useState("tracks");

  const [shortSelected, setShortSelected] = useState(true);
  const [medSelected, setMedSelected] = useState(false);
  const [longSelected, setLongSelected] = useState(false);
  const [timeRange, setTimeRange] = useState("short_term");

  const shortClicked = () => {
    setShortSelected(true);
    setMedSelected(false);
    setLongSelected(false);
    setTimeRange("short_term");

    setSelectedInfo(allInfo[dataType]["short_term"]);
  };

  const mediumClicked = () => {
    setShortSelected(false);
    setMedSelected(true);
    setLongSelected(false);
    setTimeRange("medium_term");

    setSelectedInfo(allInfo[dataType]["medium_term"]);
  };

  const longClicked = () => {
    setShortSelected(false);
    setMedSelected(false);
    setLongSelected(true);
    setTimeRange("long_term");

    setSelectedInfo(allInfo[dataType]["long_term"]);
  };

  return (
    <div className="mt-2 mx-auto ">
      {/* ⭐️ TYPE */}
      <div className="text-center sticky top-11">
        <div className="grid grid-cols-2 text-center">
          <div
            onClick={() => {
              setTrackSelected(true);
              setDataType("tracks");
              setSelectedInfo(allInfo["tracks"][timeRange]);
            }}
            className={trackSelected ? selectedButtonCSS : unSelectedButtonCSS}
          >
            Songs
          </div>
          <div
            onClick={() => {
              setTrackSelected(false);
              setDataType("artists");
              setSelectedInfo(allInfo["artists"][timeRange]);
            }}
            className={!trackSelected ? selectedButtonCSS : unSelectedButtonCSS}
          >
            Artists
          </div>
        </div>
        {/* ⭐️ TIME RANGE */}
        <div className="grid my-1 grid-cols-3 text-center">
          <div
            onClick={() => {
              shortClicked();
            }}
            className={shortSelected ? selectedButtonCSS : unSelectedButtonCSS}
          >
            2 Weeks
          </div>
          <div
            onClick={() => {
              mediumClicked();
            }}
            className={medSelected ? selectedButtonCSS : unSelectedButtonCSS}
          >
            6 Months
          </div>
          <div
            onClick={() => {
              longClicked();
            }}
            className={longSelected ? selectedButtonCSS : unSelectedButtonCSS}
          >
            All Time
          </div>
        </div>
      </div>

      {/* ⭐️ DATA DISPLAY */}
      <div className="w-11/12 m-auto mt-2">
        {trackSelected ? (
          <TrackList items={selectedInfo} />
        ) : (
          <ArtistList items={selectedInfo} />
        )}
      </div>
    </div>
  );
};

export default ProfileStats;
