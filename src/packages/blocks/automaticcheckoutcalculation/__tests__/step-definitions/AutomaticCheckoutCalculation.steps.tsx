import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import AutomaticCheckoutCalculation from "../../src/AutomaticCheckoutCalculation"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "AutomaticCheckoutCalculation"
}

const feature = loadFeature('./__tests__/features/AutomaticCheckoutCalculation-scenario.feature');
const mockItem = { id: 1, productName: "Samsung Watch 4", quantity: 2, Price: "600", mainPrice: '600', Price1: "540", BasePrice: "540", Discount: "(10% off)"}
const responseJson = {
    "Price": "1000",
    "Discount": "5.0 percent",
    "Discounted Value": 950.0
}
const responseJson1 = {
    ...responseJson,
    "Cost Type":"percent"
}

const mockAPIAutomaticCheckoutCalculation = (instance:any,messageCallID:string,responseData:string) => {
    const requestMessage = new Message(getName(MessageEnum.RestAPIResponceMessage));
    requestMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), requestMessage.messageId);
    instance[messageCallID] = requestMessage.messageId;
    requestMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), JSON.parse(responseData));
    runEngine.sendMessage("Unit Test", requestMessage);
}
let mockRunEngineApiCall:Object;
defineFeature(feature, (test) => {
    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS')
        .mockImplementationOnce(()=> "ios")
        .mockImplementation(() => 'web');
        mockRunEngineApiCall  = jest.spyOn(runEngine, 'sendMessage')
    });

    test('User navigates to AutomaticCheckoutCalculation', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: AutomaticCheckoutCalculation;
        let render_item: ShallowWrapper;

        given('I am a User loading AutomaticCheckoutCalculation', () => {
            shallow(<AutomaticCheckoutCalculation {...screenProps} />);
            exampleBlockA = shallow(<AutomaticCheckoutCalculation {...screenProps} />);
        });

        when('I navigate to the AutomaticCheckoutCalculation', () => {
            instance = exampleBlockA.instance() as AutomaticCheckoutCalculation
            mockAPIAutomaticCheckoutCalculation(instance,"getDiscountPriceCallId",JSON.stringify(responseJson))
            mockAPIAutomaticCheckoutCalculation(instance,"getShippingPriceCallId",JSON.stringify(responseJson))
            mockAPIAutomaticCheckoutCalculation(instance,"getTaxPriceCallId",JSON.stringify(responseJson))
        });

        when('I can render the flatlist and click on minus button for 1 item', () => {
                let minusbuttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'flatlist1');
                render_item = minusbuttonComponent.renderProp("renderItem")({ item: mockItem,index:0 })
                minusbuttonComponent.props().keyExtractor(mockItem, 0)
                const minusBtn = render_item.findWhere((node) => node.prop('testID') === 'minusIcon');
                minusBtn.simulate('press')
        });
        then("I can see quantity is decresing",()=>{
            const quantityText = render_item.findWhere(node=>node.prop("testID")==="quantityText")
            expect(quantityText.props().children).toBe(2)
        })
        when('I click on Increase  btn Icon',()=>{
            const  plusBtn = render_item.findWhere((node) => node.prop('testID') === 'plusIcon');
            plusBtn.simulate('press')
        })
        then("I can see quantity is increasing",()=>{
            const quantityText = render_item.findWhere(node=>node.prop("testID")==="quantityText")
            expect(quantityText.props().children).toBe(2)
        })
        when("I came again on the AutomaticCheckoutCalculation page",()=>{
            mockAPIAutomaticCheckoutCalculation(instance,"getDiscountPriceCallId",JSON.stringify(responseJson1))
            mockAPIAutomaticCheckoutCalculation(instance,"getShippingPriceCallId",JSON.stringify(responseJson1))
            mockAPIAutomaticCheckoutCalculation(instance,"getTaxPriceCallId",JSON.stringify(responseJson1))
        })
        then("I can see network api calling",()=>{
            expect(mockRunEngineApiCall).toBeCalledTimes(12)
        })
    });


});
