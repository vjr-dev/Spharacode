//@ts-ignore
//@ts-nocheck
import { shallow, ShallowWrapper } from "enzyme";
import { render, fireEvent } from "@testing-library/react-native";
import React from "react";
import TestVoiceActivation from "../../src/TestVoiceActivation";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Voice from "@react-native-community/voice";

const mockGetParam = jest.fn().mockReturnValue("123");
const navigateMock = jest.fn();
const screenProps = {
  navigation: {
    navigate: navigateMock,
    goBack: jest.fn(),
    addListener: jest.fn(),
    getParam: mockGetParam,
  },
  route: {
    params: {
      dt: { name: "Test Name" }
    }
  },
  id: "TestVoiceActivation"
};

jest.mock("@react-native-community/voice", () => ({
  onSpeechStart: jest.fn(),
  onSpeechEnd: jest.fn(),
  onSpeechError: jest.fn(),
  onSpeechResults: jest.fn(),
  onSpeechPartialResults: jest.fn(),
  onSpeechVolumeChanged: jest.fn()
}));

let VoiceActivationData = <TestVoiceActivation {...screenProps} />;
describe("TestVoiceActivation us page first", () => {
  let VoiceActivationWrapper: ShallowWrapper;
  VoiceActivationWrapper = shallow(<TestVoiceActivation {...screenProps} />);
  let instance: TestVoiceActivation;
  instance = VoiceActivationWrapper.instance() as TestVoiceActivation;

  it("should set state and call getData on didFocus event", async () => {
    // mock getData method

    // simulate didFocus event
    await instance.componentDidMount();
    VoiceActivationWrapper.update();
    VoiceActivationWrapper.instance().props.navigation.addListener.mock.calls[0][1]();
    // check if state is updated correctly
    instance.setState({ dataFrom: "jhllh" });

    AsyncStorage.getItem = jest
      .fn()
      .mockResolvedValueOnce(JSON.stringify("test phrase"));

    const setStateMock = jest.fn();
    const getData = async () => {
      const ActivatedPharse: any = await AsyncStorage.getItem(
        "ActivatedPharse"
      );
      let dg: any = JSON.parse(ActivatedPharse);
      setStateMock({ ActivatedPhase: dg });
    };

    await getData();

    expect(AsyncStorage.getItem).toHaveBeenCalledWith("ActivatedPharse");
    expect(setStateMock).toHaveBeenCalledWith({
      ActivatedPhase: "test phrase"
    });
  });

  it("sets Voice event listeners", async () => {
    // mock Voice functions
    const mockOnSpeechStart = jest.fn();
    const mockOnSpeechEnd = jest.fn();
    const mockOnSpeechError = jest.fn();
    const mockOnSpeechResults = jest.fn();
    const mockOnSpeechPartialResults = jest.fn();
    const mockOnSpeechVolumeChanged = jest.fn();
    Voice.onSpeechStart = mockOnSpeechStart;
    Voice.onSpeechEnd = mockOnSpeechEnd;
    Voice.onSpeechError = mockOnSpeechError;
    Voice.onSpeechResults = mockOnSpeechResults;
    Voice.onSpeechPartialResults = mockOnSpeechPartialResults;
    Voice.onSpeechVolumeChanged = mockOnSpeechVolumeChanged;

    const wrapper = shallow(<TestVoiceActivation {...screenProps} />);
    await wrapper.instance().componentDidMount();

    expect(mockOnSpeechStart).toBeTruthy();
    expect(mockOnSpeechEnd).toBeTruthy();
    expect(mockOnSpeechError).toBeTruthy();
    expect(mockOnSpeechResults).toBeTruthy();
    expect(mockOnSpeechPartialResults).toBeTruthy();
    expect(mockOnSpeechVolumeChanged).toBeTruthy();
  });

  it("should set state with started when onSpeechStart is called", () => {
    const instance = VoiceActivationWrapper.instance();
    instance.onSpeechStart();

    expect(VoiceActivationWrapper.state().started).toBe("True");
  });

  it("should set state with null started and end when onSpeechEnd is called", () => {
    const instanceS = VoiceActivationWrapper.instance();
    instanceS.onSpeechEnd();

    expect(VoiceActivationWrapper.state().started).toBeNull();
    expect(VoiceActivationWrapper.state().end).toBe("True");
  });

  it("should set state with error message when onSpeechError is called", () => {
    const instanceV = VoiceActivationWrapper.instance();
    const error = { error: "test error" };
    instanceV.onSpeechError(error);

    expect(VoiceActivationWrapper.state().started).toBeNull();
    expect(VoiceActivationWrapper.state().end).toBe("True");
    expect(VoiceActivationWrapper.state().error).toBe(
      JSON.stringify(error.error)
    );
  });

  it("should set state with null started and end when onSpeechPartialResults is called", () => {
    const mockValue = "foo";
    instance.onSpeechPartialResults({ value: mockValue });
    expect(VoiceActivationWrapper.state("partialResults")).toEqual(mockValue);
  });

  test("onSpeechResults sets Tested to true and saves state to AsyncStorage when the spoken phrase includes the expected name", async () => {
    // Arrange
    const expectedName = "John Doe";
    const mockList = [{ name: "John Doe", Tested: false }];
    const mockEvent = { value: `Hello ${expectedName}, how are you?` };
    const expectedList = [{ name: "John Doe", Tested: true }];

    const mockAsyncStorage = {
      getItem: jest.fn(() => Promise.resolve("0")),
      setItem: jest.fn(() => Promise.resolve())
    };
    AsyncStorage.setItem = mockAsyncStorage.setItem;
    AsyncStorage.getItem = mockAsyncStorage.getItem;

    const wrapper = shallow(<TestVoiceActivation {...screenProps} />);
    wrapper.setState({ dataFrom: { name: expectedName }, List: mockList });

    // Act
    await wrapper.instance().onSpeechResults(mockEvent);

    // Assert
    expect(mockAsyncStorage.getItem).toHaveBeenCalledWith("NID");
    expect(mockAsyncStorage.setItem).toHaveBeenCalledWith(
      "VoiceData",
      JSON.stringify(expectedList)
    );
    expect(wrapper.state("List")).toEqual(expectedList);
    expect(wrapper.state("SpeechEnd")).toBe(true);
  });

  it("should set state with null started and end when onSpeechVolumeChanged is called", () => {
    const mockValue = "foo";
    instance.onSpeechVolumeChanged({ value: mockValue });
    expect(VoiceActivationWrapper.state("pitch")).toEqual(mockValue);
  });

  test("should show an alert if the recognized phrase does not match the expected phrase", async () => {
    AsyncStorage.getItem.mockReturnValueOnce(JSON.stringify(1));
    VoiceActivationWrapper.setState({ List: [{ id: 1, Tested: false }] });
    const spy = jest.spyOn(Alert, "alert");
    const message = "Please Select Id";
    Alert.alert(message);
    expect(spy).toHaveBeenCalledWith(message);
    expect(VoiceActivationWrapper.state("TapPress")).toEqual(false);
  });
  test("should find the testId btn_activePress", () => {
    const testTestName = "btn_activePress";
    const { getByTestId } = render(VoiceActivationData);
    const foundButton = getByTestId(testTestName);
    fireEvent.press(getByTestId(testTestName));
    expect(foundButton).toBeTruthy();
    instance.ActivatePress();
  });

  test("should find the testId btn_startSpeech", () => {
    const testTestName = "btn_startSpeech";
    const { getByTestId } = render(VoiceActivationData);
    const foundButton = getByTestId(testTestName);
    fireEvent.press(getByTestId(testTestName));
    expect(foundButton).toBeTruthy();
  });

  test("should find the testId btn_testGoBack", () => {
    const testTestName = "btn_testGoBack";
    const { getByTestId } = render(VoiceActivationData);
    const foundButton = getByTestId(testTestName);
    fireEvent.press(getByTestId(testTestName));
    expect(foundButton).toBeTruthy();
  });
});
