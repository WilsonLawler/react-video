import React, { useEffect, useState, useRef } from "react";
import { get, isEmpty } from 'lodash';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import Pagination from 'react-bootstrap/Pagination';
import 'bootstrap/dist/css/bootstrap.min.css';
import VideoCard from "../components/VideoCard";
import VideoGrid from "../styles/VideoGrid";
import { getRecommendations, getVideo } from "../actions";
import Skeleton from "../skeletons/HomeSkeleton";
import { GET_VIDEO } from '../actions/types';

export const StyledHome = styled.div`
  padding: 1.3rem;
  width: 90%;
  margin: 0 auto;
  padding-bottom: 7rem;

  h2 {
    margin-bottom: 1rem;
  }

  @media screen and (max-width: 1093px) {
    width: 95%;
  }

  @media screen and (max-width: 1090px) {
    width: 99%;
  }

  @media screen and (max-width: 870px) {
    width: 90%;
  }

  @media screen and (max-width: 670px) {
    width: 99%;
  }

  @media screen and (max-width: 600px) {
    width: 90%;
  }

  @media screen and (max-width: 530px) {
    width: 100%;
  }
`;



const Home = ({ isFetching, videos, getRecommendations, getVideo, match, nextPageToken }) => {

  const [active, setActive] = useState(1);
  const [alreadyRender, setAlreadyRender] = useState(false);
  const page = get(match, 'params.page', '1');
  // useEffect(() => {
  //   if (!isEmpty(page) && !isEmpty(nextPageToken) && !alreadyRender) {
  //     setActive(Number(page));
  //     getRecommendations(nextPageToken);
  //     setAlreadyRender(true);
  //   }
  // }, [nextPageToken])
  let items = [];
  for (let number = 1; number < Math.ceil(50 / 12); number++) {
    items.push(
      <Pagination.Item key={number} active={number === active} href={`/${number}`}>
        {number}
      </Pagination.Item>,
    );
  }

  useEffect(() => {
    setActive(Number(page));
    getRecommendations();
  }, []);

  if (isFetching) {
    return <Skeleton title={true} />;
  }


  return (
    <StyledHome>
      <h2>Recommended</h2>
      <VideoGrid>
        {!isFetching &&
          videos.map((video) => (
            <Link key={video.id} to={`/watch/${video.id}`} onClick={() => {
              getVideo(video);
            }}>
              <VideoCard video={video} />
            </Link>
          )).slice((Number(page) - 1) * 12 + Number(page) - 1, Number(page) - 1 + Number(page) * 12)}
      </VideoGrid>
      <Pagination>{items}</Pagination>
    </StyledHome>
  );
};

const mapStateToProps = ({ recommendation }) => ({
  isFetching: recommendation.isFetching,
  videos: recommendation.videos,
  nextPageToken: recommendation.nextPageToken
});
// const mapDispatchToProps = dispatch => {
//   return {
//     onLinkClick: (video) => {
//       dispatch({
//         type: GET_VIDEO,
//         payload: {
//           isFetching: false,
//           video
//         },
//       });
//     },
//     getRecommendations
//   }
// }

export default connect(mapStateToProps, { getRecommendations, getVideo })(Home);
