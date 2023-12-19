// Customizable Area Start
//@ts-nocheck
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { GiftedChat } from "react-native-gifted-chat";

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
}

interface NewArrayType {
  text: string;
  user: {
    _id: number;
    avatar: string;
  };
}

interface QustionArray {
  iMessage: string;
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  messages: NewArrayType[];
  onSendMessage: string;
  sendMessageConfirmation: boolean;
  newArry: NewArrayType[];
}

interface SS {
  id: any;
}

export default class Chatbot6Controller extends BlockComponent<Props, S, SS> {
  getOtpCallId: string = "";
  getQuesCallId: string = "";
  avtarImage: string =
    "https://images.rawpixel.com/image_png_1000/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjkzNy1hZXctMTM5LnBuZw.png";

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage)];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      messages: [],
      onSendMessage: "",
      sendMessageConfirmation: false,
      newArry: [],
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  componentWillMount() {
    this.questionApi();
    if (!this.state.messages.length) {
      this.setState({
        messages: [
          {
            text: "Welcome",
            system: true,
          },
        ],
      });
    }
  }

  onSelect(messages: []) {
    let botMessage: NewArrayType = {
      text: messages[0].text,
      user: {
        _id: 1,
        avatar: this.avtarImage,
      },
    };

    this.onSend([botMessage]);
  }

  onSend(messages: []) {
    let botMessage: NewArrayType = {
      text: messages[0].text,
      user: {
        _id: 1,
        avatar: this.avtarImage,
      },
    };

    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, [botMessage]),
    }));

    this.replyTouch(messages[0].text);
  }

  async receive(from: string, message: Message) {
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (apiRequestCallId === this.getOtpCallId) {
        let botMessage: NewArrayType = {
          text:
            responseJson.answer != null
              ? responseJson.answer
              : responseJson.error,
          user: {
            _id: 2,
            avatar: this.avtarImage,
          },
        };

        this.setState((previousState) => ({
          messages: GiftedChat.append(previousState.messages, botMessage),
        }));
      }
      if (apiRequestCallId === this.getQuesCallId) {
        let responseData: string[] = responseJson.questions;
        let tempArray: QustionArray[] = [];
        for (const element of responseData) {
          let objData: {} = { iMessage: element };
          tempArray.push(objData);
        }

        this.setState({ newArry: tempArray.slice(0, 5) });

        this.state.newArry.forEach((item: object, index: number) => {
          let botMessage: NewArrayType = {
            text: item.iMessage,
            user: {
              _id: 2,
              avatar: item?.msg?.indexOf("[") == -1 ? this.avtarImage : "",
            },
          };
          this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, botMessage),
          }));
        });
      }
    }
  }

  replyTouch(senderSide: string) {
    this.getReply(senderSide);
  }

  getReply = (senderSide: string) => {
    const apiHeader = {
      "Content-Type": configJSON.validationApiContentType,
    };
    const urlEndPoint = configJSON.getOtpCallEndPoint + senderSide;

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getOtpCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      urlEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(apiHeader)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.exampleAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  questionApi = () => {
    const apiHeader = {
      "Content-Type": configJSON.validationApiContentType,
    };
    const urlEndPoint = configJSON.getQuesCallEndPoint;

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getQuesCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      urlEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(apiHeader)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };
}
// Customizable Area End
