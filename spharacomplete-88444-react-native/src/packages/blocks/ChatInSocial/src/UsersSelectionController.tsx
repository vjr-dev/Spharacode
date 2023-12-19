// Customizable Area Start
//@ts-ignore
//@ts-nocheck
import { CometChat } from "@cometchat-pro/react-native-chat";
import { BlockComponent } from "framework/src/BlockComponent";
import { IBlock } from "framework/src/IBlock";
import { runEngine } from "framework/src/RunEngine";
import { Alert } from "react-native";

export const configJSON = require("./config");
export interface Props {
  navigation: any;
  id: string;
}
interface S {
  searchText:string,
  userList:any,
  selectedUser:any,
  isMoreDataAvailable: any,
  isLoading: boolean,
  isFlatListFooterLoading:boolean
}
interface SS {
  id: any;
}

export default class UsersSelectionController extends BlockComponent<Props, S, SS> {
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.state = {
        searchText:'',
        userList:[],
        selectedUser:[],
        isLoading:true,
        isFlatListFooterLoading:false
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }
  userListRequest:any
  async componentDidMount() {
    this.resetConversationRequest();
    this.getUserList();
  }
  resetConversationRequest(){
    if(this.state.searchText){
        this.userListRequest = new CometChat.UsersRequestBuilder()
        .setLimit(30)
        .setSearchKeyword(this.state.searchText)
        .build();
    }else{
      this.userListRequest = new CometChat.UsersRequestBuilder()
      .setLimit(30)
      .build();
    }
  }
  getUserList(){
    this.userListRequest.fetchNext().then(
        userList => {
          let tempuserList = [...this.state.userList, ... userList];
          this.setState({userList:tempuserList, isLoading:false, isFlatListFooterLoading:false})
        }, error => {
          this.setState({isLoading:false, isFlatListFooterLoading:false})
          Alert.alert("","Something went wrong.")
          console.log("User list fetching failed with error in UsersSelection screen:", error);
        }
      );
  }
  onSearch(text: string){
    this.setState({userList:[]});
    this.setState({searchText: text, userList:[], isMoreDataAvailable:true,isFlatListFooterLoading:true})
    this.resetConversationRequest();
    this.getUserList();
  }
  onRefresh(){
    this.setState({userList:[], isLoading:true});
    this.resetConversationRequest();
    this.getUserList();
  }
  async endReached(){
    this.setState({isFlatListFooterLoading:true});
    this.getUserList();
  }
  onUserSelect(item: any){
    this.props.navigation.replace("ConversationScreen", {
        chatNumber: item.uid,
        mainConversationId: item.conversationId,
        userName: item.name,
        userAvtar: item.avatar,
        userType: 1,
    })
  }
  onNext(){
    if(this.state.selectedUser?.length > 0){
        this.props.navigation.navigate('CreateNewGroup', { participants: this.state.selectedUser });
    }else{
        Alert.alert("","Please select participants");
    }
  }
}
// Customizable Area End
