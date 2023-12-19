// Customizable Area Start
//@ts-nocheck
//@ts-ignore
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
}

export interface S {
}

export interface SS {
  id: any;
}

export default class StripeWebViewController extends BlockComponent<
  Props,
  S,
  SS
> {

  constructor(props: Props) {
    super(props);
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
    ];
    this.receive = this.receive.bind(this);
    runEngine.attachBuildingBlock(this, this.subScribedMessages);

    this.state = {

    };
  }
}
// Customizable Area End