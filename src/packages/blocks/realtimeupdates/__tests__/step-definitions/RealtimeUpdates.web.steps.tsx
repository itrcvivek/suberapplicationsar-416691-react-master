// Customizable Area Start
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import RealtimeUpdates from "../../src/RealtimeUpdates.web";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "RealtimeUpdates",
};

const feature = loadFeature("./__tests__/features/RealtimeUpdates-scenario.web.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to RealtimeUpdates", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: RealtimeUpdates;

    given("I am a User loading RealtimeUpdates", () => {
      exampleBlockA = shallow(<RealtimeUpdates {...screenProps} />);
      expect(exampleBlockA).toBeTruthy();
    });

    when("I navigate to the RealtimeUpdates", () => {
      instance = exampleBlockA.instance() as RealtimeUpdates;
      expect(exampleBlockA).toBeTruthy();
    });

    then("RealtimeUpdates will load with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can enter text with out errors", async () => {
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "createPostButton"
      );
      buttonComponent.simulate("click");
      let textInputComponent = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "txtInput"
      );
      const event = {
        preventDefault() {},
        target: { value: "hello@aol.com" },
      };
      textInputComponent.simulate("change", event);
      let component = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "callPostApiButton"
      );
      component.simulate("click");
      await new Promise((r) => setTimeout(r, 100));

      const event2 = {
        preventDefault() {},
        target: { value: "" },
      };
      textInputComponent.simulate("change", event2);

      component.simulate("click");
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can select the button with with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
    });

    then("Network response from adding new comment", () => {
      instance.setPostData([
        {
          id: "0",
          type: "post",
          allComments: [],
          attributes: {
            id: 0,
            name: "harry",
            description: "nice one",
            account_id: 99,
            created_at: "",
            updated_at: "",
            notification: null,
            post_likes_count: 1,
            post_comment_count: 1,
          },
        },
      ]);

      const commentMessage = new Message(getName(MessageEnum.RestAPIResponceMessage));
      commentMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), commentMessage);
      commentMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        data: "successfull",
      });
      commentMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        commentMessage.messageId
      );
      instance.singleCommentId = commentMessage.messageId;
      runEngine.sendMessage(commentMessage.messageId, commentMessage);
      expect(exampleBlockA).toBeTruthy();
    });

    then("Network response from comment api with error", () => {
      const commentErrorMsg = new Message(getName(MessageEnum.RestAPIResponceMessage));
      commentErrorMsg.addData(getName(MessageEnum.RestAPIResponceDataMessage), commentErrorMsg);
      commentErrorMsg.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        errors: {},
      });
      commentErrorMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        commentErrorMsg.messageId
      );
      instance.singleCommentId = commentErrorMsg.messageId;
      runEngine.sendMessage(commentErrorMsg.messageId, commentErrorMsg);
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      instance.setModalVisible();
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "closeModalButton"
      );
      buttonComponent.simulate("click");
      instance.componentWillUnmount();
      expect(exampleBlockA).toBeTruthy();
    });
  });
});

// Customizable Area End
