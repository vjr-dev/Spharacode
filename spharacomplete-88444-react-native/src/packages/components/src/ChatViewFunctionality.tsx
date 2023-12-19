//@ts-ignore
//@ts-nocheck
// Customizable Area Start
import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from "react-native";
import { COLORS } from "../../framework/src/Globals";
import {
  Composer,
  InputToolbar,
  Bubble,
  Actions,
  Send,
} from "react-native-gifted-chat";
import FeatherIcon from "react-native-vector-icons/Feather";



type sendMessageCometChatType = (a: any) => void;
type handleSelectFileType = () => void;
type onPressCameraType = () => void;
export const renderInputToolbar = (props: any, sendMessageCometChat: sendMessageCometChatType, onSendMessage: any) => (
  <View
    style={{
      flexDirection: "row",
      bottom: 5,
      alignSelf: "center",
      justifyContent: "center",
      alignContent: "center",
      marginLeft: 5,
      flex: 1
    }}
  >
    <View style={{ width: "88%" }}>
      <InputToolbar
        testID="input-box"
        {...props}
        containerStyle={{
          backgroundColor: "#3E3E3E",
          alignContent: "center",
          justifyContent: "center",
          borderRadius: 32,
          padding: 2,
          borderTopColor: COLORS.TRANSPARENT,
        }}
        primaryStyle={{ alignItems: "center" }}
      />
    </View>
    <View style={{ width: "12%", justifyContent: "flex-end" }}>
      {!props.text ? (
        <TouchableOpacity
          testID="btn_mic"
          style={{
            height: 45,
            width: 45,
            borderWidth: 0.5,
            alignSelf: "center",
            borderColor: COLORS.darkGray,
            borderRadius: 21,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FeatherIcon name="mic" color={COLORS.lightwhite} size={26} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          testID="btn_send"
          onPress={() => {
            sendMessageCometChat(onSendMessage);
          }}
          style={{
            height: 42,
            width: 42,
            borderWidth: 0.5,
            alignSelf: "center",
            borderColor: COLORS.darkGray,
            borderRadius: 21,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FeatherIcon name="send" color={COLORS.lightwhite} size={26} />
        </TouchableOpacity>
      )}
    </View>
  </View>
);

export const renderComposer = (props: any, handleSelectFile: handleSelectFileType, onPressCamera: onPressCameraType,imageLoading: boolean) => (
  <View
    style={{
      flex: 1,
      flexDirection: "row",
      height: "100%",
      alignContent: "center",
      justifyContent: "center",
    }}
  >
    <View style={{ width: !props.text ? "70%" : "85%" }}>
      <Composer
        {...props}
        textInputStyle={{
          color: "white",
          fontSize: 16,
        }}
      />
    </View>
    <View style={{ width: "15%" }}>
      <Actions
        {...props}
        icon={() => (
          <FeatherIcon
            name="paperclip"
            color={COLORS.lightwhite}
            size={25}
          />
        )}
        containerStyle={{
          flex: 1,
          justifyContent: "center",
          alignSelf: "center",
          marginTop: 10,
        }}
        options={{
          "Choose From Library": () => {
            handleSelectFile();
          },
          Cancel: () => {
            console.log("Cancel");
          },
        }}
      />
    </View>
    {!props.text ? (
      <View style={{ width: "15%", justifyContent: "center" }}>
        <TouchableOpacity onPress={() => onPressCamera()}>
          <FeatherIcon name="camera" color={COLORS.lightwhite} size={28} />
        </TouchableOpacity>
      </View>
    ) : null}
  </View>
);

export const renderActions = (props: any) => (
  <Actions
    testID="chat_actions"
    {...props}
    containerStyle={{
      width: 44,
      height: 44,
      alignItems: "center",
      justifyContent: "center",
      marginLeft: 4,
      marginRight: 4,
      marginBottom: 0,
    }}
    icon={() => (
      <FeatherIcon name="smile" color={COLORS.lightwhite} size={32} />
    )}
    options={{
      "emoji will display here": () => {
        console.log("emoji will display here");
      },
      Cancel: () => {
        console.log("Cancel");
      },
    }}
    optionTintColor="#222B45"
  />
);
export const renderLoading = (props) => {
  console.log("renderLoadingssssss")
  return (
  
     <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator
          animating={true}
          size={"large"}
          color="#f07233"
        />
      </View>
  
  )
}

export const renderSend = (props) => {
  console.log('rensersend', props.renderLoading)
  return (
    <Send>
    {/* <FeatherIcon name="send" color={COLORS.lightwhite} size={32} /> */}
  </Send>
  )
}

export const rendermessageImage = (props, imageLoading) => {
  console.log('rendermessageImage', props)
  console.log("IMAGELOADING@@",imageLoading)
  const openFile = () => {
   

console.log(props,'openfile')

   
  }
  
  return (
    
    
    <TouchableOpacity onPress={(props) => openFile(props)}>
    <View style={{ width: 200, height: 200,  borderRadius: 20 }}>
    
        <Image style={{ width: 200, height: 200 }} 
        source={{ uri: props?.currentMessage?.image, cache: "only-if-cached" }} 
        
        defaultSource={require('./Rolling-2.1s-91px.gif')}
         />
      </View>
      </TouchableOpacity>
      
    
  

   )
  
}
// onLoadEnd={() => loading()}
//     onProgress={(loaded, total) => loading()}

export const renderPdf = (props: any) => (
  <>
  </>
);

export const renderCustomView = (props: any, currentUserMessage: boolean) => {
  //  const pdfregex = /.*\.pdf/ 

  return (
    <>
      <TouchableOpacity >
        <View style={{ width: 130, height: 130, backgroundColor: "#FFD89F", borderRadius: 20 }}>
          <FeatherIcon name="file" color="#000" size={40} style={{ justifyContent: "center", alignSelf: "center", marginTop: 40 }} />
          <Image style={{ width: 100, height: 200 }} source={{ uri: props?.currentMessage?.image }} 
         
          defaultSource={require('./Rolling-2.1s-91px.gif')} 
          />
        </View>

      </TouchableOpacity>

    </>

  );

};

export const renderBubble = (props: any,imageLoading: boolean) => {
  console.log("==/z======", props?.currentMessage,imageLoading,'imageLoading')
  if (props?.currentMessage?.image) {
    // add regex to check extension .pdf .doc
    const pdfregex = /^.*\.(doc|DOC|pdf|PDF)$/
    if (pdfregex.test(props?.currentMessage?.image)) {
      return renderCustomView(props);
    }
  }
  return (
    <Bubble
      {...props}
      textStyle={{
        right: {
          color: "black",
        },
        left: {
          color: "white",
        },
      }}
      wrapperStyle={{
        left: {
          backgroundColor: "#2E2E2E",
        },
        right: {
          backgroundColor: "#FFD89F",
        },
      }}
      timeTextStyle={{
        left: { color: "white" },
        right: { color: "black" },
      }}
    />
  );
};
  // Customizable Area Start