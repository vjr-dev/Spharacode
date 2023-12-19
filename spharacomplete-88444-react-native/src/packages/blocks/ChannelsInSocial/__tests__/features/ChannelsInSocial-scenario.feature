Feature: ChannelsInSocial

    Scenario: User navigates to ChannelsInSocial
        Given I am a User loading ChannelsInSocial
        When I navigate to the ChannelsInSocial
        Then ChannelsInSocial will load with out errors
        And I can leave the screen with out errors