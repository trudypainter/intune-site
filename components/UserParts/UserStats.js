import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { useSession, signIn, signOut } from "next-auth/react";
import ArtistList from "../ProfileParts/ArtistList";
import TrackList from "../ProfileParts/TrackList";

const selectedButtonCSS =
  "bg-indigo-500 text-white p-2 rounded-2xl hover:cursor-pointer mx-1";
const unSelectedButtonCSS =
  "bg-indigo-100 text-black p-2 rounded-2xl hover:cursor-pointer mx-1";

const server =
  process.env.NODE_ENV === "production"
    ? "https://in-tune.vercel.app/"
    : "http://localhost:3000/";

const UserStats = (props) => {
  const allInfo = props.userData.listening;
  // console.log("✅PROFILE STATS", allInfo);
  const [selectedInfo, setSelectedInfo] = useState([]);

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

  useEffect(() => {
    if (props.userData.listening) {
      setSelectedInfo(props.userData.listening["tracks"]["short_term"]);
    }
  }, [props.userData.listening]);

  return (
    <div className="mt-10 mx-auto ">
      <div className="text-2xl mb-4">Recent Listening</div>

      {/* ⭐️ TYPE */}
      <div className="grid grid-cols-2 text-center sticky top-20">
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
      <div className="grid my-2 grid-cols-3 text-center sticky top-32">
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

export default UserStats;
