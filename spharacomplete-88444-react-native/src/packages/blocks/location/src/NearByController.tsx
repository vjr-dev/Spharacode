import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";

// Customizable Area Start
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  enableField: boolean;
  details: boolean;
  policeTab: boolean;
  medialTab: boolean;
  fireStationTab: boolean;
  policeStatinDetails: any;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class NearByController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess)
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      enableField: false,
      details: true,
      policeTab: true,
      medialTab: false,
      fireStationTab: false,
      policeStatinDetails: [
        {
          stationName: "Madhapur Polic Staion",
          location: {
            address:
              "Traffic Junction, Near Kavuri Hills, Hitech City Rd,Madhapur, Hyderabad",
            state: "Telangana",
          },
          contact: {
            policeStationNumber: "",
            controlRoomNumber: "",
            spOfficerNumber: "",
          },
        },
        {
          stationName: "All-Women Police Station",
          location: {
            address:
              "Nehru Outer Ring Rd, Greenland Colony, Madhava Reddy Colony, Gachibowll, Hyderabad",
            state: "Telangana",
          },
          contact: {
            policeStationNumber: "",
            controlRoomNumber: "",
            spOfficerNumber: "",
          },
        },
        {
          stationName: "Cyberabad Police Commissionerate",
          location: {
            address:
              "Mumbai Road, Jayabheri Pine valley, Gachibowll, Hyderabad",
            state: "Telangana",
          },
          contact: {
            policeStationNumber: "",
            controlRoomNumber: "",
            spOfficerNumber: "",
          },
        },
      ],
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    // Customizable Area Start
    // Customizable Area End
  }
  
  // Customizable Area Start
  // Customizable Area End
}
