// Customizable Area Start
//@ts-nocheck
//@ts-ignore
import { IBlock } from "framework/src/IBlock";
import { BlockComponent } from "framework/src/BlockComponent";
import { runEngine } from "framework/src/RunEngine";

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
}

interface S {

}

interface SS {
  id: any;
}

export default class MeetingsController extends BlockComponent<
  Props,
  S,
  SS
> {

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.subScribedMessages = [];

    this.state = {
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }


  // async receive(from: String, message: Message) {
  //   runEngine.debugLog("on recieive==>" + JSON.stringify(message));
  // }
}
// Customizable Area End