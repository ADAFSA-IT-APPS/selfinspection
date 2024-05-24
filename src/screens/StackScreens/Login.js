//import liraries
import React, { useEffect, useState, useContext, useRef } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Dimensions, TouchableOpacity, ActivityIndicator, Platform, I18nManager } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { AuthContext } from '../../Components/context';
import { signIn, GetServerDateTime, GetLOVDetails } from '../../Redux/actions/SI_Action';
import { useDispatch, useSelector } from 'react-redux';
import CustomeError from '../../Components/modals/CustomeError';
import { version } from '../../../package.json';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Loading from '../../Components/Loading';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

// create a component
const Login = ({ navigation }) => {
    const state = useSelector(state => state);
    const dispatch = useDispatch()
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [hidePassword, setHidePassword] = useState(true);

    //const [isLoading, setIsLoading] = useState(true)
    const { t, i18n } = useTranslation();

    const alertRef = useRef();
    /* const { signIn } = useContext(AuthContext); */

    const loginHandle = (userEmail, password) => {
        //  dispatch(signIn(userEmail,password));
        dispatch(signIn(userEmail, password, toggleCheckBox, (result) => {
            console.log('sssssss', result);
            alertRef.current.show(result.error);
        }));
    }

    useEffect(() => {
        DeviceInfo.getDevice().then((device) => {
            // "walleye"
            console.log('device', device);
        });
        console.log('DeviceInfo.getVersion()', DeviceInfo.getVersion());
        console.log('DeviceInfo.getReadableVersion()', DeviceInfo.getReadableVersion());
    }, [])

    useEffect(() => {
        console.log('toggleCheckBox', toggleCheckBox);
        if (toggleCheckBox) {
            rememberUser()
        } else {
            forgetUser()
        }
    }, [toggleCheckBox])

    const eyeShowHide = () => {
        setHidePassword(prevCheck => !prevCheck);
    }
    const rememberUser = async () => {
        console.log('remember',);
        userToken = 'asdf';
        await AsyncStorage.setItem('userToken', userToken);
    }
    const forgetUser = async () => {
        console.log('forget',);
        await AsyncStorage.removeItem('userToken');
    }
    return (
        <View style={styles.container}>
            {state.isLoading && <Loading />}
            <View style={{ flex: 1, width: '80%', marginTop: height * 0.13, alignItems: 'center', justifyContent: 'center' }} >
                <Image style={styles.Logo} source={require('../../assets/img/ADAFSA_LOGO.png')} />
                <View style={styles.selfIns}>
                    {I18nManager.isRTL ? <Image style={styles.selfInsImage} source={require('../../assets/img/icons/arabicSelfinspectionLogo.jpeg')} /> : <Image style={styles.selfInsImage} source={require('../../assets/img/icons/selfInspectionImage.jpg')} />}
                </View>
                <View style={[styles.userCont, { marginTop: '0%' }]}>
                    <FontAwesome5 name="user-alt" color="gray" size={20} />
                    <TextInput
                        placeholder={t("EmailAddress")}
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
                        placeholder={t("Password")}
                        value={userPassword}
                        placeholderTextColor="#bebebe"
                        style={[styles.textInput, { textAlign: I18nManager.isRTL ? 'right' : 'left' }]}
                        autoCapitalize="none"
                        secureTextEntry={hidePassword}
                        onChangeText={(val) => setUserPassword(val)}
                    />
                    <TouchableOpacity
                        onPress={eyeShowHide}
                        style={{
                             width: '15%'
                        }}>
                        <Image resizeMode="contain" source={hidePassword
                            ? require("../../assets/img/eyeHidden.png")
                            : require("../../assets/img/eye.png")}
                            style={{ width: '35%',height: '100%', }} />
                    </TouchableOpacity>
                </View>

                <View style={styles.rememberMe}>
                    <CheckBox
                        disabled={false}
                        boxType={'square'}
                        value={toggleCheckBox}
                        onCheckColor={'#00ff0f'}
                        onTintColor={'#00ff0f'}
                        onValueChange={(newValue) => setToggleCheckBox(newValue)}
                    />
                    <Text style={{ paddingLeft: 10, color: 'gray' }}>{t('Rememberme')}</Text>
                </View>


                <TouchableOpacity style={styles.loginCont} onPress={() => { loginHandle(userEmail, userPassword) }/* navigation.navigate("Tabs") */}>
                    <Text style={styles.loginText}>
                        {t('Login')}
                    </Text>
                </TouchableOpacity>
                <View style={{ alignItems: 'center', paddingTop: height * 0.01, justifyContent: 'center' }}>
                    <Text style={{ color: '#aeaeae', paddingBottom: 2 }}>{t('Version')} : {DeviceInfo.getVersion() ? DeviceInfo.getVersion() : '16'}</Text>
                    <Text style={{ color: '#bebebe', textAlign: 'center', fontSize: height * 0.015, letterSpacing: 0.5 }}>{t('ADAFSAeService')} </Text>
                </View>
                {/*   </View> */}
                <CustomeError ref={alertRef} />

            </View>

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    Logo: {
        width: width * 0.8,
        resizeMode: 'contain',
        height: Platform.OS === 'ios' ? height * 0.15 : height * 0.15,
    },
    selfIns: { /* height:90 */ /* paddingTop:20 */ },
    selfInsImage: { alignSelf: 'center', height: height * 0.12, resizeMode: 'contain', },
    userCont: {
        flexDirection: 'row',/*  marginTop: 10, */
        borderBottomWidth: 1,
        justifyContent: 'space-between',
        borderBottomColor: '#c9ced4',
        paddingVertical: height * 0.02,
        marginTop: Platform.OS === 'ios' ? height * 0.03 : height * 0.015,
        width: '100%',
        height:'10%'
    },
    rememberMe: {
        flexDirection: 'row', marginTop: 10,
        alignItems: 'center',
        paddingVertical: 15,
        alignSelf: 'flex-start',
        marginTop: height * 0.02
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
        fontSize: height * 0.02,
        letterSpacing: 0.7,
        textAlign: I18nManager.isRTL ? 'right' : 'left'
    },
    passCont: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        color: '#5d6773',
        fontSize: height * 0.02,
        letterSpacing: 0.7,
        textAlign: I18nManager.isRTL ? 'right' : 'left'
    },
    loginCont: { alignSelf: 'center', justifyContent: 'center', backgroundColor: '#5d6a73', paddingHorizontal: wp('13%'), paddingVertical: hp('2%'), marginTop: '4%', borderRadius: 5, borderBottomColor: '#c9ced4', borderBottomWidth: 4 },
    loginText: { color: '#fff', fontWeight: '600', fontSize: height * 0.021 }
});

//make this component available to the app
export default Login;
