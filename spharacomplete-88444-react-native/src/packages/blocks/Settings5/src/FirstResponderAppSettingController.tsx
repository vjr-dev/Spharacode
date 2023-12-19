// Customizable Area Start
//@ts-nocheck
//@ts-ignore
import { IBlock } from "../../../framework/src/IBlock";

import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
    getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";



export const configJSON = require("./config");

export interface Props {
    navigation: any;
    id: string;


}

interface S {
    txtInputValue: string;
    txtSavedValue: string;
    enableField: boolean;

    Loader: boolean;
    Token: any;
    userdata: any;
    User_Number: any;

}

interface SS {
    id: any;


}

export default class FirstResponderAppSettingController extends BlockComponent<Props, S, SS> {

    getListId: any = "";
    LogoutapiId: any = "";
    focusListener: any;




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
        };
        runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);


    }

    goBack() {
        this.props.navigation.goBack()
    }

    async navigateTo(item: any) {
        
        if(item === "SecuritySetting") {
            this.props.navigation.navigate("SecuritySetting")
        }
        else {
            this.props.navigation.navigate("FirstResponderSetWorkingHours")
        }
    
      }
    
    
    

}
// Customizable Area Start