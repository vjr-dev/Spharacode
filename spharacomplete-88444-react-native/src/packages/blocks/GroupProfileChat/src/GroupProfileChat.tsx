// Customizable Area Start
//@ts-nocheck
//@ts-ignore
import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "framework/src/Globals";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {
  back1,
  back2,
  call,
  image_back,
  Next,
  option,
  share,
  User,
  video,
} from "./assets";
import GroupProfileChatController from "./GroupProfileChatController";
import { Styles } from "./GroupProfileChatStyle";

const windowWidth = Dimensions.get("window").width;

export default class GroupProfileChat extends GroupProfileChatController {
  renderItem = ({ item }) => {
    return (
      <View style={{ marginLeft: 20 }}>
        {/* <Image source={item.img} style={styles.flatlist_img} /> */}
        <Image
          source={{ uri: item?.img }}
          style={{
            height: RFPercentage(8),
            width: RFPercentage(8),
            borderRadius: 50,
            borderColor: COLORS.white,
            borderWidth: 1,
          }}
        />
        <Text
          numberOfLines={1}
          style={{
            marginTop: RFValue(5),
            alignSelf: "center",
            color: COLORS.skipGray,
            width: RFValue(60),
            textAlign: "center",
          }}
        >
          {item?.name}
        </Text>
      </View>
    );
  };

  ListFooterComponent = () => {
    return (
      <View
        style={{
          justifyContent: "center",
          marginHorizontal: 20,
        }}
      >
        <TouchableOpacity
          testID="addNewGroupAdminsBtn"
          onPress={() => this.PluseClick1()}
          style={{
            borderColor: COLORS.infoGray,
            borderRadius: 50,
            borderWidth: 1,
            height: RFPercentage(8),
            width: RFPercentage(8),
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: RFValue(20), color: COLORS.infoGray }}>
            +
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            alignSelf: "flex-end",
            paddingBottom: 10,
            paddingTop: RFValue(3),
            color: COLORS.skipGray,
          }}
        >
          Add new
        </Text>
      </View>
    );
  };
  render() {
    return (
      <ImageBackground source={back1} style={Styles.container}>
        <ImageBackground source={back2} style={Styles.container}>
          <SafeAreaView style={{ alignItems: "center" }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ width: windowWidth, flexDirection: "row" }}>
                <TouchableOpacity
                  testID="backBtn"
                  onPress={() => this.props.navigation.navigate("Chat")}
                  style={{
                    padding: 20,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={image_back}
                    style={{ height: 20, width: 20, tintColor: COLORS.white }}
                  />
                </TouchableOpacity>
                <View style={{ justifyContent: "center" }}>
                  <Text
                    style={{
                      color: COLORS.white,
                      fontWeight: "700",
                      fontSize: 15,
                    }}
                  >
                    Group Name
                  </Text>
                </View>
                <TouchableOpacity style={{ width: "15%" }}></TouchableOpacity>
              </View>
              <View>
                <Image
                  source={User}
                  style={{
                    height: RFValue(60),
                    width: RFValue(60),
                    borderWidth: 1,
                    borderColor: "white",
                    borderRadius: 50,
                    marginVertical: 20,
                    alignSelf: "center",
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: windowWidth,
                  justifyContent: "space-between",
                  alignSelf: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    borderRadius: 19,
                    width: 38,
                    height: 38,
                    left: 100,
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: COLORS.backgroundGray,
                  }}
                >
                  <Image
                    source={video}
                    style={{
                      height: "60%",
                      width: "60%",
                      tintColor: COLORS.orangelight,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderRadius: 19,
                    width: 38,
                    height: 38,
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: COLORS.backgroundGray,
                  }}
                >
                  <Image
                    source={call}
                    style={{
                      height: "60%",
                      width: "60%",
                      tintColor: COLORS.orangelight,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  testID="optionBtn"
                  onPress={() => this.setState({ modal2Visible: true })}
                  style={{
                    borderRadius: 19,
                    width: 38,
                    right: 100,
                    height: 38,
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: COLORS.backgroundGray,
                  }}
                >
                  <Image
                    source={option}
                    style={{
                      height: "60%",
                      width: "60%",
                      tintColor: COLORS.orangelight,
                    }}
                  />
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  color: COLORS.ultralightwhite,
                  paddingTop: 40,
                  paddingBottom: 4,
                  paddingStart: 15,
                }}
              >
                Invite to group via link
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "#363636",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    color: COLORS.orangelight,
                    paddingStart: 15,
                    alignSelf: "center",
                  }}
                >
                  http://sphara.app/Devops-Group
                </Text>
                <TouchableOpacity
                  style={{
                    borderRadius: 19,
                    width: 38,
                    marginVertical: 10,
                    height: 38,
                    right: 15,
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: COLORS.backgroundGray,
                  }}
                >
                  <Image
                    source={share}
                    style={{
                      height: "60%",
                      width: "60%",
                      tintColor: COLORS.orangelight,
                    }}
                  />
                </TouchableOpacity>
              </View>

              <Text
                style={{
                  color: COLORS.ultralightwhite,
                  paddingTop: 20,
                  paddingBottom: 4,
                  paddingStart: 15,
                }}
              >
                About Group
              </Text>
              <Text
                style={{
                  color: COLORS.ultralightwhite,
                  backgroundColor: "#363636",
                  paddingTop: 20,
                  paddingBottom: 3,
                  paddingStart: 15,
                }}
              ></Text>
              <Text
                style={{
                  color: COLORS.ultralightwhite,
                  paddingTop: 27,
                  paddingBottom: 4,
                  paddingStart: 15,
                }}
              >
                Settings
              </Text>
              <View style={{ backgroundColor: "#363636", width: "100%" }}>
                <View
                  style={{
                    width: windowWidth,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginVertical: 15,
                  }}
                >
                  <Text
                    style={{ left: 15, fontSize: 17, color: COLORS.lightwhite }}
                  >
                    Mute Group
                  </Text>
                  <Switch
                    testID="switch1"
                    style={{
                      transform: [
                        { scaleX: Platform.OS === "android" ? 1 : 0.8 },
                        { scaleY: Platform.OS === "android" ? 1 : 0.8 },
                      ],
                      right: 10,
                    }}
                    trackColor={{
                      false: COLORS.black,
                      true: COLORS.darkorange,
                    }}
                    thumbColor={COLORS.white}
                    ios_backgroundColor="#000"
                    onValueChange={(Vala) => this.setState({ switch1: Vala })}
                    value={this.state.switch1}
                  />
                </View>
                <View
                  style={{
                    width: windowWidth,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginVertical: 5,
                  }}
                >
                  <Text
                    style={{ left: 15, fontSize: 17, color: COLORS.lightwhite }}
                  >
                    Aggregate Notification
                  </Text>
                  <Switch
                    testID="switch2"
                    style={{
                      transform: [
                        { scaleX: Platform.OS === "android" ? 1 : 0.8 },
                        { scaleY: Platform.OS === "android" ? 1 : 0.8 },
                      ],
                      right: 10,
                    }}
                    trackColor={{
                      false: COLORS.black,
                      true: COLORS.darkorange,
                    }}
                    thumbColor={COLORS.white}
                    ios_backgroundColor="#000"
                    onValueChange={(Vala) => this.setState({ switch2: Vala })}
                    value={this.state.switch2}
                  />
                </View>
                <View
                  style={{
                    width: windowWidth,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginVertical: 16,
                  }}
                >
                  <Text
                    style={{ left: 15, fontSize: 17, color: COLORS.lightwhite }}
                  >
                    Set Background
                  </Text>
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      right: 17,
                    }}
                  >
                    <Text style={{ fontSize: 17, color: COLORS.lightwhite }}>
                      Default
                    </Text>
                    <Image
                      source={Next}
                      style={{
                        height: 22,
                        width: 22,
                        alignSelf: "center",
                        marginLeft: 10,
                        tintColor: COLORS.lightwhite,
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    width: windowWidth,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginVertical: 16,
                  }}
                >
                  <Text
                    style={{ left: 15, fontSize: 17, color: COLORS.lightwhite }}
                  >
                    Media
                  </Text>
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      right: 17,
                    }}
                  >
                    <Text style={{ fontSize: 17, color: COLORS.lightwhite }}>
                      10 items{" "}
                    </Text>
                    <Image
                      source={Next}
                      style={{
                        height: 22,
                        width: 22,
                        alignSelf: "center",
                        marginLeft: 5,
                        tintColor: COLORS.lightwhite,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <Text
                style={{
                  color: COLORS.ultralightwhite,
                  paddingTop: 27,
                  paddingBottom: 4,
                  paddingStart: 15,
                }}
              >
                Group Admins
              </Text>
              <View style={{ backgroundColor: "#363636", width: "100%" }}>
                <FlatList
                  testID="gropuAdmins"
                  data={this.state.Arr_Emergancy}
                  style={{ marginTop: RFValue(10) }}
                  horizontal
                  scrollEnabled
                  // extraData={this.state.MainProfile[0]}
                  showsHorizontalScrollIndicator={false}
                  // ListFooterComponent={() => (
                  //     <View style={{
                  //         justifyContent: 'center',
                  //         marginHorizontal: 20,
                  //     }}>
                  //         <TouchableOpacity
                  //         testID="addNewGroupAdminsBtn"
                  //             onPress={() => this.PluseClick1()}
                  //             style={{
                  //                 borderColor: COLORS.infoGray,
                  //                 borderRadius: 50,
                  //                 borderWidth: 1,
                  //                 height: RFPercentage(8),
                  //                 width: RFPercentage(8),
                  //                 alignItems: 'center',
                  //                 justifyContent: 'center',
                  //             }}>
                  //             <Text style={{ fontSize: RFValue(20), color: COLORS.infoGray }}>+</Text>
                  //         </TouchableOpacity>
                  //         <Text style={{
                  //             alignSelf: 'flex-end',
                  //             paddingBottom:10,
                  //             paddingTop: RFValue(3),
                  //             color: COLORS.skipGray
                  //         }}>Add new</Text>
                  //     </View>
                  // )}
                  ListFooterComponent={this.ListFooterComponent()}
                  renderItem={({ item }: any) => this.renderItem(item)}
                  // renderItem={({ item }) =>
                  // {
                  //     return (
                  //         <View style={{marginLeft:20}}>
                  //             {/* <Image source={item.img} style={styles.flatlist_img} /> */}
                  //             <Image source={{uri:item.img}} style={{
                  //                 height: RFPercentage(8),
                  //                 width: RFPercentage(8),
                  //                 borderRadius: 50,
                  //                 borderColor: COLORS.white,
                  //                 borderWidth: 1,
                  //             }} />
                  //             <Text numberOfLines={1} style={{
                  //                 marginTop: RFValue(5),
                  //                 alignSelf: 'center',
                  //                 color: COLORS.skipGray,
                  //                 width: RFValue(60),
                  //                 textAlign: "center"
                  //             }}>{item.name}</Text>
                  //         </View>
                  //     )
                  // }}
                />
              </View>
              <Text
                style={{
                  color: COLORS.ultralightwhite,
                  paddingTop: 27,
                  paddingBottom: 4,
                  paddingStart: 15,
                }}
              >
                Group Participants
              </Text>
              <View style={{ backgroundColor: "#363636", width: "100%" }}>
                <FlatList
                  testID="groupParticipants"
                  data={this.state.Arr_Emergancy}
                  style={{ marginTop: RFValue(10) }}
                  horizontal
                  scrollEnabled
                  // extraData={this.state.MainProfile[0]}
                  showsHorizontalScrollIndicator={false}
                  // ListFooterComponent={() => (
                  //     <View style={{
                  //         justifyContent: 'center',
                  //         marginHorizontal: 20,
                  //     }}>
                  //         <TouchableOpacity
                  //         testID="addNewGroupParticipantsBtn"
                  //             onPress={() => this.PluseClick1()}
                  //             style={{
                  //                 borderColor: COLORS.infoGray,
                  //                 borderRadius: 50,
                  //                 borderWidth: 1,
                  //                 height: RFPercentage(8),
                  //                 width: RFPercentage(8),
                  //                 alignItems: 'center',
                  //                 justifyContent: 'center',
                  //             }}>
                  //             <Text style={{ fontSize: RFValue(20), color: COLORS.infoGray }}>+</Text>
                  //         </TouchableOpacity>
                  //         <Text style={{
                  //              alignSelf: 'flex-end',
                  //              paddingBottom:10,
                  //              paddingTop: RFValue(3),
                  //              color: COLORS.skipGray
                  //         }}>Add new</Text>
                  //     </View>
                  // )}
                  // renderItem={({ item }) =>
                  // {
                  //     return (
                  //         <View style={{ marginLeft:20}}>
                  //             {/* <Image source={item.img} style={styles.flatlist_img} /> */}
                  //             <Image source={{uri:item.img}} style={{
                  //                 height: RFPercentage(8),
                  //                 width: RFPercentage(8),
                  //                 borderRadius: 50,
                  //                 borderColor: COLORS.white,
                  //                 borderWidth: 1,
                  //             }} />
                  //             <Text numberOfLines={1} style={{
                  //                  marginTop: RFValue(5),
                  //                  alignSelf: 'center',
                  //                  color: COLORS.skipGray,
                  //                  width: RFValue(60),
                  //                  textAlign: "center"
                  //             }}>{item.name}</Text>
                  //         </View>
                  //     )
                  // }}
                  ListFooterComponent={this.ListFooterComponent()}
                  renderItem={({ item }: any) => this.renderItem(item)}
                />
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: "#363636",
                  width: "100%",
                  height: RFValue(50),
                  marginVertical: RFValue(30),
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: COLORS.orange,
                    paddingLeft: 15,
                    fontSize: 17,
                    fontWeight: "700",
                  }}
                >
                  Report
                </Text>
              </TouchableOpacity>
            </ScrollView>
            {this.state.modal2Visible ? (
              <View style={Styles.shadowView} />
            ) : null}
            {this.state.modal2Visible ? (
              <View style={{ flex: 1 }}>
                <View style={Styles.modalView}>
                  <View style={Styles.menuView}>
                    <TouchableOpacity>
                      <Text style={Styles.menuText}>Add to home screen</Text>
                    </TouchableOpacity>
                    <View style={Styles.seperator} />
                    <TouchableOpacity>
                      <Text style={Styles.menuText}>Edit group</Text>
                    </TouchableOpacity>
                    <View style={Styles.seperator} />
                    <View style={Styles.seperator} />
                    <TouchableOpacity>
                      <Text style={[Styles.menuText, { color: COLORS.red }]}>
                        Delete Contact
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    testID="cancleModalBtn"
                    onPress={() => this.setState({ modal2Visible: false })}
                    style={[Styles.cancelButton, { marginTop: 15 }]}
                  >
                    <Text
                      style={[
                        Styles.cancelText,
                        {
                          paddingVertical: Platform.OS === "android" ? 15 : 18,
                        },
                      ]}
                    >
                      CANCEL
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
          </SafeAreaView>
        </ImageBackground>
      </ImageBackground>
    );
  }
}
// Customizable Area End
