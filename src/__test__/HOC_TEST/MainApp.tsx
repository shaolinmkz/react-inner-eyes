import React from 'react';
import { InnerEyesProvider } from '../..';
import Parent from './Parent';


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

export default MainApp;
