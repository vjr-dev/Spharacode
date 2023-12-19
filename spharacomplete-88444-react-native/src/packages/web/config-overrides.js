const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

//MARK::Add Web Blocks
const appIncludes = [
resolveApp('../blocks/scheduling/src/'),
resolveApp('../blocks/otp-input-confirmation/src/'),
resolveApp('../blocks/core/src/'),
resolveApp('../blocks/forgot-password/src/'),
resolveApp('../blocks/country-code-selector/src/'),
resolveApp('../blocks/mobile-account-login/src/'),
resolveApp('../blocks/mobile-account-registration/src/'),
resolveApp('../blocks/search/src/'),
resolveApp('../blocks/share/src/'),
resolveApp('../blocks/pushnotifications/src/'),
resolveApp('../blocks/dashboard/src/'),
resolveApp('../blocks/contactus/src/'),
resolveApp('../blocks/invitefriends/src/'),
resolveApp('../blocks/user-profile-basic/src/'),
resolveApp('../blocks/social-media-account-login/src/'),
resolveApp('../blocks/social-media-account/src/'),
resolveApp('../blocks/social-media-account-registration/src/'),
resolveApp('../blocks/location/src/'),
resolveApp('../blocks/apiintegration/src/'),
resolveApp('../blocks/cameraaccess/src/'),
resolveApp('../blocks/categoriessubcategories/src/'),
resolveApp('../blocks/customform/src/'),
resolveApp('../blocks/onboardingguide/src/'),
resolveApp('../blocks/analytics/src/'),
resolveApp('../blocks/maps/src/'),
resolveApp('../blocks/customisableusersubscriptions/src/'),
resolveApp('../blocks/postcreation/src/'),
resolveApp('../blocks/filteritems/src/'),
resolveApp('../blocks/catalogue/src/'),
resolveApp('../blocks/videos/src/'),
resolveApp('../blocks/GroupVideoCall2/src/'),
resolveApp('../blocks/Favourites/src/'),
resolveApp('../blocks/PrivateChat/src/'),
resolveApp('../blocks/SelfdestructMessaging/src/'),
resolveApp('../blocks/OnlineBackup/src/'),
resolveApp('../blocks/ApplePayIntegration/src/'),
resolveApp('../blocks/ReviewAndApproval/src/'),
resolveApp('../blocks/Geofence/src/'),
resolveApp('../blocks/RolesPermissions2/src/'),
resolveApp('../blocks/ScreenSharing/src/'),
resolveApp('../blocks/Settings5/src/'),
resolveApp('../blocks/UploadMedia2/src/'),
resolveApp('../blocks/DataStorage/src/'),
resolveApp('../blocks/EmergencySosGesture2/src/'),
resolveApp('../blocks/CfConnectMoreSocialMediaPlatformsAndSmsmmsService2/src/'),
resolveApp('../blocks/CfVoiceAuthentication2/src/'),
resolveApp('../blocks/ConferenceCall/src/'),
resolveApp('../blocks/CfCustomAlerts2/src/'),
resolveApp('../blocks/GoogleAdsenseIntegration/src/'),
resolveApp('../blocks/CustomiseSounds/src/'),
resolveApp('../blocks/EmailNotifications/src/'),
resolveApp('../blocks/EmergencySos/src/'),
resolveApp('../blocks/RealtimeUpdates/src/'),
resolveApp('../blocks/Polling/src/'),
resolveApp('../blocks/GooglePayIntegration/src/'),
resolveApp('../blocks/GroupChat/src/'),
resolveApp('../blocks/Hashtags/src/'),
resolveApp('../blocks/SwitchAccounts/src/'),
resolveApp('../blocks/AudioCall/src/'),
resolveApp('../blocks/InappPurchasing/src/'),
resolveApp('../blocks/Chatbot6/src/'),
resolveApp('../blocks/ContactsIntegration/src/'),
resolveApp('../blocks/ConversationThreading/src/'),
resolveApp('../blocks/DonationPayments/src/'),
resolveApp('../blocks/CfMarketingPlatformPaidService3/src/'),
resolveApp('../blocks/LanguageDetection/src/'),
resolveApp('../blocks/Mentionstagging/src/'),
resolveApp('../blocks/PinConversation/src/'),
resolveApp('../blocks/DataEncryption/src/'),
resolveApp('../blocks/CfParentalControls3/src/'),
resolveApp('../blocks/Gallery/src/'),
resolveApp('../blocks/RecommendationEngine4/src/'),
resolveApp('../blocks/IcloudSharing2/src/'),
resolveApp('../blocks/CustomisedOrderStatus/src/'),
resolveApp('../blocks/CfDropboxIntegration2/src/'),
resolveApp('../blocks/CfGoogleDriveIntegration2/src/'),
resolveApp('../blocks/CfMultiregionSupport/src/'),

  resolveApp('src'),
  resolveApp('../components/src'),
  resolveApp('../framework/src'),
  resolveApp('../../node_modules/react-native-elements'),
  resolveApp('../../node_modules/react-native-vector-icons'),
  resolveApp('../../node_modules/react-native-ratings'),
  resolveApp('../../node_modules/react-native-image-picker'),
  resolveApp('../../node_modules/react-native-check-box'),
  resolveApp('../../node_modules/react-native-calendars'),
  resolveApp('../../node_modules/react-native-swipe-gestures'),
  resolveApp('../blocks/restClient/src'),
  resolveApp('../blocks/alert/src'),
  resolveApp('../blocks/adapters/src'),
  resolveApp('../blocks/info-page/src')
]

module.exports = function override(config, env) {
  // allow importing from outside of src folder
  config.resolve.plugins = config.resolve.plugins.filter(
    plugin => plugin.constructor.name !== 'ModuleScopePlugin'
  )
  config.module.rules[0].include = appIncludes
  config.module.rules[1] = null
  config.module.rules[2].oneOf[1].include = appIncludes
  config.module.rules[2].oneOf[1].options.plugins = [
    require.resolve('babel-plugin-react-native-web'),
  ].concat(config.module.rules[2].oneOf[1].options.plugins)
  config.module.rules = config.module.rules.filter(Boolean)
  config.plugins.push(
    new webpack.DefinePlugin({ __DEV__: env !== 'production' })
  )
  config.resolve.alias = {'react-native-maps': 'react-native-web-maps', 'react-native': 'react-native-web'};
  return config
}