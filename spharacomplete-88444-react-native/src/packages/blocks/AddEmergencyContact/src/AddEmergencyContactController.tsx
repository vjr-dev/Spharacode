// Customizable Area Start
//@ts-ignore
//@ts-nocheck
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GotoHomePage } from "../../../components/src/Navigation/NavigationFunctions";
import { backToLoginConfirmationAlert, displayErrorMessage, displaySuccessMessage } from "../../../components/src/CustomAlert";
import { BackHandler } from "react-native";
import { OnLogOut } from "../../../components/src/Navigation/logout";
export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
}

interface S {
  ListData: any;
  Token: string;
  isLoading: boolean
}

interface SS {
  id: any;
}

export default class EmergencyContact extends BlockComponent<Props, S, SS> {
  getListId: any = "";
  DeletecontactId: any = "";

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
      ListData: [],
      Token: "",
      isLoading: false
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    let token: any = await AsyncStorage.getItem("Token");
    this.setState({ Token: token });
    this.getContacts();
    this.props.navigation.addListener('focus',()=>{
      this.getContacts();
    })
  }
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick = async () => {
    if(this.props.route.params?.from !== 'EmergencyContact'){
      this.props.navigation.pop();
      return true;
    }else{
      backToLoginConfirmationAlert(async ()=> {
        this.setState({isLoading: true})
        await OnLogOut(this.props)
        this.setState({isLoading: false})
      });
      return true;
    }
  }
  onAddNewContacts = () => {
    this.props.navigation.navigate("EmergencyContact", {from: "AddContact", contactType: this.props.route.params.contactType})
  }
  receiveGetList(responseJson: any) {
    if (responseJson != null) {
      if (responseJson.errors != null) {
        this.setState({ isLoading: false });
        displayErrorMessage(responseJson.errors[0]);
      } else {
        this.setState({ ListData: responseJson.data });
        this.setState({ isLoading: false });
      }
    }
  }
  receiveDeletecontact(responseJson: any) {
    if (responseJson != null) {
      if (responseJson.errors != null) {
        this.setState({ isLoading: false });
        displayErrorMessage(responseJson.errors[0]);
      } else {
        this.getContacts();
        displaySuccessMessage("Contact delete successfully.")
      }
    }
  }
  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (apiRequestCallId === this.getListId) {
        this.receiveGetList(responseJson);
      }
      if (apiRequestCallId === this.DeletecontactId) {
        this.receiveDeletecontact(responseJson);
      }
    }
  }

  getContacts() {
    this.setState({ isLoading: true });
    const header = {
      "Content-Type": configJSON.GetcontactApiContentType,
      token: this.state.Token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getListId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.GetcontactAPiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.GetcontactAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }


  async onDoneClick() {
    if(this.props.route.params?.from !== 'EmergencyContact'){
      this.props.navigation.pop();
    }else{
      GotoHomePage(this.props);
    }
  }

  deleteContacts(id: string) {
    this.setState({ isLoading: true });
    const header = {
      "Content-Type": configJSON.DeletecontactApiContentType,
      token: this.state.Token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.DeletecontactId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_contact_us/contacts/${id}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.DeletecontactAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }
}
// Customizable Area End
