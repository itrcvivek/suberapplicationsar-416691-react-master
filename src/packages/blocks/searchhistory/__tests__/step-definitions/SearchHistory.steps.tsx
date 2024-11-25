import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import { beforeEach, expect, jest } from "@jest/globals";
import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import SearchHistory from "../../src/SearchHistory";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    hideKeyboard: jest.fn(),
  },
  id: "SearchHistory",
};
const apiData = [
  {
    attributes: {
      id: 127,
      link: "",
      name: "Teyeye",
    },
    id: "127",
    type: "search_history",
  },
  {
    attributes: {
      id: 126,
      link: "",
      name: "dfdsds",
    },
    id: "126",
    type: "search_history",
  }
];
const updateList = [
  {
    attributes: {
      id: 127,
      link: "",
      name: "Teyeye",
    },
    id: "127",
    type: "search_history",
  },
  {
    attributes: {
      id: 126,
      link: "",
      name: "dfdsds",
    },
    id: "126",
    type: "search_history",
  },
  {
    attributes: {
      id: 128,
      link: "",
      name: "dfffd",
    },
    id: "128",
    type: "search_history",
  }
]
const postApiData = {
  data: {
    attributes: { id: 128, link: "", name: "dfffd" },
    id: "128",
    type: "search_history",
  },
};
const deleteApiData = {
  message	: "Your History delete successfully"
};


const feature = loadFeature(
  "./__tests__/features/SearchHistory-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });
  test("User navigates to SearchHistory", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: SearchHistory;

    given("I am a User loading SearchHistory", () => {
      exampleBlockA = shallow(<SearchHistory {...screenProps} />);
      instance = exampleBlockA.instance() as SearchHistory;
      const SearchHistoryListAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      SearchHistoryListAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        SearchHistoryListAPI
      );
      SearchHistoryListAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: apiData,
        }
      );
      instance.apiCallIdSearchHistoryListGet = SearchHistoryListAPI;
      runEngine.sendMessage("Unit Test", SearchHistoryListAPI);
    });

    then("I can see recent search list", () => {
      let urlListCompp = exampleBlockA.findWhere((node) => node.prop('testID') === 'searchList');
      expect(urlListCompp).toHaveLength(2)
    })

    when("I enter any text and submit button", () => {
      let textInputComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "txtInput"
      );
      textInputComponent.simulate("change", 'Hello');
      const postSearchTextApi = new Message(getName(MessageEnum.RestAPIResponceMessage));
      postSearchTextApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        postSearchTextApi
      );
      postSearchTextApi.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        data: postApiData,
      });
      instance.apiCallIdSearchHistoryList = postSearchTextApi;
      runEngine.sendMessage("Unit Test", postSearchTextApi);
    })

    then("I should see updated list", () => {
      let prodListCompp = exampleBlockA.findWhere((node) => node.prop('testID') === 'searchList');
      expect(prodListCompp.length).toEqual(2)
    })
    
    when("I click delete search list button", () => {
      const DeleteHistoryPostAPI = new Message(getName(MessageEnum.RestAPIResponceMessage));
      DeleteHistoryPostAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        DeleteHistoryPostAPI
      );
      DeleteHistoryPostAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        data: deleteApiData,
      });
      instance.apiCallIdDeleteSearchId = DeleteHistoryPostAPI;
      runEngine.sendMessage("Unit Test", DeleteHistoryPostAPI);
    })

    then("I should see updated recent list", () => {
      let prodListCompp = exampleBlockA.findWhere((node) => node.prop('testID') === 'searchList');
      expect(prodListCompp.length).toEqual(2)
    })

  });

});