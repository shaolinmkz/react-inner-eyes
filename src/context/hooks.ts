import { useContext } from "react";
import { innerEyesContext } from "./index";
import { ADD } from './actionTypes';

const useInnerEyes = () => {
  const { dispatch, state } = useContext(innerEyesContext);

  const saveData = (name: string, value: any) => {
    dispatch({ type: ADD, payload: { name, value } });
  };

  const getData = (name: string) => name ? state[name] : state;

  return {
    saveData,
    getData,
  };
};

export default useInnerEyes;
