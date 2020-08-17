import React from "react";
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import { isEmpty, get } from 'lodash';
import styled from "styled-components";
import { getNumberWithCommas } from "../utils";

momentDurationFormatSetup(moment);

const Wrapper = styled.div`
  .thumb {
    width: 100%;
    height: 180px;
    object-fit: cover;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  .video-info-container {
    display: flex;
    margin-top: 0.3rem;
  }

  .channel-avatar img {
    position: relative;
    top: 5px;
  }

  .video-info span {
    font-size: 0.9rem;
    padding-right: 0.1rem;
  }

  @media screen and (max-width: 600px) {
    .thumb {
      height: 250px;
    }
  }

  @media screen and (max-width: 420px) {
    .thumb {
      height: 200px;
    }
  }
`;

const VideoCard = ({ video }) => {
  const snippet = get(video, 'snippet', {});
  const statistics = get(video, 'statistics', {});
  const contentDetails = get(video, 'contentDetails', {});
  // 
  const thumbnail = get(snippet, 'thumbnails.maxres.url', '');
  const channelTitle = get(snippet, 'channelTitle', '');
  const title = get(snippet, 'title', '');
  const viewCount = get(statistics, 'viewCount', '');
  const duration = get(contentDetails, 'duration', '');
  return (
    <Wrapper>
      <img className="thumb" src={thumbnail} alt="thumbnail" />
      <div className="video-info-container">
        <div className="video-info">
          <h4>
            {title.length > 40
              ? title.substring(0, 40) + "..."
              : title}
          </h4>
          {!isEmpty(channelTitle) && (
            <span className="secondary">{channelTitle}</span>
          )}
          <p className="secondary">
            <span>{getNumberWithCommas(viewCount) || 0} views</span> <span>•</span>{" "}
            <span>{moment.duration(duration).format('mm:ss')}</span>
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default VideoCard;
