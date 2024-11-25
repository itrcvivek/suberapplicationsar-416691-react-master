import { defineFeature, loadFeature } from 'jest-cucumber';
import { shallow, ShallowWrapper } from 'enzyme';

import * as helpers from '../../../../framework/src/Helpers';

import React from 'react';
import { Dimensions } from 'react-native';
import Cfstcpayintegration1 from '../../src/Cfstcpayintegration1';
const navigation = require('react-navigation');

const screenProps = {
	navigation: navigation,
	id: 'Cfstcpayintegration1',
};

const feature = loadFeature('./__tests__/features/Cfstcpayintegration1-scenario.feature');

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

		forcedUpdateSpy = jest.spyOn(Cfstcpayintegration1.prototype, 'forceUpdate');
	});

	test('User can input text into Cfstcpayintegration1', ({ given, when, then }) => {
		let exampleBlockA: ShallowWrapper;
		let instance: Cfstcpayintegration1;

		given('I am a User loading Cfstcpayintegration1', () => {
			exampleBlockA = shallow(<Cfstcpayintegration1 {...screenProps} />);
		});

		when('I navigate to the Cfstcpayintegration1', () => {
			instance = exampleBlockA.instance() as Cfstcpayintegration1;
		});

		then('Cfstcpayintegration1 will load with out errors', () => {
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
		let instance: Cfstcpayintegration1;

		given('I am a User loading Cfstcpayintegration1', () => {
			exampleBlockA = shallow(<Cfstcpayintegration1 {...screenProps} />);
		});

		when('I navigate to the Cfstcpayintegration1', () => {
			instance = exampleBlockA.instance() as Cfstcpayintegration1;
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

	test('User navigates away from Cfstcpayintegration1', ({ given, when, then }) => {
		let exampleBlockA: ShallowWrapper;
		let instance: Cfstcpayintegration1;

		given('I am a User loading Cfstcpayintegration1', () => {
			exampleBlockA = shallow(<Cfstcpayintegration1 {...screenProps} />);
		});

		when('I navigate to the Cfstcpayintegration1', () => {
			instance = exampleBlockA.instance() as Cfstcpayintegration1;
		});

		then('Cfstcpayintegration1 will load with out errors', () => {
			expect(exampleBlockA.exists()).toBe(true);
		});

		then('I can dismiss Cfstcpayintegration1', () => {
			let touchableWithoutFeedback = exampleBlockA.findWhere(
				(node) => node.prop('testID') === 'touchableWithoutFeedback'
			);
			touchableWithoutFeedback.simulate('press');
			expect(exampleBlockA.exists()).toBe(true);
		});
	});

	test('Cfstcpayintegration1 has event listeners for screen size changes added', ({ given, when, then }) => {
		let exampleBlockA: ShallowWrapper;
		let instance: Cfstcpayintegration1;

		given('I am a user loading Cfstcpayintegration1', () => {
			exampleBlockA = shallow(<Cfstcpayintegration1 {...screenProps} />);
		});

		when('I Load Cfstcpayintegration1', () => {
			instance = exampleBlockA.instance() as Cfstcpayintegration1;
		});

		then('the dimensions function has an event listener added', () => {
			expect(dimensionsAddEventListenerSpy).toHaveBeenCalledWith('change', expect.any(Function));
		});
	});

	test('Cfstcpayintegration1 resizing events are triggered', ({ given, when, then }) => {
		let exampleBlockA: ShallowWrapper;
		let instance: Cfstcpayintegration1;

		given('I am a user loading Cfstcpayintegration1', () => {
			exampleBlockA = shallow(<Cfstcpayintegration1 {...screenProps} />);
		});

		when('I load Cfstcpayintegration1 and change screen size', () => {
			instance = exampleBlockA.instance() as Cfstcpayintegration1;
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
