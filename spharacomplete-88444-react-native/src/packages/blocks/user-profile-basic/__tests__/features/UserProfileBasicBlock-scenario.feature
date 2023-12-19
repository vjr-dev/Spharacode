Feature: UserProfileBasicBlock

    Scenario: User navigates to UserProfileBasicBlock
        Given I am a User loading UserProfileBasicBlock
        When I navigate to the UserProfileBasicBlock
        Then UserProfileBasicBlock will load with out errors
        And I can click goback button with out error
        And I can click public button with out error
        And I can click private button with out error
        And I can click editProfile button with out error
        And display flatlist data
        And display list data
        And display ArrFamily data
        And I can click healthBtn button with out error
        And I can click identificationBtn button with out error
        And CountryGetId request response successfully
        And CountryGetId request response error
        And GetUserCountryId request response successfully
        And GetUserCountryId request response error
        And StateGetId request response successfully
        And StateGetId request response error
        And CityGetId request response successfully
        And CityGetId request response error
        And ProfileGetId request response successfully
        And ProfileGetId request response error
        And MainProfileId request response successfully
        And MainProfileId request response error
        And editProfileId request response successfully
        And editProfileId request response error
        And should set Latitude and Longitude in state
        And should handle the error if the location cannot be obtained
        And I can leave the screen with out errors