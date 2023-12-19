// Customizable Area Start
//@ts-ignore
//@ts-nocheck
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {loginOnChat} from '../../../components/src/CometChatCommonFunctions'
import {GotoHomePage, GotoEmergencyContactPage, GotoPersonalInformationPage, NavigateAfterSignUp, GotoFirstResponderHomePage, NavigateAfterSignUpFirstResponder, GotoFirstResponderAuthenticationPage, GotoFirstResponderPersonalInformationPage, GotoFirstResponderIdentificationPage} from '../../../components/src/Navigation/NavigationFunctions'
import { displayErrorMessage } from "../../../components/src/CustomAlert";
export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
}

interface S {
  Token: any;
  code: any;
  screeen: any;
  Loader: boolean;
}

interface SS {
  id: any;
}

export default class TutorialsController extends BlockComponent<Props, S, SS> {
  OtpvarificationId: any = "";

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.RestAPIRequestMessage),
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      getName(MessageEnum.RestAPIRequestBodyMessage),
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      getName(MessageEnum.RestAPIRequestMethodMessage)
    ];
    this.state = {
      Token: "",
      code: "",
      screeen: "",
      Loader: false
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }
  async componentDidMount() {
    let Token: any = await AsyncStorage.getItem("Login_Token");
    let TokenS: any = await AsyncStorage.getItem("Singin_Token");
    this.setState({ screeen: this.props.route.params?.Screen });

    if (this.props.route.params?.Screen == "SIGNIN") {
      let data = JSON.parse(TokenS);
      this.setState({ Token: data });
      await AsyncStorage.setItem("Token", this.state.Token);
    } else {
      let data = JSON.parse(Token);
      this.setState({ Token: data[0] });
      await AsyncStorage.setItem("Token", this.state.Token);
    }

    let aa = 0;
  }
 async handleFirstResponderNavigation (attributes : any){
    await AsyncStorage.setItem("isActivated", JSON.stringify(attributes.activated));
    await AsyncStorage.setItem("has_user_credential", JSON.stringify(attributes.has_user_credential));
    await AsyncStorage.setItem("is_user_authorized", JSON.stringify(attributes.is_user_authorized));
    await AsyncStorage.setItem("roleID", '1');
    await AsyncStorage.setItem("roleName", 'firstResponder');
    await AsyncStorage.setItem("initialRoleID", '1');
    if (this.state.screeen == "LOGIN") {
      if(!attributes.is_user_authorized){ 
        GotoFirstResponderAuthenticationPage(this.props)
      }else if(!attributes.activated){
        GotoFirstResponderPersonalInformationPage(this.props)
      }else if(!attributes.has_user_credential){
        GotoFirstResponderIdentificationPage(this.props)
      }else{
        GotoFirstResponderHomePage(this.props);
      }
    } else {
      NavigateAfterSignUpFirstResponder(this.props);
    }
  }
  async handleCiviliansNavigation(attributes : any){
    await AsyncStorage.setItem("isActivated", JSON.stringify(attributes.activated));
    await AsyncStorage.setItem("isEmergencyContactNumberAdded", JSON.stringify(attributes.has_emergency_contact));
    await AsyncStorage.setItem("roleID", '2');
    await AsyncStorage.setItem("roleName", 'civilian');
    await AsyncStorage.setItem("initialRoleID", JSON.stringify(attributes.role_id));
    if (this.state.screeen == "LOGIN") {
      if(!attributes.activated){
        GotoPersonalInformationPage(this.props)
      }else if(!attributes.has_emergency_contact){
        GotoEmergencyContactPage(this.props)
      }else{
        GotoHomePage(this.props);
      }
    } else {
    NavigateAfterSignUp(this.props);
    }
  }
  async handleNavigation(responseJson: any) {
      let attributes = responseJson.user.data.attributes;
      await AsyncStorage.setItem("User_Data", JSON.stringify(responseJson.user));
      await AsyncStorage.setItem("isLogin", JSON.stringify(true));
      if(attributes.account_type === "first_responder"){
        this.handleFirstResponderNavigation(attributes);
      }else{
        this.handleCiviliansNavigation(attributes)
      }
  }
  async receive(from: string, message: Message) {
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (apiRequestCallId === this.OtpvarificationId) {
        if (responseJson?.errors != null) {
          this.setState({ Loader: false });
          displayErrorMessage(responseJson.errors[0].otp);
        } else {
          loginOnChat(responseJson.user.data.attributes.full_phone_number).then((response:any)=>{
            this.setState({ Loader: false });
            this.handleNavigation(responseJson);
          }).catch((error: any)=>{
            this.setState({ Loader: false });
            this.handleNavigation(responseJson);
          })
        }
      }
    }
  }

  otpchack() {
    if(this.state.code === ''){
      displayErrorMessage("Please enter otp");
      return
    }
    this.setState({ Loader: true });
    const header = {
      "Content-Type": configJSON.OTPconfirmApiContentType
    };
    const attrs = {
      otp_code: this.state.code,
      token: this.state.Token
    };
    const data = {
      attributes: attrs
    };
    const httpBody = {
      data: data
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.OtpvarificationId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.OTPconfirmAPiEndPoint
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
  }
  goback() {
    const { navigation }: any = this.props;
    navigation.goBack();
  }
}
// Customizable Area End