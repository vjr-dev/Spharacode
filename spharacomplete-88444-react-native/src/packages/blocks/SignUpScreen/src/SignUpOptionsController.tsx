// Customizable Area Start
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { displayErrorMessage } from "../../../components/src/CustomAlert";

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
}

interface S {
  Loader: boolean;
  rolesData:any;
  }

interface SS {
  id: any;
}

export default class SignUpOptionsController extends BlockComponent<Props, S, SS> {
  apiGetRoleTypeId: any = "";
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
      Loader: true,
      rolesData:''
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    setTimeout(() => {
      this.setState({Loader:false})
    }, 10000);
    this.getRoles()
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
      if (apiRequestCallId === this.apiGetRoleTypeId) {
        if(responseJson.data){
          console.log(responseJson)
          this.setState({rolesData:responseJson.data,Loader:false})
        }else{
          displayErrorMessage(configJSON.errorMessage);
          this.setState({Loader:false})
        }
      }
    }
  }

  signUpFlow = async (userType: any) => {
    if(userType.id === 1){
      await AsyncStorage.setItem("roleID", '1');
      await AsyncStorage.setItem("roleName", 'firstResponder');
      this.props.navigation.navigate("SignUpScreen", {roleID: 1})
    }else{
      await AsyncStorage.setItem("roleID", '2');
      await AsyncStorage.setItem("roleName", 'civilian');
      this.props.navigation.navigate("SignUpScreen", {roleID: 2})
    }
  }

  getRoles=()=>{
    this.setState({Loader:true})
    const header = {
      "Content-Type": "application/json",
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.apiGetRoleTypeId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getSignUpOptionsAPIEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }
}
// Customizable Area End
