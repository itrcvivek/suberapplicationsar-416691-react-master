import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import RefundManagement from "../../src/RefundManagement.web"
import { execPath } from "process"
const navigation = require("react-navigation")

const screenProps = {
  navigation: navigation,
  id: "RefundManagement"
}

const dummyData = [{
  "id": "27",
  "type": "order",
  "attributes": {
    "customer_name": "Shalini",
    "order_id": "656",
    "amount_paid": 5000,
    "remaining_balance": 4535,
    "transaction_id": "8ac7a4a1886a981201886c95854812b1",
    "transaction_status": "success",
    "orders_status": "success",
    "request_refund": "no",
    "reason_of_refund": null,
    "created_at": "2023-05-30T16:14:57.039+04:00",
    "updated_at": "2023-05-31T09:44:46.502+04:00"
  }
}]

const dummyData1 = [{
  "id": "27",
  "type": "order",
  "attributes": {
    "customer_name": "Shalini",
    "order_id": "656",
    "amount_paid": 5000,
    "remaining_balance": 0,
    "transaction_id": "8ac7a4a1886a981201886c95854812b1",
    "transaction_status": "success",
    "orders_status": "completed",
    "request_refund": "no",
    "reason_of_refund": null,
    "created_at": "2023-05-30T16:14:57.039+04:00",
    "updated_at": "2023-05-31T09:44:46.502+04:00"
  }
}]

const refundAPiData = {
  "id": "8ac7a4a1886fbf6c018871e528a731de",
  "referencedId": "8ac7a4a2886fc760018871747a48417a",
  "paymentType": "RF",
  "amount": "4.00",
  "currency": "SAR",
  "descriptor": "0972.1597.9794 Digital Stream",
  "result": {
    "code": "000.100.110",
    "description": "Request successfully processed in 'Merchant in Integrator Test Mode'"
  },
  "resultDetails": {
    "ExtendedDescription": "Successfully processed",
    "ProcStatus": "0",
    "clearingInstituteName": "SAIB MPGS",
    "AuthCode": "f2e7a815c3",
    "ConnectorTxID1": "8ac7a4a1886fbf6c018871e528a731de",
    "ConnectorTxID3": "6fbf6c018871e528a731de",
    "ConnectorTxID2": "8ac7a4a1",
    "AcquirerResponse": "00",
    "EXTERNAL_SYSTEM_LINK": "https://csi-test.retaildecisions.com/RS60/TransDetail.aspx?oid=000194001101S2E20110926045038668&support=Link+to+Risk+Details",
    "OrderID": "8316384413",
    "TermID": "71F00820"
  },
  "buildNumber": "c5267340b700cbe2d940acc8206d23a186f105d7@2023-05-29 07:37:33 +0000",
  "timestamp": "2023-05-31 13:00:23+0000",
  "ndc": "8ac7a4ca81214cbe0181239c3ff010b6_4735d496d0f84eefa90916dd893de63f"
}

const mockAPICall = (instance: any, apiCallID: string, apiData: any) => {
  const msgSucessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
  msgSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgSucessRestAPI.messageId);
  msgSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), apiData);
  instance[apiCallID] = msgSucessRestAPI.messageId
  runEngine.sendMessage("Unit Test", msgSucessRestAPI)
  return instance[apiCallID];
}


const feature = loadFeature('./__tests__/features/RefundManagement-scenario.web.feature');

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test('User navigates to RefundManagement', ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: RefundManagement;

    given("I am a User loading RefundManagement", () => {
      exampleBlockA = shallow(<RefundManagement {...screenProps} />);
      instance = exampleBlockA.instance() as RefundManagement;
    });
    when("list of Orders Api network request is called", () => {
      mockAPICall(instance, "listofOrdersApiCallID", dummyData);
    });
    then('list of Orders will set', () => {
      expect(instance.listofOrdersApiCallID).toBeDefined();
    });
    when("table body", () => {
      let buttonComponent = exampleBlockA.findWhere(
        node => node.prop("data-testId") === "tableBody"
      );
      expect(buttonComponent).toBeTruthy();
    })
    then('check submit for api call', () => {
      const technicianList = new Message(getName(MessageEnum.RestAPIResponceMessage));
      technicianList.addData(getName(MessageEnum.RestAPIResponceDataMessage), technicianList.messageId);
      technicianList.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        "data": [{
          "id": "27",
          "type": "order",
          "attributes": {
            "customer_name": "Shalini",
            "order_id": "656",
            "amount_paid": 5000,
            "remaining_balance": 4535,
            "transaction_id": "8ac7a4a1886a981201886c95854812b1",
            "transaction_status": "success",
            "orders_status": "success",
            "request_refund": "no",
            "reason_of_refund": null,
            "created_at": "2023-05-30T16:14:57.039+04:00",
            "updated_at": "2023-05-31T09:44:46.502+04:00"
          }
        }]
      });
      instance.listofOrdersApiCallID = technicianList.messageId;
      runEngine.sendMessage("Unit Test", technicianList);
      expect(instance.listofOrdersApiCallID).toBeDefined();
    });
    when("I can select the refund button with out errors", () => {
      let buttonComponent = exampleBlockA.findWhere(
        node => node.prop("data-testId") === "buttonRefund0"
      );

      buttonComponent.simulate("click");
      expect(instance.state.acceptButon).toBe(true);
    });
    then("all data refund", () => {
      let buttonComponent = exampleBlockA.findWhere(
        node => node.prop("data-testId") === "RefundSuccess"
      );
      expect(buttonComponent).toBeTruthy()
    })
    then("Expected value of changed field", () => {
      expect(instance).toBeDefined()
    });
    then("Refund Modal", () => {
      let textInputComponent = exampleBlockA.findWhere(
        (node) => node.prop("data-testId") === "modalForRefund",
      );
      expect(textInputComponent).toBeTruthy();
    })
    when("I can enter a refund amount", () => {
      let textInputComponent = exampleBlockA.findWhere(
        (node) => node.prop("data-testId") === "txtInput",
      );
      const event = { target: { value: 10 } };
      textInputComponent.simulate("change", event);
    });
    then("Expected value of changed refund amount field", () => {
      expect(instance.state.amount).toBe("10")
    });
    when("I can select the yes button with out errors", () => {
      let buttonComponent = exampleBlockA.findWhere(
        node => node.prop("data-testId") === "btnYes"
      );
      buttonComponent.simulate("click");
    });

    when("I can select the No button with out errors", () => {
      let buttonComponent = exampleBlockA.findWhere(
        node => node.prop("data-testId") === "btnNo"
      );
      buttonComponent.simulate("click");
      expect(buttonComponent).toBeTruthy()
    });
    then("refund amount", () => {
      let buttonComponent = exampleBlockA.findWhere(
        node => node.prop("data-testId") === "remainingAmount"
      );
      expect(buttonComponent).toBeDefined()
    });

    when("I can select the yes button with out errors", () => {


      const requestMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        requestMessage.messageId
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.parse(JSON.stringify({
          result: {
            description: 'Request successfully processed in \'Merchant in Integrator Test Mode\''
          }
        }))
      );
      instance.RefundApiCallID = requestMessage.messageId;
      runEngine.sendMessage("Unit Test", requestMessage);

    });

    then("Expected value of changed field", () => {
      expect(instance.RefundApiCallID).toBeDefined()
    });
  });
})