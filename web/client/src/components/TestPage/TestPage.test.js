//For Enzyme
import React from 'react';
import { render } from '@testing-library/react';
import { configure, shallow, mount } from 'enzyme';
//producTestFunction and arrayTestFunction are vanilla JS functions
import { TestPage, productTestFunction, arrayTestFunction } from './TestPage.js';

//Enzyme-only tests. Checks the render and render output of a component
describe('componentRenderTest', () => {
    it('should render in ReactDOM without crashing', () => {
        const div = document.createElement('div');
        render(<TestPage/>, div);
    })
});

describe('renders learn react link', () => {
    const { getByText } = render(<TestPage/>);
    const linkElement = getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});

describe('componentRenderTest', () => {
    it('should shallow render with Enzyme without crashing', () => {
        mount(<TestPage/>);
    })
});
describe('componentRenderTest', () => {
    const component = shallow(<TestPage />);
    const componentWrapper = component.find('.MainPage')
    it('should have a wrapper with className="MainPage"', () => {
        expect(componentWrapper.length).toEqual(1);
    });
});


//Tests the output of function, like Jest would
describe('jsFunctionTest', () => {
    const targetFunction = productTestFunction;
    it('should give the product of two input numbers', () => {
        expect(targetFunction(2, 3)).toBe(6);
    });
});
describe('jsFunctionTest', () => {
    const parameters = ["123", "tester", "https://image", "test@gmail.com"]
    //Use more than 1 assetion (i.e. expect()) to hit the target from >1 angle
    //It'll ensure it really is solid
    expect(arrayTestFunction(parameters)).toContain(
        "0: 123"
    );
    expect(arrayTestFunction(parameters)).toEqual(
        [ '0: 123', '1: tester', '2: https://image', '3: test@gmail.com' ]
    );
});