import { useContext } from "react";
import { innerEyesContext } from "./index";
import { ADD, REMOVE } from './actionTypes';
import { isExist } from "../helpers";

const { error } = console;


const useInnerEyes = (): any => {
  const { dispatch, state } = useContext(innerEyesContext);


   /**
   * Takes two arguments(name and value), where name is a String and value a Function
   */
  const saveFunc = (name: string, value: Function) => {
    if(typeof name === 'string' && typeof value === 'function' && !isExist(name, state)) {
      dispatch({ type: ADD, payload: { name, value } });
    } else if (typeof name !== 'string') {
      error(`${name} is not a string`);
    } else {
      error(`${value} is not a function`);
    }
  };

  /**
   * Take(s) an array of object(s) (name and value) as an argument where name is a String and value a Function
   */
  const saveFuncs = (arr: Array<{ name: string, value: Function }>) => {
    if(Array.isArray(arr)) {
        arr.forEach(({ name, value }) => {
          if(typeof name === 'string' && typeof value === 'function' && !isExist(name, state)) {
            dispatch({ type: ADD, payload: { name, value } });
          }
        });
    }

  };

  /**
   * Take(s) an array of string(s) as an argument where name is the actual name of the function
   */
  const removeFuncs = (arr: string[]) => {

    if(Array.isArray(arr)) {
      arr.forEach(name => {
        if(typeof name === 'string') {
          dispatch({ type: REMOVE, payload: { name } });
        }
    });
  }
};

  /**
   * Takes a string(name) as an argument where name represents the name of the function
   */
  const removeFunc = (name: string) => {
    if(typeof name === 'string') {
      dispatch({ type: REMOVE, payload: { name } });
    }
  };

   /**
   * Takes an optional name argument and returns the specific function name or returns all the functions saved
   */
  const getFuncs = (name?: string) => (typeof name === 'string' ? state[name] : state);

  return {
    getFuncs,
    saveFunc,
    saveFuncs,
    removeFuncs,
    removeFunc,
  };
};

export default useInnerEyes;
