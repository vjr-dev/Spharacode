

// Customizable Area Start
//@ts-nocheck
//@ts-ignore
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
    route: any;
    
    
}

interface S {
    
    Loader: boolean
    switch1: boolean
    VolunteerState: any
    ispublick: boolean
    Modal1: boolean
    Userdata: any
    Token: any
    count: number



    
}

interface SS {
    id: any;
    

    
}

export default class SecuritySetting extends BlockComponent<Props, S, SS> {
    
    GetdataApiCallId: any = "";
    SetdataApiCallId: any = "";
    getUserDataApiCallId: any = "";
    ToggleVolunteerApiCallId: any = "";
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
            
            Loader: false,
            switch1: false,
            VolunteerState: 0,
            ispublick: false,
            Modal1: false,
            Userdata: "",
            Token: "",
            count: 0

            
        };
        runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

        
        
    }

    async componentDidMount() {
        const tempToken = await AsyncStorage.getItem("Token");
        this.setState({ Token: tempToken})
          
        this.focusListener = this.props.navigation.addListener(
            "focus",
            async () => //istanbul ignore next
            {
                    if(this.props.route.params.VolunteerState == 1) //istanbul ignore next
                    {
                        this.setState({ VolunteerState: this.props.route.params.VolunteerState })
                    }
            }
          );

        this.setState({ Userdata: this.props.route.params.data }, () => {})
        this.setState({ switch1: this.state.Userdata.volunteer_setting.volunteering })
        if (this.state.Userdata.volunteer_setting.volunteering) //istanbul ignore next
        {
            this.setState({ VolunteerState: 1 })
        }
        
    }

   

   

    async SetVolunteerTypeAPI(userType: any) {
           
            
    let data = {
        "attributes": {
          "volunteer_type": userType
        }
  
      }
  
    
      
      const header = {
        "Content-Type": configJSON.SetVolunteerTypeContentType,
        token: this.state.Token
      };
  
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
  
      this.SetVolunteerTypeApiCallId = requestMessage.messageId;
  
      const httpBody = {
        data: data
      };
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(httpBody)
      );
  
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.SetVolunteerTypeAPiEndPoint
      );
  
  
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );
  
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.SetVolunteerTypeAPiMethod
      );
  
      runEngine.sendMessage(requestMessage.id, requestMessage);
  
      return true;

    }

    startclick() {
        this.setState({ Modal1: false}, () => {
            this.ispublicApi()

        })
         const { navigation }: any = this.props
         navigation.navigate("VolunteerRegistrationStep1")
       // this.setState({ Modal1: true })

    }
  
  
    async switch11(Val: any) {
        this.setState({ switch1: Val }, () => {
                // this.ToggleVolunteerAPI()
            
        })
        
    }
     ispublicApi() {
       
            const userType: string = "Public Volunteer" 
            this.SetVolunteerTypeAPI(userType)
        
    }

    goSignupScreen() {
        const { navigation }: any = this.props
        navigation.navigate("SignUpScreen")

    }
    goback() {
        const { navigation }: any = this.props
        navigation.goBack()
    }
    // Customizable Area End
}
