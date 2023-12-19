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
  FlatList,
  ActivityIndicator,
} from "react-native";
import IdentificationController, {
  Props,
  configJSON,
} from "./IdentificationController";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { back1, back2, image_back, upload, camera, Rectangle } from "./assets";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import * as Progress from "react-native-progress";
import { COLORS } from "framework/src/Globals";
import { RFValue } from "react-native-responsive-fontsize";
import { scaledSize } from "framework/src/Utilities";

export default class Identification extends IdentificationController {
  constructor(props: Props) {
    super(props);
  }

  renderItem = (item: any) => (
    <View style={styles.renderItemView}>
      <TouchableOpacity
        testID="btn_itemClick"
        onPress={() => this.onItemClick(item)}
        style={{ justifyContent: "center" }}
      >
        <Text style={styles.itemLabelText}>{item.name}</Text>
      </TouchableOpacity>
    </View>
  );

  idNemberLength = () => {
    if (this.state.id_proof_id === 1) {
      return 12;
    } else if (this.state.id_proof_id === 2) {
      return 15;
    } else if (this.state.id_proof_id === 3) {
      return 10;
    } else if (this.state.id_proof_id === 4) {
      return 11;
    } else {
      return 20;
    }
  };

  render() {
    console.log(" this.state.userType", this.state.userType); 
    let isSkiable = this.state.userType == 1 ? false : this.props.route.params?.from !== "EditProfile"
    let forCivilians = this.state.isImageFromGallery ? configJSON.Re_Upload_Identification : configJSON.UploadIdProof
    let forFirstResponder = this.state.isImageFromGallery ? configJSON.reUploadCredentials : configJSON.uploadCredential

    return (
      <SafeAreaView style={styles.container1}>
        <View style={styles.child}>
          <ImageBackground source={back1} style={styles.image}>
            <ImageBackground source={back2} style={styles.image2}>
              <View style={styles.backView}>
              <TouchableOpacity
                    testID="btn_goBack"
                    style={styles.backIcon}
                    onPress={() => this.handleBackButtonClick()}
                  >
                    <Image source={image_back} style={styles.backIconSize} />
                  </TouchableOpacity>
                {isSkiable ? (
                  <TouchableOpacity
                    testID="btn_skip"
                    style={styles.skipView}
                    onPress={() => this.Skip()}
                  >
                    <Text style={styles.text_skip}>{configJSON.Skip}</Text>
                  </TouchableOpacity>
                ): null}
              </View>
              <ScrollView>
                <Text style={styles.text_upload}>
                  {this.state.userType == 1 ? `${configJSON.uploadCredentials}`:
                  `${configJSON.Upload_Identification}`
                  }
                </Text>

                <Modal visible={this.state.modal} transparent={true}>
                  <View style={styles.successModalContainer}>
                    <View style={styles.modalView}>
                      <Text style={styles.txt_successDesc}>
                        {configJSON.SuccessDec}
                      </Text>
                      <View style={styles.spaceView} />
                      <TouchableOpacity
                        testID="btn_continue"
                        onPress={() => this.onclickModel()}
                        style={styles.modalClickView}
                      >
                        <Text style={styles.txt_continue}>                                   
                          {configJSON.Continue}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>

                <Modal visible={false} 
                transparent={true}
                onRequestClose={() =>  this.showModal2(false)  }
                 >
                  <View style={styles.modalListContainer}>
                   <View style={[styles.closeView]}>
                      <TouchableOpacity
                        testID="btn_modalClose"
                        onPress={() => this.showModal2(false)}
                        style={styles.closeTextView}
                      >
                        <Text style={styles.text_close}>{configJSON.X}</Text>
                      </TouchableOpacity>
                    </View>
                    <FlatList
                      testID="list_IdProof"
                      data={this.state.id_proof}
                      renderItem={({ item }: any) => this.renderItem(item)}
                    />
                  </View>
                </Modal>
                 {!this.state.modal2 ? (
                  <>
                    <TouchableOpacity
                      testID="btn_openModal"
                      onPress={() => {
                        this.showModal2(true)
                      }}
                      style={styles.button2}
                    >
                      <Text testID={"reasonText"} style={styles.textName}>
                        {this.state.Id_prrof_name}
                      </Text>
                      <View style={styles.infoIconView}>
                        <MaterialIcon
                          name="keyboard-arrow-down"
                          color={COLORS.infoGray}
                          size={25}
                        />
                      </View>
                    </TouchableOpacity>
                  </>
                ) : (
                  <View style={styles.listContainer}>
                    <View>
                      <Text style={styles.textNameHeader}>
                        {this.state.Id_prrof_name}
                      </Text>
                    </View>
                    <FlatList
                      testID="list_IdProof"
                      data={this.state.id_proof}
                      keyExtractor={(item, index) => `id_${index}`}
                      showsVerticalScrollIndicator={false}
                      renderItem={({ item }: any) => {
                        return (
                          <TouchableOpacity
                            testID="reasonSelectButton"
                            onPress={() => this.onItemClick(item)}
                            style={[
                              styles.renderItemView,
                              { backgroundColor: this.state.Id_prrof_name === item.name ? COLORS.orangelight : "transparent" }
                            ]}
                          >
                            <View>
                              <Text
                                style={{ ...styles.itemName, color: this.state.Id_prrof_name === item.name ? "#000" : COLORS.lightwhite, }}>
                                {item.name}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        );
                      }}
                    />
                  </View>
                )}
               {
                this.state.userType != 1 && 
                <View style={styles.textInputContainer}>
                <TextInput
                    testID="txt_id_proof_number"
                    value={this.state.Id_prrof_Number}
                    onChangeText={(TT) =>
                      this.setState({ Id_prrof_Number: TT })
                    }
                    maxLength={this.idNemberLength()}
                    multiline={true}
                    keyboardType={this.state.id_proof_id === 1 ? "numeric":"default"}
                    placeholderTextColor={COLORS.infoGray}
                    style={styles.textInput}
                    placeholder="ID Number"
                  />
              </View>
               }
               
                <TouchableOpacity
                  testID="btn_uploadProof"
                  onPress={():void => this.selectImageFromGallery()}
                  style={styles.uploadProofContainer}
                >
                  <View style={{ justifyContent: "center" }}>
                    <Image
                      source={upload}
                      style={{
                        height: 20,
                        width: 20,
                        left: 25,
                        tintColor: COLORS.infoGray,
                      }}
                    />
                  </View>

                  <View style={styles.uploadProofView}>
                    <Text style={styles.txt_uploadProof}>
                      {this.state.userType == 1 ? forFirstResponder : forCivilians}
                    </Text>
                  </View>
                </TouchableOpacity>

                {this.state.Loader ? (
                  <View style={styles.loaderView}>
                    <View style={{ height: "100%", width: "30%" }}>
                      <Image
                        style={styles.imageView}
                        source={{
                          uri: "data:image/jpeg;base64," + this.state.images,
                        }}
                      />
                    </View>

                    <Progress.Bar
                      style={styles.processBarView}
                      progress={this.state.progressBar}
                      width={250}
                      height={5}
                      color="#f07233"
                      unfilledColor="#525252"
                      borderWidth={0}
                    />
                  </View>
                ) : (
                  <TouchableOpacity
                    testID="btn_TakePhoto"
                    onPress={():void => this.takePicture()}
                    style={styles.cameraView}
                  >
                    <View style={{ justifyContent: "center" }}>
                      <Image source={camera} style={styles.cameraIcon} />
                    </View>
                    <View style={styles.takePhotoView}>
                      <Text style={styles.txtTakePhoto}>
                        {this.state.isImageFromCamera
                          ? configJSON.ReTakePhoto
                          : configJSON.TakePhoto}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}

                {
                  this.state.Id_prrof_name == "Others" && 
                     <TextInput 
                        placeholder="Comment here."
                        value={this.state.comment}
                        placeholderTextColor={COLORS.infoGray}
                        onChangeText={(value) => this.setState({comment: value})}
                        style={styles.commentInput}
                      />
                }
               
                <TouchableOpacity
                  testID="btn_uploadData"
                  onPress={() => this.onUploadData()}
                  style={styles.uploadView}
                >
                  <Text style={styles.textUpload}>{configJSON.Upload}</Text>
                </TouchableOpacity>
              </ScrollView>
              <Modal visible={this.state.isLoadingLogout} transparent={true}>
              <View style={styles.loaderContainer}>
                <ActivityIndicator
                  animating={true}
                  color="#f07233"
                  hidesWhenStopped={true}
                  size="large"
                />
              </View>
            </Modal>
            </ImageBackground>
          </ImageBackground>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({

  image: {
    height: windowHeight,
    width: windowWidth,
    flex: 1,
  },
  image2: {
    height: windowHeight,
    width: windowWidth,
    flex: 1,
  },
  container1: { flex: 1, backgroundColor: "#454545" },
  child: { width: windowWidth, flex: 1 },
  images: { height: 150, width: 150, alignSelf: "center", marginBottom: 20 },
  backView: {
    height: 60,
    width: windowWidth - 20,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  backIcon: { marginLeft: 20, marginTop: 22 },
  backIconSize: { height: 15, width: 15, tintColor: "#f07233" },
  skipView: { marginLeft: 20, marginTop: 22, marginRight: 10 },
  text_skip: { color: "#f07233", fontSize: 15 },
  text_upload: {
    fontSize: 25,
    color: "#fff",
    marginTop: 25,
    marginLeft: 15,
  },
  successModalContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"rgba(0,0,0,0.5)"
  },
  modalView: {
    width: windowWidth * 0.8,
    backgroundColor: "#fff",
    marginBottom: scaledSize(50)
  },
  txt_successDesc: {
    marginHorizontal: 20,
    fontSize: 18,
    alignSelf: "center",
    marginVertical: 25,
  },
  spaceView: {
    height: 1,
    width: "100%",
    backgroundColor: "#808080",
    marginTop: 1,
  },
  modalClickView: {
    height: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  txt_continue: { fontWeight: "600", fontSize: 18 },
  modalListContainer: {
    height: 200,
    width: windowWidth - 20,
    backgroundColor: "#3e3e3e",
    alignSelf: "center",
    marginTop: windowHeight / 3.8,
    borderRadius: 20,
  },
  closeView: {
    height: 40,
    width: windowWidth - 20,
    alignItems: "flex-end",
    justifyContent: "center",
    marginTop: 10,
  },
  closeTextView: { height: 30, width: 30, marginRight: 10 },
  text_close: { color: "#cdcdcd", fontWeight: "bold" },
  renderItemView: {
    height: 40,
    width: windowWidth - 20,
    alignSelf: "center",
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  itemLabelText: { color: "#cdcdcd", marginLeft: 20 },
  infoIconView: {
    marginHorizontal: scaledSize(15)
  },
  uploadView: {
    height: 50,
    width: "90%",
    backgroundColor: "#f07233",
    marginTop: RFValue(100),
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  textUpload: { color: "#fff", fontSize: 18 },
  txtTakePhoto: { color: "#cdcdcd", fontSize: 17 },
  cameraIcon: {
    height: 20,
    left: 25,
    width: 20,
    tintColor: COLORS.infoGray,
  },
  takePhotoView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraView: {
    height: 60,
    width: windowWidth - 40,
    alignSelf: "center",
    marginTop: 20,
    borderWidth: 1.5,
    borderRadius: 50,
    borderColor: "#cdcdcd",
    flexDirection: "row",
  },
  processBarView: {
    height: 5,
    width: "65%",
    justifyContent: "center",
    alignSelf: "center",
  },
  imageView: { height: 75, width: 75, margin: 15 },
  loaderView: {
    height: 100,
    width: windowWidth - 20,
    alignSelf: "center",
    flexDirection: "row",
  },
  txt_uploadProof: { color: "#cdcdcd", fontSize: 17 },
  uploadProofView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadProofContainer: {
    height: 60,
    width: windowWidth - 40,
    marginTop: 65,
    alignSelf: "center",
    borderWidth: 1.5,
    borderRadius: 50,
    borderColor: "#cdcdcd",
    flexDirection: "row",
  },
  textInput: {
    width: windowWidth,
    color: COLORS.infoGray,
    fontSize: scaledSize(15),
    paddingLeft: scaledSize(15),
  },
  textInputContainer: {
    height: scaledSize(50),
    width: windowWidth - 35,
    marginTop: 14,
    alignSelf: "center",
    borderRadius: 50,
    backgroundColor: "#515151",
    justifyContent: "center",
  },
  loaderContainer:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  commentInput:{
    color: COLORS.infoGray,
    borderBottomColor:COLORS.infoGray,
    borderBottomWidth:1,
    width: "90%",
    alignSelf:'center',
    marginTop:scaledSize(30)
  },
  button2: {
    height: scaledSize(50),
    width: windowWidth - 35,
    alignSelf:'center',
    backgroundColor: COLORS.Viewback,
    marginTop: scaledSize(30),
    borderRadius: scaledSize(30),
    justifyContent: 'space-between',
    alignItems:'center',
    flexDirection:'row',
  },
  textName: {
    justifyContent: "center",
    color: COLORS.infoGray,
    fontSize: scaledSize(15),
    paddingHorizontal: 20,
  },
  listContainer: {
    width: windowWidth - 35,
    alignSelf:'center',
    backgroundColor: COLORS.Viewback,
    borderRadius: scaledSize(25),
    marginTop: scaledSize(30),
    paddingBottom: scaledSize(10)
  },
  textNameHeader: {
    height: scaledSize(50),
    width: "100%",
    justifyContent: "center",
    color: COLORS.ultralightwhite,
    paddingHorizontal: scaledSize(20),
    paddingTop: scaledSize(17),
  },
  renderItemView: {
    marginTop: scaledSize(0),
    paddingBottom: scaledSize(5),
    height: scaledSize(40),
    width: "90%",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  itemName: {
    marginLeft: scaledSize(10),
    fontSize: scaledSize(13),
  },
});
// Customizable Area End
