// Customizable Area Start
//@ts-ignore
//@ts-nocheck
import { BlockComponent } from "framework/src/BlockComponent";
import { IBlock } from "framework/src/IBlock";
import { runEngine } from "framework/src/RunEngine";
import { GotoHomePage } from "../../../components/src/Navigation/NavigationFunctions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginOnChat } from "../../../components/src/CometChatCommonFunctions";
import { Alert } from "react-native";

export const configJSON = require("./config");
export interface Props {
  navigation: any;
  id: string;
}
interface S {
  screenFlag:string,
  isUserLoggedIn: boolean
}
interface SS {
  id: any;
}

export default class ChatDashBoardController extends BlockComponent<Props, S, SS> {
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.state = {
        screenFlag:'chats',
        isUserLoggedIn: false
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }
  componentDidMount(): Promise<void> {
    this.getInitialData();
  }
  async getInitialData(){
    const tempUserData = await AsyncStorage.getItem("User_Data");
    const userData = JSON.parse(tempUserData);
    loginOnChat(userData.data.attributes?.full_phone_number).then((response:any)=>{
      this.setState({isUserLoggedIn: true})
    }).catch((error: any)=>{
      Alert.alert("","Something went wrong, please try again")
    })
  }
	onSwitch(screen:string){
		this.setState({screenFlag: screen})
	}
	onPressLogo(){
		GotoHomePage(this.props);
	}
}
// Customizable Area End
