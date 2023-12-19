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

import {
  Alert,
  AppState,
  EmitterSubscription,
  Linking,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GetLocation from "react-native-get-location";
import {
  PERMISSIONS,
  request,
  RESULTS,
} from "react-native-permissions";
import RNAndroidLocationEnabler from "react-native-android-location-enabler";
import messaging from "@react-native-firebase/messaging";
import { cometChatInitialization } from "../../../components/src/CometChatCommonFunctions";

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
}

interface S {
  Number: any;
  Code: any;
  finalNumber: any;
  Loader: boolean;
  Cmodal: boolean;
  Latitude: any;
  Longitude: any;
  appState: any;
  DeviceToken: any;
}

interface SS {
  id: any;
}

export default class Loginscreen extends BlockComponent<Props, S, SS> {
  apiEmailLoginCallId: any = "";
  appStateSubscription: void;
  listener: EmitterSubscription | null = null;

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
      Number: 0,
      Code: 91,
      finalNumber: 0,
      Loader: false,
      Cmodal: false,
      Latitude: 0,
      Longitude: 0,
      appState: "",
      DeviceToken: "",
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  alertFunction = () => {
    Alert.alert(
      "Hold on!",
      "please give permission to access your location",
      [{ text: "Setting", onPress: () => Linking.openSettings() }]
    );
  }

  async CheckPermission() {
    if (Platform.OS === "android") {
      request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
        console.log("Permission---", result);
        switch (result) {
          case RESULTS.UNAVAILABLE:
            Alert.alert(
              "",
              "Please Enable GPS permission to use this app");
            break;
          case RESULTS.DENIED:
             this.alertFunction();
            break;
          case RESULTS.BLOCKED:
            this.alertFunction();
            break;
        }
      });
    } else {
      request(PERMISSIONS.IOS.LOCATION_ALWAYS).then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            alert("Please Enable GPS permission to use this app");
            break;
          case RESULTS.DENIED:
            alert("Location permission denied!");
            break;
          case RESULTS.BLOCKED:
            Alert.alert(
              "Hold on!",
              "please give permission to access your location",
              [{ text: "Setting", onPress: () => Linking.openSettings() }]
            );
            break;
        }
      });
    }
  }

  getPermissions = () => {
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000,
    }).then((data) => {
      if (data === "already-enabled") {
        // this.findCoordinates()
        console.log("iffff");
      } else {
        setTimeout(() => {
          //   this.findCoordinates()
          console.log("elseeeee");
        }, 1000);
      }
    });
  };

  async componentDidMount() {
    cometChatInitialization().then((response: any)=>{
    })
    .catch((error: any)=>{
    })
    await this.getFcmToken();

    Platform.OS == "android" && this.getPermissions();

    this.CheckPermission();

    let asyncData: any = await AsyncStorage.getItem("SignON");
    let userData = await AsyncStorage.getItem("User_Data");
    console.log("userdata-LGC-170 ", userData);
    console.log("asyncData-LGC-171 ", asyncData);

    this.appStateSubscription = AppState.addEventListener(
      "change",
      (nextAppState) => {
        if (
          this.state.appState.match(/inactive|background/) &&
          nextAppState === "active"
        ) {
        this.setState({ appState: nextAppState });
      }
      }
    );

    if (userData != null) {
      console.log("userdata-LGC-189 ", userData);

      let { navigation }: any = this.props;
      navigation.replace("Drawer");
      return;
    } else {
      console.log(asyncData, "<----  SING ON NAVIGATION TO");
      let { navigation }: any = this.props;
      if (asyncData) {
        navigation.replace(asyncData);
      }
    }
    GetLocation.getCurrentPosition({
      enableHighAccuracy: false,
      timeout: 20000,
    })
      .then((location) => {
        console.log("locationlocation", location);
        let currentLongitude = location.longitude;
        let currentLatitude = location.latitude;
        console.log("CauurentLAt", currentLatitude);
        this.setState({
          Latitude: currentLatitude,
          Longitude: currentLongitude,
        });
      })
      .catch((error) => {
        
      });
  }
  async componentWillUnmount() {
    this.appStateSubscription.remove();
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


      if (apiRequestCallId === this.apiEmailLoginCallId) {
        if (responseJson !== null && responseJson) {
          if (responseJson.errors != null) {
           

            this.setState(
              {
                Loader: false,
              },
              () => {
                setTimeout(() => {
                  Alert.alert(
                    "Error",
                    "This number is not registered",
                    [
                      {
                        text: "OK",
                        onPress: () => this.setState({ Loader: false }),
                      },
                    ],
                    { cancelable: false }
                  );
                }, 500);
              }
            );
          } else {
            this.setState({ Loader: false });
            await AsyncStorage.setItem(
              "Login_Token",
              JSON.stringify(responseJson.meta.token)
            );
            console.log("---navigation", responseJson);

            const { navigation }: any = this.props;
            navigation.navigate("VerificationScreen", { Screen: "LOGIN" });
          }
        } else {
          

          this.setState(
            {
              Loader: false,
            },
            () => {
              setTimeout(() => {
                Alert.alert(
                  "Error",
                  "Please try again later.",
                  [
                    {
                      text: "OK",
                      onPress: () => this.setState({ Loader: false }),
                    },
                  ],
                  { cancelable: false }
                );
              }, 500);
            }
          );
        }
      }
    }
  }

  modalclose() {
    this.setState({ Cmodal: false });
  }
  codelcik(item: any) {
    console.log(item);
    this.setState({
      Code: item.callingCode,
      Cmodal: false,
    });
  }

  async varificationgo() {
    this.setState({ Loader: true });
    let number = this.state.Number;
    let number2 = JSON.stringify(number).length;
    console.log(number2, "dfgghjswdfgvhjsh");

    if (number2 > 2) {
      let dataa = this.state.Code;
      let gm = dataa.toString();

      console.log(gm, "data got");

      let num = this.state.Number.toString();

      let full = "+" + dataa + num;
      let fn = full.toString();
      this.setState({ finalNumber: fn });

      console.log("------->", fn, "b");
      await AsyncStorage.setItem("User_number", fn);
      console.log("------->", this.state.finalNumber, "A");

      const header = {
        "Content-Type": configJSON.validationApiContentType,
      };
      const attrs = {
        full_phone_number: +fn,
        registration_token: this.state.DeviceToken,
        latitude: this.state.Latitude,
        longitude: this.state.Longitude,
      };
      const data = {
        attributes: attrs,
      };
      const httpBody = {
        data: data,
      };
      console.log("httpBody-FUNC-ONCLICKLOGIN", httpBody);

      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );

      this.apiEmailLoginCallId = requestMessage.messageId;

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
    } else {
      this.setState({ Loader: false });
      alert("Please Enter the Number");
    }

  }

  goSignupScreen() {
    console.log("Click");
    const { navigation }: any = this.props;
    navigation.navigate("SignupOptions");
  }
  goback() {
    const { navigation }: any = this.props;
    navigation.goBack();
  }

  async getFcmToken() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      messaging()
        .getToken()
        .then((fcmtoken) => {
          console.log("FCMTOKEN-FROMLOGINSCREEN", fcmtoken);
          AsyncStorage.setItem("fcmToken", fcmtoken);
          this.setState({ DeviceToken: fcmtoken });
        })
        .catch((err) => {
          console.log("err", err);
        });
    } else {
      console.log("enabled", enabled);
    }
  }
}
// Customizable Area End
