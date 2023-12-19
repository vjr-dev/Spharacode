Feature: LanguageDetection

    Scenario: User navigates to LanguageDetection
        Given I am a User loading LanguageDetection
        When I navigate to the LanguageDetection
        Then LanguageDetection will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors