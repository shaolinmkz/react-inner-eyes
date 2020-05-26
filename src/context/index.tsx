import React, { createContext, ComponentProps } from "react";
import reducer from "./reducer";

interface initInterface {
    state: {
      [name: string]: string;
    };
    dispatch: React.Dispatch<any>;
};

let initData: initInterface = { dispatch: () => {}, state: {} };

export const innerEyesContext = createContext(initData);

const InnerEyesProvider = (props: ComponentProps<any>) => {
    const { children } = props;
  const store = reducer();
  return <innerEyesContext.Provider value={store}>{children}</innerEyesContext.Provider>;
};

export default InnerEyesProvider;
