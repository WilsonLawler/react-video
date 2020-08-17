import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { StyledTrending } from "./Trending";
import TrendingCard from "../components/TrendingCard";
import { getLikedVideos, getVideo } from "../actions";

const LikedVideos = ({ isFetching, videos, getLikedVideos }) => {


  return (
    <StyledTrending>
      <h2>Liked Videos</h2>

      {videos?.length === 0 && (
        <p className="secondary">
          Videos that you have liked will show up here
        </p>
      )}

      {videos.map((video) => (
        <Link to={`/watch/${video.id}`} key={video.id} onClick={() => {
          getVideo(video);
        }}>
          <TrendingCard video={video} />
        </Link>
      ))}
    </StyledTrending>
  );
};

const mapStateToProps = ({ likedVideo }) => ({
  isFetching: likedVideo.isFetching,
  videos: likedVideo.videos,
});

export default connect(mapStateToProps, { getLikedVideos, getVideo })(LikedVideos);