import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import Maps from "../../src/Maps"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "Maps"
  }

const feature = loadFeature('./__tests__/features/Maps-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to Maps', ({ given, when, then }) => {
        let mapsBlock:ShallowWrapper;
        let instance:Maps; 

        given('I am a User loading Maps', () => {
            mapsBlock = shallow(<Maps {...screenProps}/>)
        });

        when('I navigate to the Maps', () => {
             instance = mapsBlock.instance() as Maps
        });

        then('Maps will load with out errors', () => {
            expect(mapsBlock).toBeTruthy()
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(mapsBlock).toBeTruthy()
        });
    });


});
