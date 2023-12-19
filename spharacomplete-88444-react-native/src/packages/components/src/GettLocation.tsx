import GetLocation from "react-native-get-location";
import { getLocationPermission } from "./Permissions"

export const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        getLocationPermission().then(()=>{
            GetLocation.getCurrentPosition({
                enableHighAccuracy: false,
                timeout: 20000,
              })
                .then((location) => {
                  resolve(location);
                })
                .catch((error) => {
                  
                });
        })
    })
}