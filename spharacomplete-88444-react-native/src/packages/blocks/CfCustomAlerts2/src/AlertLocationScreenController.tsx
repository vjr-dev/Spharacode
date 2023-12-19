
//@ts-ignore
//@ts-nocheck
// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import Geolocation from "@react-native-community/geolocation";
import React from "react";
import { Alert } from "react-native";

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
}

interface S {
  userName: string,
  profileImageURL: string,
  description: string,
  cometChatGroupImfo: object,
  distanse: number,
  userLatitude: number,
  userLongitude: number,
  currentLatitude: number,
  currentLongitude: number,
	groupInfo: any,
	isAlertSender: boolean,
	isLoading: boolean,
}

interface SS {
  id: any;
}

export default class AlertLocationScreenController extends BlockComponent<
  Props,
  S,
  SS
> {
  switchCasesId: any;
  AcceptId: any;
  focusListener: any;
  DitanceId: any;
  watchID: any;
  marker: any = React.createRef();
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
      getName(MessageEnum.RestAPIResponceDataMessage),
      getName(MessageEnum.RestAPIResponceErrorMessage),
    ];
    runEngine.attachBuildingBlock(this, this.subScribedMessages);

    this.state = {
        userName: '',
        profileImageURL: '',
        description: '',
        cometChatGroupImfo: '',
        distanse: '',
        userLatitude:'',
        userLongitude:'',
        currentLatitude:'',
        currentLongitude:'',
				groupInfo:'',
				isAlertSender: true,
				isLoading:true,
        
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    this.setState({
      userName: this.props.route.params.userName,
      profileImageURL: this.props.route.params.profileImageURL,
      distanse: this.props.route.params.distance,
      description: this.props.route.params.description,
      userLatitude: Number(this.props.route.params.latitude),
      userLongitude: Number(this.props.route.params.longitude),
      groupInfo: this.props.route.params.group_information,
      isAlertSender:this.props.route.params.isAlertSender
    })
    this.getCurrentLocation();
	}

	getCurrentLocation() {
    Geolocation.getCurrentPosition(
      (position) => {
        this.setState({currentLatitude:position.coords.latitude,currentLongitude: position.coords.longitude, isLoading:false})
      },
      (error) => console.log("Location not fetch-> ", error),
      {
        timeout: 20000,
        enableHighAccuracy: false
      }
    )
  }
  onBackPress = () => {
		this.props.navigation.goBack();
	}
	onChatPress = () => {
		if (this.state.groupInfo?.data?.guid ) {
      this.props.navigation.navigate(
        "ConversationScreen",
        {
            chatNumber: this.state.groupInfo.data.guid,
            mainConversationId: this.state.groupInfo.data?.conversationId,
            userName: this.state.groupInfo.data?.name,
            userAvtar: "",
            userType: 2,
            from: 'alertNotificationScreen'
        }
    )
	}
	}
 
}
// Customizable Area End
