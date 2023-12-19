Feature: EmergencyContact

    Scenario: User navigates to Emergency Contact screen from Add Emergency Contact screen
        Given I am a User loading EmergencyContact
        When I navigate to the EmergencyContact
        Then If user come from Add Emergency contacts screen then back button should work
        Then User can open the add manual contact pop up
        Then User can enter the name
        Then User can enter the number
        Then User can change the contact type(like emergency, family and friends)
        Then User can save the emergency number manualy without error if user give name, number and contact type
        Then User can save the friend number manualy without error if user give name, number and contact type
        Then User can save the family number manualy without error if user give name, number and contact type
        Then User can not save any type of number if user do not give name
        Then User can not save any type of number if user do not give number
        Then User can close the add manual contact pop up
        Then User can select the emergency contacts from device's contacts
        Then User can select the friends contacts from device's contacts
        Then User can select the family contacts from device's contacts
        Then User can deselect the emergency contacts from device's contacts
        Then User can deselect the friends contacts from device's contacts
        Then User can deselect the family contacts from device's contacts
        Then User can save the device contact if selected
        Then Save contact API call with errors
        Then User can unmount screen without error

    Scenario: User navigates to Emergency Contact screen from Permission screen
        Given I am a User loading EmergencyContact
        When I navigate to the EmergencyContact
        Then Save contact API call with out errors
        Then If user come from Permission screen then back button should not work
        Then User can logout if user press logout button