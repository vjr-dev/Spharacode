Feature: Add Emergency Contact
    
     Scenario: User navigates to Add Emergency Contact Screen from Emergency contact screen
        Given User attempting to Add Emergency Contact
        When User navigate to the Add Emergency Contact Screen
        Then User can not use the back button functionality
        Then User can use the add new contact functionality
        Then User can not fetch contacts with error
        Then User can not use the delete contact functionality if only 1 contact present
        Then User can fetch contacts with out error
        Then User can use the delete contact functionality if more than 1 contact present
        Then User can not delete contact with error
        Then User can navigate to dashboard after press on done button
       
    
    Scenario: User navigates to Add Emergency Contact Screen from Profile screen
        Given User attempting to Add Emergency Contact
        When User navigate to the Add Emergency Contact Screen
        Then User can use the back button functionality
        Then User can go back to profile screen after press on done button