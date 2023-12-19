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
import AsyncStorage from "@react-native-async-storage/async-storage";



export const configJSON = require("./config");


export interface Props {
    navigation: any;
    id: string;

}

interface S {
    Loader: boolean
    value1: any
    Message: any
    Checkbox1: any
    Checkbox2: any
    Checkbox3: any
    Checkbox4: any
    Checkbox5: any
    Token: any
}

interface SS {
    id: any;

}

export default class AlertMessageSetting extends BlockComponent<Props, S, SS> {
    GetapiCallId: any = "";
    SetapiCallId: any = "";


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
            Message: "",
            Checkbox1: false,
            Checkbox2: false,
            Checkbox3: false,
            Checkbox4: false,
            Checkbox5: false,
            Token: ""
        };
        runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);


    }



    async componentDidMount() {
        this.setState({ Token: await AsyncStorage.getItem("Token") })
        this.Firstapi()
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

            this.receiveGet(responseJson, apiRequestCallId, errorReponse)
            if (apiRequestCallId === this.SetapiCallId) {
                if (responseJson != null) {
                    console.log(responseJson, "<----------");

                    if (responseJson.data != null) {
                        this.setState({ Loader: false })
                        const { navigation }: any = this.props
                        // navigation.navigate("Settings5")
                    } else {
                        this.setState({ Loader: false })
                        alert("ERROR")
                    }
                }
            }
        }
    }

    receiveGet = (responseJson: any, apiRequestCallId: any, errorReponse: any) => {
        if (apiRequestCallId === this.GetapiCallId) {
            if (responseJson != null) {
                console.log(responseJson, "<----------");

                if (responseJson.data != null) {

                    this.setState({ Loader: false })
                    const { navigation }: any = this.props
                    console.log("DADADADA", responseJson.data.attributes);
                    let temp = responseJson.data.attributes
                    this.setState({
                        Checkbox1: temp.emergency_contacts_and_first_responder,
                        Checkbox2: temp.only_first_responder,
                        Checkbox3: temp.emergency_contacts,
                        Checkbox4: temp.verified_voluntrees,
                        Checkbox5: temp.non_verified_voluntrees,
                        Message: temp.default_message,
                    })
                    // navigation.navigate("Settings5")
                } else {
                    this.setState({ Loader: false })
                    alert("ERROR")
                }


            }
        }
    }

    async Firstapi() {

        this.setState({ Loader: true })
        const header = {
            "Content-Type": configJSON.GetdataAPiContentType,
            token: this.state.Token
        };

        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );

        this.GetapiCallId = requestMessage.messageId;


        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.GetdataAPiEndPoint
        );
        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestHeaderMessage),
            JSON.stringify(header)
        );

        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestMethodMessage),
            configJSON.GetdataAPiMethod
        );

        runEngine.sendMessage(requestMessage.id, requestMessage);

        return true;

    }


    Editclcik() {
        this.setState({ Loader: true })
        const header = {
            "Content-Type": configJSON.SetdataAPiContentType,
            token: this.state.Token
        };
        const attrs = {
            default_message: this.state.Message,
            emergency_contacts_and_first_responder: this.state.Checkbox1,
            only_first_responder: this.state.Checkbox2,
            emergency_contacts: this.state.Checkbox3,
            verified_voluntrees: this.state.Checkbox4,
            non_verified_voluntrees: this.state.Checkbox5,
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

        this.SetapiCallId = requestMessage.messageId;


        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.SetdataAPiEndPoint
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
            configJSON.SetdataAPiMethod
        );

        runEngine.sendMessage(requestMessage.id, requestMessage);

        return true;

    }
    sendclick() {
        this.Editclcik()
    }


    goSignupScreen() {
        const { navigation }: any = this.props
        navigation.navigate("SignUpScreen")

    }
    goback() {
        const { navigation }: any = this.props
        navigation.goBack()
    }

}
// Customizable Area End
