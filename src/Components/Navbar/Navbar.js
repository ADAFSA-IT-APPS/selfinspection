//import liraries
import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, I18nManager, Alert, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { LeftLogo, RightLogo } from '../../Util/CommonStyle';
import { GetAsync, SetAsync, removeAsync } from "../../assets/Helpers/helpers";
import ModalComp from '../modals/ModalComp';
import NavigationService from "../../navigation/NavigationService";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signOut, GetCheckList, Recall, Search_Establishment_History,Search_Establishment_History_NOC, GetDeviceDetailsByLicenseNo, GetInspectionDetails, Get_Assessment } from '../../Redux/actions/SI_Action';
import CustomeError from '../../Components/modals/CustomeError';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
// create a component
const Navbar = ({ nav }) => {
    const dispatch = useDispatch();
    const Eshtablisment_Count = useSelector(state => state.Eshtablisment_Count)
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const [mod, setMod] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const loginState = useSelector(state => state)
    const alertRef = useRef();
    const [userDetails, setUserDetails] = useState('');

    // console.log('Eshtablisment_Count', Eshtablisment_Count);
useEffect(()=>{
    refresh()
},[])
    const logout = () => {
        Alert.alert(
            "Logout Confirmation",
            "Are you sure you want to logout?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log(),
                    style: "cancel"
                },
                { text: "OK", onPress: () => dispatch(signOut()), style: 'destructive' }
            ]
        );
    }
    const notificationListener = () => {
        if (loginState.userToken) {
            NavigationService.navigate('Notifications', { item: Eshtablisment_Count?.Scheduled })
        } else {
            alert('user not logged in')
        }
    }

    const refresh = () => {
        dispatch(Search_Establishment_History((result) => {
            console.log('sssssss', result);
            alertRef.current.show(result.error);
        }));
        dispatch(Recall());
        dispatch(Search_Establishment_History_NOC());

    }
    /*     useEffect( () => {
    
            const fetchData = async () => {
                const data = await AsyncStorage.getItem('userdetails');
                let userData=JSON.parse(data);
                setUserDetails(userData);
                console.log('dataUserDetails',userData.CompanyInfo.Email);
              }
            
              // call the function
              fetchData()
                // make sure to catch any error
                .catch(console.error);
    
    
            console.log('fromcomponent_userdetails',fetchData());
        }, []) */
    return (
        <View style={[styles.tabBar, { marginTop: insets.top }]}>
            {nav === 'tab' ?
                <>
                    <View style={{ width: 170, height: '100%', paddingLeft: 5 }} >
                        {I18nManager.isRTL ? <RightLogo /> : <LeftLogo />}

                        {/*  <Image style={styles.tabBarLogo} source={require('../../assets/img/adfca.png')} /> */}
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', width: '35%' }}>
                        <TouchableOpacity style={{ paddingRight: 35 }} onPress={() => notificationListener()/* ; navigation.navigate("Notifications") */}>
                            <FontAwesome name="refresh" color="#fff" size={25} onPress={() => refresh()} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => notificationListener()/* ; navigation.navigate("Notifications") */}>
                            <MaterialCommunityIcons name="bell" color="#fff" size={25} />
                        </TouchableOpacity>
                        <Text style={{ color: '#fff', fontWeight: '600', paddingHorizontal: 20 }}>|</Text>
                        <FontAwesome style={{ marginRight: 15 }} name="user" color="#fff" size={25} onPress={() => NavigationService.navigate("UserDetails")} />
                        <CustomeError ref={alertRef} />

                    </View>
                </>
                :
                nav === 'stacksWithoutLogout' ?
                    <>
                        <TouchableOpacity onPress={() => {
                                navigation.goBack();
                            }} style={{ width: 170, height: '100%', paddingLeft: 5, flexDirection: 'row', alignItems: 'center' }} >
                            <MaterialCommunityIcons name="chevron-left" color="#fff" size={32} onPress={() => {
                                navigation.goBack();
                            }} />
                            {I18nManager.isRTL ? <RightLogo /> : <LeftLogo />}
                            {/* <Image style={styles.tabBarLogo} source={require('../../assets/img/adfca.png')} /> */}
                        </TouchableOpacity >
                        <View style={{ flexDirection: 'row', alignItems: 'center'/* , justifyContent: 'space-evenly', width: '35%' */ }}>
                            <TouchableOpacity style={{ paddingRight: 35 }} onPress={() => notificationListener()/* ; navigation.navigate("Notifications") */}>
                                <FontAwesome name="refresh" color="#fff" size={25} onPress={() => refresh()} />
                            </TouchableOpacity>
                        </View>
                    </>
                    :
                    <>
                        <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity onPress={() => {
                                    navigation.goBack();
                                }} style={{ width: 170, height: '100%', paddingLeft: 5, flexDirection: 'row', alignItems: 'center' }} >
                                <MaterialCommunityIcons name="chevron-left" color="#fff" size={32} onPress={() => {
                                    navigation.goBack();
                                }} />
                                {I18nManager.isRTL ? <RightLogo /> : <LeftLogo />}
                                {/* <Image style={styles.tabBarLogo} source={require('../../assets/img/adfca.png')} /> */}
                            </TouchableOpacity>
                            <View style={{ paddingRight: 5 }}>
                                <MaterialCommunityIcons onPress={() =>/* navigation.navigate("Login") */ { logout() }} name="logout" color="#fff" size={32} />
                            </View>
                        </View>
                    </>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBar: {
        width: '100%',
        height: height / 11,
        backgroundColor: '#738591',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    tabBarLogo: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    }
});

//make this component available to the app
export default Navbar;
