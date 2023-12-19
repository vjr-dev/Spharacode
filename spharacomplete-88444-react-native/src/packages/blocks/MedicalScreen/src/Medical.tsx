// Customizable Area Start
//@ts-ignore
//@ts-nocheck
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  ImageBackground,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
} from "react-native";
import MedicalController, { Props, configJSON } from "./MedicalController";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { back1, back2, upload, camera } from "./assets";
import { COLORS } from "../../scheduling/src/Helpers";
import {
  scaledSize,
  deviceHeight,
  deviceWidth,
} from "../../../framework/src/Utilities";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default class Medical extends MedicalController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.child}>
          <ImageBackground source={back1} style={styles.child}>
            <ImageBackground source={back2} style={styles.child}>
              <View style={styles.headerContainer}>
                <TouchableOpacity
                  testID="btn_goBack"
                  style={{ marginLeft: 10 }}
                  onPress={() => this.handleBackButtonClick()}
                >
                  <MaterialIcon
                    name="chevron-left"
                    color={"#f07233"}
                    size={33}
                  />
                </TouchableOpacity> 
                {this.props.route.params?.from ===
                "PermissionScreen" ? (
                  <TouchableOpacity
                    testID="btn_skip"
                    style={styles.skipView}
                    onPress={() => this.onskip()}
                  >
                    <Text style={styles.txtSkip}>{configJSON.Skip}</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.txtHeaderView}>
                  <Text style={styles.txtMedical}>
                    {configJSON.MedicalCondition}
                  </Text>
                  <Text style={styles.txtListCondition}>
                    {configJSON.ListAnyCondition}
                  </Text>
                </View>

                <View style={styles.txtInputView}>
                  <TextInput
                    testID="txt_medicalCondition"
                    value={this.state.MedicalCondition}
                    onChangeText={(TT) =>
                      this.setState({ MedicalCondition: TT })
                    }
                    multiline={true}
                    placeholderTextColor={COLORS.darkGray}
                    style={styles.txtInput}
                    placeholder="enter medical condition,if any?"
                  />
                </View>
                <TouchableOpacity
                  testID="btn_select_image"
                  onPress={() => void this.selectImageFromGallery()}
                  style={styles.storageView}
                >
                  <View style={{ justifyContent: "center" }}>
                    <Image source={upload} style={styles.uploadImage} />
                  </View>
                  <View style={styles.uploadContainer}>
                    <Text style={styles.uploadInsuranceText}>
                      {this.state.isImageFromGallery
                        ? configJSON.ReUploadInsurance
                        : configJSON.UploadInsurance}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  testID="btn_capture_image"
                  onPress={() => void this.takePicture()}
                  style={styles.cameraClickL}
                >
                  <View style={{ justifyContent: "center" }}>
                    <Image source={camera} style={styles.cameraImage} />
                  </View>
                  <View style={styles.takePhotoViews}>
                    <Text style={styles.takePhotoText}>
                      {this.state.isImageFromCamera
                        ? configJSON.ReTakePhoto
                        : configJSON.TakePhoto}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  testID="btn_save"
                  onPress={() => this.onclick()}
                  style={styles.saveButton}
                >
                  <Text style={styles.saveText}>{configJSON.Save}</Text>
                </TouchableOpacity>
              </ScrollView>
              {this.state.Loader && (
                <Modal visible={this.state.Loader} transparent={true}>
                  <View style={styles.modalView}>
                    <View style={styles.ActivityIndicatorView}>
                      <ActivityIndicator
                        animating={true}
                        size={"large"}
                        color="#f07233"
                      />
                    </View>
                  </View>
                </Modal>
              )}
            </ImageBackground>
          </ImageBackground>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#454545" },
  child: { width: windowWidth, height: windowHeight, flex: 1 },
  images: {
    height: scaledSize(150),
    width: scaledSize(150),
    alignSelf: "center",
    marginBottom: scaledSize(20),
  },
  headerContainer: {
    marginTop: scaledSize(15),
    width: deviceWidth,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  skipView: {
    marginRight: scaledSize(23),
    justifyContent: "center",
    alignItems: "center",
  },
  txtSkip: { color: "#f07233", fontSize: scaledSize(15) },
  txtMedical: { fontSize: scaledSize(25), color: "#fff" },
  txtListCondition: { fontSize: scaledSize(15), color: "#cdcdcd" },
  txtHeaderView: {
    width: deviceWidth - scaledSize(40),
    marginTop: scaledSize(50),
    alignSelf: "center",
  },
  txtInputView: {
    height: scaledSize(150),
    marginTop: scaledSize(25),
    alignSelf: "center",
    borderRadius: scaledSize(35),
    width: deviceWidth - scaledSize(40),
    backgroundColor: "rgba(81,81,81,0.48)",
  },
  txtInput: {
    color: "#cdcdcd",
    fontSize: scaledSize(18),
    marginLeft: scaledSize(15),
    marginTop: scaledSize(3),
    height: "100%",
    textAlignVertical: "top",
  },
  uploadImage: {
    height: scaledSize(20),
    width: scaledSize(20),
    left: scaledSize(25),
    tintColor: COLORS.infoGray,
  },
  uploadContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  storageView: {
    height: scaledSize(60),
    width: deviceWidth - scaledSize(40),
    alignSelf: "center",
    marginTop: scaledSize(20),
    borderWidth: scaledSize(1.5),
    borderRadius: scaledSize(50),
    borderColor: "#cdcdcd",
    flexDirection: "row",
  },
  cameraClickL: {
    height: scaledSize(60),
    width: deviceWidth - scaledSize(40),
    alignSelf: "center",
    marginTop: scaledSize(20),
    borderWidth: scaledSize(1.5),
    borderRadius: scaledSize(50),
    borderColor: "#cdcdcd",
    flexDirection: "row",
  },
  cameraImage: {
    height: scaledSize(20),
    left: scaledSize(25),
    width: scaledSize(20),
    tintColor: COLORS.infoGray,
  },
  uploadInsuranceText: { color: "#cdcdcd", fontSize: scaledSize(17) },
  takePhotoViews: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  takePhotoText: { color: "#cdcdcd", fontSize: scaledSize(17) },
  saveButton: {
    height: scaledSize(50),
    width: deviceWidth - scaledSize(40),
    backgroundColor: "#f07233",
    borderRadius: scaledSize(30),
    marginTop: scaledSize(100),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  saveText: { color: "#fff", fontWeight: "bold" },
  modalView: {
    height: deviceHeight,
    width: deviceWidth,
    alignItems: "center",
    justifyContent: "center",
  },
  ActivityIndicatorView: {
    height: scaledSize(100),
    width: deviceWidth - scaledSize(20),
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  cameraClick: {
    height: scaledSize(60),
    width: deviceWidth - scaledSize(40),
    alignSelf: "center",
    marginTop: scaledSize(20),
    borderWidth: scaledSize(1.5),
    borderRadius: scaledSize(50),
    borderColor: "#cdcdcd",
    flexDirection: "row",
  },
});
// Customizable Area End
