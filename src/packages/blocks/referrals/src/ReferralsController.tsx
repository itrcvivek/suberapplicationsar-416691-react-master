import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import createRequestMessage from "./Helpers/create-request-message";
import { handleResponseMessage } from "./Helpers/handle-response-message";
import storage from "../../../framework/src/StorageProvider";
import Share from "react-native-share";
import { Linking } from "react-native";
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
  authToken: string;
  isLoading: boolean;
  referralCode: string;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class ReferralsController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getReferralCodeID: string = "";
  loginApiCallId: string = "";
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
      authToken: "",
      isLoading: false,
      referralCode: "",

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
        "From: " + this.state.txtSavedValue + " To: " + value,
      );

      this.setState({ txtSavedValue: value });
    }

    // Customizable Area Start

    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiRequestCallDataId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage),
      );

      const responseDataJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
      );

      const errorDataJson = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
      );

      this.setState({
        isLoading: false,
      });

      switch (apiRequestCallDataId) {
        case this.getReferralCodeID: {
          handleResponseMessage({
            responseJson: responseDataJson,
            errorJson: errorDataJson,
            onSuccess: () => {
              this.onSuccessReferral(responseDataJson);
            },
            onFail: () => {
              this.showAlert(`Error`, "Get Referral Failed! Please retry");
            },
          });
          break;
        }

        case this.loginApiCallId: {
          handleResponseMessage({
            responseJson: responseDataJson,
            errorJson: errorDataJson,
            onSuccess: () => {
              this.onSuccessLogin(responseDataJson);
            },
            onFail: () => {
              this.showAlert(`Error`, "Get Token Failed. Please retry!");
            },
          });
          break;
        }
      }
    }

    // Customizable Area End
  }

  txtInputWebProps = {
    onChangeText: (text: string) => {
      this.setState({ txtInputValue: text });
    },
    secureTextEntry: false,
  };

  txtInputMobileProps = {
    ...this.txtInputWebProps,
    autoCompleteType: "email",
    keyboardType: "email-address",
  };

  txtInputProps = this.isPlatformWeb()
    ? this.txtInputWebProps
    : this.txtInputMobileProps;

  btnShowHideProps = {
    onPress: () => {
      this.setState({ enableField: !this.state.enableField });
      this.txtInputProps.secureTextEntry = !this.state.enableField;
      this.btnShowHideImageProps.source = this.txtInputProps.secureTextEntry
        ? imgPasswordVisible
        : imgPasswordInVisible;
    },
  };

  btnShowHideImageProps = {
    source: this.txtInputProps.secureTextEntry
      ? imgPasswordVisible
      : imgPasswordInVisible,
  };

  btnExampleProps = {
    onPress: () => this.doButtonPressed(),
  };

  doButtonPressed() {
    let message = new Message(getName(MessageEnum.AccoutLoginSuccess));
    message.addData(
      getName(MessageEnum.AuthTokenDataMessage),
      this.state.txtInputValue,
    );
    this.send(message);
  }

  // web events
  setInputValue = (text: string) => {
    this.setState({ txtInputValue: text });
  };

  setEnableField = () => {
    this.setState({ enableField: !this.state.enableField });
  };

  // Customizable Area Start

  onSuccessLogin = async (responseDataJson: { meta: { token: string } }) => {
    await storage.set("token", responseDataJson.meta.token);
    this.setState(
      {
        authToken: responseDataJson.meta.token,
      },
      () => this.getReferralCode(),
    );
  };

  onSuccessReferral = (responseDataJson: { data: { code: string } }) => {
    this.setState({
      referralCode: responseDataJson.data.code,
    });
  };

  // Functions to get the Referral code for user confirmation
  getReferralCode = () => {
    this.setState({
      isLoading: true,
    });
    const requests = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.getReferralCodeID = requests.messageId;
    const headers = {
      "token": this.state.authToken, //static token
      "Content-Type": configJSON.validationApiContentType,
    };

    createRequestMessage({
      requestMessage: requests,
      endPoint: configJSON.Referal_EndPoint,
      method: configJSON.postApiMethodType,
      header: headers,
    });
  };

  // fake login function
  handleLoginUser() {
    this.setState({
      isLoading: true,
    });
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.loginApiCallId = requestMessage.messageId;
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
    };
    const body = {
      data: {
        attributes: {
          email: configJSON.USERNAME,
          password: configJSON.PASSWORD,
        },
        type: "email_account",
      },
    };
    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: configJSON.Login_EndPoint,
      method: configJSON.postApiMethodType,
      header: headers,
      body: JSON.stringify(body),
    });
  }

  shareOnSocialMedia = async (
    socialMediaType: "FACEBOOK" | "TWITTER" | "WHATSAPP" | "INSTAGRAM",
  ) => {
    const shareOptions = {
      social: Share.Social[socialMediaType],
      message: `Referral code ${this.state.referralCode}`,
      url: `https://example.com/id=${this.state.referralCode}`,
      type: "url",
    };
    if (socialMediaType === "INSTAGRAM") {
      try {
        await Share.open(shareOptions);
      } catch (error) {
        console.warn("User did not share");
      }
    } else {
      try {
        await Share.shareSingle(shareOptions);
      } catch (error) {
        this.showAlert("Error =>", JSON.stringify(error));
      }
    }
  };

  async componentDidMount() {
    try {
      const urlLink: string | null = await Linking.getInitialURL();

      if (urlLink) {
        console.warn("++++++========> url getting from outside", urlLink);
      } else {
        console.warn("No_Parameter found");
      }
    } catch (error) {
      console.warn("something went wrong", error);
    }

    const token = await storage.get("token");
    if (!token) {
      this.handleLoginUser();
    } else {
      this.setState({ authToken: token }, () => {
        this.getReferralCode();
      });
    }
  }

  // Customizable Area End
}
