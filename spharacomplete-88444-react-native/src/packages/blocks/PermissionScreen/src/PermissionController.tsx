// Customizable Area Start
//@ts-ignore
//@ts-nocheck
import { IBlock } from "../../../framework/src/IBlock";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import { BackHandler } from "react-native";
import { backToLoginConfirmationAlert, displayErrorMessage, displayInfoMessage } from "../../../components/src/CustomAlert";
import { OnLogOut } from "../../../components/src/Navigation/logout";
import { getCameraPermission, getLocationPermission, getMicroPhonePermission, getPhonePermission, getReadContactsPermission, getStoragePermission } from "../../../components/src/Permissions";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
}

interface S {
  loaction: boolean;
  phone: boolean;
  contect: boolean;
  storage: boolean;
  camera: boolean;
  microphone: boolean;
  appsetting: boolean;
  isLoading: boolean;
  roleID: string
}

interface SS {
  id: any;
}

export default class PermissionController extends BlockComponent<Props, S, SS> {
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [];

    this.state = {
      loaction: false,
      phone: false,
      contect: false,
      storage: false,
      camera: false,
      microphone: false,
      appsetting: false,
      isLoading: false,
      roleID:''
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }
  async componentDidMount(): Promise<void> {
    const tempRoleID = await AsyncStorage.getItem("roleID");
    this.setState({ roleID: tempRoleID });
  }
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  handleBackButtonClick = async () => {
    backToLoginConfirmationAlert(async ()=> {
      this.setState({isLoading: true})
     await OnLogOut(this.props)
      this.setState({isLoading: false})
    });
    return true;
  }

  oNPermissionCheck = (name: string, isCheck:boolean) => {
   if(isCheck){
    this.givePermission(name);
   }else{
    this.removePermission(name);
   }
  }
  givePermission = (name: string) => {
    switch(name){
      case "Location":
        getLocationPermission().then(()=>{
          this.setState({loaction:true})
        })
        break;
      case "Phone":
        getPhonePermission().then(()=>{
          this.setState({phone:true})
        })
        break;
      case "Contacts":
        getReadContactsPermission().then(()=>{
          this.setState({contect:true})
        })
        break;
      case "Storage":
        getStoragePermission().then(()=>{
          this.setState({storage:true})
        })
        break;
      case "Camera":
        getCameraPermission().then(()=>{
          this.setState({camera:true})
        })
        break;
      case "Microphone":
        getMicroPhonePermission().then(()=>{
          this.setState({microphone:true})
        })
        break;
      case "App setting":
        getMicroPhonePermission().then(()=>{
          this.setState({appsetting:true})
        })
        break;
    }
  }
  removePermission = (name: string) => {
    switch(name){
      case "Location":
        this.setState({loaction:false})
        break;
      case "Phone":
        this.setState({phone:false})
        break;
      case "Contacts":
        this.setState({contect:false})
        break;
      case "Storage":
        this.setState({storage:false})
        break;
      case "Camera":
        this.setState({camera:false})
        break;
      case "Microphone":
        this.setState({microphone:false})
        break;
      case "App setting":
        this.setState({appsetting:false})
        break;
    }
  }
  onAllow = () => {
    if(this.state.loaction && this.state.camera && this.state.contect && this.state.microphone && this.state.phone && this.state.storage && this.state.appsetting){
      if(this.state.roleID === '1'){
        // displayInfoMessage("Under devlopment")
        this.props.navigation.replace("PersonalInformation", { from: "signUpFlow" });
      }else{
        this.props.navigation.replace("MedicalScreen", { from: "PermissionScreen" });
      }
    }else{
      displayErrorMessage("Please give all permission");
    }
  }
}

// Customizable Area End
