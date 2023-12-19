// Customizable Area Start
//@ts-ignore
//@ts-nocheck
import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StatusBar,
  SafeAreaView,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { COLORS } from "../../../framework/src/Globals";
import { police, chat, call, share } from "./assets";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import MapView, { PROVIDER_GOOGLE, Polyline, Marker } from "react-native-maps";
import AlertLocationScreenController, {
  Props,
  configJSON,
} from "./AlertLocationScreenController";
import { deviceWidth, scaledSize } from "../../../framework/src/Utilities";
export const mapRef: any = React.createRef();
export default class AlertLocationScreen extends AlertLocationScreenController {
  constructor(props: Props) {
    super(props);
  }
  renderMarker(
    key: string,
    isHilighted: boolean,
    latitude: number,
    longitude: number,
    title: string
  ) {
    return (
      <Marker
        key={key}
        coordinate={{ latitude: latitude, longitude: longitude }}
        title={title}
				anchor={{ x: 0.5, y: 0.5 }}
				calloutOffset={{ x: 0.5, y: 0.5 }}
      >
        <View style={Styles.markerOuterView}>
          <View
            style={
              isHilighted
                ? Styles.markerInnerDarkView
                : Styles.markerInnerLightView
            }
          />
        </View>
      </Marker>
    );
  }
  render() {
    return (
      <SafeAreaView style={Styles.container}>
        <StatusBar
          animated={true}
          backgroundColor="#f07135"
          barStyle={"light-content"}
          showHideTransition={"slide"}
        />
        <View style={Styles.appBarStyle}>
          <TouchableOpacity
            testID="alert_back_button"
            style={Styles.iconView}
            onPress={() => this.onBackPress()}
          >
            <MaterialIcon
              name="chevron-left"
              color={COLORS.backgroundGray}
              size={scaledSize(30)}
            />
          </TouchableOpacity>
          <View style={Styles.screenTitleView}>
            <Text style={Styles.screenTitleText}>
              {configJSON.alarmactivated}
            </Text>
          </View>
          <TouchableOpacity style={Styles.iconView}>
            <MaterialIcon
              name="more-vert"
              color={COLORS.backgroundGray}
              size={scaledSize(30)}
            />
          </TouchableOpacity>
        </View>
        {this.state.isLoading ? (
          <View style={Styles.loaderView}>
            <ActivityIndicator
              animating={true}
              size={"large"}
              color="#f07233"
            />
          </View>
        ) : (
          <>
            <View style={Styles.profileDescriptionView}>
              <View style={Styles.profileView}>
                {
                  this.state.profileImageURL?
                  <Image
                    source={{uri:this.state.profileImageURL}}
                    style={Styles.profileImage}
                  />
                  :
                  <Image
                    source={police}
                    style={Styles.profileImage}
                  />
                }
                
                <Text style={Styles.userName} numberOfLines={2}>
                  {this.state.userName}
                </Text>
              </View>
              <View style={Styles.descriptioView}>
                <View style={Styles.descriptionTextView}>
                  <Text numberOfLines={4} style={Styles.descriptionText}>
                    {this.state.description || "No description available."}
                  </Text>
                </View>
                <TouchableOpacity style={Styles.viewProfileButton}>
                  <Text style={Styles.viewProfile}>
                    {configJSON.viewProfile}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={Styles.mapViewStyle}>
              <MapView
                testID="mapView"
                style={Styles.mapStyle}
                ref={mapRef}
                followsUserLocation={true}
                showsMyLocationButton={false}
                provider={PROVIDER_GOOGLE}
                toolbarEnabled={false}
                initialRegion={{
                  latitude: this.state.currentLatitude,
                  longitude: this.state.currentLongitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                {this.renderMarker(
                  "user1",
                  true,
                  this.state.currentLatitude,
                  this.state.currentLongitude,
                  "You"
                )}
                {this.renderMarker(
                  "user2",
                  false,
                  this.state.userLatitude,
                  this.state.userLongitude,
                  this.state.userName
                )}
                <Polyline
                  coordinates={[
                    {
                      latitude: this.state.currentLatitude,
                      longitude: this.state.currentLongitude,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    },
                    {
                      latitude: this.state.userLatitude,
                      longitude: this.state.userLongitude,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    },
                  ]}
                  strokeWidth={2}
                  strokeColor={COLORS.backgroundGray}
                />
              </MapView>
            </View>
            <View style={Styles.buttonsOnMap}>
              <TouchableOpacity
                testID="alert_chat_button"
                onPress={() => this.onChatPress()}
                style={Styles.sideIcon}
              >
                <Image source={chat} style={Styles.iconStyle} />
              </TouchableOpacity>
              <TouchableOpacity style={Styles.sideIcon}>
                <Image source={call} style={Styles.iconStyle} />
              </TouchableOpacity>
              <TouchableOpacity style={Styles.sideIcon}>
                <Image source={share} style={Styles.iconStyle} />
              </TouchableOpacity>
            </View>
							<View style={Styles.bottomView}>
								<Text style={Styles.bottomTextView}>
									{this.state.isAlertSender
										? `${this.state.userName} accept your help request. He/she is ${this.state.distanse} meters away, will contact you soon.`
										: `You accept ${this.state.userName}'s help request. He/she is ${this.state.distanse} meters away.`}
								</Text>
							</View>
          </>
        )}
      </SafeAreaView>
    );
  }
}

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appBarStyle: {
    height: scaledSize(50),
    width: deviceWidth,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f07135",
  },
  iconView: {
    marginHorizontal: scaledSize(10),
  },
  screenTitleView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  screenTitleText: {
    color: COLORS.backgroundGray,
    fontSize: scaledSize(18),
    fontWeight: "700",
  },
  profileDescriptionView: {
    height: scaledSize(120),
    width: deviceWidth,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3f4040",
  },
  profileView: {
    width: scaledSize(100),
    height: scaledSize(120),
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    height: scaledSize(60),
    width: scaledSize(60),
    borderRadius: scaledSize(30),
    padding: scaledSize(5),
  },
  userName: {
    fontSize: scaledSize(13),
    color: "#919392",
    textAlign: "center",
    paddingTop: scaledSize(5),
  },
  descriptioView: {
    flex: 1,
    margin: scaledSize(10),
    borderWidth: 1,
    borderColor: "#555757",
  },
  descriptionTextView: {
    flex: 1,
    padding: scaledSize(5),
  },
  descriptionText: {
    fontSize: scaledSize(13),
    color: "#919392",
  },
  viewProfileButton: {
    marginVertical: scaledSize(5),
  },
  viewProfile: {
    textAlign: "center",
    fontSize: scaledSize(12),
    color: "#fa9547",
  },
  mapViewStyle: {
    flex: 1,
  },
  mapStyle: {
    height: "100%",
    width: "100%",
  },
  markerOuterView: {
    height: scaledSize(20),
    width: scaledSize(20),
		//marginBottom:-scaledSize(10),
    borderRadius: scaledSize(10),
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  markerInnerDarkView: {
    height: scaledSize(16),
    width: scaledSize(16),
    borderRadius: scaledSize(8),
    backgroundColor: "#f07135",
  },
  markerInnerLightView: {
    height: scaledSize(16),
    width: scaledSize(16),
    borderRadius: scaledSize(8),
    borderWidth: scaledSize(2),
    borderColor: "black",
  },
  bottomView: {
    position: "absolute",
    bottom: 0,
		width:"100%",
		alignItems:'center'
  },
	bottomTextView:{
		marginHorizontal: scaledSize(10),
    padding: scaledSize(10),
    borderTopLeftRadius: scaledSize(20),
    borderTopRightRadius: scaledSize(20),
    backgroundColor: "#ffd8a0",
	},
  buttonsOnMap: {
    zIndex: 1,
    position: "absolute",
    bottom: scaledSize(60),
    right: scaledSize(15),
    alignSelf: "flex-end",
    flex: 1,
  },
  sideIcon: {
    backgroundColor: COLORS.white,
    borderRadius: scaledSize(25),
    width: scaledSize(50),
    height: scaledSize(50),
    marginBottom: scaledSize(20),
    justifyContent: "center",
    alignItems: "center",
  },
  iconStyle: {
    height: scaledSize(22),
    width: scaledSize(22),
  },
  loaderView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
// Customizable Area End
