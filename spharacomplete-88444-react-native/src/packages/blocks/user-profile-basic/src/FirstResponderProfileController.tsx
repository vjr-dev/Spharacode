import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";

// Customizable Area Start
import AsyncStorage from "@react-native-async-storage/async-storage";
// Customizable Area End

export const configJSON = require("./config");
export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  profileDetails: any,
  isLoading: boolean,
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class FirstResponderProfileController extends BlockComponent<
  Props,
  S,
  SS
> {

  // Customizable Area Start
  getProfileID: string = '';
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
    ];

    this.state = {
      profileDetails:'',
      isLoading: true,
    };

    // Customizable Area End

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    this.getProfileDetails()
    this.props.navigation.addListener('focus',()=>{
      this.getProfileDetails();
    })
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
      if(apiRequestCallId === this.getProfileID){
        this.receiveProfileDetails(responseJson);
      }
    } 
    // Customizable Area End
  }

  // Customizable Area Start
  onEditProfile = () => {
    this.props.navigation.navigate("EditProfile")
  }

  onChangePhoneNumber = () => {
    this.props.navigation.navigate("ChangePhoneNumber")
  }

  onEditIdentification = ()=> {
    this.props.navigation.navigate("IdentificationScreen", { from: 'EditProfile' })
  }

  receiveProfileDetails = async (responseJson: any) => {
    if(responseJson?.data){
      await AsyncStorage.setItem("User_Data", JSON.stringify(responseJson));
      this.setState({profileDetails: responseJson.data.attributes, isLoading: false})
    }
  }

  getProfileDetails = async () => {
    let token: any = await AsyncStorage.getItem("Token");
    const header = {
      "Content-Type": configJSON.GetProfileApiContentType,
      token: token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getProfileID = requestMessage.messageId;
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
  }
  // Customizable Area End

}