import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import CarouselDisplay from "../../src/CarouselDisplay.web"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "CarouselDisplay"
  }

const feature = loadFeature('./__tests__/features/CarouselDisplay-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to CarouselDisplay', ({ given, when, then }) => {
        let carouselDisplay:ShallowWrapper;
        let instance:CarouselDisplay; 

        given('I am a User loading CarouselDisplay', () => {
            carouselDisplay = shallow(<CarouselDisplay {...screenProps}/>)
        });

        when('I navigate to the CarouselDisplay', () => {
             instance = carouselDisplay.instance() as CarouselDisplay
        });

        then('CarouselDisplay will load with out errors', () => {
            expect(carouselDisplay).toBeTruthy()
            // expect(carouselDisplay).toMatchSnapshot()
        });

        then('I can enter text with out errors', () => {
            // let textInputComponent = carouselDisplay.findWhere((node) => node.prop('testID') === 'txtInput');
            // textInputComponent.simulate('changeText', 'hello@aol.com');
            // expect(carouselDisplay).toMatchSnapshot();
        });

        then('I can select the button with with out errors', () => {
            // let buttonComponent = carouselDisplay.findWhere((node) => node.prop('testID') === 'btnExample');
            // buttonComponent.simulate('press')
            // expect(carouselDisplay).toMatchSnapshot();
            // expect(instance.state.txtSavedValue).toEqual("hello@aol.com")
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(carouselDisplay).toBeTruthy()
            // expect(carouselDisplay).toMatchSnapshot()
        });
    });


});
