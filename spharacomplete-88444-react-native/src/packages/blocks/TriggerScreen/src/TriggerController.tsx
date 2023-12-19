// Customizable Area Start
//@ts-nocheck
//@ts-ignore
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import Dashboard from "../../DashBord/src/DashbordController";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
}

interface S {
  Loader: boolean;
  List: any;
  Selectedname: any;
  SelectedID: any;
  buttonlist: any;
  data1: any;
  data2: any;
  data3: any;
  updatedData: any;
  show: boolean;
  LableID: any;
  Userdata: any;
  Token: any;
  Tempdaa: any;
}

interface SS {
  id: any;
}

export default class Loginscreen extends BlockComponent<Props, S, SS> {
  SetsettingID: any = "";
  private volumeInstance: Dashboard;

  constructor(props: Props) {
    super(props);
    this.volumeInstance = new Dashboard(props);
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
      List: [
        { id: 1, name: "Power Button", aa: "power_button" },
        { id: 2, name: "Volume Up Button", aa: "volume_up_button" },
        { id: 3, name: "Volume Down Button", aa: "volume_down_button" },
      ],
      data1: [
        {
          id: 1,
          name: "Press the power button 3 times",
          aa: "press_button_for_3_times",
          type: "power_button",
        },
        {
          id: 2,
          name: "Press the power button 5 times",
          aa: "press_button_for_5_times",
          type: "power_button",
        },
        {
          id: 3,
          name: "Press the power button 3 seconds",
          aa: "Hold_the_button_for_3_seconds",
          type: "power_button",
        },
        {
          id: 4,
          name: "Press the power button 5 seconds",
          aa: "Hold_the_button_for_5_seconds",
          type: "power_button",
        },
        { id: 5, name: "Disable", aa: "disable", type: "power_button" },
      ],
      data2: [
        {
          id: 1,
          name: "Press the volume up button 3 times",
          aa: "press_button_for_3_times",
          type: "volume_up_button",
        },
        {
          id: 2,
          name: "Press the volume up button 5 times",
          aa: "press_button_for_5_times",
          type: "volume_up_button",
        },
        {
          id: 3,
          name: "Press the volume up button 3 seconds",
          aa: "Hold_the_button_for_3_seconds",
          type: "volume_up_button",
        },
        {
          id: 4,
          name: "Press the volume up button 5 seconds",
          aa: "Hold_the_button_for_5_seconds",
          type: "volume_up_button",
        },
        { id: 5, name: "Disable", aa: "disable", type: "volume_up_button" },
      ],
      updatedData: [
        {
          id: 1,
          name: "Press the volume up/down button 3 times",
          aa: "press_button_for_3_times",
          type: "volume_up_button",
        },
        {
          id: 2,
          name: "Press the volume up/down button 5 times",
          aa: "press_button_for_5_times",
          type: "volume_up_button",
        },
        { id: 3, name: "Disable", aa: "disable", type: "volume_up_button" },
      ],
      data3: [
        {
          id: 1,
          name: "Press the volume down button 3 times",
          aa: "press_button_for_3_times",
          type: "volume_down_button",
        },
        {
          id: 2,
          name: "Press the volume down button 5 times",
          aa: "press_button_for_5_times",
          type: "volume_down_button",
        },
        {
          id: 3,
          name: "Press the volume down button 3 seconds",
          aa: "Hold_the_button_for_3_seconds",
          type: "volume_down_button",
        },
        {
          id: 4,
          name: "Press the volume down button 5 seconds",
          aa: "Hold_the_button_for_5_seconds",
          type: "volume_down_button",
        },
        { id: 5, name: "Disable", aa: "disable", type: "volume_down_button" },
      ],
      Selectedname: "Select button type",
      Userdata: "",
      Token: "",
      SelectedID: 0,
      buttonlist: true,
      show: false,
      LableID: "",
      Tempdaa: "",
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }
  async componentDidMount() {
    const tempToken = await AsyncStorage.getItem("Token");
    this.setState({ Userdata: this.props.route.params.data });
    this.setState({ Token: tempToken });
    this.setState({
      Selectedname: this.state.Userdata.trigger_button,
      LableID: this.state.Userdata.trigger_type,
      Tempdaa: this.state.Userdata.trigger_button,
    });
  }
  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (apiRequestCallId === this.SetsettingID) {
        if (responseJson != null) {
          if (responseJson.data != null) {
            this.setState({ Loader: false });
            let response = responseJson.data.attributes;
            AsyncStorage.removeItem("VolumeButtonPressedID");
            this.updateState(response.trigger_type);
          } else {
            this.setState({ Loader: false });
            alert("ERROR");
          }
        }
      }
    }
  }
  async updateState(id: string) {
    this.volumeInstance.VolumeEvents(id);
  }
  async setclick() {
    this.setState({ Loader: true });
    const header = {
      "Content-Type": configJSON.UpdatesettingAPiContentType,
      token: this.state.Token,
    };
    const attrs = {
      trigger_button: "volume_up_button",
      trigger_type: this.state.LableID,
    };
    const data1 = {
      attributes: attrs,
    };
    const httpBody = {
      data: data1,
    };
    console.log(httpBody, "httpBody");

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.SetsettingID = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.UpdatesettingAPiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.UpdatesettingAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }

  listcall(item: any) {
    this.setState({
      Selectedname: item.aa,
      SelectedID: item.id,
      buttonlist: true,
      show: true,
    });
  }
  async labaleclick(item: any) {
    this.setState({
      Selectedname: item.type,
      Tempdaa: item.type,
      LableID: item.aa,
    });
    this.setclick();
  }

  goback() {
    const { navigation }: any = this.props;
    navigation.goBack();
  }
}
// Customizable Area End
