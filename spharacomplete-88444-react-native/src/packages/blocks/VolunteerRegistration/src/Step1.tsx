// Customizable Area Start
//@ts-nocheck
//@ts-ignore

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
  Modal,
  FlatList,
} from "react-native";

import { back1, back2, image_back, upload, camera } from "./assets";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import * as Progress from "react-native-progress";
import { COLORS } from "framework/src/Globals";
import { RFValue } from "react-native-responsive-fontsize";
import Step1Controller from "./Step1Controller";

export default class Step1 extends Step1Controller {
  constructor(props) {
    super(props);
}

  render() {
    return (
      <SafeAreaView style={styles.container1}>
        <View style={styles.child}>
          <ImageBackground source={back1} style={styles.image}>
            <ImageBackground source={back2} style={styles.image2}>
              <View
                style={{
                  height: 60,
                  width: windowWidth - 20,
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity
                 testID="goBackID"
                  style={{ marginLeft: 20, marginTop: 22 }}
                  onPress={() => this.goback()}
                >
                  <Image
                    source={image_back}
                    style={{ height: 15, width: 15, tintColor: "#f07233" }}
                  />
                </TouchableOpacity>
               
              </View>
              <ScrollView>
                
                <View style={{paddingHorizontal:12}}>
                  <Text style={{ fontSize: 20, color: COLORS.white, marginTop: 50, width: windowWidth - 20, }}>
                                Step 1-Upload Your ID</Text>
                            <Text style={{ fontSize: 15, color: COLORS.ultralightwhite, marginTop: 10, width: windowWidth - 20 }}>
                                Upload your valid ID, ID must contain your legal volunteer name and required information.</Text>
                                </View>
                <Modal
                  visible={this.state.modal}
                  // visible={false}
                  transparent={true}
                >
                  <View
                    style={{
                      width: windowWidth * 0.9,
                      backgroundColor: "#fff",
                      alignSelf: "center",
                      marginTop: windowHeight / 2.8,
                    }}
                  >
                    <Text
                      style={{
                        height: 100,
                        marginHorizontal: 20,
                        fontSize: 18,
                        alignSelf: "center",
                        marginVertical: 25,
                      }}
                    >
                      {this.state.imageUploadSuccessMsg}
                    </Text>
                    <View
                      style={{
                        height: 1,
                        width: "100%",
                        backgroundColor: "#808080",
                        marginTop: 1,
                      }}
                    />
                    <TouchableOpacity
                      testID="modelOpenId"
                      onPress={() => this.onclickModel()}
                      style={{
                        height: 50,
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text style={{ fontWeight: "600", fontSize: 18 }}>
                        CONTINUE
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Modal>

                <Modal 
                visible={false}
                transparent={true}>
                  <View
                    style={{
                      height: 200,
                      width: windowWidth - 20,
                      backgroundColor: "#3e3e3e",
                      alignSelf: "center",
                      marginTop: windowHeight / 2.8,
                      borderRadius: 20,
                    }}
                  >
                    <View
                      style={{
                        height: 40,
                        width: windowWidth - 20,
                        alignItems: "flex-end",
                        justifyContent: "center",
                        marginTop: 10,
                      }}
                    >
                      <TouchableOpacity
                       testID="model2ID"
                        onPress={() => this.setState({ modal2: false })}
                        style={{ height: 30, width: 30, marginRight: 10 }}
                      >
                        <Text style={{ color: "#cdcdcd", fontWeight: "bold" }}>
                          X
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <FlatList
                    testID="IDproofFlatlist"
                      data={this.state.id_proof}
                      renderItem={({ item, index }: any) => {
                        return (
                          <View
                            style={{
                              height: 40,
                              width: windowWidth - 20,
                              alignSelf: "center",
                              marginTop: 10,
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <TouchableOpacity
                              onPress={() => this.flatlist(item)}
                              style={{ justifyContent: "center" }}
                            >
                              <Text
                                style={{ color: "#cdcdcd", marginLeft: 20 }}
                              >
                                {item.name}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        );
                      }}
                    />
                  </View>
                </Modal>

                
                <TouchableOpacity
                testID="storageID"
                  onPress={() => this.selectImageFromGellary()}
                  style={{
                    height: 60,
                    width: windowWidth - 40,
                    marginTop: 65,
                    alignSelf: "center",
                    borderWidth: 1.5,
                    borderRadius: 50,
                    borderColor: "#cdcdcd",
                    flexDirection: "row",
                  }}
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

                  <View
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: "#cdcdcd", fontSize: 17 }}>
                      Upload ID proof
                    </Text>
                  </View>
                </TouchableOpacity>

                {this.state.Loader ? (
                  <View
                    style={{
                      height: 100,
                      width: windowWidth - 20,
                      alignSelf: "center",
                      flexDirection: "row",
                    }}
                  >
                    <View style={{ height: "100%", width: "30%" }}>
                      <Image
                        style={{ height: 75, width: 75, margin: 15 }}
                        source={{
                          uri: "data:image/jpeg;base64," + this.state.images,
                        }}
                      />
                    </View>

                    <Progress.Bar
                      style={{
                        height: 5,
                        width: "65%",
                        justifyContent: "center",
                        alignSelf: "center",
                      }}
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
                  testID="CameraID"
                    onPress={() => this.takePicture()}
                    style={{
                      height: 60,
                      width: windowWidth - 40,
                      alignSelf: "center",
                      marginTop: 20,
                      borderWidth: 1.5,
                      borderRadius: 50,
                      borderColor: "#cdcdcd",
                      flexDirection: "row",
                    }}
                  >
                    <View style={{ justifyContent: "center" }}>
                      <Image
                        source={camera}
                        style={{
                          height: 20,
                          left: 25,
                          width: 20,
                          tintColor: COLORS.infoGray,
                        }}
                      />
                    </View>
                    <View
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ color: "#cdcdcd", fontSize: 17 }}>
                        Take photo
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                testID="onClickID"
                onPress={() => this.onclick()}
                  style={{
                    height: 50,
                    width: "90%",
                    backgroundColor: "#f07233",
                    marginTop: RFValue(100),
                    borderRadius: 30,
                    alignItems: "center",
                    justifyContent: "center",
                    alignSelf: "center",
                  }}
                >
                  <Text style={{ color: "#fff", fontSize: 18 }}>UPLOAD</Text>
                </TouchableOpacity>
              </ScrollView>
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
    backgroundColor: "#ffffffff",
  },
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
});
// Customizable Area End
