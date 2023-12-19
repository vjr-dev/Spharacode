import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";

// Customizable Area Start
import AsyncStorage from "@react-native-async-storage/async-storage";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  route: any;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  details: boolean;
  chat: boolean;
  chatDetails: any;
  isLoading: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class HistoryDetailsController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getChatDetailsID: string = '';
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.RestAPIRequestMessage),
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      getName(MessageEnum.RestAPIRequestBodyMessage),
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      getName(MessageEnum.RestAPIRequestMethodMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      details: true,
      chat: false,
      chatDetails:'',
      isLoading: false
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End    
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    // Customizable Area Start
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if(apiRequestCallId === this.getChatDetailsID){
        this.receiveChatDetails(responseJson);
      }
    }
    // Customizable Area End
  }
  
  // Customizable Area Start
  receiveChatDetails = async (responseJson: any) => {
    if(responseJson){
      this.setState({chatDetails:responseJson.incident.data.attributes.group_information,isLoading: false})
    }
  }
  
  onDetailsPress = () => {
    this.setState({ details: true, chat: false })
  }

  onChatPress = () => {
    this.setState({ chat: true, details: false })
    this.getChatDetails()
  }
  getChatDetails = async () => {
    this.setState({isLoading: true})
    let token: any = await AsyncStorage.getItem("Token");
    const alertDetails = this.props.route.params.details;
    const header = {
      "Content-Type": configJSON.GetChatDetailsApiContentType,
      token: token
    };
    
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getChatDetailsID = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.getChatDetailsAPIEndPoint}?type=${alertDetails.incident_type}&incident_id=${alertDetails.incident_id}`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getChatDetailsAPIMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }
  // Customizable Area End

}
