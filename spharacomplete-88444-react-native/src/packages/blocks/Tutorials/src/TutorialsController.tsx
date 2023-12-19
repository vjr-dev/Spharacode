// Customizable Area Start
//@ts-nocheck
//@ts-ignore
import { IBlock } from "../../../framework/src/IBlock";
import { BlockComponent } from "../../../framework/src/BlockComponent";

import { runEngine } from "../../../framework/src/RunEngine";
import AsyncStorage from '@react-native-async-storage/async-storage'



import { Welcome1, Welcome2, Welcome3, Welcome4, Welcome5 } from "./assets";



export const configJSON = require("./config");


export interface Props {
    navigation: any;
    id: string;
    
    
}

interface S {
    
    data: any
    
}

interface SS {
    id: any;
    
    
}

export default class TutorialsController extends BlockComponent<Props, S, SS> {
    
    

    constructor(props: Props) {
        super(props);
        this.receive = this.receive.bind(this);

        
        this.subScribedMessages = [
            
            
        ];

        this.state = {
            
            // data: [1, 2, 3, 4, 5]
            data: [
                { image: Welcome1, text: 'Often feel vulnerable when you are alone ?' },
                { image: Welcome2, text: 'Ensure your safety in unsafe circumstances by ON-HAND emergency Button at all times.' },
                { image: Welcome3, text: 'SHAKE IT gesture to save you from the hassle of unlocking.' },
                { image: Welcome4, text: 'Can integrate with the social media applications to broaden your security network.' },
                { image: Welcome5, text: "Use voice recognition to contact help even when you can't reach your phone. " },
            ]
            
        };
        runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

        
        
    }

    onclick() {
        AsyncStorage.setItem("Tutorial", "yes")
        this.props.navigation.replace("LoginScreen")
    }
}
// Customizable Area End