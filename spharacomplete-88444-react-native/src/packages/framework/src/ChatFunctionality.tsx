import { CometChat } from "@cometchat-pro/react-native-chat";

const authKey: string = "1167abda39101b557157684bb257435325c49e78";
const appID: string = "213618d192facbaf";
const appSetting: any = new CometChat.AppSettingsBuilder()
  .subscribePresenceForAllUsers()
  .setRegion("us")
  .autoEstablishSocketConnection(true)
  .build();
  
export const cometChatInitialization = () => {
  return new Promise((resolve, reject) => {
    CometChat.init(appID, appSetting).then(
      () => {
        resolve({
          isSuccess: true,
          message: "CometChat initialized",
        });
      },
      (error: any) => {
          reject({
            isSuccess: false,
            message: "CometChat Initialization failed",
            error: error,
          });
        }
      )
  })
}
export const loginOnChat = (ID: string) => {
  return new Promise((resolve, reject) => {
    CometChat.getLoggedinUser().then(
      (user:any) => {
        if (!user) {
          CometChat.login(ID, authKey).then(
            async (user:any) => {
              resolve({
                isSuccess: true,
                message: "Login Successful",
                data: user,
              });
            },
            (error:any) => {
              reject({
                isSuccess: false,
                message: "Login failed",
                error: error,
              });
            }
          );
        } else {
          resolve({
            isSuccess: true,
            message: "User already logged In",
          });
        }
      },
      (error:any) => {
        reject({
          isSuccess: false,
          message: "Something went wrong",
          error: error,
        });
      }
    );
  });
};
