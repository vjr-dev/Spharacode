//@ts-ignore
//@ts-nocheck
import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'
import * as helpers from 'framework/src/Helpers'
import React from "react";
import VolunteerRegistration from "../../src/VolunteerRegistration"
import Step1 from "../../src/Step1"
import Step2 from "../../src/Step2"
import MessageEnum, { getName } from 'framework/src/Messages/MessageEnum';
import { Message } from 'framework/src/Message';
import { runEngine } from 'framework/src/RunEngine';



const navigation = require("react-navigation")
const CreateEventRes ={

}

const screenProps = {
    navigation: {
        navigate: jest.fn(),
        goBack: jest.fn(),
        addListener: jest.fn().mockImplementation((event: any, callback: any) => {
            callback();
          }),
    state: {
        params: {
          data: { name: 'Test Name' },
          userName: 'abc'
        }
      }
    },
    id: "VolunteerRegistration"
  }

  const screenPropsStep1 = {

    
    navigation: {
        navigate: jest.fn(),
        goBack: jest.fn(),
        addListener: jest.fn().mockImplementation((event: any, callback: any) => {
            callback();
          }),
    state: {
        params: {
          data: { name: 'Test Name1' },
          userName: 'abc1'
        }
      }
    },
    id: "Step1"
  }

  const screenProps3 = {
    navigation: {
      navigate: jest.fn(),
      goBack: jest.fn(),
      addListener: jest.fn().mockImplementation((event: any, callback: any) => {
          callback();
        }),
    },
    id: "Step2",
}



const feature = loadFeature('./__tests__/features/VolunteerRegistration-scenario.feature');


defineFeature(feature, (test) => {

 
    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');

        
    });
    test('User navigates to VolunteerRegistration', ({ given, when, then }) => {
        let VolunteerRegistrationBlockWrapper:ShallowWrapper;
        let instance:VolunteerRegistration ; 

        given('I am a User loading VolunteerRegistration', () => {
            //@ts-ignore
            VolunteerRegistrationBlockWrapper = shallow(<VolunteerRegistration {...screenProps}/>)
            expect(VolunteerRegistrationBlockWrapper).toBeTruthy()
            expect(VolunteerRegistrationBlockWrapper).toMatchSnapshot()     
        });

        when('I navigate to the VolunteerRegistration', () => {
             instance = VolunteerRegistrationBlockWrapper.instance() as VolunteerRegistration
      
        });


        then('VolunteerRegistration will load with out errors', () => {
      
          instance.setState({ VolunteerState: 1 })

           instance.setState({ Userdata: "" }, () => {})
          instance.setState({ switch1: "" })

            //@ts-ignore
            expect(VolunteerRegistrationBlockWrapper).toBeTruthy()
          
        });

      

        then('Handle back button press',() => {
            instance.goback()
            let buttonComponent = VolunteerRegistrationBlockWrapper.findWhere((node) => node.prop('testID') === 'goBackBtn');
            buttonComponent.simulate('press', instance.goback());

        })
      
      
        then("Handle the set button press", () => {
            const panictoggleComponent = VolunteerRegistrationBlockWrapper.findWhere(
              (node) => node.prop("testID") === "switch11Value"
            );
            panictoggleComponent.simulate("valueChange");
          });
      
          then('I can select the button with with out errors', () => {
           instance.goSignupScreen()
           instance.switch11(false)
           //instance. Updateapi()
            
           
        });
        then("VolunteerState condition true", () => {
          instance.setState({
            switch1:true,
            VolunteerState: 0,
          });
        });

        then("I can press ispublick screen with out errror", () => {
         
          const ispublickScreenComponent = VolunteerRegistrationBlockWrapper.findWhere(
            (node) => node.prop("testID") === "clickBtn"
          );
          ispublickScreenComponent.simulate("press");

          
        });
        then("I can press ispublick with out errror", () => {
          instance.setState({
            ispublick: true,
          });
        })    

        then("ispublick condition true", () => {
          instance.setState({
            ispublick:true,
          });
        });

        then("I can press modelOne screen with out errror", () => {
         
          const modelOneScreenComponent = VolunteerRegistrationBlockWrapper.findWhere(
            (node) => node.prop("testID") === "startClickID"
          );
          modelOneScreenComponent.simulate("press");
        });

        then("I can press modelOne with out errror", () => {
          instance.setState({
            Modal1: false,
          });
        }) 

        then("I can click modalbtn with out errror", () => {
          const modalbtnComponent = VolunteerRegistrationBlockWrapper.findWhere(
            (node) => node.prop("testID") === "startModelID"
          );
          modalbtnComponent.simulate("press");
        });
    

    
    
        
    })


   

    test('User navigates to Step1', ({ given, when, then }) => {
      let Step1BlockWrapper:ShallowWrapper;
      let instance:Step1 ; 

      given('I am a User loading Step1', () => {
          Step1BlockWrapper = shallow(<Step1 {...screenPropsStep1}/>)
            
      });

      

      when('I navigate to the Step1', async () => {
           instance = Step1BlockWrapper.instance() as Step1
           jest.setTimeout(30000);
           await instance.componentDidMount()
           instance.onclickModel()
           instance.apicaaal();
           instance.identificationResponse();
      },300000);


      then('Step1 will load with out errors', () => {
          expect(Step1BlockWrapper).toBeTruthy()
         

          const IndentificationListId = new Message(
            getName(MessageEnum.RestAPIResponceMessage)
          );
          IndentificationListId.addData(
            getName(MessageEnum.RestAPIResponceDataMessage),
            IndentificationListId.messageId
          );
          IndentificationListId.addData(
            getName(MessageEnum.RestAPIResponceSuccessMessage),
            JSON.parse(JSON.stringify(CreateEventRes))
          );
          instance.IndentificationListId = IndentificationListId.messageId;
          runEngine.sendMessage("Unit Test", IndentificationListId);


          const IndentificationId = new Message(
            getName(MessageEnum.RestAPIResponceMessage)
          );
          IndentificationId.addData(
            getName(MessageEnum.RestAPIResponceDataMessage),
            IndentificationId.messageId
          );
          IndentificationId.addData(
            getName(MessageEnum.RestAPIResponceSuccessMessage),
            JSON.stringify(CreateEventRes)
          );
          instance.IndentificationId = IndentificationId.messageId;
          runEngine.sendMessage("Unit Test", IndentificationId);
        
       
      });

      then('Handle back button press',() => {
       
        let buttonComponent = Step1BlockWrapper.findWhere((node) => node.prop('testID') === 'goBackID');
        buttonComponent.simulate('press');
      })
    
    
      then("Handle the set button press", () => {
        instance.setState({ modal2: false })
        instance.setState({ Loader: true });
        });

        then('I can select the button with with out errors', () => {
         

          let buttonComponent1 = Step1BlockWrapper.findWhere((node) => node.prop('testID') === 'modelOpenId');
          buttonComponent1.simulate('press')
          instance.onclickModel()

          let buttonComponent = Step1BlockWrapper.findWhere((node) => node.prop('testID') === 'model2ID');
          buttonComponent.simulate('press',instance.setState({ modal2: false }))


          let storageComponent = Step1BlockWrapper.findWhere((node) => node.prop('testID') === 'storageID');
          storageComponent.simulate('press')


      });

      then("LoaderState condition true", () => {
        instance.setState({
          Loader:false,
        });
      });

      then("I can press CameraID screen with out errror", () => {
       
        const CameraIDScreenComponent = Step1BlockWrapper.findWhere(
          (node) => node.prop("testID") === "CameraID"
        );
        CameraIDScreenComponent.simulate("press");

        const CameraIDScreenComponent1 = Step1BlockWrapper.findWhere(
          (node) => node.prop("testID") === "onClickID"
        );
        CameraIDScreenComponent1.simulate("press");
      }); 
  })


  test('User navigates to Step2', ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: Step2;

    given('I am a User loading Step2', () => {
        exampleBlockA = shallow(<Step2 {...screenProps3} />)
    });

    when('I navigate to the Step2', () => {
        instance = exampleBlockA.instance() as Step2
    });

    then('Step2 will load with out errors', () => {
        instance.ison()
        instance.Verifyclick()
        instance.ToggleVolunteerAPI()
      
        const ToggleVolunteerApiCallId = new Message(
          getName(MessageEnum.RestAPIResponceMessage)
        );
        ToggleVolunteerApiCallId.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          ToggleVolunteerApiCallId.messageId
        );
        ToggleVolunteerApiCallId.addData(
          getName(MessageEnum.RestAPIResponceSuccessMessage),
          JSON.parse(JSON.stringify(CreateEventRes))
        );
        instance.ToggleVolunteerApiCallId = ToggleVolunteerApiCallId.messageId;
        runEngine.sendMessage("Unit Test", ToggleVolunteerApiCallId);


        const IndentificationId = new Message(
          getName(MessageEnum.RestAPIResponceMessage)
        );
        IndentificationId.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          IndentificationId.messageId
        );
        IndentificationId.addData(
          getName(MessageEnum.RestAPIResponceSuccessMessage),
          JSON.stringify(CreateEventRes)
        );
        instance.IndentificationId = IndentificationId.messageId;
        runEngine.sendMessage("Unit Test", IndentificationId);

        expect(exampleBlockA).toBeTruthy()
        expect(exampleBlockA).toMatchSnapshot()
    });

    then('I can enter text with out errors', () => {
      
  });

 

    then('I can select the button with with out errors', () => {
        let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'imageBackBtn');
        buttonComponent.simulate('press')
        const fourDigitCode = exampleBlockA.findWhere(
          (node) => node.prop("testID") === "Otpcode")
          fourDigitCode.simulate("changeText", 4)

         expect(exampleBlockA).toMatchSnapshot();
         expect(instance.state.Number).toEqual(4)

         let buttonComponent1 = exampleBlockA.findWhere((node) => node.prop('testID') === 'modelContinue');
        buttonComponent1.simulate('press')
        
    });

});


}
)
