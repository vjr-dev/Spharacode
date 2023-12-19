Feature: Favourites

    Scenario: User navigates to Favourites
        Given I am a User loading Favourites
        When I navigate to the Favourites
        Then Favourites will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can select the btnShowHideProps with with out errors
        And I can select the hide keyboard button with with out errors
        And I can leave the screen with out errors