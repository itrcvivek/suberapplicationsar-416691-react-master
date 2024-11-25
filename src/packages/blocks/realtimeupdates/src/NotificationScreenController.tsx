// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

export interface NotificationType {
  attributes: {
    id: number;
    headings: string;
  };
}

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  modalVisible: boolean;
  postTextValue: string;
  notificationData: NotificationType[];
  token: string;
}

interface SS {
  id: any;
}

export default class NotificationScreenController extends BlockComponent<Props, S, SS> {
  getNotificationId: string = "";

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      modalVisible: false,
      postTextValue: "",
      notificationData: [],
      token: "",
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    if (message.id === getName(MessageEnum.AccoutLoginSuccess)) {
      let value = message.getData(getName(MessageEnum.AuthTokenDataMessage));

      this.showAlert("Change Value", "From: " + this.state.txtSavedValue + " To: " + value);

      this.setState({ txtSavedValue: value });
    }

    this.handleNotificationData(from, message);
  }

  doButtonPress() {
    let msgDats = new Message(getName(MessageEnum.AccoutLoginSuccess));
    msgDats.addData(getName(MessageEnum.AuthTokenDataMessage), this.state.txtInputValue);
    this.send(msgDats);
  }

  txtInputWebProps = {
    secureTextEntry: false,
    onChangeText: (text: string) => {
      this.setState({ txtInputValue: text });
    },
  };

  btnExampleProps = {
    onPress: () => this.doButtonPress(),
  };

  txtInputMobileProps = {
    ...this.txtInputWebProps,
    keyboardType: "email-address",
    autoCompleteType: "email",
  };

  // web events
  setInputValue = (text: string) => {
    this.setState({ txtInputValue: text });
  };

  setEnableField = () => {
    this.setState({ enableField: !this.state.enableField });
  };

  async componentDidMount() {
    this.getToken();
    this.getNotifications();
  }

  getToken = () => {
    const msgData: Message = new Message(getName(MessageEnum.SessionRequestMessage));
    this.send(msgData);
    if (this.isPlatformWeb()) {
      let token = localStorage.getItem("token");
      this.setState({ token: token ? token : "" });
    }
  };

  handleNotificationData = (from: string, message: Message) => {
    if (
      this.getNotificationId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      const apiResponse = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      if (apiResponse && apiResponse.data) {
        this.setState({ notificationData: apiResponse.data });
      } else {
        this.showAlert("Error", "Something went wrong. Please try again later!");
      }
    }
  };

  getNotifications = () => {
    let newToken: string | null = "";
    if (this.isPlatformWeb()) {
      newToken = localStorage.getItem("token");
      this.setState({ token: newToken ? newToken : "" });
    }

    const headers = {
      "Content-Type": configJSON.validationApiContentType,
      token: newToken,
    };

    const notificationMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));

    this.getNotificationId = notificationMessage.messageId;

    notificationMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getAllNotifications
    );

    notificationMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    notificationMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );

    runEngine.sendMessage(notificationMessage.id, notificationMessage);
  };
}

// Customizable Area End
