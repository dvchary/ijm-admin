import { combineReducers } from "redux";
import authReducers from "./authReducers";
import userReducers from "./userReducers";
import unitReducers from "./unitReducers";
import projectReducers from "./projectReducers";
import masterReducers from "./masterReducers";
import propertiesReducers from "./propertiesReducers";
import orderReducers from "./orderReducers";

const rootReducer = combineReducers({
  auth: authReducers,
  user: userReducers,
  masters: masterReducers,
  units: unitReducers,
  projects: projectReducers,
  orders: orderReducers,
  properties: propertiesReducers,
});

export default rootReducer;
