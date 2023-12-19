Feature: MoreInSocial

    Scenario: User navigates to More In Social
        Given I am a User attempting to navigate MoreInSocial Screen
        When I navigate to the MoreInSocial Screen
        Then I can open the modal
        Then I can press call menu
        Then I can press bot menu
        Then I can press file menu
        Then I can press saved menu
        Then I can press alerts menu
        Then I can press notification menu
        Then I can press setting menu
    
    Scenario: User navigates to MenuComponent
        Given I am a User attempting to navigate MenuComponent
        When I navigate to the MenuComponent
        Then I can press menu button