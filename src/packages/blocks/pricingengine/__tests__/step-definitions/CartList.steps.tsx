import { render, fireEvent } from '@testing-library/react-native';
import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import { Message } from "../../../../framework/src/Message";
import { runEngine } from "../../../../framework/src/RunEngine";
import MessageEnum, {
    getName,
  } from "../../../../framework/src/Messages/MessageEnum";
import CartList from "../../src/CartList"
import AsyncStorage from '@react-native-async-storage/async-storage';


jest.useFakeTimers()
const screenProps = {
    navigation: {
        navigate: jest.fn(),
        setParams: {
            cartList: [],
        }
    },
    id: "CartList"
}
const erroResponse={
  errors:[{
    error:"server error 500"
  }]
}

const cart_list_arr={
  "data": {
      "id": "1",
      "type": "cart",
      "attributes": {
          "id": 1,
          "products": [
              {
                  "id": "4",
                  "type": "product",
                  "attributes": {
                      "name": "Kosko Running Shoes For Men  (Khaki)",
                      "brand": "Puma",
                      "price": "200.0",
                      "product_image": "https://onaqlcomex-230960-ruby.b230960.dev.eastus.az.svc.builder.cafe//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBa1lCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--33b896cf41f0988a1194e3c216d97651ed8fd55f/1676460614"
                  }
              },
              {
                  "id": "5",
                  "type": "product",
                  "attributes": {
                      "name": "unisex running shoes",
                      "brand": "Asics",
                      "price": "9000.0",
                      "product_image": "https://onaqlcomex-230960-ruby.b230960.dev.eastus.az.svc.builder.cafe//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBa2NCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--46cfd5fea9284d290b81f0fa599aeceecb0a99dc/1676460680"
                  }
              },
              {
                  "id": "6",
                  "type": "product",
                  "attributes": {
                      "name": "Adidas Running shoes",
                      "brand": "Adidas",
                      "price": "2450.0",
                      "product_image": "https://onaqlcomex-230960-ruby.b230960.dev.eastus.az.svc.builder.cafe//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBa2dCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--98d83fd7b63b592b0ecef920497542b92425cd89/1676460716"
                  }
              },
              {
                  "id": "7",
                  "type": "product",
                  "attributes": {
                      "name": "Nike running shoes",
                      "brand": "Adidas",
                      "price": "1500.0",
                      "product_image": "https://onaqlcomex-230960-ruby.b230960.dev.eastus.az.svc.builder.cafe//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBa2tCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--ec447e1ae8d37f861961a7b9e68aaa77ab43f4ea/1676460787"
                  }
              }
          ]
      }
  }
}

let CartListPageData = <CartList {...screenProps} />

describe('CartList page first', () => {
    let CartListEngineWrapper: ShallowWrapper;
    CartListEngineWrapper = shallow(<CartList {...screenProps} />)
    let instance: CartList;
  
    instance = CartListEngineWrapper.instance() as CartList

    it('should render carlist screen without crashing', async () => {
        const rendered = render(CartListPageData);
        expect(rendered).toBeTruthy();
        const methodGetCart = await instance.getCartList()
        expect(methodGetCart).toBe(true)
    })

    test("should render state show api with out error",async ()=>{

      await AsyncStorage.setItem("token",JSON.stringify("someTOken"))

      const cartProductApi = new Message(getName(MessageEnum.RestAPIResponceMessage))
      cartProductApi.addData(getName(MessageEnum.RestAPIResponceDataMessage), cartProductApi);
      cartProductApi.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
      cart_list_arr
     );
        cartProductApi.addData(getName(MessageEnum.RestAPIResponceDataMessage), cartProductApi.messageId);
        instance.cartProductApiCallId = cartProductApi.messageId
        runEngine.sendMessage("Unit Test", cartProductApi);
        let getCartMethod = await instance.getCartList();
        expect(getCartMethod).toBe(true)
    })

    test("should render state show api with error", async() => {
        const cartProductApi = new Message(getName(MessageEnum.RestAPIResponceMessage))
        cartProductApi.addData(getName(MessageEnum.RestAPIResponceDataMessage), cartProductApi);
        cartProductApi.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
          {
            "errors": [
              {
                "failed_data": "error"
              }
            ]
          });
          cartProductApi.addData(getName(MessageEnum.RestAPIResponceDataMessage), cartProductApi.messageId);
          instance.cartProductApiCallId = cartProductApi.messageId
          
          runEngine.sendMessage("Unit Test", cartProductApi);
          let getCartMethod = await instance.getCartList();
          expect(getCartMethod).toBe(true)
      })

      test('I am trying to add data in FlatList', async () => {
        const flatList = CartListEngineWrapper.findWhere(
          (node) => node.prop("testID") === "FlatList")
          
        const renderItem=flatList.renderProp("renderItem")({item:cart_list_arr.data.attributes.products[0],index:0})
        expect(renderItem).toBeTruthy()

        const keyExtractor = flatList.props()
             .keyExtractor({id: 3});
         expect(keyExtractor).toEqual('3')

         console.log(flatList.debug())
         flatList.props().ItemSeparatorComponent()
     });

     test("It can handle the server side error also",async()=>{
        const cartProductApiError = new Message(getName(MessageEnum.RestAPIResponceMessage))
        cartProductApiError.addData(getName(MessageEnum.RestAPIResponceDataMessage), cartProductApiError);
        cartProductApiError.addData(getName(MessageEnum.RestAPIResponceErrorMessage),
        erroResponse  
        );
        cartProductApiError.addData(getName(MessageEnum.RestAPIResponceDataMessage), cartProductApiError.messageId);
        instance.cartProductApiCallId = cartProductApiError.messageId
        
        runEngine.sendMessage("Unit Test", cartProductApiError);
        let getCartMethod = await instance.getCartList();
        expect(getCartMethod).toBe(true) 
     })



})