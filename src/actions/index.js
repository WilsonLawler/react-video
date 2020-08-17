import {
  SIGNUP,
  LOGIN,
  LOGOUT,
  GET_FEED,
  GET_VIDEO,
  CLEAR_VIDEO,
  ADD_COMMENT,
  GET_PROFILE,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  OPEN_SIDEBAR,
  CLOSE_SIDEBAR,
  GET_RECOMMENDATIONS,
  GET_CHANNEL_RECOMMENDATIONS,
  LIKE,
  DISLIKE,
  CANCEL_LIKE,
  CANCEL_DISLIKE,
  GET_SEARCH_RESULTS,
  CLEAR_SEARCH_RESULTS,
  GET_TRENDING,
  ADD_CHANNEL,
  REMOVE_CHANNEL,
  GET_LIKED_VIDEOS,
  UPDATE_USER,
  ADD_TO_LIKED_VIDEOS,
  REMOVE_FROM_LIKED_VIDEOS,
  ADD_TO_RECOMMENDATIONS,
  GET_HISTORY,
  SHOW_NOT_FOUND,
  CLEAR_NOT_FOUND,
  ADD_TO_HISTORY,
} from "./types";

import api from "../services/api";
import {
  addChannelLocalSt,
  removeChannelLocalSt,
  authenticate,
} from "../utils";


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
