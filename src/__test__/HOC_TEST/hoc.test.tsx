import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import MainApp from './MainApp';

describe('InnerEyesProvider and useInnerEyes', () => {
    console.error = jest.fn();
    it('should render the all test components without failing', async () => {
        const appComp = render(<MainApp />);

        await waitFor(() => screen.getByTestId('test-app'));

        expect(screen.getByTestId('test-app')).toBeTruthy();
        expect(screen.getByTestId('test-app').querySelector('h1')?.textContent).toEqual('MAIN APP');
        
        expect(screen.getByTestId('test-parent')).toBeTruthy();
        expect(screen.getByTestId('test-app').querySelector('h2')?.textContent).toEqual('PARENT');

        expect(screen.getByTestId('test-child')).toBeTruthy();
        expect(screen.getByTestId('test-child').querySelector('h3')?.textContent).toEqual('CHILD HEADING');
        expect(screen.getByTestId('test-child').querySelector('p')?.textContent).toEqual('Nothing...');
        appComp.unmount();
    });

    it('should update the childs component from the parent without passing a prop', async () => {
        const appComp = render(<MainApp />);

        await waitFor(() => screen.getByTestId('test-app'));

        // Increase
        screen.getByTestId('increase').click();
        expect(screen.getByTestId('test-child').querySelector('h3')?.textContent).toEqual('CHILD HEADING 1');

        // Increase again
        screen.getByTestId('increase').click();
        expect(screen.getByTestId('test-child').querySelector('h3')?.textContent).toEqual('CHILD HEADING 2');

        // Decrease
        screen.getByTestId('decrease').click();
        expect(screen.getByTestId('test-child').querySelector('h3')?.textContent).toEqual('CHILD HEADING 1');

        // Decrease again
        screen.getByTestId('decrease').click();
        expect(screen.getByTestId('test-child').querySelector('h3')?.textContent).toEqual('CHILD HEADING');
        
        // Decrease one last time
        screen.getByTestId('decrease').click();
        expect(screen.getByTestId('test-child').querySelector('h3')?.textContent).toEqual('CHILD HEADING');

        // Random one button click
        screen.getByTestId('random-one').click();
        expect(screen.getByTestId('test-child').querySelector('p')?.textContent).toEqual('Random value one');
        
        // Random two button click
        screen.getByTestId('random-two').click();
        expect(screen.getByTestId('test-child').querySelector('p')?.textContent).toEqual('Random value two');
        
        appComp.unmount();
    });
});
