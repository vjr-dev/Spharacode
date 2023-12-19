import { Dimensions, StyleSheet } from "react-native";
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { COLORS } from "framework/src/Globals";
const sh = Dimensions.get('window').height;
const sw = Dimensions.get('window').width;

const BASE_SIZE = 300
export const Styles = StyleSheet.create({
    maincontainer: {
        height: sh, width: sw,
        flex: 1,
    },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#E56A00',
    marginTop: RFValue(50)
  },
  txt_1: {
    color: COLORS.darkGray,
    fontSize: RFValue(15),
},
main_txt: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: RFPercentage(7)
},
  circlesContainer: {
    width: BASE_SIZE,
    height: BASE_SIZE,
    alignItems: 'center',
  },
  circle_1: {
    top: 0,
    position: 'absolute',
    width: BASE_SIZE,
    height: BASE_SIZE,
    borderRadius: BASE_SIZE / 2,
    backgroundColor: COLORS.ultralightwhite,
    opacity: 0.2
  },
  circle_2: {
    top: BASE_SIZE * 0.1, // The amount remaining
    left: BASE_SIZE * 0.1,
    position: 'absolute',
    width: BASE_SIZE * 0.8, // 80% of the base size
    height: BASE_SIZE * 0.8,
    borderRadius: BASE_SIZE / 2,
    backgroundColor: COLORS.lightwhite,
    opacity: 0.2

  },
  circle_3: {
    top: BASE_SIZE * 0.2,
    left: BASE_SIZE * 0.2,
    position: 'absolute',
    width: BASE_SIZE * 0.6,
    height: BASE_SIZE * 0.6, // 60% of the base size
    borderRadius: BASE_SIZE * 0.6 / 2,
    backgroundColor: '#FFFFFF'
  }, box1: {
    width: 100,
    height: 100,
    margin: 10,
    backgroundColor: '#ff0'
  },
  box2: {
    width: 100,
    height: 100,
    margin: 10,
    backgroundColor: '#f0f'
  },
  box3: {
    width: 100,
    height: 100,
    margin: 10,
    backgroundColor: '#0ff'
  },
  box4: {
    width: 100,
    height: 100,
    margin: 10,
    backgroundColor: '#fff'
  },
  container1: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  countdown_main: {
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: RFPercentage(15),
    flex: 1,
    // backgroundColor: COLORS.darkorange,
    height: "100%",
    width: "100%",
    borderRadius: 100,
    alignSelf: 'center'
},
txt_timer: {
    color: COLORS.white,
    fontSize: RFPercentage(6)
},
txt_cancel: {
    color: COLORS.orange,
    fontSize: RFValue(14),
    fontWeight: '600',
    letterSpacing: 2,
    alignSelf: 'center',
    marginTop: RFPercentage(10),
},
})