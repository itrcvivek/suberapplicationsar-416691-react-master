// Customizable Area Start
import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import { CommentView, PostItem } from "../../src/PostItem.web"
const navigation = require("react-navigation")

const screenProps = {
    navigation: {
        navigate: jest.fn(),
    },
    id: "PostItem"
}

let comments = [{
    "attributes": {
        "id": 0,
        "comment": "nice",
        "account": {
            "full_name": "harry"
        },
    }
}];
let posts = {
    "id": "0",
    "type": "post",
    "allComments": comments,
    "attributes": {
        "id": 0,
        "name": "harry",
        "description": "nice one",
        "account_id": 99,
        "created_at": "",
        "updated_at": "",
        "notification": null,
        "post_likes_count": 1,
        "post_comment_count": 1
    }
}

const feature = loadFeature('./__tests__/features/PostItem-scenario.web.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to PostItem web', ({ given, when, then }) => {
        let postItem: ShallowWrapper;
        let commentView: ShallowWrapper;

        given('I am a User loading PostItem web', () => {
            postItem = shallow(<PostItem item={posts} getSinglePostComments={(postId: string) => { }} addComment={(comment: string, postId: string) => { }} likePost={(postId: string, isLiked: boolean) => { }} />);
            commentView = shallow(<CommentView item={comments[0]} />);
            expect(postItem).toBeTruthy();
        });

        when('I navigate to the PostItem web', () => {
            let textInputComponent = postItem.findWhere(
                (node) => node.prop("data-test-id") === "txtInput"
            );
            const event = {
                preventDefault() { },
                target: { value: "hello@aol.com" },
            };
            textInputComponent.simulate("change", event);
            expect(postItem).toBeTruthy();

        });

        then('PostItem web will load with out errors', () => {
            let buttonComponent = postItem.findWhere((node) => node.prop('data-test-id') === 'hideShowButton');
            buttonComponent.simulate('click');
            expect(postItem).toBeTruthy();
        });

        then('I can enter text with out errors', () => {
            let textInputComponent = postItem.findWhere((node) => node.prop('data-test-id') === 'txtInput');
            textInputComponent.simulate('changeText', 'hello@aol.com');
            let buttonComponent = postItem.findWhere((node) => node.prop('data-test-id') === 'addCommentButton');
            buttonComponent.simulate('click');
            expect(postItem).toBeTruthy();
        });

        then('I can select the like button with out errors', () => {
            let buttonComponent = postItem.findWhere((node) => node.prop('data-test-id') === 'likeButton');
            buttonComponent.simulate('click');
            expect(postItem).toBeTruthy();
        });

        then('I can leave the screen with out errors', () => {
            let buttonComponent = postItem.findWhere((node) => node.prop('data-test-id') === 'likeButton');
            buttonComponent.simulate('click');
            expect(postItem).toBeTruthy();
        });
    });


});

// Customizable Area End
