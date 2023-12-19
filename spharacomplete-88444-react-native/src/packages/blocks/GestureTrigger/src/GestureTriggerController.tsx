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
import { back1, back2 } from "./assets";
import AsyncStorage from '@react-native-async-storage/async-storage'
import RNShake from "react-native-shake";



export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
}

interface S {
  Loader: boolean;
  switch2: boolean;
  Modal2: boolean;
  Userdata: any;
  Token: any;
}

interface SS {
  id: any;
}

export default class Loginscreen extends BlockComponent<Props, S, SS> {
  SetsettingID: any = "";
 

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
      Loader: false,
      switch2: false,
      Modal2: false,
      Userdata: "",
      Token: "",
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

  }

 

   componentDidMount() {
     this.setState({ Userdata: this.props.route.params.data });
     this.setState({ Token:  AsyncStorage.getItem("Token") });
    this.setState({
      switch2: this.state.Userdata.horizontal_gesture,
    });
    console.log("DID call");

    let aa = 0;
  }

  async sahck() {
    if (this.state.switch2 == true) {
      console.log(
        "switch2 =",
        this.state.switch2
      );
      let aa = 0;

      RNShake.addListener(async () => {
        const { navigation }: any = this.props
        navigation.navigate("CfCustomAlerts2")
    });

    } else {
      console.log("FFF---------------------------------------");
      RNShake.removeAllListeners();
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

      let errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

      if (apiRequestCallId === this.SetsettingID) {
        if (responseJson != null) {
          console.log(responseJson, "<----------");

          if (responseJson.data != null) {
            this.setState({ Loader: false });
            const { navigation }: any = this.props;
           
            this.sahck();
           
          } else {
            this.setState({ Loader: false });
            alert(responseJson.errors[0].description);
          }
        }
      }
    }
  }

  async Setclcik() {
    this.setState({ Loader: true });
    const header = {
      "Content-Type": configJSON.UpdatesettingAPiContentType,
      token: this.state.Token,
    };
    const attrs = {
      horizontal_gesture: this.state.switch2,
    };
    const data1 = {
      attributes: attrs,
    };
    const httpBody = {
      data: data1,
    };
    console.log(httpBody, "httpBody");

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.SetsettingID = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.UpdatesettingAPiEndPoint
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
      configJSON.UpdatesettingAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }
  
  async M2close() {
     this.setState({ Modal2: false });
    this.Setclcik();
  }
  async switch22(Val: any) {
    this.setState({ switch2: Val});
    if (Val == true) {
      this.setState({ Modal2: true });
    } else {
       this.setState({ switch2: false });

      this.Setclcik();
    }
  }

  async componentWillUnmount() {
    // RNShake.removeAllListeners();
    console.log("Remmmmve");
  }

  goSignupScreen() {
    const { navigation }: any = this.props;
    navigation.navigate("SignUpScreen");
  }
  goback() {
    const { navigation }: any = this.props;
    navigation.goBack();
  }
  
}
// Customizable Area End
