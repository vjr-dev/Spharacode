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
import { Alert, AppState, Linking, Platform } from "react-native";
import RNAndroidLocationEnabler from "react-native-android-location-enabler";
import GetLocation from "react-native-get-location";
import RNImmediatePhoneCall from "react-native-immediate-phone-call";
import {
  checkMultiple,
  PERMISSIONS,
  request,
  RESULTS,
} from "react-native-permissions";
import Sound from "react-native-sound";
import SystemSetting from "react-native-system-setting";
let interval: number;
let whoosh: any;

export const configJSON = require("./config");
const baseURL = require("../../../framework/src/config");
export interface Props {
  navigation: any;
  id: string;
}

export interface S {
  dashboardData: any;
  token: string;
  errorMsg: string;
  loading: boolean;
  Token: any;
  userdata: any;
  imageWidth: any;
  imageHeight: any;
  isEmergencyScreenV: boolean;
  currentVolume: number;
  previousVolume: number;
  volumeUpTriggerCount: number;
  volumeDownTriggerCount: number;
  currentdate_up: Date;
  changeddate_up: Date;
  currentdate_down: Date;
  changeddate_down: Date;
  Latitude: any;
  Longitude: any;
  PercentageData: any;
  Isvolunteer: any;
  switch1: any;
  switch2: any;
  ModalShow: boolean;
  AudioFile: any;
}

interface SS {
  id: any;
}

export default class DashboardController extends BlockComponent<Props, S, SS> {
  getListId: any = "";
  LocationApiID: any = "";
  GetPercentage: any = "";
  GetVolunteerID: any = "";
  volEvent: any;
  shakeEvent: any;
  focusListener: any;
  appStateSubscription: any;
  interval: number;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    console.disableYellowBox = true;

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIRequestMessage),
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      getName(MessageEnum.RestAPIRequestBodyMessage),
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      getName(MessageEnum.RestAPIRequestMethodMessage),
      getName(MessageEnum.RestAPIResponceDataMessage),
      getName(MessageEnum.RestAPIResponceErrorMessage),
    ];

    this.state = {
      dashboardData: [],
      errorMsg: "",
      token: "",
      loading: false,
      Token: "",
      userdata: "",
      isEmergencyScreenV: false,
      imageWidth: 0,
      imageHeight: 0,
      currentVolume: 0,
      previousVolume: 0,
      volumeUpTriggerCount: 0,
      volumeDownTriggerCount: 0,
      currentdate_up: new Date(),
      changeddate_up: new Date(),
      currentdate_down: new Date(),
      changeddate_down: new Date(),
      Latitude: 0,
      Longitude: 0,
      PercentageData: "",
      Isvolunteer: 0,
      switch1: false,
      switch2: false,
      ModalShow: false,
      AudioFile: require("../../../mobile/sample.mp3"),
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived-DBC-136", message);

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

      console.log("ErrorREspones", errorReponse);

      if (apiRequestCallId === this.GetVolunteerID) {
        if (responseJson != null) {
          console.log("ResponseJSon-GetVolunteerID", responseJson);
        }
      }

      if (apiRequestCallId === this.GetPercentage) {
        if (responseJson != null) {
          console.log(
            "ResponseJSon-GetPercentage",
            responseJson.profile_percentage
          );
          this.setState({ PercentageData: responseJson.profile_percentage });
          await AsyncStorage.setItem(
            "Percentage",
            JSON.stringify(responseJson.profile_percentage)
          );
        }
      }

      await this.receiveGetListId(apiRequestCallId, responseJson)



    }
  }


  async receiveGetListId(apiRequestCallId: any, responseJson: any) {
    if (apiRequestCallId === this.getListId) {
      if (responseJson != null) {
        if (responseJson.errors != null) {
          console.log("testing");
        } else {
          this.setState({ userdata: responseJson.data.attributes });
          await this.sahck();
        }
      }
    }
  }


  openModal(visible: boolean) {
    this.setState({ ModalShow: true });
  }

  async CheckPermission() {
    if (Platform.OS === "android") {
      await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            Alert.alert("Please Enable GPS permission to use this app");
            break;
          case RESULTS.DENIED:
            Alert.alert(
              "Hold on!",
              "please give permission to access your location",
              [{ text: "Setting", onPress: () => void Linking.openSettings() }]
            );
            break;
          case RESULTS.BLOCKED:
            Alert.alert(
              "Hold on!",
              "Please give permission to access your location",
              [{ text: "Setting", onPress: () => void Linking.openSettings() }]
            );
            break;
        }
      });
    } else {
      await request(PERMISSIONS.IOS.LOCATION_ALWAYS).then((result) => {
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
              [{ text: "Setting", onPress: () => void Linking.openSettings() }]
            );
            break;
        }
      });
    }
  }

  getPermissions = async () => {
    await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000,
    }).then(async (data) => {
      if (data === "already-enabled") {
        await this.getlocationdata();
      } else {
        setTimeout(() => { }, 1000);
      }
    });
  };

  async componentDidMount() {
    if (Platform.OS == "android") {
      await this.getPermissions();
    }
    await checkMultiple([
      PERMISSIONS.IOS.LOCATION_ALWAYS,
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    ]).then((statuses) => {
      console.log(
        "IOS.LOCATION_ALWAYS",
        statuses[PERMISSIONS.IOS.LOCATION_ALWAYS]
      );
      console.log(
        "IOS.LOCATION_ALWAYS",
        statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]
      );
    });
    await this.CheckPermission();

    this.setState({ Token: await AsyncStorage.getItem("Token") });
    console.log("FocusLogToken", await AsyncStorage.getItem("Token"));
    this.appStateSubscription = AppState.addEventListener(
      "change",
      (nextAppState) => {
        if (
          this.state.Token &&
          // this.state.appState.match(/inactive|background/) &&
          nextAppState === "active"
        ) {
          // console.log("appstate()()(", nextAppState)
        }
      }
    );

    await this.Firstapi();
    await this.getPercentage();
    // await this.getVoluneer()
    await this.VolumeEvents();
    // this.Firstapi()

    this.focusListener = this.props.navigation.addListener(
      "focus",
      async () => {
        console.log("FocusLogToken", await AsyncStorage.getItem("Token"));
        this.setState({ Token: await AsyncStorage.getItem("Token") });
        await this.Firstapi();
        await this.getPercentage();
        await this.CheckPermission();
        // await this.getVoluneer()
        await this.VolumeEvents();
      }
    );
  }

  async getVoluneer(token?: any) {


    const header = {
      "Content-Type": configJSON.GetVolunteerContentType,
      token: this.state.Token || token,
    };

    const attrs = {
      account_type: this.state.Isvolunteer,
    };

    const data = {
      attributes: attrs,
    };

    const httpBody = {
      data: data,
    };


    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.GetVolunteerID = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.GetVolunteerEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.GetVolunteerAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  async getPercentage(token?: any) {


    const header = {
      "Content-Type": configJSON.GetPercentageContentType,
      token: this.state.Token || token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.GetPercentage = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.GetPercentageEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.GetPercentageAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }

  async getlocationdata() {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: false,
      timeout: 20000,
    })
      .then(async (location) => {

        this.setState({
          Latitude: location.latitude,
          Longitude: location.longitude,
        });
        await this.locationAPI();
      })
      .catch((error) => {

      });
  }
  async locationAPI(token?: any) {
    let myHeaders = JSON.stringify({
      token: this.state.Token || token,
      "Content-Type": "application/json",
    });
    let raw = JSON.stringify({
      data: {
        attributes: {
          latitude: this.state.Latitude,
          longitude: this.state.Longitude,
        },
      },
    });
    let requestOptions: any = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `${baseURL.baseURL}/account_block/accounts/personal_information`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  async VolumeEvents(lableID?: any) {
    if (lableID != undefined) {
      await AsyncStorage.setItem("VolumeButtonPressedID", lableID);
    }
    await SystemSetting.getVolume().then((volume) => {
      this.setState({ currentVolume: volume });
    });
    this.volEvent = SystemSetting.addVolumeListener(this.volumeEventFunction);
  }

  volumeEventFunction: (data: any) => void = async (data) => {
    const changedVolume = data.value;
    this.setState({
      previousVolume: this.state.currentVolume,
      currentVolume: changedVolume,
    });
    if (this.state.previousVolume !== changedVolume) {
      let previousVolume = this.state.previousVolume;

      if (changedVolume > previousVolume) {
        this.setState({
          volumeUpTriggerCount: this.state.volumeUpTriggerCount + 1,
          volumeDownTriggerCount: 0,
        });
        const time = new Date();
        this.setState({
          currentdate_up: time,
          changeddate_up: this.state.currentdate_up,
        });
        let b: any = this.state.currentdate_up;
        let a: any = this.state.changeddate_up;
        let difference = Math.floor((b - a) / 1000);
        let changedValue = await AsyncStorage.getItem(
          "VolumeButtonPressedID"
        );

        if (this.state.volumeUpTriggerCount !== 1) {
          console.log("----callings");

          if (difference > 0) {
            this.setState({ volumeUpTriggerCount: 1 });
          }
        }

        if (
          changedValue
            ? changedValue === "press_button_for_3_times"
            : this.state.userdata.trigger_type == "press_button_for_3_times"
        ) {
          console.log("Volume is", this.state.volumeUpTriggerCount);
          if (this.state.volumeUpTriggerCount === 3) {
            this.setState({ volumeUpTriggerCount: 0 });
            this.props.navigation.navigate("CfCustomAlerts2");
          }
        } else if (
          changedValue
            ? changedValue === "press_button_for_5_times"
            : this.state.userdata.trigger_type == "press_button_for_5_times"
        ) {
          if (this.state.volumeUpTriggerCount === 5) {
            this.setState({ volumeUpTriggerCount: 0 });
            this.props.navigation.navigate("CfCustomAlerts2");
          }
        }
      } else {
        this.setState({
          volumeUpTriggerCount: 0,
          volumeDownTriggerCount: this.state.volumeDownTriggerCount + 1,
        });
        const time = new Date();
        this.setState({
          currentdate_down: time,
          changeddate_down: this.state.currentdate_down,
        });
        let c: any = this.state.currentdate_down;
        let d: any = this.state.changeddate_down;
        let difference1 = Math.floor((c - d) / 1000);
        let changedValue = await AsyncStorage.getItem(
          "VolumeButtonPressedID"
        );
        if (this.state.volumeDownTriggerCount !== 1) {
          if (difference1 > 0) {
            this.setState({ volumeDownTriggerCount: 1 });
          }
        }
        if (
          changedValue
            ? changedValue === "press_button_for_3_times"
            : this.state.userdata.trigger_type == "press_button_for_3_times"
        ) {
          if (this.state.volumeDownTriggerCount === 3) {
            this.setState({ volumeDownTriggerCount: 0 });
            this.props.navigation.navigate("CfCustomAlerts2");
          }
        } else if (
          changedValue
            ? changedValue === "press_button_for_5_times"
            : this.state.userdata.trigger_type == "press_button_for_5_times"
        ) {
          if (this.state.volumeDownTriggerCount === 5) {
            this.setState({ volumeDownTriggerCount: 0 });
            this.props.navigation.navigate("CfCustomAlerts2");
          }
        }
      }
    }
  }



  async componentWillUnmount() {
    // remove event listener
    console.log("---caling", SystemSetting);
    SystemSetting.removeVolumeListener(this.volEvent);
    this.appStateSubscription().remove();
    whoosh?.release();
    clearInterval(interval);
  }

  async onPanicSirenToggle(Vala: any) {
    console.log("State_val of vala", Vala);
    this.setState({ switch2: Vala });
    await AsyncStorage.setItem("PanicSirenValue", JSON.stringify(Vala));

    if (Vala == true) {
      Sound.setCategory("Playback");

      whoosh = new Sound("sample.mp3", Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log("failed to load the sound", error);
          return;
        }

        console.log(
          "duration in seconds: " +
          whoosh.getDuration() +
          "number of channels: " +
          whoosh.getNumberOfChannels()
        );

        whoosh.play(async (success) => {
          if (success) {
            console.log("successfully finished playing");
          } else {
            console.log("playback failed due to audio decoding errors");
          }
        });
      });
    } else {
      whoosh?.stop(() => { });
    }
  }

  TempClick() {
    whoosh?.stop(() => { });
    console.log("whoosh_stop called!");
  }

  async sahck() {
    if (
      this.state.userdata?.horizontal_gesture == true ||
      this.state.userdata?.vertical_gesture == true
    ) {
      console.log(
        "horizontal_gesture  = ",
        this.state.userdata.horizontal_gesture,
        "vertical_gesture =",
        this.state.userdata.vertical_gesture
      );
      let aa = 0;
    } else {
      console.log("FFF---------------------------------------");
    }
  }

  onLayout = (event: any) => {
    const { height, width } = event.nativeEvent.layout;
    this.setState({
      imageWidth: width,
      imageHeight: height,
    });
  };

  async Firstapi(token?: any) {
    console.log("73872987678880", this.state.Token);

    const header = {
      "Content-Type": configJSON.GetdataContentType,
      token: this.state.Token || token,
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

  customformScreenClick(id: number) {
    const { navigation }: any = this.props;
    navigation.navigate("Costomform", { cusId: id });
  }

  async onCallPolice() {
    const data = await AsyncStorage.getItem("User_Data");
    if (data != null) {
      if (Platform.OS == "android") {
        RNImmediatePhoneCall.immediatePhoneCall(
          JSON.parse(data)?.data?.attributes?.police_number
        );
      } else {
        try {
          await Linking.openURL(
            `telprompt:${JSON.parse(data)?.data?.attributes?.police_number}`
          );
        } catch (error) {
          console.log("error", error)
        }

      }
    }
  }
}
// Customizable Area End
