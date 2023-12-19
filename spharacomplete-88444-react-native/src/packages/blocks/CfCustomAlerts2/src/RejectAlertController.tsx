import { IBlock } from "../../../framework/src/IBlock";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { Message } from "framework/src/Message";

// Customizable Area Start
import AsyncStorage from "@react-native-async-storage/async-storage";
import { displayErrorMessage, displaySuccessMessage } from "../../../components/src/CustomAlert";
// Customizable Area End


export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  route: any;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  isLoading: boolean,
  rejectOptions:any,
  otherReason: string,
  selectedRejectOption:any,
  buttonlist:boolean
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class RejectAlertController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getRejectOptionAPIID: string = '';
  rejectAPIID: string = '';
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    // Customizable Area Start
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
	    isLoading:false,
        rejectOptions:[],
        otherReason:'',
        selectedRejectOption:{},
        buttonlist:true
        
    };
    // Customizable Area End

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }
  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    this.fetchRejectOptions()
    // Customizable Area End
  }
  
  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (apiRequestCallId === this.getRejectOptionAPIID) {
        if(responseJson.reject_options){
          this.setState({rejectOptions:responseJson.reject_options.data,isLoading:false})
        }
      }
      if (apiRequestCallId === this.rejectAPIID) {
        if(responseJson.status === 200){
          this.setState({isLoading:false})
          displaySuccessMessage(responseJson?.message ?? "Fire Incident Rejected!");
          this.props.navigation.pop(2);
        }
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  async fetchRejectOptions (){
    this.setState({isLoading:true})
    let token = await AsyncStorage.getItem("Token")
    const header = {
      "Content-Type": "application/json",
      'token': token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getRejectOptionAPIID = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getRejectOptionsAPIEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }
  listCall(item: any) {
    this.setState({
      selectedRejectOption: item,
      buttonlist: true
    });
  }
  async onSubmit(){
    if(!this.state.selectedRejectOption?.id){
      displayErrorMessage("Please select reject option");
      return;
    }
    const incident = this.props.route.params.notify_type;

    let tempIncidentType: string;
    if (incident === 'AmbulanceReport') {
      tempIncidentType = 'ambulance';
    } else if (incident === 'FireIncident') {
      tempIncidentType = 'fire';
    } else if (incident === 'EmergencyAssistance') {
      tempIncidentType = 'emergency_incident';
    } else {
      tempIncidentType = 'panic';
    }
    const body: any = {
      data:{
        attributes:{
          type:tempIncidentType,
          reject_option_id:this.state.selectedRejectOption.id,
        }
      }
    }
    if(this.state.selectedRejectOption?.attributes.title == "Other"){
      body.data.attributes.rejection_comment = this.state.otherReason
      if(this.state.otherReason === ''){
        displayErrorMessage("Please enter your reason")
        return
      }
    }
    this.setState({isLoading:true})
    let token = await AsyncStorage.getItem("Token")
    const header = {
      "Content-Type": "application/json",
      'token': token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.rejectAPIID = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_dashboard/dashboards/panic_incident/${this.props.route.params.incidentID}/reject_incident?type=${tempIncidentType}`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(body)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.putMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }
  // Customizable Area End
}
