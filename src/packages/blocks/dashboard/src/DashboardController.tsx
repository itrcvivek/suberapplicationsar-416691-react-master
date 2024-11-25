import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
// Customizable Area End

export const configJSON = require("./config.js");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}
interface S {
  // Customizable Area Start
  dashboardData: { "id": string, "type": string, "attributes": { "total_candidates": number, "sub_attributres": { "type": string, "quantity": string }[] } };
  token: string;
  errorMsg: string;
  loading: boolean;
  // Customizable Area End
}
interface SS {
  id: any;
}

export default class DashboardController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  apiDashboardItemCallId: string = "";
  // Customizable Area End
  
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    console.disableYellowBox = true;
    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.SessionResponseMessage)
    ];

    this.state = {
      dashboardData: {"id":"0","type":"candidate","attributes":{"total_candidates":0,"sub_attributres":[{"type":"Interview with client","quantity":"0"}]}},      
      errorMsg: "",
      token: "",
      loading: false
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    this.getToken();
    if (this.isPlatformWeb() === false) {
      this.props.navigation.addListener('willFocus', () => {
        this.getToken();
      });
    }
    // Customizable Area Start
    this.setState({ loading: true})
    this.getDashboardData();
    // Customizable Area End
  }
  
  getToken=()=>{
    const message: Message = new Message(getName(MessageEnum.SessionRequestMessage));
    this.send(message);
  }

  getDashboardData(): boolean {
    // Customizable Area Start
    const header = {
      "Content-Type": configJSON.dashboarContentType,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.apiDashboardItemCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.dashboardGetUrl
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.dashboarApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    // Customizable Area End
    return true;
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      )

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      )

      var errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

      if (responseJson && !responseJson.errors) {
        if (apiRequestCallId === this.apiDashboardItemCallId) {
          this.setState({ loading: false, dashboardData: responseJson.data, errorMsg: ''})
        }
      }
      else if (responseJson && responseJson.errors) {
        if (apiRequestCallId === this.apiDashboardItemCallId) {
          this.setState({ loading: false, dashboardData: {"id":"0","type":"candidate","attributes":{"total_candidates":0,"sub_attributres":[{"type":"Interview with client","quantity":"0"}]}}, errorMsg : errorReponse})
        }
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start

  getPercentageFun = (percentage: number) => {
    return (percentage * 100).toFixed(0) + '%'
  }
  getPercentageColor= (type: string) => {
   switch(type) {
    case 'Interview with client':
      return '#D52CD0'
    case 'Submitted for feedback':
      return '#F0E517'
    case 'Candidates expecting offer':
      return '#F44D8E'
    case 'Candidates accepted':
      return '#35C95E'
    }
  }
  // Customizable Area End

}
