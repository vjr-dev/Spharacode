//@ts-ignore
//@ts-nocheck
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  
  Image,
  ImageBackground,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { scaledSize } from "../../framework/src/Utilities";
const check = require("./check.png");
interface myProps {
  isCheck: boolean;
	onChange: Function;
}
export default function CheckBox(props: myProps) {
  return (
		<TouchableOpacity 
			style={styles.checkBoxView}
			onPress={()=> props.onChange({isCheck: !props.isCheck})}
		>
			<View style={styles.checkBoxStyle}>
				{
					props.isCheck ?
						<Image source={check} style={styles.checkIcon} />
						: null
				}
			</View>
		</TouchableOpacity>
  )
}
const styles = StyleSheet.create({
	checkBoxView: {
		height: scaledSize(35),
		width: scaledSize(35),
		alignItems: 'center',
		justifyContent: 'center'
	},
	checkBoxStyle: {
		height: scaledSize(17),
		width: scaledSize(17),
		borderWidth: scaledSize(1),
		borderColor: "grey",
		borderRadius: scaledSize(5),
		alignItems: 'center',
		justifyContent: 'center'
	},
	checkIcon: {
		height: scaledSize(8),
		width: scaledSize(8),
		tintColor: "#ffffff",
	},
});
