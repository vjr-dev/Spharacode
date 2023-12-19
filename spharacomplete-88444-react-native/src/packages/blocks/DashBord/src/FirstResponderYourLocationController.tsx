import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { getCurrentLocation } from "../../../components/src/GettLocation";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

export interface S {
  // Customizable Area Start
  userLatitude: any;
  userLongitude: any;
  currentLatitude: any;
  currentLongitude: any;
  locationStatus: string;
  reportModal: boolean;
  currentAlertData: any;
  reaciptData: any;
  isLoading: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class FirstResponderYourLocationController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getListId: any = "";
  LocationApiID: any = "";
  GetPercentage: any = "";
  GetVolunteerID: any = "";
  volEvent: any;
  shakeEvent: any;
  focusListener: any;
  appStateSubscription: any;
  interval: any;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      // Customizable Area Start
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
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      userLatitude: "",
      userLongitude: "",
      currentLatitude: "",
      currentLongitude: "",
      //@ts-ignore
      locationStatus: this.props.route.params?.locationStatus,
      reportModal: false,
      currentAlertData: "",
      reaciptData: "",
      isLoading: true,
      // Customizable Area End
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Recived", message);
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    const alertData: any = await AsyncStorage.getItem("CurrentAlertData");
    const firstResponerData: any = await AsyncStorage.getItem("ReaciptData");
    this.setState({
      currentAlertData: JSON.parse(alertData),
      reaciptData: JSON.parse(firstResponerData),
    });

    await getCurrentLocation().then((location: any) => {
      this.setState({
        currentLatitude: location.latitude,
        currentLongitude: location.longitude,
        isLoading: false,
      });
    });
  }

  onChatPress = () => {
    if (this.state.currentAlertData?.group_information?.data?.guid) {
      this.props.navigation.navigate("ConversationScreen", {
        chatNumber: this.state.currentAlertData?.group_information.data.guid,
        mainConversationId: this.state.currentAlertData?.group_information.data
          ?.conversationId,
        userName: this.state.currentAlertData?.group_information.data?.name,
        userAvtar: "",
        userType: 2,
        // from: 'alertNotificationScreen'
      });
    }
  };
  // Customizable Area End
}
