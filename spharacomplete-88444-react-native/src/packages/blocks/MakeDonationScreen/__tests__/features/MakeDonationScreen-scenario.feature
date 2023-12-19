Feature: MakeDonationScreen

    Scenario: User navigates to MakeDonationScreen
        Given I am a User loading MakeDonationScreen
        When I navigate to the MakeDonationScreen
        Then MakeDonationScreen will load with out errors
        Then fetching donation list without error
        Then I can select the button without errors
        Then I can press static amount button
        Then I can enter text in textbox
        Then I can press donate now button
        