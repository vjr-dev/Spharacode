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
import {  Linking, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import { GotoHomePage } from "../../../components/src/Navigation/NavigationFunctions";



export const configJSON = require("./config");


export interface Props {
    navigation: any;
    id: string;
   
}

interface S {
    data: any
    DModal: boolean
    SAmountstatus: number
    Reason: any
    images1: any
    images2: any
    images3: any
    images4: any
    People: any
    Token: any
    Ambulancedata: any
    SelectedAmbulance: any
    Loader: any
    Contactdata: any
    Addres: any
    Time: any
    
}

interface SS {
    id: any;
   
}

export default class MakeDonationController extends BlockComponent<Props, S, SS> {
   
    FirstapiID: any = "";
    AmbulaceID: any = "";
   

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
            data: [1, 2, 3, 4, 5],
            DModal: true,
            SAmountstatus: 0,
            People: 0,
            Reason: "",
            images1: "",
            images2: "",
            images3: "",
            images4: "",
            Token: "",
            Ambulancedata: [],
            SelectedAmbulance: 0,
            Loader: true,
            Contactdata: [],
            Addres: "",
            Time: ""

        };
        runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

        
    }

   

    async componentDidMount() {
         this.setState({ Token: await AsyncStorage.getItem("Token") })


        this.setState({ Contactdata: this.props.route.params.DDD, Addres: this.props.route.params.Address, Time: this.props.route.params.Time })

        this.FirstApi()
    }

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

           this.receiveFirstApi(responseJson,apiRequestCallId,errorReponse)

            if (apiRequestCallId === this.AmbulaceID) {
                // this.setState({ isgetLoader: false, ispostLoader: false })
                if (responseJson != null && !responseJson.error && !responseJson.errors) {
                    console.log('responseambulance()()',responseJson)
                    this.setState({ Loader: false, Contactdata: responseJson.contacts })
                    const { navigation }: any = this.props
                    navigation.navigate("AmbulanceNotification", { DDD: this.state.Contactdata })
                    console.log(this.state.Contactdata, "CONTACTDATA");
                } else {
                    console.log("error");
                    setTimeout(() => {
                        this.parseApiErrorResponse(responseJson);
                    }, 500);
                }
            }
           
        }
    
    }


    receiveFirstApi = (responseJson: any, apiRequestCallId: any,errorReponse:any) =>{
        if (apiRequestCallId === this.FirstapiID) {
            if (responseJson != null) {

                if (responseJson.errors != null) {
                    this.setState({ Loader: false })

                    alert(responseJson.errors[0])
                } else {
                    this.setState({ Loader: false })
                    const { navigation }: any = this.props
                    this.setState({ Ambulancedata: responseJson.ambulance_for })

                }
            }
        }
    }


    FirstApi() {
        const header = {
            "Content-Type": configJSON.AmbulancedataApiContentType,
            token: this.state.Token
        };


        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );

        this.FirstapiID = requestMessage.messageId;


        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.AmbulancedataAPiEndPoint
        );
        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestHeaderMessage),
            JSON.stringify(header)
        );

        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestMethodMessage),
            configJSON.AmbulancedataAPiMethod
        );

        runEngine.sendMessage(requestMessage.id, requestMessage);

        return true;

    }

    async onAmbulanceCall() {
        const data = await AsyncStorage.getItem("User_Data")
        if (data != null) {
            if (Platform.OS == "android") {
                RNImmediatePhoneCall.immediatePhoneCall(JSON.parse(data)?.data?.attributes?.ambulance)
            } else {
                Linking.openURL(`telprompt:${JSON.parse(data)?.data?.attributes?.ambulance}`)

            }
        }
    }

   /* Send_ambulance_requast_Api() {
        const header = {
            "Content-Type": configJSON.SendambulanceApiContentType,
            token: this.state.Token
        };

        let ad = []

        if (this.state.images1 != "") {
            ad.push({ data: "data:image/jpeg;base64," + this.state.images1 })
        }
        if (this.state.images2 != "") {
            ad.push({ data: "data:image/jpeg;base64," + this.state.images2 })
        }
        if (this.state.images3 != "") {
            ad.push({ data: "data:image/jpeg;base64," + this.state.images3 })
        }
        if (this.state.images4 != "") {
            ad.push({ data: "data:image/jpeg;base64," + this.state.images4 })
        }

        const images = ad
        console.log(images, "AADD");


        const attrs = {
            call_ambulance_for_id: this.state.SelectedAmbulance,
            people_count: this.state.People,
            incident_picture: images

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

        this.AmbulaceID = requestMessage.messageId;


        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.SendambulanceAPiEndPoint
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
            configJSON.SendambulanceAPiMethod
        );

        runEngine.sendMessage(requestMessage.id, requestMessage);

        return true;

    }
    sendclick() {
        if (this.state.SelectedAmbulance != "") {
            if (this.state.People != "") {
                this.setState({ Loader: true })
                this.Send_ambulance_requast_Api()
            } else {
                alert("Please Enter number of People's")
            }

        } else {
            alert("Please Select The Reason")
        }
    }*/


    doneclick() {
        GotoHomePage(this.props);
    }
    goback() {
        const { navigation }: any = this.props
        navigation.goBack()
    }
    
}
// Customizable Area End
