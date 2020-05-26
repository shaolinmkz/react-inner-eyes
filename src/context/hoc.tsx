import React, { useContext, FC, ComponentProps } from "react";
import { innerEyesContext } from "./index";
import { ADD } from "./actionTypes";

const withInnerEyes = (Comp: FC) => {
  return (props: ComponentProps<any>) => {
    const { dispatch, state } = useContext(innerEyesContext);

    const saveData = (name: string, value: any) => {
      dispatch({ type: ADD, payload: { name, value } });
    };

    const getData = (name: string) => name ? state[name] : state;

    return (
      <Comp
        getData={getData}
        saveData={saveData}
        {...props}
      />
    );
  };
};

export default withInnerEyes;
