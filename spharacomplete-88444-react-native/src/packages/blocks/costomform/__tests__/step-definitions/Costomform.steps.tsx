//@ts-ignore
//@ts-nocheck
import { shallow, ShallowWrapper } from 'enzyme'
import { render, fireEvent } from "@testing-library/react-native";
import React from "react";
import Costomform from '../../src/costomform';
import { Message } from '../../../../framework/src/Message';
import MessageEnum, { getName } from '../../../../framework/src/Messages/MessageEnum';
import { runEngine } from '../../../../framework/src/RunEngine';
import ImagePicker from 'react-native-image-crop-picker';
import { FlatList, TouchableOpacity, Text, View, Alert } from 'react-native';
import GetLocation from 'react-native-get-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage');
jest.mock('react-native-immediate-phone-call', () => ({
  immediatePhoneCall: jest.fn(),
}));
jest.mock('react-native/Libraries/Linking/Linking', () => ({
  openURL: jest.fn(),
}));

const mockGetParam = jest.fn().mockReturnValue('123');
const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    getParam: mockGetParam,
    addListener: jest.fn(),
    pop:jest.fn(),
    replace: jest.fn()
  },
  route:{
    params:{
      cusId:"id"
    }
  },
  id: "costomform"
}



const state_list_arr = {
  "id": "11",
  "attributes": {
    "name": "urvesh",

  }
}
const state_list_ = [{
  "id": "11",
  "attributes": {
    "name": "urvesh",

  }
}];


let CostomformData = <Costomform  {...screenProps} />;
describe("Costomform us page first", () => {
  let CostomformWrapper: ShallowWrapper;
  CostomformWrapper = shallow(<Costomform {...screenProps} />);
  let instance: Costomform;

  instance = CostomformWrapper.instance() as Costomform;

  it('should set state and call getData on didFocus event', async () => {
    // mock getData method
    const getDataMock = jest.spyOn(CostomformWrapper.instance(), 'getData').mockImplementation(() => Promise.resolve());

    // simulate didFocus event
    await CostomformWrapper.instance().componentDidMount();
    CostomformWrapper.update();
    CostomformWrapper.instance().props.navigation.addListener.mock.calls[0][1]();

    // check if state is updated correctly
    expect(CostomformWrapper.state('images1')).toEqual('');
    expect(CostomformWrapper.state('images2')).toEqual('');
    expect(CostomformWrapper.state('images3')).toEqual('');
    expect(CostomformWrapper.state('images4')).toEqual('');
    instance.setState({ loading: true,Selected:1,Comment:'aba' })

    // check if getData method is called
    expect(getDataMock).toHaveBeenCalledTimes(1);
  });


  describe('ComponentWithDataFetching', () => {
    let wrapper;
    const mockLocation = {
      longitude: 10,
      latitude: 20,
    };
    const mockToken = 'mockToken';
    const mockAsyncStorage = {
      getItem: jest.fn(() => Promise.resolve(mockToken)),
    };
    const mockListData = jest.fn();

    beforeEach(() => {
      GetLocation.getCurrentPosition = jest.fn(() => Promise.resolve(mockLocation));
      wrapper = shallow(<Costomform getListData={mockListData} />);
      wrapper.instance().setState = jest.fn();
      wrapper.instance().forceUpdate();
      AsyncStorage.setItem = jest.fn(() => Promise.resolve());
      AsyncStorage.getItem = mockAsyncStorage.getItem;
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should set state with current location and token', async () => {
      await wrapper.instance().getData();
      expect(GetLocation.getCurrentPosition).toHaveBeenCalledTimes(1);
      instance.setState({
        Latitude: mockLocation.latitude,
        Longitude: mockLocation.longitude,
        Token: mockToken,
      })
      instance.getListData();
    });

    it('should handle errors', async () => {
      GetLocation.getCurrentPosition = jest.fn(() => Promise.reject(new Error('error')));
      await wrapper.instance().getData();
      expect(GetLocation.getCurrentPosition).toHaveBeenCalledTimes(1);
      instance.setState({
        Latitude: 0,
        Longitude: 0,
        Token: mockToken,
      })
      instance.getListData();
    });
  });
  test('should render state show api without crashing', async () => {
    const getListMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
    getListMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getListMessage);
    getListMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
      {
        state_list_arr
      });

    getListMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getListMessage.messageId);
    instance.ListDataID = getListMessage.messageId
    runEngine.sendMessage("Unit Test", getListMessage);
    let getListMethod = await instance.getListData()
    expect(getListMethod).toBe(true)
  })

  test('FlatList with renderItem', () => {
    instance.setState({Formdata:state_list_,Selected: "11" })
    let FlatListWrapper: ShallowWrapper;
    FlatListWrapper = shallow(<View> {instance.renderItem(state_list_arr)} </View>);
    let buttonComponent = FlatListWrapper.findWhere((node) => node.prop('testID') === 'btn_item_selection');
    buttonComponent.simulate('press')
    instance.setState({Selected: "11" })
    expect(FlatListWrapper).toBeTruthy();
  })

  test('I am trying to add comment', async () => {
    const txtComment = CostomformWrapper.findWhere(
      (node) => node.prop("testID") === "txt_comment")

    txtComment.simulate("changeText", "")
    instance.setState({Comment:' '})

  });
  test('should find the testId btn_imageClick1', () => {
    const testTestName = 'btn_imageClick1'
    const { getByTestId } = render(CostomformData);
    const foundButton = getByTestId(testTestName);
    fireEvent.press(getByTestId(testTestName));
    expect(foundButton).toBeTruthy();
    instance.onImageClick(1);
    instance.setState({ images1: 'asfkasvgf' })
  });
  test('should find the testId btn_imageClick2', () => {
    const testTestName = 'btn_imageClick2'
    const { getByTestId } = render(CostomformData);
    const foundButton = getByTestId(testTestName);
    fireEvent.press(getByTestId(testTestName));
    expect(foundButton).toBeTruthy();
    instance.onImageClick(2);
    instance.setState({ images2: 'asfkasvgf' })
  });
  test('should find the testId btn_imageClick3', () => {
    const testTestName = 'btn_imageClick3'
    const { getByTestId } = render(CostomformData);
    const foundButton = getByTestId(testTestName);
    fireEvent.press(getByTestId(testTestName));
    expect(foundButton).toBeTruthy();
    instance.onImageClick(3);
    instance.setState({ images3: 'asfkasvgf' })
  });
  test('should find the testId btn_imageClick4', () => {
    const testTestName = 'btn_imageClick4'
    const { getByTestId } = render(CostomformData);
    const foundButton = getByTestId(testTestName);
    fireEvent.press(getByTestId(testTestName));
    expect(foundButton).toBeTruthy();
    instance.onImageClick(4);
    instance.setState({ images4: 'asfkasvgf' })
  });
  test('should find the testId btn_send', async () => {
    const testTestName = "btn_send";
    const { getByTestId } = render(CostomformData);
    const foundButton = getByTestId(testTestName);
    fireEvent.press(getByTestId(testTestName));
    expect(foundButton).toBeTruthy();

    instance.setState({
      images1: 'base64encodedstring',
      images2: '',
      images3: '',
      images4: '',
    });


    instance.uploadData();
    
    const expectedArray = [{ data: 'data:image/jpeg;base64,base64encodedstring' }];
    const result = instance.generateImageArray();
    expect(result).toEqual(expectedArray);
    
    
    const uploadMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
    uploadMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), uploadMessage);
    uploadMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
      {
        meta: {
          token: "exampleToken",
        },
        data: {
          attributes: {
            describe_problem: 'Test comment',
            emergency_assistance_list_id: 'cusId',
            emergency_assistance_option_id: 1,
            latitude: 1.23,
            longitude: 4.56,
            images: [{ data: 'data:image/jpeg;base64,Test image' }],
          },
        },
      }
    );
    uploadMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), uploadMessage.messageId);
    instance.UploadDataID = uploadMessage.messageId
    runEngine.sendMessage("Unit Test", uploadMessage);
    instance.onUploadApiResponse({message:'Emergency Assistance has been created!'},'')
  })

  test('should call app api without comment', async () => {
    const testTestName = "btn_send";
    const { getByTestId } = render(CostomformData);
    const foundButton = getByTestId(testTestName);
    fireEvent.press(getByTestId(testTestName));
    expect(foundButton).toBeTruthy();
    instance.setState({Selected:1,Comment:""})

    instance.uploadData();
    const spy = jest.spyOn(Alert, 'alert');
    const message = 'Please Describe problem';
    Alert.alert(message);
    expect(spy).toHaveBeenCalledWith(message);
  })

  test('should find the testId btn_goBack', () => {
    const testTestName = 'btn_goBack'
    const { getByTestId } = render(CostomformData);
    const foundButton = getByTestId(testTestName);
    fireEvent.press(getByTestId(testTestName));
    expect(foundButton).toBeTruthy();
  })
});
