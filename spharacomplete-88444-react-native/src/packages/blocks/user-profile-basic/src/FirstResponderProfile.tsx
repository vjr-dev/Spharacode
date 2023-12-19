import React from "react";
// Customizable Area Start
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../../framework/src/Globals";
import {
  deviceHeight,
  deviceWidth,
  scaledSize,
} from "../../../framework/src/Utilities";
import { back1, back2 } from "./assets";
import CustomHeader from "../../../components/src/CustomHeader";
import * as IMAGE from "./assets";
import Entypo from "react-native-vector-icons/Entypo";
import Loader from "../../../components/src/Loader";

// Customizable Area End

import FirstResponderProfileController, {
  Props,
} from "./FirstResponderProfileController";

export default class FirstResponderProfile extends FirstResponderProfileController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  
  // Customizable Area Start

  personaldetails = (field:string, data:string) => {
    return (
      <View style={styles.personalInfoView}>
        <Text style={{ color: COLORS.white }}>{field}</Text>
        <Text style={{ color: COLORS.infoGray, marginLeft: scaledSize(10) }}>
          {data}
        </Text>
      </View>
    );
  };

  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader headerText="Profile" />
        <ImageBackground source={back1} style={styles.bgImage}>
          <ImageBackground source={back2} style={styles.bgImage}>
            <Loader loading={this.state.isLoading} />
            <ScrollView style={styles.scrollView} bounces={false}>
              <View style={styles.profileSection}>
                {this.state.profileDetails.profile_image_url ? (
                  <Image
                    source={{ uri: this.state.profileDetails.profile_image_url }}
                    style={styles.profileImg}
                  />
                ) : (
                  <Image source={IMAGE.user} style={styles.profileImg} />
                )}
                <Text style={styles.userNameText}>{`${this.state.profileDetails.first_name ?? ''} ${this.state.profileDetails.last_name ?? ''}`}</Text>
                <View>
                  <View style={styles.addressView}>
                    <Entypo
                      name="location"
                      style={{ marginRight: 5 }}
                      color={COLORS.infoGray}
                      size={scaledSize(15)}
                    />
                    <Text style={styles.addressText} numberOfLines={2}>
                      {this.state.profileDetails.address}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.subHeaderView}>
                <Text style={styles.titleText}>Personal Details</Text>
                <TouchableOpacity
                  testID="editProfileButton"
                  onPress={() => this.onEditProfile()}>
                  <Text style={styles.editText}>EDIT</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.personalMainView}>
                {this.personaldetails("Name", `${this.state.profileDetails.first_name} ${this.state.profileDetails.last_name}`)}
                {this.personaldetails("E-mail", this.state.profileDetails.email)}
                {this.personaldetails("Phone Number", this.state.profileDetails.phone_number)}
                {this.personaldetails("City/State", `${this.state.profileDetails.city}/${this.state.profileDetails.state}`)}
              </View>

              <View style={styles.subHeaderView}>
                <Text style={styles.titleText}>Change Phone Number</Text>
                <TouchableOpacity
                  testID="changePhoneNumberButton"
                  onPress={() =>this.onChangePhoneNumber()}
                >
                  <Text style={styles.editText}>EDIT</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.subHeaderView}>
                <Text style={styles.titleText}>Update Identification</Text>
                <TouchableOpacity
                  testID="updateCredentialButton"
                  onPress={() => this.onEditIdentification()}>
                  <Text style={styles.editText}>EDIT</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </ImageBackground>
        </ImageBackground>
      </SafeAreaView>
    );
    // Customizable Area End
  }
}

const styles = StyleSheet.create({
  // Customizable Area Start
  container: {
    flex: 1,
    backgroundColor: "#f07135",
  },
  bgImage: {
    height: deviceHeight,
    width: deviceWidth,
  },
  scrollView: {
    width: "100%",
  },
  profileSection: {
    alignItems: "center",
    marginTop: scaledSize(40),
  },
  profileImg: {
    borderWidth: 2,
    height: scaledSize(60),
    width: scaledSize(60),
    borderRadius: 50,
    marginTop: scaledSize(2),
    borderColor: COLORS.white,
  },
  userNameText: {
    color: COLORS.white,
    fontSize: scaledSize(14),
    marginTop: scaledSize(20),
  },
  addressView: {
    flexDirection: "row",
    width: "50%",
    marginTop: scaledSize(15),
  },
  addressText: {
    color: COLORS.infoGray,
    fontSize: scaledSize(12),
    textAlign: "center",
  },
  subHeaderView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: scaledSize(15),
    marginTop: scaledSize(30),
  },
  titleText: {
    fontSize: scaledSize(14),
    color: COLORS.infoGray,
  },
  editText: {
    fontSize: scaledSize(14),
    color: COLORS.darkorange,
    fontWeight: "bold",
  },
  personalMainView: {
    marginTop: scaledSize(15),
    backgroundColor: COLORS.backgroundGray,
    paddingVertical: scaledSize(15),
  },
  personalInfoView: {
    flexDirection: "row",
    borderBottomColor: "rgba(61,63,62,1)",
    borderBottomWidth: 1,
    marginTop: scaledSize(7),
    marginHorizontal: scaledSize(15),
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
  // Customizable Area End
});