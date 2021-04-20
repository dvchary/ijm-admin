import { propertyConstansts } from "../actions/constants";

const initState = {
  properties: [],
  loading: false,
  error: null,
};

const buildNewProperties = (parentId, properties, property) => {
  let myProperties = [];

  if (parentId === undefined) {
    return [
      ...properties,
      {
        _id: property._id,
        name: property.name,
        slug: property.slug,
        type: property.type,
        children: [],
      },
    ];
  }

  for (let prop of properties) {
    if (prop._id === parentId) {
      const newProperty = {
        _id: property._id,
        name: property.name,
        slug: property.slug,
        parentId: property.parentId,
        type: property.type,
        children: [],
      };
      myProperties.push({
        ...prop,
        children:
          prop.children.length > 0
            ? [...prop.children, newProperty]
            : [newProperty],
      });
    } else {
      myProperties.push({
        ...prop,
        children: prop.children
          ? buildNewProperties(parentId, prop.children, property)
          : [],
      });
    }
  }
  return myProperties;
  // console.log("MYproject---->", myProjects);
};

export default (state = initState, action) => {
  switch (action.type) {
    case propertyConstansts.GET_ALL_PROPERTY_SUCCESS:
      state = {
        ...state,
        properties: action.payload.properties, //action.payload.projects is from Actions
      };
      break;
    default:
      return state;
  }

  return state;
};
