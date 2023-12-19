Feature: ChangePhoneNumber

    Scenario: User navigates to Change Phone Number screen
        Given I am a User loading Change Phone Number screen
        When I navigate to the Change Phone Number screen
        Then I can go back if i clicked back button
        Then I can select the country code for old phone number
        Then I can select the country code for new phone number
        Then I can not submit form if i added only old number
        Then I can not submit form if i added only new number
        Then I can not submit form if i did not add both number
        Then I can see error message if update phone number api's return any error
        Then I can navigate to New PhoneNumber Verification if i submit form with all currect details