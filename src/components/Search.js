import React, { useEffect, useState } from "react";
import { LastFMkey } from "../config.js";

const Search = () => {
  const [results, setResults] = useState({
    songs: [],
  });
  const [term, setTerm] = useState("");
  const [type, setType] = useState("tracks");

  useEffect(() => {
    fetchData();
  }, []);

  async function searchTracks() {
    var parsedData = {
      songs: [],
    };
    await fetch(
      "http://ws.audioscrobbler.com/2.0/?method=track.search&track=" +
        term +
        "&api_key=" +
        LastFMkey +
        "&limit=5&format=json"
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        response.results.trackmatches.track.forEach((track, index) => {
          parsedData.songs.push({
            name: track["name"],
            artist: track["artist"],
            url: track["url"],
          });
        });
        console.log(parsedData);
        return parsedData;
      })
      .then((parsedData) => setResults(parsedData))
      .catch((e) => {
        console.log(e);
        setResults({
          songs: ["N/A"],
        });
      });
  }
  async function searchAlbums() {
    var parsedData = {
      songs: [],
    };
    await fetch(
      "http://ws.audioscrobbler.com/2.0/?method=album.search&album=" +
        term +
        "&api_key=" +
        LastFMkey +
        "&limit=5&format=json"
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        response.results.albummatches.album.forEach((track, index) => {
          parsedData.songs.push({
            name: track["name"],
            artist: track["artist"],
            url: track["url"],
          });
        });
        console.log(parsedData);
        return parsedData;
      })
      .then((parsedData) => setResults(parsedData))
      .catch((e) => {
        console.log(e);
        setResults({
          songs: ["N/A"],
        });
      });
  }
  async function searchArtists() {
    var parsedData = {
      songs: [],
    };
    await fetch(
      "http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=" +
        term +
        "&api_key=" +
        LastFMkey +
        "&limit=5&format=json"
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        response.results.artistmatches.artist.forEach((track, index) => {
          parsedData.songs.push({
            name: track["name"],
            artist:
              track["listeners"]
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + " Listeners",
            url: track["url"],
          });
        });
        console.log(parsedData);
        return parsedData;
      })
      .then((parsedData) => setResults(parsedData))
      .catch((e) => {
        console.log(e);
        setResults({
          songs: ["N/A"],
        });
      });
  }

  async function fetchData() {
    if (type === "tracks") {
      searchTracks();
    } else if (type === "albums") {
      searchAlbums();
    } else if (type === "artists") {
      searchArtists();
    }
  }

  return (
    <div>
      <div>
        <h1 className="toptracks-header">
          {type === "tracks"
            ? "Song "
            : type === "albums"
            ? "Album "
            : type === "artists"
            ? "Artist "
            : ""}
          Results for {term != "" ? term : "N/A"}:
        </h1>
        <div className="toptracks-usernameUpdateBox">
          <input
            className="toptracks-usernameBox"
            type="text"
            value={term}
            placeholder="Search Here"
            onChange={(e) => {
              setTerm(e.target.value);
              fetchData();
            }}
          />
          <select
            className="toptracks-usernameBox"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              fetchData();
            }}
          >
            <option value="tracks">Songs</option>
            <option value="albums">Albums</option>
            <option value="artists">Artists</option>
          </select>
        </div>
        {results.songs.map((data, index) => (
          <div className="toptracks-songContainer">
            <p className="toptracks-index">{index + 1}</p>
            <h1 className="toptracks-songTitle">
              <a
                href={data.url}
                target="_blank"
                style={{ textDecoration: "none", color: "#1a0d0c" }}
              >
                {data.name}
              </a>
            </h1>
            <h4 className="toptracks-songArtist">{data.artist}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
