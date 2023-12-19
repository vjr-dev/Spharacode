//@ts-nocheck
//@ts-ignore
import { shallow, ShallowWrapper } from "enzyme";
import { render, fireEvent } from "@testing-library/react-native";
import React from "react";
import ChannelsInSocial from "../../src/Channels";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    replace: jest.fn()
  },
  screenProps: {
    navigationProp: {
      navigate: jest.fn(),
    },
  },
  id: "ChannelsInSocial"
};
const data = [
  { name: "#NewYearParty", id: 1, unreadmsg: 9 },
  { name: "#Learning", id: 2 },
  { name: "#CSM", id: 3 },
  { name: "#Together", id: 4 },
  { name: "#JH", id: 5 },
  { name: "#CH12", id: 6 },
  { name: "#Channel", id: 7 }
];

let ChannelsData = <ChannelsInSocial {...screenProps} />;
describe("Channels us page first", () => {
  let ChannelsWrapper: ShallowWrapper;
  ChannelsWrapper = shallow(<ChannelsInSocial {...screenProps} />);
  let instance: ChannelsInSocial;

  instance = ChannelsWrapper.instance() as ChannelsInSocial;

  it("should render Channels screen without crashing", async () => {
    const rendered = render(ChannelsData);
    expect(rendered).toBeTruthy();
  });

  test("should find the testId btn_Public_Tab", () => {
    const testTestName = "btn_Public_Tab";
    const { getByTestId } = render(ChannelsData);
    const foundButton = getByTestId(testTestName);
    fireEvent.press(getByTestId(testTestName));
    expect(foundButton).toBeTruthy();
    instance.onTabPress(0);
    instance.setState({ visibleTab: 0 });
  });
  test("should find the testId btn_Private_Tab", () => {
    const testTestName = "btn_Private_Tab";
    const { getByTestId } = render(ChannelsData);
    const foundButton = getByTestId(testTestName);
    fireEvent.press(getByTestId(testTestName));
    expect(foundButton).toBeTruthy();
    instance.onTabPress(0);
    instance.setState({ visibleTab: 1 });
  });

  test("I can search person with out errors", () => {
    const rendered = render(ChannelsData);
    const inputSearch = rendered.getByTestId("txt_enter_search");
    expect(inputSearch).toBeTruthy();
    fireEvent.changeText(inputSearch, "test");
    instance.onSearch("test");
    instance.setState({ Channels: data });
  });

  test("should find the testId btn_menu_open", () => {
    const testTestName = "btn_menu_open";
    const { getByTestId } = render(ChannelsData);
    const foundButton = getByTestId(testTestName);
    fireEvent.press(getByTestId(testTestName));
    expect(foundButton).toBeTruthy();
    instance.showModal(true);
  });

  test("should find the testId btn_GoBack_To_Home", () => {
    const testTestName = "btn_GoBack_To_Home";
    const { getByTestId } = render(ChannelsData);
    const foundButton = getByTestId(testTestName);
    fireEvent.press(getByTestId(testTestName));
    expect(foundButton).toBeTruthy();
    instance.GoBackToHomeScreen();
  });
});
