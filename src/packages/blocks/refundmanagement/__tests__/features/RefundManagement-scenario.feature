Feature: RefundManagement

   Scenario: User navigates to RefundManagement
    Given I am a User loading RefundManagement
   
   When list of Orders Api network request is called
   Then list of Orders will set

   When I can enter empty amount
   Then Expected value of changed refund amount field

   When I can click yes button to check condition
   Then Expected value of changed ismsgShow field

   When I can enter a refund amount
   Then Expected value of changed refund amount field

   When I can select the yes button with out errors
   Then Expected value of changed field

   When I can select the No button with out errors
   Then Expected value of changed field
