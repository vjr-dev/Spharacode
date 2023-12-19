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
import Dashboard from '../../DashBord/src/DashbordController';
import AsyncStorage from "@react-native-async-storage/async-storage";



export const configJSON = require("./config");


export interface Props {
    navigation: any;
    id: string;
    
    
}

interface S {
    
    Loader: boolean
    value1: any
    value2: any
    Userdata: any
    Token: any

    
}

interface SS {
    id: any;
    
    
}

export default class AlarmDelay extends BlockComponent<Props, S, SS> {
    
    SetsettingID: any = "";
    private shackInstance: Dashboard;
    

    constructor(props: Props) {
        super(props);
       this.shackInstance = new Dashboard(props);
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
            value1: 10,
            value2: 5,
            Userdata: "",
            Token: "",

            
        };
        runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  
    }

    async componentDidMount() {
        this.setState({ Userdata: this.props.route.params.data })
        this.setState({ Token: await AsyncStorage.getItem("Token") })
        this.setState({ value1: this.state.Userdata.voice_activation_alarm_delay, value2: this.state.Userdata.gesture_delay })
    }
    async receive(from: string, message: Message) {
        
        runEngine.debugLog("Message Recived", message);

        if (message.id === getName(MessageEnum.RestAPIResponceMessage)) //istanbul ignore next
          {
            const apiRequestCallId = message.getData(
                getName(MessageEnum.RestAPIResponceDataMessage)
            );

            let responseJson = message.getData(
                getName(MessageEnum.RestAPIResponceSuccessMessage)
            );

            if (apiRequestCallId === this.SetsettingID) //istanbul ignore next
            {
                if (responseJson != null) //istanbul ignore next
                {
                    
                    if (responseJson.data != null) //istanbul ignore next
                    {

                        this.setState({ Loader: false })
             
                        await AsyncStorage.setItem("ShakeEventValue", JSON.stringify(responseJson?.data?.attributes?.gesture_delay))
                    } else  //istanbul ignore next
                    {
                        this.setState({ Loader: false })
                        alert("ERROR")
                    }


                }
            }
        }
    }

    setclick = async () => {

        this.setState({ Loader: true })
        const header = {
            "Content-Type": configJSON.UpdatesettingAPiContentType,
            token: this.state.Token
        };
        const attrs = {
            voice_activation_alarm_delay: this.state.value1,
            gesture_delay: this.state.value2,
        };
        const data1 = {
            attributes: attrs
        };
        const httpBody = {
            data: data1
        };
        
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
    

    goSignupScreen=() => {
        const { navigation }: any = this.props
        navigation.navigate("SignUpScreen")

    }
    goback =() => {
        const { navigation }: any = this.props
        navigation.goBack()
    }
    
}
// Customizable Area End