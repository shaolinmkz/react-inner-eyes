![](https://res.cloudinary.com/shaolinmkz/image/upload/v1591861948/inner-eyes/react-inner-eyes.png)

# React Inner Eyes 👁
[![CircleCI](https://circleci.com/gh/shaolinmkz/react-inner-eyes.svg?style=svg)](https://circleci.com/gh/shaolinmkz/react-inner-eyes)

React inner eyes enables you access child components functionalities from a parent component without having to pass down props.

<a href="https://www.npmjs.com/package/react-inner-eyes" style="display: inline-flex; justify-content: space-between; align-items: center; text-decoration: none; width:100px; height: 15px; background: #000; padding: 5px; border-radius: 5px; border: 0.5px solid #fff"><img src="https://res.cloudinary.com/shaolinmkz/image/upload/v1588875312/Random-Icons/react/npm_1.png" width="30"> <span style="color: #fff; font-size: 9pt">Published</span></a> <a href="https://reactjs.org/" style="display: inline-flex; justify-content: space-between; align-items: center; text-decoration: none; width:100px; height: 15px; background: #000; padding: 5px; border-radius: 5px; border: 0.5px solid #fff"><img src="https://res.cloudinary.com/shaolinmkz/image/upload/v1588509178/Random-Icons/react/react-icon.gif" width="20"> <span style="color: #fff; font-size: 9pt">Built With</span></a>

# Installation

```
npm install react-inner-eyes
```

# Usage
React inner eyes can be used as a Hook or Higher Order Component (HOC)

`import { InnerEyesProvider, useInnerEyes, withInnerEyes } from 'react-inner-eyes';`

- **InnerEyesProvider:** This is usually wrapped around the main app component.
- **useInnerEyes:** This hook is used inside functional components to `save`, `retrieve` or `remove` functions from the watch list.
- **withInnerEyes:** Higher Order Component that wraps a component and appends useful functions to the `prop` of that component.

The functions the `withInnerEyes` and `useInnerEyes` makes available are:

- **saveFunc:**
Takes a string and a function as an argument.
Example:
```
saveFunc('myAnonymousFunc', () => {});
```

- **saveFuncs:**
Takes an array of object. The objects properties are `name` and `value`. `name` is a string which represents the name of the function while `value` is a function.
Example:
```
  saveFuncs([
    { name: 'func1', value: () => {} },
    { name: 'func2', value: () => {} },
  ]);
```

- **removeFuncs:**
This accepts an array of strings as an argument. The string represents names of functions you intend to remove from the eyes-watch 👀. 
Example:
```
removeFuncs(['func1', 'func2']);
```

- **removeFunc:**
This takes an argument which is a string. The string represents the name of the function you intend to remove from the eyes-watch 👀.
Example:
```
removeFunc('myAnonymousFunc');
```

- **getFuncs:**
This gets all the functions saved when invoked without an argument. When and argument is parsed, it returns a single function if it exists;
Example:
```
const { func1, func2, myAnonymousFunc } = getFuncs(); // All can be retrieved

const func2 = getFuncs('func2'); // Retrieved only func2
```

[DEMO](https://codesandbox.io/s/f5xkt)

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

const Child = (props) => {
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


const Parent = (props) => {
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


---

[DEMO](https://codesandbox.io/s/f5xkt)

![](https://res.cloudinary.com/shaolinmkz/image/upload/v1591830086/inner-eyes/inner-eyes-demo.gif)