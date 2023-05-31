import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { PorductResponsePagination, ProductData } from "../interfaces/products.interface";

const pagination = createAsyncThunk<PorductResponsePagination, number>(
  "products/pagination",
  async (page, thunkApi) => {
    try {
      const { data } = await axios.get(
        `https://dummyjson.com/products?limit=15&skip=${page * 10}`
      );
      const products: ProductData[] = data.products
      return { products, page }
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  }
);

export default pagination

