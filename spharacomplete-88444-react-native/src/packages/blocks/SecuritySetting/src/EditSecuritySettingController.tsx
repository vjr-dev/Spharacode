// Customizable Area Start
//@ts-nocheck
//@ts-ignore
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { IBlock } from "../../../framework/src/IBlock";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { Alert, Keyboard } from "react-native";
import RNAndroidKeyboardAdjust from "rn-android-keyboard-adjust";

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
}

interface S {
  Loader: boolean;
  Email: any;
  NextButtonBottom: number;
  CEmail: any;
}

interface SS {
  id: any;
}

export default class SecuritySetting extends BlockComponent<Props, S, SS> {
  apiEmailLoginCallId: any = "";
  keyboardDidHideListener: any;

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
      Email: "",
      CEmail: "",
      NextButtonBottom: 70,
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  componentDidMount(): any {
    RNAndroidKeyboardAdjust.setAdjustResize();
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide.bind(this)
    );
  }

  componentWillUnmount(): any {
    this.keyboardDidHideListener.remove();
    RNAndroidKeyboardAdjust.setAdjustPan();
  }

  _keyboardDidHide() {
    this.setState({ NextButtonBottom: 70 });
  }

  validateEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email);
  }

  NextClick() {
    const { navigation }: any = this.props;
    let email = this.state.Email;
    let cemail = this.state.CEmail;

    if (this.state.Email != "") {
      if (this.state.CEmail != "") {
        if (this.validateEmail(email)) {
          if (email == cemail) {
            navigation.navigate("SecuritySetting");
          } else {
            Alert.alert("", "Email Not match");
          }
        } else {
          Alert.alert("", "Invalid Email");
        }
      } else {
        Alert.alert("", "Confirm Email is require");
      }
    } else {
      Alert.alert("", "Email is require");
    }
  }
  goback() {
    const { navigation }: any = this.props;
    navigation.goBack();
  }
}
// Customizable Area Start
