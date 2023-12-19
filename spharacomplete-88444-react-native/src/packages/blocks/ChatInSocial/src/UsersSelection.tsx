// Customizable Area Start
//@ts-nocheck
//@ts-ignore
import React from "react";
import {
	ActivityIndicator, FlatList, Image,
	ImageBackground, Modal, StyleSheet, Text, TextInput, TouchableOpacity,
	View, SafeAreaView

} from "react-native";
import { COLORS } from "../../../framework/src/Globals";
import { Colors } from "../../customform/src/CustomformController";
import * as IMAGE from "./assets";
import UsersSelectionController from "./UsersSelectionController";
import { scaledSize, deviceHeight, deviceWidth } from "framework/src/Utilities";

export default class UsersSelection extends UsersSelectionController {
	isSelected(item) {
		let isPresent = false;
		this.state.selectedUser?.map((i) => {
			if (i?.uid === item?.uid) {
				isPresent = true
			}
		})
		return isPresent
	}
	async onCheck(item) {
		if (this.isSelected(item)) {
			let tempSelectedUser = this.state.selectedUser;
			tempSelectedUser = tempSelectedUser.filter((j) => j.uid !== item.uid);
			this.setState({ selectedUser: tempSelectedUser })
		} else {
			this.setState({ selectedUser: [...this.state.selectedUser, item] })
		}
	}
	renderUserList(item: any, index: number) {
		return (
			<TouchableOpacity style={styles.itemView}
				onPress={() => {
					if (!this.props.route.params?.multipleSelection) {
						this.onUserSelect(item);
					} else {
						this.onCheck(item);
					}
				}}
			>
				<View style={styles.profileImage} />
				<View style={styles.textView}>
					<Text style={styles.nameStyle}>{item?.name}</Text>
				</View>
				{
					this.props.route.params?.multipleSelection ?
						<View style={styles.checkBoxView}>
							<View style={styles.checkBoxStyle}>
								{
									this.isSelected(item) ?
										<Image source={IMAGE.check} style={styles.checkIcon} />
										: null
								}
							</View>
						</View>
						:
						null
				}
			</TouchableOpacity>
		);
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
					<View />
				)}
			</View>
		)
	}

	render() {
		return (
		<SafeAreaView style={styles.mainView}>
			<ImageBackground source={IMAGE.back1} style={styles.container}>
				<ImageBackground source={IMAGE.back2} style={styles.container}>
					<View style={{ flex: 1 }}>
						<View>
							<View style={styles.header}>
								<TouchableOpacity
									testID="newChatButton"
									style={styles.backButton}
									onPress={() => {
										this.props.navigation.pop();
									}}
								>
									<Image source={IMAGE.image_back} style={styles.backIcon} />
								</TouchableOpacity>
								<View style={styles.titleView}>
									<Text style={styles.titleText}>{this.props.route.params?.title}</Text>
								</View>
								{
									this.props.route.params?.multipleSelection ?
										<TouchableOpacity
											onPress={() => {
												this.onNext();
											}}
											style={styles.doneView}>
											<Text style={styles.nextText}>Next</Text>
										</TouchableOpacity>
										:
										null
								}
							</View>
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
						</View>
						<View style={{ flex: 1 }}>
							<FlatList
								data={this.state.userList}
								style={styles.flatListStyle}
								contentContainerStyle={styles.contentContainerStyle}
								keyExtractor={(item): any => item?.uid}
								renderItem={({ item, index }: any) => this.renderUserList(item, index)}
								onEndReached={() => this.endReached()}
								onEndReachedThreshold={0.3}
								showsVerticalScrollIndicator={false}
								initialNumToRender={5}
								removeClippedSubviews={false}
								ListFooterComponent={() => this.flatListFooter()}
								refreshing={false}
								onRefresh={() => { this.onRefresh() }}
							/>
							{
								!this.state.isLoading && this.state.userList.length === 0 ?
									<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
										<Text style={styles.noDataText}>No data available</Text>
									</View>
									: null
							}
						</View>
						
					</View>
					<Modal visible={this.state.isLoading} transparent={true} >
						<View style={styles.loaderView}>
							<ActivityIndicator
								animating={true}
								size={"large"}
								color="#f07233"
							/>
						</View>
					</Modal>
				</ImageBackground>
			</ImageBackground>
		</SafeAreaView>
		);
	}
}
const styles = StyleSheet.create({
	mainView:{
		flex:1,
		backgroundColor: "#454545"
	},
	container: {
		flex: 1,
		height: deviceHeight,
		width: deviceWidth,
	},
	header: {
		height: scaledSize(60),
		width: deviceWidth,
		padding: scaledSize(10),
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#444444",
		elevation: scaledSize(5),
	},
	backButton: {
		height: scaledSize(20),
		width: scaledSize(20),
	},
	backIcon: {
		height: scaledSize(18),
		width: scaledSize(18),
		tintColor: COLORS.white,
	},
	flatListStyle: {
		flexGrow: 1,
		width: deviceWidth
	},
	contentContainerStyle: {
		paddingBottom: scaledSize(10),
	},
	titleView: {
		flex: 1
	},
	titleText: {
		fontSize: scaledSize(20),
		fontWeight: "400",
		color: Colors.white,
		marginLeft: scaledSize(10),
	},
	doneView: {
		height: scaledSize(30),
		alignItems: 'center',
		justifyContent: 'center'
	},
	nextText: {
		fontSize: scaledSize(17),
		fontWeight: "500",
		color: COLORS.orangelight
	},
	noDataText:{
		fontSize: scaledSize(17),
		fontWeight: "500",
		color: COLORS.orangelight
	},
	searchBar: {
		height: scaledSize(40),
		backgroundColor: COLORS.Viewback,
		borderRadius: scaledSize(20),
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: scaledSize(10),
		marginHorizontal: scaledSize(10),
		marginVertical: scaledSize(10),
	},
	searchIcon: {
		height: scaledSize(20),
		width: scaledSize(20),
		marginRight: scaledSize(5),
		tintColor: COLORS.lightwhite,
	},
	searchInput: {
		color: "white",
		flex: 1,
	},

	itemView: {
		flex: 1,
		marginHorizontal: scaledSize(10),
		flexDirection: "row",
		alignItems: 'center',
		justifyContent: 'center',
		padding: scaledSize(10),
		borderRadius: scaledSize(5),
	},
	profileImage: {
		height: scaledSize(50),
		width: scaledSize(50),
		borderRadius: scaledSize(25),
		marginRight: scaledSize(10),
		backgroundColor: COLORS.orangelight,
	},
	textView: {
		flex: 1,
		justifyContent: 'center'
	},
	nameStyle: {
		color: Colors.white,
		fontSize: scaledSize(15),
		fontWeight: '400'
	},
	checkBoxView: {
		height: scaledSize(40),
		width: scaledSize(40),
		alignItems: 'center',
		justifyContent: 'center'
	},
	checkBoxStyle: {
		height: scaledSize(20),
		width: scaledSize(20),
		borderWidth: scaledSize(1),
		borderColor: Colors.white,
		borderRadius: scaledSize(5),
		alignItems: 'center',
		justifyContent: 'center'
	},
	checkIcon: {
		height: scaledSize(10),
		width: scaledSize(10),
		tintColor: COLORS.white,
	},
	loaderView: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	}
});
// Customizable Area End
