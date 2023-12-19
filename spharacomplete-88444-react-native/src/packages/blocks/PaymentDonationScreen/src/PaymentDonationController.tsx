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
import { Alert, Platform } from "react-native";
import { GooglePay } from "react-native-google-pay";
const PaymentRequest = require("react-native-payments").PaymentRequest;

import RazorpayCheckout from "react-native-razorpay";

const allowedCardNetworks: any = ["VISA", "MASTERCARD"];
const allowedCardAuthMethods: any = ["PAN_ONLY", "CRYPTOGRAM_3DS"];

const requestData: any = {
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
    allowedCardNetworks,
    allowedCardAuthMethods,
  },
  transaction: {
    totalPrice: "10",
    totalPriceStatus: "FINAL",
    currencyCode: "IND",
  },
  merchantName: "Example Merchant",
};

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
}

interface S {
  data: any;
  Amount: any;
  Modal: boolean;
  UserName: string;
  Nickname: string;
  UserNumber: any;
  UserEmail: any;
  to: string;
  STRIPE_PUBLIC_KEY: string;
  CHECKOUT_SESSION_ID: string;
  currentPosition: string;
  paymentdone: any;
}

interface SS {
  id: any;
}

export default class PaymentDonationController extends BlockComponent<
  Props,
  S,
  SS
> {
  checkSessionAPIcallId: any;

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
      Amount: 1,
      Modal: false,
      to: "Police officers",
      STRIPE_PUBLIC_KEY: "",
      CHECKOUT_SESSION_ID: "",
      UserName: "",
      Nickname: "",
      UserNumber: "",
      UserEmail: "",
      currentPosition: "",
      paymentdone: false,
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
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

      if (apiRequestCallId === this.checkSessionAPIcallId) {
        if (responseJson !== null && responseJson) {
          if (responseJson.donation_payment != null) {
            this.props.navigation.navigate("StripeWebView", {
              url: responseJson.checkout_session,
            });
          }
        }
      }
    }
  }
  async componentDidMount() {
    let USERData: any = await AsyncStorage.getItem("User_Data");

    console.log("USERData",USERData)
    let temp: any = {};
    
    if(USERData!== null) //istanbul ignore next
    { 
      temp = JSON.parse(USERData);
      
    }
   
    this.setState({
      UserName: temp.data.attributes.first_name,
      Nickname: temp.data.attributes.nick_name,
      UserNumber: temp.data.attributes.phone_number,
      UserEmail: temp.data.attributes.email,
      currentPosition: temp.data.attributes.current_position,
    });
    this.setState({
      Amount: this.props.route.params?.Amount,
      to: this.props.route.params?.Dto,
    });
  }

  successfulclick() {
    this.setState({ Modal: false, paymentdone: true });
  }

  gpayclick() {
    console.log("OS--> ", Platform.OS)
    if (Platform.OS === "android") {
      GooglePay.setEnvironment(GooglePay.ENVIRONMENT_TEST);

      GooglePay.isReadyToPay(allowedCardNetworks, allowedCardAuthMethods).then(
        (ready:boolean) => {
          if (ready) //istanbul ignore next
          { 
            GooglePay.requestPayment(requestData)
              .then((token: string) => {
                
                this.setState({ Modal: true });
              })
              .catch((error: any) => console.log(error.code, error.message));
          }
        }
      );
    } else {
      Alert.alert("","Under devlopment");
    }
  }

  Rpay() {
    let options = {
      description: "Credits towards consultation",
      image: "https://i.imgur.com/3g7nmJC.png",
      currency: "INR",
      key: "rzp_test_9i47TjiFtle6se", // Your api key
      amount: this.state.Amount * 100,
      name: this.state.UserName,
      prefill: {
        email: this.state.UserEmail,
        contact: this.state.UserNumber,
        name: "Razorpay Software",
      },
      theme: { color: "#F37254" },
    };
    RazorpayCheckout.open(options)
      .then((data: any) => {
        this.setState({ Modal: true });
      })
      .catch((error: any) => //istanbul ignore next
      { 
        Alert.alert("","Payment failed please try again");
      });
  }

  applepayclick() {
    if (Platform.OS === "ios") { 
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
              label: this.state.to,
              amount: {
                currency: "IND",
                value: this.state.Amount,
              },
            },
          ],
          total: {
            label: "Donation",
            amount: { currency: "IND", value: this.state.Amount },
          },
        },
        {
          requestPayerName: true,
          requestPayerPhone: true,
          requestPayerEmail: true,
          requestShipping: false,
        }
      );
      paymentRequest
        .canMakePayments()
        .then((canMakePayment) => //istanbul ignore next 
        { 
          if (canMakePayment) //istanbul ignore next 
          {  
            paymentRequest
              .show()
              .then((paymentResponse: { complete: (arg0: string) => void }) => {
                paymentResponse.complete("success");
              })
              .catch((error: any) => console.log(error));
          } else //istanbul ignore next
          {
            console.log("Cant Make Payment");
          }
        })
        .catch((error: any) => //istanbul ignore next
        {console.log(error, "ERROR1")});
    }
  }
  goback() {
    this.props.navigation.pop();
  }
  _checkSessionAPIcall = async () => {
    let Token0: any = await AsyncStorage.getItem("Token");

    const header = {
      "Content-Type": "application/json",
      token: Token0,
    };
    let httpBody = JSON.stringify({
      data: {
        attributes: {
          donatelist_id: 1,
          amount: this.state.Amount,
          success_url: "https://example.com/success",
          cancel_url: "https://example.com/cancel",
        },
      },
    });
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.checkSessionAPIcallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.paymentDonationEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "POST"
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      httpBody
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  };
}
// Customizable Area End
