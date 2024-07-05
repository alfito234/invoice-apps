import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRevenue = createAsyncThunk(
  "revenue/fetchRevenue",
  async (period) => {
    const response = await axios.get(
      `http://localhost:3001/api/revenue?period=${period}`
    );
    return response.data;
  }
);

const revenueSlice = createSlice({
  name: "revenue",
  initialState: {
    revenue: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRevenue.fulfilled, (state, action) => {
      state.loading = false;
      state.revenue = action.payload;
    });
  },
});

export default revenueSlice.reducer;
