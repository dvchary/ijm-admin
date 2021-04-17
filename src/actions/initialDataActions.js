import axios from "../helpers/axios";
import { initialDataConstants, initialUnitConstants } from "./constants";

export const getInitialData = () => {
  return async (dispatch) => {
    dispatch({ type: initialDataConstants.GET_ALL_INITIAL_DATA_REQUEST });
    const res = await axios.post(`/initialdata`);
    if (res.status === 200) {
      const { projectList, units } = res.data;
      dispatch({
        type: initialDataConstants.GET_ALL_INITIAL_DATA_SUCCESS,
        payload: { projectList },
      });
      dispatch({
        type: initialUnitConstants.GET_ALL_INITIAL_UNITS_SUCCESS,
        payload: { units },
      });
    }
    console.log(res);
  };
};
