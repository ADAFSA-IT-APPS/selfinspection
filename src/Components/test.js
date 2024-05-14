initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null
}

loginReducer = (prevState, action) => {
    switch (action.type) {
        case 'RETRIEVE_TOKEN':
            return {
                ...prevState,
                userToken: action.token,
                isLoading: false,

            };
        case 'LOGIN':
            return {
                ...prevState,
                userName: action.id,
                userToken: action.token,
                isLoading: false,
            };
        case 'LOGOUT':
            return {
                ...prevState,
                userName: null,
                userToken: null,
                isLoading: false,
            };
    }
};

// const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

const authContext = useMemo(() => ({
    signIn: async (userName, password) => {
        // setUserToken('asdf');
        // setIsLoading(false);
        let userToken;
        userToken = null;
        if (userName == 'user' && password == 'pass') {

            try {
                userToken = 'asdf';
                await AsyncStorage.setItem('userToken', userToken)
            } catch (e) {
                // saving error
            }
        }
        dispatch({ type: 'LOGIN', id: userName, token: userToken });
    },
    signOut: async () => {
        // setUserToken(null);
        // setIsLoading(false);
        try {
            await AsyncStorage.removeItem('userToken')
        } catch (e) {
            // saving error
        }
        dispatch({ type: 'LOGOUT' });

    }
}), []);

useEffect(() => {
    console.log('state', loginState)
    /*         setTimeout(async () => {
            // setIsLoading(false)
            let userToken;
            userToken = null;
            try {
                userToken = await AsyncStorage.getItem('userToken')
            } catch (e) {
                // saving error
            }
            dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    
        }, 1000); */
    dispatch(retrieveToken())
}, []);



/* android:windowSoftInputMode="stateAlwaysHidden|adjustPan" */

//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Modal, Pressable } from 'react-native';
import { Data, DataRoutine } from './DummyData';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';
import ModalComp from './ModalComp';
import Collapsible from 'react-native-collapsible';


// create a component
const Accordian = ({ data }) => {
    const [activeSections, setActiveSections] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [calculatedHieght, setCalculatedHieght] = useState();

    useEffect(() => {
        console.log('data', data)
    }, [])

    const onLayout = (event) => {
        const { x, y, height, width } = event.nativeEvent.layout;
        console.log("~~~~~~ height = ", height);
        setCalculatedHieght(height + 20)
    }

    _renderSectionTitle = (section) => {
        return (
            <View style={styles.content}>
                {/* <Text>{section.content}</Text> */}
            </View>
        );
    };

    _renderHeader = (section, i, isActive, sections) => {
        return (
            <View
                duration={800}
                transition="backgroundColor"
                style={[styles.headerCont]}>
                <View style={styles.header} key={i}>
                    <Text style={styles.headerText}>{section.question}</Text>
                    {isActive ? <MaterialIcons name='keyboard-arrow-up' color='#fff' size={32} /> : <MaterialIcons name='keyboard-arrow-down' color='#fff' size={32} />}
                    {/* <MaterialIcons name='keyboard-arrow-down' color='#fff' size={32} /> */}
                </View>
            </View>
        );
    };

    _renderContent = (section, i, isActive, sections) => {
        return (
            <View
                duration={800}
                style={[styles.content, { margin: 20 }]} key={i}>
                <View
                    duration={800}
                    easing="ease-out"
                    style={{ borderColor: '#5c6672', borderWidth: 2, borderRadius: 5, }}
                >
                    {section.DataInner.map((item, index) => {
                        return (
                            <View onLayout={onLayout} key={index} style={{ flex: 1, flexDirection: 'column', padding: 8 }}>
                                <View style={(index === item.length - 1) ? styles.tableNoBorder : styles.table}>
                                    <Text style={styles.widthff}>
                                        {item.question}
                                    </Text>
                                    <Text style={{ alignSelf: 'center', width: '10%', textAlign: 'center' }}>:</Text>
                                    <Text style={styles.widthff}>
                                        {item.answer}
                                    </Text>
                                </View>
                                <View style={styles.table}>
                                    <Text style={styles.widthff}>Production Image</Text>
                                    <Text style={styles.tableColon}>:</Text>
                                    {item.image ? <Pressable onPress={() => setModalVisible(true)} style={{ width: '40%', marginTop: '2%' }}>
                                        <Image style={[styles.pic, { alignSelf: 'center', }]} source={item.image} />
                                        <ModalComp modalVisible={modalVisible} setModalVisible={setModalVisible} image={item.image} />
                                    </Pressable> : <Text></Text>}
                                </View>
                            </View>
                        )
                    })}
                </View>
            </View>
        );
    };

    _updateSections = (activeSections) => {
        setActiveSections(activeSections);
    };

    return (
        <View style={styles.container}>
                        <Accordion
                sections={Data}
                activeSections={activeSections}
                renderSectionTitle={_renderSectionTitle}
                renderHeader={_renderHeader}
                renderContent={_renderContent}
                onChange={_updateSections}
            />

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: '10%'
        /*  height:'60%' */
    },
    content: {

    },
    widthff: { width: '45%' },
    headerCont: {
        backgroundColor: '#5c6672',
        borderBottomColor: '#fff',
        borderWidth: 1,
        borderTopColor: '#738591'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: '4%',
        paddingVertical: '1%'
    },
    headerText: {
        color: '#fff',
        flexWrap: 'wrap',
        width: '90%'
    },
    table: { flex: 1, flexDirection: 'row', alignItems: 'center', paddingBottom: 5, borderBottomColor: '#5c6672', borderBottomWidth: 1 },
    /*    'table:last-child': {
           borderBottomWidth: 0
       }, */
    tableNoBorder: {
        borderBottomWidth: 0
    },
    pic: {
        width: '100%',
        resizeMode: 'contain',
    },
    tableColon: { alignSelf: 'center', width: '10%', textAlign: 'center' }
})

//make this component available to the app
export default Accordian;





/* -------------------------------------------------------hygiene */

//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import TaskNavbar from '../../Components/Navbar/TaskNavbar';
import { Colors } from '../../Util/CommonStyle';
import { PinchGestureHandler, PanGestureHandler } from 'react-native-gesture-handler';

// create a component
const HygieneManual = ({ route }) => {
    const { header, item } = route.params;
    const [items, setItems] = useState(item);
    const [currentIndex, setCurrentIndex] = useState(0);
    const scale = React.useRef(new Animated.Value(1)).current;
    const translateX = React.useRef(new Animated.Value(0)).current;

    useEffect(() => {
        console.log('item', items);
    }, []);

    const prevNext = () => {
        if (currentIndex < 0 | currentIndex < items.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else if (currentIndex === items.length - 1) {
            setCurrentIndex(prev => prev - 1);
        }
    }

    const handlePinch = Animated.event([{ nativeEvent: { scale } }], { useNativeDriver: true })

    const handlePan = Animated.event([
        {
            nativeEvent: {
                translationX: translateX,
            },
        }
    ],
        {
            listener: (e) => console.log('hello', e.nativeEvent),
            useNativeDriver:true
        },

    )
    return (
        <View style={styles.container}>
            <TaskNavbar taskno={header} />
            {/*   {item.map((item, index) => ( */}
            <PanGestureHandler onGestureEvent={handlePan}>
                <Animated.View style={{ flex: 1 }}>
                    <PinchGestureHandler onGestureEvent={handlePinch}>
                        <Animated.Image style={[styles.pic, { alignSelf: 'center',/*  resizeMode: 'center', */ transform: [{ scale },{translateX}] }]} source={item[currentIndex]} />
                    </PinchGestureHandler>

                    <TouchableOpacity onPress={() => prevNext()} style={{ backgroundColor: Colors.primary, width: '90%', position: 'absolute', bottom: '6%', alignItems: 'center', marginHorizontal: '5%', borderRadius: 5 }}>
                        <Text style={{ color: '#fff', paddingVertical: 15 }}>{currentIndex === items.length - 1 ? 'Previous' : 'Next'}  </Text>
                    </TouchableOpacity>
                </Animated.View>
            </PanGestureHandler>

            {/*  ))} */}
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    pic: {
        height: '100%',
    }
});

//make this component available to the app
export default HygieneManual;

//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Pressable, Image } from 'react-native';
import { Data, DataRoutine } from './DummyData';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ModalComp from './ModalComp';
import { FontFamily, Colors } from '../Util/CommonStyle';
import { useNavigation } from '@react-navigation/native';



// create a component
const Accordions = () => {
    const [currentIndex, setCurrentIndex] = React.useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();


    const renderItem = ({ item, index }) => {
        return (
            <View>
                <TouchableOpacity key={item.id} onPress={() => {
                    setCurrentIndex(index === currentIndex ? null : index);
                }}>
                    <View style={styles.headerCont}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>{item.question}</Text>
                            {index === currentIndex ? <MaterialIcons name='keyboard-arrow-up' color='#fff' size={32} /> : <MaterialIcons name='keyboard-arrow-down' color='#fff' size={32} />}
                        </View>
                    </View>   

                    {index === currentIndex && (
                        <View style={{}} >
                            <View style={{ padding: 10 }}>
                                {item.DataInner.map((item, i) => (
                                    <View style={{paddingBottom:10}}>
                                        <Text style={{ color:Colors.primary,paddingBottom:2 }}>{item.question}</Text>
                                        <TouchableOpacity onPress={()=>navigation.navigate('HygieneManual',{ header: item.question,item :item.DataInnerLayer})} style={{ backgroundColor: Colors.primary, width: '30%', alignItems: 'center', borderRadius: 10 }}>
                                            <Ionicons name='eye' color='#fff' size={32} />
                                        </TouchableOpacity>
                                    </View>
                                ))}
                                <ModalComp modalVisible={modalVisible} setModalVisible={setModalVisible} image={'item.image'} />
                            </View>
                        </View>
                    )}

                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={DataRoutine}
                renderItem={renderItem}
                keyExtractor={(item, index) => {
                    index.toString();
                }}
                style={{ flexGrow: 0, height: '90%' }}

            /* ListFooterComponent={renderLoader} */
            /*  onEndReached={loadMoreItem} */
            /* onEndReachedThreshold={0} */
            />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        marginHorizontal:20
    },
    widthff: { width: '45%' },
    headerCont: {
        backgroundColor: '#5c6672',
        borderBottomColor: '#fff',
        borderWidth: 1,
        borderTopColor: '#738591'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: '4%',
        paddingVertical: '1%'
    },
    headerText: {
        color: '#fff',
        flexWrap: 'wrap',
        width: '90%'
    },
    table: { flex: 1, flexDirection: 'row', alignItems: 'center', paddingBottom: 5, borderBottomColor: '#5c6672', borderBottomWidth: 1 },
    /*    'table:last-child': {
           borderBottomWidth: 0
       }, */
    tableNoBorder: {
        borderBottomWidth: 0
    },
    pic: {
        width: '100%',
        resizeMode: 'contain',
    },
    tableColon: { alignSelf: 'center', width: '10%', textAlign: 'center' }
});

//make this component available to the app
export default Accordions;



//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Pressable, Image } from 'react-native';
import { Data, DataRoutine } from './DummyData';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ModalComp from './ModalComp';


// create a component
const Accordions = () => {
  const [currentIndex, setCurrentIndex] = React.useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const renderItem = ({ item, index },...props) => {
    return (
      <View>
        <TouchableOpacity key={item.id} onPress={() => {
          setCurrentIndex(index === currentIndex ? null : index);
        }}>
          <View style={styles.headerCont}>
            <View style={styles.header}>
              <Text style={styles.headerText}>{item.question}</Text>
              {index === currentIndex ? <MaterialIcons name='keyboard-arrow-up' color='#fff' size={32} /> : <MaterialIcons name='keyboard-arrow-down' color='#fff' size={32} />}
            </View>
          </View>

          {index === currentIndex && (
            <View style={{ borderColor: '#5c6672', borderWidth: 2, borderRadius: 5, margin: 20 }} >
              <View style={{ padding: 15 }}>
                {item.DataInner.map((item, i) => (
                  <View>
                    <View style={(index === item.length - 1) ? styles.tableNoBorder : styles.table}>
                      <Text style={styles.widthff}>
                        {item.question}
                      </Text>
                      <Text style={{ alignSelf: 'center', width: '10%', textAlign: 'center' }}>:</Text>
                      <Text style={styles.widthff}>
                        {item.answer}
                      </Text>
                    </View>
                    <View style={styles.table}>
                      <Text style={styles.widthff}>Production Image</Text>
                      <Text style={styles.tableColon}>:</Text>
                      {item.image && <Pressable onPress={() => setModalVisible(true)} style={{ width: '40%', marginTop: '2%' }}>
                        <Image style={[styles.pic, { alignSelf: 'center', }]} source={item.image} />
                        <ModalComp modalVisible={modalVisible} setModalVisible={setModalVisible} image={item.image} />
                      </Pressable>}
                    </View> 
                  </View>
                ))}
                <ModalComp modalVisible={modalVisible} setModalVisible={setModalVisible} image={'item.image'} />
              </View>
            </View>
          )}

        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={Data}
        renderItem={renderItem}
        keyExtractor={(item, index) => {
          index.toString();
        }}
        style={{ flexGrow: 0, height: '90%' }}

      /* ListFooterComponent={renderLoader} */
      /*  onEndReached={loadMoreItem} */
      /* onEndReachedThreshold={0} */
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:30
  },
  widthff: { width: '45%' },
  headerCont: {
    backgroundColor: '#5c6672',
    borderBottomColor: '#fff',
    borderWidth: 1,
    borderTopColor: '#738591'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '4%',
    paddingVertical: '1%'
  },
  headerText: {
    color: '#fff',
    flexWrap: 'wrap',
    width: '90%'
  },
  table: { flex: 1, flexDirection: 'row', alignItems: 'center', paddingBottom: 5, borderBottomColor: '#5c6672', borderBottomWidth: 1 },
  /*    'table:last-child': {
         borderBottomWidth: 0
     }, */
  tableNoBorder: {
    borderBottomWidth: 0
  },
  pic: {
    width: '100%',
    resizeMode: 'contain',
  },
  tableColon: { alignSelf: 'center', width: '10%', textAlign: 'center' }
});

//make this component available to the app
export default Accordions;


//import liraries
import React, { useEffect, useState, useContext ,useRef} from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator,Platform ,I18nManager} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { AuthContext } from '../../Components/context';
import { signIn } from '../../Redux/actions/SI_Action';
import { useDispatch, useSelector } from 'react-redux';
import CustomeError from '../../Components/modals/CustomeError';
import { version } from '../../../package.json';


// create a component
const Login = ({ navigation }) => {
    const state=useSelector(state=>state);
    const dispatch = useDispatch()
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const alertRef = useRef();
    /* const { signIn } = useContext(AuthContext); */

    const loginHandle = (userEmail,password) => {
      //  dispatch(signIn(userEmail,password));
      dispatch(signIn(userEmail,password,toggleCheckBox, (result) => {
        console.log('sssssss',result);
        alertRef.current.show(result.error);
    }));
    }

    useEffect(()=>{
        console.log('check',toggleCheckBox)
    },[toggleCheckBox])
    return (
        <View style={styles.container}>
            <View style={{ width: '80%', marginTop: '3%' }} > 
                <Image style={styles.Logo} source={require('../../assets/img/ADAFSA_LOGO.png')} />
                <View style={styles.selfIns}>
                    {I18nManager.isRTL?<Image style={styles.selfInsImage} source={require('../../assets/img/icons/arabicSelfinspectionLogo.jpeg')} />:<Image style={styles.selfInsImage} source={require('../../assets/img/icons/selfInspectionImage.jpg')} />}
                    
                </View>
                <View style={styles.userCont}>
                    <FontAwesome5 name="user-alt" color="gray" size={20} />
                    <TextInput
                        placeholder="Email Address"
                        value={userEmail}
                        placeholderTextColor="#bebebe"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => setUserEmail(val)}
                    />
                </View>

                <View style={styles.userCont}>
                    <FontAwesome5 name="lock" color="gray" size={20} />
                    <TextInput
                        placeholder="Password"
                        value={userPassword}
                        placeholderTextColor="#bebebe"
                        style={styles.textInput}
                        autoCapitalize="none"
                        secureTextEntry={true}
                        onChangeText={(val) => setUserPassword(val)}
                    />
                </View>

                <View style={styles.rememberMe}>
                    <CheckBox
                        disabled={false}
                        checkboxSize={10}
                        boxType={'square'}
                        value={toggleCheckBox}
                        onCheckColor={'#00ff0f'}
                        onTintColor={'#00ff0f'}
                        onValueChange={(newValue) => setToggleCheckBox(newValue)}
                    />
                    <Text style={{ paddingLeft: 10, color: 'gray' }}>Remember me</Text>
                </View>

                <TouchableOpacity style={styles.loginCont} onPress={() => {loginHandle(userEmail,userPassword)}/* navigation.navigate("Tabs") */}>
                    <Text style={styles.loginText}>
                        Login
                    </Text>
                </TouchableOpacity>
                <View style={{alignItems:'center',paddingTop:10,justifyContent:'center'}}>
                    <Text style={{color:'#aeaeae',paddingBottom:2}}>Version : {version ? version : '4.4'}</Text>
                    <Text  style={{color:'#bebebe',textAlign:'center',fontSize:12,letterSpacing:0.5}}>Please use your ADAFSA eService {"\n"} credentials, business operators can be added {"\n"} from eService Account </Text>
                </View>
            </View>  
            <CustomeError ref={alertRef} />

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    Logo: {
        width: '100%',
        resizeMode: 'contain',
        height: Platform.OS === 'ios' ? '40%':'22%',
    },
    selfIns: { height:80},
    selfInsImage: { alignSelf: 'center', height: '90%', resizeMode: 'contain' },
    userCont: {
        flexDirection: 'row', marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#c9ced4',
        paddingVertical: 15,
        marginTop: '8%'
    },
    rememberMe: {
        flexDirection: 'row', marginTop: 10,
        alignItems: 'center',
        paddingVertical: 15,
        marginTop: '5%'
    },
    inputStyle: {
        color: 'black',
        paddingLeft: 15,
        paddingRight: 15,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 20,
        color: '#5d6773',
        fontSize: 18,
        letterSpacing: 0.7
    },
    loginCont: { alignSelf: 'center', justifyContent: 'center', backgroundColor: '#5d6a73', paddingHorizontal: '20%', paddingVertical: '5%', marginTop: '4%', borderRadius: 5, borderBottomColor: '#c9ced4', borderBottomWidth: 4 },
    loginText: { color: '#fff', fontWeight: '600', fontSize: 18 }
});

//make this component available to the app
export default Login;




1.In what order will the numbers 1-4 be logged to the console when the code below is executed? Why?

(function() {
    console.log(1); 
    setTimeout(function(){console.log(2)}, 1000); 
    setTimeout(function(){console.log(3)}, 0); 
    console.log(4);
})();


answer:
1
4
3
2

2.What will the code below output to the console and why?

var arr1 = "john".split('');
var arr2 = arr1.reverse();
var arr3 = "jones".split('');
arr2.push(arr3);
console.log("array 1: length=" + arr1.length + " last=" + arr1.slice(-1));
console.log("array 2: length=" + arr2.length + " last=" + arr2.slice(-1));

answer:
"array 1: length=5 last=j,o,n,e,s"
"array 2: length=5 last=j,o,n,e,s"


3.

console.log(1 +  "2" + "2");
console.log(1 +  +"2" + "2");
console.log(1 +  -"1" + "2");
console.log(+"1" +  "1" + "2");
console.log( "A" - "B" + "2");
console.log( "A" - "B" + 2);

answer:

"122"
"32"
"02"
"112"
"NaN2"
NaN


4.What will this code print?

for (let i = 0; i < 5; i++) {
    setTimeout(function() { console.log(i); }, i * 1000 );
  }

answer:It will print 0 1 2 3 4, because we use let instead of var here. The variable i is only seen in the for loop’s block scope.

5.Imagine you have this code:

var a = [1, 2, 3];
a) Will this result in a crash?

a[10] = 99;
b) What will this output?

console.log(a[6]);


answer:

a) It will not crash. The JavaScript engine will make array slots 3 through 9 be “empty slots.”

b) Here, a[6] will output undefined, but the slot still remains empty rather than filled with undefined. This may be an important nuance in some cases. For example, when using map(), empty slots will remain empty in map()’s output, but undefined slots will be remapped using the function passed to it:





/* ------------------------------Live--------------------------- */

//import liraries
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Dimensions, TouchableOpacity, Linking, Button, PermissionsAndroid, Platform } from 'react-native';
import Navbar from '../Components/Navbar/Navbar';
import ModalComp from '../Components/modals/ModalComp';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from "axios";
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NotificationListner, requestUserPermission } from '../assets/Helpers/helpers'
import { Link } from '@react-navigation/native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import io from 'socket.io-client';
import utils from '../assets/Helpers/helpers';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  ScreenCapturePickerView,
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals
} from 'react-native-webrtc';
// create a component
const configuration = { "iceServers": [{ "url": "stun:stun.l.google.com:19302" }] };
const dimensions = Dimensions.get('window');
const Live = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [socket, setSocket] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [sdp, setSDP] = useState();
  const pc = useRef();

  let InspectorName = 'Profile.InspectorName';
  let roomId = 12345;
  useEffect(() => {
    pc.current = new RTCPeerConnection(configuration);

    pc.current.onicecandidate = (event) => {
      if (event.candidate) {
        //candidateCollection.add(event.candidate);
        console.log('event',event.candidate );
      }
    };

    pc.current.onaddstream = (event) => {
      setRemoteStream(event.stream)
    };
    // getFCMToken();
    // requestUserPermission();
    // NotificationListner();
  }, [])

  const [filePath, setFilePath] = useState('');

  const isPermitted = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs access to Storage data',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        alert('Write permission err', err);
        return false;
      }
    } else {
      return true;
    }
  };

  const createPDF = async () => {
    if (await isPermitted()) {
      let options = {
        //Content to print
        html:
          '<h1 style="text-align: center;"><strong>Hello Guys</strong></h1><p style="text-align: center;">Here is an example of pdf Print in React Native</p><p style="text-align: center;"><strong>Team About React</strong></p>',
        //File Name
        fileName: 'test',
        //File directory
        directory: 'docs',
      };
      let file = await RNHTMLtoPDF.convert(options);
      console.log(file);
      setFilePath(file.filePath);
    }
  };

  const sendNotificationForVideo = () => {
    console.log('version',);
    let postData = {
      registration_ids: ["cX4grDpLLgU:APA91bELeZEN6xF_oxYm-y5uJ4ymna5RfwDL7KsrIbn3Ft1RMlTQ13sLsOKY-vVduqjqz1qdqVCtLY4pMSMk193i4nCHaK0jfYRYmh6tYVTZQKKkO60Il4wUzwrO9IDaq5qWCbETqeDD"],
      badge: 0,
      priority: "high",
      notification: {
        badge: 0,
        body: "Tap to interact",
        title: "Incoming Call",
        color: "#00ACD4",
        caller: "",
        roomId: "12345",
        icon: "luncher_icon",
        sound: "default",
        fcmMessageType: "notifType",
        notificationId: "id",
        show_in_foreground: true,
        vibrate: 500,
        location: "VideoScreen",
        channelId: "test-channel",
        content_available: 1
      },
      data: {
        badge: 1,
        body: "Tap to interact",
        title: "Incoming Call",
        color: "#00ACD4",
        caller: "Profile.InspectorName",
        roomId: "12345",
        priority: "high",
        icon: "luncher_icon",
        sound: "default",
        notificationId: "id",
        show_in_foreground: true,
        location: "VideoScreen",
        channelId: "test-channel"
      },
      "content_available": true
    }
    axios({
      method: 'POST',
      url: 'https://fcm.googleapis.com/fcm/send',
      data: JSON.stringify(postData),
      headers: {
        "Authorization": "key=AAAAPO5zxXQ:APA91bGUI1r4VAdw2SzORkWs03wpA_LnpRhcqr5hx0XlPGZ2wFJoLEOBUnnKYOj0UrnIh-YR-T68UPNhxRH88ihbHTjrjPnHeSC05BeD6Hod654wbcKKYvNw8uPmoGjbkFEgrrI3S4Hp",
        "Content-Type": "application/json"
      },
    }).then((response) => {
      console.log('check');
      console.log('response for version', response.data);
    });
  }
  const navigateRemote = () => {
    let url = "https://adremoteinspection.com/?uname=" + InspectorName + "&roomId=" + roomId;
    console.log('url>>>', url);
  }
  const addRemoteUpdate = () => {
    console.log('version',);
    let postData = {
      CALLER_IP: "92.99.167.0",
      ID: "12345",
      DATE: "09 Jun 2022",
      START_TIME: "11:20:21",
      LICENSE_NO: "CN-1700160",
      EST_NAME: "Test Farm",
      TASK_ID: "1-1050724999",
      CALLER_NAME: "abcd"
    }
    axios({
      method: 'POST',
      url: 'https://adremoteinspection.com/api/update',
      data: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Accept": "application/json"
      },
    }).then((response) => {
      console.log('check');
      console.log('response for addremoteupdate', response.data);
    });
  }
  const setupWebrtc = async () => {
    pc.current = new RTCPeerConnection(configuration);
    //Get the video and audio stream for the call
    const stream = await utils.getStream();
    console.log('stream', JSON.stringify(stream));
    if (stream) {
      setLocalStream(stream);
      pc.current.addStream(stream);
    }

    pc.current.onaddstream = (event) => {
      setRemoteStream(event.stream)
    };
  }


  const Video = (props) => {
    //on call we will just display the local stream
    if (props.localStream  && !props.remoteStream ) {
      return (
        <View style={styles.container}>
          <RTCView
            streamURL={props.localStream.toURL()}
            objectFit={'cover'}
            style={styles.video}
          />
          <View style={styles.bContainer}>
            <TouchableOpacity onPress={hangup} style={[{ backgroundColor: 'gray' }, styles.button]}>
              <Icon name='phone' color="red" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    if (props.localStream && props.remoteStream) {
      return (
        <View style={styles.Container}>
          <RTCView
            streamURL={props.remoteStream.toURL()}
            objectFit={'cover'}
            style={styles.video}
          />
          <RTCView
            streamURL={props.localStream.toURL()}
            objectFit={'cover'}
            style={styles.videoLocal}
          />
          <View style={styles.bContainer}>
            <TouchableOpacity onPress={hangup} style={[{ backgroundColor: 'gray' }, styles.button]}>
              <Icon name='phone' color="red" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
  const create = async () => {
    await setupWebrtc();

  }
  const hangup = async () => {
    setLocalStream(null);
  }
  if (localStream) {
    return <Video /* hangup={hangup}  */ localStream={localStream} /* remoteStream={remoteStream} */ />
  }


  const createOffer = () => {
    console.log('Offer')

    // https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/createOffer
    // initiates the creation of SDP
    pc.current.createOffer({ offerToReceiveVideo: 1 })
      .then(sdp => {
        console.log(JSON.stringify(sdp))

        // set offer sdp as local description
        pc.current.setLocalDescription(sdp)
    })
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/createAnswer
  // creates an SDP answer to an offer received from remote peer
  const createAnswer = () => {
    console.log('Answer')
    pc.current.createAnswer({ offerToReceiveVideo: 1 })
      .then(sdp => {
        console.log(JSON.stringify(sdp))

        // set answer sdp as local description
        pc.current.setLocalDescription(sdp)
    })
  }

  const setRemoteDescription = () => {
    // retrieve and parse the SDP copied from the remote peer
    const desc = JSON.parse(this.textref.value)

    // set sdp as remote description
    pc.current.setRemoteDescription(new RTCSessionDescription(desc))
  }

  const addCandidate = () => {
    // retrieve and parse the Candidate copied from the remote peer
    const candidate = JSON.parse(this.textref.value)
    console.log('Adding candidate:', candidate)

    // add the candidate to the peer connection
    pc.current.addIceCandidate(new RTCIceCandidate(candidate))
  }
  return (
    <View style={styles.container}>
      <Navbar nav={'tab'} />
      <TouchableOpacity onPress={navigateRemote} style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Text>Onpress</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <TouchableOpacity onPress={create} style={[{ backgroundColor: 'gray' }, styles.button]}>
          <Icon name='video' color="white" size={20} />
        </TouchableOpacity>
      </View>
       <Button>
                {Linking.openURL("https://adremoteinspection.com/?uname=" + InspectorName + "&roomId=" + roomId)}
      Go to Jane's profile
    </Button>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bContainer: {
    flexDirection: 'row',
    bottom: 30,
    marginTop: 'auto'
  },
  video: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  button: {
    width: 60,
    height: 60,
    padding: 10,
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  videoLocal: {
    position: 'absolute',
    width: 100,
    height: 150,
    top: 0,
    left: 20,
    elevation: 20
  }
});

//make this component available to the app
export default Live;


















<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>CFBundleDevelopmentRegion</key>
	<string>en</string>
	<key>CFBundleDisplayName</key>
	<string>SelfInspection</string>
	<key>CFBundleExecutable</key>
	<string>$(EXECUTABLE_NAME)</string>
	<key>CFBundleIdentifier</key>
	<string>$(PRODUCT_BUNDLE_IDENTIFIER)</string>
	<key>CFBundleInfoDictionaryVersion</key>
	<string>6.0</string>
	<key>CFBundleName</key>
	<string>$(PRODUCT_NAME)</string>
	<key>CFBundlePackageType</key>
	<string>APPL</string>
	<key>CFBundleShortVersionString</key>
	<string>1.0</string>
	<key>CFBundleSignature</key>
	<string>????</string>
	<key>CFBundleVersion</key>
	<string>1</string>
	<key>LSRequiresIPhoneOS</key>
	<true/>
	<key>NSAppTransportSecurity</key>
	<dict>
		<key>NSAllowsArbitraryLoads</key>
		<true/>
		<key>NSExceptionDomains</key>
		<dict>
			<key>http://dev-mobilebus.adafsa.gov.ae</key>
			<dict>
			 <key>NSIncludesSubdomains</key>
            <true/>
			 <key>NSTemporaryExceptionAllowsInsecureHTTPLoads</key>
            <true/>
				<key>NSExceptionAllowsInsecureHTTPLoads</key>
				<true/>
			</dict>
		</dict>
r	</dict>
	<key>NSCameraUsageDescription</key>
	<string>Camera permission description</string>
	<key>NSLocationWhenInUseUsageDescription</key>
	<string></string>
	<key>NSMicrophoneUsageDescription</key>
	<string>Microphone permission description</string>
	<key>NSPhotoLibraryUsageDescription</key>
	<string></string>
	<key>UIAppFonts</key>
	<array>
		<string>Zocial.ttf</string>
		<string>SimpleLineIcons.ttf</string>
		<string>Octicons.ttf</string>
		<string>MaterialIcons.ttf</string>
		<string>MaterialCommunityIcons.ttf</string>
		<string>Ionicons.ttf</string>
		<string>Foundation.ttf</string>
		<string>Fontisto.ttf</string>
		<string>FontAwesome5_Solid.ttf</string>
		<string>FontAwesome5_Regular.ttf</string>
		<string>FontAwesome5_Brands.ttf</string>
		<string>FontAwesome.ttf</string>
		<string>Feather.ttf</string>
		<string>EvilIcons.ttf</string>
		<string>Entypo.ttf</string>
		<string>AntDesign.ttf</string>
		<string>OpenSans-Bold.ttf</string>
		<string>OpenSans-BoldItalic.ttf</string>
		<string>OpenSans-ExtraBold.ttf</string>
		<string>OpenSans-ExtraBoldItalic.ttf</string>
		<string>OpenSans-Italic.ttf</string>
		<string>OpenSans-Light.ttf</string>
		<string>OpenSans-LightItalic.ttf</string>
		<string>OpenSans-Medium.ttf</string>
		<string>OpenSans-MediumItalic.ttf</string>
		<string>OpenSans-Regular.ttf</string>
		<string>OpenSans-SemiBold.ttf</string>
		<string>OpenSans-SemiBoldItalic.ttf</string>
	</array>
	<key>UILaunchStoryboardName</key>
	<string>LaunchScreen</string>
	<key>UIRequiredDeviceCapabilities</key>
	<array>
		<string>armv7</string>
	</array>
	<key>UISupportedInterfaceOrientations</key>
	<array>
		<string>UIInterfaceOrientationPortrait</string>
		<string>UIInterfaceOrientationLandscapeLeft</string>
		<string>UIInterfaceOrientationLandscapeRight</string>
	</array>
	<key>UIViewControllerBasedStatusBarAppearance</key>
	<false/>
</dict>
</plist>



/* live functional component */


/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useEffect, useState } from 'react';
 import {
   SafeAreaView,
   StyleSheet,
   ScrollView,
   View,
   Text,
   StatusBar,
   Linking, Button,
   TouchableOpacity,
   Dimensions,
 } from 'react-native';
 import Navbar from '../Components/Navbar/Navbar';
 import {
   RTCPeerConnection,
   RTCIceCandidate,
   RTCSessionDescription,
   RTCView,
   MediaStream,
   MediaStreamTrack,
   mediaDevices,
   registerGlobals
 } from 'react-native-webrtc';
 import Icon from 'react-native-vector-icons/FontAwesome5';
 window.navigator.userAgent = 'react-native';
 import io from 'socket.io-client'
 
 const dimensions = Dimensions.get('window')
 
 const Live = () => {
   const [localStream, setLocalStream] = useState('');
   const [remoteStream, setRemoteStream] = useState('');
   const [mic, setMic] = useState('');
   let sdp;
   let socket = null
   let candidates = [] 
   const pc_config = {
       "iceServers": [
         // {
         //   urls: 'stun:[STUN_IP]:[PORT]',
         //   'credentials': '[YOR CREDENTIALS]',
         //   'username': '[USERNAME]'
         // },
         {
           urls: 'stun:stun.l.google.com:19302'
         }
       ]
     }
 const pc = new RTCPeerConnection(pc_config)
   useEffect(() => {
 
     socket = io.connect(
       'https://1daa-2a00-f28-ff40-578a-2dd7-4da3-655b-3f9c.in.ngrok.io',
       //  'https://adremoteinspection.com:443',
 
       // {
       //   path: '/io/webrtc',
       //   query: {}
       // }
     )
 
 
     socket.on('offerOrAnswer', (sdp) => {
 
       sdp = JSON.stringify(sdp)
       console.log('sdp', sdp);
       // set sdp as remote description
       pc.setRemoteDescription(new RTCSessionDescription(sdp))
     })
 
     socket.on('candidate', (candidate) => {
       // console.log('From Peer... ', JSON.stringify(candidate))
       // candidates = [...candidates, candidate]
       pc.addIceCandidate(new RTCIceCandidate(candidate))
     })
 
    
 
     
 
     pc.onicecandidate = (e) => {
       // send the candidates to the remote peer
       // see addCandidate below to be triggered on the remote peer
       if (e.candidate) {
         // console.log(JSON.stringify(e.candidate))
         sendToPeer('candidate', e.candidate)
       }
     }
 
     // triggered when there is a change in connection state
     pc.oniceconnectionstatechange = (e) => {
       console.log(e)
     }
 
     pc.onaddstream = (e) => {
       debugger
       // remoteVideoref.current.srcObject = e.streams[0]
      setRemoteStream( e.stream)
     }
 
     const success = (stream) => {
       console.log('tourl',stream.toURL())
      setLocalStream(stream)
       pc.addStream(stream)
     }
 
     const failure = (e) => {
       console.log('getUserMedia Error: ', e)
     }
 
     let isFront = true;
     mediaDevices.enumerateDevices().then(sourceInfos => {
       console.log(sourceInfos);
       let videoSourceId;
       for (let i = 0; i < sourceInfos.length; i++) {
         const sourceInfo = sourceInfos[i];
         if (sourceInfo.kind == "videoinput" && sourceInfo.facing == (isFront ? "front" : "environment")) {
           videoSourceId = sourceInfo.deviceId;
         }
       }
 
       const constraints = {
         audio: true,
         video: {
           mandatory: {
             minWidth: 500, // Provide your own width, height and frame rate here
             minHeight: 300,
             minFrameRate: 30
           },
           facingMode: (isFront ? "user" : "environment"),
           optional: (videoSourceId ? [{ sourceId: videoSourceId }] : [])
         }
       }
 
       mediaDevices.getUserMedia(constraints)
         .then(success)
         .catch(failure);
     });
   }, [])
   const sendToPeer = (messageType, payload) => {
     socket.emit(messageType, {
       socketID: socket.id,
       payload
     })
   }
 
  const createOffer = () => {
     console.log('Offer')
 
     // https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/createOffer
     // initiates the creation of SDP
     pc.createOffer({ offerToReceiveVideo: 1 })
       .then(sdp => {
         // console.log(JSON.stringify(sdp))
 
         // set offer sdp as local description
         pc.setLocalDescription(sdp)
 
         sendToPeer('offerOrAnswer', sdp)
       })
   }
 
  const createAnswer = () => {
     console.log('Answer')
     pc.createAnswer({ offerToReceiveVideo: 1 })
       .then(sdp => {
         // console.log(JSON.stringify(sdp))
 
         // set answer sdp as local description
         pc.setLocalDescription(sdp)
 
         sendToPeer('offerOrAnswer', sdp)
       })
   }
 
   const setRemoteDescription = () => {
     // retrieve and parse the SDP copied from the remote peer
     const desc = JSON.parse(sdp)
 
     // set sdp as remote description
     pc.setRemoteDescription(new RTCSessionDescription(desc))
   }
 
  const addCandidate = () => {
     // retrieve and parse the Candidate copied from the remote peer
     // const candidate = JSON.parse(textref.value)
     // console.log('Adding candidate:', candidate)
 
     // add the candidate to the peer connection
     // pc.addIceCandidate(new RTCIceCandidate(candidate))
 
     candidates.forEach(candidate => {
       console.log(JSON.stringify(candidate))
       pc.addIceCandidate(new RTCIceCandidate(candidate))
     });
   }
 
 
 
 
   return (
 
     <View style={{ flex: 1, }}>
 
       <Navbar nav={'tab'} />
 
       <View style={{ height: dimensions.height / 2 }}>
 
         <ScrollView style={{ ...styles.scrollView }}>
           <View style={{
             flex: 1,
             width: '100%',
             backgroundColor: 'black',
             justifyContent: 'center',
             alignItems: 'center',
           }}>
             {remoteStream ?
               (
                 <RTCView
                   key={2}
                   mirror={true}
                   style={{ ...styles.rtcViewRemote }}
                   objectFit='contain'
                   streamURL={remoteStream && remoteStream.toURL()}
                 />
               ) :
               (
                 <View style={{ padding: 15, }}>
                   <Text style={{ fontSize: 22, textAlign: 'center', color: 'white' }}>Waiting for Peer connection ...</Text>
                 </View>
               )}
           </View>
         </ScrollView>
       </View>
       <View style={{ ...styles.buttonsContainer }}>
         {/* <View style={{ flex: 1, }}>
             <TouchableOpacity onPress={createOffer}>
               <View style={styles.button}>
                 <Text style={{ ...styles.textContent, }}>Call</Text>
               </View>
             </TouchableOpacity>
           </View>
           <View style={{ flex: 1, }}>
             <TouchableOpacity onPress={this.createAnswer}>
               <View style={styles.button}>
                 <Text style={{ ...styles.textContent, }}>Answer</Text>
               </View>
             </TouchableOpacity>
           </View> */}
         <TouchableOpacity onPress={this.createOffer} style={{ padding: 10, borderRadius: 50 }}>
           {mic ? <Icon name='microphone' color="gray" size={30} /> : <Icon name='microphone-slash' color="gray" size={30} />}
         </TouchableOpacity>
         <TouchableOpacity onPress={this.createAnswer} style={{ backgroundColor: 'red', padding: 10, borderRadius: 50 }}>
           <Icon name='phone' color="white" size={20} />
         </TouchableOpacity>
         <TouchableOpacity onPress={() => localStream._tracks[1]._switchCamera()} style={{ padding: 10, borderRadius: 50 }}>
           <Icon name='camera-retro' color="gray" size={30} />
         </TouchableOpacity>
       </View>
 
       <View style={{
         position: 'absolute',
         zIndex: 1,
         bottom: 10,
         left: 10,
 
         backgroundColor: 'black',
       }}>
         <View style={{ flex: 1, width: 120, height: 120, }}>
           <TouchableOpacity onPress={() => localStream._tracks[1]._switchCamera()}>
             <View>
               <RTCView
                 key={1}
                 zOrder={0}
                 objectFit='cover'
                 style={{ ...styles.rtcView }}
                 streamURL={localStream && localStream.toURL()}
               />
             </View>
           </TouchableOpacity>
         </View>
       </View>
     </View>
   );
 
 };
 
 const styles = StyleSheet.create({
   buttonsContainer: {
     width: '100%',
     flexDirection: 'row',
     paddingVertical: 10,
     alignItems: 'center',
     justifyContent: 'space-around'
   },
   button: {
     margin: 5,
     paddingVertical: 10,
     backgroundColor: 'lightgrey',
     borderRadius: 5,
   },
   textContent: {
     fontFamily: 'Avenir',
     fontSize: 20,
     textAlign: 'center',
   },
   videosContainer: {
     flex: 1,
     flexDirection: 'row',
     justifyContent: 'center',
     height: dimensions.height / 2
   },
   rtcView: {
     width: '100%', //dimensions.width,
     height: '100%',//dimensions.height / 2,
     backgroundColor: 'black',
   },
   scrollView: {
     flex: 1,
     // flexDirection: 'row',
     backgroundColor: 'teal',
     padding: 15,
   },
   rtcViewRemote: {
     width: dimensions.width - 30,
     height: 200,//dimensions.height / 2,
     backgroundColor: 'black',
   }
 });
 
 export default Live;
 

 


 

