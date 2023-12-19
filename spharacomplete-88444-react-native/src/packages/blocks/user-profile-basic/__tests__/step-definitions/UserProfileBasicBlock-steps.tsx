//@ts-ignore
//@ts-nocheck
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "framework/src/Helpers";
import { runEngine } from "framework/src/RunEngine";
import { Message } from "framework/src/Message";

import MessageEnum, {
  getName,
} from "framework/src/Messages/MessageEnum";
import React from "react";
import { Platform} from "react-native";
import GetLocation from "react-native-get-location";
import UserProfileBasicBlock from "../../src/UserProfileBasicBlock";
import { Image, Text } from 'react-native';
const navigation = require("react-navigation");

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    addListener: jest.fn().mockImplementation((ev, cb) => {
      return cb();
    }),
    pop:jest.fn()
  },
  id: "UserProfileBasicBlock",
};

jest.mock("react-native/Libraries/Utilities/Platform", () => ({
  OS: "android",
  select: () => null,
}));

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest
    .fn()
    .mockImplementationOnce((key) => {
      console.log("_----key", key);
      if (key === "Token") return "0";
      if (key === "User_Data") return "0";
      return "Token";
    })
    .mockImplementation(() => null),
  setItem: jest.fn(),
}));

let mockTimer: any;

jest
  .spyOn(global, "setTimeout")
  .mockImplementation((cb: any) => (mockTimer = cb));


  global.fetch = jest
  .fn()
  .mockImplementationOnce(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          meetingId : '1234',
          results :{formatted_address:[0]}
        }),
      text: () =>
        Promise.resolve({
           meetingId : "1234"
        }),
    })
  )
  .mockImplementation(() => Promise.reject("Fetch failed"));

const feature = loadFeature(
  "./__tests__/features/UserProfileBasicBlock-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to UserProfileBasicBlock", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: UserProfileBasicBlock;

    given("I am a User loading UserProfileBasicBlock", () => {
      exampleBlockA = shallow(<UserProfileBasicBlock {...screenProps} />);
    });

    when("I navigate to the UserProfileBasicBlock", () => {
      instance = exampleBlockA.instance() as UserProfileBasicBlock;
    });

    then("UserProfileBasicBlock will load with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can click goback button with out error", () => {
       const gobackBtnComponent = exampleBlockA.findWhere((node) => node.prop("testID") === "gobackBtn")
       gobackBtnComponent.simulate("press")
    });

    then("I can click public button with out error", () => {
      const publicBtnComponent = exampleBlockA.findWhere((node) => node.prop("testID") === "publicBtn")
      publicBtnComponent.simulate("press")
    });
    
    then("I can click private button with out error", () => {
      const privateBtnComponent = exampleBlockA.findWhere((node) => node.prop("testID") === "privateBtn")
      privateBtnComponent.simulate("press")
      instance.setState({ProfileImage : true})
      instance.setState({MainProfile : [0]})
      
    });

    then("I can click editProfile button with out error", () => {
      const editProfileBtnComponent = exampleBlockA.findWhere((node) => node.prop("testID") === "editProfileBtn")
      editProfileBtnComponent.simulate("press")
    });
   
    then("display flatlist data", () => {
      let flatlistData = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "flatlistData"
      );
      expect(flatlistData).toBeTruthy();
      flatlistData.at(0).props().keyExtractor("3");
      const flat = shallow(
        flatlistData.at(0).props().ListFooterComponent({
          
        })
      );
      const pluseClickComponent = flat.findWhere(
        (node) => node.prop("testID") === "pluseClickBtn"
      );
      pluseClickComponent.simulate("press");

      flatlistData.at(0).props().renderItem({
        item : {
          attributes: {
            profile_image: 'https://example.com/profile.jpg',
          },
        }
      })

      const Arr_Emer = '[{"attributes": {"account_id": 892, "contact_type": "emergency_contact", "created_at": "2023-01-18T15:32:39.056+05:30", "name": "Rishi", "phone_number": "9562457800", "profile_image": "https://spharacomplete-88444-ruby.b88444.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZ29FIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--70d5505ce9be456989c52c9987bea8d50e633139/1674647470"}, "id": "1736", "type": "friends"}, {"attributes": {"account_id": 892, "contact_type": "emergency_contact", "created_at": "2023-01-20T13:04:28.672+05:30", "name": "javed", "phone_number": "8989900995", "profile_image": "https://spharacomplete-88444-ruby.b88444.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBc2tFIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--96cdd462da269c0ac9d1416280e187bfc9a6d7e5/1687256359"}, "id": "1757", "type": "friends"}, {"attributes": {"account_id": 892, "contact_type": "emergency_contact", "created_at": "2023-03-17T21:40:23.096+05:30", "name": "pk singh", "phone_number": "7355438342", "profile_image": "https://spharacomplete-88444-ruby.b88444.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBajBGIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--d78ce84eafdf7350d85c01440fe38249c27bd793/1692204348"}, "id": "1785", "type": "friends"}, {"attributes": {"account_id": 892, "contact_type": "emergency_contact", "created_at": "2023-04-05T18:08:32.314+05:30", "name": "Deep", "phone_number": "9898989898", "profile_image": "https://spharacomplete-88444-ruby.b88444.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaDBHIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c5e7130372c0422afcada32c5a68aa154ee8ab1f/1695972960"}, "id": "1801", "type": "friends"}, {"attributes": {"account_id": 892, "contact_type": "emergency_contact", "created_at": "2023-04-05T19:54:16.942+05:30", "name": "Sapna2", "phone_number": "9692543250", "profile_image": null}, "id": "1803", "type": "friends"}, {"attributes": {"account_id": 892, "contact_type": "emergency_contact", "created_at": "2023-05-08T13:42:26.598+05:30", "name": "sneha", "phone_number": "7004332409", "profile_image": null}, "id": "1899", "type": "friends"}, {"attributes": {"account_id": 892, "contact_type": "emergency_contact", "created_at": "2023-05-12T21:15:10.289+05:30", "name": "demonumber95", "phone_number": "9595959595", "profile_image": null}, "id": "1936", "type": "friends"}, {"attributes": {"account_id": 892, "contact_type": "emergency_contact", "created_at": "2023-10-25T15:01:06.428+05:30", "name": "karthick", "phone_number": "9632589621", "profile_image": "https://spharacomplete-88444-ruby.b88444.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcWdHIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--32cad9dcc1fde276cdf9aa77c7a0b9861cabf0d9/1698324727"}, "id": "2618", "type": "friends"}]'
     const Arr_Emergency =  JSON.parse(Arr_Emer)

     console.log("PARSER",Arr_Emergency)

     const  wrapper = shallow(<UserProfileBasicBlock {...screenProps} Arr_Emergency = {Arr_Emergency} />);
      
      const imageComponent = wrapper.find(Image);

      const flatList = wrapper.findWhere((node) => node.prop("testID") === "flatlistData");

      console.log("Chamoli",flatList.debug())

     // const flatlist = wrapper.find('[testID="listData"]');
  const renderItem = flatList.at(0).prop('renderItem')({ item: Arr_Emergency[0] }); // Get the rendered FlatList item

  // Dive into the rendered renderItem component to find Image and Text components
  const image = shallow(renderItem).find(Image);
  
  console.log("WERFGTT$@RET",image.debug())
  const text = shallow(renderItem).find(Text);

  // Expectations for Image and Text components
  expect(image.prop('source')).toEqual({
    uri: Arr_Emergency[0].attributes?.profile_image || 'DEFAULT_IMAGE_URL'
  });
  expect(text.children().text()).toBe(Arr_Emergency[0].attributes?.name);


    });

      
    then("display list data", () => {
    
    let flatlistData = exampleBlockA.findWhere(
      (node) => node.prop("testID") === "flatlistData"
    );
    expect(flatlistData).toBeTruthy();
    flatlistData.at(0).props().keyExtractor("3");
    const flat = shallow(
      flatlistData.at(0).props().ListFooterComponent({
        
      })
    );
    const pluseClickComponent = flat.findWhere(
      (node) => node.prop("testID") === "pluseClickBtn"
    );
    pluseClickComponent.simulate("press",instance.handleButtonClick(2));

    flatlistData.at(0).props().renderItem({
      item : {
        attributes: {
          profile_image: 'https://example.com/profile.jpg',
        },
      }
    })

    const Arr_Emer = '[{"attributes": {"account_id": 892, "contact_type": "emergency_contact", "created_at": "2023-01-18T15:32:39.056+05:30", "name": "Rishi", "phone_number": "9562457800", "profile_image": "https://spharacomplete-88444-ruby.b88444.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZ29FIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--70d5505ce9be456989c52c9987bea8d50e633139/1674647470"}, "id": "1736", "type": "friends"}, {"attributes": {"account_id": 892, "contact_type": "emergency_contact", "created_at": "2023-01-20T13:04:28.672+05:30", "name": "javed", "phone_number": "8989900995", "profile_image": "https://spharacomplete-88444-ruby.b88444.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBc2tFIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--96cdd462da269c0ac9d1416280e187bfc9a6d7e5/1687256359"}, "id": "1757", "type": "friends"}, {"attributes": {"account_id": 892, "contact_type": "emergency_contact", "created_at": "2023-03-17T21:40:23.096+05:30", "name": "pk singh", "phone_number": "7355438342", "profile_image": "https://spharacomplete-88444-ruby.b88444.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBajBGIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--d78ce84eafdf7350d85c01440fe38249c27bd793/1692204348"}, "id": "1785", "type": "friends"}, {"attributes": {"account_id": 892, "contact_type": "emergency_contact", "created_at": "2023-04-05T18:08:32.314+05:30", "name": "Deep", "phone_number": "9898989898", "profile_image": "https://spharacomplete-88444-ruby.b88444.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaDBHIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c5e7130372c0422afcada32c5a68aa154ee8ab1f/1695972960"}, "id": "1801", "type": "friends"}, {"attributes": {"account_id": 892, "contact_type": "emergency_contact", "created_at": "2023-04-05T19:54:16.942+05:30", "name": "Sapna2", "phone_number": "9692543250", "profile_image": null}, "id": "1803", "type": "friends"}, {"attributes": {"account_id": 892, "contact_type": "emergency_contact", "created_at": "2023-05-08T13:42:26.598+05:30", "name": "sneha", "phone_number": "7004332409", "profile_image": null}, "id": "1899", "type": "friends"}, {"attributes": {"account_id": 892, "contact_type": "emergency_contact", "created_at": "2023-05-12T21:15:10.289+05:30", "name": "demonumber95", "phone_number": "9595959595", "profile_image": null}, "id": "1936", "type": "friends"}, {"attributes": {"account_id": 892, "contact_type": "emergency_contact", "created_at": "2023-10-25T15:01:06.428+05:30", "name": "karthick", "phone_number": "9632589621", "profile_image": "https://spharacomplete-88444-ruby.b88444.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcWdHIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--32cad9dcc1fde276cdf9aa77c7a0b9861cabf0d9/1698324727"}, "id": "2618", "type": "friends"}]'
   const Arr_Emergency =  JSON.parse(Arr_Emer)

   console.log("PARSER",Arr_Emergency)

   const  wrapper = shallow(<UserProfileBasicBlock {...screenProps} Arr_Emergency = {Arr_Emergency} />);
    
    const imageComponent = wrapper.find(Image);

    const flatList = wrapper.findWhere((node) => node.prop("testID") === "flatlistData");

    console.log("Chamoli",flatList.debug())

   // const flatlist = wrapper.find('[testID="listData"]');
const renderItem = flatList.at(0).prop('renderItem')({ item: Arr_Emergency[0] }); // Get the rendered FlatList item

// Dive into the rendered renderItem component to find Image and Text components
const image = shallow(renderItem).find(Image);

console.log("WERFGTT$@RET",image.debug())
const text = shallow(renderItem).find(Text);

// Expectations for Image and Text components
expect(image.prop('source')).toEqual({
  uri: Arr_Emergency[0].attributes?.profile_image || 'DEFAULT_IMAGE_URL'
});
expect(text.children().text()).toBe(Arr_Emergency[0].attributes?.name);

      


    });

    then("display ArrFamily data", () => {


    let flatlistData = exampleBlockA.findWhere(
      (node) => node.prop("testID") === "flatlistData"
    );
    expect(flatlistData).toBeTruthy();
    flatlistData.at(0).props().keyExtractor("3");
    const flat = shallow(
      flatlistData.at(0).props().ListFooterComponent({
        
      })
    );
    const pluseClickComponent = flat.findWhere(
      (node) => node.prop("testID") === "pluseClickBtn"
    );
    pluseClickComponent.simulate("press",instance.handleButtonClick(3));

    flatlistData.at(0).props().renderItem({
      item : {
        attributes: {
          profile_image: 'https://example.com/profile.jpg',
        },
      }
    })

    const Arr_Emer = '[{"attributes": {"account_id": 892, "contact_type": "emergency_contact", "created_at": "2023-01-18T15:32:39.056+05:30", "name": "Rishi", "phone_number": "9562457800", "profile_image": "https://spharacomplete-88444-ruby.b88444.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZ29FIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--70d5505ce9be456989c52c9987bea8d50e633139/1674647470"}, "id": "1736", "type": "friends"}, {"attributes": {"account_id": 892, "contact_type": "emergency_contact", "created_at": "2023-01-20T13:04:28.672+05:30", "name": "javed", "phone_number": "8989900995", "profile_image": "https://spharacomplete-88444-ruby.b88444.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBc2tFIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--96cdd462da269c0ac9d1416280e187bfc9a6d7e5/1687256359"}, "id": "1757", "type": "friends"}, {"attributes": {"account_id": 892, "contact_type": "emergency_contact", "created_at": "2023-03-17T21:40:23.096+05:30", "name": "pk singh", "phone_number": "7355438342", "profile_image": "https://spharacomplete-88444-ruby.b88444.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBajBGIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--d78ce84eafdf7350d85c01440fe38249c27bd793/1692204348"}, "id": "1785", "type": "friends"}, {"attributes": {"account_id": 892, "contact_type": "emergency_contact", "created_at": "2023-04-05T18:08:32.314+05:30", "name": "Deep", "phone_number": "9898989898", "profile_image": "https://spharacomplete-88444-ruby.b88444.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaDBHIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c5e7130372c0422afcada32c5a68aa154ee8ab1f/1695972960"}, "id": "1801", "type": "friends"}, {"attributes": {"account_id": 892, "contact_type": "emergency_contact", "created_at": "2023-04-05T19:54:16.942+05:30", "name": "Sapna2", "phone_number": "9692543250", "profile_image": null}, "id": "1803", "type": "friends"}, {"attributes": {"account_id": 892, "contact_type": "emergency_contact", "created_at": "2023-05-08T13:42:26.598+05:30", "name": "sneha", "phone_number": "7004332409", "profile_image": null}, "id": "1899", "type": "friends"}, {"attributes": {"account_id": 892, "contact_type": "emergency_contact", "created_at": "2023-05-12T21:15:10.289+05:30", "name": "demonumber95", "phone_number": "9595959595", "profile_image": null}, "id": "1936", "type": "friends"}, {"attributes": {"account_id": 892, "contact_type": "emergency_contact", "created_at": "2023-10-25T15:01:06.428+05:30", "name": "karthick", "phone_number": "9632589621", "profile_image": "https://spharacomplete-88444-ruby.b88444.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcWdHIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--32cad9dcc1fde276cdf9aa77c7a0b9861cabf0d9/1698324727"}, "id": "2618", "type": "friends"}]'
   const Arr_Emergency =  JSON.parse(Arr_Emer)

   console.log("PARSER",Arr_Emergency)

   const  wrapper = shallow(<UserProfileBasicBlock {...screenProps} Arr_Emergency = {Arr_Emergency} />);
    
    const imageComponent = wrapper.find(Image);

    const flatList = wrapper.findWhere((node) => node.prop("testID") === "flatlistData");

    console.log("Chamoli",flatList.debug())

   // const flatlist = wrapper.find('[testID="listData"]');
const renderItem = flatList.at(0).prop('renderItem')({ item: Arr_Emergency[0] }); // Get the rendered FlatList item

// Dive into the rendered renderItem component to find Image and Text components
const image = shallow(renderItem).find(Image);

console.log("WERFGTT$@RET",image.debug())
const text = shallow(renderItem).find(Text);

// Expectations for Image and Text components
expect(image.prop('source')).toEqual({
  uri: Arr_Emergency[0].attributes?.profile_image || 'DEFAULT_IMAGE_URL'
});
expect(text.children().text()).toBe(Arr_Emergency[0].attributes?.name);
      
    });

    then("I can click healthBtn button with out error", () => {
      const healthBtnComponent = exampleBlockA.findWhere((node) => node.prop("testID") === "healthBtn")
      healthBtnComponent.simulate("press")
    });

    then("I can click identificationBtn button with out error", () => {
      const identificationBtnComponent = exampleBlockA.findWhere((node) => node.prop("testID") === "identificationBtn")
      identificationBtnComponent.simulate("press")
    });

    then("CountryGetId request response successfully", () => {
      const mockResponse = {
        data: {},
      };

      const apiMsg = new Message(getName(MessageEnum.RestAPIResponceMessage));

      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiMsg.messageId
      );

      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponse
      );

      instance.CountryGetId = apiMsg.messageId;
      runEngine.sendMessage("Unit Test", apiMsg);

      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
        mockResponse
      );

      instance.CountryGetId = apiMsg.messageId;
      runEngine.sendMessage("Unit Test", apiMsg);
      const mockResponseError = {
         errors : null,
      };
      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponseError
      );

      instance.CountryGetId = apiMsg.messageId;
      runEngine.sendMessage("Unit Test", apiMsg);
    });

    then("CountryGetId request response error", () => {
      const mockResponse = {
        error : "sneha"
      };

      const apiMsg = new Message(getName(MessageEnum.RestAPIResponceMessage));

      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiMsg.messageId
      );

      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponse
      );

      instance.CountryGetId = apiMsg.messageId;
      runEngine.sendMessage("Unit Test", apiMsg);
    });

    then("GetUserCountryId request response successfully", () => {
      const mockResponse = {
        data: {},
      };

      const apiMsg = new Message(getName(MessageEnum.RestAPIResponceMessage));

      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiMsg.messageId
      );

      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponse
      );

      instance.GetUserCountryId = apiMsg.messageId;
      runEngine.sendMessage("Unit Test", apiMsg);
      const mockResponseError = {
         errors : null,
      };
      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponseError
      );

      instance.GetUserCountryId = apiMsg.messageId;
      runEngine.sendMessage("Unit Test", apiMsg);
    });

    then("GetUserCountryId request response error", () => {
      const mockResponse = {
        error : "sneha"
      };

      const apiMsg = new Message(getName(MessageEnum.RestAPIResponceMessage));

      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiMsg.messageId
      );

      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponse
      );

      instance.GetUserCountryId = apiMsg.messageId;
      runEngine.sendMessage("Unit Test", apiMsg);
    });

    then("StateGetId request response successfully", () => {
      exampleBlockA = shallow(<UserProfileBasicBlock {...screenProps} />);

      const mockResponse = {
        data: {},
      };

      const apiMsg = new Message(getName(MessageEnum.RestAPIResponceMessage));

      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiMsg.messageId
      );

      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponse
      );

      instance.StateGetId = apiMsg.messageId;
      runEngine.sendMessage("Unit Test", apiMsg);
      const mockResponseError = {
         errors : null,
      };
      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponseError
      );

      instance.StateGetId = apiMsg.messageId;
      runEngine.sendMessage("Unit Test", apiMsg);
      const responseJson = {
        data: {
          // your test data here
        },
        error: false,
        errors: false
      };

    //  instance.setState({UserProfile:{state :"sneha"}})


      exampleBlockA.instance().StateGetId = 'yourStateId'; // Set StateGetId for testing
    exampleBlockA.instance().state.UserProfile.state = 'yourStateName'; // Set UserProfile state for testing

    const setStateSpy = jest.spyOn(exampleBlockA.instance(), 'setState');

    instance.receiveStateGetIdFn('yourStateId', responseJson);

    // expect(setStateSpy).toHaveBeenCalledWith({
    //   States: responseJson.data
    // });


     
     
    

    });

    then("StateGetId request response error", () => {
      const mockResponse = {error : "testing"}

      const apiMsg = new Message(getName(MessageEnum.RestAPIResponceMessage));

      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiMsg.messageId
      );

      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponse
      );

      instance.GetUserCountryId = apiMsg.messageId;
      runEngine.sendMessage("Unit Test", apiMsg);
    });

    then("CityGetId request response successfully", () => {
      const mockResponse = {
        data: {},
      };

      const apiMsg = new Message(getName(MessageEnum.RestAPIResponceMessage));

      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiMsg.messageId
      );

      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponse
      );

      instance.CityGetId = apiMsg.messageId;
      runEngine.sendMessage("Unit Test", apiMsg);
      const mockResponseError = {
         errors : null,
      };
      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponseError
      );

      instance.CityGetId = apiMsg.messageId;
      runEngine.sendMessage("Unit Test", apiMsg);
    });

    then("CityGetId request response error", () => {
      const mockResponse = {
        error : "sneha"
      };

      const apiMsg = new Message(getName(MessageEnum.RestAPIResponceMessage));

      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiMsg.messageId
      );

      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponse
      );

      instance.CityGetId = apiMsg.messageId;
      runEngine.sendMessage("Unit Test", apiMsg);
    });

    then("ProfileGetId request response successfully", () => {
      const mockResponse = {
        data: {},
      };

      const apiMsg = new Message(getName(MessageEnum.RestAPIResponceMessage));

      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiMsg.messageId
      );

      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponse
      );

      instance.ProfileGetId = apiMsg.messageId;
      runEngine.sendMessage("Unit Test", apiMsg);
      const mockResponseError = {
         errors : null,
      };
      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponseError
      );

      instance.ProfileGetId = apiMsg.messageId;
      runEngine.sendMessage("Unit Test", apiMsg);
    });

    then("ProfileGetId request response error", () => {
      const mockResponse = {
        error : "sneha"
      };

      const apiMsg = new Message(getName(MessageEnum.RestAPIResponceMessage));

      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiMsg.messageId
      );

      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponse
      );

      instance.ProfileGetId = apiMsg.messageId;
      runEngine.sendMessage("Unit Test", apiMsg);
    });

    then("MainProfileId request response successfully", () => {
      const mockResponse = {
        data: {},
      };

      const apiMsg = new Message(getName(MessageEnum.RestAPIResponceMessage));

      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiMsg.messageId
      );

      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponse
      );

      instance.MainProfileId = apiMsg.messageId;
      runEngine.sendMessage("Unit Test", apiMsg);
      const mockResponseError = {
         errors : null,
      };
      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponseError
      );

      instance.MainProfileId = apiMsg.messageId;
      runEngine.sendMessage("Unit Test", apiMsg);

      instance.setState({})
    });

    then("MainProfileId request response error", () => {
      const mockResponse = {
        error : "sneha"
      };

      const apiMsg = new Message(getName(MessageEnum.RestAPIResponceMessage));

      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiMsg.messageId
      );

      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponse
      );

      instance.MainProfileId = apiMsg.messageId;
      runEngine.sendMessage("Unit Test", apiMsg);
    });

    then("editProfileId request response successfully", () => {
      const mockResponse = {
        data: {},
      };

      const apiMsg = new Message(getName(MessageEnum.RestAPIResponceMessage));

      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiMsg.messageId
      );

      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponse
      );

      instance.editProfileId = apiMsg.messageId;
      runEngine.sendMessage("Unit Test", apiMsg);
      const mockResponseError = {
         errors : null,
      };
      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponseError
      );

      instance.editProfileId = apiMsg.messageId;
      runEngine.sendMessage("Unit Test", apiMsg);

      instance.setState({})
    });

    then("editProfileId request response error", () => {
      const mockResponse = {
        error : "sneha"
      };

      const apiMsg = new Message(getName(MessageEnum.RestAPIResponceMessage));

      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiMsg.messageId
      );

      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponse
      );

      instance.editProfileId = apiMsg.messageId;
      runEngine.sendMessage("Unit Test", apiMsg);
    });

    then("should set Latitude and Longitude in state", async () => {
      const location = {
        latitude: 37.7749,
        longitude: -122.4194,
      };
      GetLocation.getCurrentPosition = jest.fn(() => Promise.resolve(location));
      instance.Clocation();
      instance.setState({
        latitude: location.latitude,
        longitude: location.longitude,
      });

      instance.Clocation();
    });

    then("should handle the error if the location cannot be obtained", () => {
      const error = {
        code: "CANCELLED",
        message: "User cancelled the request",
      };
      GetLocation.getCurrentPosition = jest.fn(() => Promise.reject(error));
      instance.Clocation();



    });


    then("I can leave the screen with out errors", () => {
      mockTimer();
      instance.componentWillUnmount();
      mockTimer();
      Platform.OS = "android";
      instance.Clocation();
      instance.EditProfile();
      instance.goToPrivacyPolicy();
      instance.goToTermsAndCondition();
      instance.isStringNullOrBlank();
      instance.requestSessionData();
      instance.getUserProfile();
      instance.getValidations();
      instance.txtInputFirstNameProps.onChangeText({})
      instance.txtInputLastNameProps.onChangeText({})
      instance.txtInputPhoneNumberlWebProps.onChangeText({})
      instance.txtInputEmailWebProps.onChangeText({})
      instance.btnEnableEditPasswordProps.onPress({})
      instance.txtInputCurrentPasswordProps.onChangeText({})
      instance.btnPasswordShowHideButtonProps.onPress({})
      instance.txtInputNewPasswordProps.onChangeText({})
      instance.btnNewPasswordShowHideButtonProps.onPress({})
      instance.txtInputReTypePasswordProps.onChangeText({})
      instance.btnReTypePasswordShowHideProps.onPress({})
      instance.btnDisableEditPasswordProps.onPress({})
      mockTimer();
      instance.componentDidMount();
      mockTimer();
      expect(exampleBlockA).toBeTruthy();
    });
  });
});
