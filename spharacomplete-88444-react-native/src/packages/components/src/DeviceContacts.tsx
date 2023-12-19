import Contacts from "react-native-contacts";
import { getReadContactsPermission } from "./Permissions";
import { Platform } from "react-native";
export const getDeviceContacts = () => {
	return new Promise((resolve, reject) => {
		getReadContactsPermission().then(()=>{
			Contacts.getAll().then((contacts: any) => {
				const allContacts: any=[];
				let id = 1;
				contacts?.map((item:any)=>{
					let name: string;
					if(Platform.OS === 'android'){
						name = item.displayName ?? 'N/A'
					}else{
						name = `${item.givenName} ${item.familyName}` ?? 'N/A'
					}
					const profileImageURL = item.thumbnailPath;
					item?.phoneNumbers?.map((num: any, index:number)=>{
						const number = {...num};
						number.name = name;
						number.profileImageURL = profileImageURL ?? "";
						if(Platform.OS === 'ios'){
							number.id = id;
							id =id+1;
						}
						allContacts.push(number);
					})
				})
				resolve({
					isSuccess:true,
					data: allContacts
				})
			})
			.catch(()=>{
				reject({
					isSuccess:false,
					error: "Something went wrong"
				})
			})
		})
		.catch(()=>{
			reject({
				isSuccess:false,
				error: "Please give the permission first for read contacts"
			})
		})
	});
}