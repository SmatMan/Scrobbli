import { configure } from "@testing-library/dom";
import React, { useEffect, useState } from "react";

import "./App.css";
import { LastFMkey } from "./config.js"; //import a config with a LastFM API key with the variable name LastFMkey

function App() {
  const [tracks, setTracks] = useState({ songs: [] });
  const [username, setUsername] = useState("ImSmatMan");
  const [length, setLength] = useState("50");
  const [timePeriod, setTime] = useState("7day");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    var parsedData = { songs: [] };
    console.log(LastFMkey);
    await fetch(
      "https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=" +
        username +
        "&api_key=" +
        LastFMkey +
        "&format=json&period=" +
        timePeriod +
        "&limit=" +
        length
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        response.toptracks.track.forEach((track, index) => {
          parsedData.songs.push({
            name: track["name"],
            artist: track["artist"]["name"],
            playCount: track["playcount"],
          });
        });
        console.log(parsedData);
        return parsedData;
      })
      .then((parsedData) => setTracks(parsedData))
      .catch((e) => {
        console.log(e);
        setTracks({ songs: ["N/A"] });
      });
  }

  return (
    <div className="background">
      <h1 className="header">
        {username}'s Top {length} Songs <br />
        {timePeriod === "7day"
          ? "this week"
          : timePeriod === "overall"
          ? "of all time"
          : timePeriod === "1month"
          ? "in the last month"
          : timePeriod === "3month"
          ? "in the last three months"
          : timePeriod === "6month"
          ? "in the last six months"
          : timePeriod === "12month"
          ? "in the last twelve months"
          : ""}
      </h1>
      <div className="usernameUpdateBox">
        <input
          className="usernameBox"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="timeBox"
          type="text"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
        <select
          className="usernameBox"
          value={timePeriod}
          onChange={(e) => {
            setTime(e.target.value);
            fetchData();
          }}
        >
          <option value="overall">All Time</option>
          <option value="7day">7 Days</option>
          <option value="1month">1 Month</option>
          <option value="3month">3 Months</option>
          <option value="6month">6 Months</option>
          <option value="12month">12 Months</option>
        </select>
        <button className="updateButton" onClick={() => fetchData()}>
          update
        </button>
      </div>
      <div>
        {tracks.songs.map((data, index) => (
          <div className="songContainer">
            <p className="index">{index + 1}</p>
            <h1 className="songTitle">{data.name}</h1>
            <h4 className="songArtist">{data.artist}</h4>
            <p className="playCount">{data.playCount} plays</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
