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
	SafeAreaView,
	ActivityIndicator
} from "react-native";
import * as IMAGE from "./assets";
import ChatDashBoardController from "./ChatDashBoardController";
import { COLORS } from "../../../framework/src/Globals";
import ChatConversations from "./ChatConversations";
import { scaledSize, deviceHeight, deviceWidth } from "framework/src/Utilities";

export default class ChatDashBoard extends ChatDashBoardController {

	render() {
		return (
		<SafeAreaView style={styles.mainView}>
			<ImageBackground source={IMAGE.back1} style={styles.container}>
				<ImageBackground source={IMAGE.back2} style={styles.container}>
					<View style={{ flex: 1 }}>
						<View style={styles.header}>
							<View style={styles.logoView} />
							<View style={styles.toggleView}>
								<TouchableOpacity
									style={[styles.button, { marginRight: 10, backgroundColor: this.state.screenFlag === 'chats' ? COLORS.orangelight : 'transparent' }]}
									onPress={() => this.onSwitch('chats')}
								>
									<Text style={[styles.buttonLabel, { color: this.state.screenFlag === 'chats' ? 'black' : 'white' }]}>Chats</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={[styles.button, { marginLeft: 10, backgroundColor: this.state.screenFlag === 'groups' ? COLORS.orangelight : 'transparent' }]}
									onPress={() => this.onSwitch('groups')}
								>
									<Text style={[styles.buttonLabel, { color: this.state.screenFlag === 'groups' ? 'black' : 'white' }]}>Groups</Text>
								</TouchableOpacity>
							</View>
							<TouchableOpacity
								testID="backHomeButton"
								onPress={() => this.onPressLogo()}
								style={styles.logoView}
							>
								<Image source={IMAGE.LOGO} style={styles.appLogo} />
							</TouchableOpacity>
						</View>

						<View style={styles.adView} />
						{
							this.state.isUserLoggedIn ?
							<ChatConversations
							{...this.props}
							screenFlag={this.state.screenFlag}
						/>
							:
							<View style={styles.loaderView}>
							<ActivityIndicator
								animating={true}
								size={'large'}
								color="#f07233"
							/>
							</View>
						}
						
					</View>
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
		width: deviceWidth
	},
	header: {
		height: scaledSize(60),
		width: deviceWidth,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: "#444444",
		elevation: scaledSize(5),
	},
	logoView: {
		width: scaledSize(70),
		alignItems: 'center',
		justifyContent: 'center'
	},
	toggleView: {
		flex: 1,
		height: scaledSize(45),
		backgroundColor: '#363636',
		borderRadius: scaledSize(25),
		flexDirection: 'row',
		padding: scaledSize(7)
	},
	button: {
		flex: 1,
		borderRadius: scaledSize(20),
		backgroundColor: 'yellow',
		padding: scaledSize(2),
		alignItems: 'center',
		justifyContent: 'center'
	},
	buttonLabel: {
		fontSize: scaledSize(15),
		fontWeight: '300'
	},
	appLogo: {
		height: scaledSize(40),
		width: scaledSize(40),
	},
	adView: {
		height: scaledSize(50),
		width: deviceWidth,
		backgroundColor: 'black'
	},
	loaderView:{
		flex:1,
		alignItems:'center',
		justifyContent:'center'
	}
})
// Customizable Area End
