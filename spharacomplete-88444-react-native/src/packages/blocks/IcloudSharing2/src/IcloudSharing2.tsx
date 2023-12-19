//@ts-nocheck
import React from "react";

import {
  // Customizable Area Start
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  Button
  // Customizable Area End
} from "react-native";
// Customizable Area Start
import IcloudSharing2Controller, {
  Props,
  configJSON
} from "./IcloudSharing2Controller";
// Customizable Area End
export default class IcloudSharing2 extends IcloudSharing2Controller {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
      <SafeAreaView>
        <View style = { styles.container}>
        <Text
          testID="labelBody" 
          style={styles.body}
        >
          {configJSON.labelBodyText} 
        </Text>
        <Button
          testID={"btnExample"}
          style = {styles.button}
          title={configJSON.btnExampleTitle}
          onPress={()=>this.doICloudBackup()}
        />
        </View>
      </SafeAreaView>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    paddingTop:50,
    paddingHorizontal:10
  },
  title: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8
  },
  body: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8
  },
  button:{
    backgroundColor:'blue'
  }
});
// Customizable Area End
