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
  Pass: any;
  NextButtonBottom: number;
  CPass: any;
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
      Pass: 0,
      CPass: 0,
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
  NextCLick() {
    if (this.state.Pass.length !== 0) {
      if (this.state.CPass.length !== 0) {
        this.checkPasswordLength();
      } else {
        Alert.alert("", "Confirm Passcode is require");
      }
    } else {
      Alert.alert("", "Passcode is require");
    }
  }
  checkPasswordLength() {
    const { navigation }: any = this.props;
    if (this.state.Pass.length >= 8) {
      if (this.state.CPass.length >= 8) {
        if (this.state.Pass == this.state.CPass) {
          navigation.navigate("SecuritySetting");
        } else {
          Alert.alert("", "Passcode Not match");
        }
      } else {
        Alert.alert("", "Invalid Confirm Passcode");
      }
    } else {
      Alert.alert("", "Invalid Passcode");
    }
  }
  goback() {
    const { navigation }: any = this.props;
    navigation.goBack();
  }
}
// Customizable Area End
