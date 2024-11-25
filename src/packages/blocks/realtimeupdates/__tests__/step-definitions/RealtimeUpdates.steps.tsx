// Customizable Area Start
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import RealtimeUpdates from "../../src/RealtimeUpdates";
const navigation = require("react-navigation");

const screenProps = {
  navigation: {
    navigate: jest.fn(),
  },
  id: "RealtimeUpdates",
};

const feature = loadFeature("./__tests__/features/RealtimeUpdates-scenario.feature");

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

    then("I can enter text with out errors", () => {
      let textInputComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "txtInput"
      );
      instance.getPost();
      textInputComponent.simulate("changeText", "hello@aol.com");
      instance.getSinglePostComments("0");
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can select the button with with out errors", () => {
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "createPostButton"
      );
      buttonComponent.simulate("press");
      instance.btnExampleProps.onPress();
      expect(instance.state.modalVisible).toEqual(true);
    });

    then("I can select the notification button with out errors", () => {
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "navigateButton"
      );
      buttonComponent.simulate("press");
      instance.txtInputWebProps.onChangeText("hello world");
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can select the hide keyboard button with out errors", () => {
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "callPostApiButton"
      );
      instance.addComment("", "0");
      buttonComponent.simulate("press");
      instance.likePostApiCall("0", true);
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can select the close modal button with out errors", () => {
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "closeModalButton"
      );

      buttonComponent.simulate("press");
      const getMessage = new Message(getName(MessageEnum.RestAPIResponceMessage));

      instance.likePostId = getMessage.getData(getName(MessageEnum.RestAPIResponceDataMessage));
      instance.handleLikePostData("like", getMessage);
      instance.likePostApiCall("0", false);
      expect(instance.state.modalVisible).toEqual(false);
    });

    then("Network response from adding new post", () => {
      const postMessage = new Message(getName(MessageEnum.RestAPIResponceMessage));
      postMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), postMessage);
      postMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        data: {
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
      });
      postMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), postMessage.messageId);
      instance.createPostId = postMessage.messageId;
      runEngine.sendMessage(postMessage.messageId, postMessage);
      expect(exampleBlockA).toBeTruthy();
    });

    then("Network response from create post api with error", () => {
      const postErrorMsg = new Message(getName(MessageEnum.RestAPIResponceMessage));
      postErrorMsg.addData(getName(MessageEnum.RestAPIResponceDataMessage), postErrorMsg);
      postErrorMsg.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        errors: {},
      });
      postErrorMsg.addData(getName(MessageEnum.RestAPIResponceDataMessage), postErrorMsg.messageId);
      instance.createPostId = postErrorMsg.messageId;
      runEngine.sendMessage(postErrorMsg.messageId, postErrorMsg);
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      const flatList = exampleBlockA.findWhere((node) => node.prop("testID") === "flatlist");
      flatList.renderProp("renderItem")({ item: "" });
      instance.createPost("");

      const getMessage = new Message(getName(MessageEnum.RestAPIResponceMessage));

      instance.likePostId = getMessage.getData(getName(MessageEnum.RestAPIResponceDataMessage));
      instance.handleLikePostData("like", getMessage);
      instance.singleCommentId = getMessage.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      instance.handlePostCommentData("comment", getMessage);

      instance.createCommentId = getMessage.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      instance.handleCreateCommentData("comment", getMessage);
      instance.getPostId = getMessage.getData(getName(MessageEnum.RestAPIResponceDataMessage));
      instance.handleGetPostData("comment", getMessage);

      getMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        data: {},
      });
      instance.likePostId = getMessage.getData(getName(MessageEnum.RestAPIResponceDataMessage));
      instance.handleLikePostData("like", getMessage);
      instance.singleCommentId = getMessage.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      instance.handlePostCommentData("comment", getMessage);

      instance.createCommentId = getMessage.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      instance.handleCreateCommentData("comment", getMessage);
      instance.getPostId = getMessage.getData(getName(MessageEnum.RestAPIResponceDataMessage));
      instance.handleGetPostData("comment", getMessage);

      instance.createPost("hello world!");
      instance.componentWillUnmount();
      expect(exampleBlockA).toBeTruthy();
    });
  });
});

// Customizable Area End
