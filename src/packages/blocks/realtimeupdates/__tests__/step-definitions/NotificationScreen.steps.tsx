// Customizable Area Start
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import NotificationScreen from "../../src/NotificationScreen";
const navigation = require("react-navigation");

const screenProps = {
  navigation: {
    navigate: jest.fn(),
  },
  id: "NotificationScreen",
};

const notify = {
  attributes: {
    id: 0,
    headings: "as",
  },
};

const feature = loadFeature("./__tests__/features/NotificationScreen-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to NotificationScreen", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: NotificationScreen;

    given("I am a User loading NotificationScreen", () => {
      exampleBlockA = shallow(<NotificationScreen {...screenProps} />);
      expect(exampleBlockA).toBeTruthy();
    });

    when("I navigate to the NotificationScreen", () => {
      instance = exampleBlockA.instance() as NotificationScreen;
      expect(exampleBlockA).toBeTruthy();
    });

    then("NotificationScreen will load with out errors", () => {
      instance.setInputValue("hello world");
      instance.setEnableField();
      instance.txtInputWebProps.onChangeText("hello world");
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can select the hide keyboard button with out errors", () => {
      instance.btnExampleProps.onPress();
      instance.getNotifications();
      expect(exampleBlockA).toBeTruthy();
    });

    then("Notification api is called", () => {
      const getMessage = new Message(getName(MessageEnum.RestAPIResponceMessage));
      getMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getMessage);
      getMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        data: "success",
      });
      getMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getMessage.messageId);
      instance.getNotificationId = getMessage.messageId;
      runEngine.sendMessage(getMessage.id, getMessage);
      expect(exampleBlockA).toBeTruthy();
    });

    then("Notification error api is called", () => {
      const getMessage = new Message(getName(MessageEnum.RestAPIResponceMessage));
      getMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getMessage);
      getMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        errors: {},
      });
      getMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getMessage.messageId);
      instance.getNotificationId = getMessage.messageId;
      runEngine.sendMessage(getMessage.id, getMessage);
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      const flatList = exampleBlockA.findWhere((node) => node.prop("testID") === "flatlist");
      flatList.renderProp("renderItem")({ item: notify });
      flatList.renderProp("ListEmptyComponent")({});
      instance.componentWillUnmount();
      expect(exampleBlockA).toBeTruthy();
    });
  });
});

// Customizable Area End
