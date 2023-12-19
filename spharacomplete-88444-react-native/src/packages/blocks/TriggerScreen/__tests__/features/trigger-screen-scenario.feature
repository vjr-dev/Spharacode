Feature: Trigger Screen

    Scenario: User navigates to Trigger Screen
        Given I am a User attempting to Trigger Screen
        When I navigate to the Trigger Screen
        Then I can press the back button
        Then I can press the power button
        Then I can press the volume up button button
        Then I can press the volume down button button
        Then Display the button option and i can select item
        Then Update setting api work with out error
        Then Update setting api work with error