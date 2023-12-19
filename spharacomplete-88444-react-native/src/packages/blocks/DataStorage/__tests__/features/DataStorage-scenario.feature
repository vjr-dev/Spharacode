Feature: DataStorage

    Scenario: User navigates to DataStorage
        Given I am a User loading DataStorage
        When I navigate to the DataStorage
        Then DataStorage will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors