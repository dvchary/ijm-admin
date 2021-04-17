import { projectConstansts } from "../actions/constants";

const initState = {
  projects: [],
  loading: false,
  error: null,
};

const buildNewProjects = (parentId, projects, project) => {
  let myProjects = [];
  // console.log("parentId---->", parentId);
  // console.log("projectS---->", projects);
  // console.log("project---->", project);

  if (parentId === undefined) {
    return [
      ...projects,
      {
        _id: project._id,
        name: project.name,
        slug: project.slug,
        type: project.type,
        children: [],
      },
    ];
  }

  for (let prj of projects) {
    if (prj._id === parentId) {
      const newProject = {
        _id: project._id,
        name: project.name,
        slug: project.slug,
        parentId: project.parentId,
        type: project.type,
        children: [],
      };
      myProjects.push({
        ...prj,
        children:
          prj.children.length > 0
            ? [...prj.children, newProject]
            : [newProject],
      });
    } else {
      myProjects.push({
        ...prj,
        children: prj.children
          ? buildNewProjects(parentId, prj.children, project)
          : [],
      });
    }
  }
  return myProjects;
  // console.log("MYproject---->", myProjects);
};

export default (state = initState, action) => {
  switch (action.type) {
    case projectConstansts.GET_ALL_PROJECT_SUCCESS:
      state = {
        ...state,
        projects: action.payload.projects, //action.payload.projects is from Actions
      };
      break;
    case projectConstansts.ADD_NEW_PROJECT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case projectConstansts.ADD_NEW_PROJECT_SUCCESS:
      const project = action.payload.project; //action.payload.projects is from Actions
      // console.log("project", project);
      const updatedProjects = buildNewProjects(
        project.parentId,
        state.projects, //initial state
        project
      );
      console.log("updated projects", updatedProjects);

      state = {
        ...state,
        projects: updatedProjects,
        loading: false,
      };
      break;
    case projectConstansts.ADD_NEW_PROJECT_FAILURE:
      state = {
        ...initState,
        loading: false,
        error: action.payload.error,
      };
      break;
    // case projectConstansts.UPDATE_PROJECT_REQUEST:
    //   state = {
    //     ...state,
    //     loading: true,
    //   };
    //   break;
    // case projectConstansts.UPDATE_PROJECT_SUCCESS:
    //   state = {
    //     ...state,
    //     loading: false,
    //   };
    //   break;
    // case projectConstansts.UPDATE_PROJECT_FAILURE:
    //   state = {
    //     ...state,
    //     error: action.payload.error,
    //     loading: false,
    //   };
    //   break;
    // case projectConstansts.DELETE_PROJECT_REQUEST:
    //   state = {
    //     ...state,
    //     loading: true,
    //   };
    //   break;
    // case projectConstansts.DELETE_PROJECT_SUCCESS:
    //   state = {
    //     ...state,
    //     loading: false,
    //   };
    //   break;
    // case projectConstansts.DELETE_PROJECT_FAILURE:
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
