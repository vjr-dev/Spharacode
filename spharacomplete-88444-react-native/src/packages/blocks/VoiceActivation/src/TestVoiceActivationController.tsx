// Customizable Area Start
import { IBlock } from "framework/src/IBlock";
import { BlockComponent } from "framework/src/BlockComponent";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import { runEngine } from "framework/src/RunEngine";
import Voice from "@react-native-community/voice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  route:any;
}

interface S {
  Loader: boolean;
  List: any;
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
}

interface SS {
  id: any;
}

export default class Loginscreen extends BlockComponent<Props, S, SS> {
  apiEmailLoginCallId: any = "";
  focusListener: any;

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
      Loader: false,
      List: [
        { id: 1, name: "code red", sub_title: "for fire/smoke", Tested: false },
        {
          id: 2,
          name: "code white",
          sub_title: "for violent situation",
          Tested: false
        },
        {
          id: 3,
          name: "code silver",
          sub_title: "Person with a weapon",
          Tested: false
        },
        {
          id: 4,
          name: "code blue",
          sub_title: "Cardiac Arrest/Medical Emergency",
          Tested: false
        },
        {
          id: 5,
          name: "code black",
          sub_title: "Bomb threat/Suspicious object",
          Tested: false
        },
        {
          id: 6,
          name: "other",
          sub_title: "Choose your custom code",
          Tested: false
        }
      ],
      data1: [
        { id: 1, name: "Press the power button 3 time" },
        { id: 2, name: "Press the power button 5 time" },
        { id: 3, name: "Press the power button 3 second" },
        { id: 4, name: "Press the power button 5 second" },
        { id: 5, name: "Disable" }
      ],
      data2: [
        { id: 6, name: "Press the volume up button 3 time" },
        { id: 7, name: "Press the volume up button 5 time" },
        { id: 8, name: "Press the volume up button 3 second" },
        { id: 9, name: "Press the volume up button 5 second" },
        { id: 10, name: "Disable" }
      ],
      data3: [
        { id: 11, name: "Press the volume down button 3 time" },
        { id: 12, name: "Press the volume down button 5 time" },
        { id: 13, name: "Press the volume down button 3 second" },
        { id: 14, name: "Press the volume down button 5 second" },
        { id: 15, name: "Disable" }
      ],
      Selectedname: "Select Code",
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
      ActivatedPhase: []
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount(): Promise<void> {
    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechEnd = this.onSpeechEnd;
    Voice.onSpeechError = this.onSpeechError;
    Voice.onSpeechPartialResults = this.onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;

    this.setState({ dataFrom: this.props.route.params.dt });

    this.focusListener = this.props.navigation.addListener(
      "focus",
      async () => {
        await this.getData();
      }
    );
  }

  getData = async () => {
    const ActivatedPharse: any = await AsyncStorage.getItem("ActivatedPharse");
    let dg: any = JSON.parse(ActivatedPharse);
    this.setState({ ActivatedPhase: dg });
  };

  async ActivatePress() {
   await AsyncStorage.setItem(
      "ActivatedPharse",
      JSON.stringify(this.state.dataFrom)
    );
    Alert.alert("Alert", "Activated Successfully!", [
      {
        text: "OK",
        onPress: () => this.props.navigation.goBack()
      }
    ]);
  }

  goback() {
    const { navigation }: any = this.props;
    navigation.goBack();
  }

  onRecognizing = () => {};

  onSpeechStart = () => {
    this.setState({ started: "True" });
  };

  onSpeechEnd = () => {
    this.setState({ started: null, end: "True" });
  };

  onSpeechError = (e: any) => {
    this.onSpeechEnd();
    this.setState({ error: JSON.stringify(e.error), TapPress: false });
  };

  onSpeechResults = async (e: any) => {
    const NID: any = await AsyncStorage.getItem("NID");
    let value_Id = JSON.parse(NID);
    if (e.value.includes(this.state.dataFrom.name)) {
      let value: any = this.state.List;
      value[value_Id].Tested = true;
      this.setState({ List: value, SpeechEnd: true });
      await AsyncStorage.setItem("VoiceData", JSON.stringify(value));
      this.setState({ List: this.state.List, results: e.value });
    } else {
      Alert.alert("Selected pharse not matched");
      this.setState({ TapPress: false });
    }
  };

  onSpeechPartialResults = (e: any) => {
    this.setState({ partialResults: e.value });
  };

  onSpeechVolumeChanged = (e: any) => {
    this.setState({ pitch: e.value });
  };

  startSpeechRecognizing = async () => {
    this.setState({
      pitch: "",
      error: "",
      started: "",
      results: [],
      partialResults: [],
      end: "",
      TapPress: true
    });
    try {
      await Voice.start("en-US", {
        EXTRA_SPEECH_INPUT_MINIMUM_LENGTH_MILLIS: 10000
      });
    } catch (error) {
      console.error(error);
    }
  };
}
// Customizable Area End