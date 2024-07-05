import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchInvoices = createAsyncThunk(
  "invoice/fetchInvoices",
  async ({ page = 1, limit = 10 }) => {
    const response = await axios.get(
      `http://localhost:3001/api/invoices?page=${page}&limit=${limit}`
    );
    return response.data;
  }
);

export const fetchInvoiceById = createAsyncThunk(
  "invoice/fetchInvoiceById",
  async (id) => {
    const response = await axios.get(
      `http://localhost:3001/api/invoices/${id}`
    );
    return response.data;
  }
);

export const addInvoice = createAsyncThunk(
  "invoice/addInvoice",
  async (invoice) => {
    const response = await axios.post(
      "http://localhost:3001/api/invoices",
      invoice
    );
    return response.data;
  }
);

export const updateInvoice = createAsyncThunk(
  "invoice/updateInvoice",
  async (invoice) => {
    const response = await axios.put(
      `http://localhost:3001/api/invoices/${invoice.id}`,
      invoice
    );
    return response.data;
  }
);

export const deleteInvoice = createAsyncThunk(
  "invoice/deleteInvoice",
  async (invoiceId) => {
    await axios.delete(`http://localhost:3001/api/invoices/${invoiceId}`);
    return invoiceId;
  }
);

const invoiceSlice = createSlice({
  name: "invoices",
  initialState: {
    invoices: [],
    total: 0,
    currentPage: 1,
    pageSize: 10,
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.invoices = action.payload.invoices;
        state.total = action.payload.total;
      })
      .addCase(fetchInvoiceById.fulfilled, (state, action) => {
        const index = state.invoices.findIndex(
          (invoice) => invoice.id === action.payload.id
        );
        if (index !== -1) {
          state.invoices[index] = action.payload;
        }
      })
      .addCase(updateInvoice.fulfilled, (state, action) => {
        // Fetch the updated invoice by ID to ensure we get the latest data
        fetchInvoiceById(action.payload.id);
      })
      .addCase(deleteInvoice.fulfilled, (state, action) => {
        state.invoices = state.invoices.filter(
          (invoice) => invoice.id !== action.payload
        );
      });
  },
});

export default invoiceSlice.reducer;
