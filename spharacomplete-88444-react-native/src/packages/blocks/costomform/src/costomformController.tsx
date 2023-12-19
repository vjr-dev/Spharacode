// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GetLocation from "react-native-get-location";
import { Alert } from "react-native";
import { GotoHomePage } from "../../../components/src/Navigation/NavigationFunctions";
import { pickImageFromCamera } from "../../../components/src/ImagePicker";

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  route: any;
}

interface S {
  data: any;
  DModal: boolean;
  images1: any;
  images2: any;
  images3: any;
  images4: any;
  Token: any;
  Loader: boolean;
  Comment: any;
  Formdata: any;
  Selected: any;
  Latitude: any;
  Longitude: any;
}

interface SS {
  id: any;
}

export default class MakeDonationController extends BlockComponent<
  Props,
  S,
  SS
> {
  ListDataID: string = "";
  UploadDataID: string = "";
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
      getName(MessageEnum.RestAPIRequestMethodMessage),
    ];

    this.state = {
      data: [1, 2, 3, 4, 5],
      DModal: true,
      images1: "",
      images2: "",
      images3: "",
      images4: "",
      Token: "",
      Loader: false,
      Comment: "",
      Formdata: [],
      Selected: "",
      Latitude: 0,
      Longitude: 0,
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    this.focusListener = this.props.navigation.addListener(
      "focus",
      async () => {
        await this.getData();
        this.setState({
          Comment: "",
          Selected: "",
          images1: "",
          images2: "",
          images3: "",
          images4: "",
        });
      }
    );
  }

  getData = async () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: false,
      timeout: 20000,
    })
      .then((location) => {
        let currentLongitude = location.longitude;
        let currentLatitude = location.latitude;
        this.setState({
          Latitude: currentLatitude,
          Longitude: currentLongitude,
        });
      })
      .catch((error) => {

      });
    const Token = await AsyncStorage.getItem("Token");
    this.setState({ Token });
    this.getListData();
  }

  onUploadApiResponse = (responseJson: any, errorReponse: any) => {
    if (responseJson != null) {
      if (
        responseJson.message == "Emergency Assistance has been created!"
      ) {
        this.setState({ Loader: false });

        // alert("DONE")
        GotoHomePage(this.props);
      } else {
        this.setState({ Loader: false });
        console.log("vhjbhjabshjbnj", responseJson + errorReponse);
        Alert.alert("ERROR");
      }
    }
  }


  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

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

      if (apiRequestCallId === this.ListDataID) {
        if (responseJson != null) {
          this.setState({ Loader: false, Formdata: responseJson.data });
        }
      }
      if (apiRequestCallId === this.UploadDataID) {
        this.onUploadApiResponse(responseJson, errorReponse)
      }
    }
  }

  getListData() {
    this.setState({ Loader: true });
    const header = {
      "Content-Type": configJSON.ListApiContentType,
      token: this.state.Token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.ListDataID = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.ListAPiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.ListAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }

  generateImageArray() {

    let ad = [];

    if (this.state.images1 != "") {
      ad.push({ data: "data:image/jpeg;base64," + this.state.images1 });
    }
    if (this.state.images2 != "") {
      ad.push({ data: "data:image/jpeg;base64," + this.state.images2 });
    }
    if (this.state.images3 != "") {
      ad.push({ data: "data:image/jpeg;base64," + this.state.images3 });
    }
    if (this.state.images4 != "") {
      ad.push({ data: "data:image/jpeg;base64," + this.state.images4 });
    }

    return ad;
  }

  uploadData() {
    let mainId = this.props.route.params?.cusId;
    if (this.state.Selected != 0) {
      if (this.state.Comment != "") {
        this.setState({ Loader: true });
        const header = {
          "Content-Type": configJSON.Emergency_listApiContentType,
          token: this.state.Token,
        };

        const images = this.generateImageArray();
        const attrs = {
          describe_problem: this.state.Comment,
          emergency_assistance_list_id: mainId,
          emergency_assistance_option_id: this.state.Selected,
          latitude: this.state.Latitude,
          longitude: this.state.Longitude,
          images: images,
        };
        const data1 = {
          attributes: attrs,
        };
        const httpBody = {
          data: data1,
        };
        const requestMessage = new Message(
          getName(MessageEnum.RestAPIRequestMessage)
        );

        this.UploadDataID = requestMessage.messageId;

        requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          configJSON.Emergency_listAPiEndPoint
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
          configJSON.Emergency_listAPiMethod
        );

        runEngine.sendMessage(requestMessage.id, requestMessage);

        return true;
      } else {
        Alert.alert("Please Describe problem");
      }
    } else {
      Alert.alert("Please Select weapon is being used");
    }
  }

  onImageClick = async (position: number) => {
    pickImageFromCamera().then((image: any) => {
      if (position === 1) {
        this.setState({ images1: image.data });
      } else if (position === 2) {
        this.setState({ images2: image.data });
      } else if (position === 3) {
        this.setState({ images3: image.data });
      } else if (position === 4) {
        this.setState({ images4: image.data });
      }
    });
  };


  onGoBack() {
    const { navigation }: any = this.props;
    navigation.pop();
  }
}
// Customizable Area End