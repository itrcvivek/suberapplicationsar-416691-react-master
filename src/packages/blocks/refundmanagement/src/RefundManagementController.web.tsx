import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
    getName
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

export interface MainRoot {
    contentType: string
    method: string
    endPoint: string
    body: Body
}

export interface Body {
    hyperpay_order_id: string
    entity_id: string
    amount: number | string
    currency: string
    payment_type: string
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

export interface ListApiCall {
    contentType: string
    method: string
    endPoint: string
    token: string
}

export interface ItemAttribute {
    id: string
    type: string
    attributes: Attributes
}

export interface Root {
    data: Root[];
    id: string
    type: string
    attributes: Attributes
}

export interface Attributes {
    customer_name: string
    order_id: number | string
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

interface S {
    txtInputValue: string;
    txtSavedValue: string;
    enableField: boolean;
    data: Array<ItemAttribute>
    isInvalidEmail: boolean;
    amount: string;
    leftamount: number;
    isInvalidAmt: boolean;
    isValue: boolean;
    ismsgShow: boolean;
    acceptButon: boolean;
    item: ItemAttribute;
    // Customizable Area Start
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
    listofOrdersApiCallID: string = "";
    orderUpdateApiCallID: string = "";
    RefundApiCallID: string = "";
    HYPER_PAY_ACCESS_TOKEN = "OGFjN2E0Y2E4MTIxNGNiZTAxODEyMzkxNjU1NzEwOGV8YTNtZUZDZTY4dA==";
    entityId = "8ac7a4ca81214cbe0181239c3ff010b6";
    // Customizable Area End

    constructor(props: Props) {
        super(props);
        this.receive = this.receive.bind(this);

        // Customizable Area Start
        this.subScribedMessages = [
            // Customizable Area Start
            getName(MessageEnum.RestAPIResponceMessage),
            // Customizable Area End
        ];

        this.state = {
            txtInputValue: "",
            txtSavedValue: "A",
            enableField: false,
            isInvalidEmail: false,
            data: [],
            amount: "",
            leftamount: 0,
            isInvalidAmt: false,
            isValue: false,
            ismsgShow: false,
            acceptButon: false,
            item: {} as ItemAttribute,
            // Customizable Area End
        };
        runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

        // Customizable Area Start
        // Customizable Area End

    }

    // Customizable Area Start
    listofOrdersSuccessCallBack = async (responseJson: Root) => {
        this.setState({ data: responseJson.data })
    }
    // Customizable Area End

    // Customizable Area Start
    RefundSuccessCallBack = async (responseJson: Roots) => {
        if (responseJson.result.description === "Request successfully processed in \'Merchant in Integrator Test Mode\'") {
            this.setState({ acceptButon: false, amount: "" })
            alert("YOUR REQUEST FOR REFUND IS SUCCESSFULLY PROCESSED")
        }
        await this.listOfOrders()
    }
    // Customizable Area End

    // Customizable Area Start
    async receive(from: string, message: Message) {
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
    }

    async componentDidMount() {
        this.listOfOrders()
    }

    buttonOnClick = (data: ItemAttribute) => {
        this.setState({
            acceptButon: true, item: data, leftamount: data.attributes.remaining_balance,
        })
    }
    inputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const cleanedText = event.target.value.toString().replace(/[^0-9.]/g, '');
        // Restrict decimal places to two
        const decimalParts = cleanedText.split('.');
        const formattedText = decimalParts.length > 1
            ? decimalParts[0] + '.' + decimalParts[1].slice(0, 2)
            : cleanedText;

        this.setState({ amount: formattedText, ismsgShow: false, isInvalidAmt: false, isValue: false })
    }
    onClose = () => {
        this.setState({ acceptButon: false })
    }

    listOfOrders = async () => {
        await this.apiCall({
            contentType: "application/json",
            method: 'GET',
            endPoint: '/bx_block_refund_management/orders',
            token: "user_token",
        })
    }
    apiCall = async (data: ListApiCall) => {
        const { contentType, method, endPoint, token } = data;
        const header = {
            "Content-Type": contentType,
            token,
        };
        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );
        this.listofOrdersApiCallID = requestMessage.messageId

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

        runEngine.sendMessage(requestMessage.id, requestMessage);
        return requestMessage.messageId;
    };

    apiCallhyper = async (data: MainRoot) => {
        const { contentType, method, endPoint, body } = data;

        const header = {
            "Content-Type": contentType,
            "Hyper-Pay-Token": this.state.amount.length !== 0 && this.HYPER_PAY_ACCESS_TOKEN,
            token: "user_token",
        };
        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );
        this.RefundApiCallID = requestMessage.messageId

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
        body &&
            requestMessage.addData(
                getName(MessageEnum.RestAPIRequestBodyMessage),
                JSON.stringify(body)
            );
        runEngine.sendMessage(requestMessage.id, requestMessage);
        return requestMessage.messageId;
    };

    refundAPI = async (item: ItemAttribute) => {
        const numb = parseFloat(this.state.amount)
        const formattedValue = numb.toFixed(2)
        if (numb === 0) {
            this.setState({ isValue: true })
            return
        } else if (this.state.amount === "") {
            this.setState({ isInvalidAmt: true })
            return
        } else if (JSON.parse(this.state.amount) > item.attributes.amount_paid || numb > this.state.leftamount) {
            this.setState({ ismsgShow: true })
            return
        }

        let dataForRefund = {
            hyperpay_order_id: item.attributes.transaction_id,
            entity_id: this.entityId,
            amount: formattedValue,
            currency: "SAR",
            payment_type: "RF"
        }
        await this.apiCallhyper({
            contentType: 'application/json',
            method: 'POST',
            endPoint: '/bx_block_refund_management/refunds',
            body: dataForRefund,
        })
    }

    // Customizable Area End

}