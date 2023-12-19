import { Platform } from "react-native";
import RNAndroidLocationEnabler from "react-native-android-location-enabler";
import { request, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';
import { displayConfirmAlert, displayErrorMessage, displayWarningMessage } from "./CustomAlert";

let contactPermission: any;
let locationPermission: any;
let phonePermission: any;
let storagePermission: any;
let cameraPermission: any;
let microPhonePermission: any;
let settingPermission: any;
if (Platform.OS === 'android') {
	contactPermission = PERMISSIONS.ANDROID.READ_CONTACTS;
	locationPermission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
	phonePermission = PERMISSIONS.ANDROID.ANSWER_PHONE_CALLS;
	storagePermission = PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;
	cameraPermission = PERMISSIONS.ANDROID.CAMERA;
	microPhonePermission = PERMISSIONS.ANDROID.RECORD_AUDIO;
} else {
	contactPermission = PERMISSIONS.IOS.CONTACTS;
	locationPermission = PERMISSIONS.IOS.LOCATION_ALWAYS;
	phonePermission = PERMISSIONS.IOS.CONTACTS;
	storagePermission = PERMISSIONS.IOS.PHOTO_LIBRARY;
	cameraPermission = PERMISSIONS.IOS.CAMERA;
	microPhonePermission = PERMISSIONS.IOS.MICROPHONE;
}
const handleResult = async (result: string, featureName: string) => {
	switch (result) {
		case RESULTS.UNAVAILABLE:
			displayErrorMessage(`${featureName} feature is not available on this device`);
			return result
		case RESULTS.DENIED:
			displayWarningMessage(`Please give permission for ${featureName} accesss`)
			console.log('The permission has not been requested / is denied but requestable');
			return result
		case RESULTS.GRANTED:
			return result
		case RESULTS.BLOCKED:
			displayConfirmAlert("Require permission",`Your ${featureName} permission seems not to allow. Please allow permission from phone settings to use this feature.`,()=>{openSetting()}, "Goto Setting", "cancel")
			return result
	}
}
const openSetting = () => {
	openSettings().then(()=>{

	})
	.catch(()=>{

	})
}
export const getLocationPermission = () => {
	return new Promise((resolve, reject) => {
		request(locationPermission).then(async (result: string) => {
			console.log(result);
			const status = await handleResult(result, "LOCATION");
			if (status === RESULTS.GRANTED) {
				if(Platform.OS === 'ios'){
					resolve(status)
				}else{
					RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
						interval: 10000,
						fastInterval: 5000,
					  }).then((data) => {
						resolve(status)
					  })
					  .catch(() => {
						displayErrorMessage("Please turn on device location to continue");
					  })
				}
				
			} else {
				reject(status)
			}
		});
	});
}
export const getReadContactsPermission = () => {
	return new Promise((resolve, reject) => {
		request(contactPermission).then(async (result: string) => {
			console.log(result);
			const status = await handleResult(result, "CONTACT");
			if (status === RESULTS.GRANTED) {
				resolve(status)
			} else {
				reject(status)
			}
		});
	});
}

export const getPhonePermission = () => {
	return new Promise((resolve, reject) => {
		request(phonePermission).then(async (result: string) => {
			console.log(result);
			const status = await handleResult(result, "PHONE");
			if (status === RESULTS.GRANTED) {
				resolve(status)
			} else {
				reject(status)
			}
		});
	});
}

export const getStoragePermission = () => {
	return new Promise((resolve, reject) => {
		request(storagePermission).then(async (result: string) => {
			console.log(result);
			const status = await handleResult(result, "STORAGE");
			if (status === RESULTS.GRANTED) {
				resolve(status)
			} else {
				reject(status)
			}
		});
	});
}
export const getCameraPermission = () => {
	return new Promise((resolve, reject) => {
		request(cameraPermission).then(async (result: string) => {
			console.log(result);
			const status = await handleResult(result, "CAMERA");
			if (status === RESULTS.GRANTED) {
				resolve(status)
			} else {
				reject(status)
			}
		});
	});
}

export const getMicroPhonePermission = () => {
	return new Promise((resolve, reject) => {
		request(microPhonePermission).then(async (result: string) => {
			console.log(result);
			const status = await handleResult(result, "MICROPHONE");
			if (status === RESULTS.GRANTED) {
				resolve(status)
			} else {
				reject(status)
			}
		});
	});
}