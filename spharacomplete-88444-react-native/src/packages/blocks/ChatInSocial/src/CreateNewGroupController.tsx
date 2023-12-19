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
	isLoading: boolean,
	groupName: string,
	participantsList: any
}
interface SS {
	id: any;
}

export default class CreateNewGroupController extends BlockComponent<Props, S, SS> {
	constructor(props: Props) {
		super(props);
		this.receive = this.receive.bind(this);
		this.state = {
			isLoading: false,
			goupName: '',
			participantsList: this.props.route.params?.participants
		};
		runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
	}
	onNameChange(text: string) {
		this.setState({ groupName: text })
	}
	isValidateGroupName() {
		if (this.state.groupName) {
			return true
		} else {
			Alert.alert("", "Please enter group name.")
			return false
		}
	}
	onCreate() {
		if (this.isValidateGroupName()) {
			this.createGroup()
		}
	}
	createGroup() {
		this.setState({ isLoading: true })
		let groupName =this.state.groupName.replace(/ /g,'').toLowerCase();
		let GUID = `${groupName}_${Math.floor(Math.random() * 100)}`;
		let groupType = CometChat.GROUP_TYPE.PRIVATE;
		let group = new CometChat.Group(GUID, groupName, groupType);
		let members = [];
		this.state.participantsList?.map((item) => {
			members.push(new CometChat.GroupMember(item?.uid, CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT))
		})
		CometChat.createGroup(group).then(
			response => {
				CometChat.addMembersToGroup(GUID, members, []).then(
					response => {
						this.setState({ isLoading: false })
						this.props.navigation.replace("ConversationScreen",{						chatNumber: group?.guid,
						mainConversationId: group?.conversationId,
						userName: group?.name,
						userAvtar: group?.avatar,
						userType: 2,
					})
					}, error => {
						this.setState({ isLoading: false })
						Alert.alert("Error",error?.message);
						console.log("Some error occured while adding member in group in CreateNewGroupScreen", error)
					}
				);
			}, error => {
				this.setState({ isLoading: false })
				Alert.alert("Error",error?.message)
				console.log("Some error occured while creating group in CreateNewGroupScreen", error)
			}
		);
	}
}
// Customizable Area End
