Feature: Chat

    Scenario: User navigates to Chat
        Given I am a User loading Chat
        When I navigate to the Chat
        Then Chat will load with out errors
        Then Press back button to leave screen
        Then I can press group button
        Then I can go back to home screen
        Then I can enter search value in text input
        Then I can press on menu button
        Then I can press cancel button
        Then I can press second modal cancel button
        Then I can press swipeoutOne Pin Button with out error
        Then I can press swipeoutOne Delete Button with out error
        Then I can press swipeoutOne Archive Button with out error
        Then I can press swipeoutOne More Button with out error
        Then Display the chat list and its functionality
   