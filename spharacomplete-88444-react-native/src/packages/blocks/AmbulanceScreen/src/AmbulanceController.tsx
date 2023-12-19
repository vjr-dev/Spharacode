// Customizable Area Start
//@ts-nocheck
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GetLocation from "react-native-get-location";
import {Alert} from 'react-native'
import { pickImageFromCamera } from "../../../components/src/ImagePicker";



export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;


}

interface S {

  data: any;
  DModal: boolean;
  SAmountstatus: number;
  Reason: any;
  images1: any;
  images2: any;
  images3: any;
  images4: any;
  People: any;
  Token: any;
  Ambulancedata: any;
  SelectedAmbulance: any;
  Loader: any;
  Contactdata: any;
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

  FirstapiID: any = "";
  AmbulaceID: any = "";
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
      SAmountstatus: 0,
      People: 0,
      Reason: "",
      images1: "",
      images2: "",
      images3: "",
      images4: "",
      Token: "",
      Ambulancedata: [],
      SelectedAmbulance: 0,
      Loader: true,
      Contactdata: [],
      Latitude: "",
      Longitude: "",


    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);



  }



  
  async componentDidMount() {
    this.setState({ Token: await AsyncStorage.getItem("Token") });
    this.FirstApi();
    this.focusListener = this.props.navigation.addListener(
      "focus",
      async () => {
        
        this.FirstApi();
        this.setState({
          SelectedAmbulance: 0,
          People: 0,
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
        console.log("locationlocation", location);
        let currentLongitude = location.longitude;
        let currentLatitude = location.latitude;
        this.setState({
          Latitude: currentLatitude,
          Longitude: currentLongitude,
        });
      })
      .catch(() => {

      });
  }
    
  async receive(from: string, message: Message) {

    runEngine.debugLog("Message Recived", message);

    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) 
    {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      let errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

      if (apiRequestCallId === this.FirstapiID) 
      {
       this.firstApiIdResponse(responseJson,errorReponse)
      }

      if (apiRequestCallId === this.AmbulaceID)  
      {
        this.ambulanceIdResponse(responseJson,errorReponse)
        
      }
    }

  }

  
  FirstApi() {    

    const header = {
      "Content-Type": configJSON.AmbulancedataApiContentType,
      token: this.state.Token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.FirstapiID = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.AmbulancedataAPiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );


    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.AmbulancedataAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }
  
  firstApiIdResponse(responseJson,errorReponse) {
    if (responseJson != null) 
    {


      if (responseJson.errors != null) 
      {
        this.setState({ Loader: false });

        alert(responseJson.errors[0]);
      } else {
        this.setState({ Loader: false });
        
        this.setState({ Ambulancedata: responseJson.ambulance_for });
        
      }
    }
    else {
      this.parseApiErrorResponse(responseJson);
    }
  }
  
  ambulanceIdResponse(responseJson,errorReponse) {
    if (responseJson != null && !responseJson.error && !responseJson.errors) 
    {
      let contactlist: any = [];
      const emergencyContacts = responseJson?.account?.data?.attributes?.account?.data?.attributes?.emergency_contacts;
      const friendContacts = responseJson?.account?.data?.attributes?.account?.data?.attributes?.friends;
      const familyContacts = responseJson?.account?.data?.attributes?.account?.data?.attributes?.family;
      if(emergencyContacts && emergencyContacts.length > 0){
        contactlist = [...emergencyContacts];
      }
      if(friendContacts && friendContacts.length > 0){
        contactlist = [...contactlist, ...friendContacts];
      }
      if(familyContacts && familyContacts.length > 0){
        contactlist = [...contactlist, ...familyContacts];
      }
      const timeIncident = responseJson &&
      responseJson.account &&
      responseJson.account.data &&
      responseJson.account.data.attributes &&
      responseJson.account.data.attributes.incident_time;
      
      this.setState({
        Loader: false,
        Contactdata: contactlist
      });
      
      this.props.navigation.navigate("AmbulanceNotification", {
        DDD: this.state.Contactdata,
        Address: responseJson.location_address,
        Time: timeIncident,
      });
      
    } else 
    {
     
    
        this.parseApiErrorResponse(responseJson);
      
    }
  }

  
  Send_ambulance_requast_Api() {
    const header = {
      "Content-Type": configJSON.SendambulanceApiContentType,
      token: this.state.Token,
    };

    let ad = [];

    if (this.state.images1 != "") 
   {
      ad.push({ data: "data:image/jpeg;base64," + this.state.images1 });
    }
    if (this.state.images2 != "") 
    {
      ad.push({ data: "data:image/jpeg;base64," + this.state.images2 });
    }
    if (this.state.images3 != "") 
    {
      ad.push({ data: "data:image/jpeg;base64," + this.state.images3 });
    }
    if (this.state.images4 != "") 
     {
      ad.push({ data: "data:image/jpeg;base64," + this.state.images4 });
    }

    const images = ad;
    console.log(images, "AADD");

    const attrs = {
      latitude: this.state.Latitude,
      longitude: this.state.Longitude,
      call_ambulance_for_id: this.state.SelectedAmbulance,
      people_count: this.state.People,
      incident_picture: images,
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

    this.AmbulaceID = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.SendambulanceAPiEndPoint
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
      configJSON.SendambulanceAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }
  
  sendclick() {
    if (this.state.SelectedAmbulance != "") 
    {
      if (this.state.People != "" && this.check()) 
      {
      
        this.setState({ Loader: true });
        this.Send_ambulance_requast_Api();
      } else {
        Alert.alert("Please Enter number of People's");
      }
    } else {
      Alert.alert("Please Select The Reason");
    }
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

  check() {
    let reg = /^\d*$/;
    
    if (reg.test(this.state.People) === false) {
      
      return false;
    } else {
      return true;
    }
  }

  goback() {
    
    this.props.navigation.pop();
  }

}
// Customizable Area End