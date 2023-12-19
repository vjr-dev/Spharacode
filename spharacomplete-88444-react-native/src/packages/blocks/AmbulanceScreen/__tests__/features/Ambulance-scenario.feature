Feature: AmbulanceScreen

    Scenario: User navigates to AmbulanceScreen
        Given I am a User loading AmbulanceScreen
        When I navigate to the AmbulanceScreen
        Then renders the loading indicator correctly
        Then fetch the data reason for calling ambulance
        Then user can enter the number
        Then user can pick image 1
        Then user can pick image 2
        Then user can pick image 3
        Then user can pick image 4
        Then I can click on send button withour error
        Then Ambulance api call with out error
        Then Handle back button press
        Then should update the state with the selected image data
        Then Handle alertoption button press
        And I can leave the screen with out errors