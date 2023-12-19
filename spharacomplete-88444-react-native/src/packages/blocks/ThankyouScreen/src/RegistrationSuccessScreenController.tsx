// Customizable Area Start
//@ts-ignore
//@ts-nocheck

import { IBlock } from "framework/src/IBlock";
import { BlockComponent } from "framework/src/BlockComponent";
import { runEngine } from "framework/src/RunEngine";
import { BackHandler } from "react-native";
import { backToLoginConfirmationAlert } from "../../../components/src/CustomAlert";
import { OnLogOut } from "../../../components/src/Navigation/logout";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Props {
  navigation: any;
  id: string;
}

interface S {
  isLoading: boolean;
}

interface SS {
  id: any;
}

export default class RegistrationSuccessScreenController extends BlockComponent<
  Props,
  S,
  SS
> {
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [];

    this.state = {
      isLoading: false,
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount(): Promise<void> {
    const tempRoleID = await AsyncStorage.getItem("roleID");
    this.setState({ roleID: tempRoleID });
  }

  componentWillMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  handleBackButtonClick = async () => {
    backToLoginConfirmationAlert(async () => {
      this.setState({ isLoading: true });
      await OnLogOut(this.props);
      this.setState({ isLoading: false });
    });
    return true;
  };

  onCompleteProfile() {
    this.props.navigation.replace("PermissionScreen");
  }
}
// Customizable Area End
