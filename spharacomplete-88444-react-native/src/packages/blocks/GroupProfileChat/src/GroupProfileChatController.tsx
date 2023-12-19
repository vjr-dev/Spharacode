// Customizable Area Start
//@ts-nocheck
//@ts-ignore
import { IBlock } from "framework/src/IBlock";
import { Message } from "framework/src/Message";
import { BlockComponent } from "framework/src/BlockComponent";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import { runEngine } from "framework/src/RunEngine";

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
}

interface S {
  modal2Visible: boolean;
  switch1: boolean;
  switch2: boolean;
  Arr_Emergancy: any;
}

interface SS {
  id: any;
}

export default class GroupProfileChatController extends BlockComponent<
  Props,
  S,
  SS
> {
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.subScribedMessages = [getName(MessageEnum.AccoutLoginSuccess)];

    this.state = {
      modal2Visible: false,
      switch1: false,
      switch2: false,
      Arr_Emergancy: [
        {
          id: 1,
          img: "https://randomuser.me/api/portraits/men/84.jpg",
          name: "James",
        },
        {
          id: 2,
          img: "https://randomuser.me/api/portraits/men/43.jpg",
          name: "Prince",
        },
        {
          id: 3,
          img: "https://randomuser.me/api/portraits/men/35.jpg",
          name: "Henry",
        },
        {
          id: 4,
          img: "https://randomuser.me/api/portraits/men/19.jpg",
          name: "Charls",
        },
        {
          id: 5,
          img: "https://randomuser.me/api/portraits/men/92.jpg",
          name: "David",
        },
      ],
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
  }

  PluseClick1() {
    console.log("PLUS");
  }
}
// Customizable Area End
