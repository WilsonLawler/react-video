import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Button from '../styles/Button';
import { StyledTrending } from "./Trending";
import TrendingCard from "../components/TrendingCard";
import { getLikedVideos, getVideo } from "../actions";

const LikedVideos = ({ isFetching, videos, getLikedVideos, getVideo }) => {


  return (
    <StyledTrending>
      <h2>我的收藏</h2>

      {videos?.length === 0 && (
        <>
          <p className="secondary">
            您收藏的影片將會顯示於此
        </p>
          <Link to='/1'>
            <Button>回首頁</Button>
          </Link>
        </>
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
