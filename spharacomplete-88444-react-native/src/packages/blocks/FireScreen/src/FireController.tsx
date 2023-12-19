// Customizable Area Start
//@ts-nocheck
//@ts-ignore
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GetLocation from "react-native-get-location";
import { Alert } from "react-native";
import { pickImageFromCamera } from "../../../components/src/ImagePicker";

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
}

interface S {
  data: any;
  DModal: boolean;
  SAmountstatus1: number;
  SAmountstatus2: number;
  SAmountstatus3: number;
  Reason1: any;
  Reason2: any;
  Reason3: any;
  images1: any;
  images2: any;
  images3: any;
  images4: any;
  People: any;
  Token: any;
  Loader: boolean;
  Comment: any;
  contacttdata: any;
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
  FiredataID: any = "";
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
      SAmountstatus1: 0,
      SAmountstatus2: 0,
      SAmountstatus3: 0,
      People: 0,
      Reason1: "",
      Reason2: "",
      Reason3: "",
      images1: "",
      images2: "",
      images3: "",
      images4: "",
      Token: "",
      Loader: false,
      Comment: "",
      contacttdata: [],
      Latitude: "",
      Longitude: "",
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    this.setState({ Token: await AsyncStorage.getItem("Token") });

    this.focusListener = this.props.navigation.addListener(
      "focus",
      async () => {
        this.setState({
          SAmountstatus1: 0,
          SAmountstatus2: 0,
          SAmountstatus3: 0,
          Comment: "",
          images1: "",
          images2: "",
          images3: "",
          images4: "",
        });
      }
    );
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
      .catch((error) => {});
  }
  receiveFireAPI(responseJson: any) {
    if (responseJson != null) {
      if (responseJson.errors != null) {
        this.setState({ Loader: false });
        Alert.alert("Error", responseJson.errors[0]);
      } else {
        let contactlist: any = [];
        const emergencyContacts = responseJson?.fire_incident?.data?.attributes?.account?.data?.attributes?.emergency_contacts;
        const friendContacts = responseJson?.fire_incident?.data?.attributes?.account?.data?.attributes?.friends;
        const familyContacts = responseJson?.fire_incident?.data?.attributes?.account?.data?.attributes?.family;
        if(emergencyContacts && emergencyContacts.length > 0){
          contactlist = [...emergencyContacts];
        }
        if(friendContacts && friendContacts.length > 0){
          contactlist = [...contactlist, ...friendContacts];
        }
        if(familyContacts && familyContacts.length > 0){
          contactlist = [...contactlist, ...familyContacts];
        }
        this.setState({
          Loader: false,
          contacttdata:contactlist
        });
        const { navigation }: any = this.props;
        navigation.navigate("FireNotification", {
          DDA: contactlist,
          Address: responseJson.location_address,
          Time: responseJson.fire_incident.data.attributes.incident_time,
        });
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

      if (apiRequestCallId === this.FiredataID) {
        this.receiveFireAPI(responseJson);
      }
    }
  }

  Fire_api() {
    this.setState({ Loader: true });
    const header = {
      "Content-Type": configJSON.FireApiContentType,
      token: this.state.Token,
    };
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

    const images = ad;
    const attrs = {
      latitude: this.state.Latitude,
      longitude: this.state.Longitude,
      fire_comment: this.state.Comment,
      is_injured: this.state.Reason1,
      fire_dimension: this.state.Reason2,
      is_flame: this.state.Reason3,
      fire_picture: images,
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

    this.FiredataID = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.FireAPiEndPoint
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
      configJSON.FireAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }

  staticamount1() {
    this.setState({ SAmountstatus1: 1, Reason1: "Injured people" });
  }
  staticamount2() {
    this.setState({ SAmountstatus1: 2, Reason1: "Not injured" });
  }
  staticamount3() {
    this.setState({ SAmountstatus2: 1, Reason2: "Small" });
  }
  staticamount4() {
    this.setState({ SAmountstatus2: 2, Reason2: "Medium" });
  }
  staticamount5() {
    this.setState({ SAmountstatus2: 3, Reason2: "Big" });
  }
  staticamount6() {
    this.setState({ SAmountstatus3: 1, Reason3: "Flames & Smoke" });
  }
  staticamount7() {
    this.setState({ SAmountstatus3: 2, Reason3: "Just Smoke" });
  }
  
  takePicture = (id:number) => {
    pickImageFromCamera().then((image: any)=>{
      switch(id){
        case 1:
          this.setState({ images1: image.data });
          break;
        case 2:
          this.setState({ images2: image.data });
          break;
        case 3:
          this.setState({ images3: image.data });
          break;
        case 4:
          this.setState({ images4: image.data });
          break;
      }
  })
  }

  sendclick() {
    if (this.state.Reason1 != "") {
      if (this.state.Reason2 != "") {
        if (this.state.Reason3 != "") {
          this.Fire_api();
        } else {
          Alert.alert("", "Please Enter flames or smoke");
        }
      } else {
        Alert.alert("", "Please Enter Dimension of the fire");
      }
    } else {
      Alert.alert("", "Please Select The people injured");
    }
  }
  goback() {
    const { navigation }: any = this.props;
    navigation.pop();
  }
}
// Customizable Area End
