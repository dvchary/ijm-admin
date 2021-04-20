import axios from "../helpers/axios";
import { propertyConstansts } from "./constants";

export const getAllProperties = () => {
  return async (dispatch) => {
    dispatch({ type: propertyConstansts.GET_ALL_PROPERTY_REQUEST });
    const res = await axios.get(`/properties`);
    console.log("getting properties  data from database-->", res);

    if (res.status === 200) {
      const { propertyList } = res.data;

      dispatch({
        type: propertyConstansts.GET_ALL_PROPERTY_SUCCESS,
        payload: { properties: propertyList }, //projectList is  the response from Backend
      });
    } else {
      dispatch({
        type: propertyConstansts.GET_ALL_PROPERTY_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};
