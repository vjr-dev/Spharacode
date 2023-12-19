// Customizable Area Start
//@ts-nocheck
//@ts-ignore
import React from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList
} from "react-native";
import { COLORS } from "../../../framework/src/Globals";
import { back1, back2, LOGO } from "./assets";
import SignUpOptionsController, { Props } from "./SignUpOptionsController";
import {
  deviceHeight,
  deviceWidth,
  scaledSize,
} from "../../../framework/src/Utilities";

export default class SignupOptions extends SignUpOptionsController {
  constructor(props: Props) {
    super(props);
  }

  renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        testID="roleButton"
        style={{ ...styles.btn, backgroundColor: index % 2 === 0 ? COLORS.darkorange : "rgba(83,83,83,0.48)" }}
        onPress={() => this.signUpFlow(item.attributes)}
      >
        <Text style={styles.btnText}>{item.attributes.name}</Text>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={back1} style={styles.image}>
          <ImageBackground source={back2} style={styles.image2}>
            <View style={styles.mainView}>
              <Image source={LOGO} style={styles.logo} />
              <Text style={styles.headerText}>Are you a....</Text>
              <FlatList
                style={styles.flatListStyle}
                data={this.state.rolesData}
                renderItem={this.renderItem}
              />
            </View>
            <Modal visible={this.state.Loader} transparent={true}>
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
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#454545",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: deviceHeight,
    width: deviceWidth,
  },
  image2: {
    height: deviceHeight,
    width: deviceWidth,
  },
  mainView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: scaledSize(10),
    width: "100%",
  },
  logo: {
    height: scaledSize(100),
    width: scaledSize(100),
    marginTop: scaledSize(70),
  },
  headerText: {
    fontSize: scaledSize(18),
    textAlign: "center",
    color: COLORS.white,
    marginTop: scaledSize(25),
    fontWeight: "bold",
    letterSpacing: 1,
  },
  flatListStyle: {
    width: '100%',
    paddingHorizontal: scaledSize(10)
  },
  btn: {
    height: scaledSize(50),
    marginTop: scaledSize(50),
    borderRadius: scaledSize(25),
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: scaledSize(14),
    letterSpacing: 1,
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  }
});
// Customizable Area End
