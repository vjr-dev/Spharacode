Feature: DonationPayments

    Scenario: User navigates to DonationPayments
        Given I am a User loading DonationPayments
        When I navigate to the DonationPayments
        Then DonationPayments will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors