import React from "react";
import { Text, TouchableOpacity, View, Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { COLORS } from "../../../../framework/src/Globals";
const { width } = Dimensions.get("window");

const Tab = ({ label, accessibilityState, onPress }: any) => {
  const focused = accessibilityState.selected;
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{ width: width / 4 }}
      onPress={onPress}
    >
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        {/* <Image
                    source={label == 'Time sheet' ? require('../assets/images/Timesheet.png') : label == 'Site Photos' ? require('../assets/images/Camera.png') : label == 'To do Notes' ? require('../assets/images/Notes.png') : require('../assets/images/Notification.png')}
                    style={{ height: RFPercentage(3.2), width: RFPercentage(3.2), resizeMode: 'contain', tintColor: focused ? COLORS.green:  COLORS.infoGray }} /> */}

        <Text
          style={{
            color: focused ? COLORS.green : COLORS.infoGray,
            fontSize: RFValue(12),
            marginTop: RFValue(5),
          }}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Tab;
