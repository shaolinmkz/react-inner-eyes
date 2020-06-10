import React, { useEffect, useState, PropsWithChildren } from 'react';
import { withInnerEyes } from '../..';


const Child = (props: PropsWithChildren<any>) => {
    const [childNum, setChildNum] = useState(0);
    const [randomValue, setRandomValue] = useState('Nothing...');

    const { saveFunc, saveFuncs, removeFuncs, removeFunc } = props;

    const handleNumIncrease = () => setChildNum(prevNum => prevNum + 1);
    const handleNumDecrease = () => setChildNum(prevNum => (prevNum <= 0) ? 0 : prevNum - 1);

    const randomFuncOne = () => setRandomValue('Random value one');
    const randomFuncTwo = () => setRandomValue('Random value two');

    useEffect(() => {
        // saving single functions
        saveFunc('handleNumIncrease', handleNumIncrease);
        saveFunc('handleNumDecrease', handleNumDecrease);

        // saving multiple functions
        saveFuncs([
            { name: 'randomFuncOne', value: randomFuncOne },
            { name: 'randomFuncTwo', value: randomFuncTwo },
        ]);

        // when you dont parse the right parameter nothing will be saved
        saveFunc('2', 'randomFuncTwo');
        saveFunc(2, 'randomFuncTwo');
        saveFuncs({ name: 2, value: 'randomFuncTwo' });
        saveFuncs([{ name: 2, value: randomFuncTwo }]);

    return () => {
        // removes multiple functions
        removeFuncs([
            'handleNumIncrease',
            'handleNumDecrease',
            'randomFuncOne',
        ]);

        // removes a single function
        removeFunc('randomFuncTwo');
        
        // when you dont parse the right parameter nothing will be removed
        removeFunc(null);
        removeFuncs([ 4, undefined, null ]);
        removeFuncs('bad argument');
    }
    }, []);

    return (
        <section data-testid="test-child">
            <h3>{`CHILD HEADING ${childNum || ''}`.trim()}</h3>
            <p>{randomValue}</p>
        </section>
    );
};

export default withInnerEyes(Child);
