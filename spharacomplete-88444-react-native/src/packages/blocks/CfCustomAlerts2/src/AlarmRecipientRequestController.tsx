// Customizable Area Start

import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import GetLocation from "react-native-get-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocationPermission } from "../../../components/src/Permissions";

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  route: any;
}

interface S {
  alertDetails: any;
  currentUserLatitude: number;
  currentUserLongitude: number;
  loader: boolean;
  roleID: string;
  previewModal: boolean;
  isAcknowledgeModalVisible: boolean;
  incidentMessage: string;
}

interface SS {
  id: any;
}

export default class AlarmRecipientRequestController extends BlockComponent<
  Props,
  S,
  SS
> {
  AcceptId: any;

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
      alertDetails: this.props.route.params.alertDetails,
      currentUserLatitude: 0,
      currentUserLongitude: 0,
      loader: false,
      roleID: "",
      previewModal: false,
      isAcknowledgeModalVisible: false,
      incidentMessage: "",
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    const tempRoleID = await AsyncStorage.getItem("roleID");
    if (tempRoleID) {
      this.setState({ roleID: tempRoleID });
    }
    this.getCurrentLocation();
  }

  getCurrentLocation() {
    getLocationPermission().then(() => {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: false,
        timeout: 20000,
      })
        .then((location) => {
          let currentLongitude = location.longitude;
          let currentLatitude = location.latitude;
          this.setState({
            currentUserLatitude: currentLatitude,
            currentUserLongitude: currentLongitude,
          });
          this.setState({ loader: false });
        })
        .catch(() => {
          this.setState({ loader: false });
        });
    });
  }
  onAcknowledge() {
    this.setState({ isAcknowledgeModalVisible: false });
    this.props.navigation.replace("AuthoriseStackFirstResponder", {
      screen: "FirstResponderHomePage",
      params: {
        screen: "Home",
        params: {
          screen: "Home",
          params: {
            screen: "FirstResponderYourLocation",
            params: { locationStatus: "start" },
          },
        },
      },
    });
  }
  onAlertReject() {
    this.setState({ previewModal: false });
    if (this.state.roleID === "1") {
      this.props.navigation.navigate("RejectAlert", {
        notify_type: this.state.alertDetails.notify_type,
        incidentID: this.state.alertDetails.push_notificable_id,
      });
    } else {
      this.props.navigation.pop();
    }
  }
  async onAlertAccept() {
    if (
      this.state.currentUserLatitude != 0 &&
      this.state.currentUserLongitude != 0
    ) {
      await this.acceptapicall();
    } else {
      this.getCurrentLocation();
    }
  }
  onPreviewDistance = () => {
    this.setState({ previewModal: true });
  };
  async acceptapicall() {
    this.setState({ loader: true });
    let Token = await AsyncStorage.getItem("Token");
    const header = {
      "Content-Type": configJSON.AcceptApiContentType,
      token: Token,
      redirect: "follow",
    };
    const incident = this.state.alertDetails.notify_type;

    let newIncident;
    if (incident === "AmbulanceReport") {
      newIncident = "ambulance";
    } else if (incident === "FireIncident") {
      newIncident = "fire";
    } else if (incident === "EmergencyAssistance") {
      newIncident = "emergency_incident";
    } else {
      newIncident = "panic";
    }
    const attrs = {
      type: newIncident,
      accepted: true,
      latitude: this.state.currentUserLatitude,
      longitude: this.state.currentUserLongitude,
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

    this.AcceptId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.AcceptAPiEndPoint +
        this.state.alertDetails.push_notificable_id +
        "/accept_panic_incident"
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.AcceptAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  onAcceptResponse = (responseJson: any) => {
    if (responseJson != null) {
      AsyncStorage.setItem(
        "ReaciptData",
        JSON.stringify(responseJson.incident.data.attributes)
      );
      // AsyncStorage.setItem('IncidentDesc', responseJson.incident?.data?.attributes?.description !== null && responseJson.incident.data.attributes.description !== '' ? responseJson.incident.data.attributes.description : '')
      this.setState({ loader: false });
      const ReaciptData: any = responseJson.incident.data.attributes;
      const group_information: any =
        responseJson.incident.data.attributes.group_information;
      const params = {
        userName: ReaciptData.account.data.attributes.first_name,
        profileImageURL: ReaciptData.account.data.attributes.profile_image_url,
        distance: this.state.alertDetails.distance,
        description: ReaciptData.account.data.attributes.summary,
        latitude: ReaciptData.account.data.attributes.latitude,
        longitude: ReaciptData.account.data.attributes.longitude,
        group_information: group_information,
        isAlertSender: false,
      };

      let data: any = { ...params };
      data.push_notificable_id = this.state.alertDetails.push_notificable_id;
      data.address = this.state.alertDetails.address;
      data.notify_type = this.state.alertDetails.notify_type;
      AsyncStorage.setItem("CurrentAlertData", JSON.stringify(data));
      console.log("paramsparams", params);
      console.log("datadata", data);

      this.setState({ previewModal: false });
      if (this.state.roleID === "1") {
        this.setState({
          incidentMessage: responseJson.incident_message,
          isAcknowledgeModalVisible: true,
        });
      } else {
        this.props.navigation.replace("AlertLocatioScreen", params);
      }
    }
  };

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived:", message);

    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (apiRequestCallId === this.AcceptId) {
        this.onAcceptResponse(responseJson);
      }
    }
  }
}
// Customizable Area End
