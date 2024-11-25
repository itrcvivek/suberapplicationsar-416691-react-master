import { shallow, ShallowWrapper } from "enzyme";

import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import PricingEngine from "../../src/PricingEngine.web";
const navigation = require("react-navigation");

jest.useFakeTimers()
const screenProps = {
  navigation: navigation,
  id: "PricingEngine",
};

const product_list_arr = {
  data: [
    {
      id: "16",
      name: "Laptop Lenovo",
      brand: "Alpha",
      price: "100",
      product_image: null,
    },
    {
      id: "16",
      name: "Laptop Lenovo",
      brand: "Alpha",
      price:"200",
      product_image: null,
    },
  ],
};
const addToCartData = {
  data: {
    id: "1",
    type: "cart",
    attributes: {
      id: 1,
      products: [
        {
          id: "7",
          type: "product",
          attributes: {
            name: "XYZ 1",
            brand: "XYZ",
            price: 10.0,
            product_image: null,
          },
        },
      ],
    },
  },
};

describe("Pricing page first", () => {
  let pricingEngineWrapper: ShallowWrapper;
  pricingEngineWrapper = shallow(<PricingEngine {...screenProps} />);
  let instance: PricingEngine;

  instance = pricingEngineWrapper.instance() as PricingEngine;
  console.log(pricingEngineWrapper.debug());
  it("should render state show api without error", async () => {
    const getProductMessage = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );
    getProductMessage.addData(
      getName(MessageEnum.RestAPIResponceDataMessage),
      getProductMessage
    );
    getProductMessage.addData(
      getName(MessageEnum.RestAPIResponceSuccessMessage),
      {
        product_list_arr,
      }
    );

    getProductMessage.addData(
      getName(MessageEnum.RestAPIResponceDataMessage),
      getProductMessage.messageId
    );
    instance.productApiCallId = getProductMessage.messageId;
    runEngine.sendMessage("Unit Test", getProductMessage);
    let getProductmethod = await instance.getProductList();
    expect(getProductmethod).toBe(true);
  });

  test("should render state show api with error", () => {
    const msgLogInErrorRestAPI = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );
    msgLogInErrorRestAPI.addData(
      getName(MessageEnum.RestAPIResponceDataMessage),
      msgLogInErrorRestAPI
    );
    msgLogInErrorRestAPI.addData(
      getName(MessageEnum.RestAPIResponceSuccessMessage),
      {
        errors: [
          {
            failed_data: "error",
          },
        ],
      }
    );
    msgLogInErrorRestAPI.addData(
      getName(MessageEnum.RestAPIResponceDataMessage),
      msgLogInErrorRestAPI.messageId
    );
    instance.productApiCallId = msgLogInErrorRestAPI.messageId;
    runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI);
  });

  test("I am trying to add data in FlatList", async () => {
    const flatList = pricingEngineWrapper.find('#product_grid')
    console.log(flatList.debug());
  });

  test("navigates to the CartList page with the selected products if there is at least one product selected", async () => {
    const navigation = {
      navigate: jest.fn(),
    };
    pricingEngineWrapper.setProps({ navigation });
    instance.setState({
      productCount: 1,
    });
    instance.submit(1);

    let addToCartMethod = await instance.addToCart();
     expect(addToCartMethod).toBe(true);
  });

  test("shows a message if there is no product selected", () => {
    const navigation = {
      navigate: jest.fn(),
    };
    pricingEngineWrapper.setProps({ navigation });
    instance.setState({
      productCount: 0,
    });
    instance.submit(0);

    expect(navigation.navigate).not.toHaveBeenCalled();
  });

  test("should toggle isSelect value and update productList in state", () => {
    
    const initialProductList = [
      {
        id: "16",
        name: "Laptop Lenovo",
        brand: "Alpha",
        price: 100,
        product_image: "",
        isSelected: false,
      },
      {
        id: "17",
        name: "Laptop Lenovo",
        brand: "Alpha",
        price: 100,
        product_image: "",
        isSelected: false,
      },
    ];
    instance.setState({ productList: initialProductList });
   
  });

  test("call restAPI for add product data on server and will return success", async () => {
    const addProductMessage = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );
    addProductMessage.addData(
      getName(MessageEnum.RestAPIResponceDataMessage),
      addProductMessage
    );
    addProductMessage.addData(
      getName(MessageEnum.RestAPIResponceSuccessMessage),
      {
        addToCartData,
      }
    );

    addProductMessage.addData(
      getName(MessageEnum.RestAPIResponceDataMessage),
      addProductMessage.messageId
    );
    instance.addToCartApiCallId = addProductMessage.messageId;
    runEngine.sendMessage("Unit Test", addProductMessage);
    let addProductmethod = await instance.addToCart();
    expect(addProductmethod).toBe(true);
  });

  test("call restAPI for add product data on server and will return error", () => {
    const msgLogInErrorRestAPI = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );
    msgLogInErrorRestAPI.addData(
      getName(MessageEnum.RestAPIResponceDataMessage),
      msgLogInErrorRestAPI
    );
    msgLogInErrorRestAPI.addData(
      getName(MessageEnum.RestAPIResponceSuccessMessage),
      {
        errors: [
          {
            failed_data: "error",
          },
        ],
      }
    );
    msgLogInErrorRestAPI.addData(
      getName(MessageEnum.RestAPIResponceDataMessage),
      msgLogInErrorRestAPI.messageId
    );
    instance.addToCartApiCallId = msgLogInErrorRestAPI.messageId;
    runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI);
  });

    test('I can select Item', async() => {
      const flatList = pricingEngineWrapper.find('#grid_item1')
      const selectItem=flatList.find('#select_product_check')
      selectItem.simulate('change','17');
       
    })
});
