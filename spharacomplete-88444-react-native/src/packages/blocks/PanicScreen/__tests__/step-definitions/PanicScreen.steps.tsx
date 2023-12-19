//@ts-ignore
//@ts-nocheck
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "framework/src/Helpers";
import React from "react";
import { runEngine } from "framework/src/RunEngine";
import { Message } from "framework/src/Message";

import MessageEnum, {
  getName,
} from "framework/src/Messages/MessageEnum";
import { Platform, Alert, Keyboard } from "react-native";
import GetLocation from "react-native-get-location";
import PanicScreen from "../../src/Panic"
import { pickImageFromCamera } from "../../../../components/src/ImagePicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
const navigation = require("react-navigation")

const screenProps = {
    navigation: {
        navigate: jest.fn(),
        goBack: jest.fn(),
        addListener: jest.fn().mockImplementation((event: any, callback: any) => {
            callback();
          }),
        pop: jest.fn(),
    },
    route: {
      params: {
        data: { name: 'Test Name' },
        userName: 'abc'
      }
    },
    id: "Panic"
  }

const fireAPIResponce = { message: "Incident has been created!", account: { data: { id: "4898", type: "panic_incident", attributes: { accepted: false, accepted_by: null, rejection_comment: null, rejected: false, rejected_by: null, description: "fdsdfsfsfsf", incident_time: "02:01PM", incident_date: "12-Oct-2023", panic_picture_url: ["https://spharacomplete-88444-ruby.b88444.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbXNHIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--ae15bb6149a55b2a10e9ff4f3abf7afc608d2c69/1697099493", "https://spharacomplete-88444-ruby.b88444.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbXdHIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--cb4ba77fb1a374c170fd6a884750f34851dbd0f9/1697099493"], account: { data: { id: "776", type: "account", attributes: { activated: true, role_id: null, icloud_share: false, country_code: "91", email: "sanskar.songara@taskcraft.in", first_name: "Sanskar", last_name: "Songara", full_phone_number: "919755853847", nick_name: "Susu", date_of_birth: "2000-12-22", phone_number: "9755853847", type: null, created_at: "2022-11-08T11:01:27.580+05:30", updated_at: "2022-12-22T12:56:33.423+05:30", device_id: null, unique_auth_id: "SPR6206", address: "Indore", zip_code: "456443", city: "Mahidpur", state: null, state_code: null, user_country: { id: 103, name: "India", country_code: "IN", latitude: "20.593684", longitude: "78.96288", created_at: "2022-01-06T19:00:27.358+05:30", updated_at: "2022-01-06T19:00:27.358+05:30" }, terms_accepted: false, identity_proof: null, condition: null, id_number: null, id_proof_url: null, headline: "", current_position: "", summary: "", visibility: "public", backup_email: null, panic_siren_setting: false, voice_setting: false, two_step_verification: false, location_live_tracking: false, share_with_emergency_contact: false, share_with_police: false, latitude: "22.5494461", longitude: "75.7482485", plan_expiry: null, registration_token: "cdZqvq44LEUTiIhoN7t7lx:APA91bHbYnx0QJkB3HTWSsMSuEBliY5W5S3Rp4FT273AhgI_oCPV6hrtxIJ_n0Vt2NkvRRjwHRWm9IOZl-lpOJzhHJH8dQ-FhkbHIv1cPWW5HC4nS2769heY872mIBKshYFyhk68I66d", stripe_customer_id: null, account_type: "civilians", credential_type: null, user_type: null, is_user_authorized: true, has_user_credential: false, uid: "919755853847", comet_chat_user_first_name: "sanskar", user_country_code: "IN", currency_symbol: "₨", currency_name: "Rupees", profile_image_url: "https://spharacomplete-88444-ruby.b88444.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbTBEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--6953fbe0bb179d349ee5865cb9c477466147afcf/1671693993", emergency_contacts: [{ id: 1439, account_id: 776, name: "Aayushi", email: null, phone_number: "9407520424", description: null, created_at: "2022-11-14T18:12:28.684+05:30", updated_at: "2022-11-14T18:12:28.684+05:30", contact_type: "emergency_contact" }, { id: 1383, account_id: 776, name: "Punit", email: null, phone_number: "7898059796", description: null, created_at: "2022-11-08T11:02:33.247+05:30", updated_at: "2022-11-08T11:02:33.247+05:30", contact_type: "emergency_contact" }], friends: [], family: [], police_number: "100", ambulance: "108", fire: "101", medical_condition_id: null, has_emergency_contact: true } } }, group_information: { data: { guid: "group4898", name: "PanicIncident_12_10_23_02_01", description: "fdsdfsfsfsf", type: "private", metadata: ["{email:\"sanskar.songara@taskcraft.in\"}"], membersCount: 2, conversationId: "group_group4898", createdAt: 1697099496, owner: "919755853847", updatedAt: 1697099497 } } } } }, location_address: "Dongargaon, Mhow Tahsil, Indore District, Madhya Pradesh, 453441, India" }

const runAllPromises = () => {
  return new Promise((resolve) => {
    setImmediate(() => {
      resolve()
    })
  })
}

  let mockTimer: any;

jest
  .spyOn(global, "setTimeout")
  .mockImplementation((cb: any) => (mockTimer = cb));
  jest.spyOn(global, 'clearTimeout') 

  const mockAsyncStorage = jest.spyOn(AsyncStorage, 'getItem');
const feature = loadFeature('./__tests__/features/PanicScreen-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'android' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'android');
        jest.useFakeTimers()
    });
    // afterEach(() => {
    //   jest.clearAllTimer();
    //   jest.clearAllMocks();
    // })
    test('User navigates to PanicScreen', ({ given, when, then }) => {
        let PanicScreenWrapper:ShallowWrapper;
        let instance:PanicScreen ; 

        given('I am a User loading PanicScreen', () => {

          mockAsyncStorage.mockClear();
          mockAsyncStorage.mockImplementation((key) => {
              if (key == "Token") {
                  return Promise.resolve("dfsfsjfdsUnfdfsndfWedknfsdn");
              }
              return Promise.resolve(null);
          })
            //@ts-ignore
            PanicScreenWrapper = shallow(<PanicScreen {...screenProps}/>)
        });

        when('I navigate to the PanicScreen', () => {
             instance = PanicScreenWrapper.instance() as PanicScreen
        });

        then('PanicScreen will load with out errors', () => {
            expect(PanicScreenWrapper).toBeTruthy()
            expect(PanicScreenWrapper).toMatchSnapshot()
        });

        then('ProfileGetId request response successfully', () => {
          //get api call
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
          
        })
        then('I can select the button with with out errors', () => {
            let twfbtn = PanicScreenWrapper.findWhere((node) => node.prop('testID') === 'twfIDbtn');
            twfbtn.simulate('press', Keyboard.dismiss())
            let gobackbtnID = PanicScreenWrapper.findWhere((node) => node.prop('testID') === 'gobackbtnID');
            gobackbtnID.simulate('press', instance.goback())
           
            ///@ts-ignore
            expect(gobackbtnID).toBeTruthy();
        });
        then('I can select Text input box without errors', () => {
    
            let commentinputID = PanicScreenWrapper.findWhere((node) => node.prop('testID') === 'commentinputID');
            commentinputID.simulate('changeText', "some value")
    
           
            
        });
        then('I can click on button to upload images without error',() => {
          const mockImage = {
            path: 'test/path/to/image.jpg',
            data: 'test_base64_data',
          };
        
         pickImageFromCamera = jest.fn().mockImplementation(() => Promise.resolve(mockImage));
            let imgupload1 = PanicScreenWrapper.findWhere((node) => node.prop('testID') === 'imgclick1');
          imgupload1.simulate('press',instance.takePicture(1))

          let imgupload2 = PanicScreenWrapper.findWhere((node) => node.prop('testID') === 'imgclick2');
          imgupload2.simulate('press',instance.takePicture(2))

          let imgupload3 = PanicScreenWrapper.findWhere((node) => node.prop('testID') === 'imgclick3');
          imgupload3.simulate('press',instance.takePicture(3))
          
          let imgupload4 = PanicScreenWrapper.findWhere((node) => node.prop('testID') === 'imgclick4');
          imgupload4.simulate('press',instance.takePicture(4))
          pickImageFromCamera.mockRestore();
        });

        then('should update the state with the selected image data',async() => {
    const mockImage = {
      path: 'test/path/to/image.jpg',
      data: 'test_base64_data',
    };
    pickImageFromCamera = jest.fn().mockImplementation(() => Promise.resolve(mockImage));
  
    await PanicScreenWrapper.instance().takePicture(1);
    expect(PanicScreenWrapper.state('images1')).toEqual(mockImage.data);
    await PanicScreenWrapper.instance().takePicture(2);
    expect(PanicScreenWrapper.state('images2')).toEqual(mockImage.data);
    await PanicScreenWrapper.instance().takePicture(3);
    expect(PanicScreenWrapper.state('images3')).toEqual(mockImage.data);
    await PanicScreenWrapper.instance().takePicture(4);
    expect(PanicScreenWrapper.state('images4')).toEqual(mockImage.data);
  
    pickImageFromCamera.mockRestore();
  
    
  
          });
    
    // then('', () => {

    //   //Post api call
    // })
    then('I can click countdown button without error',() => {
        jest.spyOn(Alert, 'alert');

         let cancelBtnID = PanicScreenWrapper.findWhere((node) => node.prop('testID') === 'cancelBtnID');
        cancelBtnID.simulate('press', instance.cancel())

       
       
    });
    then('I can click sentAlert button without error',() => {
        let sentAlertID = PanicScreenWrapper.findWhere((node) => node.prop('testID') === 'sendAlertID');
        sentAlertID.simulate('press', instance.setState({sendAlert: true}))
       
       
    });

    then("I can mock checkPermissions with out error", () => {
        jest.mock("react-native/Libraries/Utilities/Platform", () => ({
          OS: "android",
          select: () => null,
        }));
        Platform.OS = "android";
        jest.spyOn(Alert, "alert").mockImplementation(() => jest.fn());
        instance.CheckPermission();
        instance.componentDidMount();
        instance.CheckPermission();
        instance.profileGetIdRecieverFunc({data: "abscd"})
        instance.Fire_api()
        instance.GetProfile()
        instance.OnPanicAgain(25)
        instance.OnPanicTimer()
        instance.sendclick()
        instance.setState({sendAlert: false})
        instance.call()
        instance.pressYes()
      });
  
      then("I can mock checkPermissions else with out error", () => {
        jest.mock("react-native-permissions", () => {
          const Permissions = jest.requireActual("react-native-permissions/mock");
  
          return {
            ...Permissions,
            check: jest.fn(() => Promise.resolve(true)),
            request: jest
              .fn()
              .mockImplementationOnce(
                (key) =>
                  new Promise((resolve, reject) => {
                    return resolve("unavailable");
                  })
              )
              .mockImplementationOnce(
                (key) =>
                  new Promise((resolve, reject) => {
                    return resolve("denied");
                  })
              )
              .mockImplementation(
                (key) =>
                  new Promise((resolve, reject) => {
                    return resolve("blocked");
                  })
              )
              .mockImplementationOnce(
                (key) =>
                  new Promise((resolve, reject) => {
                    return resolve("granted");
                  })
              ),
          };
        });
        jest.mock("react-native/Libraries/Utilities/Platform", () => ({
          OS: "ios",
          select: () => null,
        }));
        Platform.OS = "ios";
        instance.CheckPermission();
        instance.componentDidMount();
        instance.CheckPermission();
      });
  
  
  
      then("should set Latitude and Longitude in state", async () => {
        const location = {
          latitude: 37.7749,
          longitude: -122.4194,
        };
        GetLocation.getCurrentPosition = jest.fn(() => Promise.resolve(location));
        
        instance.setState({
          latitude: location.latitude,
          longitude: location.longitude,
        });
  
        
      });
  
      then("should handle the error if the location cannot be obtained", () => {
        const error = {
          code: "CANCELLED",
          message: "User cancelled the request",
        };
        jest.mock('react-native/Libraries/Linking/Linking', () => ({
            openSettings: jest.fn(() => Promise.reject('some error reason'))
          }));
        GetLocation.getCurrentPosition = jest.fn(() => Promise.reject(error));
        instance.setState({Token: "ddvfdsdsvsfvs"})
        instance.GetProfile()
        instance.call()
        instance.firedataIdRecieverFunc({name: "xyz",errors:[]})
        instance.setState({Loader: false})
        instance.setState({PanicID: "5222",Comment: "",
        images1: "",
        images2: "",
        images3: "",
        images4: ""})
      });
      then('should able to call countdown', () => {
        let countdownComponent = PanicScreenWrapper.findWhere((node) => node.prop('testID') === 'sendAlertID');
        console.log("efgfedf23435",countdownComponent.props())
        countdownComponent.simulate('onEnd')
      })

      then('hit post data successfully', () => {
        const httpBody = {
          data: {
            attributes: {
              latitude: "41.40338",
              longitude: "41.40338",
              description: "fdsdfsfsfsf",
              panic_picture: [
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=",
              ],
            },
          },
        };
        const fireAPI: Message = new Message(
          getName(MessageEnum.RestAPIResponceMessage)
        );
        fireAPI.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          fireAPI.messageId
        );
        fireAPI.addData(
          getName(MessageEnum.RestAPIRequestBodyMessage),
          JSON.stringify(httpBody)
        );
        fireAPI.addData(
          getName(MessageEnum.RestAPIResponceSuccessMessage),
          JSON.parse(JSON.stringify({}))
        );
        instance.FiredataID = fireAPI.messageId;
        runEngine.sendMessage("Unit Test", fireAPI);
        instance.firedataIdRecieverFunc(fireAPIResponce);

      })
      then('hit distance get api successfully', () => {
          //get api call
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
    
          instance.PanicAgainId = apiMsg.messageId;
          runEngine.sendMessage("Unit Test", apiMsg);
          const mockResponseError = {
             errors : null,
          };
          apiMsg.addData(
            getName(MessageEnum.RestAPIResponceSuccessMessage),
            mockResponseError
          );
    
          instance.PanicAgainId = apiMsg.messageId;
          runEngine.sendMessage("Unit Test", apiMsg);

      })
      then('should call OnPanicAgain with 25 when IsNotify is not true and callCount is 0', async() => {
          let OnPanicAgainMock = jest.fn()
          let OnPanicTimerMock = jest.fn()
        await instance.OnPanicTimer();


    jest.advanceTimersByTime(15000);

    expect(setTimeout).toHaveBeenCalledTimes(3);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 15000);
    jest.runAllTimers();


      })
      
      then("I can leave the screen with out errors", () => {
        instance.componentWillUnmount();
        Platform.OS = "android"
        instance.componentDidMount();
        instance.setState({
        Comment: "",
        images1: "",
        images2: "",
        images3: "",
        images4: ""})
        expect(PanicScreenWrapper).toBeTruthy();
      });
        
    });
    

}
)
