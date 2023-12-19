// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

import {
  Alert,
  Platform,

} from "react-native";

import {
  AnimatedRegion,
} from "react-native-maps";
import GetLocation from "react-native-get-location";
import Geolocation from "@react-native-community/geolocation";

import React from "react";
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = 0.02;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  // animations: any
  Token: any;
  UserProfile: any;
  showAllEmergencyContact: boolean;
  loader: boolean;
  Latitude: any;
  Longitude: any;
  latitude: any;
  longitude: any;
  routeCoordinates: any;
  distanceTravelled: number;
  prevLatLng: any;
  coordinatesvalues: any;
  Responderdata: any;
  Loader: boolean;
  initialSeconds: number;
}

interface SS {
  id: any;
}



export default class AlarmActiveController extends BlockComponent<
  Props,
  S,
  SS
> {
  ProfileGetId: any;
  focusListener: any;
  watchID: any;
  marker: any = React.createRef();
  GetapiCallId: any = "";
  PanicAlertId: any = "";
  callRefInput: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.CountryCodeMessage),
      getName(MessageEnum.RestAPIResponceDataMessage),
      getName(MessageEnum.RestAPIResponceSuccessMessage),
      getName(MessageEnum.RestAPIResponceErrorMessage),
      getName(MessageEnum.RestAPIRequestMessage),
      getName(MessageEnum.RestAPIRequestBodyMessage),
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      getName(MessageEnum.RestAPIRequestMethodMessage),
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      Token: "",
      UserProfile: {},
      showAllEmergencyContact: false,
      loader: false,
      Latitude: 0,
      Longitude: 0,
      Responderdata: [],
      latitude: LATITUDE,
      longitude: LONGITUDE,
      routeCoordinates: [],
      distanceTravelled: 0,
      prevLatLng: {},
      coordinatesvalues: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }),
      Loader: false,
      initialSeconds: 15,
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  getCurrentLocation() {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: false,
      timeout: 20000,
    })
      .then((location) => {
        let currentLongitude = location.longitude;
        let currentLatitude = location.latitude;
        this.setState({
          latitude: currentLatitude,
          longitude: currentLongitude,
          coordinatesvalues: new AnimatedRegion({
            latitude: currentLatitude,
            longitude: currentLongitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }),
        });
      });
    this.watchID = Geolocation.watchPosition(
      (position) => {
        const { routeCoordinates } = this.state;
        const { latitude, longitude } = position.coords;

        const newCoordinate = {
          latitude: latitude,
          longitude: longitude,
        };
        //istanbul ignore next
        if (Platform.OS === "android") {
          if (this.marker) {
            this.marker?._component?.animateMarkerToCoordinate(
              newCoordinate,
              500
            );
          }
        } else {
          /* istanbul ignore if */
           if (this.state.coordinatesvalues) {
            this.state.coordinatesvalues?.timing(newCoordinate).start();
           }
      
        }
        /* istanbul ignore next */
        this.setState({
          latitude: latitude,
          longitude: longitude,
          routeCoordinates: routeCoordinates.concat([newCoordinate]),
          prevLatLng: newCoordinate,
        });
      },
      (error) => Alert.alert(JSON.stringify(error)),
      {
        enableHighAccuracy: false,
        timeout: 20000,
        distanceFilter: 1,
      }
    );
  }

  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  onApiResponseHandle = (responseJson: any, apiRequestCallId: any) => {
    if (apiRequestCallId && responseJson) {
      if (apiRequestCallId === this.ProfileGetId) {
        this.onGetProfileResponse(responseJson);
      }
    }
    if (apiRequestCallId === this.PanicAlertId) {
      this.onPanicAlertResponse(responseJson);
    }
    if (apiRequestCallId === this.GetapiCallId) {
      if (responseJson != null) {
        this.setState({ Responderdata: responseJson });
      }
    }
  }

  onPanicAlertResponse = (responseJson: any) => {
    if (responseJson != null) {
      if (responseJson.message == "Incident has been created!") {
        this.setState({ Loader: false });
        const { navigation }: any = this.props;
        navigation.navigate("AlarmActive", { from: 'Panic' });
      } else {
        this.setState({ Loader: false });
        Alert.alert(responseJson.errors[0].description);
      }
    }
  }
  onGetProfileResponse = (responseJson: any) => {
    console.log("onGetProfileResponse---> ",responseJson)
    if (
      responseJson != null &&
      !responseJson.error &&
      !responseJson.errors
    ) {
      this.setState({
        UserProfile: responseJson.data.attributes,
        loader: false,
      });
    } else {
      setTimeout(() => {
        this.parseApiErrorResponse(responseJson);
        this.setState({
          loader: false,
        });
      }, 500);
    }
  }


  async receive(from: string, message: Message) {
    runEngine.debugLog("on recieive==>" + JSON.stringify(message));

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (errorReponse) {
        this.parseApiCatchErrorResponse(errorReponse);
        return;
      }
      this.onApiResponseHandle(responseJson, apiRequestCallId)

    }
  }
  FirstApi() {
    const header = {
      "Content-Type": configJSON.GetdataAPiContentType,
      token: this.state.Token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.GetapiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.GetdataAPiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.GetdataAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }

  _onCountDownFinish = () => {
    this.setState({ Loader: true });
    const header = {
      "Content-Type": configJSON.PanicAlertApiContentType,
      token: this.state.Token,
    };

    const attrs = {
      description: null,
      panic_picture: [],
      latitude: this.state.latitude,
      longitude: this.state.longitude
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

    this.PanicAlertId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.PanicAlertAPiEndPoint
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
      configJSON.PanicAlertAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  GetProfile = () => {
    this.setState({
      loader: true,
    });
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
}
// Customizable Area End