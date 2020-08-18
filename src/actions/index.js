import {
  GET_VIDEO,
  CLOSE_SIDEBAR,
  GET_RECOMMENDATIONS,
  LIKE,
  CANCEL_LIKE,
  CANCEL_DISLIKE,
  GET_TRENDING,
  GET_LIKED_VIDEOS,
  ADD_TO_LIKED_VIDEOS,
  REMOVE_FROM_LIKED_VIDEOS,
  SHOW_NOT_FOUND,
} from "./types";

import api from "../services/api";


export const getRecommendations = (pageToken = null) => async (dispatch) => {
  const res = await api.get("/videos", {
    params: {
      type: 'video',
      part: 'snippet,contentDetails,statistics',
      chart: 'mostPopular',
      maxResults: 100,
      key: 'AIzaSyDcK11Qfn3aYLfvPiBPHXWFOWxEZOvV-5Q',
      pageToken

      // https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&chart=mostPopular&maxResults=3&key=
    }
  });

  dispatch({
    type: GET_RECOMMENDATIONS,
    payload: {
      isFetching: false,
      videos: res.data.items,
      nextPageToken: res.data.nextPageToken
    },
  });
};

export const getTrending = () => async (dispatch) => {
  const res = await api.get("videos");

  const videos = res.data.data;
  videos.sort((a, b) => b.views - a.views);

  dispatch({
    type: GET_TRENDING,
    payload: {
      isFetching: false,
      videos,
    },
  });
};


export const getVideo = (video) => async (dispatch) => {
  try {
    dispatch({
      type: GET_VIDEO,
      payload: {
        isFetching: false,
        video,
      },
    });
  } catch (err) {
    dispatch({
      type: SHOW_NOT_FOUND,
    });
  }
};


export const likeVideo = (video) => async (dispatch) => {
  dispatch({
    type: LIKE,
  });

  dispatch({
    type: ADD_TO_LIKED_VIDEOS,
    payload: video,
  });
};

export const cancelLike = (videoId) => async (dispatch) => {
  dispatch({
    type: CANCEL_LIKE,
  });

  dispatch({
    type: REMOVE_FROM_LIKED_VIDEOS,
    payload: videoId,
  });
};


export const cancelDislike = (videoId) => async (dispatch) => {
  dispatch({
    type: CANCEL_DISLIKE,
  });

  await api.get(`videos/${videoId}/dislike`);
};

export const getLikedVideos = () => async (dispatch) => {
  const res = await api.get("users/likedVideos");

  dispatch({
    type: GET_LIKED_VIDEOS,
    payload: {
      isFetching: false,
      videos: res.data.data,
    },
  });
};

export const closeSidebar = () => ({ type: CLOSE_SIDEBAR });
