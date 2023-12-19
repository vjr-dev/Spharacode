Feature: AlarmDelay

    Scenario: User navigates to AlarmDelay
        Given I am a User attempting to navigate AlarmDelay Screen
        When I navigate to the AlarmDelay Screen
        Then I can open the modal
        Then I can press call menu
        Then I can press bot menu
        Then I can press file menu
        Then I can press saved menu
        Then I can press alerts menu
        Then I can press notification menu
        Then I can press setting menu
        And I can leave the screen with out errors
        Then Handle back button press
    
   