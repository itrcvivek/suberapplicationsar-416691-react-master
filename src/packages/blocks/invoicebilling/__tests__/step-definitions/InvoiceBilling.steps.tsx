import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { beforeEach, expect, jest } from "@jest/globals";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import InvoiceBilling from "../../src/InvoiceBilling";
import { Linking } from "react-native";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "InvoiceBilling",
};

const ApiData = {
  invoice:
    "https://nickcoingophase1v2-158847-ruby.b158847.dev.eastus.az.svc.builder.cafe//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBc2NDIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--4d45a5ab8c3d0210d1b7a037e140d2b3b5508b1d/Invoice_299206.pdf",
};

const ApiError = { errors: [{ message: "No invoice found." }] };

const feature = loadFeature(
  "./__tests__/features/InvoiceBilling-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("Display the InvoiceBilling", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: InvoiceBilling;

    given("I am on the InvoiceBilling screen", () => {
      exampleBlockA = shallow(<InvoiceBilling {...screenProps} />);
      instance = exampleBlockA.instance() as InvoiceBilling;
    });

    when("the screen is loaded", () => {
      let textInputComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "main_view"
      );
      expect(textInputComponent).toHaveLength(1);
    });

    then("I should see the InvoiceBilling input", () => {
      let textInputComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "txtInput"
      );
      expect(textInputComponent).toHaveLength(1);
    });

    then("I enter some number", () => {
      let textInputComponent = exampleBlockA.findWhere(
        (node) => node.prop("onChangeText") === "txtInput"
      );
       textInputComponent.simulate("onChangeText", "299206");
      let textIn = "770053";
      instance.onChangeInvoice(textIn);
        instance.setState({
          invoice: textIn,
        });

    });

    when("I submit invoice number", () => {
      let submitCompp = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "btnExample"
      );
      submitCompp.simulate("press");
      instance.getPdfLink();
      instance.setState({ loading: true });
      const getPdfUrl = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getPdfUrl.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getPdfUrl
      );
      getPdfUrl.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        data: ApiData,
      });
      instance.pdfApiCallId = getPdfUrl;
      runEngine.sendMessage("Unit Test", getPdfUrl);
      instance.setState({ loading: false, invoicePdf: ApiData.invoice });
    });

    then("I should able to view pdf", () => {
      jest.spyOn(Linking, "openURL");
      Linking.openURL(ApiData.invoice);
      expect(Linking.openURL).toHaveBeenCalledWith(ApiData.invoice);
    });
  });


  test("Handle API errors", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: InvoiceBilling;

    given("I am on the InvoiceBilling screen", () => {
      exampleBlockA = shallow(<InvoiceBilling {...screenProps} />);
      instance = exampleBlockA.instance() as InvoiceBilling;
    });

    when("The get pdf api returns an error", () => {
      instance.setState({ loading: true });
      const getPdfUrlAPIError = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getPdfUrlAPIError.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getPdfUrlAPIError
      );
      getPdfUrlAPIError.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        ApiError
      );
      instance.pdfApiCallId = getPdfUrlAPIError;
      runEngine.sendMessage("Unit Test", getPdfUrlAPIError);
      instance.setState({ loading: false });
    });

    then("I should see alert", () => {
      instance.parseApiErrorResponse(ApiError);
      instance.parseApiCatchErrorResponse(ApiError)
    });
  });
});
