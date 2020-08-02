import React, { createContext, ComponentProps } from "react";
import reducer from "./reducer";
import { doNothingFunc } from "../helpers";

interface initInterface {
    state: {
      [name: string]: string;
    };
    dispatch: React.Dispatch<any>;
};

let initData: initInterface = { dispatch: doNothingFunc, state: {} };

export const innerEyesContext = createContext(initData);

const InnerEyesProvider = (props: ComponentProps<any>) => {
    const { children } = props;
  const store = reducer();
  return <innerEyesContext.Provider value={store}>{children}</innerEyesContext.Provider>;
};

export default InnerEyesProvider;
