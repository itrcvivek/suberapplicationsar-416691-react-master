import { defineFeature, loadFeature } from 'jest-cucumber';
import { shallow, ShallowWrapper } from 'enzyme';

import * as helpers from '../../../../framework/src/Helpers';

import React from 'react';
import { Dimensions } from 'react-native';
import Adminconsole2 from '../../src/Adminconsole2';
const navigation = require('react-navigation');

const screenProps = {
	navigation: navigation,
	id: 'Adminconsole2',
};

const feature = loadFeature('./__tests__/features/Adminconsole2-scenario.feature');

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

		forcedUpdateSpy = jest.spyOn(Adminconsole2.prototype, 'forceUpdate');
	});

	test('User can input text into Adminconsole2', ({ given, when, then }) => {
		let exampleBlockA: ShallowWrapper;
		let instance: Adminconsole2;

		given('I am a User loading Adminconsole2', () => {
			exampleBlockA = shallow(<Adminconsole2 {...screenProps} />);
		});

		when('I navigate to the Adminconsole2', () => {
			instance = exampleBlockA.instance() as Adminconsole2;
		});

		then('Adminconsole2 will load with out errors', () => {
			expect(exampleBlockA.exists()).toBe(true);
		});

		then('I can enter text with out errors', () => {
			let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInput');
			textInputComponent.simulate('changeText', 'hello@aol.com');
			expect(instance.state.txtInputValue).toEqual('hello@aol.com');
		});

		then('I can select the button with with out errors', () => {
			let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'btnExample');
			buttonComponent.simulate('press');
			expect(instance.state.txtSavedValue).toEqual('hello@aol.com');
		});

		then('I can leave the screen with out errors', () => {
			instance.componentWillUnmount();
			expect(exampleBlockA.exists()).toBe(true);
		});
	});

	test('User can toggle showing and hiding non-secure and secure text', ({ given, when, then }) => {
		let exampleBlockA: ShallowWrapper;
		let instance: Adminconsole2;

		given('I am a User loading Adminconsole2', () => {
			exampleBlockA = shallow(<Adminconsole2 {...screenProps} />);
		});

		when('I navigate to the Adminconsole2', () => {
			instance = exampleBlockA.instance() as Adminconsole2;
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

	test('User navigates away from Adminconsole2', ({ given, when, then }) => {
		let exampleBlockA: ShallowWrapper;
		let instance: Adminconsole2;

		given('I am a User loading Adminconsole2', () => {
			exampleBlockA = shallow(<Adminconsole2 {...screenProps} />);
		});

		when('I navigate to the Adminconsole2', () => {
			instance = exampleBlockA.instance() as Adminconsole2;
		});

		then('Adminconsole2 will load with out errors', () => {
			expect(exampleBlockA.exists()).toBe(true);
		});

		then('I can dismiss Adminconsole2', () => {
			let touchableWithoutFeedback = exampleBlockA.findWhere(
				(node) => node.prop('testID') === 'touchableWithoutFeedback'
			);
			touchableWithoutFeedback.simulate('press');
			expect(exampleBlockA.exists()).toBe(true);
		});
	});

	test('Adminconsole2 has event listeners for screen size changes added', ({ given, when, then }) => {
		let exampleBlockA: ShallowWrapper;
		let instance: Adminconsole2;

		given('I am a user loading Adminconsole2', () => {
			exampleBlockA = shallow(<Adminconsole2 {...screenProps} />);
		});

		when('I Load Adminconsole2', () => {
			instance = exampleBlockA.instance() as Adminconsole2;
		});

		then('the dimensions function has an event listener added', () => {
			expect(dimensionsAddEventListenerSpy).toHaveBeenCalledWith('change', expect.any(Function));
		});
	});

	test('Adminconsole2 resizing events are triggered', ({ given, when, then }) => {
		let exampleBlockA: ShallowWrapper;
		let instance: Adminconsole2;

		given('I am a user loading Adminconsole2', () => {
			exampleBlockA = shallow(<Adminconsole2 {...screenProps} />);
		});

		when('I load Adminconsole2 and change screen size', () => {
			instance = exampleBlockA.instance() as Adminconsole2;
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
