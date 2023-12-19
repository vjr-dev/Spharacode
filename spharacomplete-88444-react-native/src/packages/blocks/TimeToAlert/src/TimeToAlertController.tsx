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
  PERMISSIONS,
  request,
  RESULTS,
} from "react-native-permissions";
import GetLocation from "react-native-get-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, Linking, Platform } from "react-native";

export const configJSON = require("./config");

let timeo: any;
let callCount: any = 0;

export interface Props {
  navigation: any;
  id: string;
}

interface S {
  token: any;
  TimerStaus: number;
  TimeRunning: boolean;
  Modal1: boolean;
  Key: number;

  Hours: number;
  Miniut: number;
  Secound: number;

  initPanicAlert: boolean;

  hoursArray: Array<string>;
  miniutArray: Array<string>;
  secondArray: Array<string>;
  Totalsec: number;
  userData: any;
  selectedItemIndex: number;
  cancelButton: boolean;
  PanicID: any;
  UserProfile: any;
  Loader: boolean;
  Latitude: any;
  Longitude: any;
}

interface SS {
  id: any;
}

export default class TimeToAlertController extends BlockComponent<
  Props,
  S,
  SS
> {
  DonationGetId: any;
  focusListener: any;

  FiredataID: any = "";
  ProfileGetId: any;
  callRefInput: any;
  PanicAgainId: any = "";

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.RestAPIResponceDataMessage),
      getName(MessageEnum.RestAPIResponceSuccessMessage),
      getName(MessageEnum.RestAPIResponceErrorMessage),
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      getName(MessageEnum.RestAPIRequestMessage),
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      getName(MessageEnum.RestAPIRequestMethodMessage),
    ];

    this.state = {
      token: "",
      TimerStaus: 0,
      TimeRunning: false,
      Modal1: false,
      Key: 0,

      Hours: 0,
      Miniut: 0,
      Secound: 0,

      initPanicAlert: false,

      hoursArray: [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
      ],
      miniutArray: [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
        "32",
        "33",
        "34",
        "35",
        "36",
        "37",
        "38",
        "39",
        "40",
        "41",
        "42",
        "43",
        "44",
        "45",
        "46",
        "47",
        "48",
        "49",
        "50",
        "51",
        "52",
        "53",
        "54",
        "55",
        "56",
        "57",
        "58",
        "59",
      ],
      secondArray: [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
        "32",
        "33",
        "34",
        "35",
        "36",
        "37",
        "38",
        "39",
        "40",
        "41",
        "42",
        "43",
        "44",
        "45",
        "46",
        "47",
        "48",
        "49",
        "50",
        "51",
        "52",
        "53",
        "54",
        "55",
        "56",
        "57",
        "58",
        "59",
      ],

      Totalsec: 0,
      userData: {},

      selectedItemIndex: 0,
      cancelButton: false,
      PanicID: "",
      UserProfile: {},
      Loader: false,
      Latitude: 0,
      Longitude: 0,
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  children = (remainingTime: any) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    let secc = "";
    if (seconds < 10) {
      secc = "0" + seconds;
    } else {
      secc = "" + seconds;
    }

    let Min = "";
    if (minutes < 10) {
      Min = "0" + minutes;
    } else {
      Min = "" + minutes;
    }

    return `${Min}:${secc}`;
  };

  children1 = (remainingTime: any) => {
    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;

    let secc = "";
    if (seconds < 10) {
      secc = "0" + seconds;
    } else {
      secc = "" + seconds;
    }

    let Min = "";
    if (minutes < 10) {
      Min = "0" + minutes;
    } else {
      Min = "" + minutes;
    }
    return `${hours}:${Min}:${secc}`;
  };

  async CheckPermission() {
    if (Platform.OS === "android") {
      request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
        console.log("Permission---", result);
        switch (result) {
          case RESULTS.UNAVAILABLE:
            Alert.alert("Please Enable GPS permission to use this app");
            break;
          case RESULTS.DENIED:
            Alert.alert(
              "Hold on!",
              "please give permission to access your location",
              [{ text: "Setting", onPress: () => Linking.openSettings() }]
            );
            break;
          case RESULTS.BLOCKED:
            Alert.alert(
              "Hold on!",
              "Please give permission to access your location",
              [{ text: "Setting", onPress: () => Linking.openSettings() }]
            );
            break;
        }
      });
    } else {
      request(PERMISSIONS.IOS.LOCATION_ALWAYS).then((result) => {
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
              [{ text: "Setting", onPress: () => Linking.openSettings() }]
            );
            break;
        }
      });
    }
  }

  async componentDidMount() {
    this.CheckPermission();

    const data = await AsyncStorage.getItem("User_Data");
    if (data !== null) { 
      this.setState({ userData: JSON.parse(data) });
    }

    GetLocation.getCurrentPosition({
      enableHighAccuracy: false,
      timeout: 20000,
    })
      .then((location) => {
        console.log("locationlocation", location);
        let currentLongitude = location.longitude;
        let currentLatitude = location.latitude;
        this.setState({
          Latitude: currentLatitude,
          Longitude: currentLongitude,
        });
      })
      .catch((error) => {
        
        
      });

    let TOKEN = await AsyncStorage.getItem("Token");
    this.setState({ token: TOKEN });

    this.GetProfile();
    this.call();

  

    this.focusListener = this.props.navigation.addListener(
      "focus",
      async () => {
        this.setState({
          Hours: 0,
          Miniut: 0,
          Secound: 0,
          Key: this.state.Key + 1,
          TimeRunning: false,
          Totalsec: 0,
          Modal1: false,
          TimerStaus: 0,
        });
      }
    );
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

      if (apiRequestCallId === this.ProfileGetId) {
        if (
          responseJson != null &&
          !responseJson.error &&
          !responseJson.errors
        ) {
          this.setState({
            UserProfile: responseJson.data.attributes,
            // loader: false,
          });
          console.log(
            "responseDATA+++++++>>>>>>>123",
            JSON.stringify(responseJson.data.attributes)
          );
        } else {
          console.log("error");
          setTimeout(() => {
            this.parseApiErrorResponse(responseJson);
          }, 500);
        }
      }

      this.receiveFireDataId(apiRequestCallId, responseJson, errorReponse);

      if (apiRequestCallId === this.PanicAgainId) {
        if (responseJson !== null) {
          this.setState({ Loader: false });
        }
      }

    }
  }



  receiveFireDataId = (apiRequestCallId:any, responseJson:any, errorReponse:any) => {
    if (apiRequestCallId === this.FiredataID) {
      if (responseJson != null) {
        console.log(
          "New Response Data",
          JSON.stringify(responseJson),
          "<----------"
        );
        AsyncStorage.setItem(
          "PanicGroup",
          JSON.stringify(responseJson.account.data?.attributes)
        );

        if (responseJson.message == "Incident has been created!") {
          this.setState({ Loader: false });
          const { navigation }: any = this.props;
          console.log(responseJson.account.data.id, "panic_situation_new---");

          AsyncStorage.setItem(
            "panic_situation_new",
            JSON.stringify(responseJson.account.data.id)
          );
            console.log(
              "Panic id-->> ",
               AsyncStorage.getItem("panic_situation_new")
            );
          this.setState({ PanicID: responseJson.account.data.id });

        
          navigation.navigate("AlarmActive", { from: "Fire" });
        } else {
          this.setState({ Loader: false });
          Alert.alert(responseJson.errors[0].description);
        }
      } else {
        console.log("errorFireApi", errorReponse);
        setTimeout(() => {
          this.parseApiErrorResponse(errorReponse);
        }, 500);
      }
    }
  }

  Fire_api() {
    console.log("New Data Token", this.state.token);
    this.setState({ Loader: true });
    const header = {
      "Content-Type": configJSON.FireApiContentType,
      token: this.state.token,
    };

    let ad = [];

 

    let attrs: any;
   
    attrs = {
      latitude: this.state.Latitude,
      longitude: this.state.Longitude,
    };

    AsyncStorage.setItem("AlertData", JSON.stringify(attrs));
    const data1 = {
      attributes: attrs,
    };
    const httpBody = {
      data: data1,
    };
    console.log(httpBody, "httpBody-TTAC-359");

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.FiredataID = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.FireAPiEndPoint
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
      configJSON.FireAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  
  }

  GetProfile = () => {
    const header = {
      "Content-Type": configJSON.GetProfileApiContentType,
      token: this.state.token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.ProfileGetId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.urlGetProfile
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.GetProfileApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  async OnPanicAgain(Distance?: any) {
    console.log("Distance---------", Distance);

    console.log("P_iddddd----", this.state.PanicID);

    callCount += 1;
    this.setState({ Loader: true });
    const header = {
      "Content-Type": configJSON.PanicAgainApiContentType,
      token: this.state.token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.PanicAgainId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.PanicAgainAPiEndPoint}/${this.state.PanicID}?distance=${Distance}`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.PanicAgainAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }
  
  async OnPanicTimer() {
    let get: any = await AsyncStorage.getItem("IsNotify");
    console.log("GetNotifyAsyncPaanictimer", get == "true");
    timeo = setTimeout(() => {
      if (get != "true") {
        console.log("Accepted!!");
        if (callCount == 0) {
          this.OnPanicAgain(25);
          this.OnPanicTimer();
          console.log("Function Called-1", callCount);
        } else if (callCount == 1) {
          this.OnPanicAgain(50);
          console.log("Function Called-2", callCount);
          clearTimeout(timeo);
        }

        
      }
    }, 15000);
  }

  async onComplete() {
    this.setState({
      TimeRunning: false,
      Modal1: true,
      TimerStaus: 0,
      Hours: 0,
      Miniut: 0,
      Secound: 0,
    });
  }
  startclick() {
    let H = this.state.Hours;
    let M = this.state.Miniut;
    let S = this.state.Secound;

    let totalH = "";
    if (H < 10) {
      totalH = "0" + H;
    } else {
      totalH = "" + H;
    }
    let totalM = "";
    if (M < 10) {
      totalM = "0" + M;
    } else {
      totalM = "" + M;
    }
    let totalS = "";
    if (S < 10) {
      totalS = "0" + S;
    } else {
      totalS = "" + S;
    }

    let hms = totalH + ":" + totalM + ":" + totalS;
    let a = hms.split(":");
    let Total = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];

    if (Total != 0) {
      this.setState({ TimerStaus: 1, TimeRunning: true, Totalsec: Total });
    } else {
      Alert.alert("Please select the time");
    }
  }

  Cancelcall() {
    this.setState({
      cancelButton: false,
      TimerStaus: 0,
      Hours: 0,
      Miniut: 0,
      Secound: 0,
    });
  }
  goback() {
    const { navigation }: Props = this.props;
    navigation.goBack();
  }

  async initPanicAlarm() {
    this.setState({ Modal1: false, initPanicAlert: true }, () => {
      const inittPanicAlert = this.state.initPanicAlert;
      if (!inittPanicAlert) {
        console.log("chacha");
      } else {
        console.log("mama", this.state.userData);
        let get: any = AsyncStorage.getItem("IsNotify");
        console.log("GetNotifyAsync", get);
        this.Fire_api();
        this.OnPanicTimer();
      }
    });
  }

  pressYes() {
    this.callRefInput.current?.pause();
    this.setState({ Modal1: false });
  }
}
// Customizable Area End
