// Customizable Area Start

import { Dimensions, StyleSheet } from "react-native";
const sh = Dimensions.get('window').height;
const sw = Dimensions.get('window').width;

export const Styles = StyleSheet.create({
    container: {
        height: sh, width: sw,
        flex: 1,
    },
    safeareaView: {
        flex: 1,
        backgroundColor: "#454545"
    },
})
  // Customizable Area End