//@ts-ignore
//@ts-nocheck
import React from "react";
import { render, fireEvent, screen  } from "@testing-library/react-native";
import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import FirstResponderSetWorkingHours from "../../src/FirstResponderSetWorkingHours";
import {timeConverter} from "../../src/FirstResponderSetWorkingHoursController";
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import { FlatList } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
const navigation = require("react-navigation");

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    addListener: jest.fn().mockImplementation((ev, cb) => {
        return cb();
      }),
  },
  id: "FirstResponderSetWorkingHours",
};

const feature = loadFeature("./__tests__/features/FirstResponderSetWorkingHours-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to FirstResponderSetWorkingHours", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: FirstResponderSetWorkingHours;

    given("I am a User loading FirstResponderSetWorkingHours", () => {
      exampleBlockA = shallow(<FirstResponderSetWorkingHours {...screenProps} />);
   
      expect(exampleBlockA.exists()).toBe(true);

      
    });

    when("I navigate to the FirstResponderSetWorkingHours", () => {
      instance = exampleBlockA.instance() as FirstResponderSetWorkingHours;
      expect(exampleBlockA.exists()).toBe(true);
    });

    then('calls hideKeyboard function on touchable press', () => {
      const hideKeyboardMock = jest.fn();
      const touchableWithoutFeedback = exampleBlockA.find({ testID: 'touchableWithoutFeedback' });

      // Simulate press event
      touchableWithoutFeedback.simulate('press');

      // Verify that hideKeyboard function is called
      expect(hideKeyboardMock).toHaveBeenCalledTimes(0);
  });

 
    
    then("I can click goBack button with out error", () => {
     
  
        const gobackBtnComponent = exampleBlockA.findWhere(
          (node) => node.prop("testID") === "gobackBtn"
        );
        gobackBtnComponent.simulate("press");
      });
      then("I can see list of days with option to add time icon", () => {
        let mainFlatlist = exampleBlockA.findWhere(
          (node) => node.prop("testID") === "mainFlatlist"
        );
        expect(mainFlatlist).toBeTruthy();
       
        });
        then("I can click on save button to save data", () => {
          const sendWeekDatatoAPI = jest.fn()
          let postdata = exampleBlockA.findWhere(
            (node) => node.prop("testID") === "postweekdata"
          );
         postdata.simulate('press',sendWeekDatatoAPI())
         
          });
          then("getWeekData request response successfull", () => {
                const updateWeekData = jest.fn()
            const mockResponse = {
              data: {},
            };
      
            const apiMsg = new Message(getName(MessageEnum.RestAPIResponceMessage));
      
            apiMsg.addData(
              getName(MessageEnum.RestAPIResponceDataMessage),
              apiMsg.messageId
            );
      
            apiMsg.addData(
              getName(MessageEnum.RestAPIResponceSuccessMessage),
              mockResponse
            );
      
            instance.weekDataID = apiMsg.messageId;
            runEngine.sendMessage("Unit Test", apiMsg);
      
            apiMsg.addData(
              getName(MessageEnum.RestAPIResponceErrorMessage),
              mockResponse
            );
      
            instance.CountryGetId = apiMsg.messageId;
            runEngine.sendMessage("Unit Test", apiMsg);
            const mockResponseError = {
               errors : null,
            };
            apiMsg.addData(
              getName(MessageEnum.RestAPIResponceSuccessMessage),
              mockResponseError
            );
      
            instance.getWeekDataID = apiMsg.messageId;
            runEngine.sendMessage("Unit Test", apiMsg);
            const response =  [
                  {
                      "id": 3,
                      "in_time": "",
                      "out_time": "",
                      "day": "Saturday",
                      "date": "2023-10-07"
                  },
                  {
                      "id": 4,
                      "in_time": "03:00 PM",
                      "out_time": "04:00 PM",
                      "day": "Sunday",
                      "date": "2023-10-08"
                  },
                  {
                      "id": 5,
                      "in_time": "01:00 PM",
                      "out_time": "06:30 PM",
                      "day": "Monday",
                      "date": "2023-10-09"
                  },
                  {
                      "id": 2,
                      "in_time": "01:00 PM",
                      "out_time": "06:30 PM",
                      "day": "Wednesday",
                      "date": "2023-10-04"
                  },
                  {
                      "id": 16,
                      "in_time": "01:00 PM",
                      "out_time": "06:30 PM",
                      "day": "Thursday",
                      "date": "2023-10-05"
                  },
                  {
                      "id": 1,
                      "in_time": "01:00 PM",
                      "out_time": "06:30 PM",
                      "day": "Tuesday",
                      "date": "2023-10-03"
                  },
                  {
                      "id": 17,
                      "in_time": "01:00 PM",
                      "out_time": "06:30 PM",
                      "day": "Friday",
                      "date": "2023-10-06"
                  }
              ]
              let dayItem = [
                { day: "Monday", inTime: "", outTime: "",enter:"",exit: "",id:1,selectedIn: null,selectedOut: null},
                     { day: "Tuesday", inTime: "", outTime: "",enter:"",exit: "",id:2,selectedIn: null,selectedOut: null},
                     { day: "Wednesday", inTime: "", outTime: "",enter:"",exit: "",id:3,selectedIn: null,selectedOut: null},
                      {day: "Thursday", inTime: "", outTime: "",enter:"",exit: "",id:4,selectedIn: null,selectedOut: null},
                      {day: "Friday", inTime: "", outTime: "",enter:"",exit: "",id:5,selectedIn: null,selectedOut: null},
                      {day: "Saturday", inTime: "", outTime: "",enter:"",exit: "",id:6,selectedIn: null,selectedOut: null},
                      {day: "Sunday", inTime: "", outTime: "",enter:"",exit: "",id:7,selectedIn: null,selectedOut: null},
              ]

             instance.updateWeekData(response,dayItem)
          
      
           
            });

            then("getWeekData request response error", () => {

              const mockResponse = {
                error : "err"
              };
        
              const apiMsg = new Message(getName(MessageEnum.RestAPIResponceMessage));
        
              apiMsg.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                apiMsg.messageId
              );
        
              apiMsg.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                mockResponse
              );
        
              instance.getWeekDataID = apiMsg.messageId;
              runEngine.sendMessage("Unit Test", apiMsg);
        
             
              });

      then("I can click on plus icon for time to enter", () => {
    
        let mainFlatlist = exampleBlockA.findWhere(
          (node) => node.prop("testID") === "mainFlatlist"
        );
      
        expect(mainFlatlist).toBeTruthy();
        mainFlatlist.props().keyExtractor("1");

        const render1 = exampleBlockA.find('FlatList')
            .at(0)
            .prop('renderItem')

          const renderItem1 = shallow(render1({
            item: { day: "Monday", inTime: "", outTime: "", enter: "", exit: "", id: 1, selectedIn: null, selectedOut: null }
          }
          ))

          const btnpress = renderItem1.findWhere(
            (node) => node.prop("testID") === "timeFromAdd"
          );

          btnpress.simulate('press')
      
      

       
        });

        then("I can click on plus icon for time to exit", () => {

  

          const render1 = exampleBlockA.find('FlatList')
            .at(0)
            .prop('renderItem')

          const renderItem1 = shallow(render1({
            item: { day: "Monday", inTime: "", outTime: "", enter: "", exit: "", id: 1, selectedIn: null, selectedOut: null }
          }
          ))

          const btnpress = renderItem1.findWhere(
            (node) => node.prop("testID") === "timeToAdd"
          );

          btnpress.simulate('press')
          
       
           });

        then('I can click on cancel icon for time to enter', () => {

          const render1 = exampleBlockA.find('FlatList')
            .at(0)
            .prop('renderItem')

          const renderItem1 = shallow(render1({
            item: { day: "Monday", inTime: "02:25 PM", outTime: "", enter: "14:25:00", exit: "", id: 1, selectedIn: null, selectedOut: null }
          }
          ))

          const btnpress = renderItem1.findWhere(
            (node) => node.prop("testID") === "timeFromCancel"
          );

          btnpress.simulate('press')
    
        })

        then('I can click on cancel icon for time to exit', () => {

          const render1 = exampleBlockA.find('FlatList')
            .at(0)
            .prop('renderItem')

          const renderItem1 = shallow(render1({
            item: { day: "Monday", inTime: "", outTime: "02:25 PM", enter: "", exit: "14:25:00", id: 1, selectedIn: null, selectedOut: null }
          }
          ))

          const btnpress = renderItem1.findWhere(
            (node) => node.prop("testID") === "timeToCancel"
          );

          btnpress.simulate('press')
    
        })

           then('should toggle modal from', () => {
            const item = { day: 'Monday' };
            const index = 0;
        
            instance.toggleModalFrom(item, index);
            expect(instance.state.modalVisibleFrom).toEqual(true);
            expect(instance.state.selectedDayIn).toEqual('Monday');
            const btnpress = exampleBlockA.findWhere(
              (node) => node.prop("testID") === "toggleItemInsideModal"
            ).at(0);
           
            btnpress.simulate('press')

           })

           then('should toggle modal from when modalVisibleFrom false', () => {
         
            instance.setState({modalVisibleFrom: false})
        
            const btnpress = exampleBlockA.findWhere(
              (node) => node.prop("testID") === "toggleItemOutsideModal"
            ).at(0);
           
            btnpress.simulate('press')

           })
         
           then('should toggle modal to', () => {
            const item = { day: 'Tuesday' };
            const index = 0;
        
            instance.toggleModalTo(item, index);
            expect(instance.state.modalVisibleTo).toEqual(true);
            expect(instance.state.selectedDayOut).toEqual('Tuesday');

           })
           then('should handle minute press', () => {

            instance.handleMinutePress('05');
    expect(instance.state.minuteDegree).toEqual(30);
    expect(instance.state.minuteTime).toEqual('05');
    instance.handleMinutePress('10');
    expect(instance.state.minuteDegree).toEqual(60);
    expect(instance.state.minuteTime).toEqual('10');
    instance.handleMinutePress('15');
    expect(instance.state.minuteDegree).toEqual(90);
    expect(instance.state.minuteTime).toEqual('15');
    instance.handleMinutePress('20');
    expect(instance.state.minuteDegree).toEqual(120);
    expect(instance.state.minuteTime).toEqual('20');
    instance.handleMinutePress('25');
    expect(instance.state.minuteDegree).toEqual(150);
    expect(instance.state.minuteTime).toEqual('25');
    instance.handleMinutePress('30');
    expect(instance.state.minuteDegree).toEqual(180);
    expect(instance.state.minuteTime).toEqual('30');
    instance.handleMinutePress('35');
    expect(instance.state.minuteDegree).toEqual(210);
    expect(instance.state.minuteTime).toEqual('35');
    instance.handleMinutePress('40');
    expect(instance.state.minuteDegree).toEqual(240);
    expect(instance.state.minuteTime).toEqual('40');
    instance.handleMinutePress('45');
    expect(instance.state.minuteDegree).toEqual(270);
    expect(instance.state.minuteTime).toEqual('45');
    instance.handleMinutePress('50');
    expect(instance.state.minuteDegree).toEqual(300);
    expect(instance.state.minuteTime).toEqual('50');
    instance.handleMinutePress('55');
    expect(instance.state.minuteDegree).toEqual(330);
    expect(instance.state.minuteTime).toEqual('55');
    instance.handleMinutePress('00');
    expect(instance.state.minuteDegree).toEqual(0);
    expect(instance.state.minuteTime).toEqual('00');
    instance.handleMinutePress('99');
    expect(instance.state.minuteDegree).toEqual(0);
    expect(instance.state.minuteTime).toEqual('00');
            
           })

           then('should handle hour press', () => {

            instance.handleHourPress('01');
    expect(instance.state.hourDegree).toEqual(30);
    expect(instance.state.hourTime).toEqual('01');
    instance.handleHourPress('02');
    expect(instance.state.hourDegree).toEqual(60);
    expect(instance.state.hourTime).toEqual('02');
    instance.handleHourPress('03');
    expect(instance.state.hourDegree).toEqual(90);
    expect(instance.state.hourTime).toEqual('03');
    instance.handleHourPress('04');
    expect(instance.state.hourDegree).toEqual(120);
    expect(instance.state.hourTime).toEqual('04');
    instance.handleHourPress('05');
    expect(instance.state.hourDegree).toEqual(150);
    expect(instance.state.hourTime).toEqual('05');
    instance.handleHourPress('06');
    expect(instance.state.hourDegree).toEqual(180);
    expect(instance.state.hourTime).toEqual('06');
    instance.handleHourPress('07');
    expect(instance.state.hourDegree).toEqual(210);
    expect(instance.state.hourTime).toEqual('07');
    instance.handleHourPress('08');
    expect(instance.state.hourDegree).toEqual(240);
    expect(instance.state.hourTime).toEqual('08');
    instance.handleHourPress('09');
    expect(instance.state.hourDegree).toEqual(270);
    expect(instance.state.hourTime).toEqual('09');
    instance.handleHourPress('10');
    expect(instance.state.hourDegree).toEqual(300);
    expect(instance.state.hourTime).toEqual('10');
    instance.handleHourPress('11');
    expect(instance.state.hourDegree).toEqual(330);
    expect(instance.state.hourTime).toEqual('11');
    instance.handleHourPress('12');
    expect(instance.state.hourDegree).toEqual(0);
    expect(instance.state.hourTime).toEqual('12');
    instance.handleHourPress(99);
    expect(instance.state.hourDegree).toEqual(0);
    expect(instance.state.hourTime).toEqual('12');
            
           })

           then('should handle time selection from clock face hour', () => {
               instance.renderCommonModal()

             const buttontwelve =  exampleBlockA.findWhere((node) => node.prop("testID") === 'htwelve')
             buttontwelve.simulate('press')
             const buttonhone =  exampleBlockA.findWhere((node) => node.prop("testID") === 'hone')
             buttonhone.simulate('press')
             const buttonhtwo =  exampleBlockA.findWhere((node) => node.prop("testID") === 'htwo')
             buttonhtwo.simulate('press')
             const buttonhthree =  exampleBlockA.findWhere((node) => node.prop("testID") === 'hthree')
             buttonhthree.simulate('press')
             const buttonhfour =  exampleBlockA.findWhere((node) => node.prop("testID") === 'hfour')
             buttonhfour.simulate('press')
             const buttonhfive =  exampleBlockA.findWhere((node) => node.prop("testID") === 'hfive')
             buttonhfive.simulate('press')
             const buttonhsix =  exampleBlockA.findWhere((node) => node.prop("testID") === 'hsix')
             buttonhsix.simulate('press')
             const buttonhseven =  exampleBlockA.findWhere((node) => node.prop("testID") === 'hseven')
             buttonhseven.simulate('press')
             const buttonheight =  exampleBlockA.findWhere((node) => node.prop("testID") === 'height')
             buttonheight.simulate('press')
             const buttonhnine =  exampleBlockA.findWhere((node) => node.prop("testID") === 'hnine')
             buttonhnine.simulate('press')
             const buttonhten =  exampleBlockA.findWhere((node) => node.prop("testID") === 'hten')
             buttonhten.simulate('press')
             const buttonheleven =  exampleBlockA.findWhere((node) => node.prop("testID") === 'heleven')
             buttonheleven.simulate('press')
            

            

           })

           then('should handle time selection from clock face minute', () => {
            instance.renderCommonModal()
            instance.setState({toggleClockHHMM: false})

            const buttonmzero =  exampleBlockA.findWhere((node) => node.prop("testID") === 'mzero')
            buttonmzero.simulate('press')
            const buttonmfive =  exampleBlockA.findWhere((node) => node.prop("testID") === 'mfive')
            buttonmfive.simulate('press')
            const buttonmten =  exampleBlockA.findWhere((node) => node.prop("testID") === 'mten')
            buttonmten.simulate('press')
            const buttonmfiftin =  exampleBlockA.findWhere((node) => node.prop("testID") === 'mfiftin')
            buttonmfiftin.simulate('press')
            const buttonmtwenty =  exampleBlockA.findWhere((node) => node.prop("testID") === 'mtwenty')
            buttonmtwenty.simulate('press')
            const buttonmtwentyfive =  exampleBlockA.findWhere((node) => node.prop("testID") === 'mtwentyfive')
            buttonmtwentyfive.simulate('press')
            const buttonmthirty =  exampleBlockA.findWhere((node) => node.prop("testID") === 'mthirty')
            buttonmthirty.simulate('press')
            const buttonmthirtyfive =  exampleBlockA.findWhere((node) => node.prop("testID") === 'mthirtyfive')
            buttonmthirtyfive.simulate('press')
            const buttonmfourty =  exampleBlockA.findWhere((node) => node.prop("testID") === 'mfourty')
            buttonmfourty.simulate('press')
            const buttonmfourtyfive =  exampleBlockA.findWhere((node) => node.prop("testID") === 'mfourtyfive')
            buttonmfourtyfive.simulate('press')
            const buttonmfifty =  exampleBlockA.findWhere((node) => node.prop("testID") === 'mfifty')
            buttonmfifty.simulate('press')
            const buttonmfiftyfive =  exampleBlockA.findWhere((node) => node.prop("testID") === 'mfiftyfive')
            buttonmfiftyfive.simulate('press')

           })

           then('should handle timeConverter function and converts AM time correctly', () => {
            const inputTime = '09:30 AM';
           // const timeConverter = jest.fn(() => '09:30:00');
            const convertedTime = instance.timeConverter(inputTime);
            expect(convertedTime).toBe('09:30:00');



           })

           then('should handle timeConverter function and converts PM time correctly', () => {
            const inputTime = '09:30 PM';
           // const timeConverter = jest.fn(() => '21:30:00');
            const convertedTime = instance.timeConverter(inputTime);
            expect(convertedTime).toBe('21:30:00');

           })
           then('should handle 12:30 PM correctly', () => {
            const inputTime = '12:30 PM';
            const convertedTime = instance.timeConverter(inputTime);
            expect(convertedTime).toBe('12:30:00');

           })
           then('should handle 12:00 AM correctly',() => {
            const inputTime = '12:00 AM';
            const convertedTime = instance.timeConverter(inputTime);
            expect(convertedTime).toBe('00:00:00');

           })

    then('should toggle enter time item selection correctly', () => {
      const mockData = {
        id: 1,
        in_time: "03:00 PM",
        out_time: "04:00 PM",
        day: "Sunday",
        date: "2023-10-08",
        selectedIn: true,
        enter: "12:00:00"
        // add other properties as needed for your test case
      };
      let dayItem = [
        { day: "Monday", inTime: "", outTime: "",enter:"",exit: "",id:1,selectedIn: null,selectedOut: null, selectedIn: true, enter: "12:00:00"},
             { day: "Tuesday", inTime: "", outTime: "",enter:"",exit: "",id:2,selectedIn: null,selectedOut: null, selectedIn: true, enter: "12:00:00"},
             { day: "Wednesday", inTime: "", outTime: "",enter:"",exit: "",id:3,selectedIn: null,selectedOut: null, selectedIn: true, enter: "12:00:00"},
              {day: "Thursday", inTime: "", outTime: "",enter:"",exit: "",id:4,selectedIn: null,selectedOut: null, selectedIn: true, enter: "12:00:00"},
              {day: "Friday", inTime: "", outTime: "",enter:"",exit: "",id:5,selectedIn: null,selectedOut: null, selectedIn: true, enter: "12:00:00"},
              {day: "Saturday", inTime: "", outTime: "",enter:"",exit: "",id:6,selectedIn: null,selectedOut: null, selectedIn: true, enter: "12:00:00"},
              {day: "Sunday", inTime: "", outTime: "",enter:"",exit: "",id:7,selectedIn: null,selectedOut: null, selectedIn: true, enter: "12:00:00"},
      ]
      const mockIndex = 0;
  
      // mock the required functions
      instance.timeConverter = jest.fn(() => '12:00:00');
  
      instance.toggleEnterTimeItemSelection(mockData, mockIndex);
    
      // assert the state changes as expected
      expect(dayItem[mockIndex].selectedIn).toBe(true);
      expect(dayItem[mockIndex].enter).toBe('12:00:00');

    })

    then('should call inTimeModal correctly', () => {
      const mockData = {
        id: 1,
        in_time: "03:00 PM",
        out_time: "04:00 PM",
        day: "Sunday",
        date: "2023-10-08",
        selectedIn: true,
        enter: "12:00:00"
      };
  
      // mock the required functions
      instance.timeConverter = jest.fn(() => '12:00:00');
  
      const result = instance.inTimeModal('12:00 PM', '12:00:00', mockData);
  
      // assert the data object properties are updated as expected
      expect(result.selectedIn).toBe(false);
      expect(result.enter).toBe('');
    })

    then('should call outTimeModal correctly',() => {

      const mockData = {
        id: 1,
        in_time: "03:00 PM",
        out_time: "04:00 PM",
        day: "Sunday",
        date: "2023-10-08",
        selectedIn: true,
        enter: "12:00:00"
      };
  
      // mock the required functions
      instance.timeConverter = jest.fn(() => '12:00:00');
  
      const result = instance.outTimeModal('12:00 PM', '12:00:00', mockData);
  
      // assert the data object properties are updated as expected
      expect(result.selectedIn).toBe(true);
      expect(result.enter).toBe('12:00:00');

    })
    
    then("I can click on button to cancel modal without error",() => {
      instance.setState({modalVisibleFrom: true})
      const cancelModalButton  = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "modalCancel"
      );
      cancelModalButton.simulate("press");
    });

    then("I can click on button to cancel modal on exit time without error",() => {
        instance.setState({modalVisibleFrom: false})
      const cancelModalButton  = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "modalCancel"
      );
      cancelModalButton.simulate("press");
    });
    
    then("I can click on button to save modal without error",() => {
      const saveModalButton  = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "modalSave"
      );
      saveModalButton.simulate("press");
    });
    then('should delete in time correctly', () => {

      const item = { id: 1 }; // Sample item to delete
    const expectedState = [
      
        { "day": "Monday", "enter": "", "exit": "12:00:00", "id": 1, "inTime": "", "outTime": "11:55 ", "selectedIn": false, "selectedOut": true }, { "day": "Tuesday", "enter": "", "exit": "", "id": 2, "inTime": "", "outTime": "", "selectedIn": null, "selectedOut": null }, { "day": "Wednesday", "enter": "", "exit": "", "id": 3, "inTime": "", "outTime": "", "selectedIn": null, "selectedOut": null }, { "day": "Thursday", "enter": "", "exit": "", "id": 4, "inTime": "", "outTime": "", "selectedIn": null, "selectedOut": null }, { "day": "Friday", "enter": "", "exit": "", "id": 5, "inTime": "", "outTime": "", "selectedIn": null, "selectedOut": null }, { "day": "Saturday", "enter": "", "exit": "", "id": 6, "inTime": "", "outTime": "", "selectedIn": null, "selectedOut": null }, { "day": "Sunday", "enter": "", "exit": "", "id": 7, "inTime": "", "outTime": "", "selectedIn": null, "selectedOut": null }


        // ... add more sample data as expected after deletion
      ]
    

    instance.deleteInTime(item, 0);
   // expect(exampleBlockA.state().weekData).toEqual(expectedState);

    })
    then('should delete out time correctly', () => {

      const item = { id: 1 }; // Sample item to delete
    const expectedState = [{"day": "Monday", "enter": "", "exit": "", "id": 1, "inTime": "", "outTime": "", "selectedIn": false, "selectedOut": false}, {"day": "Tuesday", "enter": "", "exit": "", "id": 2, "inTime": "", "outTime": "", "selectedIn": null, "selectedOut": null}, {"day": "Wednesday", "enter": "", "exit": "", "id": 3, "inTime": "", "outTime": "", "selectedIn": null, "selectedOut": null}, {"day": "Thursday", "enter": "", "exit": "", "id": 4, "inTime": "", "outTime": "", "selectedIn": null, "selectedOut": null}, {"day": "Friday", "enter": "", "exit": "", "id": 5, "inTime": "", "outTime": "", "selectedIn": null, "selectedOut": null}, {"day": "Saturday", "enter": "", "exit": "", "id": 6, "inTime": "", "outTime": "", "selectedIn": null, "selectedOut": null}, {"day": "Sunday", "enter": "", "exit": "", "id": 7, "inTime": "", "outTime": "", "selectedIn": null, "selectedOut": null}]
    

    instance.deleteOutTime(item, 0);
    expect(exampleBlockA.state().weekData).toEqual(expectedState);
    })
    then("I can click on button to change clock to Hour face",() => {
      const saveModalButton  = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "hourClock"
      );
      saveModalButton.simulate("press");    
    });
    then("I can click on button to change clock to Minute face",() => {
      const saveModalButton  = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "miuteClock"
      );
      saveModalButton.simulate("press");
    });
    then("I can click on button to change time mode to AM",() => {
      const saveModalButton  = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "timeModeAM"
      );

    
      saveModalButton.simulate("press");
    });
    then("I can click on button to change time mode to PM",() => {

     
      const saveModalButton  = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "timeModePM"
      );
     saveModalButton.simulate("press");

  
    
    });

    
  
   
  });
});

