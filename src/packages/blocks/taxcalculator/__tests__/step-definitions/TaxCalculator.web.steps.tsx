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
import TaxCalculator from "../../src/TaxCalculator.web";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "TaxCalculator",
};

const feature_data = loadFeature(
  "./__tests__/features/TaxCalculator-scenario.web.feature"
);
const product_type_data = {
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
const country_data = {
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

defineFeature(feature_data, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("Navigates to TaxCalculator", ({ given, when, then }) => {
    let example_block_a: ShallowWrapper;
    let instance_tax_calculator: TaxCalculator;

    given("User loading TaxCalculator", () => {
      example_block_a = shallow(<TaxCalculator {...screenProps} />);
    });

    when("Navigate to the TaxCalculator", () => {
      instance_tax_calculator = example_block_a.instance() as TaxCalculator;
    });

    then("TaxCalculator will load with out errors", () => {
      expect(example_block_a).toBeTruthy();
    });

    then("Fetch country list without error", () => {
      // Get country list API response
      const get_contries_id = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      get_contries_id.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        get_contries_id.messageId
      );
      get_contries_id.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.parse(JSON.stringify(country_data))
      );
      expect(example_block_a).toBeTruthy();
    });

    then("Fetch product type list without error", () => {
      // Get product type list API response
      const get_product_type_id = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      get_product_type_id.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        get_product_type_id.messageId
      );
      get_product_type_id.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.parse(JSON.stringify(product_type_data))
      );
      expect(example_block_a).toBeTruthy();
    });

    then("Fetch data with error", () => {
      const get_contries_id = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      get_contries_id.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        get_contries_id.messageId
      );
      get_contries_id.addData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
        { errors: { token: "" } }
      );
      expect(example_block_a).toBeTruthy();
    });

    then("Select country with out errors", () => {
      let countryData = example_block_a.findWhere(
        (node) => node.prop("data-test-id") === "country"
      );
      const event = {
        target: { value: 230 },
      };
      countryData.simulate("change", event);
      expect(example_block_a).toBeTruthy();
    });

    then("Enter price text with out errors", () => {
      let priceData = example_block_a.findWhere(
        (node) => node.prop("data-test-id") === "price"
      );
      const event = {
        target: { value: "100" },
      };
      priceData.simulate("change", event);
      expect(example_block_a).toBeTruthy();
    });

    then("Enter price text with errors", () => {
      let priceData = example_block_a.findWhere(
        (node) => node.prop("data-test-id") === "price"
      );
      const event = {
        target: { value: "0.00" },
      };
      priceData.simulate("change", event);
      expect(example_block_a).toBeTruthy();
    });

    then("Select product type with out errors", () => {
      let productTypeData = example_block_a.findWhere(
        (node) => node.prop("data-test-id") === "productType"
      );

      const event = {
        target: { value: 2 },
      };
      productTypeData.simulate("change", event);
      expect(example_block_a).toBeTruthy();
    });

    then("Enter product name text with out errors", () => {
      let productNameData = example_block_a.findWhere(
        (node) => node.prop("data-test-id") === "productName"
      );
      const event = {
        target: { value: "T-shirt" },
      };
      productNameData.simulate("change", event);
      expect(example_block_a).toBeTruthy();
    });

    then("Select product name with errors", () => {
      let productNameData = example_block_a.findWhere(
        (node) => node.prop("data-test-id") === "productName"
      );
      const event = {
        target: { value: "" },
      };
      productNameData.simulate("change", event);
      expect(example_block_a).toBeTruthy();
    });

    then("Fetch tax with out errors", () => {
      const calculate_tax_api_id = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      calculate_tax_api_id.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        calculate_tax_api_id.messageId
      );
      calculate_tax_api_id.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        { price: "501" }
      );
      instance_tax_calculator.calculateTaxApiId =
        calculate_tax_api_id.messageId;
      runEngine.sendMessage("Unit Test", calculate_tax_api_id);
      expect(example_block_a).toBeTruthy();
    });

    then("Fetch tax with errors", () => {
      const calculate_tax_api_id = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      calculate_tax_api_id.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        calculate_tax_api_id.messageId
      );
      calculate_tax_api_id.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        { errors: "error" }
      );
      expect(example_block_a).toBeTruthy();
    });

    then("Leave the screen with out errors", () => {
      expect(example_block_a).toBeTruthy();
    });
  });
});

// Customizable Area End
