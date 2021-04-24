import React from "react";
import { Link } from "react-router-dom";

const Navigator = () => {
  return (
    <div>
      <h1 className="navigator-header">scrobbli.</h1>
      <div className="navigator-button-group">
        <Link className="navigator-button" to="/toptracks">
          Top Tracks{" "}
        </Link>
        <Link className="navigator-button" to="/search">
          Search{" "}
        </Link>
        <Link className="navigator-button" to="/about">
          About{" "}
        </Link>
      </div>
    </div>
  );
};

export default Navigator;
