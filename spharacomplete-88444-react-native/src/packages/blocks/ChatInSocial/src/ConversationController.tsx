// Customizable Area Start
//@ts-ignore
//@ts-nocheck
import { CometChat } from "@cometchat-pro/react-native-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlockComponent } from "framework/src/BlockComponent";
import { IBlock } from "framework/src/IBlock";
import { Message } from "framework/src/Message";
import { runEngine } from "framework/src/RunEngine";
import React from "react";
import { BackHandler, Platform, Alert} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import DocumentPicker from "react-native-document-picker";

import RNAndroidKeyboardAdjust from "rn-android-keyboard-adjust";
import { v4 as uuidv4 } from "uuid";
import { pickImageFromCamera } from "../../../components/src/ImagePicker";
export const configJSON = require("./config");

let selectedConversation = React.createContext(null);
let listenerID: string = "#ABDR@44R";
export interface Props {
  navigation: any;
  id: string;
  route: any;
}

interface S {
  messages: any;
  onSendMessage: string;
  myUserId: string;
  selectedFile: any;
  sendMessageConfirmation: boolean;
  cameraFile: any;
  imageLoading: boolean;
}

interface SS {
  id: any;
}
export default class ConversationController extends BlockComponent<
  Props,
  S,
  SS
> {
  focusListener: any;
  backHandler: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      messages: [],
      onSendMessage: "",
      myUserId: "",
      selectedFile: [],
      sendMessageConfirmation: false,
      cameraFile: "",
      imageLoading: true,
    };
    this.receive = this.receive.bind(this);
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }
  async componentDidMount() {
    let UserData: any = await AsyncStorage.getItem("User_Data");
    this.setState({
      myUserId: JSON.parse(UserData)?.data?.attributes.full_phone_number,
    });
    if (selectedConversation) {
      this.loadMessages();
      this.listenForMessages();
      this.setState({ messages: [] });
    }
    this.focusListener = this.props.navigation.addListener("focus", () => {
      if (selectedConversation) {
        this.loadMessages();
        this.listenForMessages();
        this.setState({ messages: [] });
      }
    });
    RNAndroidKeyboardAdjust.setAdjustResize();
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.onPageLeave
    );
  }

  componentWillUnmount(): any {
    BackHandler.removeEventListener("hardwareBackPress", this.onPageLeave);
    RNAndroidKeyboardAdjust.setAdjustPan();
  }

  onPageLeave = () => {
    CometChat.removeMessageListener(listenerID);
  };

  async receive(from: string, message: Message) {
    runEngine.debugLog("on recieive==>" + JSON.stringify(message));
  }

  loadMessages = () => {
    if (this.props.route.params?.userType == 1) {
      const limit = 50;
      const messageRequestBuilder = new CometChat.MessagesRequestBuilder().setLimit(
        limit
      );
      const messagesRequest = messageRequestBuilder
        .setUID(this.props.route.params?.chatNumber)
        .build();
      messagesRequest
        .fetchPrevious()
        .then((messages) => {
          this.setState({ messages: this.transformMessages(messages) });
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (this.props.route.params?.userType == 2) {
      const limit = 50;
      const messageRequestBuilder = new CometChat.MessagesRequestBuilder().setLimit(
        limit
      );
      const messagesRequest = messageRequestBuilder
        .setGUID(this.props.route.params?.chatNumber)
        .build();
      messagesRequest
        .fetchPrevious()
        .then((messages) => {
          this.setState({ messages: this.transformMessages(messages) });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  sendMessageCometChat = (messages: any) => {
    if (messages && messages.length !== 0) {
      const receiverID = this.props.route.params?.chatNumber;
      let receiverType: string;

      if (this.props.route.params?.userType == 1) {
        receiverType = "user";
      } else if (this.props.route.params?.userType == 2) {
        receiverType = "group";
      }

      if (receiverID && receiverType) {
        const textMessage = new CometChat.TextMessage(
          receiverID,
          messages,
          receiverType
        );
        CometChat.sendMessage(textMessage).then(
          (message) => {
            this.setState({ sendMessageConfirmation: true });
            this.setState((previousMessages) => ({
              messages: GiftedChat.append(previousMessages.messages, [
                this.transformSingleMessage(message),
              ]),
            }));
            this.setState({ onSendMessage: "" });
          },
          (error) => {
            console.log("error", error);
          }
        );
      }
    }
  };
  transformMessages = (messages: any) => {
    if (messages && messages.length !== 0) {
      const transformedMessages = [];
      for (const message of messages) {
        if (this.isValidMessage(message)) {
          transformedMessages.push(this.transformSingleMessage(message));
        }
      }
      return transformedMessages.sort(function(a, b) {
        let date1: any = new Date(b.createdAt);
        let date2: any = new Date(a.createdAt);
        return date1 - date2;
      });
    }
    return [];
  };

  isValidMessage = (message: any) => {
    return (
      message &&
      message.id &&
      message.sentAt &&
      message.sender &&
      message.sender.uid &&
      message.sender.name &&
      message.category &&
      message.category === "message"
    );
  };

  transformSingleMessage = (message: any) => {
    if (this.isValidMessage(message)) {
      this.CallMultiplefunctionToReduceComplexityTwo(message);

      let transformedMessage = this.CallMultiplefunctionToReduceComplexityOne(
        message
      );

      if (message.text) {
        transformedMessage.text = message.text;
      }
      if (message.data && message.data.url) {
        if (message.type && message.type === "video") {
          transformedMessage.video = message.data.url;
        } else {
          transformedMessage.image = message.data.url;

        }
      }

      return transformedMessage;
    }
    return message;
  };
  CallMultiplefunctionToReduceComplexityTwo(message) {
    if (message?.getSender().getUid() != this.state.myUserId) {
      let userType;

      if (this.props.route.params?.userType == 1) {
        userType = "user";
      } else if (this.props.route.params?.userType == 2) {
        userType = "group";
      }
      CometChat.markAsRead(
        message.getId(),
        message.getSender().getUid(),
        userType,
        message.getSender().getUid()
      ).then(
        () => {
          console.log("mark as read success.");
          this.setState({imageLoading: true})
        },
        (error: any) => {
          console.log(
            "An error occurred when marking the message as read.",
            error
          );
        }
      );
    }
  }
  CallMultiplefunctionToReduceComplexityOne(message) {
   
    let transformedMessage: any;
    if (this.props.route.params?.userType == 1) {
      transformedMessage = {
        _id: message?.id ? message.id : uuidv4(),
        createdAt: new Date(message?.sentAt * 1000),
        user: {
          _id: message?.sender.uid,
          name: message?.sender.name,
          avatar: null,
        },
      };
      return transformedMessage;
    } else if (this.props.route.params?.userType == 2) {
      transformedMessage = {
        _id: message?.id ? message.id : uuidv4(),
        createdAt: new Date(message?.sentAt * 1000),
        user: {
          _id: message?.sender.uid,
          name: message?.sender.name,
          avatar: message?.sender?.avatar,
        },
      };
      return transformedMessage;
    }
  }
  listenForMessages = () => {
    const conversationId = this.props.route.params?.mainConversationId;
    if (conversationId) {
      CometChat.addMessageListener(
        listenerID,
        new CometChat.MessageListener({
          onTextMessageReceived: (message: any) => {
            if (
              message.data.entities?.sender.entity.uid != this.state.myUserId
            ) {
              CometChat.markAsRead(message);
            }
            this.setState((previousMessages) => ({
              messages: GiftedChat.append(previousMessages.messages, [
                this.transformSingleMessageForListen(message),
              ]),
            }));
          },
          onMediaMessageReceived: (mediaMessage: any) => {
            this.setState((previousMessages) => ({
              messages: GiftedChat.append(previousMessages.messages, [
                this.transformSingleMessageForListen(mediaMessage),
              ]),
            }));
          },
        })
      );
    }
  };
  transformSingleMessageForListen = (message: any) => {
    if (this.isValidMessage(message)) {
      let transformedMessage = this.transformedSingleMessageObject(message);
      if (message?.text) {
        transformedMessage.text = message?.text;
      }
      if (message.data && message.data.url) {
        if (message.type && message.type === "video") {
          transformedMessage.video = message.data.url;
        } else {
          transformedMessage.image = message.data.url;
        }
      }
      return transformedMessage;
    }
    return message;
  };

  transformedSingleMessageObject(message) {
    let transformedMessage: any;
    if (this.props.route.params?.userType == 1) {
      transformedMessage = {
        _id: message?.id ? message.id : uuidv4(),
        createdAt: new Date(message?.sentAt * 1000),
        user: {
          _id: message?.sender.uid,
          name: message?.sender.name,
          avatar: null,
        },
      };
    } else if (this.props.route.params?.userType == 2) {
      transformedMessage = {
        _id: message?.id ? message.id : uuidv4(),
        createdAt: new Date(message?.sentAt * 1000),
        user: {
          _id: message?.sender.uid,
          name: message?.sender.name,
          avatar: message?.sender?.avatar,
        },
      };
    }
    return transformedMessage;
  }

 
  onPressCamera = () => {
    pickImageFromCamera().then( async (response: any)=>{
      const uri = response.path;
       const fileName = uri.replace(/^.*[\\\/]/, "");
     
      const type = response.mime;
      if(uri ) {
        const file = {
          name: this.getFileName(fileName, type),
          uri: Platform.OS === "android" ? uri : uri.replace("file://", ""),
          type: type || "video/quicktime",
        };
        this.setState({ cameraFile: file });
      }
      if (
        this.state.cameraFile  &&
        this.state.cameraFile.uri
      ) {
      
        this.sendCameraMediaMessageCometChat();
      }
    
      console.log("@@@@@@@@@@ selected picture ", this.state.cameraFile);
    });

};

sendCameraMediaMessageCometChat = () => {
  const receiverID = this.props.route.params?.chatNumber;
  let receiverType;
  if (this.props.route.params?.userType == 1) {
    receiverType = "user";
  } else if (this.props.route.params?.userType == 2) {
    receiverType = "group";
  }

  const messageType =
    this.state.cameraFile &&
    this.state.cameraFile.type &&
    this.state.cameraFile.type.includes("video")
      ? CometChat.MESSAGE_TYPE.VIDEO
      : CometChat.MESSAGE_TYPE.FILE;

  if (receiverID && receiverType) {
    const mediaMessage = new CometChat.MediaMessage(
      receiverID,
      this.state.cameraFile,
      messageType,
      receiverType
    );

    CometChat.sendMediaMessage(mediaMessage).then(
      (message) => {
        this.setState((previousMessages) => ({
          messages: GiftedChat.append(previousMessages.messages, [
            this.transformSingleMessage(message),
          ]),
        }));
      },
      (error) => {
        console.log(error);
      }
    );
  }
};

  

  handleSelectFile = async () => {
    try {
      console.log("mon")
      const res = await DocumentPicker.pickMultiple({
        presentationStyle: "fullScreen",
        type: [DocumentPicker.types.allFiles],
        //allowMultiSelection: true,
      });
      console.log(res[0].uri)
      console.log("res1111111111111 : " + JSON.stringify(res));

   
     
      //Setting the state to show single file attributes
      this.setState({ selectedFile: res });
      if (this.state.selectedFile) {
        res.forEach((file) => {
          this.sendMediaMessageCometChat(file);
        });
      }
    } catch (err) {
      console.log("sneha")
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        Alert.alert("", "Canceled from single doc picker");
      } else {
        //For Unknown Error
        Alert.alert("", "Unknown Error:abc" + JSON.stringify(err.message));
        throw err;
      }
    }
  };

  getFileName = (fileName: any, type: any) => {
    if (Platform.OS === "android" && type === "photo") {
      return "Camera_001.jpeg";
    } else if (Platform.OS === "android" && type.includes("video")) {
      return "Camera_001.mov";
    }
    return fileName;
  };

  sendMediaMessageCometChat = (file) => {
    const receiverID = this.props.route.params?.chatNumber;
    let receiverType;
    if (this.props.route.params?.userType == 1) {
      receiverType = "user";
    } else if (this.props.route.params?.userType == 2) {
      receiverType = "group";
    }

    const messageType =
      file &&
      file.type &&
      file.type.includes("video")
        ? CometChat.MESSAGE_TYPE.VIDEO
        : CometChat.MESSAGE_TYPE.FILE;

    if (receiverID && receiverType) {
      const mediaMessage = new CometChat.MediaMessage(
        receiverID,
        file,
        messageType,
        receiverType
      );

      CometChat.sendMediaMessage(mediaMessage).then(
        (message) => {
          this.setState((previousMessages) => ({
            messages: GiftedChat.append(previousMessages.messages, [
              this.transformSingleMessage(message),
            ]),
          }));                                         
        },                                             
        (error) => {
          console.log(error);
        }
      );
    }
  };

  upperBackPress() {
    CometChat.removeMessageListener(listenerID);
    this.props.navigation.pop();
  }
}
// Customizable Area End
