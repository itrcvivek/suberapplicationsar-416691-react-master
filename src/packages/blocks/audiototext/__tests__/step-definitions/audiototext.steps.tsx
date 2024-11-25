import { defineFeature, loadFeature } from 'jest-cucumber';
import { shallow, ShallowWrapper } from 'enzyme';

import * as helpers from '../../../../framework/src/Helpers';

import React from 'react';
import { Dimensions } from 'react-native';
import Audiototext from '../../src/Audiototext';
const navigation = require('react-navigation');

const screenProps = {
	navigation: navigation,
	id: 'Audiototext',
};

const feature = loadFeature('./__tests__/features/audiototext-scenario.feature');

defineFeature(feature, (test) => {
	let dimensionsGetSpy: jest.SpyInstance;
	let dimensionsAddEventListenerSpy: jest.SpyInstance;
	let forcedUpdateSpy: jest.SpyInstance;

	beforeEach(() => {
		jest.resetModules();
		jest.doMock('react-native', () => ({ Platform: { OS: 'ios' } }));
		jest.spyOn(helpers, 'getOS').mockImplementation(() => 'ios');

		dimensionsGetSpy = jest.spyOn(Dimensions, 'get').mockImplementation((dim: 'window' | 'screen') => ({
			width: 320,
			height: 640,
			scale: 1,
			fontScale: 1,
		}));

		dimensionsAddEventListenerSpy = jest.spyOn(Dimensions, 'addEventListener');

		forcedUpdateSpy = jest.spyOn(Audiototext.prototype, 'forceUpdate');
	});

	test('User can input text into Audiototext', ({ given, when, then }) => {
		let exampleBlockA: ShallowWrapper;
		let instance: Audiototext;

		given('I am a User loading Audiototext', () => {
			exampleBlockA = shallow(<Audiototext {...screenProps} />);
		});

		when('I navigate to the Audiototext', () => {
			instance = exampleBlockA.instance() as Audiototext;
		});

		then('Audiototext will load with out errors', () => {
			expect(exampleBlockA.exists()).toBe(true);
		});

		then('I can enter text with out errors', () => {
			let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInput');
			textInputComponent.simulate('changeText', 'hello@aol.com');
			expect(textInputComponent.props().testID).toEqual('txtInput');
		});

		then('I can select the button with with out errors', () => {
			let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'btnExample');
			buttonComponent.simulate('press');
			expect(buttonComponent.props().testID).toEqual('btnExample')
		});

		then('I can leave the screen with out errors', () => {
			expect(exampleBlockA.exists()).toBe(true);
		});
	});

	test('User can toggle showing and hiding non-secure and secure text', ({ given, when, then }) => {
		let exampleBlockA: ShallowWrapper;
		let instance: Audiototext;

		given('I am a User loading Audiototext', () => {
			exampleBlockA = shallow(<Audiototext {...screenProps} />);
		});

		when('I navigate to the Audiototext', () => {
			instance = exampleBlockA.instance() as Audiototext;
		});

		then('the text will be shown in plain text', () => {
			const textInput = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInput');
			expect(textInput.prop('secureTextEntry')).toBeFalsy();
		});

		then('I press the toggle secure text button and it will be displayed securely', () => {
			let textInput = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInput');

			const passwordShowHideButton = exampleBlockA.findWhere((node) => node.prop('testID') === 'btnShowHide');
			passwordShowHideButton.props().onPress();
			passwordShowHideButton.props().onPress();
			passwordShowHideButton.props().onPress();
			exampleBlockA.update();
			textInput = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInput');

			expect(textInput.prop('secureTextEntry')).toBeTruthy();
		});
	});

	test('User navigates away from Audiototext', ({ given, when, then }) => {
		let exampleBlockA: ShallowWrapper;
		let instance: Audiototext;

		given('I am a User loading Audiototext', () => {
			exampleBlockA = shallow(<Audiototext {...screenProps} />);
		});

		when('I navigate to the Audiototext', () => {
			instance = exampleBlockA.instance() as Audiototext;
		});

		then('Audiototext will load with out errors', () => {
			expect(exampleBlockA.exists()).toBe(true);
		});

		then('I can dismiss Audiototext', () => {
			let touchableWithoutFeedback = exampleBlockA.findWhere(
				(node) => node.prop('testID') === 'touchableWithoutFeedback'
			);
			touchableWithoutFeedback.simulate('press');
			expect(exampleBlockA.exists()).toBe(true);
		});
	});

	test('Audiototext has event listeners for screen size changes added', ({ given, when, then }) => {
		let exampleBlockA: ShallowWrapper;
		let instance: Audiototext;

		given('I am a user loading Audiototext', () => {
			exampleBlockA = shallow(<Audiototext {...screenProps} />);
		});

		when('I Load Audiototext', () => {
			instance = exampleBlockA.instance() as Audiototext;
		});

		then('the dimensions function has an event listener added', () => {
			expect(dimensionsAddEventListenerSpy).toHaveBeenCalledWith('change', expect.any(Function));
		});
	});

	test('Audiototext resizing events are triggered', ({ given, when, then }) => {
		let exampleBlockA: ShallowWrapper;
		let instance: Audiototext;

		given('I am a user loading Audiototext', () => {
			exampleBlockA = shallow(<Audiototext {...screenProps} />);
		});

		when('I load Audiototext and change screen size', () => {
			instance = exampleBlockA.instance() as Audiototext;
			dimensionsAddEventListenerSpy.mock.calls[0][1]({
				width: 320,
				height: 640,
				scale: 1,
				fontScale: 1,
			});
		});

		then('the window change event is fired', () => {
			expect(forcedUpdateSpy).toHaveBeenCalled();
		});
	});
});
