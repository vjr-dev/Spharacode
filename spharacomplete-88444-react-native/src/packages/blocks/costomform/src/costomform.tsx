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
  KeyboardAvoidingView,
  Modal,
  ActivityIndicator,
  FlatList,
} from "react-native";
import MakeDonationController, {
  Props,
  configJSON,
} from "./costomformController";
import { back1, back2, image_back, camera } from "./assets";
import { RFPercentage } from "react-native-responsive-fontsize";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { COLORS } from "../../../framework/src/Globals";

export default class AmbulanceNotificationDonation extends MakeDonationController {
  constructor(props: Props) {
    super(props);
  }

  renderItem = (item: any) => (
    <TouchableOpacity
      testID={'btn_item_selection'}
      onPress={() => this.setState({ Selected: item.id })}
      style={[styles.itemName, styles.itemBack(this.state.Selected == item.id)]}
    >
      <Text
        style={styles.itemNameColor(this.state.Selected == item.id)}
      >
        {item?.attributes?.name}
      </Text>
    </TouchableOpacity>
  );

  render() {
    return (
      <SafeAreaView style={styles.container1}>
        <View style={styles.child}>
          <ImageBackground source={back1} style={styles.image}>
            <ImageBackground source={back2} style={styles.image2}>
              <KeyboardAvoidingView
                keyboardVerticalOffset={1}
                behavior={"height"}
              >
                <ScrollView>
                  <View
                    style={styles.viewContainer}
                  >
                    <TouchableOpacity
                      testID={"btn_goBack"}
                      style={styles.backView}
                      onPress={() => this.onGoBack()}
                    >
                      <Image
                        source={image_back}
                        style={styles.backIcon}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.view1}>
                    <Text style={styles.txtIncidentReport}>
                      {configJSON.incident_report}
                    </Text>
                    <Text
                      style={styles.txtInformation}
                    >
                      {configJSON.information_text}
                    </Text>
                    <Text
                      style={styles.txtIncident}
                    >
                      {configJSON.incident}
                    </Text>
                  </View>

                  <View style={styles.view4}>
                    <Text style={styles.whitecolor}>
                      {configJSON.whatWeapon}
                    </Text>
                  </View>
                  <Modal visible={this.state.Loader} transparent={true}>
                    <View
                      style={styles.modalContainer}
                    >
                      <View
                        style={styles.loaderContainer}
                      >
                        <ActivityIndicator
                          animating={true}
                          size={"large"}
                          color="#f07233"
                        />
                      </View>
                    </View>
                  </Modal>

                  <View
                    style={styles.listContainer}
                  >

                    <FlatList
                      data={this.state.Formdata}
                      contentContainerStyle={styles.contentContainerStyle} 
                      showsVerticalScrollIndicator={false}
                      renderItem={(item) => this.renderItem(item?.item)}
                      keyExtractor={(item) => item.id.toString()}
                      extraData={this.state} />
                    


                  </View>

                  <View
                    style={styles.txtDesc}
                  >
                    <Text style={{ color: COLORS.ultralightwhite }}>
                      {configJSON.describe_problem}
                    </Text>
                  </View>
                  <View
                    style={styles.commentContainer}
                  >
                    <TextInput
                      testID="txt_comment"
                      value={this.state.Comment}
                      onChangeText={(TT) => this.setState({ Comment: TT })}
                      placeholder=""
                      multiline={true}
                      style={styles.textInputComment}
                    />
                  </View>

                  <View style={styles.view4}>
                    <Text style={styles.whitecolor}>{configJSON.take_pictures}</Text>
                  </View>

                  <View
                    style={styles.imageContainer}
                  >
                    <TouchableOpacity
                      testID="btn_imageClick1"
                      onPress={() => this.onImageClick(1)}
                      style={styles.iconimageClick}
                    >
                      {this.state.images1 === "" ? (
                        <Image
                          source={camera}
                          style={styles.imageViewNull}
                        />
                      ) : (
                        <Image
                          style={styles.imageView}
                          source={{
                            uri: "data:image/jpeg;base64," + this.state.images1,
                          }}
                        />
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      testID="btn_imageClick2"
                      onPress={() => this.onImageClick(2)}
                      style={styles.iconimageClick}
                    >
                      {this.state.images2 === "" ? (
                        <Image
                          source={camera}
                          style={styles.imageViewNull}
                        />
                      ) : (
                        <Image
                          style={styles.imageView}
                          source={{
                            uri: "data:image/jpeg;base64," + this.state.images2,
                          }}
                        />
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      testID="btn_imageClick3"
                      onPress={() => this.onImageClick(3)}
                      style={styles.iconimageClick}
                    >
                      {this.state.images3 === "" ? (
                        <Image
                          source={camera}
                          style={styles.imageViewNull}
                        />
                      ) : (
                        <Image
                          style={styles.imageView}
                          source={{
                            uri: "data:image/jpeg;base64," + this.state.images3,
                          }}
                        />
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      testID="btn_imageClick4"
                      onPress={() => this.onImageClick(4)}
                      style={styles.iconimageClick}
                    >
                      {this.state.images4 === "" ? (
                        <Image
                          source={camera}
                          style={styles.imageViewNull}
                        />
                      ) : (
                        <Image
                          style={styles.imageView}
                          source={{
                            uri: "data:image/jpeg;base64," + this.state.images4,
                          }}
                        />
                      )}
                    </TouchableOpacity>
                  </View>

                  <View style={{ flex: 1 }}>
                    <Modal visible={this.state.Loader} transparent={true}>
                      <View
                        style={styles.modalSendContainer}
                      >
                        <View
                          style={styles.subContainer}
                        >
                          <ActivityIndicator
                            animating={true}
                            size={"large"}
                            color="#f07233"
                          />
                        </View>
                      </View>
                    </Modal>
                    <TouchableOpacity
                      testID="btn_send"
                      onPress={() => this.uploadData()}
                      style={styles.btnSend}
                    >
                      <Text style={{ color: COLORS.white, fontWeight: "bold" }}>
                        {configJSON.send}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </KeyboardAvoidingView>
            </ImageBackground>
          </ImageBackground>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: windowHeight,
    width: windowWidth,
    backgroundColor: COLORS.white,
  },
  container1: { flex: 1, backgroundColor: COLORS.headerbackground },
  child: { width: windowWidth },

  image: {
    height: "100%",
    width: windowWidth,
  },
  image2: {
    height: "100%",
    width: windowWidth,
    alignItems: "center",
  },
  view1: {
    height: 30,
    width: windowWidth - 20,
    alignSelf: "center",
    marginVertical: 40,
    justifyContent: "center",
  },
  whitecolor: { color: COLORS.lightwhite },
  donatbtn: {
    height: 50,
    width: windowWidth - 20,
    alignSelf: "center",
    backgroundColor: COLORS.Viewback,
    borderRadius: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  donattext: { color: COLORS.ultralightwhite, marginLeft: 15 },
  arowimage: {
    height: 15,
    width: 15,
    tintColor: COLORS.ultralightwhite,
    marginRight: 18,
  },
  view2: {
    height: 200,
    width: windowWidth - 20,
    alignSelf: "center",
    backgroundColor: COLORS.Viewback,
    borderRadius: 20,
  },
  view3: { height: 50, width: "100%", justifyContent: "center" },
  text1: { color: COLORS.ultralightwhite, marginLeft: 20 },
  line: {
    height: 1,
    width: "90%",
    backgroundColor: COLORS.ultralightwhite,
    alignSelf: "center",
  },
  view4: {
    height: 30,
    width: windowWidth - 20,
    alignSelf: "center",
    marginTop: 20,
    justifyContent: "center",
  },
  view5: {
    height: 50,
    width: windowWidth - 20,
    alignSelf: "center",
    marginTop: 20,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  view6: {
    height: 50,
    width: windowWidth - 20,
    alignSelf: "center",
    backgroundColor: COLORS.Viewback,
    borderRadius: 50,
    justifyContent: "center",
    marginTop: 10,
  },
  view7: {
    height: 50,
    width: windowWidth - 20,
    alignSelf: "center",
    backgroundColor: COLORS.darkorange,
    borderRadius: 50,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  viewContainer: {
    height: 60,
    width: windowWidth,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  backView: { marginLeft: 20, marginTop: 22 },
  backIcon: { height: 15, width: 15, tintColor: "#f07233" },
  txtIncidentReport: { color: COLORS.white, fontSize: 20 },
  txtInformation: {
    color: COLORS.ultralightwhite,
    fontSize: 16,
    width: windowWidth - 20,
    marginTop: 5,
  },
  txtIncident: {
    color: COLORS.ultralightwhite,
    fontSize: 16,
    width: windowWidth - 20,
  }, modalContainer: {
    height: windowHeight,
    width: windowWidth,
    alignItems: "center",
    justifyContent: "center",
  }, loaderContainer: {
    height: 100,
    width: windowWidth - 20,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: windowWidth - 20,
    alignSelf: "center",
    paddingRight: 5,
  }, 
  contentContainerStyle:{
    flexDirection : "row", 
    flexWrap : "wrap"
  },
  txtDesc: {
    paddingHorizontal: RFPercentage(0.5),
    zIndex: 1,
    marginLeft: 30,
    top: 9,
    width: 130,
    paddingLeft: 10,
    backgroundColor: COLORS.headerbackground,
  },
  commentContainer: {
    height: 100,
    width: windowWidth - 20,
    borderWidth: 1,
    alignSelf: "center",
    alignItems:'flex-start',
    justifyContent:'flex-start',
    borderColor: COLORS.ultralightwhite,
    borderRadius: 5,
  }, textInputComment: {
    width: "100%",
    height: 100,
    textAlignVertical: "top",
    padding: 13,
    color: COLORS.ultralightwhite,
  }, imageContainer: {
    height: 50,
    marginTop: 10,
    width: windowWidth - 20,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  }, imageViewNull: {
    height: "100%",
    width: "100%"
  }, imageView: {
    height: "100%",
    width: "100%",
    borderRadius: 10,
  }, modalSendContainer: {
    height: windowHeight,
    width: windowWidth,
    alignItems: "center",
    justifyContent: "center",
  }, subContainer: {
    height: 100,
    width: windowWidth - 20,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  }, btnSend: {
    height: 50,
    width: windowWidth - 20,
    alignSelf: "center",
    backgroundColor: COLORS.darkorange,
    borderRadius: 50,
    marginVertical: 25,
    alignItems: "center",
    justifyContent: "center",
  }, iconimageClick: { height: 50, width: 50 },
  itemName: {
    height: 50,
    paddingHorizontal: 20,
    marginLeft: 5, alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    marginTop: 10,
  }, itemBack: (isSelected) => ({
    backgroundColor:
      isSelected
        ? COLORS.orangelight
        : COLORS.Viewback,
  }),
  itemNameColor: (isSelected) => ({
    color:
      isSelected
        ? COLORS.black
        : COLORS.ultralightwhite,
  })
});
// Customizable Area End