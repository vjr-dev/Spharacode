//@ts-nocheck
//@ts-ignore
import React from "react";
// Customizable Area Start
import {
  Platform,
  View,
  TouchableOpacity,
  Text,
  StatusBar,
  Modal,
  SafeAreaView,
  Image,
  Switch,
  Linking,
  StyleSheet
} from "react-native";
import { Styles } from "./MapStyle";
import { COLORS } from "../../../framework/src/Globals";
import { google_pay, apple_pay} from "./assets";
import Icon from "react-native-vector-icons/FontAwesome";
import MapView, {
  PROVIDER_GOOGLE,
  Callout,
  Circle,
  MarkerAnimated,
} from "react-native-maps";
import MapsController, { Props } from "./MapsController";
import ModalIcon from "react-native-vector-icons/SimpleLineIcons";
import MapIcon from "react-native-vector-icons/MaterialIcons";
export const mapRef: any = React.createRef();
// Customizable Area End




export default class Maps extends MapsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  platformIosFn = () => {
    if(Platform.OS === "ios" ){
      return(
        <TouchableOpacity
        testID="appleclickBtn"
        onPress={() => this._onApplepayClick()}
        style={Styles.payTypeButton}
      >
        <View style={Styles.payTypeSec1}>
          <Image style={Styles.socialImage} source={apple_pay} />
          <Text style={Styles.socialText}>Apple Pay</Text>
        </View>
        <View style={Styles.payTypeSec2}>
          <Icon name="angle-right" color={"#999899"} size={22} />
        </View>
      </TouchableOpacity>
      )
    }else{
      return null;
    }
  }

  backgroundColorFn = (item: any) => {
    if(this.state.selectedPlan == item.id){
      return "#f99548";
    }else{
       return COLORS.white;
    }
  }

  borderWidthFn = (item: any) => {
    if(this.state.selectedPlan == item.id){
      return 0;
    }else{
      return 1;
    }
  }

  paymentViewfn = () => {
    if (this.state.viewPlans) {
      if (this.state.paymentView) {
        return (
          <View style={Styles.commonCenterView}>
            <Text style={Styles.paymentTitle}>
              Send payment using any of the following
            </Text>
            <TouchableOpacity
              testID="googlepayBtn"
              onPress={() => this._onGooglePayClick()}
              style={Styles.payTypeButton}
            >
              <View style={Styles.payTypeSec1}>
                <Image style={Styles.socialImage} source={google_pay} />
                <Text style={Styles.socialText}>Google Pay</Text>
              </View>
              <View style={Styles.payTypeSec2}>
                <Icon name="angle-right" color={"#999899"} size={22} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              testID="RpayBtn"
              onPress={() => this.Rpay()}
              style={Styles.payTypeButton}
            >
              <View style={Styles.payTypeSec1}>
                <Image
                  style={Styles.socialImage}
                  // source={apple_pay}
                />
                <Text style={Styles.socialText}>Rezorpay</Text>
              </View>
              <View style={Styles.payTypeSec2}>
                <Icon name="angle-right" color={"#999899"} size={22} />
              </View>
            </TouchableOpacity>
             {this.platformIosFn()}
          </View>
        );
      } else {
        return (
          <View style={Styles.commonCenterView}>
            {this.state.TrackingPlan?.map((item: any, index: any) => {
              console.log("PlanItems-----", item);
              return (
                <TouchableOpacity
                  key={item}
                  testID="planBtn"
                  onPress={() =>
                    this.onPlanClick(item.id, item.attributes?.price)
                  }
                  style={[
                    Styles.plansButton,
                    {
                      backgroundColor: this.backgroundColorFn(item),
                      borderWidth: this.borderWidthFn(item),
                      borderStyle:
                        this.state.selectedPlan == item.id ? "solid" : "dashed",
                    },
                  ]}
                >
                  <Text
                    style={[
                      Styles.plansButtonText,
                      {
                        color:
                          this.state.selectedPlan == item.id
                            ? COLORS.white
                            : "#797877",
                      },
                    ]}
                  >
                    ${item.attributes?.price}/{item.attributes?.duration}
                  </Text>
                </TouchableOpacity>
              );
            })}
            
          </View>
        );
      }
    } else {
      return null;
    }
  };

  paymentviewColor = () => {
    if(this.state.paymentView){
       return "#727170";
    }else if(this.state.selectedPlan != 0){
      return "#727170";
    }else{
       return "rgba(124,125,123,0.3)";
    }
  }

  viewplansFn = () => {
    if (this.state.viewPlans) {
      return (
        <View style={[Styles.viewPlan, { marginTop: 30 }]}>
          <TouchableOpacity
            testID="onpayBtn"
            onPress={() =>
              this.state.paymentView ? this.onPay() : this.onMakePayment()
            }
            disabled={this.state.selectedPlan == 0 ? true : false}
          >
            <Text
              style={[
                Styles.viewPlanText,
                {
                  color: this.paymentviewColor(),
                },
              ]}
            >
              {this.state.paymentView ? "PAY" : "MAKE PAYMENT"}
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return null;
    }
  };
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <SafeAreaView
        style={[
          Styles.container,
          { backgroundColor: this.state.modalVisible ? "#754c36" : "#f07135" },
        ]}
      >
        <View style={Styles.child}>
          <StatusBar
            animated={true}
            backgroundColor={this.state.modalVisible ? "#754c36" : "#f17234"}
            barStyle={"light-content"}
            showHideTransition={"slide"}
          />
          <View style={Styles.header_view}>
            <View/>
            <View style={{ paddingHorizontal: 60 }}>
              <Text style={Styles.header_txt}>Live Tracking</Text>
            </View>
            <TouchableOpacity>
              <MapIcon
                name="more-vert"
                color={COLORS.backgroundGray}
                size={30}
              />
            </TouchableOpacity>
          </View>
          <View style={Styles.mapView}>
            <MapView
              style={Styles.map}
              ref={mapRef}
              followsUserLocation={true}
              showsMyLocationButton={false}
              // showsUserLocation={true}
              provider={PROVIDER_GOOGLE}
              loadingEnabled
              loadingIndicatorColor={COLORS.darkorange}
              region={this.getMapRegion()}
            >
              <MarkerAnimated
                testID="markeranimatedBtn"
                anchor={{ x: 0.5, y: 0.5 }}
                ref={(marker) => (this.marker = marker)}
                coordinate={this.state.coordinatesvalues}
              >
                <View
                  style={{
                    width: 24,
                    height: 24,
                    backgroundColor: COLORS.darkorange,
                    borderWidth: 3,
                    borderColor: COLORS.white,
                    borderRadius: 12,
                  }}
                />

                <Callout tooltip>
                  <View
                    style={{
                      backgroundColor: COLORS.darkorange,
                      width: 40,
                      height: 20,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 3,
                    }}
                  >
                    <Text
                      style={{
                        color: COLORS.white,
                        fontSize: 12,
                        fontWeight: "700",
                      }}
                    >
                      You
                    </Text>
                  </View>
                </Callout>
              </MarkerAnimated>
              <Circle
                center={{
                  latitude: this.state.latitude,
                  longitude: this.state.longitude,
                }}
                radius={800}
                strokeColor={"transparent"}
                fillColor={"rgba(216,225,235,0.68)"}
              />
            </MapView>

            <View style={Styles.buttonsOnMap}>
              <TouchableOpacity
                testID="userLocationBtn"
                style={Styles.userLocationIcon}
                onPress={() => {
                  mapRef.current?.animateToRegion({
                    latitude: this.state.latitude,
                    longitude: this.state.longitude,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                  });
                }}
              >
                <MapIcon name="my-location" color={COLORS.skipGray} size={25} />
              </TouchableOpacity>
              <TouchableOpacity
                testID="openUrl"
                style={[
                  Styles.userLocationIcon,
                  { marginTop: 18, marginBottom: 30 },
                ]}
                onPress={() =>
                  Linking.openURL(
                    "https://www.google.com/maps/dir/?api=1&origin=" +
                      this.state.latitude +
                      "," +
                      this.state.longitude +
                      "&travelmode=driving"
                  )
                }
              >
                <MapIcon name="directions" color={COLORS.skipGray} size={25} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={Styles.bottomView}>
            <View style={{ marginVertical: 5 }}>
              <View style={Styles.bottomContentView}>
                <Text style={Styles.bottomContentText}>
                  Location live tracking ON/OFF.
                </Text>
                <Switch
                  testID="switchBtn1"
                  trackColor={{
                    false: COLORS.switchDarkGray,
                    true: COLORS.darkorange,
                  }}
                  thumbColor={COLORS.white}
                  onValueChange={(Val) => this.LocationTrackingSwitch(Val)}
                  value={this.state.locationTracking}
                  style={Styles.switchSize}
                />
              </View>
              <View style={Styles.bottomContentView}>
                <Text style={Styles.bottomContentText}>
                  Share with emergency contact.
                </Text>
                <Switch
                  testID="switchBtn2"
                  trackColor={{
                    false: COLORS.switchDarkGray,
                    true: COLORS.darkorange,
                  }}
                  thumbColor={COLORS.white}
                  onValueChange={(Val) => this.EmergencyContactSwitch(Val)}
                  value={this.state.emergencyContact}
                  style={Styles.switchSize}
                />
              </View>
              <View style={Styles.bottomContentView}>
                <Text style={Styles.bottomContentText}>Share with police.</Text>
                <Switch
                  testID="switchBtn3"
                  trackColor={{
                    false: COLORS.switchDarkGray,
                    true: COLORS.darkorange,
                  }}
                  thumbColor={COLORS.white}
                  onValueChange={(Val) => this.SharePoliceSwitch(Val)}
                  value={this.state.police}
                  style={Styles.switchSize}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={[Styles.centeredView, { position: "absolute" }]}>
          <Modal transparent={true} visible={this.state.modalVisible}>
            <View
              style={[
                Styles.centeredView,
                {
                  backgroundColor: this.state.modalVisible
                    ? "rgba(0,0,0,0.5)"
                    : "",
                },
              ]}
            >
              <View style={Styles.modalView}>
                <TouchableOpacity
                  testID="modalvisibleBtn"
                  onPress={() => this.modalvisiblefn()}
                  style={Styles.closeIcon}
                >
                  <MapIcon name="close" color={"#727170"} size={20} />
                </TouchableOpacity>
                <View style={{ marginTop: 20 }}>
                  <ModalIcon
                    name="lock-open"
                    style={{ transform: [{ rotateY: "180deg" }] }}
                    size={50}
                    color="orange"
                  />
                </View>
                <Text style={Styles.title}>Unlock Live Tracking</Text>
                <Text style={Styles.desc}>
                  To avail SPHARA real time tracking feature, please view our
                  subscription plan.
                </Text>
                <View style={[Styles.viewPlan, { marginTop: 25 }]}>
                  <Text
                    testID="paymentBtn"
                    onPress={() =>
                      this.state.paymentView ? null : this.onViewPlans()
                    }
                    style={Styles.viewPlanText}
                  >
                    {this.state.paymentView ? "MAKE PAYMENT" : "VIEW PLANS"}
                  </Text>
                </View>
                {this.paymentViewfn()}
                {this.viewplansFn()}
              </View>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    );
  }
  // Customizable Area End
}
// Customizable Area Start
const styles = StyleSheet.create({});
// Customizable Area End

