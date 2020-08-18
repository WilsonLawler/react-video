import React, { useEffect, useState } from "react";
import { get, isEmpty } from 'lodash';
import styled, { css } from "styled-components";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import VideoCard from "../components/VideoCard";
import Player from "../components/Player";
import NoResults from "../components/NoResults";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Button from '../styles/Button';
import {
  getRecommendations,
  getVideo,
  likeVideo,
  cancelLike,
  cancelDislike,
} from "../actions";
import { getNumberWithCommas } from "../utils";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 70% 1fr;
  grid-gap: 2rem;
  padding: 1.3rem;
  padding-bottom: 7rem;

  a {
    text-decoration: none;
  }

  .video-container .video-info {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .video-info span {
    color: ${(props) => props.theme.secondaryColor};
  }

  .channel-info-flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .video-info-stats {
    display: flex;
    align-items: center;
  }

  .video-info-stats div {
    margin-left: 6rem;
    position: relative;
    top: -2px;
  }

  .channel-info-flex button {
    font-size: 0.9rem;
  }

  .channel-info-description {
    padding-top: 1rem;
    border-bottom: 1px solid ${(props) => props.theme.darkGrey};
    border-top: 1px solid ${(props) => props.theme.darkGrey};
  }

  .channel-info-description p {
    font-size: 0.9rem;
    padding: 1rem 0;
  }

  .related-videos img {
    height: 140px;
  }

  .related-videos div {
    margin-bottom: 1rem;
  }

  @media screen and (max-width: 1740px) {
    button {
      display: none;
    }
  }

  @media screen and (max-width: 1093px) {
    button {
      display: inline;
    }
  }

	@media screen and (max-width: 930px) {
    grid-template-columns: 90%;
    .related-videos {
      display: none;
    }
    
  }

  @media screen and (max-width: 930px) {
    grid-template-columns: 1fr;
  }

  @media screen and (max-width: 425px) {
    .video-info-stats div {
      margin-left: 1rem;
    }
  }
`;

const WatchVideo = ({
  isFetching,
  next,
  video,
  getVideo,
  getRecommendations,
  likeVideo,
  cancelLike,
  cancelDislike,
  notfound,
}) => {
  const { videoId } = useParams();
  const [saveArray, setSaveArray] = useState([]);
  const [inSaved, setInsaved] = useState(false);
  const [inCanceled, setInCanceled] = useState(false);
  const title = get(video, 'video.snippet.title', '');
  const view = get(video, 'video.statistics.viewCount', '');
  const description = get(video, 'video.snippet.description', '');

  useEffect(() => {
    const retrievedData = localStorage.getItem("savedVideos");
    const savedVideos = JSON.parse(retrievedData);

    if (!isEmpty(savedVideos)) {
      setSaveArray(savedVideos);
      const item = savedVideos.filter(item => item.id === videoId);
      if (!isEmpty(item)) {
        setInsaved(true);
        if (inCanceled) {
          setInCanceled(false);
        }
      } else if (isEmpty(item)) {
        setInsaved(false);
        setInCanceled(false);
      }
    } else if (isEmpty(savedVideos)) {
      setInsaved(false);
      setInCanceled(false);
    }


  }, [videoId])

  const handleLike = () => {
    if (inSaved === false) {
      likeVideo(video.video);
      setSaveArray([...saveArray, video.video]);
      localStorage.setItem("savedVideos", JSON.stringify([...saveArray, video.video]));
      setInsaved(true);
      setInCanceled(false);
    }
  };

  const cancelHandleLike = () => {
    if (inCanceled === false) {
      cancelLike(videoId);
      const arr = saveArray.filter(item => item.id !== videoId);
      setSaveArray([...arr]);
      localStorage.setItem("savedVideos", JSON.stringify([...arr]));
      setInCanceled(true);
      setInsaved(false);
    }
  }


  if (notfound) {
    return (
      <NoResults
        title="Page not found"
        text="The page you are looking for is not found or it may have been removed"
      />
    );
  }


  return (
    <Wrapper
    >
      <div className="video-container">
        <div className="video"><Player /></div>

        <div className="video-info">
          <h3>{title}</h3>

          <div className="video-info-stats">
            <p>
              <span>{getNumberWithCommas(view) || 0} views</span> <span>•</span>{" "}
            </p>
            <p>{description.substring(0, 40) + "..."}</p>

            <div className="likes-dislikes flex-row">
              <p className="flex-row like">
                <AddIcon onClick={handleLike} color={inSaved ? 'primary' : ''} />{" "}
                <span>收藏</span>
              </p>
              <p className="flex-row dislike" style={{ marginLeft: "1rem" }}>
                <RemoveIcon onClick={cancelHandleLike} color={inCanceled ? 'secondary' : ''} />{" "}
                <span>取消收藏</span>
              </p>
            </div>
          </div>
          <Link to="/feed/liked_videos">
            <Button>我的收藏</Button>
          </Link>

        </div>
      </div>

      <div className="related-videos">
        <h3 style={{ marginBottom: "1rem" }}>推薦影片</h3>
        {!isFetching &&
          next
            .filter((vid) => vid.id !== video.id)
            .slice(0, 3)
            .map((video) => (
              <Link key={video.id} to={`/watch/${video.id}`} onClick={() => {
                getVideo(video);
              }}>
                <VideoCard key={video.id} hideavatar={true} video={video} />
              </Link>
            ))}
      </div>
    </Wrapper>
  );
};

const mapStateToProps = ({ notfound, video, recommendation }) => ({
  isFetching: video.isFetching || recommendation.isFetching,
  video,
  next: recommendation.videos,
  notfound,
});

export default connect(mapStateToProps, {
  getVideo,
  cancelLike,
  getRecommendations,
  likeVideo,
  cancelDislike,
})(WatchVideo);
