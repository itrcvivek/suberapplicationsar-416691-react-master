import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
export interface ICartItem {
  id: string;
  name: string;
  price: number;
  brand: string;
  product_image: string;
}
export interface ICartItemResponseAttributes
{
    name:string,
    brand:string,
    price:string,
    product_image:string
}
export interface ICartItemResponse
{
    id:string,
    type:string,
    attributes:ICartItemResponseAttributes
}
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  cartList: ICartItem[];
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class CartListController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  cartProductApiCallId: string | null = null;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

   
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      cartList: []

      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    // Customizable Area Start
    const apiRequestCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );
    const responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );
    
    const errorReponse = message.getData(
      getName(MessageEnum.RestAPIResponceErrorMessage)
    );

    if (apiRequestCallId && responseJson) {
      if (apiRequestCallId === this.cartProductApiCallId) {
        if (!responseJson.errors) {
          const productResponse=responseJson.data
          const cartItems=productResponse.attributes.products
         
          let cartItemData:ICartItem[]=[]
          cartItems.map((item:ICartItemResponse)=>{
            cartItemData.push({
                id:item.id,
                brand:item.attributes.brand,
                name:item.attributes.name,
                price:Number(item.attributes.price),
                product_image:item.attributes.product_image
              })
          })  
          
          this.setState({
            cartList:cartItemData
          })
          
          return false;
        } else  {
          this.showAlert(
            configJSON.errorTitle,
            responseJson.errors[0]
          );
        }
      }
    }
    else
    {
      this.parseApiCatchErrorResponse(errorReponse)  
    }
  
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    super.componentDidMount();
    this.getCartList();
  }

  getToken = () => {
    let token = 'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MzQ3LCJleHAiOjE2Nzg1MzM2OTAsInRva2VuX3R5cGUiOiJsb2dpbiJ9.y5_KF3YNlTtlyN65EsqcbQX3mhmGjKjKutC0kPXKdhQeiQ1SCuDY0_caBpD34WpNQoIyrGDghNiAE7I1VIesFA'
    return token;
  }
  getCartList = async () => {
    let token: string|null = this.getToken();

    const header = {
      "Content-Type": configJSON.apiContentType,
      token: token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.cartProductApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.cartListApiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.productApiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  };

  // Customizable Area End
}
