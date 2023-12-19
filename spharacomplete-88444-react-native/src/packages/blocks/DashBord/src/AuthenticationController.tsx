// Customizable Area Start
//@ts-ignore
//@ts-nocheck
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, Linking } from "react-native";

import { PERMISSIONS, request, RESULTS } from "react-native-permissions";
const baseURL = require("../../../framework/src/config");
export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
}

export interface S {
  code: any;
}

interface SS {
  id: any;
}

export default class AuthenticationController extends BlockComponent<
  Props,
  S,
  SS
> {
  getListId: any = "";
  LocationApiID: any = "";
  GetPercentage: any = "";
  GetVolunteerID: any = "";
  volEvent: any;
  shakeEvent: any;
  focusListener: any;
  appStateSubscription: any;
  interval: number;
  OtpId: any = "";

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    runEngine.attachBuildingBlock(this, this.subScribedMessages);

    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.RestAPIRequestMessage),
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      getName(MessageEnum.RestAPIRequestBodyMessage),
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      getName(MessageEnum.RestAPIRequestMethodMessage),
      getName(MessageEnum.RestAPIResponceDataMessage),
      getName(MessageEnum.RestAPIResponceErrorMessage)
    ];

    this.state = {
      code: ""
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    this.CheckPermission()
      .then(() => {})
      .catch(() => {});
    this.sendOtp()
      .then(() => {})
      .catch(() => {});
  }

  sendOtp = async () => {
    let Token: any = await AsyncStorage.getItem("Token");

    const header = {
      "Content-Type": configJSON.GetSendotpContentType,
      token: Token,
      redirect: "follow"
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.OtpId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.GetSendotpEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.GetSendotpAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  async onSetvolenteer() {
    // alert()
    let token = await AsyncStorage.getItem("Token");

    let Val = JSON.parse(await AsyncStorage.getItem("IsVolenteer"));

    fetch(`${baseURL.baseURL}/account_block/accounts/set_volunteer`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: token,
        redirect: "follow"
      },
      body: JSON.stringify({
        data: {
          attributes: {
            account_type: Val
          }
        }
      })
    })
      .then(async res => {
        let response = await res.json();

        await AsyncStorage.setItem(
          "User_Data",
          JSON.stringify(response.account)
        );

        console.log("ResponseOfApp.tsx", response);

        console.log(
          "ResponseOfApp.tsx",
          response.account.data.attributes.account_type
        );
      })
      .catch(e => {
        Alert.alert("Error:", e);
      });
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

      console.log("REponse messge+++++", responseJson);

      let errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

      console.log("ErrorResponse", errorReponse);

      if (apiRequestCallId === this.OtpId) {
        if (responseJson != null) {
          console.log("ResponseJSon-OtpId", responseJson);
          // alert(responseJson.message)
          this.showAlert("Alert", responseJson.message);
        } else {
          console.log("error-");
          setTimeout(() => {
            this.parseApiErrorResponse(responseJson);
          }, 500);
        }
      }
    }
  }

  otpcheck = (Code: any) => {
    console.log("CodeLength", String(Code).length, "------", Code);
    if (Code === "") {
      Alert.alert("Please Enter otp");
    } else if (String(Code).length < 4) {
      Alert.alert("Please Enter Correct OTP!");
    } else if (Code === 1234) {
      // alert('Success!!')
      this.onSetvolenteer()
        .then(() => {})
        .catch(() => {});
      this.props.navigation.navigate("Drawer");
    } else {
      Alert.alert("invalid otp!");
    }
  };

  async CheckPermission() {
    if (this.isPlatformAndroid()) {
      await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(result => {
        console.log("Permission---", result);
        switch (result) {
          case RESULTS.UNAVAILABLE:
            Alert.alert("Please Enable GPS permission to use this app");
            break;
          case RESULTS.DENIED:
            Alert.alert(
              "Hold on!",
              "please give permission to access your location",
              [{ text: "Setting", onPress: (): void => Linking.openSettings() }]
            );
            break;
          case RESULTS.BLOCKED:
            Alert.alert(
              "Hold on!",
              "Please give permission to access your location",
              [{ text: "Setting", onPress: (): void => Linking.openSettings() }]
            );
            break;
        }
      });
    } else {
      await request(PERMISSIONS.IOS.LOCATION_ALWAYS).then(result => {
        console.log("Permission_ios", result);
        switch (result) {
          case RESULTS.UNAVAILABLE:
            Alert.alert("Please Enable GPS permission to use this app");
            break;
          case RESULTS.DENIED:
            Alert.alert("Location permission denied!");
            break;
          case RESULTS.BLOCKED:
            Alert.alert(
              "Hold on!",
              "Please give permission to access your location",
              [{ text: "Setting", onPress: (): void => Linking.openSettings() }]
            );
            break;
        }
      });
    }
  }

  async componentWillUnmount() {
    // remove event listener
  }
}

// Customizable Area End
