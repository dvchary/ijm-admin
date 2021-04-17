import axios from "../helpers/axios";

export const addUnit = (form) => {
  console.log("form data---->", form);
  return async (dispatch) => {
    const res = await axios.post(`/unit/create`, form);
    console.log(res);
  };
};
