// App.js - WEB
import React, { Component } from "react";
import { View } from "react-native";
import firebase from 'firebase'
import { connect } from 'react-firebase'

import WebRoutesGenerator from "../../components/src/NativeWebRouteWrapper";
import { ModalContainer } from "react-router-modal";
import HomeScreen from "../../components/src/HomeScreen";
import TopNav from "../../components/src/TopNav";

import InfoPage from '../../blocks/info-page/src/InfoPageBlock'
import AlertBlock from '../../blocks/alert/src/AlertBlock.web'
import RecommendationEngine4 from "../../blocks/RecommendationEngine4/src/RecommendationEngine4";
import RealtimeUpdates from "../../blocks/RealtimeUpdates/src/RealtimeUpdates";
import Share from "../../blocks/share/src/Share";
import AudioCall from "../../blocks/AudioCall/src/AudioCall";
import ContactsIntegration from "../../blocks/ContactsIntegration/src/ContactsIntegration";
import MobileAccountLoginBlock from "../../blocks/mobile-account-login/src/MobileAccountLoginBlock";
import Pushnotifications from "../../blocks/pushnotifications/src/Pushnotifications";
import EmergencySos from "../../blocks/EmergencySos/src/EmergencySos";
import OnlineBackup from "../../blocks/OnlineBackup/src/OnlineBackup";
import CountryCodeSelector from "../../blocks/country-code-selector/src/CountryCodeSelector";
import Scheduling from "../../blocks/scheduling/src/Scheduling";
import PrivateChat from "../../blocks/PrivateChat/src/PrivateChat";
import GroupVideoCall2 from "../../blocks/GroupVideoCall2/src/GroupVideoCall2";
import CfDropboxIntegration2 from "../../blocks/CfDropboxIntegration2/src/CfDropboxIntegration2";
import SelfdestructMessaging from "../../blocks/SelfdestructMessaging/src/SelfdestructMessaging";
import ConversationThreading from "../../blocks/ConversationThreading/src/ConversationThreading";
import DonationPayments from "../../blocks/DonationPayments/src/DonationPayments";
import Analytics from "../../blocks/analytics/src/Analytics";
import EmailNotifications from "../../blocks/EmailNotifications/src/EmailNotifications";
import InappPurchasing from "../../blocks/InappPurchasing/src/InappPurchasing";
import CfConnectMoreSocialMediaPlatformsAndSmsmmsService2 from "../../blocks/CfConnectMoreSocialMediaPlatformsAndSmsmmsService2/src/CfConnectMoreSocialMediaPlatformsAndSmsmmsService2";
import Onboardingguide from "../../blocks/onboardingguide/src/Onboardingguide";
import ReviewAndApproval from "../../blocks/ReviewAndApproval/src/ReviewAndApproval";
import CfMarketingPlatformPaidService3 from "../../blocks/CfMarketingPlatformPaidService3/src/CfMarketingPlatformPaidService3";
import Polling from "../../blocks/Polling/src/Polling";
import CustomisedOrderStatus from "../../blocks/CustomisedOrderStatus/src/CustomisedOrderStatus";
import GooglePayIntegration from "../../blocks/GooglePayIntegration/src/GooglePayIntegration";
import Chatbot6 from "../../blocks/Chatbot6/src/Chatbot6";
import Hashtags from "../../blocks/Hashtags/src/Hashtags";
import Customform from "../../blocks/customform/src/Customform";
import EmergencySosGesture2 from "../../blocks/EmergencySosGesture2/src/EmergencySosGesture2";
import OTPInputAuth from "../../blocks/otp-input-confirmation/src/OTPInputAuth";
import Search from "../../blocks/search/src/Search";
import Gallery from "../../blocks/Gallery/src/Gallery";
import ForgotPassword from "../../blocks/forgot-password/src/ForgotPassword";
import ForgotPasswordOTP from "../../blocks/forgot-password/src/ForgotPasswordOTP";
import NewPassword from "../../blocks/forgot-password/src/NewPassword";
import Catalogue from "../../blocks/catalogue/src/Catalogue";
import CfVoiceAuthentication2 from "../../blocks/CfVoiceAuthentication2/src/CfVoiceAuthentication2";
import UserProfileBasicBlock from "../../blocks/user-profile-basic/src/UserProfileBasicBlock";
import PinConversation from "../../blocks/PinConversation/src/PinConversation";
import UploadMedia2 from "../../blocks/UploadMedia2/src/UploadMedia2";
import ApiIntegration from "../../blocks/apiintegration/src/ApiIntegration";
import Location from "../../blocks/location/src/Location";
import Settings5 from "../../blocks/Settings5/src/Settings5";
import PhoneNumberInput from "../../blocks/mobile-account-registration/src/PhoneNumberInput";
import AdditionalDetailForm from "../../blocks/mobile-account-registration/src/AdditionalDetailForm";
import Categoriessubcategories from "../../blocks/categoriessubcategories/src/Categoriessubcategories";
import SocialMediaAccountLoginScreen from "../../blocks/social-media-account-login/src/SocialMediaAccountLoginScreen";
import Filteritems from "../../blocks/filteritems/src/Filteritems";
import Filteroptions from "../../blocks/filteritems/src/Filteroptions";
import Contactus from "../../blocks/contactus/src/Contactus";
import AddContactus from "../../blocks/contactus/src/AddContactus";
import CfCustomAlerts2 from "../../blocks/CfCustomAlerts2/src/CfCustomAlerts2";
import Geofence from "../../blocks/Geofence/src/Geofence";
import DataStorage from "../../blocks/DataStorage/src/DataStorage";
import Mentionstagging from "../../blocks/Mentionstagging/src/Mentionstagging";
import Favourites from "../../blocks/Favourites/src/Favourites";
import GoogleAdsenseIntegration from "../../blocks/GoogleAdsenseIntegration/src/GoogleAdsenseIntegration";
import Invitefriends from "../../blocks/invitefriends/src/Invitefriends";
import Videos from "../../blocks/videos/src/Videos";
import PostCreation from "../../blocks/postcreation/src/PostCreation";
import Posts from "../../blocks/postcreation/src/Posts";
import PostDetails from "../../blocks/postcreation/src/PostDetails";
import RolesPermissions2 from "../../blocks/RolesPermissions2/src/RolesPermissions2";
import Customisableusersubscriptions from "../../blocks/customisableusersubscriptions/src/Customisableusersubscriptions";
import SubscriptionDetails from "../../blocks/customisableusersubscriptions/src/SubscriptionDetails";
import CfParentalControls3 from "../../blocks/CfParentalControls3/src/CfParentalControls3";
import CameraAccess from "../../blocks/cameraaccess/src/CameraAccess";
import GroupChat from "../../blocks/GroupChat/src/GroupChat";
import ScreenSharing from "../../blocks/ScreenSharing/src/ScreenSharing";
import CfGoogleDriveIntegration2 from "../../blocks/CfGoogleDriveIntegration2/src/CfGoogleDriveIntegration2";
import Maps from "../../blocks/maps/src/Maps";
import IcloudSharing2 from "../../blocks/IcloudSharing2/src/IcloudSharing2";
import CustomiseSounds from "../../blocks/CustomiseSounds/src/CustomiseSounds";
import ApplePayIntegration from "../../blocks/ApplePayIntegration/src/ApplePayIntegration";
import CfMultiregionSupport from "../../blocks/CfMultiregionSupport/src/CfMultiregionSupport";
import ConferenceCall from "../../blocks/ConferenceCall/src/ConferenceCall";
import SocialMediaAccountRegistrationScreen from "../../blocks/social-media-account-registration/src/SocialMediaAccountRegistrationScreen";
import Dashboard from "../../blocks/dashboard/src/Dashboard";
import DataEncryption from "../../blocks/DataEncryption/src/DataEncryption";
import LanguageDetection from "../../blocks/LanguageDetection/src/LanguageDetection";
import SwitchAccounts from "../../blocks/SwitchAccounts/src/SwitchAccounts";



const routeMap = {
RecommendationEngine4:{
 component:RecommendationEngine4,
path:"/RecommendationEngine4"},
RealtimeUpdates:{
 component:RealtimeUpdates,
path:"/RealtimeUpdates"},
Share:{
 component:Share,
path:"/Share"},
AudioCall:{
 component:AudioCall,
path:"/AudioCall"},
ContactsIntegration:{
 component:ContactsIntegration,
path:"/ContactsIntegration"},
MobileAccountLoginBlock:{
 component:MobileAccountLoginBlock,
path:"/MobileAccountLoginBlock"},
Pushnotifications:{
 component:Pushnotifications,
path:"/Pushnotifications"},
EmergencySos:{
 component:EmergencySos,
path:"/EmergencySos"},
OnlineBackup:{
 component:OnlineBackup,
path:"/OnlineBackup"},
CountryCodeSelector:{
 component:CountryCodeSelector,
path:"/CountryCodeSelector"},
Scheduling:{
 component:Scheduling,
path:"/Scheduling"},
PrivateChat:{
 component:PrivateChat,
path:"/PrivateChat"},
GroupVideoCall2:{
 component:GroupVideoCall2,
path:"/GroupVideoCall2"},
CfDropboxIntegration2:{
 component:CfDropboxIntegration2,
path:"/CfDropboxIntegration2"},
SelfdestructMessaging:{
 component:SelfdestructMessaging,
path:"/SelfdestructMessaging"},
ConversationThreading:{
 component:ConversationThreading,
path:"/ConversationThreading"},
DonationPayments:{
 component:DonationPayments,
path:"/DonationPayments"},
Analytics:{
 component:Analytics,
path:"/Analytics"},
EmailNotifications:{
 component:EmailNotifications,
path:"/EmailNotifications"},
InappPurchasing:{
 component:InappPurchasing,
path:"/InappPurchasing"},
CfConnectMoreSocialMediaPlatformsAndSmsmmsService2:{
 component:CfConnectMoreSocialMediaPlatformsAndSmsmmsService2,
path:"/CfConnectMoreSocialMediaPlatformsAndSmsmmsService2"},
Onboardingguide:{
 component:Onboardingguide,
path:"/Onboardingguide"},
ReviewAndApproval:{
 component:ReviewAndApproval,
path:"/ReviewAndApproval"},
CfMarketingPlatformPaidService3:{
 component:CfMarketingPlatformPaidService3,
path:"/CfMarketingPlatformPaidService3"},
Polling:{
 component:Polling,
path:"/Polling"},
CustomisedOrderStatus:{
 component:CustomisedOrderStatus,
path:"/CustomisedOrderStatus"},
GooglePayIntegration:{
 component:GooglePayIntegration,
path:"/GooglePayIntegration"},
Chatbot6:{
 component:Chatbot6,
path:"/Chatbot6"},
Hashtags:{
 component:Hashtags,
path:"/Hashtags"},
Customform:{
 component:Customform,
path:"/Customform"},
EmergencySosGesture2:{
 component:EmergencySosGesture2,
path:"/EmergencySosGesture2"},
OTPInputAuth:{
 component:OTPInputAuth,
path:"/OTPInputAuth"},
Search:{
 component:Search,
path:"/Search"},
Gallery:{
 component:Gallery,
path:"/Gallery"},
ForgotPassword:{
 component:ForgotPassword,
path:"/ForgotPassword"},
ForgotPasswordOTP:{
 component:ForgotPasswordOTP,
path:"/ForgotPasswordOTP"},
NewPassword:{
 component:NewPassword,
path:"/NewPassword"},
Catalogue:{
 component:Catalogue,
path:"/Catalogue"},
CfVoiceAuthentication2:{
 component:CfVoiceAuthentication2,
path:"/CfVoiceAuthentication2"},
UserProfileBasicBlock:{
 component:UserProfileBasicBlock,
path:"/UserProfileBasicBlock"},
PinConversation:{
 component:PinConversation,
path:"/PinConversation"},
UploadMedia2:{
 component:UploadMedia2,
path:"/UploadMedia2"},
ApiIntegration:{
 component:ApiIntegration,
path:"/ApiIntegration"},
Location:{
 component:Location,
path:"/Location"},
Settings5:{
 component:Settings5,
path:"/Settings5"},
PhoneNumberInput:{
 component:PhoneNumberInput,
path:"/PhoneNumberInput"},
AdditionalDetailForm:{
 component:AdditionalDetailForm,
path:"/AdditionalDetailForm"},
Categoriessubcategories:{
 component:Categoriessubcategories,
path:"/Categoriessubcategories"},
SocialMediaAccountLoginScreen:{
 component:SocialMediaAccountLoginScreen,
path:"/SocialMediaAccountLoginScreen"},
Filteritems:{
 component:Filteritems,
path:"/Filteritems"},
Filteroptions:{
 component:Filteroptions,
path:"/Filteroptions"},
Contactus:{
 component:Contactus,
path:"/Contactus"},
AddContactus:{
 component:AddContactus,
path:"/AddContactus"},
CfCustomAlerts2:{
 component:CfCustomAlerts2,
path:"/CfCustomAlerts2"},
Geofence:{
 component:Geofence,
path:"/Geofence"},
DataStorage:{
 component:DataStorage,
path:"/DataStorage"},
Mentionstagging:{
 component:Mentionstagging,
path:"/Mentionstagging"},
Favourites:{
 component:Favourites,
path:"/Favourites"},
GoogleAdsenseIntegration:{
 component:GoogleAdsenseIntegration,
path:"/GoogleAdsenseIntegration"},
Invitefriends:{
 component:Invitefriends,
path:"/Invitefriends"},
Videos:{
 component:Videos,
path:"/Videos"},
PostCreation:{
 component:PostCreation,
path:"/PostCreation"},
Posts:{
 component:Posts,
path:"/Posts"},
PostDetails:{
 component:PostDetails,
path:"/PostDetails"},
RolesPermissions2:{
 component:RolesPermissions2,
path:"/RolesPermissions2"},
Customisableusersubscriptions:{
 component:Customisableusersubscriptions,
path:"/Customisableusersubscriptions"},
SubscriptionDetails:{
 component:SubscriptionDetails,
path:"/SubscriptionDetails"},
CfParentalControls3:{
 component:CfParentalControls3,
path:"/CfParentalControls3"},
CameraAccess:{
 component:CameraAccess,
path:"/CameraAccess"},
GroupChat:{
 component:GroupChat,
path:"/GroupChat"},
ScreenSharing:{
 component:ScreenSharing,
path:"/ScreenSharing"},
CfGoogleDriveIntegration2:{
 component:CfGoogleDriveIntegration2,
path:"/CfGoogleDriveIntegration2"},
Maps:{
 component:Maps,
path:"/Maps"},
IcloudSharing2:{
 component:IcloudSharing2,
path:"/IcloudSharing2"},
CustomiseSounds:{
 component:CustomiseSounds,
path:"/CustomiseSounds"},
ApplePayIntegration:{
 component:ApplePayIntegration,
path:"/ApplePayIntegration"},
CfMultiregionSupport:{
 component:CfMultiregionSupport,
path:"/CfMultiregionSupport"},
ConferenceCall:{
 component:ConferenceCall,
path:"/ConferenceCall"},
SocialMediaAccountRegistrationScreen:{
 component:SocialMediaAccountRegistrationScreen,
path:"/SocialMediaAccountRegistrationScreen"},
Dashboard:{
 component:Dashboard,
path:"/Dashboard"},
DataEncryption:{
 component:DataEncryption,
path:"/DataEncryption"},
LanguageDetection:{
 component:LanguageDetection,
path:"/LanguageDetection"},
SwitchAccounts:{
 component:SwitchAccounts,
path:"/SwitchAccounts"},

  Home: {
    component: HomeScreen,
    path: '/',
    exact: true
  },
  InfoPage: {
    component: InfoPage,
    path: '/InfoPage'
  },

  AlertWeb: {
    component: AlertBlock,
    path: "*/AlertWeb",
    modal: true
  }

};

const firebaseAPI = firebase.initializeApp({
  apiKey: "AIzaSyDgl9aTbKMdRZ9-ijSZRionh3V591gMJl4",
  authDomain: "rnmasterapp-c11e9.firebaseapp.com",
  databaseURL: "https://rnmasterapp-c11e9.firebaseio.com",
  projectId: "rnmasterapp-c11e9",
  storageBucket: "rnmasterapp-c11e9.appspot.com",
  messagingSenderId: "649592030497",
  appId: "1:649592030497:web:7728bee3f2baef208daa60",
  measurementId: "G-FYBCF3Z2W3"
});

class App extends Component {
   
  render() {

    const defaultAnalytics = firebaseAPI.analytics();
    defaultAnalytics.logEvent('APP_Loaded');
    
    return (
      <View style={{ height: '100vh', width: '100vw' }}>
        <TopNav />
        {WebRoutesGenerator({ routeMap })}
        <ModalContainer />
      </View>
    );
  }
}

export default App;