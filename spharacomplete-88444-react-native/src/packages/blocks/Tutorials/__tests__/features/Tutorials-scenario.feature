Feature: Tutorials

    Scenario: User navigates to Tutorials
        Given I am a User loading Tutorials
        When I navigate to the Tutorials
        Then Tutorials will load with out errors
        Then I should able to click the button without error
       