import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  displayErrorMessage,
  displaySuccessMessage,
} from "../../../components/src/CustomAlert";
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
  code: string;
  isLoading: boolean;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class NewPhoneNumberVerificationController extends BlockComponent<
  Props,
  S,
  SS
> {

  // Customizable Area Start
  verifyPhoneNumberAPIId: string = "";
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
      code: "",
      isLoading: false,
    };
    // Customizable Area End

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }
  
  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
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

      if (apiRequestCallId === this.verifyPhoneNumberAPIId) {
        this.setState({ isLoading: false });
        if (responseJson?.errors) {
          displayErrorMessage(responseJson.errors?.message);
        } else {
          displaySuccessMessage("Your phone number has been updated.");
          this.props.navigation.pop(2);
        }
      }
    }
    // Customizable Area End
  }
  
  // Customizable Area Start
  confirmBtn = async () => {
    if (this.state.code != "") {
      this.setState({ isLoading: true });
      let userToken: any = await AsyncStorage.getItem("Token");
      const header = {
        "Content-Type": configJSON.OTPconfirmApiContentType,
        token: userToken,
      };

      const attrs = {
        otp_code: this.state.code,
        new_phone_number: this.props.route.params.newPhoneNumber,
        token: this.props.route.params.otpToken,
      };

      const data = {
        attributes: attrs,
      };

      const httpBody = {
        data: data,
      };
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );

      this.verifyPhoneNumberAPIId = requestMessage.messageId;

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.verifyNewNumberAPIEndPoint
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(httpBody)
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.exampleAPiMethod
      );

      runEngine.sendMessage(requestMessage.id, requestMessage);
      return true;
    } else {
      displayErrorMessage("Please enter OTP.");
    }
  };
  // Customizable Area End
}