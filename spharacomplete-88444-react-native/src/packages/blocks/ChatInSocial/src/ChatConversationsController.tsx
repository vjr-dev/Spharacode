// Customizable Area Start
//@ts-ignore
//@ts-nocheck
import { BlockComponent } from "framework/src/BlockComponent";
import { IBlock } from "framework/src/IBlock";
import { runEngine } from "framework/src/RunEngine";
import { CometChat } from "@cometchat-pro/react-native-chat";
export const configJSON = require("./config");
export interface Props {
  navigation: any;
  id: string;
}
interface S {
  screenFlag:string,
  searchText: string,
  isSwipeoutClose: boolean,
  conversationList: any,
  isLoading: boolean,
  close: boolean,
  isFlatListFooterLoading: boolean,
  isVisibleUserSelectionScreen: boolean,
  unReadCount: number
}
interface SS {
  id: any;
}

export default class ChatConversationsController extends BlockComponent<Props, S, SS> {
  userConversationsRequest: any;
  groupConversationsRequest: any;
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.state = {
        screenFlag: props.screenFlag,
        searchText: '',
        isSwipeoutClose:false,
        conversationList:[],
        isLoading: true,
        close:false,
        isFlatListFooterLoading: false,
        isVisibleUserSelectionScreen: false,
        unReadCount:0
     

    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }
  static getDerivedStateFromProps(props, state) {
    if(props.screenFlag !== state.screenFlag){
     
      return{
        screenFlag: props.screenFlag,
        conversationList:[]
      }
    }
  }
  componentDidUpdate(prevProps){
    if(prevProps.screenFlag !== this.state.screenFlag){
      this.setState({isLoading:true})
      this.getAllUnReadMessageCount();
      this.resetConversationRequest();
      this.getConversations();
    }
  }
   componentDidMount(): Promise<void> {
    this.getAllUnReadMessageCount();
      this.resetConversationRequest();
      this.getConversations();
  }
  resetConversationRequest(){
    this.setState({conversationList:[]})
    if(this.state.screenFlag === 'chats'){
        this.userConversationsRequest = new CometChat.ConversationsRequestBuilder()
        .setLimit(30)
        .setConversationType('user')
        //.setTags(['pin'])
        .withTags(true)
        .build();
     
    }else{
      this.groupConversationsRequest = new CometChat.ConversationsRequestBuilder()
      .setLimit(30)
     // .setTags(['pin'])
     .withTags(true)
      .setConversationType('group')
      .build();
    }
  }
  getConversations(){
    if(this.state.screenFlag === 'chats'){
      this.fetchUserConversation();
    }else{
      this.fetchGroupConversation();
    }
       
  }
  fetchUserConversation(){
    this.userConversationsRequest.fetchNext().then(
      (conversationList) => {
        let tempConversationList = this.state.conversationList;
        tempConversationList = [...this.state.conversationList,...conversationList];
        if(this.state.searchText && conversationList?.length == 30){
          this.fetchUserConversation();
        }
        this.setState({conversationList:tempConversationList, isLoading:false, isFlatListFooterLoading:false})
      },
      (error) => {
      
      }
    );
  }
  async fetchGroupConversation(){
    this.groupConversationsRequest.fetchNext().then(
      async (conversationList)  => {
        let tempConversationList = this.state.conversationList;
        tempConversationList = [...this.state.conversationList,...conversationList];
        if(this.state.searchText && conversationList?.length == 30){
          this.fetchGroupConversation();
        }
        this.setState({conversationList:tempConversationList, isLoading:false, isFlatListFooterLoading:false})
      },
      (error) => {
      }
    );
  }
  getGroupUnReadCount(){
    CometChat.getUnreadMessageCountForAllGroups().then((res:any)=>{
      let TotalUnReadCount = 0;
      for (const key in res) {
        if (res.hasOwnProperty(key)) {
        TotalUnReadCount = TotalUnReadCount + res[key];
        }
      }
      this.setState({unReadCount: TotalUnReadCount})
    })
  }
  getUserUnReadCount(){
    CometChat.getUnreadMessageCountForAllUsers().then((res:any)=>{
      let TotalUnReadCount = 0;
      for (const key in res) {
        if (res.hasOwnProperty(key)) {
        TotalUnReadCount = TotalUnReadCount + res[key];
        }
      }
      this.setState({unReadCount: TotalUnReadCount})
    })
  }
  getAllUnReadMessageCount(){
    if(this.state.screenFlag === 'groups'){
     this.getGroupUnReadCount();
    }else{
      this.getUserUnReadCount();
    }
  }
  onSearch(text: string){
    if(this.state.searchText === ''){
      this.getConversations();
    }
    this.setState({searchText: text})
  }
  
  setTagsOnCoversation(conversationID:string, conversationType: string,tags: Array<string>){
  CometChat.tagConversation(conversationID, conversationType, tags).then(
        conversation => {
            console.log('conversation', conversation);
        }, error => {
            console.log('error while fetching a conversation', error);
        }
    );
  }
  pinClick(item: any) {
    if(item?.conversationType=== 'group'){
      this.setTagsOnCoversation(item?.conversationWith?.guid,'group',['pin'])
    }else{
      this.setTagsOnCoversation(item?.conversationWith?.uid,'user',['pin'])
    }
  }
  DeleteClick(item: any) {
    this.setState({isLoading: true});
    let id;
    let type;
    if(item?.conversationType === 'group'){
      id = item?.conversationWith?.guid;
      type = 'group'

    }else{
      id = item?.conversationWith?.uid;
      type = 'user'
    }
    CometChat.deleteConversation(id, type).then(
      deletedConversation => {
          console.log(deletedConversation);
          this.setState({conversationList:[]})
          this.resetConversationRequest();
          this.getConversations();
      }, error => {
        this.setState({isLoading: false});
          console.log('error while deleting a conversation', error);
      }
  );
    
  }
  ArchiveClick(item: any) {
   
  }
  MoreClick(item: any) {
    
  }
  onPressItem(item: any){
    if(item?.conversationType === 'group'){
      this.props.navigation.navigate("ConversationScreen", {
        chatNumber: item?.conversationWith?.guid,
        mainConversationId: item?.conversationId,
        userName: item?.conversationWith?.name,
        userAvtar: item?.conversationWith?.avatar,
        userType: 2,
    })
    }else{
      this.props.navigation.navigate("ConversationScreen", {
        chatNumber: item?.conversationWith?.uid,
        mainConversationId: item?.conversationId,
        userName: item?.conversationWith.name,
        userAvtar: item?.conversationWith?.avatar,
        userType: 1,
    })
    }
  }
  onCreate(){
    if(this.state.screenFlag === 'groups'){
      this.props.navigation.navigate('UsersSelection',{title:"Select Participants ",multipleSelection:true});
    }else{
      this.props.navigation.navigate('UsersSelection',{title:"Select User",multipleSelection:false});
    }
  }
  onRefresh(){
    this.setState({conversationList:[],isLoading:true})
    this.getAllUnReadMessageCount();
    this.resetConversationRequest();
    this.getConversations();
  }
  endReached(){
    if(this.state.conversationList?.length >= 30 && !this.state.searchText){
      this.setState({isFlatListFooterLoading: true})
      this.getConversations()
    }
  }
  onBackPressOfUserSelection(){
    this.setState({isVisibleUserSelectionScreen:false})
  }
  onUserSelect(users:any){
    this.setState({isVisibleUserSelectionScreen:false})
  }
}
  
// Customizable Area End
