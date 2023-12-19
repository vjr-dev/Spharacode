// Customizable Area Start
//@ts-ignore
//@ts-nocheck
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
    getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";


import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from "react-native";



export const configJSON = require("./config");


export interface Props {
    navigation: any;
    id: string;
    
    
}

interface S {
    
    Loader: boolean
    value1: number
    Token: any
    Userdata: any

    
}

interface SS {
    id: any;
    
    
}

export default class DialDelay extends BlockComponent<Props, S, SS> {
    
    SetsettingID: any = "";
    

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
            
            Loader: false,
            value1: 30,
            Userdata: "",
            Token: "",

            
        };
        runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

        
        
    }


    


     componentDidMount() {
         this.setState({ Userdata: this.props.route.params.data })
        
        this.setState({ Token: AsyncStorage.getItem("Token") })
        this.setState({ value1: this.state.Userdata.dial_delay })
    }
    //istanbul ignore next
    async receive(from: string, message: Message) {
        
        runEngine.debugLog("Message Recived", message);

        if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
            const apiRequestCallId = message.getData(
                getName(MessageEnum.RestAPIResponceDataMessage)
            );

            let responseJson = message.getData(
                getName(MessageEnum.RestAPIResponceSuccessMessage)
            );

            let errorReponse = message.getData(
                getName(MessageEnum.RestAPIResponceErrorMessage)
            );

            if (apiRequestCallId === this.SetsettingID) {
                if (responseJson != null) {

                    if (responseJson.data != null) {

                        this.setState({ Loader: false })
                    } else {
                        this.setState({ Loader: false })
                        Alert.alert(errorReponse)
                    }


                }
            }
        }
    }

    async setClick() {

        this.setState({ Loader: true })
        const header = {
            "Content-Type": configJSON.UpdatesettingAPiContentType,
            token: this.state.Token
        };
        const attrs = {
            dial_delay: this.state.value1,
        };
        const data1 = {
            attributes: attrs
        };
        const httpBody = {
            data: data1
        };
        console.log(httpBody, "httpBody");

        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );

        this.SetsettingID = requestMessage.messageId;


        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.UpdatesettingAPiEndPoint
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
            configJSON.UpdatesettingAPiMethod
        );

        runEngine.sendMessage(requestMessage.id, requestMessage);

        return true;

    }


    goback() {
        const { navigation }: any = this.props
        navigation.goBack()
    }
    
}
// Customizable Area End