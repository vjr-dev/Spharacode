// Customizable Area Start
//@ts-ignore
//@ts-nocheck
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { IBlock } from "../../../framework/src/IBlock";
import { runEngine } from "../../../framework/src/RunEngine";

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
}

interface S {
  data: any;
}

interface SS {
  id: any;
}

export default class DonationController extends BlockComponent<Props, S, SS> {
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [];

    this.state = {
      data: [1, 2, 3, 4, 5],
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  onclick() {
    const { navigation }: any = this.props;
    navigation.navigate("MakeDonation");
  }
  onSpharaclick() {}
}
// Customizable Area End
