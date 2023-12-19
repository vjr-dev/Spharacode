Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.ACCOUNT_TYPE_EMAIL = "EmailAccount";
exports.ACCOUNT_TYPE_SOCIAL = "SocialAccount";
exports.ACCOUNT_TYPE_PHONE = "SmsAccount";

exports.contentTypeApiUpdateUser = "application/json";
exports.apiEndPointUpdateUser = "profile/profile";
exports.apiUpdateUserType = "PUT";

exports.urlGetValidations = "profile/validations";
exports.validationApiContentType = "application/json";
exports.validationApiMethodType = "GET";

exports.contenttypeApiValidateMobileNo = "application/json";
exports.endPointApiValidateMobileNo = "profile/change_phone_validation";
exports.callTypeApiValidateMobileNo = "POST";

exports.endPointApiGetUserProfile = "profile/profile";
exports.contentTypeApiGetUserProfile = "application/json";
exports.methodTypeApiGetUserProfile = "GET";

// Customizable Area Start
exports.placeHolderEmail = "Email";
exports.labelHeader =
  "This is your profile, Here you can see and update your personal information.";
exports.labelFirstName = "First name";
exports.lastName = "Last name";
exports.labelArea = "Area";
exports.labelMobile = "Mobile";
exports.labelEmail = "Email";
exports.labelCurrentPassword = "Current password";
exports.labelNewPassword = "New Password";
exports.labelRePassword = "Re-Type Password";
exports.btnTextCancelPasswordChange = "Cancel";
exports.btnTextSaveChanges = "Save Changes";
exports.btnTextChangePassword = "Change Password";
exports.errorCountryCodeNotSelected = "Please select country code";
exports.errorMobileNoNotValid = "Phone number is not valid.";
exports.errorTitle = "Error";
exports.errorBothPasswordsNotSame = "Passwords must match.";
exports.errorCurrentNewPasswordMatch = "New password cannot match current password.";
exports.errorCurrentPasswordNotValid = "Current password not valid.";
exports.errorNewPasswordNotValid = "New password not valid.";
exports.errorReTypePasswordNotValid = "Re-type password not valid.";
exports.hintCountryCode = "Select Country";
exports.errorBlankField = "can't be blank";
exports.errorEmailNotValid = "Email not valid.";


exports.urlGetCountry = "bx_block_location/countries"; // GET List of Country
exports.CountryApiContentType = "application/json";
exports.CountryApiMethodType = "GET";

exports.urlGetState = "bx_block_location"; //Add state of country code value as params 
exports.StateApiContentType = "application/json";
exports.StateApiMethodType = "GET";

exports.urlGetCity = "bx_block_location"; //Add params of Country code and State(GJ, MH etc..) value
exports.CityApiContentType = "application/json";
exports.CityApiMethodType = "GET";

exports.urlEditProfile = "account_block/accounts/personal_information"; //Add params of Country code and State(GJ, MH etc..) value
exports.EditProfileApiContentType = "application/json";
exports.EditProfileApiMethodType = "PUT";

exports.urlGetProfile = "account_block/accounts/user_profile"; 
exports.GetProfileApiContentType = "application/json";
exports.GetProfileApiMethodType  = "GET";

exports.urlGetUserCountry = "bx_block_location/user_countries"; 
exports.UserCountryApiContentType = "application/json";
exports.UserCountryApiMethodType  = "GET";

exports.chnagePhoneNumberAPIEndPoint = "account_block/accounts/change_number"
exports.OTPconfirmApiContentType = "application/json";
exports.exampleAPiMethod = "POST";
exports.verifyNewNumberAPIEndPoint = "account_block/accounts/otp_confirmation_on_update"
exports.mapAPIKEY = "AIzaSyBnpDXirHxoD3NljILh6qKbkiRPy6xOXhc"
// Customizable Area End
