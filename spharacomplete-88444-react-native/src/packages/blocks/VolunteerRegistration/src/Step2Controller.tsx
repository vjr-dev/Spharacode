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



export const configJSON = require("./config");


export interface Props {
    navigation: any;
    id: string;
   
}

interface S {
   
    Loader: boolean
    Number: any
    Modal1: boolean
    Token: any
    
}

interface SS {
    id: any;
}

export default class SecuritySetting extends BlockComponent<Props, S, SS> {
   
    apiEmailLoginCallId: any = "";
    ToggleVolunteerApiCallId: any = ""

   

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
            Number: 0,
            Modal1: false,
            Token: "",
           
        };
        runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    }


   
    async componentDidMount() {
 
        this.setState({ Token: await AsyncStorage.getItem("Token") })
       
    }


    async receive(from: string, message: Message) {
      
        runEngine.debugLog("Message Recived-DBC-136", message);
       

    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {

            const apiRequestCallId = message.getData(
                getName(MessageEnum.RestAPIResponceDataMessage)
            );
    
            let responseJson = message.getData(
                getName(MessageEnum.RestAPIResponceSuccessMessage)
            );
              
            if(apiRequestCallId === this.ToggleVolunteerApiCallId) //istanbul ignore next
            {
                if(responseJson != null) //istanbul ignore next
                {
                    this.setState({ Loader: false,Modal1: true })
                }
                else {
                    
                    this.setState({ Loader: false })
                }
            }
        }
    }


    Verifyclick() {
    
        this.ToggleVolunteerAPI()
    }

    async ToggleVolunteerAPI() {
        this.setState({ Loader: true })

   let data = {
     "attributes": {
       "verified": true
     }

   }

   console.log("VERIFYID",data);
   
   const header = {
     "Content-Type": configJSON.ToggleVolunteerContentType,
     token: this.state.Token
   };

   const requestMessage = new Message(
     getName(MessageEnum.RestAPIRequestMessage)
   );

   this.ToggleVolunteerApiCallId = requestMessage.messageId;

   const httpBody = {
     data: data
   };

   console.log("VERIFYhttpbody", JSON.stringify(httpBody));
   requestMessage.addData(
     getName(MessageEnum.RestAPIRequestBodyMessage),
     JSON.stringify(httpBody)
   );

   requestMessage.addData(
     getName(MessageEnum.RestAPIResponceEndPointMessage),
     configJSON.ToggleVolunteerAPiEndPoint
   );


   requestMessage.addData(
     getName(MessageEnum.RestAPIRequestHeaderMessage),
     JSON.stringify(header)
   );

   requestMessage.addData(
     getName(MessageEnum.RestAPIRequestMethodMessage),
     configJSON.ToggleVolunteerAPiMethod
   );

   runEngine.sendMessage(requestMessage.id, requestMessage);

   return true;
   }

    
    modalclick() {
        this.setState({ Modal1: false })
        const { navigation }: any = this.props
        navigation.navigate("VolunteerRegistration", { VolunteerState: 1 })

    }
    ison() {
        let nu = this.state.Number
        let num = nu.length
        if (num >= 4) 
        { //istanbul ignore next
            return true
        } else {
            return false
        }
    }
  
    goback() {
        this.props.navigation.goBack()
    }
}
// Customizable Area End