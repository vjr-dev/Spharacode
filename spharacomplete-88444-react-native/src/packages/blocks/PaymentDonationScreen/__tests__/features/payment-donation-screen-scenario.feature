Feature: Payment Donation Screen

    Scenario: User navigates to Payment Donation Screen
        Given I am a User attempting to Payment Donation
        When I navigate to the Payment Donation Screen
        Then I can press back button
        Then I can press google pay button
        Then I can press Rpay button
        Then I can press stripe pay button
        Then I can press apple pay button
        Then I can press done button
        Then SessionAPI call with out errors
       
       