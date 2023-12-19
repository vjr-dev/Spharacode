import { IBlock } from "../../../framework/src/IBlock";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { Message } from "framework/src/Message";

// Customizable Area Start
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  historyData: any;
  isLoading: boolean;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class HistoryController extends BlockComponent<Props, S, SS> {

  // Customizable Area Start
  getAlertHistoryID: string = '';
  // Customizable Area End  

  constructor(props: Props) {
    super(props);

    // Customizable Area Start
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.RestAPIRequestMessage),
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      getName(MessageEnum.RestAPIRequestBodyMessage),
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      getName(MessageEnum.RestAPIRequestMethodMessage),
    ];

    this.state = {
      historyData: [],
      isLoading: true
    };

    // Customizable Area End

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }
  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    this.getAlertHistory()
    this.props.navigation.addListener('focus',()=>{
      this.getAlertHistory();
    })
    // Customizable Area End
  }
 
  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if(apiRequestCallId === this.getAlertHistoryID){
        this.receiveAlertHistory(responseJson);
      }
    } 
    // Customizable Area End
  }
  
  // Customizable Area Start
  
  onHistoryPress = async (item: any, date: string) => {
    const tempItem = {...item};
    tempItem.date_category = date;
    this.props.navigation.navigate("HistoryDetails", {
      details: tempItem,
    })
  }

  receiveAlertHistory = async (responseJson: any) => {
    if(responseJson?.alert_history){
      this.setState({historyData: responseJson.alert_history.data, isLoading: false})
    }
  }

  getAlertHistory = async () => {
    let token: any = await AsyncStorage.getItem("Token");
    const header = {
      "Content-Type": configJSON.GetAlertHistoryApiContentType,
      token: token
    };
    
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getAlertHistoryID = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.alertHistoryAPIEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.alertHistoryAPIMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }

  // Customizable Area End
}