import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import AsyncStorage from "@react-native-async-storage/async-storage";
import { displayErrorMessage } from "../../../components/src/CustomAlert";
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
  reportModal: boolean;
  token: string;
  reportDetails: any;
  isLoading: boolean;
  incidentDescription: string;
  injuredDescription: string;
  injured: string;
  treatmentProvided: any;
  currentAlertData: any;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class IncidentReportController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getReportDetailsId: any = "";
  uploadReportDetailsId: any = "";
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
      reportModal: false,
      token: "",
      reportDetails: "",
      isLoading: false,
      incidentDescription: "",
      injuredDescription: "",
      injured: "",
      treatmentProvided: "",
      currentAlertData: "",
      // Customizable Area End
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Recived-DBC-136", message);

    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (apiRequestCallId === this.getReportDetailsId) {
        if (responseJson != null) {
          if (responseJson.errors != null) {
            this.setState({ isLoading: false });
            displayErrorMessage(responseJson.errors[0]);
          } else {
            this.setState({
              reportDetails: responseJson.data,
              isLoading: false,
            });
          }
        }
      }

      if (apiRequestCallId === this.uploadReportDetailsId) {
        if (responseJson != null) {
          if (responseJson.errors != null) {
            this.setState({ isLoading: false });
            displayErrorMessage(responseJson.errors[0]);
          } else {
            this.setState({ isLoading: false, reportModal: true });
          }
        }
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    let userToken: any = await AsyncStorage.getItem("Token");
    const data: any = await AsyncStorage.getItem("CurrentAlertData");
    this.setState({ token: userToken });
    if (data) {
      this.setState({ currentAlertData: JSON.parse(data) });
    }
    this.getReportDetail(userToken);
  }

  goToHome = () => {
    this.setState({ reportModal: false });
    this.props.navigation.navigate("FirstResponderDashboard");
  };

  getReportDetail = (token: any) => {
    this.setState({ isLoading: true });
    const header = {
      "Content-Type": configJSON.GetdataContentType,
      token: token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getReportDetailsId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getReportDetailsUrl
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.GetSendotpAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  submitReportDetails = () => {
    let incident = this.state.currentAlertData.notify_type;

    let tempIncidentType: string;

    if (incident === "AmbulanceReport") {
      tempIncidentType = "ambulance";
    } else if (incident === "FireIncident") {
      tempIncidentType = "fire";
    } else if (incident === "EmergencyAssistance") {
      tempIncidentType = "emergency_incident";
    } else {
      tempIncidentType = "panic";
    }

    if (this.state.incidentDescription == "") {
      displayErrorMessage("Incident description required!!!");
    } else if (this.state.injured == "") {
      displayErrorMessage("Is injured or not?");
    } else if (
      this.state.injured == "Yes" &&
      this.state.injuredDescription == ""
    ) {
      displayErrorMessage("Please provide short details about Injuries");
    } else if (
      this.state.injured == "Yes" &&
      this.state.treatmentProvided == ""
    ) {
      displayErrorMessage("Is treatment provided?");
    } else {
      this.setState({ isLoading: true });
      const header = {
        "Content-Type": configJSON.GetdataContentType,
        token: this.state.token,
      };

      const attrs = {
        type: tempIncidentType,
        incident_description: this.state.incidentDescription,
        injured: this.state.injured.toLowerCase(),
        injured_description: this.state.injuredDescription,
        treatment_provided: this.state.treatmentProvided.toLowerCase(),
      };

      console.log("jbdfghjvghs hsadv", attrs);

      const data = {
        attributes: attrs,
      };

      const httpBody = {
        data: data,
      };

      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );

      this.uploadReportDetailsId = requestMessage.messageId;

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.uploadReportDetailsUrl +
          this.state.currentAlertData.push_notificable_id +
          "/case_report"
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
        configJSON.postdataAPiMethod
      );

      runEngine.sendMessage(requestMessage.id, requestMessage);
      return true;
    }
  };
  // Customizable Area End
}
