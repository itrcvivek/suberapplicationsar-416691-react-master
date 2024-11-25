import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
// Customizable Area End

export const configJSON = require("./config");
export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

// Customizable Area Start
export interface IProductItem {
  id: string;
  name: string;
  price: number;
  brand: string;
  product_image: string;
  isSelected?: boolean;
}

export interface IProductResponseAttributes
{
    name:string,
    brand:string,
    price:string,
    product_image:string
}
export interface IProductItemResponse
{
    id:string,
    type:string,
    attributes:IProductResponseAttributes
}
// Customizable Area End

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  // Customizable Area Start
  productList: IProductItem[];
  productCount: number;
  loading:boolean
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class PricingEngineController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  productApiCallId: string | null = null;
  addToCartApiCallId: string | null= null;
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
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      // Customizable Area Start
      productCount: 0,
      productList: [],
      loading:false

      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Recived", message);
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
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
        if (apiRequestCallId === this.productApiCallId) {
          if (!responseJson.errors) {
            let responseData = responseJson.data
            let productData:IProductItem[] = []
            responseData.map((item:IProductItemResponse)=>{
              productData.push({
                      id: item.id,
                      name: item.attributes.name,
                      price: Number(item.attributes.price),
                      brand: item.attributes.brand,
                      product_image: item.attributes.product_image,
                      isSelected: false,
                    })
            })
            
            this.setState({
              productList:productData,
              loading:false,
              productCount:0
            })
            
          } else {
            this.setState({loading:false})
            this.showAlert(configJSON.errorTitle, responseJson.errors[0].token);
          }
        } else if (apiRequestCallId === this.addToCartApiCallId) {
          if (!responseJson.errors) {
            this.showAlert(configJSON.success, configJSON.productAdded);
            this.props.navigation.navigate("CartList");
            return false;
          } else {
            this.showAlert(configJSON.errorTitle, responseJson.errors[0]);
          }
        }
        else{
          this.parseApiCatchErrorResponse(errorReponse)
        }
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    super.componentDidMount();
    this.getProductList();
   
  }
  getToken = () => {
    let token = 'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MzYxLCJleHAiOjE2ODA1OTc3MzEsInRva2VuX3R5cGUiOiJsb2dpbiJ9.cC6guKYFlg_4P6bSO53PXjPpt998dYXE3hXUM_QnE8VKMfyx4CcvXhk_gpL1mzfPHNpmcHsFUHi2_h-srE8bHw'
    return token;
  }
  getProductList = async () => {
    let token: string | null = this.getToken();
    this.setState({loading:true})
    const header = {
      "Content-Type": configJSON.apiContentType,
      token: token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.productApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.productApiEndPoint
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

  selectItem = (productItem:IProductItem) => {
    productItem.isSelected = !productItem.isSelected;

    const itemIndex = this.state.productList.findIndex(
      (item) => productItem.id === item.id
    );
    let selectedList=this.state.productList
    selectedList[itemIndex]= productItem

    const productCount=selectedList.filter((item:IProductItem)=>item.isSelected===true).length
    this.setState({
      productList: selectedList,
      productCount:productCount
    });
  };

  addToCart = async () => {
    let token: string|null = this.getToken();
    
    const selectedProduct = this.state.productList
      .filter((item) => item.isSelected)
      .map(function (item) {
        return item.id;
      });

    const header = {
      "Content-Type": configJSON.apiContentType,
      token: token,
    };
    const httpBody = {
      product_ids: selectedProduct,
    };

   
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.addToCartApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.addToCartApiEndPoint}`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.postAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  };

  submit = async (selectItemCount: number) => {
    this.setState({
      productCount: selectItemCount,
    });
    if (selectItemCount != 0) {
      this.addToCart();
    } else {
      this.showAlert(configJSON.errorTitle, configJSON.productAlert);
    }
  };
  // Customizable Area End
}
