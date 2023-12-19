Feature: FirstResponderSetWorkingHours 
 Scenario: User navigates to FirstResponderSetWorkingHours
        Given I am a User loading FirstResponderSetWorkingHours
        When I navigate to the FirstResponderSetWorkingHours
        Then calls hideKeyboard function on touchable press
        And I can click goBack button with out error
        And I can see list of days with option to add time icon
        And I can click on save button to save data
        And getWeekData request response successfull
        And getWeekData request response error
        And I can click on plus icon for time to enter
        And I can click on plus icon for time to exit
        And I can click on cancel icon for time to enter
        And I can click on cancel icon for time to exit
        And should toggle modal from
        And should toggle modal from when modalVisibleFrom false
        And should toggle modal to
        And should handle minute press
        And should handle hour press
        And should handle time selection from clock face hour
        And should handle time selection from clock face minute
        And should handle timeConverter function and converts AM time correctly
        And should handle timeConverter function and converts PM time correctly
        And should handle 12:30 PM correctly
        And should handle 12:00 AM correctly
        And should toggle enter time item selection correctly
        And should call inTimeModal correctly
        And should call outTimeModal correctly
        And I can click on button to cancel modal without error
        And I can click on button to cancel modal on exit time without error
        And I can click on button to save modal without error
        And should delete in time correctly
        And should delete out time correctly
        And I can click on button to change clock to Hour face
        And I can click on button to change clock to Minute face
        And I can click on button to change time mode to AM
        And I can click on button to change time mode to PM
