//@ts-nocheck
import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import * as helpers from 'framework/src/Helpers'
import React from "react";
import {View,Text} from "react-native";
import AmbulanceScreen from "../../src/Ambulance"
import { pickImageFromCamera } from "../../../../components/src/ImagePicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as pickImageCamera from "./../../../../components/src/ImagePicker";
const dummyImage =
  "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=";

const screenProps = {
    navigation: {
        dispatch: jest.fn(),
        addListener: jest.fn().mockImplementation((event: any, callback: any) => {
          callback();
        }),
        navigate: jest.fn(),
        goBack: jest.fn(),
        pop:jest.fn(),
        replace: jest.fn()
      },

      
    
      state: {
        params: {
          data: { name: 'Test Name' },
          userName: 'abc',
          data: [1, 2, 3, 4, 5],
          DModal: true,
          SAmountstatus: 0,
          People: 0,
          Reason: "",
          images1: "",
          images2: "",
          images3: "",
          images4: "",
          Token: "",
          Ambulancedata: [],
          SelectedAmbulance: 0,
          Loader: true,
          Contactdata: [],
          Addres: "",
          Time: ""
        }
    },
    id: "Ambulance"
  }

 const getResponse =  {
    status: 200,
    ambulance_for: [
        {
            id: 1,
            ambulance_for: "Broken Bones",
            created_at: "2022-01-13T16:24:11.885+05:30",
            updated_at: "2022-01-13T16:24:11.885+05:30"
        },
        {
            id: 2,
            ambulance_for: "Road Accident",
            created_at: "2022-01-13T16:24:33.574+05:30",
            updated_at: "2022-01-13T16:24:33.574+05:30"
        },
        {
            id: 5,
            ambulance_for: "Poisoning",
            created_at: "2022-01-13T16:25:29.995+05:30",
            updated_at: "2022-01-13T16:25:29.995+05:30"
        },
        {
            id: 6,
            ambulance_for: "Fainting",
            created_at: "2022-01-28T11:27:18.934+05:30",
            updated_at: "2022-01-28T11:27:18.934+05:30"
        },
        {
            id: 7,
            ambulance_for: "Seizure",
            created_at: "2022-01-28T11:27:32.414+05:30",
            updated_at: "2022-01-28T11:27:32.414+05:30"
        },
        {
            id: 8,
            ambulance_for: "Burn/Scalds",
            created_at: "2022-01-28T11:27:58.799+05:30",
            updated_at: "2022-01-28T11:27:58.799+05:30"
        },
        {
            id: 9,
            ambulance_for: "Breathing Difficulty",
            created_at: "2022-01-28T11:28:30.952+05:30",
            updated_at: "2022-01-28T11:28:30.952+05:30"
        },
        {
            id: 10,
            ambulance_for: "Allergic Reaction",
            created_at: "2022-01-28T11:29:06.894+05:30",
            updated_at: "2022-01-28T11:29:06.894+05:30"
        },
        {
            id: 11,
            ambulance_for: "Stroke ",
            created_at: "2022-01-28T11:29:31.558+05:30",
            updated_at: "2022-01-28T11:29:31.558+05:30"
        },
        {
            id: 12,
            ambulance_for: "Chest Pain",
            created_at: "2022-01-28T11:29:49.406+05:30",
            updated_at: "2022-01-28T11:29:49.406+05:30"
        },
        {
            id: 13,
            ambulance_for: "Others",
            created_at: "2022-01-28T11:30:05.020+05:30",
            updated_at: "2022-01-28T11:30:05.020+05:30"
        },
        {
            id: 14,
            ambulance_for: "Bleeding",
            created_at: "2023-01-10T11:41:49.462+05:30",
            updated_at: "2023-01-10T11:41:49.462+05:30"
        },
        {
            id: 4,
            ambulance_for: "Trauma",
            created_at: "2022-01-13T16:25:05.423+05:30",
            updated_at: "2023-01-10T11:43:33.859+05:30"
        },
        {
            id: 15,
            ambulance_for: "Heart problem latest",
            created_at: "2023-02-15T16:18:14.587+05:30",
            updated_at: "2023-02-15T16:18:49.224+05:30"
        },
        {
            id: 16,
            ambulance_for: "Stomach problem",
            created_at: "2023-05-02T17:50:03.286+05:30",
            updated_at: "2023-05-02T17:50:03.286+05:30"
        }
    ]
}
const ambulanceAPIResponce = {
  "message": "Report Created!",
  "account": {
      "data": {
          "id": "719",
          "type": "ambulance_report",
          "attributes": {
              "accepted": false,
              "accepted_by": null,
              "rejected": false,
              "rejection_comment": null,
              "rejected_by": null,
              "call_ambulance_for": {
                  "id": 1,
                  "ambulance_for": "Broken Bones",
                  "created_at": "2022-01-13T16:24:11.885+05:30",
                  "updated_at": "2022-01-13T16:24:11.885+05:30"
              },
              "incident_time": "07:18PM",
              "incident_date": "10-Oct-2023",
              "people_count": "1",
              "incident_picture_url": [
                  "https://spharacomplete-88444-ruby.b88444.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBa3NHIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--9b96240c45e15071322820d84d9f848032f78abd/1696945739",
                  "https://spharacomplete-88444-ruby.b88444.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBa3dHIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2df93e710c6604c32f3234da0f388c1e068dbfc1/1696945739"
              ],
              "account": {
                  "data": {
                      "id": "776",
                      "type": "account",
                      "attributes": {
                          "activated": true,
                          "role_id": null,
                          "icloud_share": false,
                          "country_code": "91",
                          "email": "sanskar.songara@taskcraft.in",
                          "first_name": "Sanskar",
                          "last_name": "Songara",
                          "full_phone_number": "919755853847",
                          "nick_name": "Susu",
                          "date_of_birth": "2000-12-22",
                          "phone_number": "9755853847",
                          "type": null,
                          "created_at": "2022-11-08T11:01:27.580+05:30",
                          "updated_at": "2022-12-22T12:56:33.423+05:30",
                          "device_id": null,
                          "unique_auth_id": "SPR6206",
                          "address": "Indore",
                          "zip_code": "456443",
                          "city": "Mahidpur",
                          "state": null,
                          "state_code": null,
                          "user_country": {
                              "id": 103,
                              "name": "India",
                              "country_code": "IN",
                              "latitude": "20.593684",
                              "longitude": "78.96288",
                              "created_at": "2022-01-06T19:00:27.358+05:30",
                              "updated_at": "2022-01-06T19:00:27.358+05:30"
                          },
                          "terms_accepted": false,
                          "identity_proof": null,
                          "condition": null,
                          "id_number": null,
                          "id_proof_url": null,
                          "headline": "",
                          "current_position": "",
                          "summary": "",
                          "visibility": "public",
                          "backup_email": null,
                          "panic_siren_setting": false,
                          "voice_setting": false,
                          "two_step_verification": false,
                          "location_live_tracking": false,
                          "share_with_emergency_contact": false,
                          "share_with_police": false,
                          "latitude": "22.7457337",
                          "longitude": "75.8934347",
                          "plan_expiry": null,
                          "registration_token": "cdZqvq44LEUTiIhoN7t7lx:APA91bHbYnx0QJkB3HTWSsMSuEBliY5W5S3Rp4FT273AhgI_oCPV6hrtxIJ_n0Vt2NkvRRjwHRWm9IOZl-lpOJzhHJH8dQ-FhkbHIv1cPWW5HC4nS2769heY872mIBKshYFyhk68I66d",
                          "stripe_customer_id": null,
                          "account_type": "civilians",
                          "credential_type": null,
                          "user_type": null,
                          "is_user_authorized": true,
                          "has_user_credential": false,
                          "uid": "919755853847",
                          "comet_chat_user_first_name": "sanskar",
                          "user_country_code": "IN",
                          "currency_symbol": "₨",
                          "currency_name": "Rupees",
                          "profile_image_url": "https://spharacomplete-88444-ruby.b88444.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbTBEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--6953fbe0bb179d349ee5865cb9c477466147afcf/1671693993",
                          "emergency_contacts": [
                              {
                                  "id": 1439,
                                  "account_id": 776,
                                  "name": "Aayushi",
                                  "email": null,
                                  "phone_number": "9407520424",
                                  "description": null,
                                  "created_at": "2022-11-14T18:12:28.684+05:30",
                                  "updated_at": "2022-11-14T18:12:28.684+05:30",
                                  "contact_type": "emergency_contact"
                              },
                              {
                                  "id": 1383,
                                  "account_id": 776,
                                  "name": "Punit",
                                  "email": null,
                                  "phone_number": "7898059796",
                                  "description": null,
                                  "created_at": "2022-11-08T11:02:33.247+05:30",
                                  "updated_at": "2022-11-08T11:02:33.247+05:30",
                                  "contact_type": "emergency_contact"
                              }
                          ],
                          "friends": [],
                          "family": [],
                          "police_number": "100",
                          "ambulance": "108",
                          "fire": "101",
                          "medical_condition_id": null,
                          "has_emergency_contact": true
                      }
                  }
              },
              "group_information": {
                  "data": {
                      "guid": "ambgroup719",
                      "name": "AmbulanceIncident_10_10_23_07_18",
                      "description": "I am in an incident, please call an ambulance!",
                      "type": "private",
                      "metadata": [
                          "{email:\"sanskar.songara@taskcraft.in\"}"
                      ],
                      "membersCount": 2,
                      "conversationId": "group_ambgroup719",
                      "createdAt": 1696945744,
                      "owner": "919755853847"
                  }
              }
          }
      }
  },
  "contacts": [
      {
          "id": 1439,
          "account_id": 776,
          "name": "Aayushi",
          "email": null,
          "phone_number": "9407520424",
          "description": null,
          "created_at": "2022-11-14T18:12:28.684+05:30",
          "updated_at": "2022-11-14T18:12:28.684+05:30",
          "contact_type": "emergency_contact"
      },
      {
          "id": 1383,
          "account_id": 776,
          "name": "Punit",
          "email": null,
          "phone_number": "7898059796",
          "description": null,
          "created_at": "2022-11-08T11:02:33.247+05:30",
          "updated_at": "2022-11-08T11:02:33.247+05:30",
          "contact_type": "emergency_contact"
      }
  ],
  "location_address": "Jade Blue, Old A. B. Road, Malharganj Tahsil, Indore District, Madhya Pradesh, 452010, India"
}

const GetFirstASuccessAPI = async (instance: any) => {
  const fetchAmbulanceForOptionAPI: Message = new Message(
    getName(MessageEnum.RestAPIResponceMessage)
  );
  fetchAmbulanceForOptionAPI.addData(
    getName(MessageEnum.RestAPIResponceDataMessage),
    fetchAmbulanceForOptionAPI.messageId
  );
  fetchAmbulanceForOptionAPI.addData(
    getName(MessageEnum.RestAPIResponceSuccessMessage),
    getResponse
  );
  instance.FirstapiID = fetchAmbulanceForOptionAPI.messageId;
  const {receive:mockResponse} = instance
  mockResponse("test", fetchAmbulanceForOptionAPI)
}

  

  const mockAmbulanceData = [
    { ambulance_for: 'Option 1', id: 1 },
    { ambulance_for: 'Option 2', id: 2 },
    { ambulance_for: 'Option 3', id: 3 },
    // Add more data as needed
  ];

  const runAllPromises = () => {
    return new Promise((resolve) => {
      setImmediate(() => {
        resolve()
      })
    })
  }

const feature = loadFeature('./__tests__/features/Ambulance-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        
        jest.resetModules()
        
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
      
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
        jest.spyOn(AmbulanceScreen.prototype,'componentDidMount');
        jest.spyOn(pickImageCamera, 'pickImageFromCamera').mockImplementation((): any => Promise.resolve({

          data: dummyImage,
          height: 1280,
          mime: "image/jpeg",
          modificationDate: "1696933381000",
          path: "file:///storage/emulated/0/Android/data/com.SpharaComplete/files/Pictures/3ef90521-a0cd-450e-ae50-48799f2d82b2.jpg",
          size: 46358,
          width: 960
        }));
    });
    test('User navigates to AmbulanceScreen', ({ given, when, then }) => {
        let ambulanceBlock:ShallowWrapper;
        let instance:AmbulanceScreen ; 

        given('I am a User loading AmbulanceScreen', () => {
            
            ambulanceBlock = shallow(<AmbulanceScreen {...screenProps} data = {mockAmbulanceData}/>)
        });

        when('I navigate to the AmbulanceScreen', () => {
             instance = ambulanceBlock.instance() as AmbulanceScreen
        });

        then('renders the loading indicator correctly', () => {
           

            
          expect(ambulanceBlock.find('ActivityIndicator')).toHaveLength(1);
      });


        then('fetch the data reason for calling ambulance',  async () => {
         await GetFirstASuccessAPI(instance);
         await runAllPromises();
         const ambulanceOptions: any = ambulanceBlock.findWhere((node) => node.prop('testID') === 'ambulanceoptiontId');
         const text = (<Text  style={{"color": "#a1a1a1"}} >{getResponse.ambulance_for[0].ambulance_for}</Text>)
         const abdcdd = ambulanceOptions.at(0).props().children
         console.log("fgfewqw",abdcdd.props)
         console.log("TEXTDSADFSFSFSF",text.props)
         expect(abdcdd.props.children).toBe(text.props.children)
     
        });
        then('user can enter the number', async() => {

          let NumberTextInput = ambulanceBlock.findWhere(
            (node) => node.prop("testID") === "numericvaluetext"
          );
         
          NumberTextInput.props().onChangeText("9",instance.setState({People:"9"}));
         
          expect(NumberTextInput.props().value).toBe("0");
        })

        then('user can pick image 1', () => {
          let takePictureMock = jest.fn()
          let ImagePick = ambulanceBlock.findWhere(
            (node) => node.prop("testID") === "imgclick1"
          );
          ImagePick.simulate("press",takePictureMock(1) );
          expect(ImagePick).toBeTruthy();

        })

        then('user can pick image 2', () => {
          let takePictureMock = jest.fn()
          let ImagePick = ambulanceBlock.findWhere(
            (node) => node.prop("testID") === "imgclick2"
          );
          ImagePick.simulate("press", takePictureMock(2));
          expect(ImagePick).toBeTruthy();

        })
        then('user can pick image 3', () => {
          let ImagePick = ambulanceBlock.findWhere(
            (node) => node.prop("testID") === "imgclick3"
          );
          ImagePick.simulate("press");
          expect(ImagePick).toBeTruthy();

        })
        then('user can pick image 4', () => {
          let ImagePick = ambulanceBlock.findWhere(
            (node) => node.prop("testID") === "imgclick4"
          );
          ImagePick.simulate("press");
          expect(ImagePick).toBeTruthy();

        })

        then('I can click on send button withour error', () => {
          let sendbtn = ambulanceBlock.findWhere(
            (node) => node.prop("testID") === "onSendClickHitPostAPI"
          );
          let prop = sendbtn.props()
          sendbtn.simulate("press");
          instance.check()
          instance.Send_ambulance_requast_Api()
          expect(prop.children.props.children).toBe("SEND")
          
        })

        then("Ambulance api call with out error", () => {
          
          const httpBody = {
            data: {
              attributes: {
                latitude: "41.40338",
                longitude: "41.40338",
                call_ambulance_for_id: 1,
                people_count: 1,
                incident_picture: [
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=",
                ],
              },
            },
          };
          const ambulanceAPI: Message = new Message(
            getName(MessageEnum.RestAPIResponceMessage)
          );
          ambulanceAPI.addData(
            getName(MessageEnum.RestAPIResponceDataMessage),
            ambulanceAPI.messageId
          );
          ambulanceAPI.addData(
            getName(MessageEnum.RestAPIRequestBodyMessage),
            JSON.stringify(httpBody)
          );
          ambulanceAPI.addData(
            getName(MessageEnum.RestAPIResponceSuccessMessage),
            JSON.parse(JSON.stringify({}))
          );
          instance.AmbulaceID = ambulanceAPI.messageId;
          runEngine.sendMessage("Unit Test", ambulanceAPI);
          instance.ambulanceIdResponse(ambulanceAPIResponce);
        });
    

        then('Handle back button press', async () => {
          const goBackMock = jest.fn()
            let buttonComponent = ambulanceBlock.findWhere((node) => node.prop('testID') === 'btnGoBack');
            const mockImageData = 'mockImageData';
            const pickImageFromCamera = jest.fn(() => Promise.resolve({ data: 'mockImageData' }));
            instance.pickImageFromCamera = pickImageFromCamera;
        
            buttonComponent.simulate('press',goBackMock())
            // instance.goback()
            // instance.check()
            // instance.doneclick()
            // instance.FirstApi()
            // instance.Send_ambulance_requast_Api()
            // instance.sendclick()
            // instance.firstApiIdResponse("abc","xyz")
            // instance.ambulanceIdResponse("abc","xyz")
           expect(buttonComponent).toBeTruthy();

          //  let imgupload1 = ambulanceBlock.findWhere((node) => node.prop('testID') === 'imgclick1');
          //  let prop1 = imgupload1.props()
          //  console.log("qwdf123423",prop1.onPress)
          //  console.log("098yhjnbgf",ambulanceBlock.state('People'))
          //  expect(ambulanceBlock.state('images1')).toEqual('');
          //  imgupload1.simulate('press')
          //  await instance.takePicture(1); 
          //  expect(ambulanceBlock.state('images1')).toEqual('');

        

        
        });
        then('should update the state with the selected image data',async() => {
          // Mock the ImagePicker.openCamera() function
  const mockImage = {
    path: 'test/path/to/image.jpg',
    data: 'test_base64_data',
  };

  pickImageFromCamera = jest.fn().mockImplementation(() => Promise.resolve(mockImage));


  await ambulanceBlock.instance().takePicture(1);
  expect(ambulanceBlock.state('images1')).toEqual(mockImage.data);
  await ambulanceBlock.instance().takePicture(2);
  expect(ambulanceBlock.state('images2')).toEqual(mockImage.data);
  await ambulanceBlock.instance().takePicture(3);
  expect(ambulanceBlock.state('images3')).toEqual(mockImage.data);
  await ambulanceBlock.instance().takePicture(4);
  expect(ambulanceBlock.state('images4')).toEqual(mockImage.data);

  pickImageFromCamera.mockRestore();




        });

        then('Handle alertoption button press', () => {

          let listWrapper = shallow(
            <View>
              {instance.renderAmbulanceData(
               {
                ambulance_for:"Broken Bones",
                created_at:"2022-01-13T16:24:11.885+05:30",
                id:1,
                updated_at:"2022-01-13T16:24:11.885+05:30"
                },
                0
              )}
            </View>
          );
                instance.setState({ Ambulancedata: ['test1', 'test2', 'test3'] })
          let onPressAlert = listWrapper.findWhere(
            (node) => node.prop("testID") === "ambulanceoptiontId"
          );
          onPressAlert.simulate("press");
          expect(onPressAlert).toBeTruthy();
        
        })






        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            //@ts-ignore
            expect(ambulanceBlock).toMatchSnapshot()
        });
    })
}
)
