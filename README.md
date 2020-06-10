# React Inner Eyes
[![CircleCI](https://circleci.com/gh/shaolinmkz/react-inner-eyes.svg?style=svg)](https://circleci.com/gh/shaolinmkz/react-inner-eyes)

React inner eyes enables you access child components functionalities from a parent component without having to pass down props.

# Installation

```
npm install react-inner-eyes
```

# Usage
React inner eyes can be used as a Hook or Higher Order Component (HOC)

# As A Hook

```
import { InnerEyesProvider, useInnerEyes } from 'react-inner-eyes';

const Child = () => {
    const [childNum, setChildNum] = useState(0);
    const [randomValue, setRandomValue] = useState('Nothing...');

    const { saveFunc, saveFuncs, removeFuncs, removeFunc } = useInnerEyes();

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

    return () => {
        // removes multiple functions
        removeFuncs([
            'handleNumIncrease',
            'handleNumDecrease',
            'randomFuncOne',
        ]);

        // removes a single function
        removeFunc('randomFuncTwo');
    }
    }, []);

    return (
        <section data-testid="test-child">
            <h3>{`CHILD HEADING ${childNum}`}</h3>
            <p>{randomValue}</p>
        </section>
    );
};

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

const MainApp = () => {
    return (
        <InnerEyesProvider>
            <section data-testid="test-app">
                <h1>MAIN APP</h1>
                <Parent />
            </section>
        </InnerEyesProvider>
    );
};
```


# As A Higher Order Component

```
import { InnerEyesProvider, withInnerEyes } from 'react-inner-eyes';

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

    return () => {
        // removes multiple functions
        removeFuncs([
            'handleNumIncrease',
            'handleNumDecrease',
            'randomFuncOne',
        ]);

        // removes a single function
        removeFunc('randomFuncTwo');
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


const Parent = (props: PropsWithChildren<any>) => {
    const { getFuncs } = props;
    
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

export default withInnerEyes(Parent);


const MainApp = () => {
    return (
        <InnerEyesProvider>
            <section data-testid="test-app">
                <h1>MAIN APP</h1>
                <Parent />
            </section>
        </InnerEyesProvider>
    );
};
```