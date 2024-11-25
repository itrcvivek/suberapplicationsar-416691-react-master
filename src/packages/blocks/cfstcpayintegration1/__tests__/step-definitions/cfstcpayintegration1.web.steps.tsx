import { defineFeature, loadFeature } from 'jest-cucumber';
import { shallow, ShallowWrapper, mount, ReactWrapper } from 'enzyme';

import * as helpers from '../../../../framework/src/Helpers';
import { runEngine } from '../../../../framework/src/RunEngine';
import { Message } from '../../../../framework/src/Message';

import MessageEnum, { getName } from '../../../../framework/src/Messages/MessageEnum';
import React from 'react';
import Cfstcpayintegration1 from '../../src/Cfstcpayintegration1.web';
const navigation = require('react-navigation');

const screenProps = {
	navigation: navigation,
	id: 'Cfstcpayintegration1',
};

const feature = loadFeature('./__tests__/features/Cfstcpayintegration1-scenario.web.feature');

defineFeature(feature, (test) => {
	beforeEach(() => {
		jest.resetModules();
		jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
		jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
	});

	test('User navigates to Cfstcpayintegration1 and inputs text', ({ given, when, then }) => {
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
			let textInputComponent = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'txtInput');
			const event = {
				preventDefault() {},
				target: { value: 'hello@aol.com' },
			};
			textInputComponent.simulate('change', event);
			expect(instance.state.txtInputValue).toEqual('hello@aol.com');
		});

		then('I can select the button with with out errors', () => {
			let buttonComponent = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'btnAddExample');
			const buttonPressedSpy = jest.spyOn(instance, 'doButtonPressed');
			buttonComponent.simulate('click');
			expect(buttonPressedSpy).toHaveBeenCalled();
		});

		then('I can leave the screen with out errors', () => {
			instance.componentWillUnmount();
			expect(exampleBlockA.exists()).toBe(true);
		});
	});

	test('User navigates to Cfstcpayintegration1 and inputs a password', ({ given, when, then, and }) => {
		let exampleBlockA: ReactWrapper;
		let instance: Cfstcpayintegration1;

		given('I am a User loading Cfstcpayintegration1', () => {
			exampleBlockA = mount(<Cfstcpayintegration1 {...screenProps} />);
		});

		when('I navigate to the Cfstcpayintegration1', () => {
			instance = exampleBlockA.instance() as Cfstcpayintegration1;
		});

		when('I want to enter a password', () => {
			instance.setState({ enableField: true });
			exampleBlockA.update();
		});

		then('Cfstcpayintegration1 will load with out errors', () => {
			expect(exampleBlockA.exists()).toBe(true);
		});

		then('the text input field will be a password field', () => {
			let textInputComponent = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'txtInput').first();
			expect(textInputComponent.prop('type')).toEqual('password');
		});

		then('I can enter text with out errors', () => {
			let textInputComponent = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'txtInput').first();
			const event = {
				preventDefault() {},
				target: { value: 'hello@aol.com' },
			};
			textInputComponent.props().onChange(event);
			expect(instance.state.txtInputValue).toEqual('hello@aol.com');
		});

		then('I can toggle to show the password', () => {
			let togglePasswordBtn = exampleBlockA
				.findWhere((node) => node.prop('data-test-id') === 'btnTogglePassword')
				.first();

			let txtInputField = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'txtInput').first();

			togglePasswordBtn.simulate('click');
			exampleBlockA.update();
			togglePasswordBtn = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'btnTogglePassword').first();
			txtInputField = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'txtInput').first();

			expect(txtInputField.prop('type')).toEqual('text');
		});

		then('I can select the button with with out errors', () => {
			let buttonComponent = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'btnAddExample').first();
			buttonComponent.simulate('click');
			expect(exampleBlockA.exists()).toBe(true);
		});

		then('I can leave the screen with out errors', () => {
			instance.componentWillUnmount();
			expect(exampleBlockA.exists()).toBe(true);
		});
	});
});
