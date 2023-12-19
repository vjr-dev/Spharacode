 // Customizable Area Start

 import { Dimensions, StyleSheet } from "react-native";
 import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
 import { COLORS } from "framework/src/Globals";
 const sh = Dimensions.get('window').height;
 const sw = Dimensions.get('window').width;
 
 export const Styles = StyleSheet.create({
    container: {
        height: sh, width: sw,
        flex: 1,
    },
 })
  // Customizable Area End