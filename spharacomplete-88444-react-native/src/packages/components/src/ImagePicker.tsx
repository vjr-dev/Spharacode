import ImagePicker from "react-native-image-crop-picker";
import { getCameraPermission, getStoragePermission } from "./Permissions";

export const pickImageFromCamera = () => {
    return new Promise((resolve, reject) => {
        getCameraPermission().then(()=>{
            ImagePicker.openCamera({
                cropping: true,
                compressImageQuality: 0.5,
                includeBase64: true,
            }).then((image: any) => {
                resolve(image)
            })
            .catch(()=>{
            })
        })
        .catch(()=>{
        })
    });
}

export const pickImagesFromGellery = (isMultiple: boolean) => {
    return new Promise((resolve, reject) => {
        getStoragePermission().then(()=>{
            ImagePicker.openPicker({
                multiple: isMultiple,
                compressImageMaxWidth: 150,
                compressImageMaxHeight: 150,
                includeBase64: true,
              }).then((image: any) => {
                resolve(image)
            })
            .catch(()=>{
            })
        })
        .catch(()=>{

        })
    });
}