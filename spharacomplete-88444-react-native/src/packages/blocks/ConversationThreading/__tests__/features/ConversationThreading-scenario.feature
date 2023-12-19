Feature: ConversationThreading

    Scenario: User navigates to ConversationThreading
        Given I am a User loading ConversationThreading
        When I navigate to the ConversationThreading
        Then ConversationThreading will load with out errors
        And I can leave the screen with out errors