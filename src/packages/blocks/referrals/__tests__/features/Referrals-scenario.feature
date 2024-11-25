Feature: Referrals

    Scenario: User navigates to Referrals
        Given I am a User loading Referrals
        When I navigate to the Referrals
        Then Referrals will load with out errors
        And render component did mount with url
        And render component did mount with error
        When Hide keyboard called button clicked
        Then Hide keyboard called
        When loading is false
        Then share social media called with facebook
        And share social media called with instagram
        And share social media called with whatsapp
        And share social media called with twitter
        And recieve function called with login code success
        And recieve function called with login code failed
        And recieve function called with referral code success
        And recieve function called with referral code failed
        And I can leave the screen with out errors