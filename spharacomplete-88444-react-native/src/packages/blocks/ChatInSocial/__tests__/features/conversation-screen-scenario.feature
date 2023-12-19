Feature: Conversation Screen

Scenario: User navigates to ConversationScreen
        Given I am a User loading ConversationScreen
        When I navigate to the ConversationScreen
        Then I can press upper back button
        Then Display conversation without error
        Then I can send the message