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
import { BackHandler } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { GotoHomePage } from "../../../components/src/Navigation/NavigationFunctions";
import { OnLogOut } from "../../../components/src/Navigation/logout";
import { backToLoginConfirmationAlert, displayErrorMessage } from "../../../components/src/CustomAlert";

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  route: any
}

interface S {
  Name: string;
  Nickname: string;
  LastName: string;
  Bmonth: any;
  Byear: any;
  Email: string;
  Address: string;
  City: string;
  ZipCode: string;
  Cmodal: boolean;
  Country: string;
  modal: boolean;
  Tmodal: boolean;
  Token: any;
  countryID: number;
  countryCode: any;
  countryList: [];
  isCountrySelected: boolean;
  stateList: any;
  isEmptyStateList: boolean;
  stateName: any;
  cityName: any;
  stateID: any;
  cityList: [];
  userId: any;
  Loader: boolean;
  UserProfile: any;
  userType:string;
}

interface SS {
  id: any;
}

export default class TutorialsController extends BlockComponent<Props, S, SS> {
  PersonalInformationId: string = "";
  GetUserCountryId: string = "";
  selector: string = "";
  StateGetId: string = "";
  CityGetId: string = "";

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
      Name: "",
      Nickname: "",
      LastName: "",
      Bmonth: false,
      Byear: null,
      Email: "",
      Address: "",
      City: "",
      ZipCode: "",
      Country: "",
      modal: true,
      Tmodal: false,
      Token: "",
      countryList: [],
      isCountrySelected: false,
      stateList: [],
      isEmptyStateList: false,
      userId: "",
      Loader: false,
      Cmodal: false,
      stateID: "",
      cityList: [],
      countryID: 0,
      countryCode: "",
      stateName: "",
      cityName: "",
      UserProfile: "",
      userType:"",
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    await AsyncStorage.setItem("SignON", "PersonalInformation");
    let isUserType = await AsyncStorage.getItem("roleID")
    let Token0: any = await AsyncStorage.getItem("Token");
    let unique_id: any = await AsyncStorage.getItem("unique_id");
    this.setState({ Token: Token0, userType: isUserType});
    this.GetUserCountry();
  }
  
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick = async () => {
    backToLoginConfirmationAlert(async ()=> {
      this.setState({Loader: true})
     await OnLogOut(this.props)
      this.setState({Loader: false})
    });
      return true;
  }

  onPersonalResponse = async (responseJson: any) => {
        if (responseJson != null) {
      if (responseJson.errors != null) {
                let errors: any[] | [] = Object.values(responseJson.errors[0]);

        let allErrors = errors.map((item) => item).join(", ");
        this.setState(
          {
            Loader: false,
          },
          () => {
            setTimeout(() => {
              this.setState({ Loader: false })
              displayErrorMessage(allErrors);
            }, 500);
          }
        );
      } else {
        await AsyncStorage.setItem(
          "User_Data",
          JSON.stringify(responseJson.personal_information)
        );
        await AsyncStorage.setItem("isActivated", JSON.stringify(true));
        this.setState({ userId: responseJson.personal_information.data.attributes.unique_auth_id,Tmodal: true, Loader: false });
      }
    } else {
      this.setState(
        {
          Loader: false,
        },
        () => {
          setTimeout(() => {
            this.setState({ Loader: false })
            displayErrorMessage("Server has been down");
          }, 500);
        }
      );
    }
  };

  onGetUserCountry = (responseJson: any) => {
    if (responseJson != null && !responseJson.error && !responseJson.errors) {
      this.setState({
        countryList: responseJson.data,
      });
    } else {
      setTimeout(() => {
        this.parseApiErrorResponse(responseJson);
      }, 500);
    }
  };
  onGetUserState = (responseJson: any) => {
    if (responseJson != null && !responseJson.error && !responseJson.errors) {
      this.setState({
        stateList: responseJson.data,
      });

      if (
        Object.keys(responseJson.data).length === 0 &&
        !responseJson.error &&
        !responseJson.errors
      ) {
        this.setState({
          isEmptyStateList: true,
        });
      }
    } else {
      setTimeout(() => {
        this.parseApiErrorResponse(responseJson);
      }, 500);
    }
  };
  onCityGet = (responseJson: any) => {
    if (responseJson != null && !responseJson.error && !responseJson.errors) {
      this.setState({
        cityList: responseJson.data,
      });
    } else {
      setTimeout(() => {
        this.parseApiErrorResponse(responseJson);
      }, 500);
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

      if (apiRequestCallId === this.PersonalInformationId) {
          await this.onPersonalResponse(responseJson);
      }
      if (apiRequestCallId === this.GetUserCountryId) {
        this.onGetUserCountry(responseJson);
      }
      if (apiRequestCallId === this.StateGetId) {
        this.onGetUserState(responseJson);
      }

      if (apiRequestCallId === this.CityGetId) {
        this.onCityGet(responseJson);
      }
    }
  }

  validateEmail(email: string) {
    let re = /^\S+@\S+\.\S+$/;
    return re.test(email);
  }
  GetUserCountry() {
    const header = {
      "Content-Type": configJSON.UserCountryApiContentType,
      token: this.state.Token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.GetUserCountryId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.urlGetUserCountry
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.UserCountryApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }

  GetStateslist = () => {
    const userCountryCode = this.state.countryCode;
    const header = {
      "Content-Type": configJSON.StateApiContentType,
      token: this.state.Token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.StateGetId = requestMessage.messageId;
    let apiURL;
    apiURL = `${configJSON.urlGetState}/states/${userCountryCode}`;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      apiURL
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.StateApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  GetCitylist = () => {
    const userCountryCode = this.state.countryCode;
    const userState = this.state.stateID;
    const header = {
      "Content-Type": configJSON.CityApiContentType,
      token: this.state.Token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.CityGetId = requestMessage.messageId;
    let apiURL;

    apiURL = `${configJSON.urlGetCity}/cities/${userCountryCode}/${userState}`;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      apiURL
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.CityApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  onclick() {
    let email = this.state.Email;
    let Zip = JSON.stringify(this.state.ZipCode);
    switch (true) {
      case this.state.Name === "":
        displayErrorMessage("Please enter First Name");
        break;
      case this.state.LastName === "":
        displayErrorMessage("Please enter Lastname");
        break;
      case this.state.Nickname === "":
        displayErrorMessage("Please enter Nickname");
        break;
      case this.state.Byear === "":
        displayErrorMessage("Please enter Birthdate");
        break;
      case this.state.Email === "":
        displayErrorMessage("Please enter email id");
        break;
      case !this.validateEmail(email):
        displayErrorMessage("Invalid email");
        break;
      case this.state.Country === "":
        displayErrorMessage("Please Enter Country");
        break;
      case this.state.stateName === "":
        displayErrorMessage("Please Enter State");
        break;
      case this.state.cityName === "":
        displayErrorMessage("Please Enter City");
        break;
      case this.state.Address === "":
        displayErrorMessage("Please Enter Address");
        break;
      case this.state.ZipCode === "":
        displayErrorMessage("Please Enter ZipCode");
        break;
      case Zip.length < 1:
        displayErrorMessage("Invalid ZipCode");
        break;
      default:
        this.setState({ Loader: true });
        let bb = moment(this.state.Byear).format("DD/MM/YYYY");
        const header = {
          "Content-Type": configJSON.InformationApiContentType,
          token: this.state.Token,
        };
        const attrs = {
          type: "personal_information",
          first_name: this.state.Name,
          last_name: this.state.LastName,
          nick_name: this.state.Nickname,
          date_of_birth: bb,
          email: this.state.Email,
          address: this.state.Address,
          city: this.state.cityName,
          state: this.state.stateName,
          state_code: this.state.stateID,
          zip_code: this.state.ZipCode,
          user_country_id: this.state.countryID,
          headline: "",
          current_position: "",
          summary: "",
          visibility: "public",
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

        this.PersonalInformationId = requestMessage.messageId;

        requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          configJSON.InformationAPiEndPoint
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
          configJSON.InformationAPiMethod
        );

        runEngine.sendMessage(requestMessage.id, requestMessage);
        return true;
    }
  }

  onclickModel() {
    this.setState({ modal: false });
  }

  async onclickModel2() {
    this.setState({ Tmodal: false });
    const { navigation }: any = this.props;
    if(this.props.route.params?.from === "signUpFlow" || this.state.userType == 1){
      navigation.replace("IdentificationScreen");
    }else{
      let isEmergencyContactNumberAdded = await AsyncStorage.getItem("isEmergencyContactNumberAdded");
      if(isEmergencyContactNumberAdded === '' || isEmergencyContactNumberAdded === "false"){
        navigation.replace("EmergencyContact");
      }else{
        GotoHomePage(this.props)
      }

    }
    
  }
}
// Customizable Area End
