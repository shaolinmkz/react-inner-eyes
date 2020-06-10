import { useReducer } from "react";
import { ADD, REMOVE } from "./actionTypes";


interface Action {
  type: string;
  payload: {
    name: any;
    value?: string;
  }
};

const initialState: any = {};

export const innerEyesReducer = (state = initialState, action: Action) => {
    const { type, payload } = action;
   const { name, value } = payload;

  switch (type) {
    case ADD:
      return {
        ...state,
        [name]: value
      };
    case REMOVE:
      return (() => {
        const newState = { ...state };
        delete newState[name];
        return newState;
      })()
    default:
      return state;
  }
};

export default () => {
  const [state, dispatch] = useReducer(innerEyesReducer, initialState);
  return {
    state,
    dispatch
  };
};
