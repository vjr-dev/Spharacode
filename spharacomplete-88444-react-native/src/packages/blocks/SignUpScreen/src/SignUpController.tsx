// Customizable Area Start
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import GetLocation from "react-native-get-location";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { displayErrorMessage } from "../../../components/src/CustomAlert";

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  route:any
}

interface S {
  Number: any;
  Code: any;
  finalNumber: any;
  Loader: boolean;
  Cmodal: boolean;
  Latitude: any;
  Longitude: any;
  DeviceToken: any;
  roleID: number
  }

interface SS {
  id: any;
}

export default class TutorialsController extends BlockComponent<Props, S, SS> {
  apiEmailLoginCallId: any = "";
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
      Number: 0,
      Code: 91,
      finalNumber: 0,
      Loader: false,
      Cmodal: false,
      Latitude: 0,
      Longitude: 0,
      DeviceToken: "",
      roleID: this.props.route.params.roleID
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    let fcmToken: any = await AsyncStorage.getItem("fcmToken");
    this.setState({ DeviceToken: fcmToken });

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
        console.log("Getlocation error--> ", error);
      });
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

      if (apiRequestCallId === this.apiEmailLoginCallId) {
                if (responseJson.errors != null) {
          this.setState({Loader:false});
          let errorObj = responseJson.errors[0];
          let errorMessage ;
          for(let keyName in errorObj) {
            if(errorObj.hasOwnProperty(keyName)) {
              errorMessage = errorObj[keyName];
              break;
            }
          }
          displayErrorMessage(errorMessage ?? "Something went wrong")
        } else {
          this.setState({ Loader: false });

          if (responseJson != null && responseJson) {
            await AsyncStorage.setItem(
              "Singin_Token",
              JSON.stringify(responseJson.meta.token)
            );
            await AsyncStorage.setItem(
              "unique_id",
              JSON.stringify(responseJson.data.attributes.unique_auth_id)
            );
            const { navigation }: any = this.props;
            navigation.navigate("VerificationScreen", { Screen: "SIGNIN" });
          }
        }
      }
    }
  }

  async onclick() {
    this.setState({ Loader: true });

    let number2 = this.state.Number.length;
    if (number2 > 2) {
      let dataa = this.state.Code;
      let num = this.state.Number.toString();

      let full = "+" + dataa + num;
      let fn = full.toString();
      await AsyncStorage.setItem("User_number", fn);
      this.setState({ finalNumber: fn });

      const header = {
        "Content-Type": configJSON.validationApiContentType,
      };
      const attrs = {
        full_phone_number: fn,
        registration_token: this.state.DeviceToken,
        latitude: this.state.Latitude,
        longitude: this.state.Longitude,
        role_id: this.state.roleID,
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

      this.apiEmailLoginCallId = requestMessage.messageId;

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.exampleAPiEndPoint
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
        configJSON.exampleAPiMethod
      );

      runEngine.sendMessage(requestMessage.id, requestMessage);

      return true;
    } else {
      this.setState({ Loader: false });
      displayErrorMessage("Please Enter Valid Number.")
    }
  }

  codelcik(item: any) {
    this.setState({
      Code: item.callingCode,
      Cmodal: false,
    });
  }
  loginscreen() {
    const { navigation }: any = this.props;
    navigation.pop(2);
  }
  goback(){
    const { navigation }: any = this.props;
    navigation.pop();
  }
}
// Customizable Area End
