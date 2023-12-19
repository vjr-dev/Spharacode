Feature: Fire Screen

    Scenario: User navigates to Fire Screen
        Given I am a User attempting to add fire incident
        When I navigate to the Fire Screen
        Then I can press injured people button
        Then I can press not injured button
        Then I can not press send button with out select amount
        Then I can press small amount button
        Then I can press medium amount button
        Then I can press big amount button
        Then I can press flems & smoke button
        Then I can press just smoke button
        Then I can press back button
        Then I can enter comment
        Then I can pick image1
        Then I can pick image2
        Then I can pick image3
        Then I can pick image4  
        Then I can not press send button with out select people injurd or not
        Then Fire api call with error
        Then Fire api call with out error
        Then I can press send button with all reason selected   
        Then I can not press send button with out select flems & smoke or just smoke 