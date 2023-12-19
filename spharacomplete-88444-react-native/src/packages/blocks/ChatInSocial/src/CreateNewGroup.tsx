// Customizable Area Start
//@ts-nocheck
//@ts-ignore
import React from "react";
import {
	Image,
	ImageBackground,
	Text,
	TouchableOpacity,
	View,
	StyleSheet,
	Modal,
	TextInput,
	FlatList,
	ActivityIndicator,
	SafeAreaView
} from "react-native";
import * as IMAGE from "./assets";
import CreateNewGroupController from "./CreateNewGroupController";
import { COLORS } from "../../../framework/src/Globals";
import { Colors } from "../../customform/src/CustomformController";
import { scaledSize, deviceHeight, deviceWidth } from "framework/src/Utilities";

const boxDimension = (deviceWidth-scaledSize(50))/4;

export default class CreateNewGroup extends CreateNewGroupController {
	renderParticipantsList(item:any, index: number){
		return(
			<View style={styles.itemStyle}>
				<View style={styles.profileImage} />
				<Text numberOfLines={1} style={styles.subLabel}>{item?.name}</Text>
			</View>
		);
	}
	render() {
		return (
			<SafeAreaView style={styles.mainView}>
				<ImageBackground source={IMAGE.back1} style={styles.container}>
					<ImageBackground source={IMAGE.back2} style={styles.container}>
						<View style={{flex:1}}>
							<View>
							<View style={styles.header}>
								<TouchableOpacity
									testID="newChatButton"
									style={styles.backButton}
									onPress={() => {
										this.props.navigation.goBack();
									}}
								>
									<Image source={IMAGE.image_back} style={styles.backIcon} />
								</TouchableOpacity>
								<View style={styles.titleView}>
									<Text style={styles.titleText}>{"New Group"}</Text>
								</View>
						        <TouchableOpacity
											onPress={() => {
												this.onCreate();
											}}
											style={styles.createView}>
											<Text style={styles.createText}>CREATE</Text>
										</TouchableOpacity>
							</View>
							<Text style={styles.label}>New Group name.</Text>
							<Text style={styles.subLabel}>Name in lowercase without space and less then 22 characters .</Text>
							<View style={styles.nameBar}>
								<TextInput
									testID="searchTextInput"
									value={this.state.groupName}
									placeholder="Name"
									onChangeText={(text: string) => this.onNameChange(text)}
									placeholderTextColor="grey"
									maxLength={22}
									style={styles.nameInput}
								/>
							</View>
							<Text style={styles.subLabel}>{`Participants:  ${this.state.participantsList?.length}`}</Text>
							</View>
							<View style={{flex:1}}>
							<FlatList
									data={this.state.participantsList}
									numColumns={4}
									style={styles.flatListStyle}
									contentContainerStyle={styles.contentContainerStyle}
									keyExtractor={(index): any => index}
									renderItem={({ item, index }: any) => {
										return this.renderParticipantsList(item, index);
									}}
									showsVerticalScrollIndicator={false}
									/>
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
	titleView: {
		flex: 1
	},
	titleText: {
		fontSize: scaledSize(20),
		fontWeight: "400",
		color: Colors.white,
		marginLeft: scaledSize(10),
	},
    createText:{
      fontSize: scaledSize(17),
		fontWeight: "500",
		color: COLORS.orangelight
    },
		createView: {
		height: scaledSize(30),
		alignItems: 'center',
		justifyContent: 'center'
	},
	itemStyle:{
		width:boxDimension,
		margin:5, 
		alignItems:'center',
		justifyContent:'center'
	},
	label:{
		fontSize: scaledSize(17),
		fontWeight: "400",
		color: Colors.white,
		marginTop:scaledSize(30),
		marginHorizontal: scaledSize(10),
	},
	subLabel:{
		fontSize: scaledSize(13),
		fontWeight: "200",
		color: Colors.white,
		marginTop:scaledSize(5),
		marginHorizontal: scaledSize(10),
	},
	nameBar: {
		height: scaledSize(50),
		backgroundColor: COLORS.Viewback,
		borderRadius: scaledSize(50),
		flexDirection: "row",
		justifyContent:'center',
		paddingHorizontal: scaledSize(10),
		marginHorizontal: scaledSize(10),
		marginVertical: scaledSize(20),
	},
	flatListStyle: {
		flexGrow: 1,
		width: deviceWidth,
		marginTop: scaledSize(5)
	},
	contentContainerStyle: {
		paddingBottom: scaledSize(10),
	},
	nameInput: {
		color: "white",
		flex: 1,
	},
	profileImage: {
		height: scaledSize(50),
		width: scaledSize(50),
		borderRadius: scaledSize(25),
		marginRight: scaledSize(10),
		backgroundColor: COLORS.orangelight,
	},
	loaderView: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	}
});
// Customizable Area End
