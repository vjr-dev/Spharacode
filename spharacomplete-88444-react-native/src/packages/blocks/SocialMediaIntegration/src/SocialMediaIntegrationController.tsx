// Customizable Area Start
//@ts-nocheck
//@ts-ignore
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { IBlock } from "../../../framework/src/IBlock";
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
  Loader: boolean;
  switch1: boolean;
  switch2: boolean;
  switch3: boolean;
  switch4: boolean;
  switch5: boolean;

  Modal1: boolean;
  Modal2: boolean;
  Modal3: boolean;
  Modal4: boolean;
  Modal5: boolean;

  Check1: any;
  Check2: any;
  Check3: any;
  Check4: any;
  Check5: any;

  whnumber: any;
  fbname: any;
  inname: any;
  twname: any;
  ldname: any;

  Token: any;
}

interface SS {
  id: any;
}

export default class Loginscreen extends BlockComponent<Props, S, SS> {
  SetsettingID: any = "";
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
      Loader: false,
      switch1: false,
      switch2: false,
      switch3: false,
      switch4: false,
      switch5: false,

      Modal1: false,
      Modal2: false,
      Modal3: false,
      Modal4: false,
      Modal5: false,

      Check1: false,
      Check2: false,
      Check3: false,
      Check4: false,
      Check5: false,

      whnumber: "",
      fbname: "",
      inname: "",
      twname: "",
      ldname: "",
      Token: "",
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async M1close() {
    this.setState({ Modal1: false, switch1: false });
  }
  async M2close() {
    this.setState({ Modal2: false, switch2: false });
  }
  async M3close() {
    this.setState({ Modal3: false, switch3: false });
  }
  async M4close() {
    this.setState({ Modal4: false, switch4: false });
  }
  async M5close() {
    this.setState({ Modal5: false, switch5: false });
  }

  async M1Continue() {
    this.setState({ Modal1: false });
  }
  async M2Continue() {
    this.setState({ Modal2: false });
  }
  async M3Continue() {
    this.setState({ Modal3: false });
  }
  async M4Continue() {
    this.setState({ Modal4: false });
  }
  async M5Continue() {
    this.setState({ Modal5: false });
  }

  async switch11(Val: any) {
    this.setState({ switch1: Val });

    if (Val == true) {
      this.setState({ Modal1: true });
    } else {
      this.setState({ switch1: false });
    }
  }
  async switch22(Val: any) {
    this.setState({ switch2: Val });
    if (Val == true) {
      this.setState({ Modal2: true });
    } else {
      this.setState({ switch2: false });
    }
  }
  async switch33(Val: any) {
    this.setState({ switch3: Val });
    if (Val == true) {
      this.setState({ Modal3: true });
    } else {
      this.setState({ switch3: false });
    }
  }
  async switch44(Val: any) {
    this.setState({ switch4: Val });
    if (Val == true) {
      this.setState({ Modal4: true });
    } else {
      this.setState({ switch4: false });
    }
  }
  async switch55(Val: any) {
    this.setState({ switch5: Val });
    if (Val == true) {
      this.setState({ Modal5: true });
    } else {
      this.setState({ switch5: false });
    }
  }
  goback() {
    const { navigation }: any = this.props;
    navigation.goBack();
  }
}
// Customizable Area End
