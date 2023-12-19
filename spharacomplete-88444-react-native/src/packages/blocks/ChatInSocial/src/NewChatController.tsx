// Customizable Area Start
//@ts-ignore
//@ts-nocheck
import { CometChat } from "@cometchat-pro/react-native-chat";
import { Platform, Alert } from "react-native";
import Contacts from "react-native-contacts";
import { PERMISSIONS, requestMultiple } from "react-native-permissions";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { IBlock } from "../../../framework/src/IBlock";
import { runEngine } from "../../../framework/src/RunEngine";

export const configJSON = require("./config");
export interface Props {
  navigation: any;
  id: string;
}

interface S {
  contactData: any;
  allContactData: any;
  modal1Visible: boolean;
  visibleTab: number;
  userArray: any;
  contact: boolean;
  myContacts: any;
}

interface SS {
  id: any;
}

export default class NewChatController extends BlockComponent<Props, S, SS> {
  focusListener: any;
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.subScribedMessages = [];

    this.state = {
      contactData: [],
      allContactData: [],
      modal1Visible: false,
      visibleTab: 0,
      userArray: [],
      myContacts: [],
      contact: false,
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }
  async componentDidMount() {
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      this.setState({
        contactData: [],
      });

      this.setState({
        allContactData: [],
      });
      this.Contactclick();
    });
  }
  Contactclick() {
    try {
      requestMultiple(
        Platform.select({
          android: [PERMISSIONS.ANDROID.READ_CONTACTS],
          ios: [PERMISSIONS.IOS.CONTACTS],
        })
      ).then((res) => {
        if (
          res["android.permission.READ_CONTACTS"] === "granted" ||
          res["ios.permission.CONTACTS"] === "granted"
        ) {
          this.fetchContacts();
        } else {
          Alert.alert(
            "",
            "Your Contact permission seems not to allow. Please allow permission from phone settings to upload photos."
          );
        }
      });
    } catch (error) {
      console.log("location set error:", error);
    }
  }

  fetchContacts() {
    let limit = 30;
    let searchIn = ["uid"];

    let usersRequest = new CometChat.UsersRequestBuilder()
      .setLimit(limit)
      .searchIn(searchIn)
      .build();

    usersRequest.fetchNext().then((userList) => {
      let markers;
      userList.map((el: any, index) =>
        Contacts.getAll().then((contacts) => {
          contacts.forEach((el1, index1) => {
            let numberWSP = el1?.phoneNumbers[0]?.number.replace(
              /[&\/\\#,+()$~%.'":*?<>{}-\s]/g,
              ""
            );
            if (el.uid.includes(numberWSP)) {
              markers = userList[index];
              console.log(markers);
              const newData = this.state.contactData;
              if (!newData.includes(markers)) {
                this.setState((prevState) => ({
                  contactData: [...prevState.contactData, markers],
                }));
                this.setState((prevState) => ({
                  allContactData: [...prevState.allContactData, markers],
                }));
              }
            }
          });
        })
      );
    });
  }
  onSearch = (searchText: any) => {
    let filteredData = this.state.contactData.filter(function(item: any) {
      return item.name.toLowerCase().includes(searchText.toLowerCase());
    });
    if (!searchText) {
      this.setState({ contactData: this.state.allContactData });
    } else {
      this.setState({ contactData: filteredData });
    }
  };
}
// Customizable Area End
