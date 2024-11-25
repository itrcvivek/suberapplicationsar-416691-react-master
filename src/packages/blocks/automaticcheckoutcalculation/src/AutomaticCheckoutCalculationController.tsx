import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
// Customizable Area Start
import { Trending } from "./assets";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  // Customizable Area Start
  productList: ({ id: number, productName: string, quantity: number, Price: number, mainPrice: number, Image: string })[];
  total: number;
  discount: number;
  taxes: number;
  shippingCost: number;
  DiscountCostType: string
  ShippingCostType: string
  TaxCostType: string
  qtyData:number
  qtyData1:number
  // Customizable Area End
}

interface SS {
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

export default class AutomaticCheckoutCalculationController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getDiscountPriceCallId: string = "";
  getShippingPriceCallId: string = "";
  getTaxPriceCallId: string = ""
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
   
    // Customizable Area End
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area Start
      // Customizable Area End
    ];


    this.state = {
      txtInputValue: "",
      txtSavedValue: "",
      enableField: false,
      // Customizable Area Start
      productList: [
        { id: 1, productName: "Samsung Watch 4", quantity: 1, Price: 600, mainPrice: 600, Image: Trending },
        { id: 2, productName: "American Tourister", quantity: 1, Price: 100, mainPrice: 100, Image: Trending },
        { id: 3, productName: "AdidasBasketballShoes", quantity: 1, Price: 400, mainPrice: 400, Image: Trending },
      ],
      total: 0,
      discount: 0,
      taxes: 0,
      shippingCost: 0,
      DiscountCostType: "",
      ShippingCostType: "",
      TaxCostType: "",
      qtyData:1,
      qtyData1:0
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
   
    // Customizable Area End
  }

  async receive(from: string, message: Message) {

    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (apiRequestCallId === this.getDiscountPriceCallId) {
        this.setState({ discount: responseJson.Discount })
        this.setState({ DiscountCostType: responseJson["Cost Type"] })
      }

      if (apiRequestCallId === this.getShippingPriceCallId) {
        this.setState({ shippingCost: responseJson["Shipping Charges"] })
        this.setState({ ShippingCostType: responseJson["Cost Type"] })

      }
      if (apiRequestCallId === this.getTaxPriceCallId) {
        this.setState({ taxes: responseJson["Tax Charges"] })
        this.setState({ TaxCostType: responseJson["Cost Type"] })

      }
    }
    // Customizable Area End
  }

  async componentDidMount(): Promise<void> {
    this.getdiscountPrice()
    this.getShippingPrice()
    this.getTaxPrice()

  }


  decreaseQuantity = (index: number) => {
    const productList = this.state.productList.map((item)=>{
      if(item.id === index){
        item.quantity  -=1;
        item.Price -= item.mainPrice
      }
      return  item
    });    
    this.setState({ productList ,qtyData:productList.find((item)=>item.id===index)?.quantity ?? 1})
  }

  increaseQuantity = (index: number) => {
    const productList = this.state.productList.map((item)=>{
      if(item.id === index){
        item.quantity  +=1
        item.Price += item.mainPrice
      }
      return  item
    });  
    this.setState({ productList ,qtyData:productList.find((item)=>item.id===index)?.quantity ?? 1})
  }

  totalPrice = () => {
    let total = this.state.total
    let productList = this.state.productList;
    productList.map((item) => {
      total = total + (item.Price)
    })
    return total
  }
  discountPrice = () => {
    let discount = this.state.discount
    let cost_type = this.state.DiscountCostType
    let discountPrice = cost_type == "percent" ? (discount / 100) * this.totalPrice() : this.state.discount
    return discountPrice
  }

  ShippingCost = () => {
    let shipping = this.state.shippingCost
    let cost_type = this.state.ShippingCostType
    let shippingPrice = cost_type == "percent" ? (shipping / 100) * this.totalPrice() : shipping
    return shippingPrice
  }
  taxPrice = () => {
    let taxes = this.state.taxes
    let cost_type = this.state.TaxCostType
    let taxPrice = cost_type == "percent" ? (taxes / 100) * this.totalPrice() : taxes
    return taxPrice
  }

  totalAmount = () => {
    return this.totalPrice() - this.discountPrice() + this.ShippingCost() + this.taxPrice()
  }

  // web events


  // Customizable Area Start
  async getdiscountPrice() {
    const header = {
      "Content-Type": "application/json",
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getDiscountPriceCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.discountPrice + this.totalPrice()
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.discountPriceMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  async getShippingPrice() {
    const header = {
      "Content-Type": "application/json",
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getShippingPriceCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.shippingPrice + this.totalPrice()
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.shippingPriceMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  async getTaxPrice() {
    const header = {
      "Content-Type": "application/json",
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getTaxPriceCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.taxPrice + this.totalPrice()
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.taxPriceMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }
  _keyExtractor = (item: { id: number | string }) => String(item.id)
  // Customizable Area End
}
