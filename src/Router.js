import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

// components
import BottomBar from "./components/BottomBar";
import Sidebar from "./components/Sidebar";

// styles
import Container from "./styles/Container";

// pages
import Home from "./pages/Home";
import WatchVideo from "./pages/WatchVideo";
import LikedVideos from "./pages/LikedVideos";

const AppRouter = () => (
  <Router basename="/react-video">
    <Sidebar />
    <BottomBar />
    <Container>
      <Switch>
        <Route path="/watch/:videoId" component={WatchVideo} />
        <Route path="/feed/liked_videos" component={LikedVideos} />
        <Route path="/:page" component={Home} />
        <Redirect to="/1" />
      </Switch>
    </Container>
  </Router>
);

export default AppRouter;
