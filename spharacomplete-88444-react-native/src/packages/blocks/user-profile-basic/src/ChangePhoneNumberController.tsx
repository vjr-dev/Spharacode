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
  oldPhoneNumber: string;
  newPhoneNumber: string;
  token: string;
  countryModal: boolean;
  oldNumberCountryCode: any;
  newNumberCountryCode: any;
  openModelFor: string;
  isLoading: boolean;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class ChangePhoneNumberController extends BlockComponent<
  Props,
  S,
  SS
> {

  // Customizable Area Start
  changePhoneNumberAPIId: string = "";
  // Customizable Area End  

  constructor(props: Props) {
    super(props);

    // Customizable Area Start
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.RestAPIRequestMessage),
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      getName(MessageEnum.RestAPIRequestBodyMessage),
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      getName(MessageEnum.RestAPIRequestMethodMessage),
    ];

    this.state = {
      oldPhoneNumber: "",
      newPhoneNumber: "",
      token: "",
      countryModal: false,
      oldNumberCountryCode: "91",
      newNumberCountryCode: "91",
      openModelFor: "",
      isLoading: false,
    };
    // Customizable Area End

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    let userToken: any = await AsyncStorage.getItem("Token");
    this.setState({ token: userToken });
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

      if (apiRequestCallId === this.changePhoneNumberAPIId) {
        if (responseJson?.errors) {
          this.setState({ isLoading: false });
          displayErrorMessage(responseJson.errors.message);
        } else {
          this.setState({ isLoading: false });
          this.props.navigation.navigate("NewPhoneNumberVerification", {
            newPhoneNumber: responseJson.new_phone_number,
            otpToken: responseJson.token,
          });
        }
      }
    }
    // Customizable Area End
  }
  
  // Customizable Area Start
 
  validateDetails = () => {
    if (this.state.oldPhoneNumber === "" || this.state.newPhoneNumber === "") {
      displayErrorMessage("Please enter all details");
    } else {
      this.updatePhoneNumber();
    }
  };
  updatePhoneNumber = () => {
    this.setState({ isLoading: true });
    const header = {
      "Content-Type": configJSON.GetProfileApiContentType,
      token: this.state.token,
    };
    const attrs = {
      old_phone_number:
        this.state.oldNumberCountryCode + this.state.oldPhoneNumber,
      new_phone_number:
        this.state.newNumberCountryCode + this.state.newPhoneNumber,
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

    this.changePhoneNumberAPIId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.chnagePhoneNumberAPIEndPoint
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
      configJSON.callTypeApiValidateMobileNo
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  };

  countryCodeSelect = (item: any) => {
    if (this.state.openModelFor == "oldNumberModal") {
      this.setState({
        oldNumberCountryCode: item.callingCode,
        countryModal: false,
        openModelFor: "",
      });
    } else if (this.state.openModelFor == "newNumberModal") {
      this.setState({
        newNumberCountryCode: item.callingCode,
        countryModal: false,
        openModelFor: "",
      });
    }
  };

  // Customizable Area End
}