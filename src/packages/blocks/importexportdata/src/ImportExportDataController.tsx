import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import RNFS from "react-native-fs";
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
  loadingCSV: boolean;
  loadingJson: boolean;
  token: string;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class ImportExportDataController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  jsonDataApiCallId: string = "";
  csvDataApiCallId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      loadingCSV: false,
      loadingJson: false,
      token: "",
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    // Customizable Area Start
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      runEngine.debugLog("TOKEN", token);
      this.setState({ token: token });
    }

    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.jsonDataApiCallId !== "" &&
      this.jsonDataApiCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (responseJson && responseJson.errors) {
        console.log(responseJson.errors);
        alert(configJSON.errorMsg);
        this.setState({ loadingJson: false });
      } else {
        responseJson && this.exportFile(JSON.stringify(responseJson), ".json");
      }
    }

    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    super.componentDidMount();
    this.getToken();
  }

  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

  isJSON = (text: any) => {
    try {
      const json = JSON.parse(text);
      return typeof json === "object";
    } catch (error) {
      return false;
    }
  };

  downloadCSVData = async () => {
    // This function uses fetch rather than RunEngine for the network request by design
    // It is done because the RestApiClientBlock does not handle CSV responses

    this.setState({ loadingCSV: true });
    try {
      const response = await fetch(
        `${configJSON.baseURL}/${configJSON.exportDataEndpoint}`,
        {
          headers: {
            "Content-Type": configJSON.csvApiContentType,
            token: this.state.token,
          },
        }
      );
      const res = await response.text();
      let result = res && this.isJSON(res) ? JSON.parse(res) : null;

      if (result?.errors) {
        console.log(result.errors);
        this.showAlert("Error downloading CSV", configJSON.errorMsg);
        this.setState({ loadingCSV: false });
      } else {
        this.exportFile(res, ".csv");
      }
    } catch (e) {
      console.log("error: ", e);
      this.setState({ loadingCSV: false });
    }
  };

  exportFile = async (data: any, type: string) => {
    const path = `${RNFS.DocumentDirectoryPath}/${Date.now()}${type}`;
    try {
      await RNFS.writeFile(path, data, "utf8");
      console.log("File written to path", path);

      this.showAlert("File saved to", `${configJSON.exportSuccess}${path}`);
      this.setState({ loadingCSV: false, loadingJson: false });
    } catch (error) {
      this.setState({ loadingCSV: false, loadingJson: false });
      console.error(error);
    }
  };

  downloadJsonData = () => {
    this.setState({ loadingJson: true });
    const header = {
      "Content-Type": configJSON.jsonApiContentType,
      token: this.state.token,
    };

    const getJsonMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.jsonDataApiCallId = getJsonMessage.messageId;

    getJsonMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.exportDataEndpoint
    );

    getJsonMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    getJsonMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.exportDataMethod
    );

    runEngine.sendMessage(getJsonMessage.id, getJsonMessage);
    return true;
  };
  // Customizable Area End
}
