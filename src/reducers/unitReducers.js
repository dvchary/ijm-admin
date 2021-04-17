import { initialUnitConstants } from "../actions/constants";

const initialState = {
  units: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case initialUnitConstants.GET_ALL_INITIAL_UNITS_SUCCESS:
      state = {
        ...state,
        units: action.payload.units,
      };
      break;
    default:
      return state;
  }
  return state;
};
