import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productStore/productSlice"

export const rootReducer = combineReducers({
  products: productSlice
});

const store = configureStore({
  reducer: rootReducer,
});

export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type DispatchFunc = () => AppDispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
