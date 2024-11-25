import { defineFeature, loadFeature } from 'jest-cucumber';
import { shallow, ShallowWrapper, mount, ReactWrapper } from 'enzyme';

import * as helpers from '../../../../framework/src/Helpers';
import { runEngine } from '../../../../framework/src/RunEngine';
import { Message } from '../../../../framework/src/Message';

import MessageEnum, { getName } from '../../../../framework/src/Messages/MessageEnum';
import React from 'react';
import Audiototext from '../../src/Audiototext.web';
const navigation = require('react-navigation');

const screenProps = {
	navigation: navigation,
	id: 'Audiototext',
};

const feature = loadFeature('./__tests__/features/audiototext-scenario.web.feature');

defineFeature(feature, (test) => {
	beforeEach(() => {
		jest.resetModules();
		jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
		jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
	});

	test('User navigates to Audiototext and inputs text', ({ given, when, then }) => {
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
		
		when('I click on start record button without error', () => {
			let startRecording = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'startRecording');
			startRecording.simulate('click');
		});

		then('Audio recording is start without error', () => {
			let startRecording = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'startRecording');
			expect(startRecording.prop('color')).toEqual('secondary');
		});
		when('I click on start record button with error', () => {
			global.navigator.mediaDevices.getUserMedia = jest.fn(() => Promise.reject('getUserMedia error'));
			let startRecording = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'startRecording');
			startRecording.simulate('click');
		});

		then('Audio recording is start with error', () => {
			let startRecording = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'startRecording');
			expect(startRecording.prop('color')).toEqual('secondary');
		});

		when("I click on stop recording button", () => {
			let stopRecording = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'stopRecording');
			stopRecording.simulate('click');
		})

		then('Audio recording is stop', () => {
			let stopRecording = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'stopRecording');
			const stopRecordingAPI = new Message(
				getName(MessageEnum.RestAPIResponceMessage)
			  );
			  stopRecordingAPI.addData(
				getName(MessageEnum.RestAPIResponceDataMessage),
				stopRecordingAPI
			  );
			  stopRecordingAPI.addData(
				getName(MessageEnum.RestAPIResponceSuccessMessage),
				{
				  errors:"Transcription failed: File does not appear to contain audio. File type is inode/x-empty (empty).",
				}
			  );
		
			  stopRecordingAPI.addData(
				getName(MessageEnum.RestAPIResponceDataMessage),
				stopRecordingAPI.messageId
			  );
			  instance.addDataCall = stopRecordingAPI.messageId;
			  runEngine.sendMessage("Unit Test", stopRecordingAPI);
			expect(stopRecording.prop('color')).toEqual('secondary');
		});

	});
});
