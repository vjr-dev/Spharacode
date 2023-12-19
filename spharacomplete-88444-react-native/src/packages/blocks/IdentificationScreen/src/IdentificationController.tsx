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
import { BackHandler } from "react-native";
import { backToLoginConfirmationAlert, displayErrorMessage, displaySuccessMessage } from "../../../components/src/CustomAlert";
import { OnLogOut } from "../../../components/src/Navigation/logout"; 
import { pickImageFromCamera, pickImagesFromGellery } from "../../../components/src/ImagePicker";
import { GotoFirstResponderHomePage } from "../../../components/src/Navigation/NavigationFunctions";


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
    isImageFromGallery:boolean,
    isImageFromCamera: boolean,
    userType:string;
    isLoadingLogout: boolean,
    comment: string,
}

interface SS {
    id: any;
}

export default class Identification extends BlockComponent<Props, S, SS> {
    IdentificationListId: string = "";
    IdentificationId: string = "";
    communityHelpersId: string = "";

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
            isImageFromGallery:false,
            isImageFromCamera: false,
            userType:"",
            isLoadingLogout: false,
            comment:"",
        };
        runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    }

    async componentDidMount() {
        await AsyncStorage.setItem("SignON", "IdentificationScreen")
        let isUserType = await AsyncStorage.getItem("roleID")
        let Token0: any = await AsyncStorage.getItem("Token")
        this.setState({ userType:isUserType,Token: Token0,Id_prrof_name:isUserType == "1" ? "You serve as..." : "Select ID"})
        this.state.userType == 1 ?
        this.communityHelpersData():
        this.apiCall()
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    componentWillUnmount() {
          BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    handleBackButtonClick = async () => {
    if(this.props.route.params?.from === "EditProfile" ){
        this.props.navigation.pop();
        return true;
    }else{
        backToLoginConfirmationAlert(async ()=> {
            this.setState({isLoadingLogout: true})
            await OnLogOut(this.props)
            this.setState({isLoadingLogout: false})
        });
        return true;
        
    }
    }

    apiCall() {
        const header = {
            "Content-Type": configJSON.IdentificationApiContentType,
            token: this.state.Token
        };

        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );

        this.IdentificationListId = requestMessage.messageId;


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

    identificationListResponse = (responseJson: any) => {
        if (responseJson != null) {
            if (responseJson.errors != null) {
                this.setState({ Loader: false })
                displayErrorMessage(responseJson.errors[0]);
            } else {
                this.setState({ Loader: false,id_proof: this.state.userType == 1 ? responseJson.credential_types : responseJson.identity_proof })

            }
        }
    }

    identificationResponse = async(responseJson: any) => {
                if (responseJson != null) {
            if (responseJson.errors != null) {
                this.setState({ Loader: false })
                displayErrorMessage(responseJson.errors[0]);
            } else {
                this.setState({ progressBar: 1 })
                await AsyncStorage.setItem("has_user_credential", "true");
                setTimeout(() => {
                    this.setState({ modal: true })
                }, 900);

            }
        }
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

            if (apiRequestCallId === this.IdentificationListId) {
                this.identificationListResponse(responseJson);
            }

            if (apiRequestCallId === this.IdentificationId) {
                this.identificationResponse(responseJson);
            }

            if (apiRequestCallId === this.communityHelpersId) {
                this.identificationListResponse(responseJson);
            }
        }
    }

    onUploadData() {
        this.setState({ progressBar: 0.2 })
        if (this.state.id_proof_id != "") {
            if (this.state.userType == 1 ? this.state.Id_prrof_Number == "" : this.state.Id_prrof_Number != "") {
                if (this.state.images != "") {
                    // if(this.state.Id_prrof_name ==this.state.comment == "")
                    this.setState({ Loader: true })
                    const header = {
                        "Content-Type": configJSON.IdentificationUploadApiContentType,
                        token: this.state.Token

                    };
                    const images = {
                        data: "data:image/jpeg;base64," + this.state.images
                    }
                    const attrs = {
                        identity_proof_id: this.state.id_proof_id,
                        id_number: this.state.Id_prrof_Number,
                        id_proof: images

                    };
                    const data1 = {
                        attributes: attrs
                    };
                    const httpBody = {
                        data: data1
                    };

                    const firstResponderAttrs = {
                        comment:this.state.comment,
                        credential_type_id: this.state.id_proof_id,
                        credential_media: images
                    };
                    
                    const firstResponderData = {
                        attributes: firstResponderAttrs
                    };
                    const httpBodyFirstResponder = {
                        data: firstResponderData
                    };
                    
                    const requestMessage = new Message(
                        getName(MessageEnum.RestAPIRequestMessage)
                    );

                    this.IdentificationId = requestMessage.messageId;


                    requestMessage.addData(
                        getName(MessageEnum.RestAPIResponceEndPointMessage),
                        this.state.userType == 1 ? configJSON.UploadCredAPiEndPoint : configJSON.IdentificationUploadAPiEndPoint
                    );
                    requestMessage.addData(
                        getName(MessageEnum.RestAPIRequestHeaderMessage),
                        JSON.stringify(header)
                    );

                    requestMessage.addData(
                        getName(MessageEnum.RestAPIRequestBodyMessage),
                        JSON.stringify(this.state.userType == 1 ? httpBodyFirstResponder : httpBody)
                    );

                    requestMessage.addData(
                        getName(MessageEnum.RestAPIRequestMethodMessage),
                        configJSON.IdentificationUploadAPiMethod
                    );

                    runEngine.sendMessage(requestMessage.id, requestMessage);

                    return true;
                } else {
                    displayErrorMessage("Please upload document")
                }
            } else {
                displayErrorMessage("Please enter ID number")
            }
        } else {
            displayErrorMessage("Please select ID type")
        }
    }
    onclickModel() {
        this.setState({ modal: false })
        const { navigation }: any = this.props
        if(this.props.route.params?.from == "EditProfile"){
         navigation.pop()
        }else{
            if(this.state.userType == 1){
                GotoFirstResponderHomePage(this.props) 
            }else{
                navigation.replace("EmergencyContact")
            }
        }
        // this.state.userType == 1 ?
        // GotoFirstResponderHomePage(this.props):
        // this.props.route.params?.from !== "EditProfile" ? navigation.replace("EmergencyContact") : navigation.pop()
    }
    goBack() {
        const { navigation }: any = this.props
        navigation.pop()
    }
    Skip() {
    if(this.state.userType == 1){
        this.props.navigation.replace("FirstResponderHomePage")
        return;
    }
        const { navigation }: any = this.props
        navigation.replace("EmergencyContact")
    }

    takePicture = async () => {
        pickImageFromCamera().then((image: any)=>{
            this.setState({
                images: image.data , isImageFromCamera:true
            });
            displaySuccessMessage("Image picked successfully")
        })
    };

    onItemClick(item: any) {
        this.setState({ Id_prrof_Number:'',id_proof_id: item.id, Id_prrof_name: item.name, modal2: false })
    }

    showModal2(isVisible: boolean) {
        this.setState({ modal2: isVisible })
    }

    selectImageFromGallery = async () => {
        pickImagesFromGellery(true).then((images: any)=>{
          this.setState({
            images: images[0].data, isImageFromGallery:true
          });
          displaySuccessMessage('Image selected successfully');
        })
    };

    communityHelpersData=()=> {
        const header = {
            "Content-Type": configJSON.IdentificationApiContentType,
            token: this.state.Token
        };
        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );

        this.communityHelpersId = requestMessage.messageId;

        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.communityHelpersAPiEndPoint
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
}
// Customizable Area End