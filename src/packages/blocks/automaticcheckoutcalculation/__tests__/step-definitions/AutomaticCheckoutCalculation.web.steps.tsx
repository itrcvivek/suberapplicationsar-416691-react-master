import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import AutomaticCheckoutCalculation from "../../src/AutomaticCheckoutCalculation.web";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "AutomaticCheckoutCalculation",
};

const feature = loadFeature(
  "./__tests__/features/AutomaticCheckoutCalculation-scenario.web.feature"
);
const responseJson = {
  "Price": "1000",
  "Discount": "5.0 percent",
  "Discounted Value": 950.0,
  "Cost Type": "percent"
}
defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to AutomaticCheckoutCalculation", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: AutomaticCheckoutCalculation;

    given("I am a User loading AutomaticCheckoutCalculation", () => {
      exampleBlockA = shallow(<AutomaticCheckoutCalculation {...screenProps} />);
    });

    when("I navigate to the AutomaticCheckoutCalculation", () => {
      instance = exampleBlockA.instance() as AutomaticCheckoutCalculation;
      const getdiscountPrice = new Message(getName(MessageEnum.RestAPIResponceMessage))
      getdiscountPrice.addData(getName(MessageEnum.RestAPIResponceDataMessage), getdiscountPrice);
      getdiscountPrice.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
          responseJson
      );
      getdiscountPrice.addData(getName(MessageEnum.RestAPIResponceDataMessage), getdiscountPrice.messageId);
      instance.getDiscountPriceCallId = getdiscountPrice.messageId
      runEngine.sendMessage("Unit Test", getdiscountPrice);


      const getShippingPrice = new Message(getName(MessageEnum.RestAPIResponceMessage))
      getShippingPrice.addData(getName(MessageEnum.RestAPIResponceDataMessage), getShippingPrice);
      getShippingPrice.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
          responseJson
      );
      getShippingPrice.addData(getName(MessageEnum.RestAPIResponceDataMessage), getShippingPrice.messageId);
      instance.getShippingPriceCallId = getShippingPrice.messageId
      runEngine.sendMessage("Unit Test", getShippingPrice);

      const getTaxPrice = new Message(getName(MessageEnum.RestAPIResponceMessage))
      getTaxPrice.addData(getName(MessageEnum.RestAPIResponceDataMessage), getTaxPrice);
      getTaxPrice.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
          responseJson
      );
      getTaxPrice.addData(getName(MessageEnum.RestAPIResponceDataMessage), getTaxPrice.messageId);
      instance.getTaxPriceCallId = getTaxPrice.messageId
      runEngine.sendMessage("Unit Test", getTaxPrice);
    });


    then("I can select the buttons with with out errors", () => {
     
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("data-testid") === "minusIcon-0"
      );
    
      let buttonComponent1 = exampleBlockA.findWhere(
        (node) => node.prop("data-testid") === "plusIcon-0"
      );
      buttonComponent.simulate("click");
      buttonComponent1.simulate("click");
      expect(buttonComponent).toHaveLength(1);
    });
    
  then('I can decrease counter display minusIcon',()=>{
    let buttonComponent = exampleBlockA.findWhere(
      (node) => node.prop("data-testid") === "minusIcon-0"

    );
    buttonComponent.simulate("click")
    expect(buttonComponent).toHaveLength(1);

   
  });
  then('I can increase counter display plusIcon',()=>{
    let buttonComponent1 = exampleBlockA.findWhere(
      (node) => node.prop("data-testid") === "plusIcon-0"
    );
    buttonComponent1.simulate("click");
    expect(buttonComponent1).toHaveLength(1);
  });
  });
});
