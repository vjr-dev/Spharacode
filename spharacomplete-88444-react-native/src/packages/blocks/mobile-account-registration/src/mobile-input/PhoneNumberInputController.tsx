import { IBlock } from "../../../../framework/src/IBlock";
import { Message } from "../../../../framework/src/Message";
import { BlockComponent } from "../../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";

// Customizable Area Start
import {
  bodyText,
  errorCountryCode,
  apiSendOtpContentType,
  apiSendOtpEndPoint,
  apiSendOtpMethod,
  errorMobileNotValid,
  errorTitle,
  placeHolderMobile,
  placeHolderSelectCountry,
  btnTxtSendOtp,
  labelInfo
} from "./config";
// Customizable Area End

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

export interface S {
  // Customizable Area Start
  dataSource: any[];
  countryCodeSelected: string;
  mobileNo: string;
  token: string;
  // Customizable Area End
}

export interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class PhoneNumberInputController extends BlockComponent<
  Props,
  S,
  SS
> {

  // Customizable Area Start
  phoneAuthApiCallId: any;
  placeHolderMobile: string;
  placeHolderSelectCountry: string;
  btnTxtSendOtp: string;
  labelInfo: string;
  bodyText: string;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    this.receive = this.receive.bind(this);
    runEngine.attachBuildingBlock(this as IBlock, [
      getName(MessageEnum.CountryCodeMessage),
      getName(MessageEnum.RestAPIResponceMessage)
    ]);
    this.state = {
      dataSource: [],
      countryCodeSelected: "",
      mobileNo: "",
      token: ""
    };

    this.placeHolderMobile = placeHolderMobile;
    this.placeHolderSelectCountry = placeHolderSelectCountry;
    this.btnTxtSendOtp = btnTxtSendOtp;
    this.labelInfo = labelInfo;
    this.bodyText = bodyText;
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.CountryCodeMessage) === message.id) {
      var selectedCode = message.getData(
        getName(MessageEnum.CountyCodeDataMessage)
      );

      if (selectedCode !== undefined) {
        this.setState({
          countryCodeSelected:
            selectedCode.indexOf("+") > 0
              ? selectedCode.split("+")[1]
              : selectedCode
        });
      }
    }

    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.phoneAuthApiCallId &&
      this.phoneAuthApiCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (responseJson && responseJson.meta && responseJson.meta.token) {

        this.setState({ token: responseJson.meta.token });

        const msg: Message = new Message(
          getName(MessageEnum.NavigationMobilePhoneOTPMessage)
        );

        msg.addData(
          getName(MessageEnum.AuthTokenDataMessage),
          this.state.token
        );

        msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);

        msg.addData(
          getName(MessageEnum.AuthTokenPhoneNumberMessage),
          this.state.mobileNo
        );

        this.send(msg);
      } else if (responseJson && responseJson.errors) {
        this.parseApiErrorResponse(responseJson);
      } else {
        var errorReponse = message.getData(
          getName(MessageEnum.RestAPIResponceErrorMessage)
        );
        this.parseApiCatchErrorResponse(errorReponse);
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  sendOtp(): boolean {
    if (
      !this.state.countryCodeSelected ||
      this.state.countryCodeSelected.length === 0
    ) {
      this.showAlert(errorTitle, errorCountryCode);
      return false;
    }

    if (!this.state.mobileNo || this.state.mobileNo.length === 0) {
      this.showAlert(errorTitle, errorMobileNotValid);
      return false;
    }

    const header = {
      "Content-Type": apiSendOtpContentType
    };

    const attrs = {
      full_phone_number: this.state.countryCodeSelected + this.state.mobileNo
    };

    const data = {
      type: "sms_otp",
      attributes: attrs
    };

    const httpBody = {
      data: data
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.phoneAuthApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      apiSendOtpEndPoint
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
      apiSendOtpMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  processOnClickMessage(messageID:string, values:any = null) {
    switch(messageID) {
      case 'btnSendOtp':
          this.sendOtp();
        break;
      default:
        console.log("processOnClickMessage::Not Confifured for message " + messageID);
        break;
    }

  }

  public changeState(objectID:string, value:any = null) {
    switch(objectID) {
      case 'txtInputPhoneNumber':
        this.setState({ mobileNo: value });
        break;
      default:
        console.log("changeState::Not Confifured for " + objectID);
    }
  }

  getState(objectID:string) {
    switch(objectID) {
      case 'CountryCodeSelector':
        return this.state.countryCodeSelected;
      case 'txtInputPhoneNumber':
        return this.state.mobileNo;
      default:
        console.log("getState::Not Confifured for " + objectID);
        return null;
    }
  }
  // Customizable Area End
}
