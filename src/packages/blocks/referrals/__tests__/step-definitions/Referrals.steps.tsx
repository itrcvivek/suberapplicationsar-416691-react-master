import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Referrals from "../../src/Referrals";
import { Linking } from "react-native";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "Referrals",
};

const feature = loadFeature("./__tests__/features/Referrals-scenario.feature");
global.console.error = jest.fn();
global.console.warn = jest.fn();

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to Referrals", ({ given, when, then }) => {
    let referralBlock: ShallowWrapper;
    let instance: Referrals;
    let hideKeyboard: ShallowWrapper;
    given("I am a User loading Referrals", () => {
      referralBlock = shallow(<Referrals {...screenProps} />);
    });

    when("I navigate to the Referrals", () => {
      instance = referralBlock.instance() as Referrals;
    });

    then("Referrals will load with out errors", () => {
      expect(referralBlock).toBeTruthy();
    });

    then("render component did mount with url", () => {
      Linking.getInitialURL = jest.fn(() =>
        Promise.resolve("https://example.com"),
      );
      instance.componentDidMount();
    });

    then("render component did mount with error", () => {
      instance.btnExampleProps.onPress();
      instance.setState({ enableField: false });
      instance.btnShowHideProps.onPress();
      instance.txtInputWebProps.onChangeText("password");
      instance.setEnableField();
      instance.btnShowHideProps.onPress();

      Linking.getInitialURL = jest.fn(() => Promise.reject("error to get URL"));
      instance.componentDidMount();
    });

    when("Hide keyboard called button clicked", () => {
      instance.txtInputWebProps.secureTextEntry = true;
      instance.btnShowHideProps.onPress();
      hideKeyboard = referralBlock.findWhere(
        (node) => node.prop("testID") == "hideKeyboard",
      );
    });
    then("Hide keyboard called", () => {
      hideKeyboard.simulate("press");
    });

    when("loading is false", () => {
      instance.setState({ isLoading: false });
    });
    then("share social media called with facebook", () => {
      const shareOnFacebookBtn = referralBlock.findWhere(
        (node) => node.prop("testID") === "shareOnFacebook",
      );
      shareOnFacebookBtn.simulate("press");
    });
    then("share social media called with instagram", () => {
      const shareOnInstagramBtn = referralBlock.findWhere(
        (node) => node.prop("testID") === "shareOnInstagram",
      );
      shareOnInstagramBtn.simulate("press");
      shareOnInstagramBtn.simulate("press");
    });
    then("share social media called with whatsapp", () => {
      const shareOnWhatsappBtn = referralBlock.findWhere(
        (node) => node.prop("testID") === "shareOnWhatsapp",
      );
      shareOnWhatsappBtn.simulate("press");
    });
    then("share social media called with twitter", () => {
      const shareOnTwitterBtn = referralBlock.findWhere(
        (node) => node.prop("testID") === "shareOnTwitter",
      );
      shareOnTwitterBtn.simulate("press");
    });
    then("recieve function called with login code success", () => {
      const mockResponseUpdate = {
        meta: {
          token:
            "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MzcsImV4cCI6MTY3NzE0MDIxNywidG9rZW5fdHlwZSI6ImxvZ2luIn0.W3noo4dQNDwUnKxRL65QAbq6Qv6stusMuunfs50-Lr9ub44wPXO5_Mmr3aLK_S2Kd_bjW9L6dLVDoUgkvWgbsw",
          refresh_token:
            "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MzcsImV4cCI6MTcwODU4OTgxNywidG9rZW5fdHlwZSI6InJlZnJlc2gifQ.58MIK8ptBog4ufHL4Xlql3o74LjGUWEhbAUz7u_UBdd6eTUY2k0a6B3xGYPogJZHC_kfKbuSb-CErhOZ7sssDA",
          id: 37,
        },
      };

      const apiMsgupdate = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );

      apiMsgupdate.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiMsgupdate.messageId,
      );

      apiMsgupdate.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponseUpdate,
      );

      instance.loginApiCallId = apiMsgupdate.messageId;
      runEngine.sendMessage("Unit Test", apiMsgupdate);
    });
    then("recieve function called with login code failed", () => {
      const mockResponseUpdate = {
        error: "test failed",
      };

      const apiMsgupdate = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );

      apiMsgupdate.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiMsgupdate.messageId,
      );

      apiMsgupdate.addData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
        mockResponseUpdate,
      );

      instance.loginApiCallId = apiMsgupdate.messageId;
      runEngine.sendMessage("Unit Test", apiMsgupdate);
    });
    then("recieve function called with referral code success", () => {
      const mockResponseData = {
        data: {
          account_id: 37,
          code: "YL2PMX",
          created_by: 37,
          id: 1,
          is_active: true,
          updated_by: 37,
        },
        message: "referral code created successfully",
      };

      const apiMsgupdate = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );

      apiMsgupdate.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiMsgupdate.messageId,
      );

      apiMsgupdate.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponseData,
      );

      instance.getReferralCodeID = apiMsgupdate.messageId;
      runEngine.sendMessage("Unit Test", apiMsgupdate);
    });
    then("recieve function called with referral code failed", () => {
      const mockResponseUpdate = {
        error: "test failed",
      };

      const apiMsgupdate = new Message(
        getName(MessageEnum.RestAPIResponceMessage),
      );

      apiMsgupdate.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiMsgupdate.messageId,
      );

      apiMsgupdate.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponseUpdate,
      );

      instance.getReferralCodeID = apiMsgupdate.messageId;
      runEngine.sendMessage("Unit Test", apiMsgupdate);
    });
    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(referralBlock).toBeTruthy();
    });
  });
});
