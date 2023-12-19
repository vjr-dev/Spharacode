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
  Modal1: boolean;
}

interface SS {
  id: any;
}

export default class SecuritySetting extends BlockComponent<Props, S, SS> {
  apiEmailLoginCallId: any = "";

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
      Modal1: false,
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  switch11(Val: any) {
    if(Val){
      this.setState({ switch1: true });
    }else{
      this.setState({ Modal1: true });
    }
  }

  Editbuttonclick() {
    console.log("EDIT");
    const { navigation }: any = this.props;
    navigation.navigate("UpdateSecuritySetting");
  }
  Updatebuttonclick() {
    console.log("UPDATE");
    const { navigation }: any = this.props;
    navigation.navigate("EditSecuritySetting");
  }
  goback() {
    const { navigation }: any = this.props;
    navigation.goBack();
  }
}
// Customizable Area End
