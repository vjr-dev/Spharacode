// Customizable Area Start
//@ts-ignore
//@ts-nocheck
import { IBlock } from "../../../framework/src/IBlock";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { Alert, Linking, PermissionsAndroid, Platform } from "react-native";
import {
  PorcupineManager,
  BuiltInKeywords,
  PorcupineErrors,
} from "@picovoice/porcupine-react-native";

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  route: any;
}

interface S {
  Loader: boolean;
  List: any;
  List2: any;
  Selectedname: any;
  SelectedID: any;
  buttonlist: any;
  data1: any;
  data2: any;
  data3: any;
  show: boolean;
  LableID: any;
  pitch: any;
  error: any;
  end: any;
  started: any;
  results: any;
  partialResults: any;
  TapPress: boolean;
  SpeechEnd: boolean;
  NewData: any;
  NID: any;
  dataFrom: any;
  ActivatedPhase: any;
  isCodeSelected: boolean;
  isCodeActivated: boolean;
  selectedSubTitle: string;
  isModalVisible: boolean;
  iscodeDetected: boolean;

  // For testing
  buttonText: string;
  buttonDisabled: boolean;
  picovoiceText: string;
  isListening: boolean;
  isError: boolean;
  errorMessage: string;
  flag: string;
}

interface SS {
  id: any;
}

export default class VoiceActivationController extends BlockComponent<
  Props,
  S,
  SS
> {
  apiEmailLoginCallId: any = "";
  focusListener: any;
  _timeoutRef = null;

  _porcupineManager: PorcupineManager | undefined;
  // _accessKey: string =
  //   "pBc0lPgx+7dlY+d+7xGiXLWd8VtKPwZ64Zjd/kCZbendAFjKA0EHGg==";
  
  //** IMPORTANT NOTE **//
  
  //I am using free trial account for this and it allow us to create 3 files only so
  //I have create 3 files from per account so 3 sound file for ios and 3 files for android,
  //That's why here different access key are used.
  _accessKey: string =
    Platform.OS == "android"
      ? "pBc0lPgx+7dlY+d+7xGiXLWd8VtKPwZ64Zjd/kCZbendAFjKA0EHGg=="
      : "GtRx9xd9gZBeZntTqQzNj7NVtXaGmc2owVdKXpRMadui/Wgbd109bA==";

  codeRed = `red_code_${Platform.OS}.ppn`;
  codeSilver = `silver_code_${Platform.OS}.ppn`;
  codeWhite = `white_code_${Platform.OS}.ppn`;

  data = [this.codeRed, this.codeSilver, this.codeWhite];

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
      List: [
        { id: 1, name: "code red", sub_title: "for fire/smoke", Tested: false },
        {
          id: 2,
          name: "code white",
          sub_title: "for violent situation",
          Tested: false,
        },
        {
          id: 3,
          name: "code silver",
          sub_title: "Person with a weapon",
          Tested: false,
        },
        {
          id: 4,
          name: "code blue",
          sub_title: "Cardiac Arrest/Medical Emergency",
          Tested: false,
        },
        {
          id: 5,
          name: "code black",
          sub_title: "Bomb threat/Suspicious object",
          Tested: false,
        },
        {
          id: 6,
          name: "other",
          sub_title: "Choose your custom code",
          Tested: false,
        },
      ],
      data1: [
        { id: 1, name: "Press the power button 3 time" },
        { id: 2, name: "Press the power button 5 time" },
        { id: 3, name: "Press the power button 3 second" },
        { id: 4, name: "Press the power button 5 second" },
        { id: 5, name: "Disable" },
      ],
      data2: [
        { id: 6, name: "Press the volume up button 3 time" },
        { id: 7, name: "Press the volume up button 5 time" },
        { id: 8, name: "Press the volume up button 3 second" },
        { id: 9, name: "Press the volume up button 5 second" },
        { id: 10, name: "Disable" },
      ],
      data3: [
        { id: 11, name: "Press the volume down button 3 time" },
        { id: 12, name: "Press the volume down button 5 time" },
        { id: 13, name: "Press the volume down button 3 second" },
        { id: 14, name: "Press the volume down button 5 second" },
        { id: 15, name: "Disable" },
      ],
      Selectedname: "Select code",
      SelectedID: 0,
      buttonlist: true,
      show: false,
      LableID: 0,
      pitch: "",
      error: "",
      end: "",
      started: "",
      results: [],
      partialResults: [],
      TapPress: false,
      SpeechEnd: false,
      NewData: [],
      NID: 0,
      dataFrom: [],
      ActivatedPhase: [],
      isCodeSelected: false,
      isCodeActivated: false,
      selectedSubTitle: "",
      isModalVisible: false,
      iscodeDetected: false,

      // for testing
      buttonText: "Start",
      buttonDisabled: false,
      picovoiceText: "",
      isListening: false,
      isError: false,
      errorMessage: "",
      flag: "start",
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount(): Promise<void> {
    // this.setState({ dataFrom: this.props.navigation.state.params.dt });

    // this.focusListener = this.props.navigation.addListener(
    //   "didFocus",
    //   async () => {
    //     this.getData();
    //   }
    // );

    this._loadNewKeyword(this.codeRed);
  }

  componentWillUnmount() {
    if (this.state.isListening) {
      this._stopProcessing();
    }
    this._porcupineManager?.delete();
  }

  // getData = async () => {
  //   const activatedPharse: any = await AsyncStorage.getItem("ActivatedPharse");
  //   let dg: any = JSON.parse(activatedPharse);
  //   this.setState({ ActivatedPhase: dg });
  // };

  listCall(item: any) {
    this.setState({
      Selectedname: item.name,
      SelectedID: item.id,
      selectedSubTitle: item.sub_title,
      buttonlist: true,
      show: true,
    });
  }

  goback() {
    const { navigation }: any = this.props;
    navigation.goBack();
  }

  showPoup = () => {
    this.setState({ isModalVisible: true });
  };

  actionOnContinue = () => {
    this.setState({ isModalVisible: false });
    this.props.navigation.navigate("SettingScreen");
  };

  async _startProcessing() {
    let recordAudioRequest;
    if (Platform.OS === "android") {
      recordAudioRequest = this._requestRecordAudioPermission();
    } else {
      recordAudioRequest = new Promise(function(resolve, _) {
        resolve(true);
      });
    }

    recordAudioRequest.then((hasPermission) => {
      if (!hasPermission) {
        Alert.alert("Alert!!", "Microphone permission required!!", [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => Linking.openSettings() },
        ]);
        return;
      }

      this._porcupineManager?.start().then((didStart) => {
        if (didStart) {
          this.setState({
            flag: "inProgress",
            buttonText: "Stop",
            buttonDisabled: false,
            isListening: true,
          });
        }
      });

      setTimeout(() => {
        if (!this.state.iscodeDetected) this._stopProcessing();
      }, 4000);
    });
  }

  _stopProcessing() {
    this.setState({
      buttonDisabled: true,
      flag: "start",
      isListening: false,
    });

    this._porcupineManager?.stop().then((didStop) => {
      if (didStop) {
        this.setState({
          buttonText: "Start",
          buttonDisabled: false,
          isListening: false,
        });
      }
    });
  }

  async _loadNewKeyword(keyword: string | BuiltInKeywords) {
    if (this.state.isListening) {
      this._stopProcessing();
    }
    this._porcupineManager?.delete();

    const detectionCallback = (keywordIndex: number) => {
      this.setState({ flag: "success", iscodeDetected: true });
      let result = this.data[keywordIndex].split("_")[0];

      const filteredObject = this.state.List.find((obj: any) =>
        obj.name.includes(result)
      );
      this.setState({
        Selectedname: filteredObject?.name,
        SelectedID: filteredObject?.id,
        selectedSubTitle: filteredObject?.sub_title,
      });
    };

    const processErrorCallback = (error: PorcupineErrors.PorcupineError) => {
      this._stopProcessing();
      this.setState({
        isError: true,
        errorMessage: error.message,
        flag: "start",
      });
    };

    try {
      this._porcupineManager = await PorcupineManager.fromKeywordPaths(
        this._accessKey,
        this.data,
        detectionCallback,
        processErrorCallback
        // modelPath,
      );
    } catch (err) {
      let errorMessage = "";
      if (err instanceof PorcupineErrors.PorcupineInvalidArgumentError) {
        errorMessage = `${err.message}\nPlease make sure accessKey ${this._accessKey} is a valid access key.`;
      } else if (err instanceof PorcupineErrors.PorcupineActivationError) {
        errorMessage = "AccessKey activation error";
      } else if (err instanceof PorcupineErrors.PorcupineActivationLimitError) {
        errorMessage = "AccessKey reached its device limit";
      } else if (
        err instanceof PorcupineErrors.PorcupineActivationRefusedError
      ) {
        errorMessage = "AccessKey refused";
      } else if (
        err instanceof PorcupineErrors.PorcupineActivationThrottledError
      ) {
        errorMessage = "AccessKey has been throttled";
      } else {
        errorMessage = err.toString();
      }

      this.setState({
        isError: true,
        errorMessage: errorMessage,
      });
    }
  }

  async _requestRecordAudioPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: "Microphone Permission",
          message:
            "Sphara needs access to your microphone to listen for wake words.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      this.setState({
        isError: true,
        errorMessage: err.toString(),
      });
      return false;
    }
  }
}
// Customizable Area End