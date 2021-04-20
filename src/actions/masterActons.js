import axios from "../helpers/axios";
import { masterConstansts } from "./constants";

export const getAllMasters = () => {
  return async (dispatch) => {
    dispatch({ type: masterConstansts.GET_ALL_MASTER_REQUEST });
    const res = await axios.get(`/masters/getmasters`);
    // console.log(res);
    if (res.status === 200) {
      const { masterList } = res.data;

      dispatch({
        type: masterConstansts.GET_ALL_MASTER_SUCCESS,
        payload: { masters: masterList }, //projectList is  the response from Backend
      });
    } else {
      dispatch({
        type: masterConstansts.GET_ALL_MASTER_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const addMaster = (form) => {
  return async (dispatch) => {
    dispatch({ type: masterConstansts.ADD_NEW_MASTER_REQUEST });
    try {
      const res = await axios.post(`/masters/create`, form);
      // console.log("addProject ", res);

      if (res.status === 201) {
        dispatch({
          type: masterConstansts.ADD_NEW_MASTER_SUCCESS,
          payload: { master: res.data.master }, //res.data.project is  the response from Backend
        });
      } else {
        dispatch({
          type: masterConstansts.ADD_NEW_MASTER_FAILURE,
          payload: res.data.error,
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};

// export const updateProject = (form) => {
//   return async (dispatch) => {
//     dispatch({ type: projectConstansts.UPDATE_PROJECT_REQUEST });
//     const res = await axios.post(`/project/update`, form);
//     if (res.status === 201) {
//       dispatch({ type: projectConstansts.UPDATE_PROJECT_SUCCESS });
//       dispatch(getAllProject());
//     } else {
//       const { error } = res.data;
//       dispatch({
//         type: projectConstansts.UPDATE_PROJECT_FAILURE,
//         payload: { error },
//       });
//     }
//   };
// };

// export const deleteProject = (ids) => {
//   return async (dispatch) => {
//     dispatch({ type: projectConstansts.DELETE_PROJECT_REQUEST });
//     const res = await axios.post(`/project/delete`, {
//       payload: {
//         ids,
//       },
//     });
//     if (res.status === 201) {
//       dispatch(getAllProject());
//       dispatch({ type: projectConstansts.DELETE_PROJECT_SUCCESS });
//     } else {
//       const { error } = res.data;
//       dispatch({
//         type: projectConstansts.DELETE_PROJECT_FAILURE,
//         payload: { error },
//       });
//     }
//   };
// };

// export { getAllMasters, addMaster };
