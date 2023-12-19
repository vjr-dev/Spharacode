Feature: IcloudSharing2

    Scenario: User navigates to IcloudSharing2
        Given I am a User loading IcloudSharing2
        When I navigate to the IcloudSharing2
        Then User can not use the iCloud serves if user have android device
        Then User can use the iCloud serves if user have ios device