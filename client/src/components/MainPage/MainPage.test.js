//For Enzyme
import React from 'react';
import ReactDOM from 'react-dom'
import { configure, shallow, mount } from 'enzyme';
import { MainPage, productTestFunction, arrayTestFunction } from './MainPage.js';
//For Jest to get the target vanilla JS functions
//const mainPage = require('./MainPage.js'); 

//Enzyme-only tests. Checks the render and render output of a component
describe('componentRenderTest', () => {
    it('should render in ReactDOM without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<MainPage/>, div);
    })
});

describe('componentRenderTest', () => {
    it('should shallow render with Enzyme without crashing', () => {
        mount(<MainPage/>);
    })
});
describe('componentRenderTest', () => {
    const component = shallow(<MainPage />);
    const componentWrapper = component.find('.App')
    it('should have a wrapper with className="App"', () => {
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