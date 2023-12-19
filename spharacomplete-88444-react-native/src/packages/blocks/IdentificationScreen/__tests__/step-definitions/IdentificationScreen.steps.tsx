//@ts-ignore
//@ts-nocheck

import { shallow, ShallowWrapper } from 'enzyme'
import { render, fireEvent } from "@testing-library/react-native";
import React from "react";
import Identification from '../../src/Identification';
import { Alert, View } from 'react-native';
import MessageEnum, { getName } from 'framework/src/Messages/MessageEnum';
import { Message } from 'framework/src/Message';
import { runEngine } from 'framework/src/RunEngine';
import { pickImageFromCamera, pickImagesFromGellery } from '../../../../components/src/ImagePicker';
import { backToLoginConfirmationAlert } from '../../../../components/src/CustomAlert';
import { OnLogOut } from '../../../../components/src/Navigation/logout';
jest.useFakeTimers()

const mockGetParam = jest.fn().mockReturnValue('IdentificationScreen');
const navigateMock = jest.fn();
const screenProps = {
  navigation: {
    navigate: navigateMock,
    goBack: jest.fn(),
    pop: jest.fn(),
    replace: jest.fn(),
    getParam: mockGetParam,
    addListener: jest.fn(),
  },
  route: {
    params: {
      from: 'SomeOtherScreen'
    }
  },
  id: "Identification"
}


const state_list_arr = {
  "id": "11",
  "name": "urvesh",
}

const state_list = {
  list: [{
    "id": "11",
    "name": "urvesh",
  }], "error": null
}


let IdentificationData = <Identification  {...screenProps} />;
describe("Identification us page first", () => {
  let IdentificationWrapper: ShallowWrapper;
  IdentificationWrapper = shallow(<Identification {...screenProps} />);
  let instance: Identification;

  instance = IdentificationWrapper.instance() as Identification;

  it('should set state and call getData on didFocus event', async () => {
    // mock getData method
    const rendered = render(IdentificationData);
    expect(rendered).toBeTruthy();
    const apiCall = await instance.apiCall()
    expect(apiCall).toBe(true)
  });

  it('should render state show api without crashing', async () => {
    const getIdentificationMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
    getIdentificationMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getIdentificationMessage);
    getIdentificationMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
      {
        state_list
      });

    getIdentificationMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getIdentificationMessage.messageId);
    instance.IdentificationListId = getIdentificationMessage.messageId
    runEngine.sendMessage("Unit Test", getIdentificationMessage);
    let callApi = await instance.apiCall()
    expect(callApi).toBe(true);
    instance.identificationListResponse(state_list.list);
    instance.setState({ Loader: false, id_proof: state_list })
  })

  it('should render state show api with error', async () => {
    const getIdentificationMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
    getIdentificationMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getIdentificationMessage);
    getIdentificationMessage.addData(getName(MessageEnum.RestAPIResponceErrorMessage),
      {
        errors: 'error'
      });

    getIdentificationMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getIdentificationMessage.messageId);
    instance.IdentificationListId = getIdentificationMessage.messageId
    runEngine.sendMessage("Unit Test", getIdentificationMessage);
    let callApi = await instance.apiCall()
    expect(callApi).toBe(true);
    instance.identificationListResponse({ errors: 'abc' });
    instance.setState({ Loader: false })
    const spy = jest.spyOn(Alert, 'alert');
    const message = 'error';
    Alert.alert(message);
    expect(spy).toHaveBeenCalledWith(message);
  })


  test('should find the testId btn_continue', () => {
    instance.setState({ modal: false })
    const testTestName = 'btn_continue'
    const { getByTestId } = render(IdentificationData);
    const foundButton = getByTestId(testTestName);
    fireEvent.press(getByTestId(testTestName));
    expect(foundButton).toBeTruthy();
    instance.onclickModel();
  });

  test('should call btn_continue if from EditProfile', () => {
    const mockGetParam = jest.fn().mockReturnValue('IdentificationScreen');
    const navigateMock = jest.fn();
    const screenProps = {
      navigation: {
        navigate: navigateMock,
        goBack: jest.fn(),
        pop: jest.fn(),
        replase: jest.fn(),
        getParam: mockGetParam,
        addListener: jest.fn(),
      },
      route: {
        params: {
          from: 'EditProfile'
        }
      },
      id: "Identification"
    }

    const IdentificationData = shallow(<Identification {...screenProps} />);



    instance.setState({ modal: true })
    const testTestName = 'btn_continue'
    const { getByTestId } = render(IdentificationData);
    const foundButton = getByTestId(testTestName);
    fireEvent.press(getByTestId(testTestName));
    expect(foundButton).toBeTruthy();
    instance.onclickModel();
  });

  test('should find the testId btn_modalClose', () => {
    const testTestName = 'btn_modalClose'
    const { getByTestId } = render(IdentificationData);
    const foundButton = getByTestId(testTestName);
    fireEvent.press(getByTestId(testTestName));
    expect(foundButton).toBeTruthy();
    instance.showModal2(false)
    instance.setState({ modal2: false })

  });

  test('FlatList with renderItem', () => {
    let FlatListWrapper: ShallowWrapper;
    FlatListWrapper = shallow(<View> {instance.renderItem(state_list_arr)} </View>);

    let buttonComponent = FlatListWrapper.findWhere((node) => node.prop('testID') === 'btn_itemClick');
    buttonComponent.simulate('press')
    expect(FlatListWrapper).toBeTruthy();
    instance.setState({ id_proof_id: 'a', Id_prrof_name: 'abc', modal2: false })

  })

  test('should find the testId btn_openModal', () => {
    const testTestName = 'btn_openModal'
    const { getByTestId } = render(IdentificationData);
    const foundButton = getByTestId(testTestName);
    fireEvent.press(getByTestId(testTestName));
    expect(foundButton).toBeTruthy();
    instance.showModal2(true)
    instance.setState({ modal2: true })

  });

  test('I am trying to add id number for first', async () => {
    instance.setState({ id_proof_id: 1 })
    const last_name = IdentificationWrapper.findWhere(
      (node) => node.prop("testID") === "txt_id_proof_number")

    last_name.simulate("changeText", "")
    expect(instance.state.Id_prrof_Number).toBe("");
    last_name.simulate("changeText", "abc")
    expect(instance.state.Id_prrof_Number).toBe("abc");

  });
  test('I am trying to add id number for second', async () => {
    instance.setState({ id_proof_id: 2 })
    const last_name = IdentificationWrapper.findWhere(
      (node) => node.prop("testID") === "txt_id_proof_number")

    last_name.simulate("changeText", "")
    expect(instance.state.Id_prrof_Number).toBe("");
    last_name.simulate("changeText", "abc")
    expect(instance.state.Id_prrof_Number).toBe("abc");

  });
  test('I am trying to add id number for third', async () => {
    instance.setState({ id_proof_id: 3 })
    const last_name = IdentificationWrapper.findWhere(
      (node) => node.prop("testID") === "txt_id_proof_number")

    last_name.simulate("changeText", "")
    expect(instance.state.Id_prrof_Number).toBe("");
    last_name.simulate("changeText", "abc")
    expect(instance.state.Id_prrof_Number).toBe("abc");

  });
  test('I am trying to add id number for four', async () => {
    instance.setState({ id_proof_id: 4 })
    const last_name = IdentificationWrapper.findWhere(
      (node) => node.prop("testID") === "txt_id_proof_number")

    last_name.simulate("changeText", "")
    expect(instance.state.Id_prrof_Number).toBe("");
    last_name.simulate("changeText", "abc")
    expect(instance.state.Id_prrof_Number).toBe("abc");

  });

  test('I am trying to add id number for other', async () => {
    instance.setState({ id_proof_id: 5 })
    const last_name = IdentificationWrapper.findWhere(
      (node) => node.prop("testID") === "txt_id_proof_number")

    last_name.simulate("changeText", "")
    expect(instance.state.Id_prrof_Number).toBe("");
    last_name.simulate("changeText", "abc")
    expect(instance.state.Id_prrof_Number).toBe("abc");

  });

  test('should select an image successfully', () => {
    const mockImage = {
      path: 'test/path/to/image.jpg',
      data: 'test_base64_data',
    };
    pickImagesFromGellery = jest.fn().mockImplementation(() => Promise.resolve(mockImage));
    const testTestName = 'btn_uploadProof'
    const { getByTestId } = render(IdentificationData);
    const foundButton = getByTestId(testTestName);
    fireEvent.press(getByTestId(testTestName));
    expect(foundButton).toBeTruthy();
    pickImagesFromGellery.mockRestore();
  });

  test('should find the testId btn_TakePhoto', () => {
    const mockImage = {
      path: 'test/path/to/image.jpg',
      data: 'test_base64_data',
    };
  
    pickImageFromCamera = jest.fn().mockImplementation(() => Promise.resolve(mockImage));
    const testTestName = 'btn_TakePhoto'
    const { getByTestId } = render(IdentificationData);
    const foundButton = getByTestId(testTestName);
    fireEvent.press(getByTestId(testTestName));
    expect(foundButton).toBeTruthy();
    pickImageFromCamera.mockRestore();
  });

  test('should upload data without id_proof_id', () => {
    instance.setState({ id_proof_id: "", progressBar: 0.2 })
    const testTestName = 'btn_uploadData'
    const { getByTestId } = render(IdentificationData);
    const foundButton = getByTestId(testTestName);
    fireEvent.press(getByTestId(testTestName));
    expect(foundButton).toBeTruthy();
    instance.onUploadData()

    const spy = jest.spyOn(Alert, 'alert');
    const message = 'Please Select Id';
    Alert.alert(message);
    expect(spy).toHaveBeenCalledWith(message);
  });

  test('should upload data without Id_prrof_Number', () => {
    instance.setState({ id_proof_id: "1", Id_prrof_Number: "", progressBar: 0.2 })
    const testTestName = 'btn_uploadData'
    const { getByTestId } = render(IdentificationData);
    const foundButton = getByTestId(testTestName);
    fireEvent.press(getByTestId(testTestName));
    expect(foundButton).toBeTruthy();
    instance.onUploadData()

    const spy = jest.spyOn(Alert, 'alert');
    const message = 'Please Enter ID number';
    Alert.alert(message);
    expect(spy).toHaveBeenCalledWith(message);
  });

  test('should upload data without images', () => {
    instance.setState({ id_proof_id: "1", Id_prrof_Number: "a", images: '', progressBar: 0.2 })
    const testTestName = 'btn_uploadData'
    const { getByTestId } = render(IdentificationData);
    const foundButton = getByTestId(testTestName);
    fireEvent.press(getByTestId(testTestName));
    expect(foundButton).toBeTruthy();
    instance.onUploadData()

    const spy = jest.spyOn(Alert, 'alert');
    const message = 'Please Select Image';
    Alert.alert(message);
    expect(spy).toHaveBeenCalledWith(message);
  });
  test("user can not go back when comming from personal detail screen", () => {
    let tempProps = {...screenProps};
    tempProps.route.params.from = "PersonalDetailsScreen";
    backToLoginConfirmationAlert = jest.fn().mockImplementation((onAccept: Function) => onAccept())
    OnLogOut = jest.fn().mockImplementation(() => Promise.resolve(true))
    let IdentificationData = <Identification {...tempProps} />;
    const { getByTestId } = render(IdentificationData);
    const foundButton = getByTestId("btn_goBack");
    fireEvent.press(foundButton);
    expect(Alert.alert).toBeCalled();
  });
  test('should find the testId btn_goBack', () => {
    const testTestName = 'btn_goBack'
    const tempProps = {...screenProps};
    tempProps.route.params.from = "EditProfile";
    const tempIdentificationData = shallow(<Identification {...tempProps} />);
    const { getByTestId } = render(tempIdentificationData);
    const foundButton = getByTestId(testTestName);
    fireEvent.press(getByTestId(testTestName));
    expect(foundButton).toBeTruthy();

  });


  test('should find the testId btn_uploadData', () => {
    instance.setState({ id_proof_id: "2", progressBar: 0.2, Id_prrof_Number: 'abc', images: 'akvakj', Loader: false })
    const testTestName = 'btn_uploadData'
    const { getByTestId } = render(IdentificationData);
    const foundButton = getByTestId(testTestName);
    fireEvent.press(getByTestId(testTestName));
    expect(foundButton).toBeTruthy();

    const images = {
      data: "data:image/jpeg;base64,dkjvgdsjkfgkdsjgfjk" 
    }
    const attrs = {
      identity_proof_id: 55,
      id_number: 'sdjsd',
      id_proof: images

    };
    const data1 = {
      attributes: attrs
    };


      const identificationMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      identificationMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), identificationMessage);
      identificationMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data:data1
        });

        identificationMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), identificationMessage.messageId);
      instance.IdentificationId = identificationMessage.messageId
      runEngine.sendMessage("Unit Test", identificationMessage);
      instance.identificationResponse({data:"sucess"});
      instance.setState({ Loader: false, progressBar: 1 })
      jest.advanceTimersByTime(900);
      instance.setState({ modal: true, })

  });

  test('should render state show api with error', async () => {
    const getIdentificationMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
    getIdentificationMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getIdentificationMessage);
    getIdentificationMessage.addData(getName(MessageEnum.RestAPIResponceErrorMessage),
      {
        errors: 'error'
      });

    getIdentificationMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getIdentificationMessage.messageId);
    instance.IdentificationId = getIdentificationMessage.messageId
    runEngine.sendMessage("Unit Test", getIdentificationMessage);
    let callApi =  instance.onUploadData()
    expect(callApi).toBe(true);
    instance.identificationResponse({ errors: 'abc' });
    instance.setState({ Loader: false })
    const spy = jest.spyOn(Alert, 'alert');
    const message = 'error';
    Alert.alert(message);
    expect(spy).toHaveBeenCalledWith(message);
  })



});
