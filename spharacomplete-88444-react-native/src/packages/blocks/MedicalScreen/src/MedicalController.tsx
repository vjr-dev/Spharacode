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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BackHandler } from "react-native";
import { backToLoginConfirmationAlert, displayErrorMessage, displaySuccessMessage } from "../../../components/src/CustomAlert";
import { OnLogOut } from "../../../components/src/Navigation/logout";
import { pickImageFromCamera, pickImagesFromGellery } from "../../../components/src/ImagePicker";

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  route:any
}

interface S {
  MedicalCondition: any;
  images: any;
  Token: string;
  isImageFromGallery: boolean;
  isImageFromCamera: boolean;
  Loader: boolean;
}

interface SS {
  id: any;
}

export default class MedicalConditionS extends BlockComponent<Props, S, SS> {
  MedicalControllId: any = "";

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
      MedicalCondition: "",
      images: "",
      Token: "",
      isImageFromGallery: false,
      isImageFromCamera: false,
      Loader: false,
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    await AsyncStorage.setItem("SignON", "MedicalScreen");
    let Token0: any = await AsyncStorage.getItem("Token");
    this.setState({ Token: Token0 });
  }
  
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick = async () => {
    if(this.props.route.params?.from === "PermissionScreen"){
      backToLoginConfirmationAlert(async ()=> {
        this.setState({Loader: true})
        await OnLogOut(this.props)
        this.setState({Loader: false})
      });
      return true;
    }else{
      this.props.navigation.pop();
      return true;
    }
  }

  //istanbul ignore next
  handleMedicalResponse = async (responseJson: any) => {
    this.setState({ Loader: false });

    if (responseJson != null && responseJson) {
   
      await displaySuccessMessage("Medical condition save successfully.");
      if (this.props.route?.params?.from === "EditProfile") {
       
        this.props.navigation.goBack();
      } else if (this.props.route?.params?.from === "health") {
       
        this.props.navigation.navigate("UserProfileBasicBlock");
      } else {

        this.props.navigation.replace("PersonalInformation",{from:"signUpFlow"});
      }
    }
  };

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (apiRequestCallId === this.MedicalControllId) {
        await this.handleMedicalResponse(responseJson);
      } else {
        this.setState({ Loader: false });
      }
    }
  }
  //istanbul ignore next
  apiCall = () => {
    this.setState({ Loader: true });
    const header = {
      "Content-Type": configJSON.MedicalApiContentType,
      token: this.state.Token,
    };

    const httpBody = {
      data: {
        attributes: {
          title: this.state.MedicalCondition,
          medical_media_file: this.state.images,
        },
      },
    };
    let apiMethod;
    let apiEndPoint;
    if (this.props.route?.params?.medicalConditionID) {
      apiMethod = configJSON.PutMethod;
      apiEndPoint = `${configJSON.MedicalAPiEndPoint}/${this.props.navigation?.route?.params?.medicalConditionID}`;
    } else {
      apiMethod = configJSON.MedicalAPiMethod;
      apiEndPoint = configJSON.MedicalAPiEndPoint;
    }

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.MedicalControllId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      apiEndPoint
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
      apiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  onclick() {
    if (
      this.props.route?.params?.from === "health" ||
      this.props.route?.params?.from !== "EditProfile"
    ) {
      if (this.state.MedicalCondition != "") {
        if (this.state.images) {
           this.apiCall();
         } else {
           this.setState({ Loader: false });
           displayErrorMessage("Please upload document")
         }
      } else {
        displayErrorMessage("Please enter valid medical condition details");
      }
    }
  }
  onskip() {
    const { navigation }: any = this.props; 
    navigation.replace("PersonalInformation",{from:"signUpFlow"});
  }

  //istanbul ignore next
  takePicture = async () => {
    pickImageFromCamera().then((image: any)=>{
      this.setState({
        images: { data: `data:image/jpg;base64,${image?.data}` },
        isImageFromCamera: true,
      });
      displaySuccessMessage("Image picked successfully")
    })
  };

  selectImageFromGallery = async () => {
    pickImagesFromGellery(false).then((images: any)=>{
      this.setState({
        images: { data: `data:${images?.mime};base64,${images?.data}` },
        isImageFromGallery: true,
      });
      displaySuccessMessage('Image selected successfully');
    })
  };
}
// Customizable Area End
