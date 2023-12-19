Feature: FireNotification

    Scenario: User navigates to FireNotification
        Given I am a User loading FireNotification
        When I navigate to the FireNotification
        Then FireNotification will load with out errors
        Then I can select the button with with out errors
        Then renders Text components for each item in contacttdata
        Then should call RNImmediatePhoneCall.immediatePhoneCall for Android
        Then should call Linking.openURL for iOS
        