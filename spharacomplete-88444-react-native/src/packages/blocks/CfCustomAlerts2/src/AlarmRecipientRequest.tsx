// Customizable Area Start
import React from "react";
import {
    View,
    TouchableOpacity,
    Text,
    StatusBar,
    SafeAreaView,
    ImageBackground,
    ScrollView,
    Image,
    Modal,
    ActivityIndicator
} from "react-native";
import { Styles } from "./AlarmRecipientRequestStyle";
import { back1, back2, google_map, alert_icon } from "./assets";
import AlarmRecipientRequestController, {
    Props
} from "./AlarmRecipientRequestController";
import { scaledSize } from "framework/src/Utilities";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import { COLORS } from "framework/src/Globals";
import CustomMap from "../../../components/src/CustomMap";

export default class AlarmRecipientRequest extends AlarmRecipientRequestController {
    constructor(props: Props) {
        super(props);
    }
    render() {
        return (
            <ImageBackground
                source={back1}
                style={Styles.image}>
                <ImageBackground
                    source={back2}
                    style={Styles.image2}>
                    <SafeAreaView>
                        <StatusBar
                            animated={true}
                            backgroundColor="#f07135"
                            barStyle={"light-content"}
                            showHideTransition={"slide"}
                        />
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={Styles.container}>
                                <Image source={alert_icon} style={Styles.alertIcon}></Image>
                                <Text style={Styles.header}>Request for help!</Text>
                                <Text style={Styles.text1}>{this.state.alertDetails.message} at {this.state.alertDetails.address} by {this.state.alertDetails.name}</Text>
                                {
                                    this.state.roleID === "1" ? (
                                        <TouchableOpacity
                                            testID="previewButton"
                                            onPress={() => this.onPreviewDistance()}
                                        >
                                            <Text
                                                style={[
                                                    Styles.text2,
                                                    { fontWeight: "bold", fontSize: scaledSize(14) },
                                                ]}
                                            >
                                                Preview Distance
                                            </Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <Text testID={"distanceText"} style={Styles.text2}>
                                            {`You are just ${this.state.alertDetails.distance} km away from the incident`}
                                        </Text>
                                    )
                                }
                                <View style={Styles.circlesContainer}>
                                    <TouchableOpacity style={Styles.circle_1} />
                                    <TouchableOpacity style={Styles.circle_2} />
                                    <TouchableOpacity
                                        style={Styles.circle_3} >
                                        <Image source={google_map} style={Styles.map_image}></Image>
                                    </TouchableOpacity>
                                </View>

                                <View style={Styles.buttonView}>
                                    <TouchableOpacity testID="btn_reject" onPress={() => this.onAlertReject()}>
                                        <Text style={Styles.buttonText}>REJECT</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity testID="btn_accept" onPress={() => this.onAlertAccept()}>
                                        <Text style={Styles.buttonText}>ACCEPT</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Modal testID={"distancePreviewModal"} visible={this.state.previewModal} transparent={true} >
                                <SafeAreaView style={{ flex: 1 }}>
                                    <View style={Styles.modalBody}>
                                        <View style={Styles.previewBaclgroundHeader}>
                                            <Text style={Styles.previewText}>Preview Distance</Text>
                                            <AntDesign
                                                testID="previewCloseButton"
                                                name="close"
                                                onPress={() => this.setState({ previewModal: false })}
                                                color={COLORS.white}
                                                size={scaledSize(20)}
                                            />
                                        </View>
                                        <View style={Styles.mapViewStyle}>
                                            {
                                                (this.state.alertDetails.user_latitude && this.state.alertDetails.user_longitude && this.state.currentUserLatitude != 0 && this.state.currentUserLongitude != 0) ?
                                                    <CustomMap
                                                        currentLatitude={Number(this.state.currentUserLatitude)}
                                                        currentLongitude={Number(this.state.currentUserLongitude)}
                                                        userLatitude={Number(this.state.alertDetails.user_latitude)}
                                                        userLongitude={Number(this.state.alertDetails.user_longitude)}
                                                    />
                                                    : null
                                            }
                                        </View>
                                        <View style={Styles.detailsView}>
                                            <View
                                                style={Styles.distanceTitleView}
                                            >
                                                <Text style={Styles.distanceText}>
                                                    Distance
                                                </Text>
                                                <View style={{ flexDirection: "row" }}>
                                                    <Text style={Styles.bottomTextView}>{`${this.state.alertDetails.distance}k`}</Text>
                                                    <View style={Styles.verticleLine} />
                                                    <Text style={Styles.bottomTextView}>
                                                        02:46min
                                                    </Text>
                                                </View>
                                            </View>
                                            <ScrollView>
                                                <View style={Styles.addressView}>
                                                    <View style={Styles.addressSubView}>
                                                        <Entypo
                                                            name="location"
                                                            style={Styles.locationIcon}
                                                            color={COLORS.orange}
                                                            size={scaledSize(15)}
                                                        />
                                                        <Text style={Styles.addressText}>
                                                            {this.state.alertDetails.address}
                                                        </Text>
                                                    </View>

                                                    <View style={Styles.subContainer}>
                                                        <TouchableOpacity style={Styles.codeBtn}>
                                                            <Text style={Styles.codeBtnFont}>6678</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                                <View style={Styles.descriptionView}>
                                                    <View
                                                        style={Styles.descriptionHeaderView}
                                                    >
                                                        <Text style={Styles.descriptionText}>Description</Text>
                                                        <Text style={Styles.descriptionText}>
                                                            30/07/19 at 1:30pm
                                                        </Text>
                                                    </View>

                                                    <Text style={[Styles.addressText, { paddingBottom: scaledSize(10) }]}>
                                                        I am in Danger, My home is in fire, Please send us help
                                                        as soon as possible.
                                                    </Text>

                                                    <View style={Styles.timeUntilView}>
                                                        <Text style={[Styles.addressText, { width: "50%" }]}>
                                                            Time until
                                                        </Text>

                                                        <Text
                                                            style={Styles.timeText}
                                                        >
                                                            08:53
                                                        </Text>
                                                    </View>
                                                </View>
                                            </ScrollView>

                                        </View>
                                    </View>
                                    <View style={Styles.btnView}>
                                        <TouchableOpacity testID={"previewRejectButton"} style={{ width: "50%" }} onPress={() => this.onAlertReject()}>
                                            <Text style={Styles.bottomBtn}>REJECT</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            testID={"previewAcceptButton"}
                                            style={{ width: "50%" }}
                                            onPress={() => this.onAlertAccept()}
                                        >
                                            <Text style={Styles.bottomBtn}>ACCEPT</Text>
                                        </TouchableOpacity>
                                    </View>
                                </SafeAreaView>
                            </Modal>
                            <Modal
                                visible={this.state.isAcknowledgeModalVisible}
                                transparent={true}
                            >
                                <View style={Styles.acknowledgeContainer}>
                                    <View style={Styles.acknowledgeBody}>
                                        <Text style={Styles.dispatchedText}>Dispatched</Text>
                                        <View style={Styles.descriptionBody}>
                                            <ScrollView>
                                                <Text style={Styles.acknowledgeDescription}>{this.state.incidentMessage}</Text>
                                            </ScrollView>
                                        </View>
                                        <View style={Styles.lineSeprator}/>
                                        <TouchableOpacity
                                            testID="acknowledgeButton"
                                            onPress={()=>this.onAcknowledge()}
                                        >
                                          <Text style={Styles.acknoledgeText}>Acknowledge</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>
                            <Modal visible={this.state.loader} transparent={true}>
                                <View style={Styles.indicatorView}>
                                    <View
                                        style={Styles.indicator} >
                                        <ActivityIndicator
                                            animating={true}
                                            size={"large"}
                                            color="#f07233"
                                        />
                                    </View>
                                </View>
                            </Modal>
                        </ScrollView>
                    </SafeAreaView>
                </ImageBackground>
            </ImageBackground>
        );
    }
}
// Customizable Area End