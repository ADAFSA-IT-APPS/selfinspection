import React, { useEffect, useState, useRef } from "react";
import { View, Text } from "react-native";
//import Toast,{ BaseToast, ErrorToast }  from 'react-native-toast-message';
import Toast from 'react-native-root-toast';
import { Button } from 'react-native'

// const toastConfig = {
//   success: (props) => (
//     <BaseToast
//       {...props}
//       style={{ borderLeftColor: '#5c6672',backgroundColor:'white'}}
//       contentContainerStyle={{ /* paddingHorizontal: 15  */}}
//       text1Style={{
//         fontSize: 15,
//         fontWeight: '400',
//         color:'#5c6672'
//       }}
//     />
//   ),
// };
// show toast after 2s

// hide toast after 5scons
const ToastComp = ({msg}) => {

  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setVisible(true)
    }, 500);
    setTimeout(() => {
      setVisible(false)
    }, 5000);
  }, [])
  return (
    // <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
    <Toast
      visible={visible}
      position={50}
      shadow={false}
      animation={false}
      hideOnPress={true}
    >{msg}</Toast>
  )
}

export default ToastComp;
