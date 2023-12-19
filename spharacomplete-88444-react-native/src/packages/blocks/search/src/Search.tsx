import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  View,
  Modal,
  TouchableWithoutFeedback,
  Platform
} from "react-native";
// Customizable Area End

// Customizable Area Start
// Customizable Area End

import SearchController, { Props } from "./SearchController";

export default class Search extends SearchController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    // Customizable Area Start
    return (
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        {/* Customizable Area Start */}
        <TouchableWithoutFeedback
          testID={"hideKeyboard"}
          onPress={() => {
            this.hideKeyboard();
          }}
        >
          <>
            <View
              style={
                this.state.isVisible ? styles.modalBox : { display: "none" }
              }
            >
              <Modal
                animationType={"fade"}
                transparent={false}
                visible={this.state.isVisible}
              >
                <View style={styles.modal}>
                  <ScrollView>
                    <Text style={styles.infoText}>
                      <Text style={styles.labelText}>Id:{"  "}</Text>
                      {this.state.activeId}
                    </Text>
                    <Text numberOfLines={2} style={styles.infoText}>
                      <Text style={styles.labelText}>First Name:{"  "}</Text>
                      {this.state.activeFirstName}
                    </Text>
                    <Text numberOfLines={2} style={styles.infoText}>
                      <Text style={styles.labelText}>Last Name:{"  "}</Text>
                      {this.state.activeLastName}
                    </Text>
                    <Text numberOfLines={2} style={styles.infoText}>
                      <Text style={styles.labelText}>User Name:{"  "}</Text>
                      {this.state.activeUserName}
                    </Text>
                    <Text numberOfLines={2} style={styles.infoText}>
                      <Text style={styles.labelText}>Email:{"  "}</Text>
                      {this.state.activeEmail}
                    </Text>
                    <Text numberOfLines={2} style={styles.infoText}>
                      <Text style={styles.labelText}>Phone Number:{"  "}</Text>
                      {this.state.activePhoneNumber}
                    </Text>
                    <Text numberOfLines={10} style={styles.infoText}>
                      <Text style={styles.labelText}>Country Code:{"  "}</Text>
                      {this.state.activeCountryCode}
                    </Text>
                    <Text numberOfLines={10} style={styles.infoText}>
                      <Text style={styles.labelText}>Type:{"  "}</Text>
                      {this.state.activeType}
                    </Text>
                    <Text numberOfLines={10} style={styles.infoText}>
                      <Text style={styles.labelText}>Device Id:{"  "}</Text>
                      {this.state.activeDeviceId}
                    </Text>
                    <Text style={styles.infoText}>
                      <Text style={styles.labelText}>Created At:{"  "}</Text>
                      {this.state.activeCreatedAt}
                    </Text>
                  </ScrollView>
                  <View style={styles.buttonBox}>
                    <TouchableOpacity
                      testID={"btnCloseModal"}
                      style={[styles.viewBtnWidth, styles.closeBtn]}
                      onPress={() => {
                        this.hideModal();
                      }}
                    >
                      <Text style={styles.closeBtnText}>Close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
            <View style={styles.buttonBox}>
              <TextInput
                testID={"inputSearchText"}
                style={styles.bgSearchTextInput} //UI Engine::From Sketch
                placeholder="Search Text" //UI Engine::From Sketch
                {...this.txtInputSearchTextProps}
              />
              <TouchableOpacity
                testID={"btnGetSearchList"}
                style={
                  this.state.isVisible ? { display: "none" } : styles.searchBtn
                }
                onPress={() => {
                  this.getSearchList(this.state.token);
                }}
              >
                <Text style={styles.searchtext}>Search</Text>
              </TouchableOpacity>
            </View>
            {!this.state.isVisible &&
              this.state.searchList.map((item: any, index: number) => {
                return (
                  <View key={index} style={styles.tableBox}>
                    <Text style={styles.infoText}>
                      <Text style={styles.labelText}>Id:{"  "}</Text>
                      {item.id}
                    </Text>
                    <Text style={styles.infoText}>
                      <Text style={styles.labelText}>First Name:{"  "}</Text>
                      {item.attributes.first_name}
                    </Text>
                    <Text style={styles.infoText}>
                      <Text style={styles.labelText}>Last Name:{"  "}</Text>
                      {item.attributes.last_name}
                    </Text>
                    <Text style={styles.infoText}>
                      <Text style={styles.labelText}>Email:{"  "}</Text>
                      {item.attributes.email}
                    </Text>
                    <Text style={styles.infoText}>
                      <Text style={styles.labelText}>Phone Number:{"  "}</Text>
                      {item.attributes.phone_number}
                    </Text>
                    <TouchableOpacity
                      testID={"btnViewModal"}
                      style={styles.viewBtn}
                      onPress={() => {
                        this.setModal(item);
                      }}
                    >
                      <Text style={styles.viewBtnText}>View</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
          </>
          {/* Customizable End Start */}
        </TouchableWithoutFeedback>
      </ScrollView>
      //Merge Engine End DefaultContainer
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: Platform.OS === "web" ? "75%" : "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff"
  },
  tableBox: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#ccc",
    padding: 15,
    marginVertical: 10,
    marginBottom: 30
  },
  infoText: {
    fontSize: 16,
    marginVertical: 4
  },
  labelText: {
    fontWeight: "bold"
  },
  viewBtn: {
    backgroundColor: "blue",
    paddingVertical: 8,
    borderRadius: 4,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "blue"
  },
  viewBtnText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16
  },
  buttonBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  bgSearchTextInput: {
    flexDirection: "row",
    fontSize: 16,
    textAlign: "left",
    backgroundColor: "#00000000",
    borderWidth: Platform.OS === "web" ? 0 : 1,
    borderBottomWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    includeFontPadding: true,
    padding: 10,
    flex: 1
  },
  searchBtn: {
    backgroundColor: "blue",
    marginLeft: 10,
    width: 120,
    height: 40,
    display: "flex",
    justifyContent: "center",
    borderRadius: 4,
    alignSelf: "flex-end"
  },
  searchtext: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center"
  },
  closeBtn: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    borderRadius: 4,
    marginTop: 10,
    borderColor: "#ccc",
    borderWidth: 1
  },
  modalBox: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    display: "flex",
    width: "100%",
    height: "100%",
    backgroundColor: "#fff"
  },
  modal: {
    width: "80%",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 80,
    marginLeft: 40,
    padding: 15
  },
  viewBtnWidth: {
    width: "48%"
  },
  closeBtnText: {
    color: "#000",
    textAlign: "center",
    fontSize: 16
  }
});
// Customizable Area End
