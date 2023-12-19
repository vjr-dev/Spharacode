// Customizable Area Start
//@ts-nocheck
//@ts-ignore
import React from "react";
import {
	Image,
	Text,
	TouchableOpacity,
	TextInput,
	View,
	StyleSheet,
	FlatList,
	Modal,
	ActivityIndicator
} from "react-native";
import Swipeout from "react-native-swipeout";
import * as IMAGE from "./assets";
import ChatConversationsController from "./ChatConversationsController";
import { COLORS } from "../../../framework/src/Globals";
import { Colors } from "../../customform/src/CustomformController";
import { scaledSize, deviceWidth } from "framework/src/Utilities";

export default class ChatConversations extends ChatConversationsController {
	swipeComponentLabel = (label: string) => {
		if (label === "pin") {
			return "Pin";
		} else if (label === "delete") {
			return "Delete";
		} else if (label === "archive") {
			return "Archive";
		} else {
			return "More";
		}
	};
	iconSource = (label: string) => {
		if (label === "pin") {
			return IMAGE.Pin;
		} else if (label === "delete") {
			return IMAGE.Delete;
		} else if (label === "archive") {
			return IMAGE.Archive;
		} else {
			return IMAGE.menu;
		}
	};
	swipeComponent(item: any, label: string) {
		return (
			<TouchableOpacity
				testID="componentButton"
				onPress={() => {
					if (label === "pin") {
						this.pinClick(item);
					} else if (label === "delete") {
						this.DeleteClick(item);
					} else if (label === "archive") {
						this.ArchiveClick(item);
					} else {
						this.MoreClick(item);
					}
				}}
				style={styles.swipeComponentButton}
			>
				<Image
					resizeMode="contain"
					source={this.iconSource(label)}
					style={styles.swipeComponentIcon}
				/>
				<Text style={styles.swipeComponentLabel}>{this.swipeComponentLabel(label)}</Text>
			</TouchableOpacity>
		);
	}
	getDate(timeStamp: number) {
		let currentDate = new Date();
		let yesterDayDate = new Date(Date.now() - 864e5);
		let messageDate = new Date(timeStamp * 1000 );
		let todayDateString = `${currentDate?.getDate()}/${currentDate?.getMonth()+1}/${currentDate?.getFullYear()}`
		let yesterDateString = `${yesterDayDate?.getDate()}/${yesterDayDate?.getMonth()+1}/${yesterDayDate?.getFullYear()}`
		let messageDateString = `${messageDate?.getDate()}/${messageDate?.getMonth()+1}/${messageDate?.getFullYear()}`;
		if(todayDateString === messageDateString){
			return "Today"
		}else if(yesterDateString === messageDateString){
			return "Yesterday"
		}
		else{
			return `${messageDate?.getDate()}/${messageDate?.getMonth()+1}/${messageDate?.getFullYear()}`
		}
	}
	renderConversationItem(item: any, index: number) {
		return (
			// <Swipeout
			// 	close={true}
			// 	autoClose={true}
			// 	style={{ marginTop: index == 0 ? 10 : 13 }}
			// 	backgroundColor="trancperant"
			// 	left={[
			// 		// {
			// 		// 	component: this.swipeComponent(item, "pin"),
			// 		// 	backgroundColor: "#363636",
			// 		// },
			// 		{
			// 			component: this.swipeComponent(item, "delete"),
			// 			backgroundColor: "#363636",
			// 		},
			// 		// {
			// 		// 	component: this.swipeComponent(item, "archive"),
			// 		// 	backgroundColor: "#363636",
			// 		// },
			// 		// {
			// 		// 	component: this.swipeComponent(item, "more"),
			// 		// 	backgroundColor: COLORS.orangelight,
			// 		// },
			// 	]}
			// >
				<TouchableOpacity
					style={styles.itemView}
					onPress={() => this.onPressItem(item)}
				>
					<View>
						<View style={styles.profileImage}></View>
					</View>
					<View style={styles.textView}>
						<Text style={styles.userNameText}>{item?.conversationWith?.name}</Text>
						<Text numberOfLines={1} style={styles.lastMessageText}>{item?.lastMessage?.text}</Text>
					</View>
					<View style={styles.itemRightView}>
						<Text style={styles.dateText}>{this.getDate(item?.lastMessage?.sentAt)}</Text>
						{
							item?.unreadMessageCount > 0 ?
								<View style={styles.circleView}>
									<Text>{item?.unreadMessageCount}</Text>
								</View>
								:
								<View />
						}

					</View>
				</TouchableOpacity>
			// </Swipeout>
		)
	}
	flatListFooter() {
		return (
			<View>
				{this.state.isFlatListFooterLoading ? (
					<ActivityIndicator
						animating={true}
						size={"small"}
						color="#f07233"
					/>
				) : (
					null
				)}
			</View>
		)
	}
	render() {
		return (
			<View style={{ flex: 1 }}>
				<View>
					<View style={styles.searchView}>
						<View style={styles.searchBar}>
							<Image source={IMAGE.search} style={styles.searchIcon} />
							<TextInput
								testID="searchTextInput"
								placeholder="Search"
								onChangeText={(text: string) => this.onSearch(text)}
								placeholderTextColor="white"
								style={styles.searchInput}
							/>
						</View>
						<TouchableOpacity
							testID="menuButton"
							onPress={() => this.onCreate()}
							style={styles.menuButton}
						>
							<Image
								resizeMode="contain"
								source={IMAGE.menu}
								style={styles.menuIcon}
							/>
						</TouchableOpacity>
					</View>
					{
						!this.state.isLoading ?
							<Text style={styles.unreadMessageText}>{`You have ${this.state.unReadCount} unread messages.`}</Text>
							:
							null
					}
				</View>
				<View style={{ flex: 1 }}>
					{
						this.state.isLoading?
						<View
							style={styles.loaderView}
						>
							<ActivityIndicator
								animating={true}
								size={"large"}
								color="#f07233"
							/>
						</View>
						:
						<FlatList
							data={this.state.searchText ? this.state.conversationList?.filter((item) => item?.conversationWith?.name?.includes(this.state.searchText)) : this.state.conversationList}
							testID="conversationList"
							style={styles.flatListStyle}
							contentContainerStyle={styles.contentContainerStyle}
							keyExtractor={(item, index): any => item?.conversationId}
							renderItem={({ item, index }: any) => this.renderConversationItem(item, index)}
							onEndReached={() => this.endReached()}
							onEndReachedThreshold={0.3}
							ListFooterComponent={this.flatListFooter()}
							refreshing={false}
							onRefresh={() => { this.onRefresh() }}
							showsVerticalScrollIndicator={false}
						/>
					}
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	searchView: {
		paddingVertical: scaledSize(10),
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	searchBar: {
		width: "85%",
		height: scaledSize(40),
		backgroundColor: COLORS.Viewback,
		borderRadius: scaledSize(25),
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: scaledSize(10),
		marginLeft: scaledSize(10)
	},
	searchIcon: {
		height: scaledSize(20),
		width: scaledSize(20),
		marginRight: scaledSize(5),
		tintColor: COLORS.lightwhite
	},
	searchInput: {
		color: "white",
		flex: 1,
	},
	menuButton: {
		flex: 1,
		height: scaledSize(50),
		alignItems: "center",
		justifyContent: "center"
	},
	menuIcon: {
		height: scaledSize(25),
		width: scaledSize(25),
		tintColor: COLORS.white
	},
	unreadMessageText: {
		color: COLORS.ultralightwhite,
		fontSize: scaledSize(12),
		marginHorizontal: scaledSize(10),
	},
	swipeComponentButton: {
		height: "100%",
		width: "100%",
		alignItems: "center",
		justifyContent: "center"
	},
	swipeComponentLabel: {
		color: COLORS.ultralightwhite,
		fontSize: scaledSize(16)
	},
	swipeComponentIcon: {
		height: scaledSize(20),
		width: scaledSize(20),
		tintColor: COLORS.ultralightwhite,
		marginBottom: scaledSize(5)
	},
	itemView: {
		flex: 1,
		marginHorizontal: scaledSize(10),
		marginVertical:scaledSize(5),
		flexDirection: 'row',
		padding: scaledSize(10),
		borderRadius: scaledSize(5),
		backgroundColor: COLORS.Viewback,
	},
	flatListStyle: {
		flexGrow: 1,
		width: deviceWidth,
		marginTop: scaledSize(5)
	},
	contentContainerStyle: {
		paddingBottom: scaledSize(10),
	},
	profileImage: {
		height: scaledSize(50),
		width: scaledSize(50),
		borderRadius: scaledSize(25),
		marginRight: scaledSize(10),
		backgroundColor: COLORS.orangelight,
	},
	textView: {
		flex: 1
	},
	userNameText: {
		fontSize: scaledSize(14),
		fontWeight: '300',
		color: COLORS.white,
	},
	lastMessageText: {
		flexWrap: 'wrap',
		fontSize: scaledSize(12),
		fontWeight: '200',
		color: COLORS.lightwhite
	},
	itemRightView: {
		padding: scaledSize(5),
		alignItems: 'center',
		justifyContent: 'center'
	},
	circleView: {
		height: scaledSize(18),
		width: scaledSize(18),
		borderRadius: scaledSize(9),
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: COLORS.orangelight,
		marginTop: scaledSize(5)
	},
	dateText: {
		fontSize: scaledSize(8),
		color: Colors.white,
		fontWeight: '100'
	},
	loaderView: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	}
})
// Customizable Area End
