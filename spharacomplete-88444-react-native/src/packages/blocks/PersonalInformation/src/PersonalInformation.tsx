// Customizable Area Start
//@ts-ignore
//@ts-nocheck
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  Image,
  ImageBackground,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import PersonalInformationController, {
  Props,
  configJSON,
} from "./PersonalInformationController";
import { back1, back2, image_back, info, tick } from "./assets";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import ModalSelector from "react-native-modal-selector-searchable";
import DatePicker from "react-native-date-picker";
import moment from "moment";
import { COLORS } from "../../scheduling/src/Helpers";
import { scaledSize } from "framework/src/Utilities";

export default class Thankyou extends PersonalInformationController {
  Statee: any;
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={styles.container1}>
        <View style={styles.child}>
          <ImageBackground source={back1} style={styles.image}>
            <ImageBackground source={back2} style={styles.image2}>
              <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : null}
                keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
              >
                <ScrollView
                  keyboardDismissMode={"on-drag"}
                  keyboardShouldPersistTaps='handled'
                  contentContainerStyle={{flexGrow: 1}}
                >
                  <TouchableOpacity
                    testID="btn_goBack"
                    style={styles.backButton}
                    onPress={() => this.handleBackButtonClick()}
                  >
                    <Image source={image_back} style={styles.backIcon} />
                  </TouchableOpacity>
                  <Modal
                    transparent={true}
                    visible={this.state.modal}
                    animationType={"slide"}
                  >
                    <View style={styles.modalContainer}>
                      <View style={styles.infoContainer}>
                        <Image source={info} style={styles.iconInfo} />
                      </View>
                      <Text style={styles.txtInfo}>
                        {configJSON.InfoDescription}
                      </Text>
                      <Text style={styles.txtInfoNote}>
                        {configJSON.InfoNote}
                      </Text>
                      <View style={styles.dividerView} />
                      <TouchableOpacity
                        testID="btn_continue"
                        onPress={() => this.onclickModel()}
                        style={styles.continueView}
                      >
                        <Text style={styles.txtContinue}>
                          {configJSON.Continue}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </Modal>
                  <Modal visible={this.state.Tmodal} transparent={true}>
                    <View style={styles.congratulationModalContainer}>
                    <View style={styles.congModalContainer}>
                      <View style={styles.tickView}>
                        <Image source={tick} style={styles.tickIcon} />
                      </View>
                      <Text style={styles.congratulationText}>
                        congratulations {this.state.Name}!
                      </Text>
                      <Text style={styles.uniqueIDText}>
                        Your Personal details has been received and your Unique
                        ID is
                      </Text>
                      <Text style={styles.userIdText}>{this.state.userId}</Text>
                      <TouchableOpacity
                        testID="btn_continue_unique"
                        onPress={() => this.onclickModel2()}
                        style={styles.continueBtnView}
                      >
                        <Text style={styles.continueText}>CONTINUE</Text>
                      </TouchableOpacity>
                    </View>
                    </View>
                  </Modal>
                  <View
                    style={{ width: windowWidth - 35, alignSelf: "center" }}
                  >
                    <Text style={styles.pInformationText}>
                      Personal Information
                    </Text>
                    <Text style={styles.fillUpText}>
                      Please fill up all fields.
                    </Text>
                  </View>

                  <View style={{ alignItems: "center", width: windowWidth }}>
                    <View style={styles.firstNameView}>
                      <TextInput
                        testID="txt_Fname"
                        value={this.state.Name}
                        onChangeText={(TT) => this.setState({ Name: TT })}
                        placeholder="First Name"
                        placeholderTextColor={COLORS.infoGray}
                        style={styles.textInputStyle}
                      />
                    </View>
                    <View style={styles.lastNameView}>
                      <TextInput
                        testID="txt_Lname"
                        value={this.state.LastName}
                        onChangeText={(TT) => this.setState({ LastName: TT })}
                        placeholder="Last Name"
                        placeholderTextColor={COLORS.infoGray}
                        style={styles.textInputStyle}
                      />
                    </View>
                    <View style={styles.nickNameView}>
                      <TextInput
                        testID="txt_Nname"
                        value={this.state.Nickname}
                        onChangeText={(TT) => this.setState({ Nickname: TT })}
                        placeholder="Nick Name"
                        placeholderTextColor={COLORS.infoGray}
                        style={styles.textInputStyle}
                      />
                    </View>
                    <View style={styles.emailView}>
                      <TextInput
                        testID="txt_email"
                        value={this.state.Email}
                        onChangeText={(TT) => this.setState({ Email: TT })}
                        placeholder="Email ID"
                        placeholderTextColor={COLORS.infoGray}
                        style={styles.textInputStyle}
                        keyboardType="email-address"
                      />
                    </View>
                    <View style={styles.birthDateView}>
                      <TouchableOpacity
                        testID="btn_bdate"
                        onPress={() => {
                          Keyboard.dismiss()
                          setTimeout(() => {
                            this.setState({ Bmonth: true })
                          }, 100);
                         }
                        }
                        style={styles.birthFormatView}
                      >
                        {this.state.Byear === null ? (
                          <Text style={styles.birthText}>Birth Date</Text>
                        ) : (
                          <Text style={styles.birthText}>
                            {moment(this.state.Byear).format("DD/MM/YYYY")}
                          </Text>
                        )}
                      </TouchableOpacity>
                    </View>
                    <View style={styles.modalView}>
                      <ModalSelector
                        testID="txt_country"
                        data={this.state.countryList}
                        optionContainerStyle={styles.optionContainerStyle}
                        optionStyle={{ borderBottomColor: COLORS.black10 }}
                        searchText="Search"
                        cancelStyle={{ backgroundColor: "#f07233" }}
                        cancelTextStyle={styles.cancelTextStyle}
                        overlayStyle={{ backgroundColor: "rgba(81,81,81,255)" }}
                        searchStyle={styles.searchStyle}
                        searchTextStyle={styles.searchTextStyle}
                        optionTextStyle={{ color: COLORS.infoGray }}
                        ref={(selector) => {
                          this.selector = selector;
                        }}
                        customSelector={
                          <TouchableOpacity
                            testID="btn_openCountry"
                            onPress={() => {
                              Keyboard.dismiss();
                              this.selector.open()}
                            }
                            style={styles.customSelector}
                          >
                            {this.state.Country == "" ? (
                              <Text style={styles.countryText}>Country</Text>
                            ) : (
                              <Text style={styles.countryText}>
                                {this.state.Country}
                              </Text>
                            )}
                            <MaterialIcon
                              style={{ paddingRight: 10 }}
                              name="keyboard-arrow-down"
                              color={COLORS.infoGray}
                              size={25}
                            />
                          </TouchableOpacity>
                        }
                        initValue={
                          this.state.Country === ""
                            ? "Country"
                            : this.state.Country
                        }
                        keyExtractor={(item) => item.attributes.name}
                        labelExtractor={(item) => item.attributes.name}
                        onChange={(option) => {
                          this.setState({
                            Country: option.attributes.name,
                            countryID: option.id,
                            countryCode: option.attributes.country_code,
                            isCountrySelected: true,
                          });
                          setTimeout(() => {
                            this.GetStateslist();
                          }, 500);
                          if (this.state.stateName.length > 0) {
                            this.setState({ stateName: "" });
                          }
                        }}
                      ></ModalSelector>
                    </View>

                    <View style={styles.stateListContainer}>
                      <ModalSelector
                        testID="txt_state"
                        data={Object.entries(this.state.stateList)}
                        ref={(selectorStateValue) => {
                          this.selectorStateValue = selectorStateValue;
                        }}
                        optionContainerStyle={styles.optionContainerStyle}
                        optionStyle={{ borderBottomColor: COLORS.black10 }}
                        searchText="Search"
                        cancelStyle={{ backgroundColor: "#f07233" }}
                        cancelTextStyle={styles.cancelTextStyle}
                        overlayStyle={{ backgroundColor: "rgba(81,81,81,255)" }}
                        searchStyle={styles.searchStyle}
                        searchTextStyle={styles.searchTextStyle}
                        optionTextStyle={{ color: COLORS.infoGray }}
                        customSelector={
                          <TouchableOpacity
                            testID="btn_openState"
                            onPress={() => {
                              Keyboard.dismiss();
                              this.selectorStateValue.open()}
                            }
                            style={styles.stateView}
                          >
                            {this.state.stateName === "" ? (
                              <Text style={styles.countryText}>State</Text>
                            ) : (
                              <Text style={styles.countryText}>
                                {this.state.stateName}
                              </Text>
                            )}
                            <MaterialIcon
                              style={{ paddingRight: 10 }}
                              name="keyboard-arrow-down"
                              color={COLORS.infoGray}
                              size={25}
                            />
                          </TouchableOpacity>
                        }
                        initValue={
                          this.state.stateName === ""
                            ? "State"
                            : this.state.stateName
                        }
                        keyExtractor={(item) => item[0]}
                        labelExtractor={(item) => item[1]}
                        onChange={(option) => {
                          this.setState({
                            stateName: option[1],
                            stateID: option[0],
                          });
                          setTimeout(() => {
                            this.GetCitylist();
                          }, 500);

                          if (this.state.cityName.length > 0) {
                            this.setState({ cityName: "" });
                          }
                        }}
                      ></ModalSelector>
                    </View>

                    <View style={styles.cityListContainer}>
                      <ModalSelector
                        testID="txt_city"
                        data={this.state.cityList}
                        ref={(selectorCityValue) => {
                          this.selectorCityValue = selectorCityValue;
                        }}
                        optionContainerStyle={styles.optionContainerStyle}
                        optionStyle={{ borderBottomColor: COLORS.black10 }}
                        searchText="Search"
                        cancelStyle={{ backgroundColor: "#f07233" }}
                        cancelTextStyle={styles.cancelTextStyle}
                        overlayStyle={{ backgroundColor: "rgba(81,81,81,255)" }}
                        searchStyle={styles.searchStyle}
                        searchTextStyle={styles.searchTextStyle}
                        optionTextStyle={{ color: COLORS.infoGray }}
                        customSelector={
                          <TouchableOpacity
                            testID="btn_openCity"
                            onPress={() => {
                              Keyboard.dismiss();
                              this.selectorCityValue.open()}
                            }
                            style={styles.cityContainerView}
                          >
                            {this.state.cityName === "" ? (
                              <Text style={styles.countryText}>City</Text>
                            ) : (
                              <Text style={styles.countryText}>
                                {this.state.cityName}
                              </Text>
                            )}
                            <MaterialIcon
                              style={{ paddingRight: 10 }}
                              name="keyboard-arrow-down"
                              color={COLORS.infoGray}
                              size={25}
                            />
                          </TouchableOpacity>
                        }
                        initValue={
                          this.state.cityName === ""
                            ? "City"
                            : this.state.cityName
                        }
                        keyExtractor={(item) => item}
                        labelExtractor={(item) => item}
                        onChange={(option) => {
                          this.setState({ cityName: option });
                        }}
                      ></ModalSelector>
                    </View>
                      <TextInput
                        testID="txt_address"
                        value={this.state.Address}
                        onChangeText={(TT) => this.setState({ Address: TT })}
                        placeholder="Residential Address"
                        placeholderTextColor={COLORS.infoGray}
                        style={{...styles.textInputStyle, ...styles.residentialAddressView, paddingLeft:10, marginLeft:0}}
                      />
                      <TextInput
                        testID="txt_zipCode"
                        value={this.state.ZipCode}
                        onChangeText={(TT) => this.setState({ ZipCode: TT })}
                        placeholder="Zip Code"
                        placeholderTextColor={COLORS.infoGray}
                        style={{...styles.textInputStyle, ...styles.zipCodeView, paddingLeft:10, marginLeft:0}}
                        keyboardType="number-pad"
                      />
                    <DatePicker
                      testID="date-picker"
                      modal
                      mode={"date"}
                      maximumDate={
                        new Date(
                          moment()
                            .subtract(15, "years")
                            .format()
                        )
                      }
                      minimumDate={
                        new Date(
                          moment()
                            .subtract(50, "years")
                            .format()
                        )
                      }
                      title={"Birth date"}
                      open={this.state.Bmonth}
                      date={
                        new Date(
                          moment()
                            .subtract(15, "years")
                            .format()
                        )
                      }
                      onConfirm={(date) => {
                        Keyboard.dismiss();
                        this.setState({ Byear: date, Bmonth: false });
                      }}
                      onCancel={() => {
                        Keyboard.dismiss();
                        this.setState({ Bmonth: false });
                      }}
                    />
                    <TouchableOpacity
                      testID="btn_save"
                      onPress={() => this.onclick()}
                      style={styles.saveButton}
                    >
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: 18,
                          fontWeight: "bold",
                        }}
                      >
                        SAVE
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Modal visible={this.state.Loader} transparent={true}>
                    <View style={styles.loaderView}>
                      <View style={styles.indicatorView}>
                        <ActivityIndicator
                          animating={true}
                          size={"large"}
                          color="#f07233"
                        />
                      </View>
                    </View>
                  </Modal>
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
    backgroundColor: "#ffffffff",
  },
  image: {
    height: windowHeight,
    width: windowWidth,
  },
  image2: {
    height: windowHeight,
    width: windowWidth,
    alignItems: "center",
  },
  container1: { flex: 1, backgroundColor: "#454545" },
  child: { width: windowWidth },
  images: { height: 150, width: 150, alignSelf: "center", marginBottom: 20 },
  iconBack: { height: 15, width: 15, tintColor: "#f07233" },
  backButton:{
    height: scaledSize(15), 
    width: scaledSize(15), 
    marginVertical: scaledSize(20),
    marginLeft: scaledSize(10),
    justifyContent:'center',
    alignItems:'center'
  },
  backIcon:{
      height: scaledSize(15), 
      width: scaledSize(15), 
      tintColor: "#f07233"
  },
  modalContainer: {
    width: windowWidth - 35,
    backgroundColor: "#fff",
    alignSelf: "center",
    marginTop: 50,
  },

  infoContainer: { height: 50, alignItems: "center", justifyContent: "center" },
  iconInfo: { height: 30, width: 30, tintColor: "#f07233" },
  txtInfo: { margin: 10, fontSize: 15 },
  txtInfoNote: { marginHorizontal: 10, fontSize: 15 },
  dividerView: {
    height: 1,
    width: "100%",
    backgroundColor: "#808080",
    marginTop: 20,
  },
  continueView: {
    height: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  txtContinue: { fontWeight: "600", fontSize: 18 },
  tickIcon: { height: 30, width: 30, tintColor: "#f07233" },
  congratulationModalContainer:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'rgba(0,0,0,0.5)'
  },
  congModalContainer: {
    width: windowWidth - 40,
    backgroundColor: "#fff",
    marginBottom: scaledSize(100),
    borderRadius: 15,
  },
  tickView: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  congratulationText: {
    margin: 10,
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
  },
  uniqueIDText: {
    marginHorizontal: 10,
    fontSize: 15,
    alignSelf: "center",
    marginTop: 10,
    textAlign: "center",
  },
  userIdText: {
    marginHorizontal: 10,
    fontSize: 18,
    alignSelf: "center",
    fontWeight: "bold",
    color: "#f07233",
    marginVertical: scaledSize(15),
  },
  continueBtnView: {
    height: scaledSize(50),
    marginTop: scaledSize(10),
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 0.7,
    borderColor: COLORS.darkGray
  },
  continueText: { fontWeight: "600", fontSize: 18 },
  pInformationText: {
    fontSize: 25,
    color: "#fff",
    paddingTop: 10,
    width: windowWidth,
    fontWeight: "bold",
  },
  fillUpText: { fontSize: 18, color: "#fff", width: windowWidth },
  firstNameView: {
    height: 60,
    width: windowWidth - 35,
    marginTop: 20,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "rgba(83,83,83,0.48)",
    borderRadius: 50,
  },
  textInputStyle: { color: COLORS.infoGray, fontSize: 18, marginLeft: 10 },
  lastNameView: {
    height: 60,
    width: windowWidth - 35,
    marginTop: 20,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "rgba(83,83,83,0.48)",
    borderRadius: 50,
  },
  nickNameView: {
    height: 60,
    width: windowWidth - 35,
    marginTop: 16,
    justifyContent: "center",
    backgroundColor: "rgba(83,83,83,0.48)",
    borderRadius: 50,
  },
  emailView: {
    height: 60,
    width: windowWidth - 35,
    marginTop: 16,
    justifyContent: "center",
    backgroundColor: "rgba(83,83,83,0.48)",
    borderRadius: 50,
  },
  birthDateView: {
    height: 60,
    width: windowWidth - 35,
    marginTop: 16,
    justifyContent: "center",
    backgroundColor: "rgba(83,83,83,0.48)",
    borderRadius: 50,
  },
  birthFormatView: {
    height: "100%",
    width: "100%",
    borderRadius: 50,
    justifyContent: "center",
    marginLeft: 15,
  },
  birthText: { color: COLORS.infoGray, fontSize: 18 },
  modalView: {
    height: 60,
    width: windowWidth - 35,
    marginTop: 16,
    justifyContent: "center",
    backgroundColor: "rgba(83,83,83,0.48)",
    borderRadius: 50,
  },
  countryText: { color: COLORS.infoGray, paddingLeft: 10, fontSize: 18 },
  stateListContainer: {
    height: 60,
    width: windowWidth - 35,
    marginTop: 16,
    justifyContent: "center",
    backgroundColor: "rgba(83,83,83,0.48)",
    borderRadius: 50,
  },
  stateView: {
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderRadius: 50,
  },
  cityListContainer: {
    height: 60,
    width: windowWidth - 35,
    marginTop: 16,
    justifyContent: "center",
    backgroundColor: "rgba(83,83,83,0.48)",
    borderRadius: 50,
  },
  cityContainerView: {
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderRadius: 50,
  },
  residentialAddressView: {
    height: 60,
    width: windowWidth - 35,
    marginTop: 16,
    justifyContent: "center",
    backgroundColor: "rgba(83,83,83,0.48)",
    borderRadius: 50,
  },
  zipCodeView: {
    height: 60,
    width: windowWidth - 35,
    marginTop: 16,
    justifyContent: "center",
    backgroundColor: "rgba(83,83,83,0.48)",
    borderRadius: 50,
  },
  saveButton: {
    height: 60,
    width: "90%",
    backgroundColor: "#f07233",
    marginTop: 20,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 150,
  },
  loaderView: {
    height: windowHeight,
    width: windowWidth,
    alignItems: "center",
    justifyContent: "center",
  },
  indicatorView: {
    height: 100,
    width: windowWidth - 20,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  optionContainerStyle: {
    backgroundColor: "#3e3e3e",
    marginTop: Platform.OS === "ios" ? 45 : 5,
  },
  cancelTextStyle: {
    color: COLORS.white,
    fontSize: 18,
    textTransform: "uppercase",
  },
  searchStyle: {
    borderColor: COLORS.orange,
    height: 40,
    backgroundColor: "white",
  },
  searchTextStyle: {
    backgroundColor: COLORS.white,
    fontSize: 15,
    textTransform: "capitalize",
  },
  customSelector: {
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderRadius: 50,
  },
});
// Customizable Area End
