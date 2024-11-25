import React from 'react';

import {
  createStackNavigator
} from "react-navigation";

import HomeScreen from "../components/src/HomeScreen";
import InfoPage from '../blocks/info-page/src/InfoPageBlock'
import AccountGroups from "../blocks/accountgroups/src/AccountGroups";
import StripePayments from "../blocks/stripepayments/src/StripePayments";
import SocialMediaAccountLogin from "../blocks/social-media-account/src/SocialMediaAccountLogin";
import SocialMediaAccountRegistration from "../blocks/social-media-account/src/SocialMediaAccountRegistration";
import Uploadmedia3 from "../blocks/uploadmedia3/src/Uploadmedia3";
import Cfspeedtrackingforthedriver from "../blocks/cfspeedtrackingforthedriver/src/Cfspeedtrackingforthedriver";
import ImportExportData from "../blocks/importexportdata/src/ImportExportData";
import Cfcaptaintocreatetrips from "../blocks/cfcaptaintocreatetrips/src/Cfcaptaintocreatetrips";
import SocialMediaAccountLoginScreen from "../blocks/social-media-account-login/src/SocialMediaAccountLoginScreen";
import ForgotPassword from "../blocks/forgot-password/src/ForgotPassword";
import ForgotPasswordOTP from "../blocks/forgot-password/src/ForgotPasswordOTP";
import NewPassword from "../blocks/forgot-password/src/NewPassword";
import VisualAnalytics from "../blocks/visualanalytics/src/VisualAnalytics";
import Cfwalletmanagement9 from "../blocks/cfwalletmanagement9/src/Cfwalletmanagement9";
import TermsConditions from "../blocks/termsconditions/src/TermsConditions";
import TermsConditionsDetail from "../blocks/termsconditions/src/TermsConditionsDetail";
import TermsConditionsUsers from "../blocks/termsconditions/src/TermsConditionsUsers";
import InvoiceBilling from "../blocks/invoicebilling/src/InvoiceBilling";
import SocialMediaAccountRegistrationScreen from "../blocks/social-media-account-registration/src/SocialMediaAccountRegistrationScreen";
import Emailnotifications2 from "../blocks/emailnotifications2/src/Emailnotifications2";
import CountryCodeSelector from "../blocks/country-code-selector/src/CountryCodeSelector";
import CountryCodeSelectorTable from "../blocks/country-code-selector/src/CountryCodeSelectorTable";
import UserProfileBasicBlock from "../blocks/user-profile-basic/src/UserProfileBasicBlock";
import Cfcalculatethecostoftrips from "../blocks/cfcalculatethecostoftrips/src/Cfcalculatethecostoftrips";
import Interactivefaqs from "../blocks/interactivefaqs/src/Interactivefaqs";
import AddInteractivefaqs from "../blocks/interactivefaqs/src/AddInteractivefaqs";
import Promocodes from "../blocks/promocodes/src/Promocodes";
import PromocodeDetails from "../blocks/promocodes/src/PromocodeDetails";
import Splashscreen from "../blocks/splashscreen/src/Splashscreen";
import PhoneNumberInput from "../blocks/mobile-account-registration/src/PhoneNumberInput";
import AdditionalDetailForm from "../blocks/mobile-account-registration/src/AdditionalDetailForm";
import Settings2 from "../blocks/settings2/src/Settings2";
import Pushnotifications from "../blocks/pushnotifications/src/Pushnotifications";
import ApiIntegration from "../blocks/apiintegration/src/ApiIntegration";
import Notifications from "../blocks/notifications/src/Notifications";
import MobileAccountLoginBlock from "../blocks/mobile-account-login/src/MobileAccountLoginBlock";
import AutomaticCheckoutCalculation from "../blocks/automaticcheckoutcalculation/src/AutomaticCheckoutCalculation";
import EmailAccountRegistration from "../blocks/email-account-registration/src/EmailAccountRegistration";
import Categoriessubcategories from "../blocks/categoriessubcategories/src/Categoriessubcategories";
import Adminconsole2 from "../blocks/adminconsole2/src/Adminconsole2";
import Location from "../blocks/location/src/Location";
import Analytics from "../blocks/analytics/src/Analytics";
import EmailAccountLoginBlock from "../blocks/email-account-login/src/EmailAccountLoginBlock";
import NavigationMenu from "../blocks/navigationmenu/src/NavigationMenu";
import AdvancedSearch from "../blocks/advancedsearch/src/AdvancedSearch";
import Cfstcpayintegration1 from "../blocks/cfstcpayintegration1/src/Cfstcpayintegration1";
import EducationalUserProfile from "../blocks/educational-user-profile/src/EducationalUserProfile";
import Tasks from "../blocks/tasks/src/Tasks";
import TaskList from "../blocks/tasks/src/TaskList";
import Task from "../blocks/tasks/src/Task";
import CarouselDisplay from "../blocks/carouseldisplay/src/CarouselDisplay";
import Reviews from "../blocks/reviews/src/Reviews";
import AddReview from "../blocks/reviews/src/AddReview";
import RequestManagement from "../blocks/requestmanagement/src/RequestManagement";
import Rolesandpermissions2 from "../blocks/rolesandpermissions2/src/Rolesandpermissions2";
import Audiototext from "../blocks/audiototext/src/Audiototext";
import Maps from "../blocks/maps/src/Maps";
import PricingEngine from "../blocks/pricingengine/src/PricingEngine";
import Cfsuggestavailabletripstothetraveller from "../blocks/cfsuggestavailabletripstothetraveller/src/Cfsuggestavailabletripstothetraveller";
import Geofence from "../blocks/geofence/src/Geofence";
import Chat from "../blocks/chat/src/Chat";
import ViewChat from "../blocks/chat/src/ViewChat";
import Scheduling from "../blocks/scheduling/src/Scheduling";
import Servicespecificsettingsadmin2 from "../blocks/servicespecificsettingsadmin2/src/Servicespecificsettingsadmin2";
import OTPInputAuth from "../blocks/otp-input-confirmation/src/OTPInputAuth";
import Contentmanagement1 from "../blocks/contentmanagement1/src/Contentmanagement1";
import Adminconsole from "../blocks/adminconsole/src/Adminconsole";
import Servicespecificsettingsadmin from "../blocks/servicespecificsettingsadmin/src/Servicespecificsettingsadmin";
import Twofactorauthentication from "../blocks/twofactorauthentication/src/Twofactorauthentication";
import Signuplogin from "../blocks/signuplogin/src/Signuplogin";
import Calendar from "../blocks/calendar/src/Calendar";
import Analytics1 from "../blocks/analytics1/src/Analytics1";
import Termsandconditions from "../blocks/termsandconditions/src/Termsandconditions";
import Splashscreen1 from "../blocks/splashscreen1/src/Splashscreen1";
import Rolesandpermissions from "../blocks/rolesandpermissions/src/Rolesandpermissions";
import Dashboard4 from "../blocks/dashboard4/src/Dashboard4";
import Settings from "../blocks/settings/src/Settings";
import Payments from "../blocks/payments/src/Payments";



const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen, navigationOptions: { header: null, title: "Home" } },
Contentmanagement1:{ screen:Contentmanagement1,navigationOptions:{ title:"Contentmanagement1"}},
Adminconsole:{ screen:Adminconsole,navigationOptions:{ title:"Adminconsole"}},
Servicespecificsettingsadmin:{ screen:Servicespecificsettingsadmin,navigationOptions:{ title:"Servicespecificsettingsadmin"}},
Twofactorauthentication:{ screen:Twofactorauthentication,navigationOptions:{ title:"Twofactorauthentication"}},
Signuplogin:{ screen:Signuplogin,navigationOptions:{ title:"Signuplogin"}},
Calendar:{ screen:Calendar,navigationOptions:{ title:"Calendar"}},
Analytics1:{ screen:Analytics1,navigationOptions:{ title:"Analytics1"}},
Termsandconditions:{ screen:Termsandconditions,navigationOptions:{ title:"Termsandconditions"}},
Splashscreen1:{ screen:Splashscreen1,navigationOptions:{ title:"Splashscreen1"}},
Rolesandpermissions:{ screen:Rolesandpermissions,navigationOptions:{ title:"Rolesandpermissions"}},
Dashboard4:{ screen:Dashboard4,navigationOptions:{ title:"Dashboard4"}},
Settings:{ screen:Settings,navigationOptions:{ title:"Settings"}},
Payments:{ screen:Payments,navigationOptions:{ title:"Payments"}},

AccountGroups:{ screen:AccountGroups,navigationOptions:{ title:"AccountGroups"}},
StripePayments:{ screen:StripePayments,navigationOptions:{ title:"StripePayments"}},
SocialMediaAccountLogin:{ screen:SocialMediaAccountLogin,navigationOptions:{ title:"SocialMediaAccountLogin"}},
SocialMediaAccountRegistration:{ screen:SocialMediaAccountRegistration,navigationOptions:{ title:"SocialMediaAccountRegistration"}},
Uploadmedia3:{ screen:Uploadmedia3,navigationOptions:{ title:"Uploadmedia3"}},
Cfspeedtrackingforthedriver:{ screen:Cfspeedtrackingforthedriver,navigationOptions:{ title:"Cfspeedtrackingforthedriver"}},
ImportExportData:{ screen:ImportExportData,navigationOptions:{ title:"ImportExportData"}},
Cfcaptaintocreatetrips:{ screen:Cfcaptaintocreatetrips,navigationOptions:{ title:"Cfcaptaintocreatetrips"}},
SocialMediaAccountLoginScreen:{ screen:SocialMediaAccountLoginScreen,navigationOptions:{ title:"SocialMediaAccountLoginScreen"}},
ForgotPassword:{ screen:ForgotPassword,navigationOptions:{ title:"ForgotPassword"}},
ForgotPasswordOTP:{ screen:ForgotPasswordOTP,navigationOptions:{ title:"ForgotPasswordOTP"}},
NewPassword:{ screen:NewPassword,navigationOptions:{ title:"NewPassword"}},
VisualAnalytics:{ screen:VisualAnalytics,navigationOptions:{ title:"VisualAnalytics"}},
Cfwalletmanagement9:{ screen:Cfwalletmanagement9,navigationOptions:{ title:"Cfwalletmanagement9"}},
TermsConditions:{ screen:TermsConditions,navigationOptions:{ title:"TermsConditions"}},
TermsConditionsDetail:{ screen:TermsConditionsDetail,navigationOptions:{ title:"TermsConditionsDetail"}},
TermsConditionsUsers:{ screen:TermsConditionsUsers,navigationOptions:{ title:"TermsConditionsUsers"}},
InvoiceBilling:{ screen:InvoiceBilling,navigationOptions:{ title:"InvoiceBilling"}},
SocialMediaAccountRegistrationScreen:{ screen:SocialMediaAccountRegistrationScreen,navigationOptions:{ title:"SocialMediaAccountRegistrationScreen"}},
Emailnotifications2:{ screen:Emailnotifications2,navigationOptions:{ title:"Emailnotifications2"}},
CountryCodeSelector:{ screen:CountryCodeSelector,navigationOptions:{ title:"CountryCodeSelector"}},
CountryCodeSelectorTable:{ screen:CountryCodeSelectorTable,navigationOptions:{ title:"CountryCodeSelectorTable"}},
UserProfileBasicBlock:{ screen:UserProfileBasicBlock,navigationOptions:{ title:"UserProfileBasicBlock"}},
Cfcalculatethecostoftrips:{ screen:Cfcalculatethecostoftrips,navigationOptions:{ title:"Cfcalculatethecostoftrips"}},
Interactivefaqs:{ screen:Interactivefaqs,navigationOptions:{ title:"Interactivefaqs"}},
AddInteractivefaqs:{ screen:AddInteractivefaqs,navigationOptions:{ title:"AddInteractivefaqs"}},
Promocodes:{ screen:Promocodes,navigationOptions:{ title:"Promocodes"}},
PromocodeDetails:{ screen:PromocodeDetails,navigationOptions:{ title:"PromocodeDetails"}},
Splashscreen:{ screen:Splashscreen,navigationOptions:{ title:"Splashscreen"}},
PhoneNumberInput:{ screen:PhoneNumberInput,navigationOptions:{ title:"PhoneNumberInput"}},
AdditionalDetailForm:{ screen:AdditionalDetailForm,navigationOptions:{ title:"AdditionalDetailForm"}},
Settings2:{ screen:Settings2,navigationOptions:{ title:"Settings2"}},
Pushnotifications:{ screen:Pushnotifications,navigationOptions:{ title:"Pushnotifications"}},
ApiIntegration:{ screen:ApiIntegration,navigationOptions:{ title:"ApiIntegration"}},
Notifications:{ screen:Notifications,navigationOptions:{ title:"Notifications"}},
MobileAccountLoginBlock:{ screen:MobileAccountLoginBlock,navigationOptions:{ title:"MobileAccountLoginBlock"}},
AutomaticCheckoutCalculation:{ screen:AutomaticCheckoutCalculation,navigationOptions:{ title:"AutomaticCheckoutCalculation"}},
EmailAccountRegistration:{ screen:EmailAccountRegistration,navigationOptions:{ title:"EmailAccountRegistration"}},
Categoriessubcategories:{ screen:Categoriessubcategories,navigationOptions:{ title:"Categoriessubcategories"}},
Adminconsole2:{ screen:Adminconsole2,navigationOptions:{ title:"Adminconsole2"}},
Location:{ screen:Location,navigationOptions:{ title:"Location"}},
Analytics:{ screen:Analytics,navigationOptions:{ title:"Analytics"}},
EmailAccountLoginBlock:{ screen:EmailAccountLoginBlock,navigationOptions:{ title:"EmailAccountLoginBlock"}},
NavigationMenu:{ screen:NavigationMenu,navigationOptions:{ title:"NavigationMenu"}},
AdvancedSearch:{ screen:AdvancedSearch,navigationOptions:{ title:"AdvancedSearch"}},
Cfstcpayintegration1:{ screen:Cfstcpayintegration1,navigationOptions:{ title:"Cfstcpayintegration1"}},
EducationalUserProfile:{ screen:EducationalUserProfile,navigationOptions:{ title:"EducationalUserProfile"}},
Tasks:{ screen:Tasks,navigationOptions:{ title:"Tasks"}},
TaskList:{ screen:TaskList,navigationOptions:{ title:"TaskList"}},
Task:{ screen:Task,navigationOptions:{ title:"Task"}},
CarouselDisplay:{ screen:CarouselDisplay,navigationOptions:{ title:"CarouselDisplay"}},
Reviews:{ screen:Reviews,navigationOptions:{ title:"Reviews"}},
AddReview:{ screen:AddReview,navigationOptions:{ title:"AddReview"}},
RequestManagement:{ screen:RequestManagement,navigationOptions:{ title:"RequestManagement"}},
Rolesandpermissions2:{ screen:Rolesandpermissions2,navigationOptions:{ title:"Rolesandpermissions2"}},
Audiototext:{ screen:Audiototext,navigationOptions:{ title:"Audiototext"}},
Maps:{ screen:Maps,navigationOptions:{ title:"Maps"}},
PricingEngine:{ screen:PricingEngine,navigationOptions:{ title:"PricingEngine"}},
Cfsuggestavailabletripstothetraveller:{ screen:Cfsuggestavailabletripstothetraveller,navigationOptions:{ title:"Cfsuggestavailabletripstothetraveller"}},
Geofence:{ screen:Geofence,navigationOptions:{ title:"Geofence"}},
Chat:{ screen:Chat,navigationOptions:{ title:"Chat"}},
ViewChat:{ screen:ViewChat,navigationOptions:{ title:"ViewChat"}},
Scheduling:{ screen:Scheduling,navigationOptions:{ title:"Scheduling"}},
Servicespecificsettingsadmin2:{ screen:Servicespecificsettingsadmin2,navigationOptions:{ title:"Servicespecificsettingsadmin2"}},
OTPInputAuth:{ screen:OTPInputAuth,navigationOptions:{ title:"OTPInputAuth"}},

  InfoPage: { screen: InfoPage, navigationOptions: { title: "Info" } }, 
});

if (!HomeScreen.instance) {
  const defaultProps = {
    navigation: null,
    id: "HomeScreen"
  };
  const homeScreen = new HomeScreen(defaultProps);
}

export function App() {
  return (
    <HomeStack />
  );
};