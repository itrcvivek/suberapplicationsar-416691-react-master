import { shallow, ShallowWrapper } from "enzyme";

import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import { render} from "@testing-library/react-native";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import PricingEngine from "../../src/PricingEngine";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

const product_list_item_arr = [
  {
    id: "16",
    name: "Laptop Lenovo",
    brand: "Alpha",
    price: 100,
    product_image: null,
  },
  {
    id: "16",
    name: "Laptop Lenovo",
    brand: "Alpha",
    price: 100,
    product_image: null,
  },
];

let PricingEngineData = <PricingEngine {...screenProps} />;

describe("Pricing page first", () => {
  let pricingEngineWrapper: ShallowWrapper;
  pricingEngineWrapper = shallow(<PricingEngine {...screenProps} />);
  let instance: PricingEngine;

  instance = pricingEngineWrapper.instance() as PricingEngine;

  it("should render state show api without error", async () => {
    await AsyncStorage.setItem("token",JSON.stringify("someTOken"))
    const rendered = render(PricingEngineData);
    expect(rendered).toBeTruthy();
    const getProductMessage = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );
    getProductMessage.addData(
      getName(MessageEnum.RestAPIResponceDataMessage),
      getProductMessage
    );
    getProductMessage.addData(
      getName(MessageEnum.RestAPIResponceSuccessMessage),
        product_list_arr
      
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
    const flatList = pricingEngineWrapper.findWhere(
      (node) => node.prop("testID") === "FlatList"
    );
    flatList.simulate("data", product_list_item_arr);
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
    const data = {
      item: {
        id: "16",
        name: "Laptop Lenovo",
        brand: "Alpha",
        price: "0.0",
        product_image: null,
        isSelected: true,
      },
    };
    const initialProductList = [
      {
        id: "16",
        name: "Laptop Lenovo",
        brand: "Alpha",
        price: 100,
        product_image: "",
        isSelected: true,
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

   test('I am trying to add data in FlatList', async () => {
        const flatList = pricingEngineWrapper.findWhere(
          (node) => node.prop("testID") === "FlatList")          
      
        const keyExtractor = flatList.props()
             .keyExtractor({id: 3});
        expect(keyExtractor).toEqual('3')
        await flatList.props().refreshControl.props.onRefresh()
        expect(flatList.props().refreshControl.props.refreshing).toBe(false)
      });

    test('I can select Item and add to Cart', async() => {
      const flatList = pricingEngineWrapper.findWhere(
        (node) => node.prop("testID") === "FlatList")          
      const renderItem=flatList.renderProp("renderItem")({item:instance.state.productList[0],index:0})

      const selectItem=renderItem.findWhere(
        (node) => node.prop("testID") === "btn_productSelect") 
      
       selectItem.simulate("press")
       pricingEngineWrapper.update()       
       const addToCart = pricingEngineWrapper.findWhere(
        (node) => node.prop("testID") === "btn_AddToCart")
        
       addToCart.simulate("press")
    })
});
