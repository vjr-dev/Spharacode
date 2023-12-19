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
import { AnyNaptrRecord } from "dns";
import { getDeviceContacts } from "../../../components/src/DeviceContacts";
import { backToLoginConfirmationAlert, displayConfirmAlert, displayErrorMessage, displaySuccessMessage } from "../../../components/src/CustomAlert";
import { OnLogOut } from "../../../components/src/Navigation/logout";
export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  route:any
}

interface S {
  contactType: number;
  deviceContacts: any;
  fetchContactStatus: string;
  selectedEmergencyContacts: any;
  selectedFriendContacts: any;
  selectedFamilyContacts: any;
  isManualContactAdd: false;
  manualName: string;
  manualNumber: string;
  isLoading:boolean,
  isPhoneContactLoding: boolean,
}

interface SS {
  id: any;
}

export default class EmergencyContact extends BlockComponent<Props, S, SS> {
  UploadcontactId: any = "";

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
      contactType: 1,
      deviceContacts: [],
      fetchContactStatus: "",
      selectedEmergencyContacts: [],
      selectedFriendContacts: [],
      selectedFamilyContacts: [],
      isManualContactAdd: false,
      manualName: "",
      manualNumber: "",
      isLoading:false,
      isPhoneContactLoding: true,
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    this.getInitialData();
  }
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick = async () => {
    if(this.props.route.params?.from === "AddContact"){
      this.props.navigation.pop();
      return true;
    }else{
      backToLoginConfirmationAlert(async ()=> {
        this.setState({isLoading: true})
       await OnLogOut(this.props)
        this.setState({isLoading: false})
      });
      return true;
    }
  }
  getInitialData = () => {
    const propsContactType = this.props.route.params?.contactType;
    if(propsContactType){
      this.setState({contactType:propsContactType})
    }
    getDeviceContacts()
      .then((responce) => {
        this.setState({ deviceContacts: responce.data });
        if (responce.data.length === 0) {
          this.setState({
            deviceContacts: [],
            fetchContactStatus: "Contacts are not available in your device.",
            isPhoneContactLoding: false,
          });
          
        } else {
          this.setState({ deviceContacts: responce.data , isPhoneContactLoding: false});
        }
      })
      .catch((error) => {
        this.setState({
          deviceContacts: [],
          fetchContactStatus: error.error,
        });
        this.setState({isPhoneContactLoding: false});
      });
  };
  isContactSelected = (item: any, contactType: number) => {
    let tempData = this.getTypeWiseContact(contactType);
    let isPresent = false;
    tempData.map((i) => {
      if (i.id === item.id) {
        isPresent = true;
      }
    });
    return isPresent;
  };
  onContactCheck = (item: any, contactType: number, isCheck: boolean) => {
    if (isCheck) {
      this.selectContact(item, contactType);
    } else {
      this.deSelectContact(item, contactType);
    }
  };
  getTypeWiseContact = (contactType: number) => {
    if (contactType === 1) {
      return this.state.selectedEmergencyContacts;
    } else if (contactType === 2) {
      return this.state.selectedFriendContacts;
    } else {
      return this.state.selectedFamilyContacts;
    }
  };
  setTypeWiseContact = (contactType: number, contacts: any) => {
    if (contactType === 1) {
      this.setState({ selectedEmergencyContacts: contacts });
    } else if (contactType === 2) {
      this.setState({ selectedFriendContacts: contacts });
    } else {
      this.setState({ selectedFamilyContacts: contacts });
    }
  };
  selectContact = (item: any, contactType: number) => {
    let tempData = this.getTypeWiseContact(contactType);
    tempData.push(item);
    this.setTypeWiseContact(contactType, tempData);
  };
  deSelectContact = (item: any, contactType: number) => {
    let tempData = this.getTypeWiseContact(contactType);
    tempData = tempData.filter((i) => i.id !== item.id);
    this.setTypeWiseContact(contactType, tempData);
  };
  getFinalContactArray = (contacts: any, type: string) => {
    let finalContacts = [];
    contacts.map((item: any) => {
      let tempObj = {};
      tempObj.name = item.name;
      tempObj.phone_number = item.number;
      tempObj.contact_type = type;
      finalContacts.push(tempObj);
    });
    return finalContacts;
  };
  onManualContactAdd = () => {
    this.setState({ isManualContactAdd: true });
  };
  closeManualContactAdd = () => {
    this.setState({
      isManualContactAdd: false,
      manualName: "",
      manualNumber: "",
    });
  };
  onNameChange = (text: string) => {
    this.setState({ manualName: text });
  };
  onNumberChange = (text: string) => {
    this.setState({ manualNumber: text });
  };
  onManualContactSave = () => {
    if(this.state.manualName && this.state.manualNumber){
      let tempObj = {};
      let type;
      if (this.state.contactType === 1) {
        type = "emergency_contact";
      } else if (this.state.contactType === 2) {
        type = "friends";
      } else {
        type = "family";
      }
      tempObj.name = this.state.manualName;
      tempObj.phone_number = this.state.manualNumber;
      tempObj.contact_type = type;
      console.log("aaa->> ", [tempObj]);
      this.saveContactsToServer([tempObj]);
    }else{
      displayErrorMessage("Please add name and number both before save contact.")
    }
    
  };
  onSave = () => {
    let finalContacts = [];
    finalContacts.push(
      ...this.getFinalContactArray(
        this.state.selectedEmergencyContacts,
        "emergency_contact"
      )
    );
    finalContacts.push(
      ...this.getFinalContactArray(this.state.selectedFamilyContacts, "family")
    );
    finalContacts.push(
      ...this.getFinalContactArray(this.state.selectedFriendContacts, "friends")
    );
    this.saveContactsToServer(finalContacts);
  };
  saveContactsToServer = async (contacts: any) => {
    this.setState({isLoading: true})
    let token = await AsyncStorage.getItem("Token");
    const header = {
      "Content-Type": configJSON.UploadcontactApiContentType,
      token: token,
    };
    const body = {
      data: {
        attributes: {
          contacts: contacts,
        },
      },
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.UploadcontactId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.UploadcontactAPiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(body)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.UploadcontactAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };
  async receive(from: string, message: Message) {
    runEngine.debugLog("Message RecivedECC397", message);

    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (apiRequestCallId === this.UploadcontactId) {
        if (responseJson != null) {
          if (responseJson?.errors != null) {
            this.setState({isLoading: false})
            displayErrorMessage(responseJson.errors ?? "Somethings went wrong");
          } else {
            this.setState({
              isLoading: false,
              selectedEmergencyContacts: [],
              selectedFriendContacts: [],
              selectedFamilyContacts: [],
              manualName: "",
              manualNumber: "",
              isManualContactAdd: false,
              contactType: 1,
            });
            displaySuccessMessage("Contacts save successfully.");
            await AsyncStorage.setItem(
              "isEmergencyContactNumberAdded",
              JSON.stringify(true)
            );
            if (this.props.route.params?.from === "AddContact") {
              this.props.navigation.pop();
            } else {
              this.props.navigation.replace("AddEmergencyContact", {
                from: "EmergencyContact", contactType: 1
              });
            }
          }
        }
      }
    }
  }
}
// Customizable Area End
