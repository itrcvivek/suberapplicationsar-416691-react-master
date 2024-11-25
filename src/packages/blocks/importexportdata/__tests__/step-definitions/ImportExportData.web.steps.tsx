import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import ImportExportData from "../../src/ImportExportData.web";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "ImportExportData",
};

const feature = loadFeature(
  "./__tests__/features/ImportExportData-scenario.web.feature"
);

jest.mock("react-native-fs", () => ({
  writeFile: jest.fn(),
  DocumentDirectoryPath: "testpath",
}));

global.Blob = jest.fn()
global.URL.createObjectURL = jest.fn()

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");

    jest.spyOn(runEngine, "sendMessage");
  });

  test("User exports JSON file", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: ImportExportData;

    const exampleJsonResponse = {
      mockJson: "testJson",
    };

    given("I am a User loading ImportExportData", () => {
      exampleBlockA = shallow(<ImportExportData {...screenProps} />);
    });

    when("I navigate to the ImportExportData", () => {
      instance = exampleBlockA.instance() as ImportExportData;
    });

    then("ImportExportData will load with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
    });

    when("I press the export JSON button", () => {
      jest.spyOn(instance, "exportFile");

      const buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "downloadJson"
      );
      buttonComponent.simulate("click");
    });

    then("a request should be sent to download the JSON", () => {
      expect(runEngine.sendMessage).toBeCalledWith("RestAPIRequestMessage", {
        id: "RestAPIRequestMessage",
        initializeFromObject: expect.any(Function),
        messageId: expect.any(String),
        properties: {
          RestAPIRequestHeaderMessage:
            '{"Content-Type":"application/json","token":""}',
          RestAPIRequestMethodMessage: "GET",
          RestAPIResponceEndPointMessage: "data_import_export/export",
        },
      });
    });

    when("a response is received containing the requested JSON", () => {
      const jsonResponseMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      jsonResponseMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        jsonResponseMessage.messageId
      );

      jsonResponseMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        exampleJsonResponse
      );

      instance.jsonDataApiCallId = jsonResponseMessage.messageId;
      runEngine.sendMessage("Unit Test", jsonResponseMessage);
    });

    then("a JSON file should be created on the user's device", () => {
      expect(instance.exportFile).toBeCalledWith(JSON.stringify(exampleJsonResponse), ".json");
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(exampleBlockA).toBeTruthy();
    });
  });

  test("User exports CSV file", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: ImportExportData;

    const exampleCsvResponse = "test,csv,file";

    given("I am a User loading ImportExportData", () => {
      exampleBlockA = shallow(<ImportExportData {...screenProps} />);
    });

    when("I navigate to the ImportExportData", () => {
      instance = exampleBlockA.instance() as ImportExportData;
    });

    then("ImportExportData will load with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
    });

    when("I press the export CSV button", () => {
      global.fetch = jest.fn().mockImplementation(() => ({
        text: () => Promise.resolve(exampleCsvResponse),
      }));

      jest.spyOn(instance, "exportFile");

      const buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "downloadCsv"
      );
      buttonComponent.simulate("click");
    });

    then("a request should be sent to download the CSV", () => {
      expect(fetch).toBeCalledWith(
        expect.stringContaining("/data_import_export/export"),
        {
          headers: { "Content-Type": "text/csv", token: "" },
        }
      );
    });

    when("a response is received containing the requested CSV", () => {
      // Done using the global fetch mock in when function above
    });

    then("a CSV file should be created on the user's device", () => {
      expect(instance.exportFile).toBeCalledWith(exampleCsvResponse, ".csv");
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(exampleBlockA).toBeTruthy();
    });
  });

  test("CSV API call returns an error", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: ImportExportData;

    const exampleCsvErrorResponse = { errors: "There was a mock error" };

    given("I am a User loading ImportExportData", () => {
      exampleBlockA = shallow(<ImportExportData {...screenProps} />);
    });

    when("I navigate to the ImportExportData", () => {
      instance = exampleBlockA.instance() as ImportExportData;
    });

    then("ImportExportData will load with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
    });

    when("I press the export CSV button", () => {
      global.fetch = jest.fn().mockImplementation(() => ({
        text: () => Promise.resolve(JSON.stringify(exampleCsvErrorResponse)),
      }));

      jest.spyOn(instance, "showAlert");

      const buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "downloadCsv"
      );
      buttonComponent.simulate("click");
    });

    then("a request should be sent to download the CSV", () => {
      expect(fetch).toBeCalledWith(
        expect.stringContaining("/data_import_export/export"),
        {
          headers: { "Content-Type": "text/csv", token: "" },
        }
      );
    });

    when("a response is received containing the an error response", () => {
      // Done using the global fetch mock in when function above
    });

    then("an alert should shown with the correct error message", () => {
      expect(instance.showAlert).toBeCalledWith(
        "Error downloading CSV",
        "Something went wrong."
      );
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(exampleBlockA).toBeTruthy();
    });
  });
});
