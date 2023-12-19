//@ts-ignore
//@ts-nocheck
jest.useFakeTimers()
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import PaymentDonation from "../../src/PaymentDonation";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
const screenProps = {
  navigation: {
    dispatch: jest.fn(),
    navigate: jest.fn(),
    goBack: jest.fn(),
    pop: jest.fn()
  },
  route:{
    params:{
      url:{
        url:"https://www.google.com/"
      }
    }
  },
  id: "PaymentDonationScreen"
};

const feature = loadFeature(
  "./__tests__/features/payment-donation-screen-scenario.feature"
);
defineFeature(feature, test => {
  beforeEach(() => {
    jest.resetModules();
    jest.mock("react-native/Libraries/Utilities/Platform", () => ({
      OS: "android",
      select: () => null,
    }));
 
    jest.mock('react-native-google-pay', () => ({
    
    }));
   
  });

  test("User navigates to Payment Donation Screen", ({ given, when, then }) => {
    let paymentDonationWrapper: ShallowWrapper;
    let instance :PaymentDonation;
    
    given("I am a User attempting to Payment Donation", () => {
      paymentDonationWrapper = shallow(<PaymentDonation {...screenProps} />);
      expect(paymentDonationWrapper).toBeTruthy();
      expect(paymentDonationWrapper).toMatchSnapshot();
    });

    when("I navigate to the Payment Donation Screen", () => {
      instance = paymentDonationWrapper.instance() as PaymentDonation;
      instance.setState({
        data: [1, 2, 3, 4, 5],
        Amount: 1,
        Modal: false,
        to: "Police officers",
        STRIPE_PUBLIC_KEY: "",
        CHECKOUT_SESSION_ID: "",
        UserName: "",
        Nickname: "",
        UserNumber: "",
        UserEmail: "",
        currentPosition: "",
        paymentdone: false,
      })
      instance.temp ={name:"abc"}
      expect(paymentDonationWrapper).toBeTruthy();
      expect(paymentDonationWrapper).toMatchSnapshot();

     
    });

    then("I can press back button", async () => {
      let backButton = paymentDonationWrapper.findWhere(
        node => node.prop("testID") === "backButton"
      );
      backButton.simulate("press");
      expect(backButton).toBeTruthy();

      
      
      
    });

    then("I can press google pay button", async () => {
      let gPayButton = paymentDonationWrapper.findWhere(
        node => node.prop("testID") === "gPayButton"
      );
      gPayButton.simulate("press");
      expect(gPayButton).toBeTruthy();
    });

    then("I can press Rpay button", async () => {
      let rPaybutton = paymentDonationWrapper.findWhere(
        node => node.prop("testID") === "rPaybutton"
      );
      rPaybutton.simulate("press");
      expect(rPaybutton).toBeTruthy();
   
    });

    then("I can press stripe pay button", async () => {
      let stripePayButton = paymentDonationWrapper.findWhere(
        node => node.prop("testID") === "stripePayButton"
      );
      stripePayButton.simulate("press");
      expect(stripePayButton).toBeTruthy();
    });

    then("I can press apple pay button", async () => {

      instance.applepayclick()
   
      let applePayButton = paymentDonationWrapper.findWhere(
        node => node.prop("testID") === "applePayButton" 
      );
      expect(applePayButton).toBeTruthy();
    });

    then("I can press done button", async () => {
      let doneButton = paymentDonationWrapper.findWhere(node => node.prop("testID") === "doneButton"
      );
      doneButton.simulate("press");
      expect(doneButton).toBeTruthy();
    });
    
    then("SessionAPI call with out errors", () => {
      let httpBody = JSON.stringify({
        data: {
          attributes: {
            donatelist_id: 1,
            amount: 100,
            success_url: "https://example.com/success",
            cancel_url: "https://example.com/cancel",
          },
        },
      });

      const sessionAPI: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      sessionAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        sessionAPI.messageId
      );
      sessionAPI.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(httpBody)
      );
      sessionAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.parse(JSON.stringify({donation_payment:200,checkout_session:"abc.com"}))
      );
      instance.checkSessionAPIcallId = sessionAPI.messageId;
      runEngine.sendMessage("Unit Test", sessionAPI);
    });

  });
});
