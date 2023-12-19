// Customizable Area Start
//@ts-ignore
//@ts-nocheck
import { CometChat } from "@cometchat-pro/react-native-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlockComponent } from "framework/src/BlockComponent";
import { IBlock } from "framework/src/IBlock";
import { runEngine } from "framework/src/RunEngine";
import moment from "moment";

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
}

interface S {
  Section: any;
  close: any;
  Chat_Data: any;
  Group_Data: any;
  All_Chat_Data: any;
  All_Group_Data: any;
  modal1Visible: any;
  modal2Visible: any;
  contactItemWidth: number;
  totalUnReadCount: number;
  Loader: boolean;
}

interface CometMessageListener {
  conversationId?: string;
  data?: {
    text: string;
  };
}

interface SS {
  id: any;
}

export default class ChatController extends BlockComponent<Props, S, SS> {
  focusListener: any;
  UserData: any;
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.subScribedMessages = [];

    this.state = {
      modal1Visible: false,
      modal2Visible: false,
      contactItemWidth: 8,
      Section: 1,
      close: false,
      Chat_Data: [],
      All_Chat_Data: [],
      Group_Data: [],
      All_Group_Data: [],
      totalUnReadCount: 0,
      Loader: false,
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }
  async componentDidMount() {
    this.UserData = await AsyncStorage.getItem("User_Data");
    this.CometInitialised(
      JSON.parse(this.UserData)?.data?.attributes.full_phone_number
    );
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      if (this.state.Section == 1) {
        this.setState({ Chat_Data: [],All_Chat_Data: [], totalUnReadCount: 0 });
      } else {
        this.setState({ Group_Data: [],All_Group_Data: [],totalUnReadCount: 0 });
      }
      if (!this.UserData) {
        return null;
      } else {
        let udata = JSON.parse(this.UserData);
        let user_phone = udata?.data?.attributes.full_phone_number;
        this.CometInitialised(user_phone);
      }
    });
  }
  checkStateUpdate(stateValue: number) {
    this.setState({ Section: stateValue });
    if (this.state.Section == 1) {
      this.setState({ Chat_Data: [], All_Chat_Data: [], totalUnReadCount: 0 });
    } else {
      this.setState({ Group_Data: [], All_Group_Data: [], totalUnReadCount: 0 });
    }
    if (!this.UserData) {
      return null;
    } else {
      let udata;
      if (this.UserData && this.UserData.data) {
        udata = JSON.parse(this.UserData?.data);
      }

      let phone = udata?.attributes.full_phone_number;
      this.CometInitialised(phone);
    }
  }

  CometInitialised(phoneNumber: any) {
    this.setState({ Loader: true });
    let appID = "213618d192facbaf";
    let region = "us";
    let authToken = "1167abda39101b557157684bb257435325c49e78";

    const appSetting = new CometChat.AppSettingsBuilder()
      .subscribePresenceForAllUsers()
      .setRegion(region)
      .autoEstablishSocketConnection(true)
      .build();
    CometChat.init(appID, appSetting).then(
      () => {
        CometChat.getLoggedinUser().then(
          (user: any) => {
            if (!user) {
              CometChat.login(phoneNumber, authToken).then(
                (user: CometChat.User) => {
                  this.getUserData();
                },
                (error: CometChat.CometChatException) => {
                  this.setState({ Loader: false });
                }
              );
            } else {
              this.getUserData();
            }
          },
          (error: CometChat.CometChatException) => {
            this.setState({ Loader: false });
          }
        );
      },
      (error) => {
        this.setState({ Loader: false });
      }
    );
  }
  getUserChatData(){
    this.CometChatUnReadListener();
    let markers: any;
    let limit = 30;
    let usersRequest = new CometChat.UsersRequestBuilder()
      .setLimit(limit)
      .friendsOnly(false)
      .build();

    usersRequest.fetchNext().then(
      (userList) => {
        userList.map((el: any, index) =>
          CometChat.getConversation(el.uid, "user").then(
            (conversation: any) => {
              markers = userList[index];
              if (
                conversation &&
                conversation.lastMessage &&
                conversation.lastMessage.text
              ) {
                markers.lastMessage = conversation.lastMessage.text;
              } else {
                markers.lastMessage = "Image";
              }

              markers.unReadCounts = conversation.unreadMessageCount;

              this.setState({
                totalUnReadCount:
                  this.state.totalUnReadCount + markers.unReadCounts,
              });

              let timestemp = new Date(
                conversation.lastMessage.updatedAt * 1000
              );
              let hours = moment(timestemp).format("HH");
              let minutes = moment(timestemp).format("mm");
              markers.Time = hours + ":" + minutes;
              this.setState({
                Chat_Data: [...this.state.Chat_Data, markers],
                All_Chat_Data: [...this.state.All_Chat_Data, markers],
                Loader: false
              });
            },
            (error) => {
              this.setState({ Loader: false });
            }
          )
        );
      },
      (error) => {
        this.setState({ Loader: false });
      }
    );
  }
  getGroupChatData(){
    let markers: any;
    let limit = 30;
    let groupsRequest = new CometChat.GroupsRequestBuilder()
      .setLimit(limit)
      .build();

    groupsRequest.fetchNext().then(
      (groupList) => {
        groupList.map((el: any, index) =>
          CometChat.getConversation(el.guid, "group").then(
            (conversation: any) => {
              markers = groupList[index];

              if (
                conversation &&
                conversation.lastMessage &&
                conversation.lastMessage.text
              ) {
                markers.lastMessage = conversation.lastMessage.text;
              } else {
                markers.lastMessage = "Image";
              }

              markers.unReadCounts = conversation.unreadMessageCount;

              this.setState({
                totalUnReadCount:
                  this.state.totalUnReadCount + markers.unReadCounts,
              });

              let timestemp = new Date(
                conversation.lastMessage.updatedAt * 1000
              );
              let hours = moment(timestemp).format("HH");
              let minutes = moment(timestemp).format("mm");
              markers.Time = hours + ":" + minutes;
              this.setState({
                Group_Data: [...this.state.Group_Data, markers],
                All_Group_Data: [...this.state.All_Group_Data, markers],
                Loader: false
              });
            },
            (error) => {
              this.setState({ Loader: false });
            }
          )
        );
      },
      (error) => {
        this.setState({ Loader: false });
      }
    );
  }
  getUserData() {
    if (this.state.Section == 1) {
      this.getUserChatData();
    } else {
      this.getGroupChatData();
    }
  }
  unReadCounts = 0;
  onTextMessageReceived = (textMessage: CometMessageListener) => {
    let newConversationId = textMessage.conversationId;
    let stateDataDetails = this.state.Chat_Data;
    let objectData = null;
    stateDataDetails.map((data: any, index: number) => {
      if (data.conversationId === newConversationId) {
        this.unReadCounts = this.unReadCounts + 1;
        stateDataDetails[index].lastMessage = textMessage.data?.text;
        stateDataDetails[index].unReadCounts = this.unReadCounts;
        this.setState({
          totalUnReadCount: this.state.totalUnReadCount + 1,
        });
      } else {
        objectData = textMessage.sender;
        let timestemp = new Date(textMessage.updatedAt * 1000);
        let hours = moment(timestemp).format("HH");
        let minutes = moment(timestemp).format("mm");
        objectData.Time = hours + ":" + minutes;
        objectData.conversationId = textMessage.conversationId;

        if (textMessage.text == undefined) {
          objectData.lastMessage = "Image";
        } else {
          objectData.lastMessage = textMessage.text;
        }
      }
    });
    if (objectData != null) {
      objectData.unReadCounts = this.state.totalUnReadCount + 1;
      this.setState({
        totalUnReadCount: this.state.totalUnReadCount + 1,
      });
      stateDataDetails.push(objectData);
      objectData = null;
    }
    this.setState({ Chat_Data: stateDataDetails });
  };
  onMediaMessageReceived = (mediaMessage: CometMessageListener) => {
    let newConversationId = mediaMessage.conversationId;
    let stateDataDetails = this.state.Chat_Data;
    stateDataDetails.map((data: any, index: number) => {
      if (data.conversationId === newConversationId) {
        this.unReadCounts = this.unReadCounts + 1;
        stateDataDetails[index].lastMessage = "Image";
        stateDataDetails[index].unReadCounts = this.unReadCounts;
        this.setState({
          totalUnReadCount: this.state.totalUnReadCount + 1,
        });
      }
    });
    this.setState({ Chat_Data: stateDataDetails });
  };
  CometChatUnReadListener() {
    this.unReadCounts = 0;
    CometChat.addMessageListener(
      "ADBS#123",
      new CometChat.MessageListener({
        onTextMessageReceived: (textMessage: CometMessageListener) => {
          this.onTextMessageReceived(textMessage);
        },
        onMediaMessageReceived: (mediaMessage: CometMessageListener) => {
          this.onMediaMessageReceived(mediaMessage);
        },
        onCustomMessageReceived: (customMessage: CometMessageListener) => {},
      })
    );
  }

  onclick(): void {
    const { navigation }: any = this.props;
    if (this.state.Section == 1) {
      navigation.navigate("ProfileChat");
    } else {
      navigation.navigate("GroupProfileChatScreen");
    }
  }

  pinClick(item: any) {
    this.setState({ close: true });
  }
  DeleteClick(item: any) {
    this.setState({ close: true });
  }
  ArchiveClick(item: any) {
    this.setState({ close: true });
  }
  onSearch = (searchText: any) => {
    let filteredData = this.state.Chat_Data.filter(function(item: any) {
      return item.name.toLowerCase().includes(searchText.toLowerCase());
    });
    if (!searchText) {
      this.setState({ Chat_Data: this.state.All_Chat_Data });
    } else {
      this.setState({ Chat_Data: filteredData });
    }
  };
  GoBackToHomeScreen = () => {
    this.props.screenProps.navigationProp.navigate("DashBord");
  };
  MoreClick(item: any) {
    this.setState({ close: true, modal2Visible: true });
  }
}
// Customizable Area End
