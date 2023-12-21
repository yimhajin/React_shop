import { createSlice } from '@reduxjs/toolkit';

export let user = createSlice({
  name: 'user',
  initialState: { id: 'somypark', name: '박소영', rating: 2 },
  reducers: {
    changeName(prev) {
      prev.name = '박소영 VVIP 고객';
    },
    changeRate(prev, action) {
      prev.rating += action.payload;
    },
  },
});

export let { changeName, changeRate } = user.actions;
