import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
interface Item {
  attributes: {
    id: number;
    link: string;
    name: string;
  };
  id: string;
  type: string;
}
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  // Customizable Area Start
  navigation: object;
  id: string;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  searchHistoryList: Item[];
  loading: boolean;
  refresh: boolean;
  txtInputValue: string;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  id: string | number;
  // Customizable Area End
}

export default class SearchHistoryController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  apiCallIdSearchHistoryList: string | Message = "";
  apiCallIdSearchHistoryListGet: string | Message = "";
  apiCallIdDeleteSearchId: string | Message = "";
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
      searchHistoryList: [],
      loading: false,
      refresh: false,
      // Customizable Area Start
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, [
      getName(MessageEnum.RestAPIResponceMessage),
    ]);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.apiCallIdSearchHistoryList !== null &&
      this.apiCallIdSearchHistoryList ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      let errorResponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (responseJson) {
        this.setState({
          txtInputValue: "",
          refresh: !this.state.refresh,
          loading: false,
        });
      } else {
        this.parseApiErrorResponse(responseJson);
      }
      this.parseApiCatchErrorResponse(errorResponse);
    } else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.apiCallIdSearchHistoryListGet !== null &&
      this.apiCallIdSearchHistoryListGet ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      let responseJson1 = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      let errorResponse1 = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (responseJson1) {
        this.setState({
          loading:false,
          searchHistoryList: (responseJson1?.data).reverse(),
        });
      } else {
        this.parseApiErrorResponse(responseJson1);
      }
      this.parseApiCatchErrorResponse(errorResponse1);
    }else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.apiCallIdDeleteSearchId !== null &&
      this.apiCallIdDeleteSearchId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      let errorResponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (responseJson) {
        this.setState({
          refresh: !this.state.refresh,
          loading: false,
        });
      } else {
        this.parseApiErrorResponse(responseJson);
      }
      this.parseApiCatchErrorResponse(errorResponse);
    }
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start

  async componentDidMount() {
    this.getSearchHistoryApi();
  }

  async componentDidUpdate(prevProps: Props, prevState: { refresh: boolean }) {
    if (prevState.refresh !== this.state.refresh) {
      this.getSearchHistoryApi();
    }
  }

  onChangeInvoice =(text: string) => {
          this.setState({ txtInputValue: text });
        }




  postSearchApi = async () => {
    this.setState({ loading: true });
    let attrs = {
      name: this.state.txtInputValue,
      link: "",
    };

    const header = {
      "Content-Type": configJSON.validationApiContentType,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.apiCallIdSearchHistoryList = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getApiUrl
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(attrs)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.exampleAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  };

  getSearchHistoryApi = async () => {
    this.setState({ loading: true });
    const header = {
      "Content-Type": configJSON.validationApiContentType,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.apiCallIdSearchHistoryListGet = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getApiUrl
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  };

  deleteListCall = async (listId:number) => {
    this.setState({ loading: true });
    let attrs = {
      ids: [listId],
    };

    const header = {
      "Content-Type": configJSON.validationApiContentType,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.apiCallIdDeleteSearchId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.deleteList
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(attrs)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.exampleAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
    
  };

  // Customizable Area End
}
