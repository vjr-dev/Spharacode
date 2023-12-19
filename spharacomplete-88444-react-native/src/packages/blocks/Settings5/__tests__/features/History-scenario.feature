Feature: Navigate to History
    
     Scenario: User navigates to History Screen
        Given User loading History
        When User navigate to the History screeen
        Then User can able to click go back btn without error
        Then User can fetch alerts history without error
        Then User can navigate to history details screen if prees history item
        Then User can see the no data found text if history not available