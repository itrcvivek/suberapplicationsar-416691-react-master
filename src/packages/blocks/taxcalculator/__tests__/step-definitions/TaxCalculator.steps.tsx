// Customizable Area Start
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import TaxCalculator from "../../src/TaxCalculator";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "TaxCalculator",
};

const feature = loadFeature(
  "./__tests__/features/TaxCalculator-scenario.feature"
);
const productTypeData = {
  data: [
    {
      id: "2",
      value: "Garments",
      type: "product_types",
      attributes: {
        id: 2,
        name: "Garments",
        tax_rate: "0.0",
        created_at: "2023-04-19T15:43:37.366Z",
        updated_at: "2023-04-19T15:43:37.366Z",
      },
    },
  ],
};
const countryData = {
  data: [
    {
      id: 230,
      value: "Afghanistan",
      name: "Afghanistan",
      country_code: "AF",
      created_at: "2023-04-19T15:09:39.014Z",
      updated_at: "2023-04-19T15:09:39.014Z",
    },
    {
      id: 133,
      value: "land Islands",
      name: "land Islands",
      country_code: "AX",
      created_at: "2023-04-19T15:09:38.862Z",
      updated_at: "2023-04-19T15:09:38.862Z",
    },
  ],
};

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "ios");
  });

  test("User navigates to TaxCalculator", ({ given, when, then }) => {
    let taxBlock: ShallowWrapper;
    let instance: TaxCalculator;

    given("I am a User loading TaxCalculator", () => {
      taxBlock = shallow(<TaxCalculator {...screenProps} />);
    });

    when("I navigate to the TaxCalculator", () => {
      instance = taxBlock.instance() as TaxCalculator;
    });

    then("TaxCalculator will load with out errors", () => {
      let countryEmpty = taxBlock.findWhere(
        (node) => node.prop("testID") === "country"
      );
      countryEmpty.props().renderBase();

      let productTypeEmpty = taxBlock.findWhere(
        (node) => node.prop("testID") === "productType"
      );
      productTypeEmpty.props().renderBase();
      expect(taxBlock).toBeTruthy();
    });

    then("I can select the button with with out errors", () => {
      let buttonComponent = taxBlock.findWhere(
        (node) => node.prop("testID") === "hideKeyboard"
      );
      buttonComponent.simulate("press");
      expect(taxBlock).toBeTruthy();
    });

    then("I can fetch country list without error", () => {
      const tokenMsg: Message = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", tokenMsg);

      // Get country list API response
      const getContriesId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getContriesId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getContriesId.messageId
      );
      getContriesId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.parse(JSON.stringify(countryData))
      );
      instance.getContriesId = getContriesId.messageId;
      runEngine.sendMessage("Unit Test", getContriesId);
      expect(taxBlock).toBeTruthy();
    });

    then("I can fetch product type list without error", () => {
      // Get product type list API response
      const getProductTypeId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getProductTypeId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getProductTypeId.messageId
      );
      getProductTypeId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.parse(JSON.stringify(productTypeData))
      );
      instance.getProductTypeId = getProductTypeId.messageId;
      runEngine.sendMessage("Unit Test", getProductTypeId);
      expect(taxBlock).toBeTruthy();
    });

    then("I can fetch data with error", () => {
      const getContriesId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getContriesId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getContriesId.messageId
      );
      getContriesId.addData(getName(MessageEnum.RestAPIResponceErrorMessage), {
        errors: { token: "Invalid token" },
      });
      instance.getContriesId = getContriesId.messageId;
      runEngine.sendMessage("Unit Test", getContriesId);
      expect(taxBlock).toBeTruthy();
    });

    then("I can select country with out errors", () => {
      let country = taxBlock.findWhere(
        (node) => node.prop("testID") === "country"
      );
      country.simulate("changeText", "Afghanistan", 0, countryData.data);
      country.props().valueExtractor({ id: 230, name: "Afghanistan" });
      expect(taxBlock).toBeTruthy();
    });

    then("I can enter price text with out errors", () => {
      let price = taxBlock.findWhere((node) => node.prop("testID") === "price");
      price.simulate("changeText", "100");
      expect(taxBlock).toBeTruthy();
    });

    then("I can enter price text with errors", () => {
      let price = taxBlock.findWhere((node) => node.prop("testID") === "price");
      price.simulate("changeText", "0.00");
      expect(taxBlock).toBeTruthy();
    });

    then("I can select product type with out errors", () => {
      let productType = taxBlock.findWhere(
        (node) => node.prop("testID") === "productType"
      );
      productType.simulate("changeText", "Garments", 1, productTypeData.data);
      productType.props().valueExtractor({
        attributes: { id: 6, name: "Garments", tax_rate: "1.0" },
      });
      productType.props().renderBase();
      expect(taxBlock).toBeTruthy();
    });

    then("I can enter product name text with out errors", () => {
      let productName = taxBlock.findWhere(
        (node) => node.prop("testID") === "productName"
      );
      productName.simulate("changeText", "T-shirt");
      expect(taxBlock).toBeTruthy();
    });

    then("I can select product name with errors", () => {
      let productName = taxBlock.findWhere(
        (node) => node.prop("testID") === "productName"
      );
      productName.simulate("changeText", "");
      expect(taxBlock).toBeTruthy();
    });

    then("I can fetch tax with out errors", () => {
      const calculateTaxApiId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      calculateTaxApiId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        calculateTaxApiId.messageId
      );
      calculateTaxApiId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        { price: "501" }
      );
      instance.calculateTaxApiId = calculateTaxApiId.messageId;
      runEngine.sendMessage("Unit Test", calculateTaxApiId);
      expect(taxBlock).toBeTruthy();
    });

    then("I can fetch tax with errors", () => {
      const calculateTaxApiId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      calculateTaxApiId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        calculateTaxApiId.messageId
      );
      calculateTaxApiId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        { errors: "error" }
      );
      instance.calculateTaxApiId = calculateTaxApiId.messageId;
      runEngine.sendMessage("Unit Test", calculateTaxApiId);

      // --------------default of switch case-------------------
      const testid = new Message(getName(MessageEnum.RestAPIResponceMessage));
      testid.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        testid.messageId
      );
      testid.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        price: "501",
      });
      runEngine.sendMessage("Unit Test", testid);
      expect(taxBlock).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      const emptyToken: Message = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );
      runEngine.sendMessage("Unit Test", emptyToken);
      expect(taxBlock).toBeTruthy();
    });
  });
});

// Customizable Area End
