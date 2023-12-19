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
import { pickImagesFromGellery , pickImageFromCamera} from "../../../components/src/ImagePicker";


export const configJSON = require("./config");


export interface Props {
    navigation: any;
    id: string;


}

interface S {


    images: any
    modal: boolean
    modal2: boolean
    Token: any
    id_proof: any
    id_proof_id: any
    Id_prrof_name: any
    Id_prrof_Number: any
    Loader: boolean
    progressBar: any
    imageUploadSuccessMsg: any

}

interface SS {
    id: any;


}

export default class Step1Controller extends BlockComponent<Props, S, SS> {

    IndentificationListId: any = "";
    IndentificationId: any = "";



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


            images: "",
            modal: false,
            modal2: false,
            Token: "",
            id_proof: [],
            id_proof_id: "",
            Id_prrof_name: 'Select ID',
            Id_prrof_Number: "",
            Loader: false,
            progressBar: 0,
            imageUploadSuccessMsg: ""


        };
        runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);



    }



    async componentDidMount() {
        await AsyncStorage?.setItem("SignON", "IdentificationScreen")

        let Token0 ;
        Token0 = await AsyncStorage?.getItem("Token")
        this.setState({ Token: Token0 })
        this.apicaaal()
    }

    apicaaal() {
        const header = {
            "Content-Type": configJSON.IdentificationApiContentType,
            token: this.state.Token
        };

        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );

        this.IndentificationListId = requestMessage.messageId;


        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.IdentificationAPiEndPoint
        );
        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestHeaderMessage),
            JSON.stringify(header)
        );
        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestMethodMessage),
            configJSON.IdentificationAPiMethod
        );

        runEngine.sendMessage(requestMessage.id, requestMessage);

        return true;
    }
    async receive(from: string, message: Message) {

        runEngine.debugLog("Message Recived", message);

        if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
            const apiRequestCallId = message.getData(
                getName(MessageEnum.RestAPIResponceDataMessage)
            );

            const responseJson = message.getData(
                getName(MessageEnum.RestAPIResponceSuccessMessage)
            );

            if (apiRequestCallId === this.IndentificationListId) {
                if (responseJson != null) {
                    console.log(responseJson, "<----------");

                    if (responseJson.errors != null) //istanbul ignore next
                    {
                        this.setState({ Loader: false })

                        Alert.alert(responseJson.errors[0])
                    } else //istanbul ignore next
                    {
                        this.setState({ Loader: false })
                        
                        this.setState({ id_proof: responseJson.identity_proof })
                        console.log('LOPKJIUL', this.state.id_proof);

                    }
                }
            }

            if (apiRequestCallId === this.IndentificationId) {
                this.identificationResponse(responseJson);
               
            }
        }

    }

    identificationResponse = (responseJson: any) => {
        if (responseJson != null) //istanbul ignore next
        {
            this.setState({ imageUploadSuccessMsg: responseJson.meta.message })
            if (responseJson.errors != null) //istanbul ignore next
             {
                this.setState({ Loader: false })
                Alert.alert(responseJson.errors[0])
            } else //istanbul ignore next
            {

                this.setState({ progressBar: 1 })
                // this.setState({ Loader: false, modal: true })
                setTimeout(() => {
                    this.setState({ modal: true })
                }, 900);

            }
        }
    }


    onclick() {

        this.setState({ progressBar: 0.2 })

        if (this.state.images != "") //istanbul ignore next
        {
            this.setState({ Loader: true })
            const header = {
                "Content-Type": configJSON.IdentificationUploadApiContentType,
                token: this.state.Token

            };
            const images = {
                data: "data:image/jpeg;base64," + this.state.images
            }

            const attrs = {
                volunteer_id_proof: images

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

            this.IndentificationId = requestMessage.messageId;


            requestMessage.addData(
                getName(MessageEnum.RestAPIResponceEndPointMessage),
                configJSON.IdentificationUploadAPiEndPoint
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
                configJSON.IdentificationUploadAPiMethod
            );

            runEngine.sendMessage(requestMessage.id, requestMessage);

            return true;
        } else {
            Alert.alert("Please Select Image")
        }


    }
    onclickModel() {
        this.setState({ modal: false })
        const { navigation }: any = this.props
        //  this.props.navigation.state.params?.from !== "EditProfile" ? navigation.navigate("EmergencyContact") : navigation.goBack()
        navigation.navigate("VolunteerRegistrationStep2")
    }
    goback() {
        const { navigation }: any = this.props
        navigation.goBack()
    }
    // Skip() {
    //     const { navigation }: any = this.props
    //     navigation.navigate("EmergencyContact")
    // }

    takePicture = () => {
        pickImageFromCamera().then((image) => {
            this.setState({ images: image.data });
            Alert.alert("Image take successfully")

        });
    };
    flatlist(item: any) {
        console.log(item);
        this.setState({ id_proof_id: item.id, Id_prrof_name: item.name, modal2: false })

    }

    selectImageFromGellary = () => {
        pickImagesFromGellery(true).then((images) => {
            this.setState({ images: images[0].data });
            Alert.alert("Image Select successfully")
        });
    };


}

// Customizable Area End