import { combineReducers } from "redux";
import authReducers from "./authReducers";
import userReducers from "./userReducers";
import unitReducers from "./unitReducers";
import projectReducers from "./projectReducers";
import orderReducers from "./orderReducers";

const rootReducer = combineReducers({
  auth: authReducers,
  user: userReducers,
  units: unitReducers,
  projects: projectReducers,
  orders: orderReducers,
});

export default rootReducer;
