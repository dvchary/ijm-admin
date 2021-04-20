import { masterConstansts } from "../actions/constants";

const initState = {
  masters: [],
  loading: false,
  error: null,
};

const buildNewMasters = (parentId, masters, master) => {
  let myMasters = [];

  if (parentId === undefined) {
    return [
      ...masters,
      {
        _id: master._id,
        name: master.name,
        description: master.description,
        slug: master.slug,
        type: master.type,
        children: [],
      },
    ];
  }

  for (let mstr of masters) {
    if (mstr._id === parentId) {
      const newMaster = {
        _id: master._id,
        name: master.name,
        description: master.description,
        slug: master.slug,
        parentId: master.parentId,
        type: master.type,
        children: [],
      };
      myMasters.push({
        ...mstr,
        children:
          mstr.children.length > 0
            ? [...mstr.children, newMaster]
            : [newMaster],
      });
    } else {
      myMasters.push({
        ...mstr,
        children: mstr.children
          ? buildNewMasters(parentId, mstr.children, master)
          : [],
      });
    }
  }
  return myMasters;
};

export default (state = initState, action) => {
  switch (action.type) {
    case masterConstansts.GET_ALL_MASTER_SUCCESS:
      state = {
        ...state,
        masters: action.payload.masters, //action.payload.projects is from Actions
      };
      break;
    case masterConstansts.ADD_NEW_MASTER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case masterConstansts.ADD_NEW_MASTER_SUCCESS:
      const master = action.payload.master; //action.payload.projects is from Actions
      // console.log("project", project);
      const updatedMasters = buildNewMasters(
        master.parentId,
        state.masters, //initial state
        master
      );
      // console.log("updated projects", updatedMasters);

      state = {
        ...state,
        masters: updatedMasters,
        loading: false,
      };
      break;
    case masterConstansts.ADD_NEW_MASTER_FAILURE:
      state = {
        ...initState,
        loading: false,
        error: action.payload.error,
      };
      break;
    // case masterConstansts.UPDATE_MASTER_REQUEST:
    //   state = {
    //     ...state,
    //     loading: true,
    //   };
    //   break;
    // case masterConstansts.UPDATE_MASTER_SUCCESS:
    //   state = {
    //     ...state,
    //     loading: false,
    //   };
    //   break;
    // case masterConstansts.UPDATE_MASTER_FAILURE:
    //   state = {
    //     ...state,
    //     error: action.payload.error,
    //     loading: false,
    //   };
    //   break;
    // case masterConstansts.DELETE_MASTER_REQUEST:
    //   state = {
    //     ...state,
    //     loading: true,
    //   };
    //   break;
    // case masterConstansts.DELETE_MASTER_SUCCESS:
    //   state = {
    //     ...state,
    //     loading: false,
    //   };
    //   break;
    // case masterConstansts.DELETE_MASTER_FAILURE:
    //   state = {
    //     ...state,
    //     loading: false,
    //     error: action.payload.error,
    //   };
    //   break;
    default:
      return state;
  }

  return state;
};
