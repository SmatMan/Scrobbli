import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./css/style.css";

import TopTracks from "./components/TopTracks.js";
import Navigator from "./components/Navigator.js";
import About from "./components/About.js";
import Error from "./components/Error.js";

function App() {
  return (
    <Switch>
      <Route path="/" component={Navigator} exact />
      <Route path="/toptracks" component={TopTracks} exact />
      <Route path="/about" component={About} exact />
      <Route component={Error} />
    </Switch>
  );
}

export default App;
