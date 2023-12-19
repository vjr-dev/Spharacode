// Customizable Area Start
//@ts-ignore
//@ts-nocheck
import { IBlock } from "../../../framework/src/IBlock";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  Detail: boolean;
  Chat: boolean;
}

interface SS {
  id: any;
}

export default class AlarmController extends BlockComponent<Props, S, SS> {
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.subScribedMessages = [getName(MessageEnum.AccoutLoginSuccess)];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      Detail: true,
      Chat: false,
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }
}
// Customizable Area End
