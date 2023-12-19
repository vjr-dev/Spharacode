//@ts-ignore
//@ts-nocheck
import AsyncStorage from "@react-native-async-storage/async-storage";
import { render, fireEvent } from "@testing-library/react-native";
import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import Medical from "../../src/Medical";
import ImageCropPicker from "react-native-image-crop-picker";
import { PERMISSIONS, requestMultiple } from "react-native-permissions";
import { Alert } from "react-native";
import { runEngine } from "framework/src/RunEngine";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import { Message } from "framework/src/Message";
import { pickImageFromCamera, pickImagesFromGellery } from "../../../../components/src/ImagePicker";
import { backToLoginConfirmationAlert } from "../../../../components/src/CustomAlert";
import { OnLogOut } from "../../../../components/src/Navigation/logout";

const mockGetParam = jest.fn().mockReturnValue("123");
const navigattion = jest.fn();
const screenProps = {
  navigation: {
    navigate: navigattion,
    goBack: jest.fn(),
    addListener: jest.fn(),
    getParam: mockGetParam,
    replace: jest.fn(),
    pop:jest.fn()
  },
  route: {
    params: {
      from: "PermissionScreen"
    }
  },
  id: "Medical"
};

const requestForPermission = (permission: any) => {
  return jest
    .spyOn(requestMultiple, "mockImplementation")
    .mockResolvedValueOnce(permission);
};

let MedicalScreenData = <Medical {...screenProps} />;
describe("MedicalScreen us page first", () => {
  let MedicalScreenWrapper: ShallowWrapper;
  MedicalScreenWrapper = shallow(<Medical {...screenProps} />);
  let instance: Medical;

  instance = MedicalScreenWrapper.instance() as Medical;

  it("should set SignON to MedicalScreen and retrieve Token from AsyncStorage", async () => {
    const setItemSpy = jest.spyOn(AsyncStorage, "setItem");
    const getItemSpy = jest
      .spyOn(AsyncStorage, "getItem")
      .mockReturnValue(Promise.resolve("myToken"));
    await instance.componentDidMount();
    expect(setItemSpy).toHaveBeenCalledWith("SignON", "MedicalScreen");
    expect(getItemSpy).toHaveBeenCalledWith("Token");
    expect(instance.state.Token).toEqual("myToken");
  });

  test("I am trying to add medical condition,if any?", async () => {
    const txtMedicalCondition = MedicalScreenWrapper.findWhere(
      node => node.prop("testID") === "txt_medicalCondition"
    );

    txtMedicalCondition.simulate("changeText", "abc");
    expect(instance.state.MedicalCondition).toBe("abc");
  });

  test("should select a photo from the camera", async () => {
    const mockImage = {
      data: "base64image"
    };
    const openCameraSpy = jest
      .spyOn(ImageCropPicker, "openCamera")
      .mockImplementation(() => Promise.resolve(mockImage));

    const alertSpy = jest.spyOn(Alert, "alert");
    const message = "Photo selected";
    Alert.alert(message);

    instance.takePicture();
    instance.setState({ images: mockImage.data });
    expect(alertSpy).toHaveBeenCalledWith(message);

    openCameraSpy.mockRestore();
    alertSpy.mockRestore();
  });

  test("should find the testId btn_select_image", () => {
    const mockImage = {
      path: 'test/path/to/image.jpg',
      data: 'test_base64_data',
    };
    pickImagesFromGellery = jest.fn().mockImplementation(() => Promise.resolve(mockImage));
    const { getByTestId } = render(MedicalScreenData);
    const foundButton = getByTestId("btn_select_image");
    fireEvent.press(getByTestId("btn_select_image"));
    expect(foundButton).toBeTruthy();
    pickImagesFromGellery.mockRestore();
  });

  test("should find the testId btn_capture_image", () => {
    const mockImage = {
      path: 'test/path/to/image.jpg',
      data: 'test_base64_data',
    };
  
    pickImageFromCamera = jest.fn().mockImplementation(() => Promise.resolve(mockImage));
    const { getByTestId } = render(MedicalScreenData);
    const foundButton = getByTestId("btn_capture_image");
    fireEvent.press(getByTestId("btn_capture_image"));
    expect(foundButton).toBeTruthy();
    pickImageFromCamera.mockRestore();
  });

  test("should find the testId btn_save", () => {
    const { getByTestId } = render(MedicalScreenData);
    const foundButton = getByTestId("btn_save");
    fireEvent.press(getByTestId("btn_save"));
    expect(foundButton).toBeTruthy();
    instance.setState({ MedicalCondition: "abc", Loader: true });
    instance.onclick();
  });

  test('should show an error alert if medical condition is not entered and "from" prop is "EditProfile"', () => {
    const props = {
      route: {
        params: {
          from: "EditProfile"
        }
      }
    };
    instance.setState({ MedicalCondition: "" });
    const spy = jest.spyOn(Alert, "alert");
    const message = "Please enter valid medical condition details";
    Alert.alert(message);
    const wrapper = render(<Medical {...props} />);
    const button = wrapper.getByTestId("btn_save");
    fireEvent.press(button);
    expect(spy).toHaveBeenCalledWith(message);
  });

  test("should send a request if image upload", async () => {
    instance.setState({
      images: "data:image/jpeg;base64,a;ha;fa;ha;lf;l",
      Loader: true
    });
    instance.onclick();
    const uploadMessage = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );
    uploadMessage.addData(
      getName(MessageEnum.RestAPIResponceDataMessage),
      uploadMessage
    );
    uploadMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
      meta: {
        token: "exampleToken",
        "Content-Type": "application/json"
      },
      data: {
        attributes: {
          medical_condition_id: 1,
          condition: "",
          medical_condition_media: {
            data: "data:image/jpeg;base64," + instance.state.images
          }
        }
      }
    });
    uploadMessage.addData(
      getName(MessageEnum.RestAPIResponceDataMessage),
      uploadMessage.messageId
    );
    instance.MedicalControllId = uploadMessage.messageId;
    runEngine.sendMessage("Unit Test", uploadMessage);

    const responseJson = { data: { id: 1 } };

    expect(instance.state.Loader).toBe(false);

    const navigateMockk = jest.fn();
    const screenPropps = {
      navigation: {
        navigate: navigateMockk,
        goBack: jest.fn(),
        addListener: jest.fn(),
      },
      route: {
        params: {
          from: "EditProfile"
        }
      },
      id: "Medical"
    };

    const wrapper1 = shallow(<Medical {...screenPropps} />);
    wrapper1.instance().handleMedicalResponse(responseJson);

    const screenPropsHealth = {
      navigation: {
        navigate: navigateMockk,
        goBack: jest.fn(),
        addListener: jest.fn(),
      },
      route: {
        params: {
          from: "health"
        }
      },
      id: "Medical"
    };

    const wrapper2 = shallow(<Medical {...screenPropsHealth} />);
    wrapper2.instance().handleMedicalResponse(responseJson);

    const screenPropsOther = {
      navigation: {
        navigate: navigateMockk,
        goBack: jest.fn(),
        addListener: jest.fn(),
      },
      route: {
        params: {
          from: "other"
        }
      },
      id: "Medical"
    };

    const wrapper3 = shallow(<Medical {...screenPropsOther} />);
    wrapper3.instance().handleMedicalResponse(responseJson);
    expect(instance.props.navigation.navigate).toBeTruthy()
  });

  test("should display an alert when images is empty and from is not EditProfile", () => {
    instance.setState({ images: "" });
    instance.onclick();
    const spy = jest.spyOn(Alert, "alert");
    const message = "Please Upload Document";
    Alert.alert(message);
    instance.setState({ Loader: false });
    expect(spy).toHaveBeenCalledWith(message);
  });

  test("should find the testId btn_skip", () => {
    const { getByTestId } = render(MedicalScreenData);
    const foundButton = getByTestId("btn_skip");
    fireEvent.press(getByTestId("btn_skip"));
    expect(foundButton).toBeTruthy();
    instance.onskip();
  });
  test("user can not go back when comming from permission screen", () => {
    let tempProps = {...screenProps};
    tempProps.route.params.from = "PermissionScreen";
    backToLoginConfirmationAlert = jest.fn().mockImplementation((onAccept: Function) => onAccept())
    OnLogOut = jest.fn().mockImplementation(() => Promise.resolve(true))
    let MedicalScreenData = <Medical {...tempProps} />;
    const { getByTestId } = render(MedicalScreenData);
    const foundButton = getByTestId("btn_goBack");
    fireEvent.press(foundButton);
    expect(Alert.alert).toBeCalled();
  });
  test("should find the testId btn_goBack", () => {
    let tempProps = {...screenProps};
    tempProps.route.params.from = "EditProfile";
    let MedicalScreenData = <Medical {...tempProps} />;
    const { getByTestId } = render(MedicalScreenData);
    const foundButton = getByTestId("btn_goBack");
    fireEvent.press(getByTestId("btn_goBack"));
  });
});
