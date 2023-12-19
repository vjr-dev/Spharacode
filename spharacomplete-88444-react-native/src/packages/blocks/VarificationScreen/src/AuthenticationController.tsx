// Customizable Area Start
//@ts-ignore
//@ts-nocheck
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { OnLogOut } from "../../../components/src/Navigation/logout";
import { BackHandler } from "react-native";
import { backToLoginConfirmationAlert } from "../../../components/src/CustomAlert";
export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
}

interface S {
  token: string;
  code: string;
  isLoading: string;
}

interface SS {
  id: any;
}

export default class AuthenticationController extends BlockComponent<
  Props,
  S,
  SS
> {
  constructor(props: Props) {
    super(props);
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
      token: "",
      code: "",
      isLoading: false,
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    let userToken: any = await AsyncStorage.getItem("Token");
    this.setState({ token: userToken });
  }

  componentWillMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  handleBackButtonClick = async () => {
    backToLoginConfirmationAlert( async () => {
      this.setState({isLoading: true})
      await OnLogOut(this.props)
      this.setState({isLoading: false})
    });
    return true;
  };

  receive(from: string, message: Message) {
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
    }
  }

  confirmBtn = async() => {
    await AsyncStorage.setItem("is_user_authorized","true")
    this.props.navigation.replace("RegistrationSuccessScreen")
  };
}
// Customizable Area End
