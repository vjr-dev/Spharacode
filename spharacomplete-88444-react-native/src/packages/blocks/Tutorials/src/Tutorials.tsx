// Customizable Area Start
//@ts-nocheck
//@ts-ignore

import React from "react";

import {
  StyleSheet,
  Text,
  View,
  Platform,
  
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  StatusBar
  
} from "react-native";

import TutorialsController, { Props } from "./TutorialsController";


import { back1, back2 } from "./assets";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;



import AppIntroSlider from "react-native-app-intro-slider";


export default class Tutorials extends TutorialsController {
  constructor(props: Props) {
    super(props);
  }
  renderItem = ({ item }) => (
    <View style={styles.child}>
      <StatusBar
        animated={true}
        backgroundColor="#454545"
        barStyle={"light-content"}
        showHideTransition={"slide"}
      />
      <ImageBackground source={back1} style={styles.image}>
        <ImageBackground source={back2} style={styles.image2}>
          <Image
            resizeMode="contain"
            source={item?.image}
            style={styles.images}
          />
          <Text style={styles.text}>{item?.text}</Text>
          <TouchableOpacity testID="btnclickID" onPress={() => this.onclick()}>
            <Text style={styles.text2}>SKIP</Text>
          </TouchableOpacity>
        </ImageBackground>
      </ImageBackground>
    </View>
  )

  render() {
    return (
      
      <AppIntroSlider
        dotStyle={{
          backgroundColor: "#3f3f3f",
          bottom:
            Platform.OS === "ios" ? windowHeight - 125 : windowHeight - 100
        }}
        activeDotStyle={{
          backgroundColor: "#f07233",
          bottom:
            Platform.OS === "ios" ? windowHeight - 125 : windowHeight - 100
        }}
        showNextButton={false}
        showDoneButton={false}
        testID='AppintroSliderID'
        renderItem={(item) => (this.renderItem(item))}
        data={this.state.data}
      />
      
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: windowHeight,
    width: windowWidth,
    backgroundColor: "#ffffffff"
  },
  image: {
    height: windowHeight,
    width: windowWidth
  },
  image2: {
    height: windowHeight,
    width: windowWidth,
    alignItems: "center",
    justifyContent: "center"
  },
  container1: { flex: 1, backgroundColor: "white" },
  child: { width: windowWidth },
  pagination: { top: 10 },
  images: { height: 150, width: 150, alignSelf: "center", marginBottom: 40 },
  text: {
    fontSize: 20,
    textAlign: "center",
    color: "#fff",
    marginTop: 20,
    height: 150,
    width: 250
  },
  text2: { fontSize: 15, textAlign: "center", color: "#f07233", marginTop: 50 },
  pdata: { height: 8, width: 8, borderRadius: 4 }
});
// Customizable Area End
