Feature: AlertLocationScreen

    Scenario: User navigates to AlertLocationScreen
        Given I am a User loading AlertLocationScreen
        When I navigate to the AlertLocationScreen
        Then User can press the back button
        Then User can navigate to the chat screen if press chat icon

