import React from "react";
import styled from "styled-components";
import { get } from 'lodash';
import { timeSince, getNumberWithCommas } from "../utils";

const Wrapper = styled.div`
  margin: 1.4rem 0;
  margin-top: 1rem;
  display: flex;

  .thumb {
    width: 250px;
    height: 140px;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  .video-info-container {
    margin-left: 1.2rem;
  }

  p {
    font-size: 0.9rem;
  }

  p:last-child {
    margin-top: 0.2rem;
  }

  p span {
    padding-right: 0.3rem;
  }

  @media screen and (max-width: 750px) {
    margin: 1.2rem 0;

    .video-info-container {
      margin-left: 1.5rem;
    }
  }

  @media screen and (max-width: 645px) {
    flex-direction: column;

    .video-info-container {
      padding-bottom: 1rem;
    }

    .thumb {
      width: 100%;
      height: 300px;
    }

    .video-info-container {
      margin-left: 0;
      margin-top: 1rem;
    }
  }

  @media screen and (max-width: 530px) {
    .thumb {
      width: 100%;
      height: 250px;
    }
  }

  @media screen and (max-width: 420px) {
    .thumb {
      width: 100%;
      height: 200px;
    }
  }
`;

const TrendingCard = ({ video }) => {
  const snippet = get(video, 'snippet', {});
  const statistics = get(video, 'statistics', {});
  // 
  const thumbnail = get(snippet, 'thumbnails.maxres.url', '');
  const title = get(snippet, 'title', '');
  const viewCount = get(statistics, 'viewCount', '');
  const description = get(snippet, 'description', '');

  return (
    <Wrapper>
      <img className="thumb" src={thumbnail} alt="thumbnail" />
      <div className="video-info-container">
        <h3>{title}</h3>
        <p className="secondary">
          {/* <span>{video.User.username}</span> */}
          <span>•</span>
          <span>{getNumberWithCommas(viewCount) || 0} views</span>
        </p>
        <p className="secondary">{description.substr(0, 130)}</p>
      </div>
    </Wrapper>
  );
};

export default TrendingCard;
