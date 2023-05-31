import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { PorductResponseData, ProductData } from "../interfaces/products.interface";

const gettAllProducts = createAsyncThunk<PorductResponseData, undefined>(
  "products/getall",
  async (_, thunkApi) => {
    try {
      const { data } = await axios.get(
        `https://dummyjson.com/products?limit=15`
      );
      const products: ProductData[] = data.products
      const total: number = data.total
      return { products, total }
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  }
);

export default gettAllProducts