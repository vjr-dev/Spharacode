// Customizable Area Start
//@ts-nocheck
//@ts-ignore
import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { COLORS } from "../../../framework/src/Globals";
import { back1, back2, image_back, radio_button } from "./assets";
import TriggerController, { Props } from "./TriggerController";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default class Trigger extends TriggerController {
  constructor(props: Props) {
    super(props);
  }
  renderItem(item: any) {
    return (
      <TouchableOpacity
        testID="itemButton"
        onPress={() => this.listcall(item)}
        style={{
          height: RFValue(35),
          width: "90%",
          alignSelf: "center",
          justifyContent: "center",
          borderRadius: 5,
          backgroundColor:
            this.state.Selectedname == item.aa
              ? COLORS.orangelight
              : "transparent",
        }}
      >
        <Text
          style={{
            color:
              this.state.Selectedname == item.aa ? "#000" : COLORS.lightwhite,
            marginLeft: 10,
          }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  }
  buttonTitle() {
    if(this.state.Selectedname === "power_button"){
      return "Power Button"
    }else if(this.state.Selectedname == "volume_up_button"){
      return "Volume Up Button"
    }else if(this.state.Selectedname == "volume_down_button"){
      return "Volume Down Button"
    }else{
      return "Select button type";
    }
  }
  header() {
    if(this.state.Selectedname === "power_button"){
      return "Power Button"
    }else if(this.state.Selectedname == "volume_up_button"){
      return "Volume Up Button"
    }else if(this.state.Selectedname == "volume_down_button"){
      return "Volume Down Button"
    }
  }
  renderButton(): JSX.Element {
    if (this.state.buttonlist) {
      return (
        <TouchableOpacity
          testID="actionButton"
          onPress={() => this.setState({ buttonlist: false, show: false })}
          style={styles.button2}
        >
          <Text
            style={{
              justifyContent: "center",
              color: COLORS.ultralightwhite,
              paddingHorizontal: 20,
            }}
          >
            {this.buttonTitle()}
          </Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <View
          style={{
            height: 200,
            width: windowWidth - 30,
            backgroundColor: COLORS.Viewback,
            borderRadius: 25,
            marginTop: 30,
          }}
        >
          <Text
            style={{
              height: 50,
              width: "100%",
              justifyContent: "center",
              color: COLORS.ultralightwhite,
              paddingHorizontal: 20,
              paddingTop: 17,
            }}
          >
            {this.header()}
          </Text>
          <FlatList
            testID="listItem"
            data={this.state.List}
            // style={{ backgroundColor: "pink" }}
            renderItem={({ item }: any) => this.renderItem(item)}
          />
        </View>
      );
    }
  }

  renderLabel(item: any) {
    return (
      <TouchableOpacity
        testID="labelButton"
        onPress={() => this.labaleclick(item)}
        style={styles.view2}
      >
        <Text style={styles.text4}>{item.name}</Text>
        <Image
          source={radio_button}
          style={{
            height: 20,
            width: 20,
            tintColor:
              this.state.LableID == item.aa && this.state.Tempdaa == item.type
                ? COLORS.darkorange
                : COLORS.ultralightwhite,
          }}
        />
      </TouchableOpacity>
    );
  }
  selectData(): any{
    if( this.state.SelectedID === 1){
      return  this.state.data1
    }else if(this.state.SelectedID === 2){
      return this.state.data2
    }else{
      return this.state.data3
    }
  }
  render() {
    return (
      <SafeAreaView style={styles.container1}>
        <View style={styles.child}>
          <StatusBar
            animated={true}
            backgroundColor="#454545"
            barStyle={"light-content"}
            showHideTransition={"slide"}
            // hidden={true}
          />
          <ImageBackground source={back1} style={styles.image}>
            <ImageBackground source={back2} style={styles.image2}>
              <View style={styles.view1}>
                <TouchableOpacity
                  testID="backButton"
                  style={styles.button1}
                  onPress={() => this.goback()}
                >
                  <Image source={image_back} style={styles.backbutton} />
                </TouchableOpacity>
              </View>

              <Text style={styles.text1}>Trigger using button.</Text>
              <Text style={styles.text3}>
                Automatically call for help by selecting mobile button option as
                well as triggering method.
              </Text>
              {/* <Text style={styles.text3}></Text> */}
              {this.renderButton()}

              {this.state.show ? (
                <>
                  <Text style={styles.text2}>Select Trigger type.</Text>
                  <FlatList
                    testID="labelFlatList"
                    data={this.selectData()}
                    // style={{ backgroundColor: "pink" }}
                    renderItem={({ item }: any) => this.renderLabel(item)}
                  />
                </>
              ) : null}
              {/* <Text style={styles.text2}>Select Trigger type.</Text>
                                <FlatList
                                    data={this.state.updatedData}
                                    // style={{ backgroundColor: "pink" }}
                                    renderItem={({ item }: any) => {
                                      
                                        return (
                                            <TouchableOpacity
                                                onPress={() => this.labaleclick(item)}
                                                style={styles.view2}>
                                                <Text style={styles.text4}>{item.name}</Text><Image source={radio_button} style={{ height: 20, width: 20, tintColor: this.state.LableID == item.aa && this.state.Tempdaa == item.type ? COLORS.darkorange : COLORS.ultralightwhite }} />
                                            </TouchableOpacity>
                                        )
                                    }}
                                /> */}

              <Modal visible={this.state.Loader} transparent={true}>
                <View
                  style={{
                    height: windowHeight,
                    width: windowWidth,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      height: 100,
                      width: windowWidth - 20,
                      alignSelf: "center",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ActivityIndicator
                      animating={true}
                      size={"large"}
                      color="#f07233"
                    />
                  </View>
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
  backbutton: { height: 15, width: 15, marginLeft: 20, tintColor: "#f07233" },
  view1: { height: 60, width: windowWidth, justifyContent: "center" },
  button1: { height: "100%", width: 70, justifyContent: "center" },
  logo: { height: 100, width: 100, marginTop: 40 },
  text1: {
    fontSize: 20,
    color: COLORS.white,
    marginTop: 50,
    width: windowWidth - 20,
  },
  text3: {
    fontSize: 16,
    color: COLORS.ultralightwhite,
    marginTop: 10,
    width: "90%",
  },
  text4: { fontSize: 16, color: COLORS.ultralightwhite },
  imageback: {
    height: 60,
    width: windowWidth - 25,
    marginVertical: 100,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#515151",
    borderRadius: 50,
  },
  ccode: {
    height: 39,
    width: 60,
    backgroundColor: "#444444",
    marginLeft: 10,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  text2: {
    fontSize: 14,
    color: COLORS.orangelight,
    marginTop: 30,
    width: windowWidth - 20,
  },
  button2: {
    height: 50,
    width: windowWidth - 30,
    backgroundColor: COLORS.Viewback,
    marginTop: 30,
    borderRadius: 30,
    // alignItems: "center",
    justifyContent: "center",
  },
  view2: {
    flexDirection: "row",
    width: windowWidth - 20,
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
    height: 30,
    marginVertical: 1,
  },
});
// Customizable Area End
