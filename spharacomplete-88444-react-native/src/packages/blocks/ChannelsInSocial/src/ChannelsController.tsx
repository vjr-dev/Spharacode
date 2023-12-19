// Customizable Area Start
import { IBlock } from "framework/src/IBlock";
import { BlockComponent } from "framework/src/BlockComponent";
import { runEngine } from "framework/src/RunEngine";
import { GotoHomePage } from "../../../components/src/Navigation/NavigationFunctions";
export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  screenProps: any;
}

interface S {
  Channels: any;
  allChannels: any;
  modal1Visible: boolean;
  visibleTab: number;
}

interface SS {
  id: any;
}

export default class ChannelsController extends BlockComponent<Props, S, SS> {
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.subScribedMessages = [];

    this.state = {
      Channels: [
        { name: "#NewYearParty", id: 1, unreadmsg: 9 },
        { name: "#Learning", id: 2 },
        { name: "#CSM", id: 3 },
        { name: "#Together", id: 4 },
        { name: "#JH", id: 5 },
        { name: "#CH12", id: 6 },
        { name: "#Channel", id: 7 },
        { name: "#Learning", id: 8 }
      ],
      allChannels: [
        { name: "#NewYearParty", id: 1, unreadmsg: 9 },
        { name: "#Learning", id: 2 },
        { name: "#CSM", id: 3 },
        { name: "#Together", id: 4 },
        { name: "#JH", id: 5 },
        { name: "#CH12", id: 6 },
        { name: "#Channel", id: 7 },
        { name: "#Learning", id: 8 }
      ],
      modal1Visible: false,
      visibleTab: 0
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  onSearch = (searchText: string) => {
    let filteredData = this.state.Channels.filter(function(item: any) {
      return item.name.toLowerCase().includes(searchText.toLowerCase());
    });
    if (!searchText) {
      this.setState({ Channels: this.state.allChannels });
    } else {
      this.setState({ Channels: filteredData });
    }
  };

  onTabPress = (position: number) => {
    this.setState({ visibleTab: position });
  };

  showModal = (isVisible: boolean) => {
    this.setState({ modal1Visible: isVisible });
  };

  GoBackToHomeScreen = () => {
    GotoHomePage(this.props);
  };
}
// Customizable Area End