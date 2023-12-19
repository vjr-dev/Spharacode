// Customizable Area Start
//@ts-ignore
//@ts-nocheck
import { IBlock } from "framework/src/IBlock";
import { Message } from "framework/src/Message";
import { BlockComponent } from "framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "framework/src/Messages/MessageEnum";
import { runEngine } from "framework/src/RunEngine";

export const configJSON = require("./config");

export interface Props
{
  navigation: any;
  id: string;
}

interface S
{
  Section: any

}

interface SS
{
  id: any;
}

export default class ChatController extends BlockComponent<
  Props,
  S,
  SS
> {

  constructor(props: Props)
  {
    super(props);
    this.receive = this.receive.bind(this);
    this.subScribedMessages = [];

    this.state = {
      Section: 1,
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }



  async receive(from: String, message: Message)
  {
    runEngine.debugLog("on recieive==>" + JSON.stringify(message));
  }
}
