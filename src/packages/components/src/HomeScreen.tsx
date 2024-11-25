import React from "react";
import {
  View,
  Text,
  Platform,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  // Customizable Area Start
  // Customizable Area End
} from "react-native";
import { BlockComponent } from "../../framework/src/BlockComponent";
import AlertBlock from '../../blocks/alert/src/AlertBlock';
import CustomTextItem from "./CustomTextItem";
import NavigationBlock from "../../framework/src/Blocks/NavigationBlock";
import SingletonFactory from '../../framework/src/SingletonFactory';

import HomeScreenAdapter from '../../blocks/adapters/src/HomeScreenAdapter';
import InfoPageAdapter from '../../blocks/adapters/src/InfoPageAdapter';
import AlertPageWebAdapter from "../../blocks/adapters/src/AlertPageWebAdapter";

// Customizable Area Start
import PrivacyPolicyAdapter from "../../blocks/adapters/src/PrivacyPolicyAdapter";
import TermsAndConditionAdapter from "../../blocks/adapters/src/TermsAndConditionAdapter";
import SplashScreenAdapter from "../../blocks/adapters/src/SplashScreenAdapter";
import SocialMediaLogInAdapter from "../../blocks/adapters/src/SocialMediaLogInAdapter";
import SocialMediaAccountLoginAdapter from "../../blocks/adapters/src/SocialMediaAccountLoginAdapter";
import EmailAccountLogInAdapter from "../../blocks/adapters/src/EmailAccountLogInAdapter";
import EmailAccountSignUpAdapter from "../../blocks/adapters/src/EmailAccountSignUpAdapter";
import ForgotPasswordAdapter from "../../blocks/adapters/src/ForgotPasswordAdapter";
import MobilePhoneToOTPAdapter from "../../blocks/adapters/src/MobilePhoneToOTPAdapter";
import OtpToNewPasswordAdapter from "../../blocks/adapters/src/OtpToNewPasswordAdapter";
import MobilePhoneLogInAdapter from "../../blocks/adapters/src/MobilePhoneLogInAdapter";
import MobilePhoneToAdditionalDetailsAdapter from "../../blocks/adapters/src/MobilePhoneToAdditionalDetailsAdapter";

//Assembler generated adapters start

//Assembler generated adapters end



//Assembler generated adapters start
const socialMediaLogInAdapter = new SocialMediaLogInAdapter();
const socialMediaAccountLoginAdapter = new SocialMediaAccountLoginAdapter();
const emailAccountLogInAdapter = new EmailAccountLogInAdapter();
const emailAccountSignUpAdapter = new EmailAccountSignUpAdapter();
const forgotPasswordAdapter = new ForgotPasswordAdapter();
const mobilePhoneToOTPAdapter = new MobilePhoneToOTPAdapter();
const otpToNewPasswordAdapter = new OtpToNewPasswordAdapter();
const mobilePhoneLogInAdapter = new MobilePhoneLogInAdapter();
const mobilePhoneToAdditionalDetailsAdapter = new MobilePhoneToAdditionalDetailsAdapter();

//Assembler generated adapters end



const privacyAdapter = new PrivacyPolicyAdapter();
const termAndConditionAdapter = new TermsAndConditionAdapter();
const splashScreenAdapter = new SplashScreenAdapter();
// Customizable Area End


const restAPIBlock = SingletonFactory.getRestBlockInstance();
const alertBlock = new AlertBlock();
const navigationBlock = new NavigationBlock();
const sessionBlock = SingletonFactory.getSessionBlockInstance();
const userAccountManagerBlock = SingletonFactory.getUserManagerInstance();
const homeScreenAdapter = new HomeScreenAdapter();
const infoPageAdapter = new InfoPageAdapter();
const alertPageWebAdapter = new AlertPageWebAdapter()

const instructions = Platform.select({
  // Customizable Area Start
  ios: "The iOS APP to rule them all!",
  android: "Now with Android AI",
  web: "Selector your adventure."
  // Customizable Area End
});

interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

// Customizable Area Start
interface S { }

interface SS { }

class HomeScreen extends BlockComponent<Props, S, SS> {

  static instance:HomeScreen;

  constructor(props: Props) {
    super(props);
    HomeScreen.instance = this;
  }

  render() {
    const { navigation } = this.props;
    const _this = this;

    return (
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.scrollView} bounces={false}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.welcome}>
                Welcome to SUBERApplicationSAR!
              </Text>
            </View>

            <Text style={styles.instructions}>{instructions}</Text>
            <Text style={styles.header}>DEFAULT BLOCKS</Text>
            <CustomTextItem
              content={'InfoPage'}
              onPress={() => navigation.navigate("InfoPage")}
            />
            <CustomTextItem
              content={'Alert'}
              onPress={() => this.showAlert("Example", "This happened")}
            />
<CustomTextItem content={'searchhistory'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'core'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'timetrackingbilling'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'utilities'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'Interactivefaqs'}  onPress={() => navigation.navigate("Interactivefaqs")} />
<CustomTextItem content={'taxcalculator'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'Maps'}  onPress={() => navigation.navigate("Maps")} />
<CustomTextItem content={'Location'}  onPress={() => navigation.navigate("Location")} />
<CustomTextItem content={'Analytics'}  onPress={() => navigation.navigate("Analytics")} />
<CustomTextItem content={'NavigationMenu'}  onPress={() => navigation.navigate("NavigationMenu")} />
<CustomTextItem content={'StripePayments'}  onPress={() => navigation.navigate("StripePayments")} />
<CustomTextItem content={'SocialMediaAccountRegistrationScreen'}  onPress={() => navigation.navigate("SocialMediaAccountRegistrationScreen")} />
<CustomTextItem content={'SocialMediaAccountLogin'}  onPress={() => navigation.navigate("SocialMediaAccountLogin")} />
<CustomTextItem content={'EmailAccountLoginBlock'}  onPress={() => navigation.navigate("EmailAccountLoginBlock")} />
<CustomTextItem content={'EmailAccountRegistration'}  onPress={() => navigation.navigate("EmailAccountRegistration")} />
<CustomTextItem content={'CountryCodeSelector'}  onPress={() => navigation.navigate("CountryCodeSelector")} />
<CustomTextItem content={'ForgotPassword'}  onPress={() => navigation.navigate("ForgotPassword")} />
<CustomTextItem content={'OTPInputAuth'}  onPress={() => navigation.navigate("OTPInputAuth")} />
<CustomTextItem content={'SocialMediaAccountLoginScreen'}  onPress={() => navigation.navigate("SocialMediaAccountLoginScreen")} />
<CustomTextItem content={'Scheduling'}  onPress={() => navigation.navigate("Scheduling")} />
<CustomTextItem content={'refundmanagement'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'ApiIntegration'}  onPress={() => navigation.navigate("ApiIntegration")} />
<CustomTextItem content={'MobileAccountLoginBlock'}  onPress={() => navigation.navigate("MobileAccountLoginBlock")} />
<CustomTextItem content={'PhoneNumberInput'}  onPress={() => navigation.navigate("PhoneNumberInput")} />
<CustomTextItem content={'dashboard'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'Tasks'}  onPress={() => navigation.navigate("Tasks")} />
<CustomTextItem content={'AccountGroups'}  onPress={() => navigation.navigate("AccountGroups")} />
<CustomTextItem content={'Geofence'}  onPress={() => navigation.navigate("Geofence")} />
<CustomTextItem content={'referrals'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'Pushnotifications'}  onPress={() => navigation.navigate("Pushnotifications")} />
<CustomTextItem content={'Notifications'}  onPress={() => navigation.navigate("Notifications")} />
<CustomTextItem content={'UserProfileBasicBlock'}  onPress={() => navigation.navigate("UserProfileBasicBlock")} />
<CustomTextItem content={'EducationalUserProfile'}  onPress={() => navigation.navigate("EducationalUserProfile")} />
<CustomTextItem content={'TermsConditions'}  onPress={() => navigation.navigate("TermsConditions")} />
<CustomTextItem content={'PricingEngine'}  onPress={() => navigation.navigate("PricingEngine")} />
<CustomTextItem content={'realtimeupdates'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'RequestManagement'}  onPress={() => navigation.navigate("RequestManagement")} />
<CustomTextItem content={'Splashscreen'}  onPress={() => navigation.navigate("Splashscreen")} />
<CustomTextItem content={'CarouselDisplay'}  onPress={() => navigation.navigate("CarouselDisplay")} />
<CustomTextItem content={'Reviews'}  onPress={() => navigation.navigate("Reviews")} />
<CustomTextItem content={'InvoiceBilling'}  onPress={() => navigation.navigate("InvoiceBilling")} />
<CustomTextItem content={'Promocodes'}  onPress={() => navigation.navigate("Promocodes")} />
<CustomTextItem content={'contentmanagement'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'Categoriessubcategories'}  onPress={() => navigation.navigate("Categoriessubcategories")} />
<CustomTextItem content={'Chat'}  onPress={() => navigation.navigate("Chat")} />
<CustomTextItem content={'AutomaticCheckoutCalculation'}  onPress={() => navigation.navigate("AutomaticCheckoutCalculation")} />
<CustomTextItem content={'AdvancedSearch'}  onPress={() => navigation.navigate("AdvancedSearch")} />
<CustomTextItem content={'ImportExportData'}  onPress={() => navigation.navigate("ImportExportData")} />
<CustomTextItem content={'VisualAnalytics'}  onPress={() => navigation.navigate("VisualAnalytics")} />
<CustomTextItem content={'Audiototext'}  onPress={() => navigation.navigate("Audiototext")} />
<CustomTextItem content={'Rolesandpermissions2'}  onPress={() => navigation.navigate("Rolesandpermissions2")} />
<CustomTextItem content={'Adminconsole2'}  onPress={() => navigation.navigate("Adminconsole2")} />
<CustomTextItem content={'Emailnotifications2'}  onPress={() => navigation.navigate("Emailnotifications2")} />
<CustomTextItem content={'Servicespecificsettingsadmin2'}  onPress={() => navigation.navigate("Servicespecificsettingsadmin2")} />
<CustomTextItem content={'Uploadmedia3'}  onPress={() => navigation.navigate("Uploadmedia3")} />
<CustomTextItem content={'Settings2'}  onPress={() => navigation.navigate("Settings2")} />
<CustomTextItem content={'Cfcalculatethecostoftrips'}  onPress={() => navigation.navigate("Cfcalculatethecostoftrips")} />
<CustomTextItem content={'Cfsuggestavailabletripstothetraveller'}  onPress={() => navigation.navigate("Cfsuggestavailabletripstothetraveller")} />
<CustomTextItem content={'Cfcaptaintocreatetrips'}  onPress={() => navigation.navigate("Cfcaptaintocreatetrips")} />
<CustomTextItem content={'Cfwalletmanagement9'}  onPress={() => navigation.navigate("Cfwalletmanagement9")} />
<CustomTextItem content={'Cfstcpayintegration1'}  onPress={() => navigation.navigate("Cfstcpayintegration1")} />
<CustomTextItem content={'Cfspeedtrackingforthedriver'}  onPress={() => navigation.navigate("Cfspeedtrackingforthedriver")} />

<CustomTextItem content={'Calendar'}  onPress={() => navigation.navigate("Calendar")} />
<CustomTextItem content={'Adminconsole'}  onPress={() => navigation.navigate("Adminconsole")} />
<CustomTextItem content={'Analytics1'}  onPress={() => navigation.navigate("Analytics1")} />
<CustomTextItem content={'Payments'}  onPress={() => navigation.navigate("Payments")} />
<CustomTextItem content={'Rolesandpermissions'}  onPress={() => navigation.navigate("Rolesandpermissions")} />
<CustomTextItem content={'Servicespecificsettingsadmin'}  onPress={() => navigation.navigate("Servicespecificsettingsadmin")} />
<CustomTextItem content={'Settings'}  onPress={() => navigation.navigate("Settings")} />
<CustomTextItem content={'Signuplogin'}  onPress={() => navigation.navigate("Signuplogin")} />
<CustomTextItem content={'Splashscreen1'}  onPress={() => navigation.navigate("Splashscreen1")} />
<CustomTextItem content={'Termsandconditions'}  onPress={() => navigation.navigate("Termsandconditions")} />
<CustomTextItem content={'Twofactorauthentication'}  onPress={() => navigation.navigate("Twofactorauthentication")} />
<CustomTextItem content={'Contentmanagement1'}  onPress={() => navigation.navigate("Contentmanagement1")} />
<CustomTextItem content={'Dashboard4'}  onPress={() => navigation.navigate("Dashboard4")} />

          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
// Customizable Area End

// Customizable Area Start
const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    height: Platform.OS === "web" ? '100vh' : 'auto',
    backgroundColor: "#F5FCFF"
  },
  container: {
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "white"
  },
  instructions: {
    textAlign: "center",
    color: "#6200EE",
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 16,

    padding: 10
  },
  button: {
    backgroundColor: '#6200EE',
    padding: 15,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  header: {
    backgroundColor: '#6200EE',
    padding: 15,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  item: {
    backgroundColor: '#00000000',
    padding: 18,
    color: '#6200EE',
    fontSize: 16,
    fontWeight: 'normal'
  }
});
// Customizable Area End
export default HomeScreen;