// Customizable Area Start
//@ts-ignore
//@ts-nocheck
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
}

interface S {
  Channels: any;
  allChannels: any;
  modal1Visible: boolean;
  visibleTab: number;
  Token: any;
  newArr: any;
  Loader: boolean;
  TempData: any;
}

interface SS {
  id: any;
}

export default class AlertsListController extends BlockComponent<Props, S, SS> {
  MessageId: any;
  focusListener: any;
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
      Channels: [],
      allChannels: [
        { name: "Incedent6678", id: 1 },
        { name: "Incedent6678", id: 2 },
        { name: "Incedent6678", id: 3 },
        { name: "Incedent6678", id: 4 },
        { name: "Incedent6678", id: 5 },
        { name: "Incedent6678", id: 6 },
        { name: "Incedent6678", id: 7 },
        { name: "Incedent6678", id: 8 },
      ],
      modal1Visible: false,
      visibleTab: 0,
      Token: "",
      newArr: [],
      Loader: false,
      TempData: {
        emergency_alerts: [
          {
            date: "12-September-22",
            time: "12:17PM",
            emergency_alert_name: "Accident",
            address:
              "Bhavnagar, Bhavnagar Taluka, Bhavnagar District, Gujarat, 364001, India",
          },
          {
            date: "23-August-22",
            time: "05:55PM",
            emergency_alert_name: "Accident",
            address: "Kosamba, Mangrol Taluka, Surat, Gujarat, 394120, India",
          },
          {
            date: "21-July-22",
            time: "03:02PM",
            emergency_alert_name: "Robbery",
            address: null,
          },
          {
            date: "21-July-22",
            time: "12:03PM",
            emergency_alert_name: "Robbery",
            address: null,
          },
          {
            date: "19-May-22",
            time: "12:17PM",
            emergency_alert_name: "Robbery",
            address: null,
          },
          {
            date: "07-April-22",
            time: "05:40PM",
            emergency_alert_name: "Robbery",
            address: null,
          },
          {
            date: "30-March-22",
            time: "05:45PM",
            emergency_alert_name: "Robbery",
            address: null,
          },
          {
            date: "30-March-22",
            time: "05:45PM",
            emergency_alert_name: "Robbery",
            address: null,
          },
          {
            date: "08-March-22",
            time: "01:55PM",
            emergency_alert_name: "Robbery",
            address: null,
          },
        ],
        panic_incidents: [
          {
            data: "01-September-22",
            time: "12:00PM",
            alert_type: "PanicIncident",
            address:
              "Google Building 43, Charleston Road, Mountain View, Santa Clara County, California, 94043, United States",
          },
          {
            data: "29-August-22",
            time: "10:05AM",
            alert_type: "PanicIncident",
            address: "Majura Taluka, Surat, Gujarat, 395001, India",
          },
          {
            data: "29-August-22",
            time: "09:56AM",
            alert_type: "PanicIncident",
            address:
              "Google Building 43, Charleston Road, Mountain View, Santa Clara County, California, 94043, United States",
          },
          {
            data: "29-August-22",
            time: "09:49AM",
            alert_type: "PanicIncident",
            address:
              "Google Building 43, Charleston Road, Mountain View, Santa Clara County, California, 94043, United States",
          },
          {
            data: "26-August-22",
            time: "02:17PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "26-August-22",
            time: "02:15PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "26-August-22",
            time: "10:59AM",
            alert_type: "PanicIncident",
            address: "Kosamba, Mangrol Taluka, Surat, Gujarat, 394120, India",
          },
          {
            data: "25-August-22",
            time: "05:04PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "25-August-22",
            time: "04:14PM",
            alert_type: "PanicIncident",
            address: "Majura Taluka, Surat, Gujarat, 395001, India",
          },
          {
            data: "25-August-22",
            time: "04:11PM",
            alert_type: "PanicIncident",
            address:
              "Google Building 43, Charleston Road, Mountain View, Santa Clara County, California, 94043, United States",
          },
          {
            data: "25-August-22",
            time: "12:45PM",
            alert_type: "PanicIncident",
            address: "Majura Taluka, Surat, Gujarat, 395001, India",
          },
          {
            data: "25-August-22",
            time: "12:43PM",
            alert_type: "PanicIncident",
            address: "Majura Taluka, Surat, Gujarat, 395001, India",
          },
          {
            data: "25-August-22",
            time: "12:28PM",
            alert_type: "PanicIncident",
            address: "Majura Taluka, Surat, Gujarat, 395001, India",
          },
          {
            data: "25-August-22",
            time: "12:12PM",
            alert_type: "PanicIncident",
            address: "Majura Taluka, Surat, Gujarat, 395001, India",
          },
          {
            data: "25-August-22",
            time: "11:38AM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "25-August-22",
            time: "10:56AM",
            alert_type: "PanicIncident",
            address:
              "Google Building 43, Charleston Road, Mountain View, Santa Clara County, California, 94043, United States",
          },
          {
            data: "25-August-22",
            time: "09:54AM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "23-August-22",
            time: "07:29PM",
            alert_type: "PanicIncident",
            address: "Katargam Taluka, Surat, Gujarat, India",
          },
          {
            data: "23-August-22",
            time: "02:53PM",
            alert_type: "PanicIncident",
            address: "Kosamba, Mangrol Taluka, Surat, Gujarat, 394120, India",
          },
          {
            data: "23-August-22",
            time: "02:47PM",
            alert_type: "PanicIncident",
            address: "Kosamba, Mangrol Taluka, Surat, Gujarat, 394120, India",
          },
          {
            data: "23-August-22",
            time: "02:42PM",
            alert_type: "PanicIncident",
            address: "Kosamba, Mangrol Taluka, Surat, Gujarat, 394120, India",
          },
          {
            data: "23-August-22",
            time: "02:38PM",
            alert_type: "PanicIncident",
            address: "Kosamba, Mangrol Taluka, Surat, Gujarat, 394120, India",
          },
          {
            data: "23-August-22",
            time: "02:36PM",
            alert_type: "PanicIncident",
            address: "Kosamba, Mangrol Taluka, Surat, Gujarat, 394120, India",
          },
          {
            data: "23-August-22",
            time: "02:01PM",
            alert_type: "PanicIncident",
            address: "Kosamba, Mangrol Taluka, Surat, Gujarat, 394120, India",
          },
          {
            data: "23-August-22",
            time: "12:49PM",
            alert_type: "PanicIncident",
            address: "Kosamba, Mangrol Taluka, Surat, Gujarat, 394120, India",
          },
          {
            data: "23-August-22",
            time: "12:38PM",
            alert_type: "PanicIncident",
            address: "Kosamba, Mangrol Taluka, Surat, Gujarat, 394120, India",
          },
          {
            data: "23-August-22",
            time: "12:34PM",
            alert_type: "PanicIncident",
            address: "Kosamba, Mangrol Taluka, Surat, Gujarat, 394120, India",
          },
          {
            data: "23-August-22",
            time: "12:07PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "23-August-22",
            time: "12:05PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "23-August-22",
            time: "12:02PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "23-August-22",
            time: "11:35AM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "23-August-22",
            time: "11:27AM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "23-August-22",
            time: "11:19AM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "23-August-22",
            time: "11:17AM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "23-August-22",
            time: "10:28AM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "23-August-22",
            time: "10:09AM",
            alert_type: "PanicIncident",
            address:
              "Google Building 43, Charleston Road, Mountain View, Santa Clara County, California, 94043, United States",
          },
          {
            data: "22-August-22",
            time: "05:27PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "22-August-22",
            time: "05:24PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "22-August-22",
            time: "05:22PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "22-August-22",
            time: "03:17PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "22-August-22",
            time: "02:52PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "22-August-22",
            time: "02:44PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "22-August-22",
            time: "02:42PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "22-August-22",
            time: "02:37PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "22-August-22",
            time: "02:35PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "22-August-22",
            time: "02:34PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "22-August-22",
            time: "02:27PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "22-August-22",
            time: "02:25PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "22-August-22",
            time: "02:21PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "22-August-22",
            time: "02:20PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "22-August-22",
            time: "02:16PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "22-August-22",
            time: "02:13PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "22-August-22",
            time: "02:12PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "22-August-22",
            time: "02:05PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "22-August-22",
            time: "02:03PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "22-August-22",
            time: "12:58PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "22-August-22",
            time: "12:50PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "22-August-22",
            time: "12:44PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "22-August-22",
            time: "12:16PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "22-August-22",
            time: "12:11PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "22-August-22",
            time: "11:54AM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "22-August-22",
            time: "11:52AM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "22-August-22",
            time: "11:46AM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "22-August-22",
            time: "11:39AM",
            alert_type: "PanicIncident",
            address:
              "Bhavnagar, Bhavnagar Taluka, Bhavnagar District, Gujarat, 364001, India",
          },
          {
            data: "18-August-22",
            time: "05:51PM",
            alert_type: "PanicIncident",
            address:
              "Bhavnagar, Bhavnagar Taluka, Bhavnagar District, Gujarat, 364001, India",
          },
          {
            data: "18-August-22",
            time: "05:48PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "18-August-22",
            time: "05:47PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "18-August-22",
            time: "05:45PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "18-August-22",
            time: "05:34PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "18-August-22",
            time: "05:32PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "18-August-22",
            time: "05:30PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "18-August-22",
            time: "05:28PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "18-August-22",
            time: "04:55PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "18-August-22",
            time: "03:59PM",
            alert_type: "PanicIncident",
            address:
              "Bhavnagar, Bhavnagar Taluka, Bhavnagar District, Gujarat, 364001, India",
          },
          {
            data: "18-August-22",
            time: "03:56PM",
            alert_type: "PanicIncident",
            address:
              "Bhavnagar, Bhavnagar Taluka, Bhavnagar District, Gujarat, 364001, India",
          },
          {
            data: "18-August-22",
            time: "03:54PM",
            alert_type: "PanicIncident",
            address:
              "Bhavnagar, Bhavnagar Taluka, Bhavnagar District, Gujarat, 364001, India",
          },
          {
            data: "18-August-22",
            time: "02:55PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "18-August-22",
            time: "02:52PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "18-August-22",
            time: "02:51PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "18-August-22",
            time: "02:49PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "18-August-22",
            time: "02:46PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "18-August-22",
            time: "02:43PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "18-August-22",
            time: "02:42PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "18-August-22",
            time: "02:41PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "18-August-22",
            time: "02:41PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "18-August-22",
            time: "02:40PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "18-August-22",
            time: "02:38PM",
            alert_type: "PanicIncident",
            address:
              "Chhaprabhatha, Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "18-August-22",
            time: "02:27PM",
            alert_type: "PanicIncident",
            address:
              "Chhaprabhatha, Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "18-August-22",
            time: "02:24PM",
            alert_type: "PanicIncident",
            address:
              "Chhaprabhatha, Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "18-August-22",
            time: "02:22PM",
            alert_type: "PanicIncident",
            address:
              "Chhaprabhatha, Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "18-August-22",
            time: "02:21PM",
            alert_type: "PanicIncident",
            address:
              "Chhaprabhatha, Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "18-August-22",
            time: "02:18PM",
            alert_type: "PanicIncident",
            address:
              "Chhaprabhatha, Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "18-August-22",
            time: "02:17PM",
            alert_type: "PanicIncident",
            address:
              "Chhaprabhatha, Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "18-August-22",
            time: "02:16PM",
            alert_type: "PanicIncident",
            address:
              "Chhaprabhatha, Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "18-August-22",
            time: "02:13PM",
            alert_type: "PanicIncident",
            address:
              "Chhaprabhatha, Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "18-August-22",
            time: "12:40PM",
            alert_type: "PanicIncident",
            address:
              "Chhaprabhatha, Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "18-August-22",
            time: "12:39PM",
            alert_type: "PanicIncident",
            address:
              "Chhaprabhatha, Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "18-August-22",
            time: "12:36PM",
            alert_type: "PanicIncident",
            address:
              "Chhaprabhatha, Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "18-August-22",
            time: "12:35PM",
            alert_type: "PanicIncident",
            address:
              "Chhaprabhatha, Amroli, Adajan Taluka, Surat, Gujarat, 394107, India",
          },
          {
            data: "18-August-22",
            time: "12:33PM",
            alert_type: "PanicIncident",
            address: "Katargam Taluka, Surat, Gujarat, 395004, India",
          },
          {
            data: "18-August-22",
            time: "12:29PM",
            alert_type: "PanicIncident",
            address: "Katargam Taluka, Surat, Gujarat, 395004, India",
          },
          {
            data: "18-August-22",
            time: "12:27PM",
            alert_type: "PanicIncident",
            address: "Katargam Taluka, Surat, Gujarat, 395004, India",
          },
          {
            data: "18-August-22",
            time: "12:19PM",
            alert_type: "PanicIncident",
            address:
              "Bhavnagar, Bhavnagar Taluka, Bhavnagar District, Gujarat, 364001, India",
          },
          {
            data: "18-August-22",
            time: "12:16PM",
            alert_type: "PanicIncident",
            address:
              "Bhavnagar, Bhavnagar Taluka, Bhavnagar District, Gujarat, 364001, India",
          },
          {
            data: "18-August-22",
            time: "12:12PM",
            alert_type: "PanicIncident",
            address:
              "Bhavnagar, Bhavnagar Taluka, Bhavnagar District, Gujarat, 364001, India",
          },
          {
            data: "18-August-22",
            time: "12:10PM",
            alert_type: "PanicIncident",
            address:
              "Bhavnagar, Bhavnagar Taluka, Bhavnagar District, Gujarat, 364001, India",
          },
          {
            data: "18-August-22",
            time: "12:08PM",
            alert_type: "PanicIncident",
            address:
              "Bhavnagar, Bhavnagar Taluka, Bhavnagar District, Gujarat, 364001, India",
          },
          {
            data: "18-August-22",
            time: "12:04PM",
            alert_type: "PanicIncident",
            address:
              "Bhavnagar, Bhavnagar Taluka, Bhavnagar District, Gujarat, 364001, India",
          },
          {
            data: "18-August-22",
            time: "12:00PM",
            alert_type: "PanicIncident",
            address:
              "Bhavnagar, Bhavnagar Taluka, Bhavnagar District, Gujarat, 364001, India",
          },
          {
            data: "18-August-22",
            time: "11:34AM",
            alert_type: "PanicIncident",
            address: "Katargam Taluka, Surat, Gujarat, 395004, India",
          },
          {
            data: "18-August-22",
            time: "11:32AM",
            alert_type: "PanicIncident",
            address: "Katargam Taluka, Surat, Gujarat, 395004, India",
          },
          {
            data: "18-August-22",
            time: "11:30AM",
            alert_type: "PanicIncident",
            address: "Katargam Taluka, Surat, Gujarat, 395004, India",
          },
          {
            data: "18-August-22",
            time: "11:29AM",
            alert_type: "PanicIncident",
            address: "Katargam Taluka, Surat, Gujarat, 395004, India",
          },
          {
            data: "18-August-22",
            time: "11:24AM",
            alert_type: "PanicIncident",
            address: "Katargam Taluka, Surat, Gujarat, 395004, India",
          },
          {
            data: "18-August-22",
            time: "11:12AM",
            alert_type: "PanicIncident",
            address:
              "Google Building 40, Amphitheatre Parkway, Mountain View, Santa Clara County, California, 94043, United States",
          },
          {
            data: "18-August-22",
            time: "11:10AM",
            alert_type: "PanicIncident",
            address:
              "Google Building 40, Amphitheatre Parkway, Mountain View, Santa Clara County, California, 94043, United States",
          },
          {
            data: "18-August-22",
            time: "11:09AM",
            alert_type: "PanicIncident",
            address:
              "Google Building 40, Amphitheatre Parkway, Mountain View, Santa Clara County, California, 94043, United States",
          },
          {
            data: "18-August-22",
            time: "11:07AM",
            alert_type: "PanicIncident",
            address:
              "Google Building 40, Amphitheatre Parkway, Mountain View, Santa Clara County, California, 94043, United States",
          },
          {
            data: "18-August-22",
            time: "11:05AM",
            alert_type: "PanicIncident",
            address:
              "Google Building 40, Amphitheatre Parkway, Mountain View, Santa Clara County, California, 94043, United States",
          },
          {
            data: "18-August-22",
            time: "11:04AM",
            alert_type: "PanicIncident",
            address:
              "Google Building 40, Amphitheatre Parkway, Mountain View, Santa Clara County, California, 94043, United States",
          },
          {
            data: "18-August-22",
            time: "11:01AM",
            alert_type: "PanicIncident",
            address: "Katargam Taluka, Surat, Gujarat, 395004, India",
          },
          {
            data: "18-August-22",
            time: "10:59AM",
            alert_type: "PanicIncident",
            address: "Katargam Taluka, Surat, Gujarat, 395004, India",
          },
          {
            data: "18-August-22",
            time: "10:57AM",
            alert_type: "PanicIncident",
            address: "Katargam Taluka, Surat, Gujarat, 395004, India",
          },
          {
            data: "18-August-22",
            time: "10:56AM",
            alert_type: "PanicIncident",
            address: "Katargam Taluka, Surat, Gujarat, 395004, India",
          },
          {
            data: "18-August-22",
            time: "10:49AM",
            alert_type: "PanicIncident",
            address: "Katargam Taluka, Surat, Gujarat, 395004, India",
          },
          {
            data: "18-August-22",
            time: "10:42AM",
            alert_type: "PanicIncident",
            address: "Katargam Taluka, Surat, Gujarat, 395004, India",
          },
          {
            data: "18-August-22",
            time: "10:40AM",
            alert_type: "PanicIncident",
            address: "Katargam Taluka, Surat, Gujarat, 395004, India",
          },
          {
            data: "18-August-22",
            time: "10:37AM",
            alert_type: "PanicIncident",
            address: "Katargam Taluka, Surat, Gujarat, 395004, India",
          },
          {
            data: "18-August-22",
            time: "10:36AM",
            alert_type: "PanicIncident",
            address: "Katargam Taluka, Surat, Gujarat, 395004, India",
          },
          {
            data: "18-August-22",
            time: "10:34AM",
            alert_type: "PanicIncident",
            address: "Katargam Taluka, Surat, Gujarat, 395004, India",
          },
          {
            data: "18-August-22",
            time: "10:32AM",
            alert_type: "PanicIncident",
            address: "Katargam Taluka, Surat, Gujarat, 395004, India",
          },
          {
            data: "18-August-22",
            time: "10:29AM",
            alert_type: "PanicIncident",
            address: "Katargam Taluka, Surat, Gujarat, 395004, India",
          },
          {
            data: "18-August-22",
            time: "10:28AM",
            alert_type: "PanicIncident",
            address: "Katargam Taluka, Surat, Gujarat, 395004, India",
          },
          {
            data: "18-August-22",
            time: "10:26AM",
            alert_type: "PanicIncident",
            address: "Katargam Taluka, Surat, Gujarat, 395004, India",
          },
          {
            data: "18-August-22",
            time: "10:23AM",
            alert_type: "PanicIncident",
            address: "Katargam Taluka, Surat, Gujarat, 395004, India",
          },
          {
            data: "18-August-22",
            time: "10:18AM",
            alert_type: "PanicIncident",
            address: "Katargam Taluka, Surat, Gujarat, 395004, India",
          },
          {
            data: "18-August-22",
            time: "10:13AM",
            alert_type: "PanicIncident",
            address: "Katargam Taluka, Surat, Gujarat, 395004, India",
          },
          {
            data: "18-August-22",
            time: "10:12AM",
            alert_type: "PanicIncident",
            address: "Katargam Taluka, Surat, Gujarat, 395004, India",
          },
          {
            data: "18-August-22",
            time: "10:08AM",
            alert_type: "PanicIncident",
            address: "Katargam Taluka, Surat, Gujarat, 395004, India",
          },
          {
            data: "18-August-22",
            time: "10:04AM",
            alert_type: "PanicIncident",
            address: "Katargam Taluka, Surat, Gujarat, 395004, India",
          },
          {
            data: "18-August-22",
            time: "10:02AM",
            alert_type: "PanicIncident",
            address:
              "Google Building 40, Amphitheatre Parkway, Mountain View, Santa Clara County, California, 94043, United States",
          },
          {
            data: "17-August-22",
            time: "06:15PM",
            alert_type: "PanicIncident",
            address: "Katargam Taluka, Surat, Gujarat, 395004, India",
          },
          {
            data: "17-August-22",
            time: "06:08PM",
            alert_type: "PanicIncident",
            address: "Katargam Taluka, Surat, Gujarat, 395004, India",
          },
          {
            data: "17-August-22",
            time: "05:35PM",
            alert_type: "PanicIncident",
            address:
              "Google Building 43, Charleston Road, Mountain View, Santa Clara County, California, 94043, United States",
          },
          {
            data: "17-August-22",
            time: "05:34PM",
            alert_type: "PanicIncident",
            address:
              "Google Building 40, Amphitheatre Parkway, Mountain View, Santa Clara County, California, 94043, United States",
          },
          {
            data: "17-August-22",
            time: "05:03PM",
            alert_type: "PanicIncident",
            address:
              "Google Building 40, Amphitheatre Parkway, Mountain View, Santa Clara County, California, 94043, United States",
          },
          {
            data: "17-August-22",
            time: "04:44PM",
            alert_type: "PanicIncident",
            address:
              "Google Building 43, Charleston Road, Mountain View, Santa Clara County, California, 94043, United States",
          },
          {
            data: "17-August-22",
            time: "12:49PM",
            alert_type: "PanicIncident",
            address: "Katargam Taluka, Surat, Gujarat, 395004, India",
          },
          {
            data: "16-August-22",
            time: "06:30PM",
            alert_type: "PanicIncident",
            address: "Chorasi Taluka, Surat, Gujarat, 395009, India",
          },
          {
            data: "16-August-22",
            time: "06:27PM",
            alert_type: "PanicIncident",
            address: "Chorasi Taluka, Surat, Gujarat, 395009, India",
          },
          {
            data: "16-August-22",
            time: "06:18PM",
            alert_type: "PanicIncident",
            address: "Chorasi Taluka, Surat, Gujarat, 395009, India",
          },
          {
            data: "16-August-22",
            time: "06:04PM",
            alert_type: "PanicIncident",
            address: "Chorasi Taluka, Surat, Gujarat, 395009, India",
          },
          {
            data: "16-August-22",
            time: "06:02PM",
            alert_type: "PanicIncident",
            address: "Chorasi Taluka, Surat, Gujarat, 395009, India",
          },
          {
            data: "16-August-22",
            time: "05:59PM",
            alert_type: "PanicIncident",
            address: "Chorasi Taluka, Surat, Gujarat, 395009, India",
          },
          {
            data: "16-August-22",
            time: "05:56PM",
            alert_type: "PanicIncident",
            address: "Chorasi Taluka, Surat, Gujarat, 395009, India",
          },
          {
            data: "16-August-22",
            time: "05:55PM",
            alert_type: "PanicIncident",
            address: "Chorasi Taluka, Surat, Gujarat, 395009, India",
          },
          {
            data: "16-August-22",
            time: "05:50PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "16-August-22",
            time: "05:46PM",
            alert_type: "PanicIncident",
            address: "Chorasi Taluka, Surat, Gujarat, 395009, India",
          },
          {
            data: "16-August-22",
            time: "05:44PM",
            alert_type: "PanicIncident",
            address: "Chorasi Taluka, Surat, Gujarat, 395009, India",
          },
          {
            data: "16-August-22",
            time: "05:35PM",
            alert_type: "PanicIncident",
            address:
              "Google Building 40, Amphitheatre Parkway, Mountain View, Santa Clara County, California, 94043, United States",
          },
          {
            data: "16-August-22",
            time: "05:04PM",
            alert_type: "PanicIncident",
            address:
              "Google Building 40, Amphitheatre Parkway, Mountain View, Santa Clara County, California, 94043, United States",
          },
          {
            data: "16-August-22",
            time: "04:40PM",
            alert_type: "PanicIncident",
            address:
              "Google Building 40, Amphitheatre Parkway, Mountain View, Santa Clara County, California, 94043, United States",
          },
          {
            data: "16-August-22",
            time: "04:35PM",
            alert_type: "PanicIncident",
            address:
              "Google Building 40, Amphitheatre Parkway, Mountain View, Santa Clara County, California, 94043, United States",
          },
          {
            data: "16-August-22",
            time: "04:16PM",
            alert_type: "PanicIncident",
            address:
              "Google Building 40, Amphitheatre Parkway, Mountain View, Santa Clara County, California, 94043, United States",
          },
          {
            data: "16-August-22",
            time: "04:14PM",
            alert_type: "PanicIncident",
            address:
              "Google Building 40, Amphitheatre Parkway, Mountain View, Santa Clara County, California, 94043, United States",
          },
          {
            data: "16-August-22",
            time: "03:54PM",
            alert_type: "PanicIncident",
            address:
              "Google Building 40, Amphitheatre Parkway, Mountain View, Santa Clara County, California, 94043, United States",
          },
          {
            data: "16-August-22",
            time: "03:52PM",
            alert_type: "PanicIncident",
            address:
              "Google Building 40, Amphitheatre Parkway, Mountain View, Santa Clara County, California, 94043, United States",
          },
          {
            data: "16-August-22",
            time: "03:47PM",
            alert_type: "PanicIncident",
            address:
              "Google Building 40, Amphitheatre Parkway, Mountain View, Santa Clara County, California, 94043, United States",
          },
          {
            data: "16-August-22",
            time: "03:46PM",
            alert_type: "PanicIncident",
            address:
              "Google Building 40, Amphitheatre Parkway, Mountain View, Santa Clara County, California, 94043, United States",
          },
          {
            data: "16-August-22",
            time: "03:44PM",
            alert_type: "PanicIncident",
            address:
              "Google Building 40, Amphitheatre Parkway, Mountain View, Santa Clara County, California, 94043, United States",
          },
          {
            data: "16-August-22",
            time: "03:37PM",
            alert_type: "PanicIncident",
            address:
              "Google Building 40, Amphitheatre Parkway, Mountain View, Santa Clara County, California, 94043, United States",
          },
          {
            data: "16-August-22",
            time: "03:36PM",
            alert_type: "PanicIncident",
            address:
              "Google Building 40, Amphitheatre Parkway, Mountain View, Santa Clara County, California, 94043, United States",
          },
          {
            data: "16-August-22",
            time: "03:34PM",
            alert_type: "PanicIncident",
            address:
              "Google Building 40, Amphitheatre Parkway, Mountain View, Santa Clara County, California, 94043, United States",
          },
          {
            data: "16-August-22",
            time: "03:33PM",
            alert_type: "PanicIncident",
            address:
              "Google Building 40, Amphitheatre Parkway, Mountain View, Santa Clara County, California, 94043, United States",
          },
          {
            data: "16-August-22",
            time: "03:03PM",
            alert_type: "PanicIncident",
            address:
              "Google Building 40, Amphitheatre Parkway, Mountain View, Santa Clara County, California, 94043, United States",
          },
          {
            data: "16-August-22",
            time: "03:02PM",
            alert_type: "PanicIncident",
            address:
              "Google Building 40, Amphitheatre Parkway, Mountain View, Santa Clara County, California, 94043, United States",
          },
          {
            data: "16-August-22",
            time: "03:00PM",
            alert_type: "PanicIncident",
            address:
              "Google Building 40, Amphitheatre Parkway, Mountain View, Santa Clara County, California, 94043, United States",
          },
          {
            data: "16-August-22",
            time: "02:59PM",
            alert_type: "PanicIncident",
            address:
              "Google Building 40, Amphitheatre Parkway, Mountain View, Santa Clara County, California, 94043, United States",
          },
          {
            data: "16-August-22",
            time: "02:59PM",
            alert_type: "PanicIncident",
            address:
              "Google Building 40, Amphitheatre Parkway, Mountain View, Santa Clara County, California, 94043, United States",
          },
          {
            data: "16-August-22",
            time: "02:58PM",
            alert_type: "PanicIncident",
            address:
              "Google Building 40, Amphitheatre Parkway, Mountain View, Santa Clara County, California, 94043, United States",
          },
          {
            data: "16-August-22",
            time: "02:56PM",
            alert_type: "PanicIncident",
            address:
              "Google Building 40, Amphitheatre Parkway, Mountain View, Santa Clara County, California, 94043, United States",
          },
          {
            data: "16-August-22",
            time: "02:55PM",
            alert_type: "PanicIncident",
            address:
              "Google Building 40, Amphitheatre Parkway, Mountain View, Santa Clara County, California, 94043, United States",
          },
          {
            data: "16-August-22",
            time: "02:52PM",
            alert_type: "PanicIncident",
            address:
              "Google Building 40, Amphitheatre Parkway, Mountain View, Santa Clara County, California, 94043, United States",
          },
          {
            data: "16-August-22",
            time: "02:50PM",
            alert_type: "PanicIncident",
            address:
              "Google Building 40, Amphitheatre Parkway, Mountain View, Santa Clara County, California, 94043, United States",
          },
          {
            data: "16-August-22",
            time: "02:36PM",
            alert_type: "PanicIncident",
            address:
              "Google Building 40, Amphitheatre Parkway, Mountain View, Santa Clara County, California, 94043, United States",
          },
          {
            data: "16-August-22",
            time: "02:32PM",
            alert_type: "PanicIncident",
            address:
              "Google Building 40, Amphitheatre Parkway, Mountain View, Santa Clara County, California, 94043, United States",
          },
          {
            data: "16-August-22",
            time: "02:22PM",
            alert_type: "PanicIncident",
            address:
              "Google Building 40, Amphitheatre Parkway, Mountain View, Santa Clara County, California, 94043, United States",
          },
          {
            data: "16-August-22",
            time: "02:17PM",
            alert_type: "PanicIncident",
            address:
              "Google Building 40, Amphitheatre Parkway, Mountain View, Santa Clara County, California, 94043, United States",
          },
          {
            data: "16-August-22",
            time: "02:09PM",
            alert_type: "PanicIncident",
            address:
              "Google Building 40, Amphitheatre Parkway, Mountain View, Santa Clara County, California, 94043, United States",
          },
          {
            data: "16-August-22",
            time: "02:04PM",
            alert_type: "PanicIncident",
            address:
              "Google Building 40, Amphitheatre Parkway, Mountain View, Santa Clara County, California, 94043, United States",
          },
          {
            data: "16-August-22",
            time: "01:00PM",
            alert_type: "PanicIncident",
            address:
              "Google Building 40, Amphitheatre Parkway, Mountain View, Santa Clara County, California, 94043, United States",
          },
          {
            data: "16-August-22",
            time: "12:53PM",
            alert_type: "PanicIncident",
            address: "NH48, Kamrej Taluka, Surat, Gujarat, 394150, India",
          },
          {
            data: "16-August-22",
            time: "11:51AM",
            alert_type: "PanicIncident",
            address: "NH48, Kamrej Taluka, Surat, Gujarat, 394150, India",
          },
          {
            data: "16-August-22",
            time: "11:40AM",
            alert_type: "PanicIncident",
            address: "NH48, Kamrej Taluka, Surat, Gujarat, 394150, India",
          },
          {
            data: "16-August-22",
            time: "11:37AM",
            alert_type: "PanicIncident",
            address: "NH48, Kamrej Taluka, Surat, Gujarat, 394150, India",
          },
          {
            data: "16-August-22",
            time: "11:25AM",
            alert_type: "PanicIncident",
            address: "NH48, Kamrej Taluka, Surat, Gujarat, 394150, India",
          },
          {
            data: "16-August-22",
            time: "11:08AM",
            alert_type: "PanicIncident",
            address: "NH48, Kamrej Taluka, Surat, Gujarat, 394150, India",
          },
          {
            data: "16-August-22",
            time: "11:06AM",
            alert_type: "PanicIncident",
            address: "NH48, Kamrej Taluka, Surat, Gujarat, 394150, India",
          },
          {
            data: "16-August-22",
            time: "11:05AM",
            alert_type: "PanicIncident",
            address: "NH48, Kamrej Taluka, Surat, Gujarat, 394150, India",
          },
          {
            data: "16-August-22",
            time: "11:04AM",
            alert_type: "PanicIncident",
            address: "NH48, Kamrej Taluka, Surat, Gujarat, 394150, India",
          },
          {
            data: "16-August-22",
            time: "10:22AM",
            alert_type: "PanicIncident",
            address: "NH48, Kamrej Taluka, Surat, Gujarat, 394150, India",
          },
          {
            data: "16-August-22",
            time: "10:18AM",
            alert_type: "PanicIncident",
            address: "NH48, Kamrej Taluka, Surat, Gujarat, 394150, India",
          },
          {
            data: "13-August-22",
            time: "11:01AM",
            alert_type: "PanicIncident",
            address: "NH48, Kamrej Taluka, Surat, Gujarat, 394150, India",
          },
          {
            data: "13-August-22",
            time: "10:59AM",
            alert_type: "PanicIncident",
            address: "NH48, Kamrej Taluka, Surat, Gujarat, 394150, India",
          },
          {
            data: "13-August-22",
            time: "10:23AM",
            alert_type: "PanicIncident",
            address: "NH48, Kamrej Taluka, Surat, Gujarat, 394150, India",
          },
          {
            data: "13-August-22",
            time: "10:20AM",
            alert_type: "PanicIncident",
            address: "NH48, Kamrej Taluka, Surat, Gujarat, 394150, India",
          },
          {
            data: "12-August-22",
            time: "05:48PM",
            alert_type: "PanicIncident",
            address: "NH48, Kamrej Taluka, Surat, Gujarat, 394150, India",
          },
          {
            data: "12-August-22",
            time: "05:44PM",
            alert_type: "PanicIncident",
            address: "NH48, Kamrej Taluka, Surat, Gujarat, 394150, India",
          },
          {
            data: "12-August-22",
            time: "05:41PM",
            alert_type: "PanicIncident",
            address: "NH48, Kamrej Taluka, Surat, Gujarat, 394150, India",
          },
          {
            data: "12-August-22",
            time: "05:39PM",
            alert_type: "PanicIncident",
            address: "NH48, Kamrej Taluka, Surat, Gujarat, 394150, India",
          },
          {
            data: "12-August-22",
            time: "05:38PM",
            alert_type: "PanicIncident",
            address: "NH48, Kamrej Taluka, Surat, Gujarat, 394150, India",
          },
          {
            data: "12-August-22",
            time: "05:37PM",
            alert_type: "PanicIncident",
            address: "NH48, Kamrej Taluka, Surat, Gujarat, 394150, India",
          },
          {
            data: "12-August-22",
            time: "05:03PM",
            alert_type: "PanicIncident",
            address: "NH48, Kamrej Taluka, Surat, Gujarat, 394150, India",
          },
          {
            data: "12-August-22",
            time: "04:58PM",
            alert_type: "PanicIncident",
            address: "NH48, Kamrej Taluka, Surat, Gujarat, 394150, India",
          },
          {
            data: "12-August-22",
            time: "04:57PM",
            alert_type: "PanicIncident",
            address: "NH48, Kamrej Taluka, Surat, Gujarat, 394150, India",
          },
          {
            data: "12-August-22",
            time: "04:47PM",
            alert_type: "PanicIncident",
            address: "NH48, Kamrej Taluka, Surat, Gujarat, 394150, India",
          },
          {
            data: "12-August-22",
            time: "04:45PM",
            alert_type: "PanicIncident",
            address: "NH48, Kamrej Taluka, Surat, Gujarat, 394150, India",
          },
          {
            data: "12-August-22",
            time: "04:03PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "12-August-22",
            time: "03:23PM",
            alert_type: "PanicIncident",
            address: "NH48, Kamrej Taluka, Surat, Gujarat, 394150, India",
          },
          {
            data: "12-August-22",
            time: "03:16PM",
            alert_type: "PanicIncident",
            address: "NH48, Kamrej Taluka, Surat, Gujarat, 394150, India",
          },
          {
            data: "12-August-22",
            time: "03:13PM",
            alert_type: "PanicIncident",
            address: "NH48, Kamrej Taluka, Surat, Gujarat, 394150, India",
          },
          {
            data: "12-August-22",
            time: "03:12PM",
            alert_type: "PanicIncident",
            address: "NH48, Kamrej Taluka, Surat, Gujarat, 394150, India",
          },
          {
            data: "12-August-22",
            time: "02:46PM",
            alert_type: "PanicIncident",
            address: "NH48, Kamrej Taluka, Surat, Gujarat, 394150, India",
          },
          {
            data: "12-August-22",
            time: "02:41PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "12-August-22",
            time: "02:27PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "12-August-22",
            time: "02:24PM",
            alert_type: "PanicIncident",
            address: "NH48, Kamrej Taluka, Surat, Gujarat, 394150, India",
          },
          {
            data: "12-August-22",
            time: "02:21PM",
            alert_type: "PanicIncident",
            address: "NH48, Kamrej Taluka, Surat, Gujarat, 394150, India",
          },
          {
            data: "12-August-22",
            time: "02:20PM",
            alert_type: "PanicIncident",
            address: "NH48, Kamrej Taluka, Surat, Gujarat, 394150, India",
          },
          {
            data: "12-August-22",
            time: "02:17PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "12-August-22",
            time: "02:11PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "12-August-22",
            time: "02:08PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "12-August-22",
            time: "02:07PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "12-August-22",
            time: "02:01PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "12-August-22",
            time: "12:58PM",
            alert_type: "PanicIncident",
            address: "NH48, Kamrej Taluka, Surat, Gujarat, 394150, India",
          },
          {
            data: "12-August-22",
            time: "12:54PM",
            alert_type: "PanicIncident",
            address: "NH48, Kamrej Taluka, Surat, Gujarat, 394150, India",
          },
          {
            data: "12-August-22",
            time: "12:52PM",
            alert_type: "PanicIncident",
            address: "NH48, Kamrej Taluka, Surat, Gujarat, 394150, India",
          },
          {
            data: "12-August-22",
            time: "12:24PM",
            alert_type: "PanicIncident",
            address: "NH48, Kamrej Taluka, Surat, Gujarat, 394150, India",
          },
          {
            data: "10-August-22",
            time: "05:31PM",
            alert_type: "PanicIncident",
            address: "NH48, Kamrej Taluka, Surat, Gujarat, 394150, India",
          },
          {
            data: "05-August-22",
            time: "03:06PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "05-August-22",
            time: "12:04PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "05-August-22",
            time: "11:35AM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "05-August-22",
            time: "11:34AM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "05-August-22",
            time: "11:33AM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "05-August-22",
            time: "11:32AM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "05-August-22",
            time: "11:32AM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "05-August-22",
            time: "11:29AM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "05-August-22",
            time: "11:28AM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "05-August-22",
            time: "11:13AM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "05-August-22",
            time: "10:55AM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "05-August-22",
            time: "10:53AM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "05-August-22",
            time: "10:51AM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "05-August-22",
            time: "10:36AM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "05-August-22",
            time: "10:30AM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "05-August-22",
            time: "10:25AM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "05-August-22",
            time: "10:23AM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "05-August-22",
            time: "10:09AM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "05-August-22",
            time: "10:06AM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "04-August-22",
            time: "06:06PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "04-August-22",
            time: "06:04PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "04-August-22",
            time: "06:03PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "04-August-22",
            time: "05:58PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "04-August-22",
            time: "05:52PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "04-August-22",
            time: "05:51PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "04-August-22",
            time: "05:49PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "04-August-22",
            time: "05:35PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "04-August-22",
            time: "05:34PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "04-August-22",
            time: "05:23PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "04-August-22",
            time: "05:21PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "04-August-22",
            time: "05:12PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "04-August-22",
            time: "05:09PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "04-August-22",
            time: "04:44PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "04-August-22",
            time: "04:42PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "04-August-22",
            time: "04:35PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "04-August-22",
            time: "04:17PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "04-August-22",
            time: "04:13PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "04-August-22",
            time: "04:10PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "04-August-22",
            time: "04:04PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "04-August-22",
            time: "04:03PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "04-August-22",
            time: "04:01PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "04-August-22",
            time: "03:59PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "04-August-22",
            time: "03:57PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "04-August-22",
            time: "03:53PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "04-August-22",
            time: "03:45PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "04-August-22",
            time: "03:41PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "04-August-22",
            time: "03:39PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "04-August-22",
            time: "03:32PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "04-August-22",
            time: "03:30PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "04-August-22",
            time: "02:52PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "04-August-22",
            time: "02:45PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "04-August-22",
            time: "02:43PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "04-August-22",
            time: "02:38PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "04-August-22",
            time: "02:24PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "04-August-22",
            time: "02:18PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "04-August-22",
            time: "02:15PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "04-August-22",
            time: "02:12PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "04-August-22",
            time: "02:09PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "04-August-22",
            time: "12:59PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "04-August-22",
            time: "12:58PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "04-August-22",
            time: "12:57PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "04-August-22",
            time: "12:54PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "04-August-22",
            time: "12:52PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "04-August-22",
            time: "12:49PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "04-August-22",
            time: "12:46PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "04-August-22",
            time: "12:44PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "04-August-22",
            time: "12:42PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "04-August-22",
            time: "12:38PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "04-August-22",
            time: "12:16PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "04-August-22",
            time: "12:12PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "03-August-22",
            time: "04:02PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "03-August-22",
            time: "03:56PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "03-August-22",
            time: "03:43PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "03-August-22",
            time: "03:35PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "03-August-22",
            time: "03:31PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "03-August-22",
            time: "03:26PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "03-August-22",
            time: "03:15PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "03-August-22",
            time: "03:12PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "03-August-22",
            time: "02:56PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "03-August-22",
            time: "02:52PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "03-August-22",
            time: "02:45PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "03-August-22",
            time: "02:32PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "03-August-22",
            time: "02:30PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "03-August-22",
            time: "02:21PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "03-August-22",
            time: "02:16PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "03-August-22",
            time: "02:09PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "03-August-22",
            time: "02:06PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "03-August-22",
            time: "12:59PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "03-August-22",
            time: "12:58PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "03-August-22",
            time: "12:56PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "03-August-22",
            time: "12:49PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "03-August-22",
            time: "12:41PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "03-August-22",
            time: "12:36PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "03-August-22",
            time: "12:32PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "03-August-22",
            time: "12:27PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "03-August-22",
            time: "12:24PM",
            alert_type: "PanicIncident",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            data: "03-August-22",
            time: "10:30AM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "03-August-22",
            time: "09:56AM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "02-August-22",
            time: "02:49PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "22-July-22",
            time: "10:24AM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "22-July-22",
            time: "10:20AM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "21-July-22",
            time: "02:54PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "21-July-22",
            time: "12:04PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "21-July-22",
            time: "12:03PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "19-July-22",
            time: "02:49PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "15-July-22",
            time: "12:15PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "13-July-22",
            time: "03:58PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "13-July-22",
            time: "03:55PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "05-July-22",
            time: "11:27AM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "05-July-22",
            time: "10:55AM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "30-June-22",
            time: "12:31PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "24-June-22",
            time: "12:42PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "07-June-22",
            time: "03:58PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "03-June-22",
            time: "12:41PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "25-May-22",
            time: "03:21PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "25-May-22",
            time: "03:14PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "25-May-22",
            time: "03:07PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "20-May-22",
            time: "02:25PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "20-May-22",
            time: "12:24PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "19-May-22",
            time: "03:28PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "19-May-22",
            time: "03:25PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "19-May-22",
            time: "03:20PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "19-May-22",
            time: "03:20PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "19-May-22",
            time: "02:45PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "19-May-22",
            time: "12:06PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "19-May-22",
            time: "12:03PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "19-May-22",
            time: "11:30AM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "16-May-22",
            time: "05:46PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "16-May-22",
            time: "05:46PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "16-May-22",
            time: "05:46PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "16-May-22",
            time: "05:23PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "16-May-22",
            time: "05:22PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "16-May-22",
            time: "05:22PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "16-May-22",
            time: "05:17PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "16-May-22",
            time: "05:16PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "16-May-22",
            time: "05:15PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "16-May-22",
            time: "05:13PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "16-May-22",
            time: "04:55PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "16-May-22",
            time: "04:51PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "16-May-22",
            time: "04:49PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "16-May-22",
            time: "04:35PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "16-May-22",
            time: "04:30PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "16-May-22",
            time: "04:22PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "16-May-22",
            time: "04:20PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "16-May-22",
            time: "04:19PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "16-May-22",
            time: "04:18PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "16-May-22",
            time: "04:17PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "16-May-22",
            time: "04:16PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "16-May-22",
            time: "03:27PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "16-May-22",
            time: "03:26PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "16-May-22",
            time: "03:23PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "16-May-22",
            time: "03:22PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "16-May-22",
            time: "03:18PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "16-May-22",
            time: "03:16PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "16-May-22",
            time: "03:15PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "16-May-22",
            time: "03:12PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "16-May-22",
            time: "03:11PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "16-May-22",
            time: "03:11PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "16-May-22",
            time: "12:55PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "16-May-22",
            time: "12:44PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "16-May-22",
            time: "12:36PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "16-May-22",
            time: "12:35PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "16-May-22",
            time: "12:34PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "16-May-22",
            time: "12:33PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "16-May-22",
            time: "12:24PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "16-May-22",
            time: "12:23PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "16-May-22",
            time: "12:21PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "16-May-22",
            time: "12:19PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "16-May-22",
            time: "12:13PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "16-May-22",
            time: "12:13PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "16-May-22",
            time: "12:12PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "16-May-22",
            time: "12:11PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "16-May-22",
            time: "11:56AM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "16-May-22",
            time: "11:56AM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "16-May-22",
            time: "11:55AM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "16-May-22",
            time: "11:49AM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "14-May-22",
            time: "12:45PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "12-May-22",
            time: "05:56PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "12-May-22",
            time: "05:56PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "12-May-22",
            time: "05:55PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "12-May-22",
            time: "05:52PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "12-May-22",
            time: "05:50PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "12-May-22",
            time: "04:52PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "12-May-22",
            time: "10:47AM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "12-May-22",
            time: "10:46AM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "12-May-22",
            time: "10:44AM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "12-May-22",
            time: "10:42AM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "12-May-22",
            time: "10:41AM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "12-May-22",
            time: "10:39AM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "12-May-22",
            time: "10:39AM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "12-May-22",
            time: "10:38AM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "12-May-22",
            time: "10:23AM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "12-May-22",
            time: "10:20AM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "12-May-22",
            time: "10:19AM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "12-May-22",
            time: "10:17AM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "12-May-22",
            time: "10:07AM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "12-May-22",
            time: "10:05AM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "12-May-22",
            time: "10:04AM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "12-May-22",
            time: "10:02AM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "12-May-22",
            time: "10:01AM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "12-May-22",
            time: "09:43AM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "12-May-22",
            time: "09:43AM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "12-May-22",
            time: "09:42AM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "11-May-22",
            time: "04:05PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "11-May-22",
            time: "04:02PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "11-May-22",
            time: "02:28PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "11-May-22",
            time: "02:27PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "11-May-22",
            time: "02:24PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "11-May-22",
            time: "02:23PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "11-May-22",
            time: "02:16PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "11-May-22",
            time: "02:16PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "11-May-22",
            time: "02:15PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "11-May-22",
            time: "11:07AM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "10-May-22",
            time: "07:36PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "10-May-22",
            time: "07:35PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "10-May-22",
            time: "05:51PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "10-May-22",
            time: "05:40PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "10-May-22",
            time: "05:28PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "10-May-22",
            time: "05:22PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "10-May-22",
            time: "05:22PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "10-May-22",
            time: "03:18PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "10-May-22",
            time: "02:52PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "09-May-22",
            time: "07:46PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "09-May-22",
            time: "07:42PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "09-May-22",
            time: "07:41PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "03-May-22",
            time: "02:53PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "03-May-22",
            time: "02:31PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "03-May-22",
            time: "02:24PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "03-May-22",
            time: "12:36PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "03-May-22",
            time: "11:54AM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "03-May-22",
            time: "11:45AM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "03-May-22",
            time: "11:07AM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "03-May-22",
            time: "11:07AM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "03-May-22",
            time: "10:21AM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "29-April-22",
            time: "12:47PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "29-April-22",
            time: "12:47PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "29-April-22",
            time: "12:46PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "29-April-22",
            time: "12:32PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "29-April-22",
            time: "12:32PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "29-April-22",
            time: "12:31PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "29-April-22",
            time: "12:29PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "29-April-22",
            time: "12:25PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "27-April-22",
            time: "03:12PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "27-April-22",
            time: "03:08PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "12-April-22",
            time: "12:03PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "08-April-22",
            time: "04:50PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "07-April-22",
            time: "04:54PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "01-April-22",
            time: "02:53PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "08-March-22",
            time: "03:32PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "08-March-22",
            time: "03:32PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "08-March-22",
            time: "03:23PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "08-March-22",
            time: "03:19PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "08-March-22",
            time: "12:09PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "07-February-22",
            time: "09:52AM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "02-February-22",
            time: "04:16PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "02-February-22",
            time: "04:16PM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "01-February-22",
            time: "11:56AM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "01-February-22",
            time: "11:56AM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "01-February-22",
            time: "11:55AM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "01-February-22",
            time: "11:55AM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "01-February-22",
            time: "11:53AM",
            alert_type: "PanicIncident",
            address: null,
          },
          {
            data: "01-February-22",
            time: "11:53AM",
            alert_type: "PanicIncident",
            address: null,
          },
        ],
        fire_incidents: [
          {
            date: "12-September-22",
            time: "12:16PM",
            alert_type: "FireIncident",
            address:
              "Bhavnagar, Bhavnagar Taluka, Bhavnagar District, Gujarat, 364001, India",
          },
          {
            date: "19-May-22",
            time: "12:13PM",
            alert_type: "FireIncident",
            address: null,
          },
          {
            date: "18-April-22",
            time: "02:39PM",
            alert_type: "FireIncident",
            address: null,
          },
          {
            date: "12-April-22",
            time: "12:02PM",
            alert_type: "FireIncident",
            address: null,
          },
          {
            date: "08-April-22",
            time: "09:59AM",
            alert_type: "FireIncident",
            address: null,
          },
          {
            date: "07-April-22",
            time: "11:37AM",
            alert_type: "FireIncident",
            address: null,
          },
          {
            date: "07-April-22",
            time: "11:35AM",
            alert_type: "FireIncident",
            address: null,
          },
          {
            date: "07-April-22",
            time: "11:33AM",
            alert_type: "FireIncident",
            address: null,
          },
          {
            date: "07-April-22",
            time: "11:31AM",
            alert_type: "FireIncident",
            address: null,
          },
          {
            date: "07-April-22",
            time: "11:31AM",
            alert_type: "FireIncident",
            address: null,
          },
          {
            date: "07-April-22",
            time: "11:25AM",
            alert_type: "FireIncident",
            address: null,
          },
          {
            date: "07-April-22",
            time: "11:22AM",
            alert_type: "FireIncident",
            address: null,
          },
          {
            date: "07-April-22",
            time: "11:20AM",
            alert_type: "FireIncident",
            address: null,
          },
          {
            date: "01-April-22",
            time: "03:01PM",
            alert_type: "FireIncident",
            address: null,
          },
          {
            date: "01-April-22",
            time: "11:11AM",
            alert_type: "FireIncident",
            address: null,
          },
          {
            date: "31-March-22",
            time: "11:58AM",
            alert_type: "FireIncident",
            address: null,
          },
          {
            date: "31-March-22",
            time: "11:57AM",
            alert_type: "FireIncident",
            address: null,
          },
          {
            date: "30-March-22",
            time: "06:26PM",
            alert_type: "FireIncident",
            address: null,
          },
          {
            date: "30-March-22",
            time: "05:44PM",
            alert_type: "FireIncident",
            address: null,
          },
          {
            date: "30-March-22",
            time: "05:35PM",
            alert_type: "FireIncident",
            address: null,
          },
          {
            date: "30-March-22",
            time: "05:34PM",
            alert_type: "FireIncident",
            address: null,
          },
          {
            date: "30-March-22",
            time: "05:33PM",
            alert_type: "FireIncident",
            address: null,
          },
          {
            date: "30-March-22",
            time: "05:06PM",
            alert_type: "FireIncident",
            address: null,
          },
          {
            date: "30-March-22",
            time: "05:06PM",
            alert_type: "FireIncident",
            address: null,
          },
          {
            date: "30-March-22",
            time: "03:53PM",
            alert_type: "FireIncident",
            address: null,
          },
          {
            date: "30-March-22",
            time: "03:34PM",
            alert_type: "FireIncident",
            address: null,
          },
          {
            date: "30-March-22",
            time: "03:33PM",
            alert_type: "FireIncident",
            address: null,
          },
          {
            date: "30-March-22",
            time: "03:27PM",
            alert_type: "FireIncident",
            address: null,
          },
          {
            date: "29-March-22",
            time: "11:05AM",
            alert_type: "FireIncident",
            address: null,
          },
          {
            date: "29-March-22",
            time: "10:56AM",
            alert_type: "FireIncident",
            address: null,
          },
          {
            date: "29-March-22",
            time: "10:55AM",
            alert_type: "FireIncident",
            address: null,
          },
          {
            date: "29-March-22",
            time: "10:54AM",
            alert_type: "FireIncident",
            address: null,
          },
          {
            date: "28-March-22",
            time: "05:27PM",
            alert_type: "FireIncident",
            address: null,
          },
          {
            date: "28-March-22",
            time: "05:22PM",
            alert_type: "FireIncident",
            address: null,
          },
          {
            date: "28-March-22",
            time: "05:18PM",
            alert_type: "FireIncident",
            address: null,
          },
          {
            date: "28-March-22",
            time: "05:16PM",
            alert_type: "FireIncident",
            address: null,
          },
          {
            date: "28-March-22",
            time: "05:12PM",
            alert_type: "FireIncident",
            address: null,
          },
          {
            date: "08-March-22",
            time: "02:40PM",
            alert_type: "FireIncident",
            address: null,
          },
          {
            date: "08-March-22",
            time: "02:19PM",
            alert_type: "FireIncident",
            address: null,
          },
          {
            date: "14-February-22",
            time: "03:36PM",
            alert_type: "FireIncident",
            address: null,
          },
          {
            date: "10-February-22",
            time: "02:31PM",
            alert_type: "FireIncident",
            address: null,
          },
          {
            date: "10-February-22",
            time: "02:25PM",
            alert_type: "FireIncident",
            address: null,
          },
          {
            date: "04-February-22",
            time: "02:29PM",
            alert_type: "FireIncident",
            address: null,
          },
          {
            date: "04-February-22",
            time: "01:54PM",
            alert_type: "FireIncident",
            address: null,
          },
          {
            date: "04-February-22",
            time: "12:08PM",
            alert_type: "FireIncident",
            address: null,
          },
          {
            date: "04-February-22",
            time: "11:04AM",
            alert_type: "FireIncident",
            address: null,
          },
          {
            date: "04-February-22",
            time: "10:58AM",
            alert_type: "FireIncident",
            address: null,
          },
          {
            date: "04-February-22",
            time: "10:57AM",
            alert_type: "FireIncident",
            address: null,
          },
          {
            date: "04-February-22",
            time: "10:56AM",
            alert_type: "FireIncident",
            address: null,
          },
          {
            date: "04-February-22",
            time: "10:55AM",
            alert_type: "FireIncident",
            address: null,
          },
          {
            date: "04-February-22",
            time: "10:54AM",
            alert_type: "FireIncident",
            address: null,
          },
          {
            date: "04-February-22",
            time: "10:53AM",
            alert_type: "FireIncident",
            address: null,
          },
          {
            date: "04-February-22",
            time: "10:51AM",
            alert_type: "FireIncident",
            address: null,
          },
        ],
        ambulance_incidents: [
          {
            date: "12-September-22",
            time: "12:15PM",
            alert_type: "AmbulanceReport",
            address:
              "Bhavnagar, Bhavnagar Taluka, Bhavnagar District, Gujarat, 364001, India",
          },
          {
            date: "03-August-22",
            time: "09:56AM",
            alert_type: "AmbulanceReport",
            address: "Amroli, Adajan Taluka, Surat, Gujarat, 394105, India",
          },
          {
            date: "19-May-22",
            time: "12:18PM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "19-May-22",
            time: "12:12PM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "12-April-22",
            time: "11:57AM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "08-April-22",
            time: "04:50PM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "08-April-22",
            time: "09:59AM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "07-April-22",
            time: "04:54PM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "07-April-22",
            time: "11:44AM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "07-April-22",
            time: "11:44AM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "07-April-22",
            time: "11:43AM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "07-April-22",
            time: "11:41AM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "07-April-22",
            time: "11:21AM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "07-April-22",
            time: "11:19AM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "01-April-22",
            time: "03:03PM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "01-April-22",
            time: "11:08AM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "31-March-22",
            time: "11:41AM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "31-March-22",
            time: "11:41AM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "31-March-22",
            time: "11:38AM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "31-March-22",
            time: "11:37AM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "31-March-22",
            time: "11:36AM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "31-March-22",
            time: "11:35AM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "31-March-22",
            time: "11:34AM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "31-March-22",
            time: "11:34AM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "31-March-22",
            time: "11:32AM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "31-March-22",
            time: "11:32AM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "31-March-22",
            time: "11:31AM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "31-March-22",
            time: "11:14AM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "31-March-22",
            time: "11:10AM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "31-March-22",
            time: "11:10AM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "30-March-22",
            time: "05:44PM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "30-March-22",
            time: "05:28PM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "30-March-22",
            time: "05:27PM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "30-March-22",
            time: "05:27PM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "30-March-22",
            time: "05:25PM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "30-March-22",
            time: "05:25PM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "30-March-22",
            time: "05:24PM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "30-March-22",
            time: "05:23PM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "30-March-22",
            time: "05:21PM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "30-March-22",
            time: "05:20PM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "30-March-22",
            time: "05:19PM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "30-March-22",
            time: "05:11PM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "30-March-22",
            time: "03:35PM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "29-March-22",
            time: "02:16PM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "23-March-22",
            time: "11:32AM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "10-March-22",
            time: "02:04PM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "08-March-22",
            time: "06:27PM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "08-March-22",
            time: "02:19PM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "10-February-22",
            time: "02:21PM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "10-February-22",
            time: "02:16PM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "05-February-22",
            time: "10:31AM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "04-February-22",
            time: "07:18PM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "04-February-22",
            time: "05:02PM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "04-February-22",
            time: "10:50AM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "04-February-22",
            time: "10:46AM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "04-February-22",
            time: "10:46AM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "04-February-22",
            time: "10:45AM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "04-February-22",
            time: "10:44AM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "04-February-22",
            time: "10:43AM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "04-February-22",
            time: "10:43AM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "04-February-22",
            time: "10:43AM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "04-February-22",
            time: "10:40AM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "04-February-22",
            time: "10:37AM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "04-February-22",
            time: "10:33AM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "04-February-22",
            time: "10:30AM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "04-February-22",
            time: "10:29AM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "04-February-22",
            time: "10:28AM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "04-February-22",
            time: "10:27AM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "04-February-22",
            time: "10:23AM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "04-February-22",
            time: "10:21AM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "04-February-22",
            time: "10:13AM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "03-February-22",
            time: "02:35PM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "03-February-22",
            time: "02:15PM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "03-February-22",
            time: "01:00PM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "03-February-22",
            time: "11:26AM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "03-February-22",
            time: "10:08AM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "03-February-22",
            time: "10:08AM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "03-February-22",
            time: "10:07AM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "03-February-22",
            time: "10:00AM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "02-February-22",
            time: "06:15PM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "02-February-22",
            time: "02:32PM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "02-February-22",
            time: "02:29PM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "02-February-22",
            time: "02:27PM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "02-February-22",
            time: "02:26PM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "02-February-22",
            time: "02:26PM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "02-February-22",
            time: "02:24PM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "02-February-22",
            time: "02:20PM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "02-February-22",
            time: "02:18PM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "02-February-22",
            time: "02:15PM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "02-February-22",
            time: "02:14PM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "02-February-22",
            time: "02:14PM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "02-February-22",
            time: "02:12PM",
            alert_type: "AmbulanceReport",
            address: null,
          },
          {
            date: "02-February-22",
            time: "02:10PM",
            alert_type: "AmbulanceReport",
            address: null,
          },
        ],
      },
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }
  async componentDidMount() {
    this.setState({ Loader: true });
    let Token: any = await AsyncStorage.getItem("Token");

    this.setState({ Token: Token });
    this.GetAlertHistory();
    this.focusListener = this.props.navigation.addListener(
      "focus",
      async () => {
        this.GetAlertHistory();
      }
    );
  }
  receiveGetAlertHistory(responseJson: any){
    if (responseJson != null) {
      this.setState({ Channels: responseJson.all_alerts[0] });
      this.setState({ Loader: false });
    } else {
      this.setState({ Loader: false });
    }
  }
  async receive(from: String, message: Message) {

    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );


      if (apiRequestCallId === this.MessageId) {
        this.receiveGetAlertHistory(responseJson);
      }
    }
  }

  GetAlertHistory = () => {
    const header = {
      "Content-Type": configJSON.GetAlertHistoryApiContentType,
      token: this.state.Token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.MessageId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.urlGetAlertHistory
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.GetAlertHistoryApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };
}
// Customizable Area End
