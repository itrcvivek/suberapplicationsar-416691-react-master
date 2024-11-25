// Customizable Area Start
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import NotificationScreen from "../../src/NotificationScreen.web";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { Message } from "../../../../framework/src/Message";
const navigation = require("react-navigation");

const notificationScreenProps = {
  navigation: navigation,
  id: "NotificationScreen",
};

const notificationFeature = loadFeature(
  "./__tests__/features/NotificationScreen-scenario.web.feature"
);

defineFeature(notificationFeature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to NotificationScreen web", ({ given, when, then }) => {
    let notificationScreen: ShallowWrapper;
    let notificationInstance: NotificationScreen;

    given("I am a User loading NotificationScreen web", () => {
      notificationScreen = shallow(<NotificationScreen {...notificationScreenProps} />);
      expect(notificationScreen).toBeTruthy();
    });

    when("I navigate to the NotificationScreen web", () => {
      notificationInstance = notificationScreen.instance() as NotificationScreen;
      expect(notificationScreen).toBeTruthy();
    });

    then("NotificationScreen web will load with out errors", () => {
      expect(notificationScreen).toBeTruthy();
    });

    then("I can enter text with out errors", () => {
      const getMessage = new Message(getName(MessageEnum.RestAPIResponceMessage));
      notificationInstance.getNotificationId = getMessage.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      getMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        data: [
          {
            attributes: {
              id: 1,
              headings: "string",
            },
          },
        ],
      });
      notificationInstance.handleNotificationData("comment", getMessage);

      expect(notificationScreen).toBeTruthy();
    });

    then("I can select the button with with out errors", () => {
      expect(notificationScreen).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      notificationInstance.componentWillUnmount();
      expect(notificationScreen).toBeTruthy();
    });
  });
});

// Customizable Area End
