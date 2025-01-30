import { createSlice } from "@reduxjs/toolkit";
import { post } from "../../axios";

const initialState = {
    topics: [],
    status: "idle",
    error: null,
};

const topicsSlice = createSlice({
    name: "topics",
    initialState,
    reducers: {
      likeTopic: (state, action) => {
        const topic = state.topics.find((t) => t.topicId === action.payload);
        if (topic) topic.likePercentage += 1;
      },
      dislikeTopic: (state, action) => {
        const topic = state.topics.find((t) => t.topicId === action.payload);
        if (topic) topic.dislikePercentage += 1;
      },
      setTopics: (state, action) => {
        state.topics = action.payload;
      },
      setLoadingStatus: (state, action) => {
        state.status = action.payload;
      },
      setError: (state, action) => {
        state.error = action.payload;
      },
    },
  });
  
  export const { likeTopic, dislikeTopic, setTopics, setLoadingStatus, setError } = topicsSlice.actions;
  
  export default topicsSlice.reducer;
  
  export const fetchTopics = () => (dispatch) => {
    dispatch(setLoadingStatus("loading"));
    post("http://localhost:7373/api/topic/list")
      .then((response) => {
        if (response.code === 200) {
          dispatch(setTopics(response.data));
          dispatch(setLoadingStatus("succeeded"));
        } else {
          dispatch(setError("Failed to fetch topics"));
          dispatch(setLoadingStatus("failed"));
        }
      })
      .catch((error) => {
        dispatch(setError(error.message));
        dispatch(setLoadingStatus("failed"));
      });
  };