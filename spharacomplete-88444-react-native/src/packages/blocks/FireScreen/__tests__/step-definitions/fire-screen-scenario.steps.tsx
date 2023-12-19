//@ts-nocheck
//@ts-ignore
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import FireScreen from "../../src/Fire";
import * as pickImageCamera from "./../../../../components/src/ImagePicker";

const dummyImage =
  "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=";
const fireAPIResponce = {
  message: "Fire incident has been created!",
  fire_incident: {
    data: {
      id: "304",
      type: "fire_incident",
      attributes: {
        fire_comment: "This is fire comment. laabla bla bla...",
        is_injured: "Injured people",
        fire_dimension: "Medium",
        is_flame: "Just Smoke",
        incident_time: "02:43PM",
        incident_date: "18-Feb-2023",
        account: {
          data: {
            id: "783",
            type: "account",
            attributes: {
              activated: true,
              icloud_share: false,
              country_code: "91",
              email: "vickytestac01@gmail.com",
              first_name: "vijay",
              last_name: "roy",
              full_phone_number: "919519582828",
              nick_name: "vroy",
              date_of_birth: "1990-01-01",
              phone_number: "9519582828",
              type: null,
              created_at: "2022-11-09T12:21:54.262+05:30",
              updated_at: "2023-02-08T14:08:21.519+05:30",
              device_id: null,
              unique_auth_id: "SPR1293",
              address: "mahmoorganj ",
              zip_code: "221010",
              city: " Varanasi",
              state: " Uttar Pradesh ",
              state_code: "UP",
              user_country: {
                id: 103,
                name: "India",
                country_code: "IN",
                latitude: "20.593684",
                longitude: "78.96288",
                created_at: "2022-01-06T19:00:27.358+05:30",
                updated_at: "2022-01-06T19:00:27.358+05:30",
              },
              terms_accepted: false,
              identity_proof: null,
              condition: "",
              id_number: null,
              id_proof_url: null,
              headline: "headlines",
              current_position: "",
              summary: "gdndhdb\n",
              visibility: "public",
              backup_email: null,
              panic_siren_setting: false,
              voice_setting: false,
              two_step_verification: true,
              location_live_tracking: false,
              share_with_emergency_contact: false,
              share_with_police: false,
              latitude: "22.5494461",
              longitude: "75.7482485",
              plan_expiry: null,
              registration_token:
                "eFzBFQ8wQy6o4e8ly1NYl1:APA91bGSMWX8X_d6sg_o129ACJ5PR6AThC9NWAsj2tN38z8kEFXj2ohU6piEa9O6b78fKESm7m_jjBodfZCHdi9Bt99GHY2-RftbKtgsTIYap5KKcP0Kh5eRVkR7lDzPR4fJ79qa3FIQ",
              stripe_customer_id: null,
              account_type: "civilians",
              credential_type: null,
              uid: "919519582828",
              comet_chat_user_first_name: "vickytestac01gmail",
              user_country_code: "IN",
              currency_symbol: "₨",
              currency_name: "Rupees",
              medical_condition_media_url: [
                "rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZ2NFIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--733f98155939dc0cec2ca15cb805615880a234af/1674638630",
              ],
              credential_media_url: null,
              profile_image_url:
                "rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZ3NFIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--21f916ca704bf103dc70e21b0a96f5b17097fb08/1674647798",
              emergency_contacts: [
                {
                  id: 1637,
                  account_id: 783,
                  name: "Javed",
                  email: null,
                  phone_number: "8989900995",
                  description: null,
                  created_at: "2022-12-22T13:00:44.646+05:30",
                  updated_at: "2022-12-22T13:00:44.646+05:30",
                  contact_type: "emergency_contact",
                },
                {
                  id: 1717,
                  account_id: 783,
                  name: "sarthak",
                  email: null,
                  phone_number: "9592667890",
                  description: null,
                  created_at: "2023-01-16T17:56:37.768+05:30",
                  updated_at: "2023-01-16T17:56:37.768+05:30",
                  contact_type: "emergency_contact",
                },
                {
                  id: 1760,
                  account_id: 783,
                  name: "jharna",
                  email: null,
                  phone_number: "9807625120",
                  description: null,
                  created_at: "2023-01-23T11:33:50.100+05:30",
                  updated_at: "2023-01-23T11:33:50.100+05:30",
                  contact_type: "emergency_contact",
                },
                {
                  id: 1774,
                  account_id: 783,
                  name: "abhijeet",
                  email: null,
                  phone_number: "7000489423",
                  description: null,
                  created_at: "2023-01-25T16:08:31.886+05:30",
                  updated_at: "2023-01-25T16:08:31.886+05:30",
                  contact_type: "emergency_contact",
                },
                {
                  id: 1779,
                  account_id: 783,
                  name: "Kali charan",
                  email: null,
                  phone_number: "8966541100",
                  description: null,
                  created_at: "2023-01-27T13:27:17.906+05:30",
                  updated_at: "2023-01-27T13:27:17.906+05:30",
                  contact_type: "emergency_contact",
                },
              ],
              friends: [],
              family: [],
              police_number: "100",
              ambulance: "108",
              fire: "101",
            },
          },
        },
        fire_picture_url: [
          "rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZzhFIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--27bac68ed42886b230a603b6f7af36205cf393b8/1676711605",
        ],
        group_information: {
          data: {
            guid: "firegroup304",
            name: "FireIncident_18_02_23_02_43",
            description: "This is fire comment. laabla bla bla...",
            type: "private",
            membersCount: 6,
            conversationId: "group_firegroup304",
            createdAt: 1676711609,
            owner: "919519582828",
            updatedAt: 1676711610,
          },
        },
      },
    },
  },
  location_address:
    "Dongargaon, Mhow Tahsil, Indore District, Madhya Pradesh, 453441, India",
};
const screenProps = {
  navigation: {
    dispatch: jest.fn(),
    addListener: jest.fn().mockImplementation((event: any, callback: any) => {
      callback();
    }),
    navigate: jest.fn(),
    goBack: jest.fn(),
    pop: jest.fn()
  },
  id: "FireScreen",
};

const feature = loadFeature(
  "./__tests__/features/fire-screen-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.spyOn(pickImageCamera, 'pickImageFromCamera').mockImplementation((): any => Promise.resolve({
      data: dummyImage,
      height: 1280,
      mime: "image/jpeg",
      modificationDate: "1696933381000",
      path: "file:///storage/emulated/0/Android/data/com.SpharaComplete/files/Pictures/3ef90521-a0cd-450e-ae50-48799f2d82b2.jpg",
      size: 46358,
      width: 960
    }))
  });

  test("User navigates to Fire Screen", ({ given, when, then }) => {
    let fireScreenWrapper: ShallowWrapper;
    let instance: FireScreen;

    given("I am a User attempting to add fire incident", () => {
      fireScreenWrapper = shallow(<FireScreen {...screenProps} />);
    });

    when("I navigate to the Fire Screen", () => {
      instance = fireScreenWrapper.instance() as FireScreen;
    });

    then("I can press injured people button", () => {
      let fireScreenInjuredPeopleButton = fireScreenWrapper.findWhere(
        (node) => node.prop("testID") === "fireScreenInjuredPeopleButton"
      );
      fireScreenInjuredPeopleButton.simulate("press");
      expect(instance.state.Reason1).toEqual("Injured people");
    });

    then("I can press not injured button", () => {
      let fireScreenNotInjuredButton = fireScreenWrapper.findWhere(
        (node) => node.prop("testID") === "fireScreenNotInjuredButton"
      );
      fireScreenNotInjuredButton.simulate("press");
      expect(instance.state.Reason1).toEqual("Not injured");
    });

    then("I can not press send button with out select amount", () => {
      let fireScreenSendButton = fireScreenWrapper.findWhere(
        (node) => node.prop("testID") === "fireScreenSendButton"
      );
      fireScreenSendButton.simulate("press");
      expect(instance.state.Reason2).toEqual("")
    });

    then("I can press small amount button", () => {
      let fireScreenSmallAmountButton = fireScreenWrapper.findWhere(
        (node) => node.prop("testID") === "fireScreenSmallAmountButton"
      );
      fireScreenSmallAmountButton.simulate("press");
      expect(instance.state.Reason2).toEqual("Small");
    });

    then("I can press medium amount button", () => {
      let fireScreenMidiumAmountButton = fireScreenWrapper.findWhere(
        (node) => node.prop("testID") === "fireScreenMidiumAmountButton"
      );
      fireScreenMidiumAmountButton.simulate("press");
      expect(instance.state.Reason2).toEqual("Medium");
    });

    then("I can press big amount button", () => {
      let fireScreenBigAmountButton = fireScreenWrapper.findWhere(
        (node) => node.prop("testID") === "fireScreenBigAmountButton"
      );
      fireScreenBigAmountButton.simulate("press");
      expect(instance.state.Reason2).toEqual("Big");
    });

    then("I can press flems & smoke button", () => {
      let fireScreenFlamsAndSmokeButton = fireScreenWrapper.findWhere(
        (node) => node.prop("testID") === "fireScreenFlamsAndSmokeButton"
      );
      fireScreenFlamsAndSmokeButton.simulate("press");
      expect(instance.state.Reason3).toEqual("Flames & Smoke");
    });

    then("I can press just smoke button", () => {
      let fireScreenJustSmokeButton = fireScreenWrapper.findWhere(
        (node) => node.prop("testID") === "fireScreenJustSmokeButton"
      );
      fireScreenJustSmokeButton.simulate("press");
      expect(instance.state.Reason3).toEqual("Just Smoke");
    });

    then("I can press back button", () => {
      let fireScreenBackButton = fireScreenWrapper.findWhere(
        (node) => node.prop("testID") === "fireScreenBackButton"
      );
      fireScreenBackButton.simulate("press");
      expect(screenProps.navigation.pop).toBeCalled();
    });

    then("I can enter comment", async () => {
      let fireScreenCommentInput = fireScreenWrapper.findWhere(
        (node) => node.prop("testID") === "fireScreenCommentInput"
      );
      fireScreenCommentInput.props().onChangeText("123456");
      expect(instance.state.Comment).not.toBeNull();
    });

    then("I can pick image1", () => {
      let fireScreenImagePick1 = fireScreenWrapper.findWhere(
        (node) => node.prop("testID") === "fireScreenImagePick1"
      );
      fireScreenImagePick1.simulate("press");
      expect(instance.state.images1).not.toBeNull();
    });

    then("I can pick image2", () => {
      let fireScreenImagePick2 = fireScreenWrapper.findWhere(
        (node) => node.prop("testID") === "fireScreenImagePick2"
      );
      fireScreenImagePick2.simulate("press");
      expect(instance.state.images2).not.toBeNull();
    });

    then("I can pick image3", () => {
      let fireScreenImagePick3 = fireScreenWrapper.findWhere(
        (node) => node.prop("testID") === "fireScreenImagePick3"
      );
      fireScreenImagePick3.simulate("press");
      expect(instance.state.images3).not.toBeNull();
    });

    then("I can pick image4", () => {
      let fireScreenImagePick4 = fireScreenWrapper.findWhere(
        (node) => node.prop("testID") === "fireScreenImagePick4"
      );
      fireScreenImagePick4.simulate("press");
      expect(instance.state.images4).not.toBeNull();
    });

    then(
      "I can not press send button with out select people injurd or not",
      () => {
        let fireScreenSendButton = fireScreenWrapper.findWhere(
          (node) => node.prop("testID") === "fireScreenSendButton"
        );
        fireScreenSendButton.simulate("press");
        expect(instance.state.Reason1).not.toBeNull();
      }
    );

    then("Fire api call with error", () => {
      const responce = {
        errors: [
          "Not success"
        ]
      }
      const fireAPI: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      fireAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        fireAPI.messageId
      );
      fireAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        responce
      );
      instance.FiredataID = fireAPI.messageId;
      const {receive : mockReceive} = instance;
      mockReceive("test", fireAPI)
      expect(instance.state.contacttdata).toEqual([]);
    });

    then("Fire api call with out error", () => {
      const fireAPI: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      fireAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        fireAPI.messageId
      );
      fireAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        fireAPIResponce
      );
      instance.FiredataID = fireAPI.messageId;
      const {receive : mockReceive} = instance;
      mockReceive("test", fireAPI)
      expect(instance.state.contacttdata).not.toEqual([]);
    });

    then("I can press send button with all reason selected", () => {
      let fireScreenSendButton = fireScreenWrapper.findWhere(
        (node) => node.prop("testID") === "fireScreenSendButton"
      );
      fireScreenSendButton.simulate("press");
      expect(instance.state.Reason1 && instance.state.Reason2 && instance.state.Reason3).not.toBeNull();
    });

    then(
      "I can not press send button with out select flems & smoke or just smoke",
      () => {
        let fireScreenSendButton = fireScreenWrapper.findWhere(
          (node) => node.prop("testID") === "fireScreenSendButton"
        );
        fireScreenSendButton.simulate("press");
        expect(instance.state.Reason3).not.toBeNull();
      }
    );
  });
});
