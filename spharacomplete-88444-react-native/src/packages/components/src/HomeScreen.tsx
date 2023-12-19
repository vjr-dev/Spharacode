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
import MobilePhoneToOTPAdapter from "../../blocks/adapters/src/MobilePhoneToOTPAdapter";
import OtpToNewPasswordAdapter from "../../blocks/adapters/src/OtpToNewPasswordAdapter";
import ForgotPasswordAdapter from "../../blocks/adapters/src/ForgotPasswordAdapter";
import MobilePhoneLogInAdapter from "../../blocks/adapters/src/MobilePhoneLogInAdapter";
import MobilePhoneToAdditionalDetailsAdapter from "../../blocks/adapters/src/MobilePhoneToAdditionalDetailsAdapter";
import SocialMediaLogInAdapter from "../../blocks/adapters/src/SocialMediaLogInAdapter";
import OnboardingAdapter from "../../blocks/adapters/src/OnboardingAdapter";

//Assembler generated adapters start
const mobilePhoneToOTPAdapter = new MobilePhoneToOTPAdapter();
const otpToNewPasswordAdapter = new OtpToNewPasswordAdapter();
const forgotPasswordAdapter = new ForgotPasswordAdapter();
const mobilePhoneLogInAdapter = new MobilePhoneLogInAdapter();
const mobilePhoneToAdditionalDetailsAdapter = new MobilePhoneToAdditionalDetailsAdapter();
const socialMediaLogInAdapter = new SocialMediaLogInAdapter();
const onboardingAdapter = new OnboardingAdapter();

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
                Welcome to SpharaComplete!
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
<CustomTextItem content={'Scheduling'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'OTPInputAuth'}  onPress={() => navigation.navigate("OTPInputAuth")} />
<CustomTextItem content={'core'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'ForgotPassword'}  onPress={() => navigation.navigate("ForgotPassword")} />
<CustomTextItem content={'CountryCodeSelector'}  onPress={() => navigation.navigate("CountryCodeSelector")} />
<CustomTextItem content={'MobileAccountLoginBlock'}  onPress={() => navigation.navigate("MobileAccountLoginBlock")} />
<CustomTextItem content={'PhoneNumberInput'}  onPress={() => navigation.navigate("PhoneNumberInput")} />
<CustomTextItem content={'Share'}  onPress={() => navigation.navigate("Share")} />
<CustomTextItem content={'Pushnotifications'}  onPress={() => navigation.navigate("Pushnotifications")} />
<CustomTextItem content={'Dashboard'}  onPress={() => navigation.navigate("Dashboard")} />
<CustomTextItem content={'Contactus'}  onPress={() => navigation.navigate("Contactus")} />
<CustomTextItem content={'Invitefriends'}  onPress={() => navigation.navigate("Invitefriends")} />
<CustomTextItem content={'UserProfileBasicBlock'}  onPress={() => navigation.navigate("UserProfileBasicBlock")} />
<CustomTextItem content={'SocialMediaAccountLoginScreen'}  onPress={() => navigation.navigate("SocialMediaAccountLoginScreen")} />
<CustomTextItem content={'social-media-account'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'SocialMediaAccountRegistrationScreen'}  onPress={() => navigation.navigate("SocialMediaAccountRegistrationScreen")} />
<CustomTextItem content={'Location'}  onPress={() => navigation.navigate("Location")} />
<CustomTextItem content={'CameraAccess'}  onPress={() => navigation.navigate("CameraAccess")} />
<CustomTextItem content={'Categoriessubcategories'}  onPress={() => navigation.navigate("Categoriessubcategories")} />
<CustomTextItem content={'Customform'}  onPress={() => navigation.navigate("Customform")} />
<CustomTextItem content={'Onboardingguide'}  onPress={() => navigation.navigate("Onboardingguide")} />
<CustomTextItem content={'Analytics'}  onPress={() => navigation.navigate("Analytics")} />
<CustomTextItem content={'Maps'}  onPress={() => navigation.navigate("Maps")} />
<CustomTextItem content={'Customisableusersubscriptions'}  onPress={() => navigation.navigate("Customisableusersubscriptions")} />
<CustomTextItem content={'PostCreation'}  onPress={() => navigation.navigate("PostCreation")} />
<CustomTextItem content={'Filteritems'}  onPress={() => navigation.navigate("Filteritems")} />
<CustomTextItem content={'Catalogue'}  onPress={() => navigation.navigate("Catalogue")} />
<CustomTextItem content={'GroupVideoCall2'}  onPress={() => navigation.navigate("GroupVideoCall2")} />
<CustomTextItem content={'Favourites'}  onPress={() => navigation.navigate("Favourites")} />
<CustomTextItem content={'PrivateChat'}  onPress={() => navigation.navigate("PrivateChat")} />
<CustomTextItem content={'SelfdestructMessaging'}  onPress={() => navigation.navigate("SelfdestructMessaging")} />
<CustomTextItem content={'OnlineBackup'}  onPress={() => navigation.navigate("OnlineBackup")} />
<CustomTextItem content={'ApplePayIntegration'}  onPress={() => navigation.navigate("ApplePayIntegration")} />
<CustomTextItem content={'ReviewAndApproval'}  onPress={() => navigation.navigate("ReviewAndApproval")} />
<CustomTextItem content={'Geofence'}  onPress={() => navigation.navigate("Geofence")} />
<CustomTextItem content={'RolesPermissions2'}  onPress={() => navigation.navigate("RolesPermissions2")} />
<CustomTextItem content={'ScreenSharing'}  onPress={() => navigation.navigate("ScreenSharing")} />
<CustomTextItem content={'Settings5'}  onPress={() => navigation.navigate("Settings5")} />
<CustomTextItem content={'UploadMedia2'}  onPress={() => navigation.navigate("UploadMedia2")} />
<CustomTextItem content={'DataStorage'}  onPress={() => navigation.navigate("DataStorage")} />
<CustomTextItem content={'EmergencySosGesture2'}  onPress={() => navigation.navigate("EmergencySosGesture2")} />
<CustomTextItem content={'CfConnectMoreSocialMediaPlatformsAndSmsmmsService2'}  onPress={() => navigation.navigate("CfConnectMoreSocialMediaPlatformsAndSmsmmsService2")} />
<CustomTextItem content={'CfVoiceAuthentication2'}  onPress={() => navigation.navigate("CfVoiceAuthentication2")} />
<CustomTextItem content={'ConferenceCall'}  onPress={() => navigation.navigate("ConferenceCall")} />
<CustomTextItem content={'CfCustomAlerts2'}  onPress={() => navigation.navigate("CfCustomAlerts2")} />
<CustomTextItem content={'GoogleAdsenseIntegration'}  onPress={() => navigation.navigate("GoogleAdsenseIntegration")} />
<CustomTextItem content={'CustomiseSounds'}  onPress={() => navigation.navigate("CustomiseSounds")} />
<CustomTextItem content={'EmailNotifications'}  onPress={() => navigation.navigate("EmailNotifications")} />
<CustomTextItem content={'EmergencySos'}  onPress={() => navigation.navigate("EmergencySos")} />
<CustomTextItem content={'RealtimeUpdates'}  onPress={() => navigation.navigate("RealtimeUpdates")} />
<CustomTextItem content={'Polling'}  onPress={() => navigation.navigate("Polling")} />
<CustomTextItem content={'GooglePayIntegration'}  onPress={() => navigation.navigate("GooglePayIntegration")} />
<CustomTextItem content={'GroupChat'}  onPress={() => navigation.navigate("GroupChat")} />
<CustomTextItem content={'Hashtags'}  onPress={() => navigation.navigate("Hashtags")} />
<CustomTextItem content={'SwitchAccounts'}  onPress={() => navigation.navigate("SwitchAccounts")} />
<CustomTextItem content={'AudioCall'}  onPress={() => navigation.navigate("AudioCall")} />
<CustomTextItem content={'InappPurchasing'}  onPress={() => navigation.navigate("InappPurchasing")} />
<CustomTextItem content={'Chatbot6'}  onPress={() => navigation.navigate("Chatbot6")} />
<CustomTextItem content={'ContactsIntegration'}  onPress={() => navigation.navigate("ContactsIntegration")} />
<CustomTextItem content={'ConversationThreading'}  onPress={() => navigation.navigate("ConversationThreading")} />
<CustomTextItem content={'DonationPayments'}  onPress={() => navigation.navigate("DonationPayments")} />
<CustomTextItem content={'CfMarketingPlatformPaidService3'}  onPress={() => navigation.navigate("CfMarketingPlatformPaidService3")} />
<CustomTextItem content={'LanguageDetection'}  onPress={() => navigation.navigate("LanguageDetection")} />
<CustomTextItem content={'Mentionstagging'}  onPress={() => navigation.navigate("Mentionstagging")} />
<CustomTextItem content={'PinConversation'}  onPress={() => navigation.navigate("PinConversation")} />
<CustomTextItem content={'DataEncryption'}  onPress={() => navigation.navigate("DataEncryption")} />
<CustomTextItem content={'CfParentalControls3'}  onPress={() => navigation.navigate("CfParentalControls3")} />
<CustomTextItem content={'Gallery'}  onPress={() => navigation.navigate("Gallery")} />
<CustomTextItem content={'RecommendationEngine4'}  onPress={() => navigation.navigate("RecommendationEngine4")} />
<CustomTextItem content={'IcloudSharing2'}  onPress={() => navigation.navigate("IcloudSharing2")} />
<CustomTextItem content={'CustomisedOrderStatus'}  onPress={() => navigation.navigate("CustomisedOrderStatus")} />
<CustomTextItem content={'CfDropboxIntegration2'}  onPress={() => navigation.navigate("CfDropboxIntegration2")} />
<CustomTextItem content={'CfGoogleDriveIntegration2'}  onPress={() => navigation.navigate("CfGoogleDriveIntegration2")} />
<CustomTextItem content={'CfMultiregionSupport'}  onPress={() => navigation.navigate("CfMultiregionSupport")} />
<CustomTextItem content={'Tutorials'}  onPress={() => navigation.navigate("Tutorials")} />

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