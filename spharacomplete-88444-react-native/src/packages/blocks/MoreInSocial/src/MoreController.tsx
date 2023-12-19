// Customizable Area Start
//@ts-nocheck
//@ts-ignore
import { BlockComponent } from "framework/src/BlockComponent";
import { IBlock } from "framework/src/IBlock";
import { Message } from "framework/src/Message";
import { runEngine } from "framework/src/RunEngine";

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
}

interface S {
  modalVisible: boolean;
}

interface SS {
  id: any;
}

export default class MoreController extends BlockComponent<Props, S, SS> {
  focusListener: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.subScribedMessages = [];

    this.state = {
      modalVisible: false,
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }
  async componentDidMount() {
    this.focusListener = this.props.navigation.addListener("focus", () => {
      this.setState({
        modalVisible: false,
      });
    });
  }
}
// Customizable Area End
