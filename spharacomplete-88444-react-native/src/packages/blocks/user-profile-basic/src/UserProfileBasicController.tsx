//@ts-nocheck
//@ts-ignore
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GetLocation from "react-native-get-location";
import { pickImagesFromGellery } from "../../../components/src/ImagePicker";
import { Alert } from "react-native";
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
  firstName: any;
  lastName: any;
  nick_name:any;
  email: any;
  Headline: any;
  Current_Position: any;
  City_name: any;
  Country_name: any;
  UserCountry: any;
  Summary: any;
  phoneNumber: any;
  currentCountryCode: any;
  data: any[];
  passwordHelperText: string;
  enablePasswordField: boolean;
  enableReTypePasswordField: boolean;
  enableNewPasswordField: boolean;
  edtEmailEnabled: boolean;
  llDoChangePwdContainerVisible: boolean;
  llChangePwdDummyShowContainerVisible: boolean;
  currentPasswordText: any;
  newPasswordText: any;
  reTypePasswordText: any;
  edtMobileNoEnabled: boolean;
  countryCodeEnabled: boolean;
  saveButtonDisable: boolean;
  public: boolean;
  private: boolean;
  token: any;
  Country: any;
  States: any;
  State_name: any;
  City: any;
  UserProfile: any;
  MainProfile: any;
  Arr_Emergancy: any;
  Arr_Friend: any;
  Arr_Family: any;
  images1: any,
  temp_id: any;
  state_val: any;
  ProfileImage: any
  imgurl: any;
  isFocused: boolean;
  medicalConditionID: any;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class UserProfileBasicController extends BlockComponent<
  Props,
  S,
  SS
> {

  // Customizable Area Start
  labelFirstName: string;
  lastName: string;
  labelArea: string;
  labelMobile: string;
  labelEmail: string;
  labelCurrentPassword: string;
  labelNewPassword: string;
  labelRePassword: string;
  btnTextCancelPasswordChange: string;
  btnTextSaveChanges: string;
  labelHeader: any;
  btnTextChangePassword: string;
  arrayholder: any[];
  passwordReg: RegExp;
  emailReg: RegExp;
  apiCallMessageUpdateProfileRequestId: any;
  validationApiCallId: string = "";
  apiChangePhoneValidation: any;
  registrationAndLoginType: string = "";
  authToken: any;
  uniqueSessionRequesterId: any;
  userProfileGetApiCallId: any;
  userAttr: any;
  CountryGetId: any;
  GetUserCountryId: any;
  StateGetId: any;
  CityGetId: any;
  editProfileId: any;
  ProfileGetId: any;
  MainProfileId: any;
  focusListener: any;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    // Customizable Area Start
    this.subScribedMessages = [
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
      firstName: "",
      lastName: "",
      nick_name:"",
      email: "",
      Headline: "",
      Current_Position: "",
      City_name: "",
      Country_name: "",
      Summary: "",
      phoneNumber: "",
      currentCountryCode: configJSON.hintCountryCode,
      data: [],
      passwordHelperText: "",
      enablePasswordField: true,
      enableReTypePasswordField: true,
      enableNewPasswordField: true,
      edtEmailEnabled: true,
      llDoChangePwdContainerVisible: false,
      llChangePwdDummyShowContainerVisible: false,
      currentPasswordText: "",
      newPasswordText: "",
      reTypePasswordText: "",
      edtMobileNoEnabled: true,
      countryCodeEnabled: true,
      saveButtonDisable: false,
      public: false,
      private: true,
      token: "",
      Country: "",
      UserCountry: "",
      State_name: "",
      States: "",
      City: "",
      UserProfile: {},
      MainProfile: [],
      images1: "",
      imgurl: "",
      temp_id: 0,
      state_val: "",
      ProfileImage: "",
      Arr_Emergancy: "",
      Arr_Friend: "",
      Arr_Family: "",
      isFocused: false,
      medicalConditionID:''
    };

    this.arrayholder = [];
    this.passwordReg = new RegExp("\\w+");
    this.emailReg = new RegExp("\\w+");
    this.labelFirstName = configJSON.labelFirstName;
    this.lastName = configJSON.lastName;
    this.labelArea = configJSON.labelArea;
    this.labelMobile = configJSON.labelMobile;
    this.labelEmail = configJSON.labelEmail;
    this.labelCurrentPassword = configJSON.labelCurrentPassword;
    this.labelNewPassword = configJSON.labelNewPassword;
    this.labelRePassword = configJSON.labelRePassword;
    this.btnTextCancelPasswordChange = configJSON.btnTextCancelPasswordChange;
    this.btnTextSaveChanges = configJSON.btnTextSaveChanges;
    this.labelHeader = configJSON.labelHeader;
    this.btnTextChangePassword = configJSON.btnTextChangePassword;
    // Customizable Area End
    runEngine.attachBuildingBlock(this, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("on recieive==>" + JSON.stringify(message));

    console.log("apicalled", message.id);
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
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
        return
      }

      if (apiRequestCallId && responseJson) {
         
         this.receiveCountryGetIdFn(apiRequestCallId, responseJson)
         this.receiveGetUserCountryIdFn(apiRequestCallId, responseJson)
         this.receiveStateGetIdFn(apiRequestCallId, responseJson)
         this.receiveCityGetIdFn(apiRequestCallId, responseJson)
         await this.receiveProfileGetIdFn(apiRequestCallId, responseJson)
         this.receiveMainProfileIdFn(apiRequestCallId, responseJson)

        if (apiRequestCallId === this.editProfileId) {
          // this.setState({ isgetLoader: false, ispostLoader: false })
          if (responseJson != null && !responseJson.error && !responseJson.errors) {
            // this.setState({
            //   City: responseJson.cities
            // })
            console.log("GOT Response+++++++>>>>>>>", JSON.stringify(responseJson));
            // Customizable Area Start
            AsyncStorage.setItem("User_Data", JSON.stringify(responseJson.personal_information))
            this.props.navigation.pop();
            Alert.alert("","Your Profile has been Updated Successfully")
            // Customizable Area End
            
            // setTimeout(() => {
            //  this.props.navigation.dispatch(StackActions.reset({
            //     index: 0,
            //     actions: [NavigationActions.navigate({ routeName: 'Drawer' })],
            // }))
              
            // }, 2000);
          } else {
            console.log("error");
            setTimeout(() => {
              this.parseApiErrorResponse(responseJson);
            }, 500);
          }
        }
      }
    }
    // Customizable Area End 
  }
  
  // Customizable Area Start
  
  receiveCountryGetIdFn = (apiRequestCallId: any, responseJson: any) => {
    if (apiRequestCallId === this.CountryGetId) {
      
      // this.setState({ isgetLoader: false, ispostLoader: false })
      if (responseJson != null && !responseJson.error && !responseJson.errors) {
        console.log("Country list is--", responseJson.data, this.state.token)
        this.setState({
          Country: responseJson.data
        });
      } else {
        console.log("error");
        setTimeout(() => {
          this.parseApiErrorResponse(responseJson);
        }, 500);
      }
    }
  }

  receiveGetUserCountryIdFn = (apiRequestCallId: any, responseJson: any) => {
    if (apiRequestCallId === this.GetUserCountryId) {
      if (responseJson != null && !responseJson.error && !responseJson.errors) {
        console.log("GOT USER COUNTRY", responseJson);

        this.setState({
          UserCountry: responseJson.data
        });
        console.log("success");
        this.GetStateslist()

      } else {
        console.log("error");
        setTimeout(() => {
          this.parseApiErrorResponse(responseJson);
        }, 500);
      }
    }
  }

  receiveStateGetIdFn = (apiRequestCallId: any, responseJson: any) => {
    if (apiRequestCallId === this.StateGetId) {
      
      if (responseJson != null && !responseJson.error && !responseJson.errors) {
        this.setState({
          States: responseJson.data
        })
        
        if (this.state.UserProfile.state) {
          let SD = this.state.States
          let abc = Object.values(SD)
          console.log(this.state.UserProfile.state, "<<-----STATE");
          const index = abc.findIndex((data:any, index:any) => {
            console.log(" ", data, "111111");
            let name = this.state.UserProfile.state.replace(/^\s+|\s+$/gm, '')
            if (data == name) {
  
              let newcode = Object.keys(SD)[index]
              
              this.state.UserProfile.state_code = newcode
              this.setState({ UserProfile: this.state.UserProfile });
              this.GetCitylist()
            }
          })
          console.log(index)

        }

      } else {
        console.log("error");
        setTimeout(() => {
          this.parseApiErrorResponse(responseJson);
        }, 500);
      }
    }
  }

  receiveCityGetIdFn = (apiRequestCallId: any, responseJson: any) => {
    if (apiRequestCallId === this.CityGetId) {
      // this.setState({ isgetLoader: false, ispostLoader: false })
      if (responseJson != null && !responseJson.error && !responseJson.errors) {
        this.setState({
          City: responseJson.data
        })
        console.log("CITY DATA+++++++>>>>>>>", this.state.City);
      } else {
        console.log("error");
        setTimeout(() => {
          this.parseApiErrorResponse(responseJson);
        }, 500);
      }
    }
  }

  receiveProfileGetIdFn = async (apiRequestCallId: any, responseJson: any) => {
    if (apiRequestCallId === this.ProfileGetId) {
      // this.setState({ isgetLoader: false, ispostLoader: false })
      if (responseJson != null && !responseJson.error && !responseJson.errors) {
        console.log("API RESPONSE GET", responseJson.data);

        this.setState({
          UserProfile: responseJson.data.attributes,
          medicalConditionID:responseJson?.data?.attributes?.medical_condition_id
        })
        await AsyncStorage.setItem("User_Data",JSON.stringify(responseJson));
        console.log("state log-UserProfileBasicController", this.state.UserProfile);
      } else {
        console.log("error");
        setTimeout(() => {
          this.parseApiErrorResponse(responseJson);
        }, 500);
      }
    }
  }

  receiveMainProfileIdFn = (apiRequestCallId: any , responseJson: any) => {
    if (apiRequestCallId === this.MainProfileId) {
      // this.setState({ isgetLoader: false, ispostLoader: false })
      if (responseJson != null && !responseJson.error && !responseJson.errors) {
        console.log("APIresponsssss ======>", responseJson.data.attributes);
        console.log(this.state.MainProfile, ';;;;;:::::');

        this.state.MainProfile.push(responseJson.data.attributes)
        this.setState({
          Arr_Emergancy: responseJson.data.attributes.emergency_contacts,
          Arr_Friend: responseJson.data.attributes.friends,
          Arr_Family: responseJson.data.attributes.family,
        })

         this.setState({
          MainProfile: this.state.MainProfile,
          ProfileImage: responseJson.data.attributes.profile_image_url
        })
      } else {
        console.log("error");
        setTimeout(() => {
          this.parseApiErrorResponse(responseJson);
        }, 500);
      }
    }
  }

  async Clocation() {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((location) => {
        console.log("locationlocation", location);
        let currentLongitude = location.longitude;
        let currentLatitude = location.latitude;
        console.log("LAAAA---> ", currentLatitude, "LOGGGGGGii-->", currentLongitude);
        
        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + currentLatitude + ',' + currentLongitude + '&key=' + configJSON.mapAPIKEY)
          .then(async (response) => {

            let data = await response.json()
            console.log("SDFGHJIUYTRESDFGH23456",data)
            let newdata = await data.results[0].formatted_address
            let newdata2 = newdata.split(",")
           


            let State = newdata2[newdata2.length - 2]
            let final = State.replace(/\d/g, '');

            

            if (this.state.UserProfile.user_country !== null) {
              this.state.UserProfile.user_country.name = newdata2[newdata2.length - 1]
            }

            this.state.UserProfile.state = final
            this.state.UserProfile.city = newdata2[newdata2.length - 3]
            this.setState({
              UserProfile: this.state.UserProfile
            })
         
            let CD = this.state.Country
            let abc = Object.values(CD)
           const indexx = abc.findIndex((data, index) => {           
              if (this.state.UserProfile.user_country !== null) {
                let name = this.state.UserProfile.user_country.name.replace(/^\s+|\s+$/gm, '')
                if (data == name) {
                  let newcode = Object.keys(CD)[index]
                 
                  this.state.UserProfile.user_country.country_code = newcode
                  this.setState({ UserProfile: this.state.UserProfile });
                  this.GetStateslist()
                }
              }
            })
           
          }).then(() => {}).catch(() => {})
      })
      .catch((error) => {
        const { code } = error;
        if (code == "CANCELLED") {
           console.log(code)
        } else {
           Alert.alert("Please enable location permission")
        }
      });

  }



  handleButtonClick(clickType) {
    console.log("PluseCLICK");
    const { navigation } = this.props;

    switch (clickType) {
        case 1:
            navigation.navigate("AddEmergencyContact", { contactType: 1 });
            break;
        case 2:
            navigation.navigate("AddEmergencyContact", { contactType: 2 });
            break;
        case 3:
            navigation.navigate("AddEmergencyContact", { contactType: 3 });
            break;
        default:
            // Handle default case if necessary
            break;
    }
}


  
    takePhoto = () => {
    pickImagesFromGellery(false).then((image) => {
      let uri = image.path;
      let name = uri.split("/").pop();
     let imageobj = {
        path: uri,
        filename: name,
      };
      console.log(imageobj)
     
      this.setState({ images1: image.data, temp_id: 1,imgurl: uri });

      // alert("Image Tack successfully")
    }).then(() => {}).catch(() => {});
  };

  userProfileVisibility(){
    if(this.state.UserProfile?.visibility == "Public"){
      return "Private"
    }else{
      return "Public"
    }
  }

  setVisibility() {
    this.state.UserProfile.visibility = this.userProfileVisibility()
    this.setState({ UserProfile: this.state.UserProfile })
    console.log("dfrer", this.state.UserProfile);
    console.log("dfrer>>>", this.state.images1);
  }

  GetUserCountry() {
    const header = {
      "Content-Type": configJSON.UserCountryApiContentType,
      token: this.state.token
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

  EditProfile = () => {
    console.log("dfnnbgfjmbofkgop", this.state.UserProfile)
    const images = {
      data: "data:image/jpeg;base64," + this.state.images1
    }

    let data = {
      "attributes": {
        "type": "personal_information",
        "first_name": this.state.UserProfile?.first_name,
        "last_name": this.state.UserProfile?.last_name,
        "nick_name": this.state.UserProfile?.nick_name,
        // "date_of_birth": "29/10/1990",
        "email": this.state.UserProfile?.email,
        // "email": "jirenambaliya@gmail.com",
        // "address": "123, Main street, UK",
        "city": this.state.UserProfile?.city,
        "state": this.state.UserProfile?.state,
        "state_code": this.state.UserProfile?.state_code,
        // "zip_code": "000000",
        // "user_country_id": 103,
        "user_country_id": this.state.UserProfile?.user_country?.id,
        "headline": this.state.UserProfile?.headline,
        "current_position": this.state.UserProfile?.current_position,
        "country": this.state.UserProfile?.country,
        "summary": this.state.UserProfile?.summary,
        "visibility": this.state.UserProfile?.visibility,
      // "profile_image": images
      }

    }

  
    if (this.state.images1 !== "") {
      Object.assign(data.attributes, { profile_image: images });
    }


    const header = {
      "Content-Type": configJSON.EditProfileApiContentType,
      token: this.state.token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.editProfileId = requestMessage.messageId;

    const httpBody = {
      data: data
    };
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.urlEditProfile
    );


    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.EditProfileApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }

  GetCountrylist = () => {
    const header = {
      "Content-Type": configJSON.CountryApiContentType,
      token: this.state.token
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.CountryGetId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.urlGetCountry
      // configJSON.urlGetUserCountry
    );


    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.CountryApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }


  GetProfile = () => {
    const header = {
      "Content-Type": configJSON.GetProfileApiContentType,
      token: this.state.token
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
  }

  GetMainProfile = () => {
    const header = {
      "Content-Type": configJSON.GetProfileApiContentType,
      token: this.state.token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.MainProfileId = requestMessage.messageId;

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
  }

  GetStateslist = () => {
    const userCountryCode = this.state.UserProfile?.user_country?.country_code
    const header = {
      "Content-Type": configJSON.StateApiContentType,
      token: this.state.token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.StateGetId = requestMessage.messageId;
    // ${this.state.Country_name}
    let apiURL
    apiURL = `${configJSON.urlGetState}/states/${userCountryCode}`
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
  }

  GetCitylist = () => {
    const userCountryCode = this.state.UserProfile?.user_country?.country_code
    const userState = this.state.UserProfile?.state_code
    const header = {
      "Content-Type": configJSON.CityApiContentType,
      token: this.state.token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.CityGetId = requestMessage.messageId;
    let apiURL

    apiURL = `${configJSON.urlGetCity}/cities/${userCountryCode}/${userState}`

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
  }

 


 



 

 

  enableDisableEditPassword(isEditable: boolean) {
    if (configJSON.ACCOUNT_TYPE_SOCIAL === this.registrationAndLoginType) {
      this.setState({
        edtEmailEnabled: false,
        llDoChangePwdContainerVisible: false,
        llChangePwdDummyShowContainerVisible: false
      });
    } else {
      if (isEditable) {
        this.setState({
          llDoChangePwdContainerVisible: true,
          llChangePwdDummyShowContainerVisible: false
        });
      } else {
        this.setState({
          llDoChangePwdContainerVisible: false,
          llChangePwdDummyShowContainerVisible: true,
          currentPasswordText: "",
          newPasswordText: "",
          reTypePasswordText: ""
        });
      }
    }
  }

  goToPrivacyPolicy() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationPrivacyPolicyMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  goToTermsAndCondition() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationTermAndConditionMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  isStringNullOrBlank(str: string) {
    return str === null || str?.length === 0;
  }

  isValidEmail(email: string) {
    return this.emailReg.test(email);
  }

  requestSessionData() {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.uniqueSessionRequesterId = msg.messageId;
    this.send(msg);
  }

  getUserProfile() {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.userProfileGetApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.endPointApiGetUserProfile
    );

    const header = {
      "Content-Type": configJSON.contentTypeApiGetUserProfile,
      token: this.authToken
    };

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.methodTypeApiGetUserProfile
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  getValidations() {
    const headers = {
      "Content-Type": configJSON.validationApiContentType
    };

    const getValidationsMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.validationApiCallId = getValidationsMsg.messageId;

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.urlGetValidations
    );

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    runEngine.sendMessage(getValidationsMsg.id, getValidationsMsg);
  }


  txtInputFirstNameProps = {
    onChangeText: (text: string) => {
      this.setState({ firstName: text });

      //@ts-ignore
      this.txtInputFirstNameProps.value = text;
    }

  };

  txtInputLastNameProps = {
    onChangeText: (text: string) => {
      this.setState({ lastName: text });

      //@ts-ignore
      this.txtInputLastNameProps.value = text;
    }
  };

  txtInputPhoneNumberlWebProps = {
    onChangeText: (text: string) => {
      if (this.txtInputPhoneNumberlWebProps.editable) {
        this.setState({ phoneNumber: text })

        //@ts-ignore
        this.txtInputPhoneNumberProps.value = text;
      }
    },
    editable: true
  };

  txtInputPhoneNumberlMobileProps = {
    ...this.txtInputPhoneNumberlWebProps,
    autoCompleteType: "tel",
    keyboardType: "phone-pad",
  };

  txtInputPhoneNumberProps = this.isPlatformWeb()
    ? this.txtInputPhoneNumberlWebProps
    : this.txtInputPhoneNumberlMobileProps;

  txtInputEmailWebProps = {
    value: "",
    editable: true,
    onChangeText: (text: string) => {
      if (this.txtInputEmailProps.editable) {
        this.setState({ email: text })
        this.txtInputEmailProps.value = text
      }
    }
  }

  txtInputEmailMobileProps = {
    ...this.txtInputEmailWebProps,
    keyboardType: "email-address",
  }

  txtInputEmailProps = this.isPlatformWeb()
    ? this.txtInputEmailWebProps
    : this.txtInputEmailMobileProps;

  btnEnableEditPasswordProps = {
    onPress: () => this.enableDisableEditPassword(true)
  }

  txtInputCurrentPasswordProps = {
    onChangeText: (text: string) => {
      this.setState({ currentPasswordText: text })
      this.txtInputCurrentPasswordProps.value = text
    },
    value: "",
    secureTextEntry: true
  }

  btnPasswordShowHideButtonProps = {
    onPress: () => {
      this.setState({ enablePasswordField: !this.txtInputCurrentPasswordProps.secureTextEntry });
      this.txtInputCurrentPasswordProps.secureTextEntry = !this.txtInputCurrentPasswordProps.secureTextEntry
      this.imgPasswordShowhideProps.source = this.txtInputCurrentPasswordProps.secureTextEntry ? imgPasswordVisible : imgPasswordInVisible
    }
  }

  imgPasswordShowhideProps = {
    source: imgPasswordVisible
  }

  txtInputNewPasswordProps = {
    onChangeText: (text: string) => {
      this.setState({ newPasswordText: text })
      this.txtInputNewPasswordProps.value = text
    },
    value: "",
    secureTextEntry: true
  }

  btnNewPasswordShowHideButtonProps = {
    onPress: () => {
      this.setState({
        enableNewPasswordField: !this.txtInputNewPasswordProps.secureTextEntry
      });
      this.txtInputNewPasswordProps.secureTextEntry = !this.txtInputNewPasswordProps.secureTextEntry
      this.imgNewPasswordShowhideProps.source = this.txtInputNewPasswordProps.secureTextEntry ? imgPasswordVisible : imgPasswordInVisible
    }
  }

  imgNewPasswordShowhideProps = {
    source: imgPasswordVisible
  }

  txtInputReTypePasswordProps = {
    onChangeText: (text: string) => {
      this.setState({ reTypePasswordText: text })
      this.txtInputReTypePasswordProps.value = text
    },
    secureTextEntry: true,
    value: ""
  }

  imgReTypePasswordShowhideProps = {
    source: imgPasswordVisible
  }

  btnReTypePasswordShowHideProps = {
    onPress: () => {
      this.setState({
        enableReTypePasswordField: !this.txtInputReTypePasswordProps.secureTextEntry
      });
      this.txtInputReTypePasswordProps.secureTextEntry = !this.txtInputReTypePasswordProps.secureTextEntry
      this.imgReTypePasswordShowhideProps.source = this.txtInputNewPasswordProps.secureTextEntry ? imgPasswordVisible : imgPasswordInVisible
    }
  }

  btnDisableEditPasswordProps = {
    onPress: () => this.enableDisableEditPassword(false)
  }
  // Customizable Area End

}
