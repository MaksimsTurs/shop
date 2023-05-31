import { createSlice } from "@reduxjs/toolkit";

import { ProductInitialState } from "./interfaces/products.interface";

import gettAllProducts from "./actions/product.getall.action";
import pagination from "./actions/product.pagination.action";

const initialState: ProductInitialState = {
  products: [],
  bestProduct: undefined,
  pagesCount: 0,
  currentPage: 1,
  error: "",
  isLoading: true,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(gettAllProducts.fulfilled, (state, action) => {
      state.products = action.payload.products;
      state.pagesCount = Math.floor(action.payload.total / 15);
      const bestProduct = action.payload.products.find((element) => {
        element.rating > element.rating;
        return element;
      });
      state.bestProduct = bestProduct;
      state.isLoading = false;
    }),
      builder
        .addCase(gettAllProducts.rejected, (state, action) => {
          state.error = action;
          state.isLoading = false;
        })
        .addCase(pagination.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(pagination.fulfilled, (state, action) => {
          state.products = action.payload.products;
          state.currentPage = action.payload.page;
          state.isLoading = false;
        });
  },
});

export default productsSlice.reducer;
