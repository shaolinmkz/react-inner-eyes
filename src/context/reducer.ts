import { useReducer } from "react";
import { ADD } from "./actionTypes";

const initialState = {};

interface Action {
    type: string;
    payload: {
        name?: (string | any);
        value?: string;
    }
}

const innerEyesReducer = (state = initialState, action: Action) => {
    const { type, payload } = action;
   const { name, value } = payload;

  switch (type) {
    case ADD:
      return {
        ...state,
        [name]: value
      };
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
