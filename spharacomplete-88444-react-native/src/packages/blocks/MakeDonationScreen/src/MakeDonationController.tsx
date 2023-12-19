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
import { Alert } from "react-native";



export const configJSON = require("./config");


export interface Props {
    navigation: any;
    id: string;
    
    
}

interface S {
    
    data: any;
    DModal: boolean;
    SAmountstatus: number;
    Amount: any;
    token: any;
    Donation_list: any;
    final_list: any;
    Donatt_to: any

    
}

interface SS {
    id: any;
    
    
}

export default class MakeDonationController extends BlockComponent<Props, S, SS> {
    
    DonationGetId: any;
    

    constructor(props: Props) {
        super(props);
        this.receive = this.receive.bind(this);

        
        this.subScribedMessages = [
            
            getName(MessageEnum.RestAPIResponceMessage),
            getName(MessageEnum.RestAPIResponceDataMessage),
            getName(MessageEnum.RestAPIResponceSuccessMessage),
            getName(MessageEnum.RestAPIResponceErrorMessage),
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            getName(MessageEnum.RestAPIRequestMessage),
            getName(MessageEnum.RestAPIRequestHeaderMessage),
            getName(MessageEnum.RestAPIRequestMethodMessage),
            
        ];

        this.state = {
            
            data: [1, 2, 3, 4, 5],
            DModal: true,
            SAmountstatus: 0,
            Amount: 0,
            token: "",
            Donation_list: "",
            final_list: [],
            Donatt_to: "you are more concerned to"
            
        };
        runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

        
        
    }

    
    //istanbul ignore next
    async componentDidMount() {

        let TOKEN = await AsyncStorage.getItem("Token")
        this.setState({ token: TOKEN })

        this.GetDonationlist()



    }
    flatclick(item: any) {
        this.setState({ DModal: true, Donatt_to: item })

    }
    donatclick() {
        if (this.state.Amount != 0) {
            this.props.navigation.navigate("PaymentDonation", { Amount: this.state.Amount, Dto: this.state.Donatt_to })
        } else {
            Alert.alert("Please Enter Amount")
        }
    }

    coustomamount(TT: any) {
        this.setState({ Amount: TT, SAmountstatus: 0 })
        console.log(this.state.Amount, TT);

    }

    staticamount1() {
        this.setState({ SAmountstatus: 1, Amount: 100 })
        console.log("1", this.state.Amount);
    }
    staticamount2() {
        this.setState({ SAmountstatus: 2, Amount: 500 })
        console.log("2", this.state.Amount);

    }
    staticamount3() {
        this.setState({ SAmountstatus: 3, Amount: 1000 })
        console.log("3", this.state.Amount);

    }
    staticamount4() {
        console.log("4");
        this.setState({ SAmountstatus: 4, Amount: 2000 })
        console.log("4", this.state.Amount);

    }

    onclick() {
       
        this.props.navigation.navigate("PaymentDonation")
    }
    goback() {
        const { navigation }: any = this.props
        navigation.pop()
    }

    //istanbul ignore next
    async receive(from: string, message: Message) {
        
        runEngine.debugLog("on recieive==>" + JSON.stringify(message));
        
        if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
            const apiRequestCallId = message.getData(
                getName(MessageEnum.RestAPIResponceDataMessage)
            );
            let responseJson = message.getData(
                getName(MessageEnum.RestAPIResponceSuccessMessage)
            );
            const errorReponse = message.getData(
                getName(MessageEnum.RestAPIResponceErrorMessage)
            );
            if (errorReponse) {
                this.parseApiCatchErrorResponse(errorReponse);
                return
            }
            if (apiRequestCallId && responseJson) {
                if (apiRequestCallId === this.DonationGetId) {
                    this.GetDonationAPI(responseJson)
                   
                }
            }
        }
    }
    //istanbul ignore next
    GetDonationAPI(responseJson: any) {
        console.log("Deep--> ", responseJson);
        if (responseJson != null && !responseJson.error && !responseJson.errors) {
            let arr = []
            
            this.setState({
                Donation_list: responseJson
            })
            const listdata = this.state.Donation_list.donate_list.data
            for (let i = 0; i < listdata.length; i++) {
                
                let ds: any = this.state.Donation_list.donate_list.data[i].attributes.name
                
                arr.push(ds)
            }
            for (let j = 0; j < this.state.Donation_list.amount.length; j++) {
                let amt: any = this.state.Donation_list.amount[j]
                console.log(amt);
            }
            // this.setState({ Amount: amount })
            this.setState({ final_list: arr })
            console.log("FINAL DATA", this.state.final_list);
            console.log("FINAL AMOUNT", this.state.Amount);

        } else {
            console.log("error");
            setTimeout(() => {
                this.parseApiErrorResponse(responseJson);
            }, 500);
        }

    }

    GetDonationlist = () => {
        const header = {
            "Content-Type": configJSON.DonationApiContentType,
            token: this.state.token
        };

        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );

        this.DonationGetId = requestMessage.messageId;

        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.DonationGetAPi
        );


        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestHeaderMessage),
            JSON.stringify(header)
        );

        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestMethodMessage),
            configJSON.DonationGetMethodType
        );

        runEngine.sendMessage(requestMessage.id, requestMessage);

        return true;
    }

    
}
// Customizable Area End