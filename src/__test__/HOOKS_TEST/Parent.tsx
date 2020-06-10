import React from 'react';
import { useInnerEyes } from '../..';
import Child from './Child';



const Parent = () => {
    const { getFuncs } = useInnerEyes();

    const randomFuncTwo = getFuncs('randomFuncTwo');

    const {
        handleNumIncrease,
        handleNumDecrease,
        randomFuncOne,
    } = getFuncs();

    return (
        <section data-testid="test-parent">
            <h2>PARENT</h2>
             <Child />
             <button type="button" data-testid="increase" onClick={handleNumIncrease}>Increase</button>
             <button type="button" data-testid="decrease" onClick={handleNumDecrease}>Decrease</button>
             <button type="button" data-testid="random-one" onClick={randomFuncOne}>randomOne</button>
             <button type="button" data-testid="random-two" onClick={randomFuncTwo}>randomTwo</button>
        </section>
    );
};

export default Parent;
