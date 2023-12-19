//@ts-nocheck
//@ts-ignore
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
// Customizable Area Start
import React from "react";
import { Alert, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GetLocation from "react-native-get-location";
import Geolocation from "@react-native-community/geolocation";
const PaymentRequest = require("react-native-payments").PaymentRequest;
import RazorpayCheckout from "react-native-razorpay";
import { GooglePay } from "react-native-google-pay";

import {
  AnimatedRegion,
} from "react-native-maps";

const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = 0.02;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;

interface ICoordinate {
  latitude: number;
  longitude: number;
}
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
  locationTracking: boolean;
  emergencyContact: boolean;
  police: boolean;
  bottomPadding: number;
  modalVisible: boolean;
  viewPlans: boolean;
  selectedPlan: number;
  paymentView: boolean;
  latitude: number;
  longitude: number;
  routeCoordinates: ICoordinate[];
  distanceTravelled: number;
  prevLatLng: any;
  coordinatesvalues: any;
  choosenPlan: any;
  TrackingPlan: Array<any>;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class MapsController extends BlockComponent<Props, S, SS> {
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
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

    this.state = {
      locationTracking: false,
      emergencyContact: false,
      police: false,
      modalVisible: false,
      viewPlans: false,
      selectedPlan: 0,
      bottomPadding: 1,
      paymentView: false,
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
      choosenPlan: 0,
      TrackingPlan: [],
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
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

      this.receiveSwitchCesesid(apiRequestCallId, responseJson);

      if (apiRequestCallId === this.PlanId) {
        if (responseJson !== null) {
          let dt: any = responseJson;
          console.log("PlanIdResponse===----", dt.data);

          this.setState({ TrackingPlan: dt.data });
        }
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  switchCasesId: string;
  PlanId: any;
  focusListener: any;
  watchID: any;
  marker: any = React.createRef();

  allowedCardNetworks:any = ["VISA", "MASTERCARD"]
  allowedCardAuthMethods: any = ["PAN_ONLY", "CRYPTOGRAM_3DS"];

  requestData: any = {
    cardPaymentMethod: {
      tokenizationSpecification: {
        type: "PAYMENT_GATEWAY",
        gateway: "stripe",
        gatewayMerchantId: "",
        stripe: {
          publishableKey: "pk_test_TYooMQauvdEDq54NiTphI7jx",
          version: "2018-11-08",
        },
      },
      allowedCardNetworks: this.allowedCardNetworks ,
      allowedCardAuthMethods: this.allowedCardAuthMethods,
    },
    transaction: {
      totalPrice: "10",
      totalPriceStatus: "FINAL",
      currencyCode: "IND",
    },
    merchantName: "Example Merchant",
  };

  receiveSwitchCesesid = (apiRequestCallId:any, responseJson:any) => {
    if (apiRequestCallId && responseJson) {
      if (apiRequestCallId === this.switchCasesId) {
        if (
          responseJson != null &&
          !responseJson.error &&
          !responseJson.errors
        ) {
          const responseData: any =
            responseJson?.personal_information?.data?.attributes;
          console.log(
            "PaymentUserDataResposne---",
            responseJson.personal_information
          );
          AsyncStorage.setItem(
            "User_Data",
            JSON.stringify(responseJson.personal_information)
          );
          if (!responseData?.location_live_tracking) {
            Geolocation.clearWatch(this.watchID);
          } else {
            this.getCurrentLocation();
          }
        } else {
          this.setState({
            locationTracking: !this.state.locationTracking,
            emergencyContact: !this.state.emergencyContact,
            police: !this.state.police,
          });
          Alert.alert("ERROR");
          setTimeout(() => {
            this.parseApiErrorResponse(responseJson);
          }, 500);
        }
      }
    }
  };
  
  async componentDidMount() {
    let userData: any = await AsyncStorage.getItem("User_Data");

    let Payment: any = await AsyncStorage.getItem("PaymentDone");
    console.log("Paymentinfo", Payment);
    const user_data = JSON.parse(userData);
    this.setState({
      locationTracking: user_data?.data?.attributes?.location_live_tracking,
      emergencyContact:
        user_data?.data?.attributes?.share_with_emergency_contact,
      police: user_data?.data?.attributes?.share_with_police,
      modalVisible: Payment !== "Yes" ? true : this.state.modalVisible,
    });
    this.getCurrentLocation();
    this.focusListener = this.props.navigation.addListener("focus", () => {
      this.setState({
        modalVisible: Payment !== "Yes" ?true:this.state.modalVisible,
        selectedPlan: 0,
      });
      this.getCurrentLocation();
    });

    await this.GetSubscriptionPlan();
  }

  //Get Plan Api
  async GetSubscriptionPlan() {
    let Token: any = await AsyncStorage.getItem("Token");

    const header = {
      "Content-Type": configJSON.getplanAPIContentType,
      token: Token,
    };

    console.log("HeaderAPI", header);

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.PlanId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getplanAPIEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getplanAPIMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
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
      })
      .catch((error) => {
      });
    this.watchID = Geolocation.watchPosition(
      (position) => {
        const { routeCoordinates} = this.state;
        const { latitude, longitude } = position.coords;

        const newCoordinate = {
          latitude: latitude,
          longitude: longitude,
        };
        if (Platform.OS === "android") {
          if (this.marker) {
            this.marker._component.animateMarkerToCoordinate(
              newCoordinate,
              500
            );
          }
        } else {
          this.state.coordinatesvalues.timing(newCoordinate).start();
        }

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

    if (!this.state.locationTracking) {
      Geolocation.clearWatch(this.watchID);
    }
  }

  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  async LocationTrackingSwitch(Val: boolean) {
    this.setState({ locationTracking: !this.state.locationTracking });
    this.ChangeSwitchStatus(
      Val,
      this.state.emergencyContact,
      this.state.police
    );
  }
  async EmergencyContactSwitch(Val: boolean) {
    this.setState({ emergencyContact: !this.state.emergencyContact });
    this.ChangeSwitchStatus(
      this.state.locationTracking,
      Val,
      this.state.police
    );
  }
  async SharePoliceSwitch(Val: boolean) {
    this.setState({ police: !this.state.police });
    this.ChangeSwitchStatus(
      this.state.locationTracking,
      this.state.emergencyContact,
      Val
    );
  }
  async onViewPlans() {
    this.setState({ viewPlans: true });
  }
  async onPlanClick(buttonIndx: number, price: number | string) {
    console.log("BtnId", buttonIndx, "------------", "price-----", price);
    this.setState({ selectedPlan: buttonIndx, choosenPlan: price });
  }
  async onMakePayment() {
    this.setState({ paymentView: true });
  }
  async onPay() {
    AsyncStorage.setItem("PaymentDone", "Yes");
    Alert.alert("Payment Successfull");
    setTimeout(() => {
      this.setState({
        modalVisible: false,
        viewPlans: false,
        paymentView: false,
      });
    }, 800);
  }

  _onApplepayClick = () => {
    if (Platform.OS === "ios") {
      console.log("PaymentRequest ----------------------", PaymentRequest);
      let paymentRequest = new PaymentRequest(
        [
          {
            supportedMethods: ["apple-pay"],
            data: {
              merchantIdentifier: "merchant.com.sphara",
              supportedNetworks: ["visa", "mastercard", "amex"],
              countryCode: "US",
              currencyCode: "USD",
            },
          },
        ],
        {
          id: "basic-example",
          displayItems: [
            {
              label: "Subscripton",
              amount: {
                currency: "IND",
                value: this.state.choosenPlan,
              },
            },
          ],
          total: {
            label: "Donation",
            amount: { currency: "IND", value: this.state.choosenPlan },
          },
        },
        {
          requestPayerName: true,
          requestPayerPhone: true,
          requestPayerEmail: true,
          requestShipping: false,
        }
      );

      console.log("----PaymentRequest", { PaymentRequest }, { paymentRequest });

      paymentRequest
        .canMakePayments()
        .then((canMakePayment: any) => {
          if (canMakePayment) {
            paymentRequest
              .show()
              .then((paymentResponse: { complete: (arg0: string) => void }) => {
                paymentResponse.complete("success");
              })
              .catch((error: any) => console.log(error));
          } else {
             console.log("Cant Make Payment");
          }
        })
        .catch((error: any) => console.log(error, "ERROR1"));
    }
  };
  async Rpay() {
    let tempUserData = await AsyncStorage.getItem("User_Data");
    let UserData;
    if(tempUserData){
      UserData = JSON.parse(tempUserData);
    }
    let aaa = this.state.choosenPlan * 100;
    let options = {
      description: "Credits towards consultation",
      image: "https://i.imgur.com/3g7nmJC.png",
      currency: "INR",
      key: "rzp_test_9i47TjiFtle6se",
      amount: aaa,
      name: UserData?.data?.attributes?.first_name,
      prefill: {
        email: UserData?.data?.attributes?.email,
        contact: UserData?.data?.attributes?.full_phone_number,
        name: UserData?.data?.attributes?.first_name,
      },
      theme: { color: "#F37254" },
    };
    RazorpayCheckout.open(options)
      .then((data: any) => {
        console.log("Success===>", data);
      })
      .catch((error: any) => {
        console.log("=====>>>", error);

        Alert.alert("Payment failed please try again!");
      });
  }
  _onGooglePayClick() {
    console.log("Google pay click");
    if (Platform.OS === "android") {
      GooglePay.setEnvironment(GooglePay.ENVIRONMENT_TEST);

      GooglePay.isReadyToPay(this.allowedCardNetworks, this.allowedCardAuthMethods).then(
        (ready) => {
          if (ready) {
            console.log("REDY", ready);

            GooglePay.requestPayment(this.requestData)
          }
        }
      );
    } else {
      Alert.alert("Under the devlopment");
    }
  }
  ChangeSwitchStatus = async (
    tracking: boolean,
    contact: boolean,
    police: boolean
  ) => {
    let Token: any = await AsyncStorage.getItem("Token");

    const data = {
      attributes: {
        location_live_tracking: tracking,
        share_with_emergency_contact: contact,
        share_with_police: police,
      },
    };

    const header = {
      "Content-Type": configJSON.EnableDisableCasesContentType,
      token: Token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.switchCasesId = requestMessage.messageId;

    const httpBody = {
      data: data,
    };

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.urlEnableDisableCases
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.EnableDisableCasesMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  modalvisiblefn = () => {
    this.setState(
      {
        modalVisible: false,
        viewPlans: false,
        paymentView: false,
      },
      () => {
        this.props.navigation.goBack();
      }
    );
  };
  // Customizable Area End
}
