// Customizable Area Start
//@ts-nocheck
//@ts-ignore
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
    getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";


export const configJSON = require("./config");

export interface Props {
    navigation: any;
    id: string;


}

export interface ApiTimeObject {
    in_time: string;
    out_time: string;
    day: Array<string>;


}

export interface TimeObject {
    selectedDay: string;
    hour: number;
    minute: number;
    dayTime: string;
    selectedDays: Array<string>
}

interface S {
    txtInputValue: string;
    txtSavedValue: string;
    enableField: boolean;

    Loader: boolean;
    Token: any;
    userdata: any;
    User_Number: any;
    weekData:any;
  
    modalVisibleFrom: boolean;
    modalVisibleTo: boolean;
    hourTime: any;
    minuteTime: any;
    hourDegree: any;
    minuteDegree: any;
    timeMode: string;
    selectedDayIn: string;
    selectedDayOut: string;
    toggleClockHHMM: boolean;
    timeObject: TimeObject [];
    workingDays: Array<string>;
    tempInTime: string;
    tempOutTime: string;
    isSelected: boolean;
    token: string;
    btnDisabled: boolean;
    currentIndexFrom: number;
    currentIndexTo: number
    
}

interface SS {
    id: any;


}

export default class FirstResponderSetWorkingHoursController extends BlockComponent<Props, S, SS> {

    getListId: any = "";
    LogoutapiId: any = "";
    focusListener: any;
    weekDataID: any;
    getWeekDataID: any;



    constructor(props: Props) {
        super(props);
        this.receive = this.receive.bind(this);


        this.subScribedMessages = [

            getName(MessageEnum.RestAPIResponceMessage),
            getName(MessageEnum.RestAPIRequestMessage),
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            getName(MessageEnum.RestAPIRequestBodyMessage),
            getName(MessageEnum.RestAPIRequestHeaderMessage),
            getName(MessageEnum.RestAPIRequestMethodMessage),

        ];

        this.state = {
            weekData:[
              { day: "Monday", inTime: "", outTime: "",enter:"",exit: "",id:1,selectedIn: null,selectedOut: null},
               { day: "Tuesday", inTime: "", outTime: "",enter:"",exit: "",id:2,selectedIn: null,selectedOut: null},
               { day: "Wednesday", inTime: "", outTime: "",enter:"",exit: "",id:3,selectedIn: null,selectedOut: null},
                {day: "Thursday", inTime: "", outTime: "",enter:"",exit: "",id:4,selectedIn: null,selectedOut: null},
                {day: "Friday", inTime: "", outTime: "",enter:"",exit: "",id:5,selectedIn: null,selectedOut: null},
                {day: "Saturday", inTime: "", outTime: "",enter:"",exit: "",id:6,selectedIn: null,selectedOut: null},
                {day: "Sunday", inTime: "", outTime: "",enter:"",exit: "",id:7,selectedIn: null,selectedOut: null},
              ],
              hourTime: "12",
              minuteTime: "00",
              hourDegree:0,
              minuteDegree:0,
              modalVisibleFrom: false,
              modalVisibleTo: false,
              selectedDayIn: "",
              selectedDayOut: "",
              timeMode: "",
              toggleClockHHMM: true,
              timeObject:[],
              workingDays: [],
              tempInTime: "",
              tempOutTime: "",
              isSelected: false,
              token: "",
              btnDisabled: false,
              currentIndexFrom: null,
              currentIndexTo: null
              
        };
        runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);


    }

    async componentDidMount() {
        let Token: any = await AsyncStorage.getItem("Token")
     
        this.setState({ token: Token }, () => {
          this.getworkingDaysData()
         
        })
       
        
      }

    async receive(from: string, message: Message) {
      
        runEngine.debugLog("on recieive==>" + JSON.stringify(message));
    
       
        if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
          const apiRequestCallId = message.getData(
            getName(MessageEnum.RestAPIResponceDataMessage)
          );
          let responseJson = message.getData(
            getName(MessageEnum.RestAPIResponceSuccessMessage)
          );
          const errorReponse = message.getData(
            getName(MessageEnum.RestAPIResponceErrorMessage)
          );
          if (errorReponse) {
            this.parseApiCatchErrorResponse(errorReponse);
            return
          }
    
          if (apiRequestCallId && responseJson) {

            this.setWeekDataAPICall(apiRequestCallId,responseJson)
             this.getWeekDataAPICall(apiRequestCallId,responseJson)

          }
        }
       
      }

      setWeekDataAPICall(apiRequestCallId,responseJson) {
        if (apiRequestCallId === this.weekDataID) {
         
          if (responseJson != null && !responseJson.error && !responseJson.errors) {
        
           
         
            
           Alert.alert('',responseJson.meta.message)
            
            
          
          } else {
           
       
              this.parseApiErrorResponse(responseJson);
           
          }
        }

      }
      
    

      getWeekDataAPICall(apiRequestCallId, responseJson) {
        if (apiRequestCallId !== this.getWeekDataID) {
            return;
        }
    
        if (responseJson == null || responseJson.error || responseJson.errors) {
           
                this.parseApiErrorResponse(responseJson);
          
            return;
        }
    
        const responseData = responseJson.data;
        const updatedWeekData = this.updateWeekData(this.state.weekData, responseData);
        this.setState({ weekData: updatedWeekData});
    }
    
    updateWeekData(weekData, responseData) {
        return weekData.map(dayData => {
            const matchingResponseData = responseData.find(data => data.day === dayData.day);
            if (matchingResponseData && matchingResponseData.in_time?.length > 0 && matchingResponseData.out_time?.length > 0) {
                const updatedDayData = {
                    ...dayData,
                    inTime: matchingResponseData.in_time,
                    outTime: matchingResponseData.out_time,
                    enter: this.timeConverter(matchingResponseData.in_time),
                    exit: this.timeConverter(matchingResponseData.out_time)
                };
                return updatedDayData;
            }
            return dayData;
        });
    }
    
 
    toggleClockDesign(item) {
        if(item === "minute"){

            this.setState({toggleClockHHMM: false })
        } else {
            this.setState({toggleClockHHMM: true })
        }
    }
 
    goBack() {
        this.props.navigation.goBack()
    }

     toggleModalFrom(item: any,index) {
  
       this.setState({modalVisibleFrom: true,selectedDayIn:item.day, currentIndexFrom : index})
    
    
      }

      toggleModalTo(item: any,index) {
       this.setState({modalVisibleTo: true,selectedDayOut:item.day,currentIndexTo: index})
    
      }
      handleMinutePress(value) {
        switch (value) {
            case '05':
                this.setState({ minuteDegree: 30, minuteTime: value });
                break;
            case '10':
                this.setState({ minuteDegree: 60, minuteTime: value });
                break;
            case '15':
                this.setState({ minuteDegree: 90, minuteTime: value });
                break;
            case '20':
                this.setState({ minuteDegree: 120, minuteTime: value });
                break;
               case '25':
                this.setState({ minuteDegree: 150, minuteTime: value });
                break;
            case '30':
                this.setState({ minuteDegree: 180, minuteTime: value });
                break;
            case '35':
                this.setState({ minuteDegree: 210, minuteTime: value });
                break;
            case '40':
                this.setState({ minuteDegree: 240, minuteTime: value });
                break;
            case '45':
                this.setState({ minuteDegree: 270, minuteTime: value });
                break;
            case '50':
                this.setState({ minuteDegree: 300, minuteTime: value });
                break;    
            case '55':
                this.setState({ minuteDegree: 330, minuteTime: value });
                break;  
             case "00":
                this.setState({ minuteDegree: 0, minuteTime: value });
                break; 
            
            // Add additional cases as needed
            default:
                // Code to handle other cases if necessary
                this.setState({ minuteDegree: 0, minuteTime: "00" });
                break;
        }
      }

      handleHourPress(value) {
      
        switch (value) {
            case '01':
                this.setState({ hourDegree: 30, hourTime: value });
                break;
            case '02':
                this.setState({ hourDegree: 60, hourTime: value });
                break;
            case '03':
                this.setState({ hourDegree: 90, hourTime: value });
                break;
            case '04':
                this.setState({ hourDegree: 120, hourTime: value });
                break;
               case '05':
                this.setState({ hourDegree: 150, hourTime: value });
                break;
            case '06':
                this.setState({ hourDegree: 180, hourTime: value });
                break;
            case '07':
                this.setState({ hourDegree: 210, hourTime: value });
                break;
            case '08':
                this.setState({ hourDegree: 240, hourTime: value });
                break;
            case '09':
                this.setState({ hourDegree: 270, hourTime: value });
                break;
            case '10':
                this.setState({ hourDegree: 300, hourTime: value });
                break;    
            case '11':
                this.setState({ hourDegree: 330, hourTime: value });
                break;  
            case '12':
                this.setState({ hourDegree: 0, hourTime: value });
                break;
            // Add additional cases as needed
            default:
                // Code to handle other cases if necessary
                this.setState({ hourDegree: 0, hourTime: '12' });
                break;
        }
        
      }
      handleTimeMode(mode) {
       
                this.setState({timeMode: mode})    
      }

      toggleEnterTimeItemSelection = (item, index) => {
        const { hourTime, minuteTime, timeMode, modalVisibleTo } = this.state;
        const updatedWeekData = this.state.weekData.map(data => {
          if (data.id === item.id) {
            const timeValue = `${hourTime}:${minuteTime} ${timeMode}`;
            const enter = this.timeConverter(timeValue);
            const exit = this.timeConverter(timeValue);
            
           
            if (!modalVisibleTo) {
              if (data.inTime === "" || data.selectedIn !== null) {

                this.inTimeModal(timeValue,enter, data)
              }
           
            } else {
              if (data.outTime === "" || data.selectedIn !== null) {
              this.outTimeModal(timeValue,exit,data)
              }
            }
          
          }
          return data;
        });
      
        this.setState({ weekData: updatedWeekData });
      };
      outTimeModal(timeValue,exit,data) {
        data.selectedOut = data.selectedOut === null ? true : !data.selectedOut;
        data.exit = data.exit === "" ? exit : "";
        data.outTime = data.outTime === "" ? timeValue : "";

        return data


      }
      inTimeModal(timeValue,enter,data) {
      
        data.selectedIn = data.selectedIn === null ? true : !data.selectedIn;
        data.enter = data.enter === "" ? enter : "";
        data.inTime = data.inTime === "" ? timeValue : "";

        return data
      }
     


 timeConverter(timeValue) {
  let timeArray = timeValue.split(' ');
  let time = timeArray[0];
  let format = timeArray[1];

  let [hours, minutes] = time.split(':');
  hours = parseInt(hours, 10);
  minutes = parseInt(minutes, 10);

  if (format === "PM" && hours < 12) {
      hours += 12;
  } else if (format === "AM" && hours === 12) {
      hours -= 12;
  }

  let hoursString = hours.toString().padStart(2, '0');
  let minutesString = minutes.toString().padStart(2, '0');
  let timeend = hoursString + ":" + minutesString + ":00";

  return timeend;
}




  toggleDaySelection(item, index, time) {

    if (time === "inTime") {

      this.deleteInTime(item, index)
    }
    else {
      this.deleteOutTime(item, index)
    }

  }

  deleteInTime(item, index) {
   

    let renderData = [...this.state.weekData];
    for (let data of renderData) {
      if (data.id == item.id) {

        data.enter = ""
        data.inTime = ""
        data.selectedIn = false

        break;
      }
    }
    this.setState({ weekData: renderData });

  }
  deleteOutTime(item, index) {

  

    let renderData = [...this.state.weekData];
    for (let data of renderData) {
      if (data.id == item.id) {

        data.exit = ""
        data.outTime = ""
        data.selectedOut = false

        break;
      }
    }
    this.setState({ weekData: renderData });

  }

  clickOnSaveModal() {
    this.saveButtonDisabled()
    this.setState({ modalVisibleFrom: false, modalVisibleTo: false })
    this.setState({hourTime:12,minuteTime: 0,hourDegree:0,minuteDegree:0,timeMode:""})
  }

  clickOnCancel(modaltype) {
   

    if(modaltype == "inTimeModal") {


      let renderData = this.state.weekData
      renderData.forEach((item,index) => {
      if(index === this.state.currentIndexFrom) {

        item.inTime = "";
       
        item.enter = "";
       
        item.selectedIn = null;

      }
     });
     this.setState({hourTime:12,minuteTime: 0,hourDegree:0,minuteDegree:0,timeMode:""})
      this.setState({modalVisibleFrom: false})
    }
    else {
    let renderData = this.state.weekData
     renderData.forEach((item,index) => {
      if(index === this.state.currentIndexTo) {


        item.outTime = "";
       
        item.exit = "";
       
        item.selectedOut = null;

       }
    });

    this.setState({hourTime:12,minuteTime: 0,hourDegree:0,minuteDegree:0,timeMode:""})
    this.setState({ modalVisibleTo: false }) 

  }
  this.saveButtonDisabled()
  }

  saveButtonDisabled() {
   
    let btndisable = false
    this.state.weekData.map((data,index) => {
        
        if(data.inTime === "" && data.outTime.length > 0) {

       
          btndisable = true
        }
     

        if( data.outTime === "" && data.inTime.length > 0) {
       
          btndisable = true

        }

    })
    this.setState({btnDisabled: btndisable})
  }

  sendWeekDatatoAPI() {


  
    const workingDays = this.state.weekData.map(({ day, enter, exit }) => ({ day, "in_time": enter, "out_time": exit }));

   
    let data = {
      "attributes": workingDays

    }

    const header = {
      "Content-Type": configJSON.SetWorkingDaysDataApiContentType,
      token: this.state.token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.weekDataID = requestMessage.messageId;

    const httpBody = {
      data: data
    };
  
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.urlSetWorkingDaysData
    );


    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.SetWorkingDaysDataApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;

  }

    getworkingDaysData() {

      const header = {
        "Content-Type": configJSON.GetWorkingDaysDataApiContentType,
        token: this.state.token
      };

      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
  
      this.getWeekDataID = requestMessage.messageId;
  
    
  
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.urlGetWorkingDaysData
      );
  
  
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );
  
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.getWorkingDaysDataApiMethodType
      );
  
      runEngine.sendMessage(requestMessage.id, requestMessage);
  
      return true;
    }

    

}
// Customizable Area Start