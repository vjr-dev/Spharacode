Feature: editProfile 

    Scenario: User navigates to editProfile 
        Given I am a User loading editProfile 
        When I navigate to the editProfile 
        Then editProfile will load with out errors
        And I can click goback button with out error
        And I can click editProfile button with out error
        And I can click imgurl1 button with out error
        And I can click imgurl2 button with out error
        And I can click stogrageClick button with out error
        And I can click floatinglabel1Btn button with out error
        And I can click modalDropdown button with out error
        And I can click countryShowBtn button with out error
        And I can click clocationBtn button with out error
        And I can click stateeShowBtn button with out error
        And I can click cityShowBtn button with out error
        And I can click textInputBtn button with out error
        And I can click setVisibilityBtn button with out error
        And updates label style when input is focused
        And I can leave the screen with out errors