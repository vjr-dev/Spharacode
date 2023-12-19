//@ts-ignore
//@ts-nocheck
import { shallow, ShallowWrapper } from 'enzyme'
import { render, fireEvent } from "@testing-library/react-native";
import React from "react";
import ProfileChat from '../../src/ProfileChat';
import {View } from 'react-native';

const navigateMock = jest.fn();
const screenProps = {
  navigation: {
    navigate: navigateMock,
    goBack: jest.fn(),
  },
  id: "ProfileChat"
}

const state_list_arr = {
  "id": "11",
  "img": "abklabsf",
  "name": "abc",
}

const state_Arr_Emergancy= [{
  id: '11',
  name: 'abc',
  img: '',
},
{
  id: '12',
  name: 'abcasfasf',
  img: '',
}]

let ProfileChatData = <ProfileChat  {...screenProps} />;

const renderButton = (name:string) =>{
  const { getByTestId } = render(ProfileChatData);
  const foundButton = getByTestId(name);
  fireEvent.press(getByTestId(name));
  return foundButton;
 }

describe("ProfileChat us page first", () => {
  let ProfileChatWrapper: ShallowWrapper;
  ProfileChatWrapper = shallow(<ProfileChat {...screenProps} />);
  let instance: ProfileChat;
  instance = ProfileChatWrapper.instance() as ProfileChat;

  test('ProfileChat will load with out errors',()=>{
    instance.setState({modal2Visible:true,Arr_Emergancy:state_Arr_Emergancy})
  });

  test('FlatList with renderItem', () => {
    let FlatListWrapper: ShallowWrapper;
    FlatListWrapper = shallow(<View> {instance.renderItem(state_list_arr)} </View>);
    expect(FlatListWrapper).toBeTruthy();

  })
  test('should find the testId btn_switch', () => {
    const { getByTestId } = render(ProfileChatData);
    const foundButton = getByTestId('btn_switch');
    fireEvent(foundButton, "onValueChange", true);
  });

  test('should find the testId btn_favSwitch', () => {

    const { getByTestId } = render(ProfileChatData);
    const foundButton = getByTestId('btn_favSwitch');
    fireEvent(foundButton, "onValueChange", true);
  });

  test('should find the testId btn_notficationSwitch', () => {
    const { getByTestId } = render(ProfileChatData);
    const foundButton = getByTestId('btn_notficationSwitch');
    fireEvent(foundButton, "onValueChange", true);
  });
 
  test('should find the testId btn_back', () => {
    expect(renderButton('btn_back')).toBeTruthy();
  });
  test('should find the testId btn_plus', () => {
    expect(renderButton('btn_plus')).toBeTruthy();
  });
  test('should find the testId btn_showModal', () => {
    expect(renderButton('btn_showModal')).toBeTruthy();
    instance.showModal(true);
    instance.setState({modal2Visible:true})
  });
});
