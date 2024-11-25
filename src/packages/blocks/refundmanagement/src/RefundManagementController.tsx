import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
const HYPER_PAY_ACCESS_TOKEN = "OGFjN2E0Y2E4MTIxNGNiZTAxODEyMzkxNjU1NzEwOGV8YTNtZUZDZTY4dA==";
const entityId = "8ac7a4ca81214cbe0181239c3ff010b6";

interface ApiData {
  contentType?: string,
  method?: string,
  endPoint?: string,
  body?: {},
  type?: string,
}


export interface ResponseData {
  dataName: [];
  id?: number,
  name?: string
}

export interface Attributes {
  customer_name: string
  order_id: number
  amount_paid: number
  remaining_balance: number
  transaction_id: string
  transaction_status: string
  orders_status: string
  request_refund: string
  reason_of_refund: null
  created_at: string
  updated_at: string
}

export interface Root {
  data: Root[],
  id: string,
  type: string,
  attributes: Attributes
}

export interface RefundData {
  data: [];
  id: number,
  type: string,
  attributes: {
    customer_name: string,
    order_id: number,
    amount_paid: number,
    remaining_balance: number,
    transaction_id: string,
    transaction_status: string,
    orders_status: string,
    request_refund: string,
    reason_of_refund: null,
    created_at: "",
    updated_at: ""
  }
}

export interface Roots {
  id: string
  referencedId: string
  paymentType: string
  amount: string
  currency: string
  descriptor: string
  result: Result
  resultDetails: ResultDetails
  buildNumber: string
  timestamp: string
  ndc: string
}

export interface Result {
  code: string
  description: string
}

export interface ResultDetails {
  ExtendedDescription: string
  ProcStatus: string
  clearingInstituteName: string
  AuthCode: string
  ConnectorTxID1: string
  ConnectorTxID3: string
  ConnectorTxID2: string
  AcquirerResponse: string
  EXTERNAL_SYSTEM_LINK: string
  OrderID: string
  TermID: string
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
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  // Customizable Area Start
  data: [];
  openRefundModal: boolean;
  isInvalidEmail: boolean;
  iditem: number;
  amount: string;
  orderID: number;
  acceptButon: boolean;
  amount_paid: number;
  isInvalidAmt: boolean;
  ismsgShow: boolean;
  leftamount: number;
  sucess: boolean;
  transactionID: string;
  isLoading: boolean;
  isInvalidAmtvalue: boolean;
  // Customizable Area End
}

interface SS {
  id: string;
  // Customizable Area Start
  // Customizable Area End
}



export default class RefundManagementController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  listofOrdersApiCallID: string = " ";
  orderUpdateApiCallID: string = " ";
  RefundApiCallID: string = " ";
  _unsubscribe: string = " ";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      // Customizable Area Start
      openRefundModal: false,
      isInvalidEmail: false,
      data: [],
      iditem: 0,
      amount: "",
      orderID: 0,
      acceptButon: false,
      isInvalidAmt: false,
      ismsgShow: false,
      leftamount: 0,
      amount_paid: 0,
      sucess: false,
      isLoading: false,
      transactionID: "",
      isInvalidAmtvalue: false,
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    if (message.id === getName(MessageEnum.AccoutLoginSuccess)) {
      let value = message.getData(getName(MessageEnum.AuthTokenDataMessage));

      this.showAlert(
        "Change Value",
        "From: " + this.state.txtSavedValue + " To: " + value
      );

      this.setState({ txtSavedValue: value });
    }

    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (responseJson && !responseJson.errors) {
        if (apiRequestCallId === this.listofOrdersApiCallID) {
          this.listofOrdersSuccessCallBack(responseJson);
        }
        if (apiRequestCallId === this.RefundApiCallID) {
          this.RefundSuccessCallBack(responseJson);
        }
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start

  async componentDidMount() {
    this.listOfOrders()
  }

  amountSet = (text: string) => {
    const cleanedText = text.toString().replace(/[^0-9.]/g, '');

    // Restrict decimal places to two
    const decimalParts = cleanedText.split('.');
    const formattedText = decimalParts.length > 1
      ? decimalParts[0] + '.' + decimalParts[1].slice(0, 2)
      : cleanedText;

    this.setState({ amount: formattedText, isInvalidAmt: false, ismsgShow: false, isInvalidAmtvalue: false })
  };

  noSet = () => { this.setState({ acceptButon: false }) };

  refundSet = (item: RefundData) => {
    this.setState({
      acceptButon: true,
      amount_paid: item.attributes.amount_paid,
      leftamount: item.attributes.remaining_balance,
      iditem: item.attributes.order_id,
      transactionID: item.attributes.transaction_id
    })
  };

  RefundSuccessCallBack = async (responseJson: Roots) => {
    if (responseJson.result.description === "Request successfully processed in \'Merchant in Integrator Test Mode\'") {
      alert("YOUR REQUEST FOR REFUND IS SUCCESSFULLY PROCESSED")
      this.setState({ acceptButon: false, sucess: true, amount: "" })
    } else if (responseJson.result.description === "cannot refund (refund volume exceeded or tx reversed or invalid workflow?)") {
      alert("Refund volume exceeded")
    }
    this.listOfOrders()
  }

  apiCall = async (data: ApiData) => {
    let token = "user_token"
    const { contentType, method, endPoint, body, type } = data;
    const header = {
      "Content-Type": contentType,
      "Hyper-Pay-Token": this.state.amount.length !== 0 && HYPER_PAY_ACCESS_TOKEN,
      token: token
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      method
    );
    body && type != 'formData' ?
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(body)
      )
      :
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        body
      );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return requestMessage.messageId;
  };


  listOfOrders = async () => {
    this.listofOrdersApiCallID = await this.apiCall({
      contentType: configJSON.exampleApiContentType,
      method: configJSON.validationApiMethodType,
      endPoint: configJSON.listEndPoint
    });
  }

  listofOrdersSuccessCallBack = async (responseJson: RefundData) => {
    this.setState({ data: responseJson.data })
  }

  refundAPI = async () => {
    const numb = parseFloat(this.state.amount)
    const formattedValue = numb.toFixed(2)
    if (this.state.amount.length === 0) {
      alert("Please Enter Amount")
      this.setState({ isInvalidAmt: true })
      return
    } else if (numb === 0) {
      this.setState({ isInvalidAmtvalue: true })
      return
    } else if (numb > this.state.amount_paid) {
      this.setState({ ismsgShow: true, isInvalidAmt: true })
      return
    } else if (numb > this.state.leftamount) {
      this.setState({ ismsgShow: true, isInvalidAmt: true })
      return
    }

    let dataRefund = {
      hyperpay_order_id: this.state.transactionID,
      entity_id: entityId,
      amount: formattedValue,
      currency: "SAR",
      payment_type: "RF"
    }

    this.RefundApiCallID = await this.apiCall({
      contentType: configJSON.exampleApiContentType,
      method: configJSON.exampleAPiMethod,
      endPoint: configJSON.createRefundApiEndPoint,
      body: dataRefund,
    })
  }


  // Customizable Area End
}
