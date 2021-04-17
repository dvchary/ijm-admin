import axios from "../helpers/axios";
import { projectConstansts } from "./constants";

const getAllProject = () => {
  return async (dispatch) => {
    dispatch({ type: projectConstansts.GET_ALL_PROJECT_REQUEST });
    const res = await axios.get(`project/getprojet`);
    console.log(res);
    if (res.status === 200) {
      const { projectList } = res.data;

      dispatch({
        type: projectConstansts.GET_ALL_PROJECT_SUCCESS,
        payload: { projects: projectList }, //projectList is  the response from Backend
      });
    } else {
      dispatch({
        type: projectConstansts.GET_ALL_PROJECT_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const addProject = (form) => {
  return async (dispatch) => {
    dispatch({ type: projectConstansts.ADD_NEW_PROJECT_REQUEST });
    try {
      const res = await axios.post(`/project/create`, form);
      console.log("addProject ", res);

      if (res.status === 201) {
        dispatch({
          type: projectConstansts.ADD_NEW_PROJECT_SUCCESS,
          payload: { project: res.data.project }, //res.data.project is  the response from Backend
        });
      } else {
        dispatch({
          type: projectConstansts.ADD_NEW_PROJECT_FAILURE,
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

export { getAllProject };
