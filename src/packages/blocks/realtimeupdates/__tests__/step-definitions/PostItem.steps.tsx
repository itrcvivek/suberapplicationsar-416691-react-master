// Customizable Area Start
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import { CommentPostView, PostItem } from "../../src/PostItem";
const navigation = require("react-navigation");

const postScreenProps = {
  navigation: {
    navigate: jest.fn(),
  },
  id: "PostItem",
};

let allComment = [
  {
    attributes: {
      id: 0,
      comment: "nice",
      account: {
        full_name: "harry",
      },
    },
  },
];
let newPost = {
  id: "0",
  type: "post",
  allComments: allComment,
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
};

const postFeature = loadFeature("./__tests__/features/PostItem-scenario.feature");

defineFeature(postFeature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to PostItem", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let exampleBlockB: ShallowWrapper;

    given("I am a User loading PostItem", () => {
      exampleBlockA = shallow(
        <PostItem
          item={newPost}
          getSinglePostComments={(postId: string) => {}}
          addComment={(comment: string, postId: string) => {}}
          likePost={(postId: string, isLiked: boolean) => {}}
        />
      );
      exampleBlockB = shallow(<CommentPostView item={allComment[0]} />);
      expect(exampleBlockB).toBeTruthy();
    });

    when("I navigate to the PostItem", () => {
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "hideShowButton"
      );
      buttonComponent.simulate("press");
      expect(exampleBlockB).toBeTruthy();
    });

    then("PostItem will load with out errors", () => {
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "addCommentButton"
      );
      buttonComponent.simulate("press");
      expect(exampleBlockA).toBeTruthy();
      expect(exampleBlockB).toBeTruthy();
    });

    then("I can enter text with out errors", () => {
      let textInputComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "txtInput"
      );
      textInputComponent.simulate("changeText", "hello@aol.com");
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "addCommentButton"
      );
      buttonComponent.simulate("press");
      expect(exampleBlockA).toBeTruthy();
      expect(exampleBlockB).toBeTruthy();
    });

    then("I can select the like button with out errors", () => {
      let buttonComponent = exampleBlockA.findWhere((node) => node.prop("testID") === "likeButton");
      buttonComponent.simulate("press");
      expect(exampleBlockA).toBeTruthy();
      expect(exampleBlockB).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "hideShowButton"
      );
      buttonComponent.simulate("press");
      const flatList = exampleBlockA.findWhere((node) => node.prop("testID") === "flatlist");
      flatList.renderProp("renderItem")({ item: newPost });
      expect(exampleBlockA).toBeTruthy();
      expect(exampleBlockB).toBeTruthy();
    });
  });
});

// Customizable Area End
