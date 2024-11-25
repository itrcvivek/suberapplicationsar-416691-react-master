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

// Customizable Area Start
export interface IChat {
  id: string;
  muted: boolean;
  unreadCount: number;
  lastMessage: string;
  name: string;
}
interface IChatResponse {
  id: string;
  attributes: {
    name: string;
    accounts_chats: [
      {
        id: string;
        attributes: {
          account_id: number;
          muted: boolean;
          unread_count: number;
        };
      }
    ];
    messages: {
      id: string;
      attributes: { id: number; message: string };
      message: string;
    };
  };
}
// Customizable Area End
export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  token: string;
  accountId: number;
  chatName: string;
  chatList: IChat[];
  isVisibleModal: boolean;
  // Customizable Area End
}

interface SS {
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

export default class ChatController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getChatListApiCallId: string = "";
  createChatRoomApiCallId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      token: "",
      accountId: -1,
      chatName: "",
      chatList: [],
      isVisibleModal: false,
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    super.componentDidMount();
    this.getToken();
    if (!this.isPlatformWeb()) {
      this.props.navigation.addListener("willFocus", () => {
        this.getToken();
      });
    }
  }

  getToken = () => {
    const message: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(message);
  };

  isStringNullOrBlank = (string: string) => {
    return string === undefined || string === null || string.length === 0;
  };

  showModal = () => {
    this.setState({ isVisibleModal: true });
  };

  hideModal = () => {
    this.setState({ isVisibleModal: false });
  };

  navigateToChatView = (chatId: string) => {
    const message = new Message(getName(MessageEnum.NavigationMessage));
    message.addData(getName(MessageEnum.NavigationTargetMessage), "ViewChat");

    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);

    const raiseMessage: Message = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );
    raiseMessage.addData(getName(MessageEnum.SessionResponseData), {
      chatId: chatId,
    });
    message.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);

    this.send(message);
  };

  getChatList = async (token: string) => {
    const header = {
      "Content-Type": configJSON.apiContentType,
      token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getChatListApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getMyChatsApiEndpoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getApiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  createChatRoom = (chatName: string) => {
    if (this.isStringNullOrBlank(chatName)) {
      this.showAlert(
        configJSON.errorTitle,
        configJSON.errorAllFieldsAreMandatory,
        ""
      );
    } else {
      const header = {
        "Content-Type": configJSON.apiContentType,
        token: this.state.token,
        "Access-Control-Allow-Origin": "*",
      };
      const bodyData = {
        name: chatName,
      };
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );

      this.createChatRoomApiCallId = requestMessage.messageId;

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.createChatRoomApiEndPoint
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(bodyData)
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.postApiMethod
      );

      runEngine.sendMessage(requestMessage.id, requestMessage);
    }
  };

  inputRoomNameProps = {
    onChangeText: (chatName: string) => {
      this.setState({ chatName });
    },
  };

  btnAddRoomProps = {
    onPress: () => this.createChatRoom(this.state.chatName),
  };

  btnCloseModalProps = {
    onPress: () => this.hideModal(),
  };

  btnShowAddModalProps = {
    onPress: () => {
      this.showModal();
    },
  };

  handleChatNameChange = (chatName: string) => {
    this.setState({ chatName });
  };

  async receive(from: string, message: Message) {
    const apiRequestCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );
    const responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );
    const errorResponse = message.getData(
      getName(MessageEnum.RestAPIResponceErrorMessage)
    );
    if (errorResponse) this.parseApiCatchErrorResponse(errorResponse);
    if (responseJson?.errors) this.parseApiErrorResponse(responseJson);

    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      const token: string = message.getData(
        getName(MessageEnum.SessionResponseToken)
      );
      runEngine.debugLog("TOKEN", token);
      const messageData = JSON.parse(
        message.getData(getName(MessageEnum.SessionResponseData))
      );
      const accountId: number = messageData?.meta?.id;
      this.setState({ accountId });
      if (token) {
        this.setState({ token }, () => this.getChatList(token));
      }
    }
    if (
      responseJson?.data &&
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getChatListApiCallId.length > 0 &&
      apiRequestCallId === this.getChatListApiCallId
    ) {
      this.getChatListApiCallId = "";
      const chatList = responseJson.data;
      const results = chatList.map((item: IChatResponse) => {
        const findAccountMuteResult = item.attributes.accounts_chats.find(
          (item) => item.attributes.account_id === this.state.accountId
        )?.attributes.muted;
        return {
          id: item.id,
          name: item.attributes.name,
          muted:
            findAccountMuteResult ??
            item.attributes.accounts_chats[0].attributes.muted,
          unreadCount:
            item.attributes.accounts_chats[0].attributes.unread_count,
          lastMessage: item.attributes.messages?.attributes?.message,
        };
      });
      this.setState({
        chatList: results,
      });
    }
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.createChatRoomApiCallId.length > 0 &&
      apiRequestCallId === this.createChatRoomApiCallId &&
      responseJson
    ) {
      this.createChatRoomApiCallId = "";
      this.hideModal();
      this.getChatList(this.state.token);
    }
  }
  // Customizable Area End
}
