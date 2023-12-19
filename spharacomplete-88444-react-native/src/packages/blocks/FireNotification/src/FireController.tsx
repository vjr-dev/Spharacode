// Customizable Area Start
//@ts-ignore
//@ts-nocheck
import { IBlock } from "../../../framework/src/IBlock";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
    getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";


import {  Linking, Platform } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import { GotoHomePage } from "../../../components/src/Navigation/NavigationFunctions";



export const configJSON = require("./config");


export interface Props {
    navigation: any;
    id: string;
    
    
}

interface S {
    
    contacttdata: any
    Address: any
    Time: any
    
}

interface SS {
    id: any;
    
    
}

export default class MakeDonationController extends BlockComponent<Props, S, SS> {
    
    FiredataID: any = "";
    

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
            
            contacttdata: [],
            Address: "",
            Time: "",

            
        };
        runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

        
        
    }

    

    async componentDidMount() {
        this.setState({ contacttdata: this.props.route.params.DDA, Address: this.props.route.params.Address, Time: this.props.route.params.Time })
    }
   
    async onFireCall() {
        const data = await AsyncStorage.getItem("User_Data")
        if (data != null) 
        {
            if (Platform.OS == "android") {
                RNImmediatePhoneCall.immediatePhoneCall(JSON.parse(data).data.attributes.fire)
            } else {
                Linking.openURL(`telprompt:${JSON.parse(data).data.attributes.fire}`)

            }
        }
    }

    doneclick() {
        GotoHomePage(this.props);
    }
    goback() {
        this.props.navigation.goBack()
    }

    
}
// Customizable Area End
