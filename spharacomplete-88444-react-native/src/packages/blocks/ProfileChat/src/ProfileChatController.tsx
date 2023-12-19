// Customizable Area Start
import { IBlock } from "framework/src/IBlock";
import { BlockComponent } from "framework/src/BlockComponent";
import { runEngine } from "framework/src/RunEngine";

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
}

interface S {
  modal2Visible: any;
  switch1: any;
  switch2: any;
  switch3: any;
  Arr_Emergancy: any;
}

interface SS {
  id: any;
}

export default class ChatController extends BlockComponent<Props, S, SS> {
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.subScribedMessages = [];

    this.state = {
      modal2Visible: false,
      switch1: false,
      switch2: false,
      switch3: false,
      Arr_Emergancy: [
        {
          id: "11",
          name: "abc",
          img: "",
        },
        {
          id: "12",
          name: "abcasfasf",
          img: "",
        },
      ],
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  redirectToChat() {
    const { navigation }: any = this.props;
    navigation.navigate("Chat");
  }

  showModal = (isVisible: boolean) => {
    this.setState({ modal2Visible: isVisible });
  };

  onSwitch = (Vala: any) => {
    this.setState({ switch1: Vala });
  };

  onFavSwitch = (Vala: any) => {
    this.setState({ switch2: Vala });
  };

  onNotificationSwitch = (Vala: any) => {
    this.setState({ switch3: Vala });
  };

  PluseClick1() {
    console.log("PLUS");
  }
}
// Customizable Area End
