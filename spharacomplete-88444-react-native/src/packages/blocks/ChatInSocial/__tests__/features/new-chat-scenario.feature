Feature: New Chat

    Scenario: User navigates to New Chat
        Given I am a User loading New Chat
        When I navigate to the New Chat
        Then I can press new chat button
        Then I can enter search value in text input
        Then Display the contact list without error
        Then I can press contact item