//@ts-nocheck
//@ts-ignore
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { OnLogOut } from "../../../components/src/Navigation/logout";
// Customizable Area Start

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End

}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  // Customizable Area Start
  Loader: boolean;
  Token: any;
  userdata: any;
  User_Number: any;
 // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class Settings5Controller extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getListId: any = "";
  LogoutapiId: any = "";
  focusListener: any;
  // Customizable Area Start

 

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
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      Loader: false,
      Token: "",
      userdata: "",
      User_Number: "",
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

      if (apiRequestCallId === this.getListId) {
        if (responseJson != null) {
          if (responseJson.errors != null) {
            this.setState({ Loader: false });
            alert(responseJson.errors[0].description);
          } else {
            this.setState({ Loader: false });
            this.setState({ userdata: responseJson.data.attributes });
            console.log("USERDATA", this.state.userdata);
          }
        } else {
          this.setState({ Loader: false });
        }
      }

      this.receiveLogoutApi(apiRequestCallId, responseJson)
     
    }
     // Customizable Area End
   
  }


  txtInputWebProps = {
    onChangeText: (text: string) => {
      this.setState({ txtInputValue: text });
    },
    secureTextEntry: false,
  };

  txtInputMobileProps = {
    ...this.txtInputWebProps,
    autoCompleteType: "email",
    keyboardType: "email-address",
  };

  txtInputProps = this.isPlatformWeb()
    ? this.txtInputWebProps
    : this.txtInputMobileProps;

  btnShowHideProps = {
    onPress: () => {
      this.setState({ enableField: !this.state.enableField });
      this.txtInputProps.secureTextEntry = !this.state.enableField;
      this.btnShowHideImageProps.source = this.txtInputProps.secureTextEntry
        ? imgPasswordVisible
        : imgPasswordInVisible;
    },
  };

  btnShowHideImageProps = {
    source: this.txtInputProps.secureTextEntry
      ? imgPasswordVisible
      : imgPasswordInVisible,
  };

  btnExampleProps = {
    onPress: () => this.doButtonPressed(),
  };

  doButtonPressed() {
    let msg = new Message(getName(MessageEnum.AccoutLoginSuccess));
    msg.addData(
      getName(MessageEnum.AuthTokenDataMessage),
      this.state.txtInputValue
    );
    this.send(msg);
  }

  // web events
  setInputValue = (text: string) => {
    this.setState({ txtInputValue: text });
  };

  setEnableField = () => {
    this.setState({ enableField: !this.state.enableField });
  };

  // Customizable Area Start
  receiveLogoutApi = (apiRequestCallId:any, responseJson:any) => {
     
    if (apiRequestCallId === this.LogoutapiId) {
      this.setState({ Loader: false });
    }


  }

  async componentDidMount() {
    // var number = ;
    this.setState({
      Token: await AsyncStorage.getItem("Token"),
      User_Number: await AsyncStorage.getItem("User_number"),
      userdata: await AsyncStorage.getItem("User_Data")
    });
    console.log(this.state.User_Number, "NUMBERRRRRR");
    console.log(this.state.userdata, "<<<<<<USEDATA>>>>>>>>");

    this.Firstapi();
    this.focusListener = this.props.navigation.addListener(
      "focus",
      async () => {
        this.Firstapi();
      }
    );
  }
  async Firstapi() {
    this.setState({ Loader: true });
    console.log("APICALLLLLL");

    const header = {
      "Content-Type": configJSON.GetdataContentType,
      token: this.state.Token,
    };
   
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getListId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.GetdataEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );


    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.GetdataAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }
  async onclick(item: any) {
    console.log(item);
    const { navigation }: any = this.props;
    if(item){
      if(item === "LogOut"){
      this.setState({Loader:true});
      await OnLogOut(this.props);
      this.setState({Loader:false});
      }else{
        navigation.navigate(item, { data: this.state.userdata });
      }
    }else{
      navigation.pop();
    }
  }
  SignoutAPI() {
    this.setState({ Loader: true });

    const header = {
      "Content-Type": configJSON.validationApiContentType,
    };
    const attrs = {
      full_phone_number: this.state.User_Number,
      registration_token: "",
    };
    const data = {
      attributes: attrs,
    };
    const httpBody = {
      data: data,
    };
    console.log(httpBody, "httpBody");

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.LogoutapiId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.exampleAPiEndPoint
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
  // Customizable Area End
}

