//For Enzyme
import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow, mount } from 'enzyme';
import MainPage from '../src/components/MainPage/MainPage';
import MarketeerPage from '../src/components/MarketeerPage/MarketeerPage';

describe('<MarketeerPage/>', () => {
    it('should render', () => {
        const page = shallow(<MarketeerPage />);
        expect(page).toMatchSnapshot();
    })
});

describe('componentRenderTest', () => {
    const component = shallow(<MainPage />);
    it('should have a header', () => {
        expect(component.find('header').props()).toEqual({
            className: 'App-header'
        });
    });
});