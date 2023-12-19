import { IBlock } from "../../../framework/src/IBlock";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { Alert, Platform } from "react-native";
import * as CloudStore from 'react-native-cloud-store';
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}
// Customizable Area Start
  interface BackUpDataType {
    name: string,
    email: string
  }
// Customizable Area End
export default class IcloudSharing2Controller extends BlockComponent<
  Props,
  S,
  SS
> {

  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
    this.subScribedMessages = [
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      // Customizable Area End
    };

    // Customizable Area Start
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area End

  }

  // Customizable Area Start
  isICloudAvailableOnDevice = async () => {
    if(Platform.OS === "ios") {
      const iCloudAvailable = await CloudStore.isICloudAvailable();
      if(iCloudAvailable) {
        return true;
      }else{
        Alert.alert(configJSON.error,configJSON.turnOnICloud);
        return false
      }
    }else{
      Alert.alert(configJSON.error, configJSON.serviceAvailable);
      return false;
    }
  }
  doICloudBackup = async () => {
    const keyName: string = "myInformation";
    const backUpData: BackUpDataType = {
      name: "my name",
      email: "name@mail.com"
    }
    const iCloudAvailable = await this.isICloudAvailableOnDevice();
    if(iCloudAvailable) {
      try {
        CloudStore.kvSetItem(keyName, JSON.stringify(backUpData));
        Alert.alert(configJSON.success, configJSON.successMessage);
      } catch (error) {
        Alert.alert(configJSON.error, configJSON.somthingWentWrong);
      }
    }
  }
  // Customizable Area End
  
}
