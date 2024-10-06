// src/rootReducer.js
import { combineReducers } from "@reduxjs/toolkit";
import { roleReducer } from "../features/role/roleSlice"
import { portalReducer } from "../features/portal/portalSlice";
import eventReducer from '../features/schedule/reducers'

export const rootReducer = combineReducers({
  role: roleReducer,
  portal: portalReducer,
  events: eventReducer,
});