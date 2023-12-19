Feature: Navigate to IncidentReport
    
     Scenario: User navigates to DashBord Screen
        Given User loading DashBord
        When User navigate to the DashBord screeen
        Then User can not details with error
        Then User can fetch details with out error
        Then User can not submit report with out incidentDescription
        Then User can submit report with out AmbulanceReport incident
        Then I can enter description with out errors
        Then User can not submit report with error
        Then User can submit report with out error
        Then User can able to tick injerd option
        Then User can not submit report with out injured
        Then User can able to tick not Injerd option
        Then User can not submit report if is injured and no details about treatmentProvided
        Then User can able to tick Treatment Provided option
        Then User can able to tick Treatment not provided option
        Then User can able to tick Refused Treatment option
        When User can able to navigate to the Home screeen
        Then User can leave the screen with out errors
       