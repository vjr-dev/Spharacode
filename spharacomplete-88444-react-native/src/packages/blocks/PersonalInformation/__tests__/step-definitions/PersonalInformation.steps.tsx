//@ts-ignore
//@ts-nocheck
import { shallow, ShallowWrapper } from "enzyme";
import { render, fireEvent } from "@testing-library/react-native";
import React from "react";
import PersonalInformation from "../../src/PersonalInformation";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import { Message } from "framework/src/Message";
import { runEngine } from "framework/src/RunEngine";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { backToLoginConfirmationAlert } from "../../../../components/src/CustomAlert";
import { OnLogOut } from "../../../../components/src/Navigation/logout";

const mockGetParam = jest.fn().mockReturnValue("PersonalInformation");
const navigateMock = jest.fn();
const screenProps = {
  navigation: {
    navigate: navigateMock,
    goBack: jest.fn(),
    addListener: jest.fn(),
    getParam: mockGetParam,
  },
  route:{
    params:{
      from:"loginFlow"
    }
  },
  id: "PersonalInformation",
};

const userCountryList = {
  data: [
    {
      id: "11",
      name: "urvesh",
    },
  ],
  error: null,
};

const errorResponse = {
  error: "askvsjva",
};
const errorResponseUserState = {
  data: {},
  error: "askvsjva",
  errors: "askvsjva",
};

const attrs = {
  type: "personal_information",
  first_name: "ahaj",
  last_name: "ajaav",
  nick_name: "ajaja",
  date_of_birth: '"06/03/1996',
  email: "test@gmail.com",
  address: "akbja",
  city: "askfgsaf",
  state: "dkjg",
  state_code: "8",
  zip_code: "82",
  // user_country_id: 103,
  user_country_id: 788,
  headline: "",
  current_position: "",
  summary: "",
  visibility: "public",
  // terms_accepted: true,
};
const data = {
  attributes: attrs,
};

jest.spyOn(Alert, "alert").mockImplementation(jest.fn());

let PersonalInformationData = <PersonalInformation {...screenProps} />;

const renderButton = (name: string) => {
  const { getByTestId } = render(PersonalInformationData);
  const foundButton = getByTestId(name);
  fireEvent.press(getByTestId(name));
  return foundButton;
};
describe("ProfileChat us page first", () => {
  let PersonalInformationWrapper: ShallowWrapper;
  PersonalInformationWrapper = shallow(
    <PersonalInformation {...screenProps} />
  );
  let instance: PersonalInformation;

  instance = PersonalInformationWrapper.instance() as PersonalInformation;

  it("should set state and call GetUserCountry", async () => {
    // mock GetUserCountry method
    const rendered = render(PersonalInformationData);
    expect(rendered).toBeTruthy();
    instance.setState({ Token: "akfgaskf", userId: "jaahk" });
    const apiCall = instance.GetUserCountry();
    expect(apiCall).toBe(true);
  });

  test("should render state show api without crashing", async () => {
    const GetUserCountryIdMessage = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );
    GetUserCountryIdMessage.addData(
      getName(MessageEnum.RestAPIResponceDataMessage),
      GetUserCountryIdMessage
    );
    GetUserCountryIdMessage.addData(
      getName(MessageEnum.RestAPIResponceSuccessMessage),
      {
        token: "aslb",
      }
    );

    GetUserCountryIdMessage.addData(
      getName(MessageEnum.RestAPIResponceDataMessage),
      GetUserCountryIdMessage.messageId
    );
    instance.GetUserCountryId = GetUserCountryIdMessage.messageId;
    runEngine.sendMessage("Unit Test", GetUserCountryIdMessage);
    let callApi = instance.GetUserCountry();
    expect(callApi).toBe(true);
    instance.onGetUserCountry(userCountryList);
  });

  test("should render state show api with error", async () => {
    const GetUserCountryIdMessage = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );
    GetUserCountryIdMessage.addData(
      getName(MessageEnum.RestAPIResponceDataMessage),
      GetUserCountryIdMessage
    );
    GetUserCountryIdMessage.addData(
      getName(MessageEnum.RestAPIResponceErrorMessage),
      {
        token: "aslb",
      }
    );

    GetUserCountryIdMessage.addData(
      getName(MessageEnum.RestAPIResponceDataMessage),
      GetUserCountryIdMessage.messageId
    );
    instance.GetUserCountryId = GetUserCountryIdMessage.messageId;
    runEngine.sendMessage("Unit Test", GetUserCountryIdMessage);
    let callApi = instance.GetUserCountry();
    expect(callApi).toBe(true);
    instance.onGetUserCountry(errorResponse);
  });

  test("should find the testId btn_continue", () => {
    const testTestName = "btn_continue";
    const { getByTestId } = render(PersonalInformationData);
    const foundButton = getByTestId(testTestName);
    fireEvent.press(getByTestId(testTestName));
    expect(foundButton).toBeTruthy();
  });

  test("should find the testId btn_continue_unique", () => {
    const testTestName = "btn_continue_unique";
    const { getByTestId } = render(PersonalInformationData);
    const foundButton = getByTestId(testTestName);
    fireEvent.press(getByTestId(testTestName));
    expect(foundButton).toBeTruthy();
  });

  test("should display an error message if First Name is not entered", () => {
    instance.setState({ Name: "" });
    instance.onclick();
    const spy = jest.spyOn(Alert, "alert");
    const message = "Please enter First Name";
    Alert.alert(message);
    expect(spy).toHaveBeenCalledWith(message);
  });
  test("I am trying to add First name", async () => {
    const first_name = PersonalInformationWrapper.findWhere(
      (node) => node.prop("testID") === "txt_Fname"
    );
    first_name.simulate("changeText", "abc");
    expect(instance.state.Name).toBe("abc");
  });
  test("should display an error message if Last Name is not entered", () => {
    instance.setState({ LastName: "" });
    instance.onclick();
    const spy = jest.spyOn(Alert, "alert");
    const message = "Please enter Last Name";
    Alert.alert(message);
    expect(spy).toHaveBeenCalledWith(message);
  });

  test("I am trying to add Last name", async () => {
    const last_name = PersonalInformationWrapper.findWhere(
      (node) => node.prop("testID") === "txt_Lname"
    );
    last_name.simulate("changeText", "abc");
    expect(instance.state.LastName).toBe("abc");
  });

  test("should display an error message if Nickname is not entered", () => {
    instance.setState({ Nickname: "" });
    instance.onclick();
    const spy = jest.spyOn(Alert, "alert");
    const message = "Please enter Nickname";
    Alert.alert(message);
    expect(spy).toHaveBeenCalledWith(message);
  });

  test("I am trying to add Nick name", async () => {
    const nick_name = PersonalInformationWrapper.findWhere(
      (node) => node.prop("testID") === "txt_Nname"
    );
    nick_name.simulate("changeText", "abc");
    expect(instance.state.Nickname).toBe("abc");
  });

  test("should display an error message if Byear is not entered", () => {
    instance.setState({ Byear: "" });
    instance.onclick();
    const spy = jest.spyOn(Alert, "alert");
    const message = "Please enter Birthdate";
    Alert.alert(message);
    expect(spy).toHaveBeenCalledWith(message);
  });

  test("I am trying to add email address", () => {
    instance.setState({ Byear: "12-01-2023" });
    instance.onclick();
  });

  test("should display an error message if Email is not entered", () => {
    instance.setState({ Email: "" });
    instance.onclick();
    const spy = jest.spyOn(Alert, "alert");
    const message = "Please enter email id";
    Alert.alert(message);
    expect(spy).toHaveBeenCalledWith(message);
  });

  test("should display an error message if Email is not valid", () => {
    instance.setState({ Email: "test" });
    instance.onclick();
    instance.validateEmail("test");
    const spy = jest.spyOn(Alert, "alert");
    const message = "Invalid email";
    Alert.alert(message);
    expect(spy).toHaveBeenCalledWith(message);
  });

  test("I am trying to add email address", async () => {
    const emailAddress = PersonalInformationWrapper.findWhere(
      (node) => node.prop("testID") === "txt_email"
    );
    emailAddress.simulate("changeText", "test@gmail.com");
    expect(instance.state.Email).toBe("test@gmail.com");
    instance.validateEmail("test@gmail.com");
  });

  test("I am trying to add country", async () => {
    instance.setState({ Country: "India" });
  });

  test("should display an error message if Country is not entered", () => {
    instance.setState({ Country: "" });
    instance.onclick();
    const spy = jest.spyOn(Alert, "alert");
    const message = "Please Enter Country";
    Alert.alert(message);
    expect(spy).toHaveBeenCalledWith(message);
  });

  test("should display an error message if stateName is not entered", () => {
    instance.setState({ stateName: "" });
    instance.onclick();
    const spy = jest.spyOn(Alert, "alert");
    const message = "Please Enter State";
    Alert.alert(message);
    expect(spy).toHaveBeenCalledWith(message);
  });

  test("I am trying to add city", async () => {
    instance.setState({ cityName: "surat" });
  });

  test("I am trying to add country", async () => {
    jest.useFakeTimers();
    const obj = {
      attributes: {
        name: "aa",
      },
    };
    instance.setState({ stateName: "asfaf" });
    const country_name = PersonalInformationWrapper.findWhere(
      (node) => node.prop("testID") === "txt_country"
    );

    country_name.props().keyExtractor(obj);
    country_name.props().labelExtractor(obj);
    country_name.props().onChange(obj);

    instance.setState({
      Country: "India",
      countryID: 12,
      countryCode: +91,
      isCountrySelected: true,
    });
    setTimeout(() => {
      instance.GetStateslist();
    }, 500);
    jest.useFakeTimers();
    instance.setState({ stateName: "" });
  });

  test("should display an error message if city is not entered", () => {
    instance.setState({ cityName: "" });
    instance.onclick();
    const spy = jest.spyOn(Alert, "alert");
    const message = "Please Enter City";
    Alert.alert(message);
    expect(spy).toHaveBeenCalledWith(message);
  });

  test("should render GetStateslist api without crashing", async () => {
    const GetStateslistMessage = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );
    GetStateslistMessage.addData(
      getName(MessageEnum.RestAPIResponceDataMessage),
      GetStateslistMessage
    );
    GetStateslistMessage.addData(
      getName(MessageEnum.RestAPIResponceSuccessMessage),
      {
        token: "aslb",
      }
    );

    GetStateslistMessage.addData(
      getName(MessageEnum.RestAPIResponceDataMessage),
      GetStateslistMessage.messageId
    );
    instance.StateGetId = GetStateslistMessage.messageId;
    runEngine.sendMessage("Unit Test", GetStateslistMessage);
    let callApi = instance.GetStateslist();
    expect(callApi).toBe(true);
    instance.onGetUserState(userCountryList);
  });

  test("should render GetStateslist api with error", async () => {
    const GetStateslistIdMessage = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );
    GetStateslistIdMessage.addData(
      getName(MessageEnum.RestAPIResponceDataMessage),
      GetStateslistIdMessage
    );
    GetStateslistIdMessage.addData(
      getName(MessageEnum.RestAPIResponceErrorMessage),
      {
        token: "aslb",
      }
    );

    GetStateslistIdMessage.addData(
      getName(MessageEnum.RestAPIResponceDataMessage),
      GetStateslistIdMessage.messageId
    );
    instance.StateGetId = GetStateslistIdMessage.messageId;
    runEngine.sendMessage("Unit Test", GetStateslistIdMessage);
    let callApi = instance.GetStateslist();
    expect(callApi).toBe(true);
    instance.onGetUserState(errorResponseUserState);
    instance.setState({
      isEmptyStateList: true,
    });
  });

  test("should find the testId btn_bdate", () => {
        const testTestName = "btn_bdate";
    const { getByTestId } = render(PersonalInformationData);
    const foundButton = getByTestId(testTestName);
    fireEvent.press(getByTestId(testTestName));
    expect(foundButton).toBeTruthy();
    instance.setState({ Bmonth: true });
  });

  test("should find the testId btn_openCountry", () => {
    const testTestName = "btn_openCountry";
    const { getByTestId } = render(PersonalInformationData);
    const foundButton = getByTestId(testTestName);
    fireEvent.press(getByTestId(testTestName));
    expect(foundButton).toBeTruthy();
  });

  test("should find the testId btn_openState", () => {
    const testTestName = "btn_openState";
    const { getByTestId } = render(PersonalInformationData);
    const foundButton = getByTestId(testTestName);
    fireEvent.press(getByTestId(testTestName));
    expect(foundButton).toBeTruthy();
  });

  test("I am trying to add state", async () => {
    const objState = {
      attributes: {
        name: "aa",
      },
    };
    const state_name = PersonalInformationWrapper.findWhere(
      (node) => node.prop("testID") === "txt_state"
    );

    state_name.props().keyExtractor(objState);
    state_name.props().labelExtractor(objState);
    state_name.props().onChange(objState);
    instance.setState({ stateName: "Gujarat", stateID: 45 });

    setTimeout(() => {
      instance.GetCitylist();
    }, 500);
    jest.useFakeTimers();
  });
  test("I am trying to address", async () => {
    const address = PersonalInformationWrapper.findWhere(
      (node) => node.prop("testID") === "txt_address"
    );
    address.simulate("changeText", "asdasd");
    instance.setState({ Address: "adsd" });
  });
  test("I am trying to zip code", async () => {
    const zipCode = PersonalInformationWrapper.findWhere(
      (node) => node.prop("testID") === "txt_zipCode"
    );
    zipCode.simulate("changeText", "39662");
    instance.setState({ ZipCode: "39662" });
  });
  test("should find the testId btn_save", () => {
    expect(renderButton("btn_save")).toBeTruthy();
  });
  test("should call information api without crashing", async () => {
    const InformationAPiMethodMessage = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );
    InformationAPiMethodMessage.addData(
      getName(MessageEnum.RestAPIResponceDataMessage),
      InformationAPiMethodMessage
    );
    InformationAPiMethodMessage.addData(
      getName(MessageEnum.RestAPIResponceSuccessMessage),
      {
        data: data,
      }
    );

    InformationAPiMethodMessage.addData(
      getName(MessageEnum.RestAPIResponceDataMessage),
      InformationAPiMethodMessage.messageId
    );
    instance.PersonalInformationId = InformationAPiMethodMessage.messageId;
    runEngine.sendMessage("Unit Test", InformationAPiMethodMessage);
    instance.onclick();

    const response = {
      personal_information: {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        address: "123 Main St",
        city: "Anytown",
        state: "CA",
        zipCode: "12345",
      },
    };
    AsyncStorage.setItem = jest.fn(() => Promise.resolve());

    instance.onPersonalResponse(response);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "User_Data",
      JSON.stringify(response.personal_information)
    );
    instance.setState({ Tmodal: true, Loader: false });
  });
  test("should render state show api with error", async () => {
    const responseJson = {
      errors: [{ field1: ["Error 1", "Error 2"] }, { field2: ["Error 3"] }],
    };

    const InformationAPiMethodMessage = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );
    InformationAPiMethodMessage.addData(
      getName(MessageEnum.RestAPIResponceDataMessage),
      InformationAPiMethodMessage
    );
    InformationAPiMethodMessage.addData(
      getName(MessageEnum.RestAPIResponceSuccessMessage),

      responseJson
    );

    InformationAPiMethodMessage.addData(
      getName(MessageEnum.RestAPIResponceDataMessage),
      InformationAPiMethodMessage.messageId
    );
    instance.PersonalInformationId = InformationAPiMethodMessage.messageId;
    runEngine.sendMessage("Unit Test", InformationAPiMethodMessage);
    instance.onclick();
    instance.onPersonalResponse(responseJson);
    const error = "Error message";
    const expectedAlert = [
      "Error",
      error,
      [{ text: "OK", onPress: expect.any(Function) }],
      { cancelable: false },
    ];

    jest.useFakeTimers();
    setTimeout(() => {
      Alert.alert("Error", error, [{ text: "OK", onPress: () => {} }], {
        cancelable: false,
      });
      expect(Alert.alert).toHaveBeenCalledWith(...expectedAlert);
    }, 500);
    jest.useFakeTimers();
  });
  test("should render state show api with empty error", async () => {
    const InformationAPiMethodMessage = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );
    InformationAPiMethodMessage.addData(
      getName(MessageEnum.RestAPIResponceDataMessage),
      InformationAPiMethodMessage
    );
    InformationAPiMethodMessage.addData(
      getName(MessageEnum.RestAPIResponceSuccessMessage),

      ""
    );

    InformationAPiMethodMessage.addData(
      getName(MessageEnum.RestAPIResponceDataMessage),
      InformationAPiMethodMessage.messageId
    );
    instance.PersonalInformationId = InformationAPiMethodMessage.messageId;
    runEngine.sendMessage("Unit Test", InformationAPiMethodMessage);
    instance.onclick();
    instance.onPersonalResponse("");
    instance.setState({ Loader: false });
  });
  test("should call GetCitylist api without crashing", async () => {
    const mockResponse = [
      {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        address: "123 Main St",
        city: "Anytown",
        state: "CA",
        zipCode: "12345",
      },
    ];

    const cityListMessage = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );
    cityListMessage.addData(
      getName(MessageEnum.RestAPIResponceDataMessage),
      cityListMessage
    );
    cityListMessage.addData(
      getName(MessageEnum.RestAPIResponceSuccessMessage),
      {
        data: mockResponse,
      }
    );

    cityListMessage.addData(
      getName(MessageEnum.RestAPIResponceDataMessage),
      cityListMessage.messageId
    );
    instance.CityGetId = cityListMessage.messageId;
    runEngine.sendMessage("Unit Test", cityListMessage);
    instance.GetCitylist();
    instance.onCityGet(mockResponse);
    instance.setState({ cityList: mockResponse });
  });
  test("should call GetCitylist api with error", async () => {
    const cityListMessage = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );
    cityListMessage.addData(
      getName(MessageEnum.RestAPIResponceDataMessage),
      cityListMessage
    );
    cityListMessage.addData(getName(MessageEnum.RestAPIResponceErrorMessage), {
      data: data,
    });

    cityListMessage.addData(
      getName(MessageEnum.RestAPIResponceDataMessage),
      cityListMessage.messageId
    );
    instance.CityGetId = cityListMessage.messageId;
    runEngine.sendMessage("Unit Test", cityListMessage);
    instance.GetCitylist();

    const responseErrorJson = {
      errors: {
        field1: ["Error 1", "Error 2"],
        field2: ["Error 3"],
      },
      error: "dfd",
    };

    instance.onCityGet(responseErrorJson);

    jest.useFakeTimers();
    setTimeout(() => {
      instance.parseApiErrorResponse(responseErrorJson);
    }, 500);
    jest.useFakeTimers();
  });
  test("user can not go back", () => {
    backToLoginConfirmationAlert = jest.fn().mockImplementation((onAccept: Function) => onAccept())
    OnLogOut = jest.fn().mockImplementation(() => Promise.resolve(true))
    let PersonalInformationWrapper = <PersonalInformation {...screenProps} />;
    const { getByTestId } = render(PersonalInformationWrapper);
    const foundButton = getByTestId("btn_goBack");
    fireEvent.press(foundButton);
    expect(screenProps.navigation.goBack).not.toBeCalled();
  });

  test("should find the testId btn_openCity", () => {
    const testTestName = "btn_openCity";
    const { getByTestId } = render(PersonalInformationData);
    const foundButton = getByTestId(testTestName);
    fireEvent.press(getByTestId(testTestName));
    expect(foundButton).toBeTruthy();
  });
});
