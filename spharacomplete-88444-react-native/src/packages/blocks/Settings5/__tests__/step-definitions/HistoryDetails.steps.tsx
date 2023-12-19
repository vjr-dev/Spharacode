import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import { Message } from "framework/src/Message";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import HistoryDetails from "../../src/HistoryDetails";

const screenProps = {
  navigation: {
    dispatch: jest.fn(),
    addListener: jest.fn().mockImplementation((event: any, callback: any) => {
      callback();
    }),
    navigate: jest.fn(),
    replace: jest.fn(),
    goBack: jest.fn(),
    pop: jest.fn(),
  },
    route: {
      params: {
        details: "",
      },
    },
  id: "HistoryDetails",
};

const feature = loadFeature(
  "./__tests__/features/HistoryDetails-scenario.feature"
);
const chatApiResponse = {
  incident:{
    data:{
      attributes:{
        group_information: {
          data: {
            conversationId: "group_group4902",
            createdAt: 1697468422,
            description: "Fbd",
            guid: "group4902",
            membersCount: 2,
            metadata: [
              Array
            ],
            name: "PanicIncident_16_10_23_08_30",
            onlineMembersCount: 5,
            owner: "919898989898",
            type: "private"
          }
        },
      }
    }
  }
}
defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.useFakeTimers();
  });

  test("User navigates to HistoryDetails Screen", ({ given, when, then }) => {
    let HistoryDetailsWrapper: ShallowWrapper;
    let instance: HistoryDetails;

    given("User loading HistoryDetails", () => {
      HistoryDetailsWrapper = shallow(
        <HistoryDetails {...screenProps} />
      );
    });

    when("User navigate to the HistoryDetails screeen", () => {
      instance = HistoryDetailsWrapper.instance() as HistoryDetails;
    });

    then("User can able to click go back btn without error", () => {
        let goBackBtn = HistoryDetailsWrapper.findWhere((node) => node.prop('testID') === 'goBackBtn');
        goBackBtn.simulate('press');
        expect(screenProps.navigation.goBack).toBeCalled();
    });

    then("User can able change Details tab without error", () => {
        let detailsTabBtn = HistoryDetailsWrapper.findWhere((node) => node.prop('testID') === 'detailsTabBtn');
        detailsTabBtn.simulate('press');
        expect(instance.state.details).toEqual(true);
    });

    then("User can able change Chat tab without error", async() => {
        let chatTabBtn = HistoryDetailsWrapper.findWhere((node) => node.prop('testID') === 'chatTabBtn');
        chatTabBtn.simulate('press');

        const getchatAPI: Message = new Message(
          getName(MessageEnum.RestAPIResponceMessage)
        );
        getchatAPI.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          getchatAPI.messageId
        );
        getchatAPI.addData(
          getName(MessageEnum.RestAPIResponceSuccessMessage),
          chatApiResponse
        );
        instance.getChatDetailsID = getchatAPI.messageId;
        const { receive: mockReceive } = instance;
        await mockReceive("Unit Test", getchatAPI)
        const ConversationScreenProps: any = HistoryDetailsWrapper.find('ConversationScreen').props();
       expect(ConversationScreenProps.route.params).toStrictEqual({
        chatNumber:chatApiResponse.incident.data.attributes.group_information.data.guid,
        mainConversationId:  chatApiResponse.incident.data.attributes.group_information.data.conversationId,
        userName:  chatApiResponse.incident.data.attributes.group_information.data.name,
        userAvtar: "",
        userType: 2,
        isMessageViewOnly: "true",
      })
    });

    then("User can leave the screen with out errors", () => {});
  });
});
