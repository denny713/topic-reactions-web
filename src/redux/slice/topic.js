import { createSlice } from '@reduxjs/toolkit';

const topicsSlice = createSlice({
  name: 'topics',
  initialState: {
    topics: [],
  },
  reducers: {
    setTopics: (state, action) => {
      state.topics = action.payload;
    },
  },
});

export const { setTopics } = topicsSlice.actions;
export default topicsSlice.reducer;
