import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import AsyncStorage from "@react-native-async-storage/async-storage";
import { displayErrorMessage } from "../../../components/src/CustomAlert";
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
  token: string;
  userProfile: string;
  userName: string;
  isLoading: boolean;
  houresDetails: any;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class TrackedHoursController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getHoursId: any = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
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
      token: "",
      userProfile: "",
      userName: "",
      isLoading: false,
      houresDetails: "",
      // Customizable Area End
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Recived", message);

    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (apiRequestCallId === this.getHoursId) {
        if (responseJson != null) {
          if (responseJson.errors != null) {
            this.setState({ isLoading: false });
            displayErrorMessage(responseJson.errors[0]);
          } else {
            this.setState({ houresDetails: responseJson, isLoading: false });
          }
        }
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    super.componentDidMount();
    let userToken: any = await AsyncStorage.getItem("Token");
    this.setState({ token: userToken });
    this.getHoursDetail(userToken);
    const tempUserDetails = await AsyncStorage.getItem("User_Data");
    if (tempUserDetails) {
      const tempDetails = JSON.parse(tempUserDetails);
      this.setState({
        userProfile: tempDetails.data.attributes.profile_image_url,
        userName: tempDetails.data.attributes.unique_auth_id,
      });
    }
  }

  getHoursDetail = (token: any) => {
    this.setState({ isLoading: true });
    const header = {
      "Content-Type": configJSON.GetdataContentType,
      token: token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getHoursId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getHoursApiUrl
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.GetSendotpAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };
  // Customizable Area End
}
