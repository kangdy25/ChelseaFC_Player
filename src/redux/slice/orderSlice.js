import { createSlice } from "@reduxjs/toolkit";

const initialState = () => {
  const savedOrder = localStorage.getItem("order");
  return savedOrder ? savedOrder : 1; // 2024-2025로 기본값 설정
};

let orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action) => action.payload,
  },
});

export const { setOrder } = orderSlice.actions;
export default orderSlice.reducer;
