// Customizable Area Start
//@ts-nocheck
//@ts-ignore
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { PERMISSIONS, request, RESULTS } from "react-native-permissions";

import { Alert, Linking, Platform } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'

import GetLocation from "react-native-get-location";
import { pickImageFromCamera } from "../../../components/src/ImagePicker";
import { getLocationPermission } from "../../../components/src/Permissions";

export const configJSON = require("./config");
let timeo: any
let callCount: any = 0;
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
  images1: any;
  images2: any;
  images3: any;
  images4: any;
  Token: any;
  Loader: boolean;
  Comment: any;
  sendAlert: boolean;
  UserProfile: any;
  Latitude: any;
  Longitude: any;
  PanicID: any;
  
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
  ProfileGetId: any;
  callRefInput: any;
  PanicAgainId: any = "";
  

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
      images1: "",
      images2: "",
      images3: "",
      images4: "",
      Token: "",
      Loader: false,
      Comment: "",
      sendAlert: false,
      Latitude: 0,
      Longitude: 0,
      UserProfile: {},
      PanicID: ''

      
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    
    
  }

  

   componentWillUnmount(): Promise<void> {
    clearTimeout(timeo)
    this.setState({
      images1: "",
      images2: "",
      images3: "",
      images4: "",
      Comment: ""
  
    })
  
    
  }


  async CheckPermission() {
    // if (Platform.OS === 'android') {
    //   request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
    //     console.log("Permission---", result)
    //     switch (result) {
    //       case RESULTS.UNAVAILABLE:
    //         Alert.alert("Please Enable GPS permission to use this app")
    //         break; 
    //       case RESULTS.DENIED:
    //         Alert.alert(
    //           "Hold on!",
    //           "please give permission to access your location",
    //           [{ text: "Setting", onPress: () => Linking.openSettings() }]
    //         );
    //         break;
    //       case RESULTS.BLOCKED:
    //         Alert.alert(
    //           "Hold on!",
    //           "Please give permission to access your location",
    //           [{ text: "Setting", onPress: () => Linking.openSettings() }]
    //         );
    //         break;
    //     }
    //   });
    // } 
    // else 
    // {
    //   request(PERMISSIONS.IOS.LOCATION_ALWAYS).then((result) => {
    //     console.log('Permission_ios', result)
        
    //     switch (result) {
    //       case RESULTS.UNAVAILABLE:
    //         Alert.alert("Please Enable GPS permission to use this app")
    //         break;
    //       case RESULTS.DENIED:
    //         Alert.alert("","Location permission denied!")
    //         break;
    //       case RESULTS.BLOCKED:
    //         Alert.alert(
    //           "Hold on!",
    //           "Please give permission to access your location",
    //           [{ text: "Setting", onPress: () => Linking.openSettings() }]
    //         );
    //         break;
    //     }
    //   });
    // }
    
    getLocationPermission().then( () => {
     
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
          }, () => {
            
          });
        })
        .catch((error) => {

          
         
        })

    }
      
    )
  }


  async componentDidMount() {


    this.CheckPermission();
   
    let Token: any = await AsyncStorage.getItem("Token");
    this.setState({ Token: Token });
    this.GetProfile();
    this.call();
    this.focusListener = this.props.navigation.addListener(
      "focus",
      async () => {
        this.call();
        this.GetProfile();
        this.setState({
          Comment: "",
          images1: "",
          images2: "",
          images3: "",
          images4: "",
        });
      }
    );

   
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

      

      if (apiRequestCallId === this.ProfileGetId) {
        this.profileGetIdRecieverFunc(responseJson)
        
      }

      if (apiRequestCallId === this.FiredataID) {
        this.firedataIdRecieverFunc(responseJson)
        
      }


      if (apiRequestCallId === this.PanicAgainId) {
        if (responseJson !== null) {
          this.setState({ Loader: false })
        }
      }
    }
  }
  firedataIdRecieverFunc(responseJson) {
    if (responseJson != null) {
      AsyncStorage.setItem('PanicGroup', JSON.stringify(responseJson.account?.data?.attributes))

      if (responseJson.message == "Incident has been created!") 
      {
        this.setState({ Loader: false });
        AsyncStorage.setItem("panic_situation_new", JSON.stringify(responseJson.account.data.id));
        this.setState({ 
          PanicID: responseJson.account.data.id,
          Comment: "",
          images1: "",
          images2: "",
          images3: "",
          images4: "",
        })

        this.props.navigation.navigate("AlarmActive", { from: 'Fire' });
      } else  
      {
        this.setState({ Loader: false });
        Alert.alert(responseJson?.errors[0]?.description);
      }
    }
  }
  
  profileGetIdRecieverFunc(responseJson) {
    if (
      responseJson != null &&
      !responseJson.error &&
      !responseJson.errors
    ) {
      this.setState({
        UserProfile: responseJson.data.attributes,
      });
      
    } 
    else {
     
      setTimeout(() => {
        this.parseApiErrorResponse(responseJson);
       
      }, 500);
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

    let attrs: any;
    
    if (this.state.Comment == "") {
      attrs = {
        panic_picture: images,
        latitude: this.state.Latitude,
        longitude: this.state.Longitude
      };
    }
    else {
      attrs = {
        description: this.state.Comment,
        panic_picture: images,
        latitude: this.state.Latitude,
        longitude: this.state.Longitude
      };
    }


    AsyncStorage.setItem("AlertData", JSON.stringify(attrs))
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

  GetProfile = () => {
  

    const header = {
      "Content-Type": configJSON.GetProfileApiContentType,
      token: this.state.Token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.ProfileGetId = requestMessage.messageId;

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
  };
  
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
  
  async OnPanicAgain(Distance?: any) {

   

    callCount += 1;
    this.setState({ Loader: true });
    const header = {
      "Content-Type": configJSON.PanicAgainApiContentType,
      token: this.state.Token,
    };


    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.PanicAgainId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.PanicAgainAPiEndPoint}/${this.state.PanicID}?distance=${Distance}`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );



    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.PanicAgainAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }

  async OnPanicTimer() {
    let get: any = await AsyncStorage.getItem("IsNotify")
    
    
    timeo = setTimeout(() => {
      if (get != 'true') {
       
        if (callCount == 0) {
          this.OnPanicAgain(25)
          this.OnPanicTimer();
          

        }
        else if (callCount == 1) {
          this.OnPanicAgain(50)
         
          clearTimeout(timeo)
         
          
          
        }
        
       
      }
    }, 15000);
  }

  async sendclick() {
   this.setState({ sendAlert: false });
  await AsyncStorage.getItem("IsNotify")
  
    this.Fire_api();
    
    this.OnPanicTimer() 
    
  }



  goback() {
    
    this.props.navigation.pop();
  }

  call() {
    
    this.callRefInput.current?.start();
  }
  pressYes() {
    
    this.callRefInput.current?.pause();
    this.setState({ sendAlert: false });
  }
  
}
// Customizable Area End