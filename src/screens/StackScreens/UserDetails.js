import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Image, I18nManager, TouchableOpacity } from "react-native";
import Navbar from "../../Components/Navbar/Navbar";
import ToggleSwitch from 'toggle-switch-react-native'
import DeviceInfo from 'react-native-device-info';
import { version } from '../../../package.json';
import { useTranslation } from 'react-i18next';
import RNRestart from 'react-native-restart'
import { useNavigation } from '@react-navigation/native';
import { GetInspectionDetails, GetCheckList } from "../../Redux/actions/SI_Action";
import { useSelector, useDispatch } from "react-redux";
import SI_ImageCont from "../../Components/SI_ImageCont";
import Loading from "../../Components/Loading";
import { shadow } from "react-native-paper";
import NavigationService from "../../navigation/NavigationService";
import AsyncStorage from '@react-native-async-storage/async-storage';



const UserDetails = () => {
    const dispatch = useDispatch()
    const [switchLang, setSwitchLang] = useState(false);
    const [serviceRequest, setServiceRequest] = useState(null);
    const { t, i18n } = useTranslation();
    //const navigation = useNavigation();
    const state = useSelector(state => state.UserAccountDetails);
    const Eshtablisment_Count = useSelector(state => state.Eshtablisment_Count)
    const Eshtablisment_Inspection_Type = useSelector(state => state.Eshtablisment_Inspection_Type);
    const Search_Establishment_HistoryResult_NOC = useSelector(state => state.Search_Establishment_HistoryResult_NOC)
    const get_siebelReport = useSelector(state => state.GET_INSPECTION_REPORT);

    
    const [isLoading, setIsLoading] = useState(true)
    const [userDetails, setUserDetails] = useState('');

    useEffect(() => { 
       // dispatch(Search_Establishment_History_NOC());
  //console.log('Search_Establishment_HistoryResult_NOCSearch_Establishment_HistoryResult_NOC', Search_Establishment_HistoryResult_NOC);
        let parsedSiebeleport =Object.keys(Search_Establishment_HistoryResult_NOC).length ?JSON.parse(Search_Establishment_HistoryResult_NOC):''
        let data=parsedSiebeleport?.TradelicenseHistory?.Establishment[0]?.ListOfServiceRequest?.ServiceRequest
        setServiceRequest(data)
        //console.log('Eshtablisment_parsedSiebeleport', parsedSiebeleport.TradelicenseHistory.Establishment[0].ListOfServiceRequest.ServiceRequest);
    }, [Search_Establishment_HistoryResult_NOC])
    /*    useEffect(() => {
           if (state !== '') {
               setIsLoading(false);
           } else {
               NavigationService.goBack();
           }
       }, [state]) */

    useEffect(() => {
        console.log('DeviceInfo.getVersion()', DeviceInfo.getVersion());
        getUser();
      //  get_siebelReport!=''?'':get_siebelReport
    }, [])

    const getUser = async () => {
        try {
            const userdetails = JSON.parse(await AsyncStorage.getItem('userdetails'));
            //  console.log('dddddd', userdetails.FirstName);
            setUserDetails(userdetails);
            setIsLoading(false);
        } catch (e) {
            console.log('getUser -> e', e);
        }
    }
    const setlang = () => {
        setSwitchLang(switchLang => !switchLang)
        i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar').then(() => {
            I18nManager.forceRTL(i18n.language === 'ar');
            RNRestart.Restart()
        })
    }

    const inspectionHistory=()=>{
        NavigationService.navigate('SRScreen', { item: (/* Eshtablisment_Count?.Satisfactory|| */Eshtablisment_Inspection_Type) ,inspectionHist:true ,establishment:true})
    }
    const serviceRequestHistory=()=>{
        NavigationService.navigate('SRScreen', { item: (/* Eshtablisment_Count?.Satisfactory|| */Eshtablisment_Inspection_Type) ,inspectionHist:true,establishment:false,serviceRequest })
    }

    return (
        <View style={styles.container}>
            {isLoading && <Loading />}

            <Navbar nav={'stacksWithLogout'} />
            {/*    <View style={styles.imageCont}>
                <Image style={[styles.tabBarLogo, { alignSelf: 'center', }]} source={require('../../assets/img/SI.jpeg')} />
            </View> */}
            <SI_ImageCont />
            {/*    {userDetails.map((item, index) => (
                <View>
                    <Text></Text>
                </View>
            ))} */}
            <View style={styles.userDetailCont}>
                <Text style={styles.userDetailsKey}>{t('Establishment_Name')}</Text>
                <View style={styles.userDetailValueCont}>
                    <Text style={styles.userDetailValue}>{userDetails && userDetails.TradeName} {/* state.CompanyInfo.TradeName!=null&& *//* state.CompanyInfo.TradeName */}</Text>
                </View>
            </View>
            <View style={styles.userDetailCont}>
                <Text style={styles.userDetailsKey}>{t('LicsenceNo')}</Text>
                <View style={styles.userDetailValueCont}>
                    <Text style={styles.userDetailValue}>{userDetails && userDetails.LicenseNO} {/* state.CompanyInfo.LicenseNO!=null&& *//* state.CompanyInfo.LicenseNO */}</Text>
                </View>
            </View>
            <View style={styles.userDetailCont}>
                <Text style={styles.userDetailsKey}> {t('ContactDetails')}</Text>
                <View style={styles.userDetailValueCont}>
                    <Text style={styles.userDetailValue}>{userDetails && userDetails.PhoneNO} {/* state.CompanyInfo.PhoneNO!=null&& *//* state.CompanyInfo.PhoneNO */}</Text>
                </View>
            </View>
            <View style={styles.userDetailCont}>
                <Text style={styles.userDetailsKey}>{t('EmailID')}</Text>
                <View style={styles.userDetailValueCont}>
                    <Text style={styles.userDetailValue}> {userDetails && userDetails.Email} {/* state.CompanyInfo.Email!=null&& *//* state.CompanyInfo.Email */}</Text>
                </View>
            </View>

            <View style={[styles.userDetailCont,{marginTop:10}]}>
                <TouchableOpacity onPress={() => inspectionHistory()}  style={styles.inspectionHistory}>
                    <Text style={[styles.userDetailValue,{letterSpacing:0.4,fontSize:14}]}>{t('Inpection_History')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{serviceRequestHistory()}} style={styles.inspectionHistory}>
                    <Text style={[styles.userDetailValue,{letterSpacing:0.4,fontSize:14}]}>{t('Service_Request')}</Text>
                </TouchableOpacity>
            </View>

            <View style={{ alignItems: 'center', marginTop: '10%' }}>
                <ToggleSwitch
                    isOn={switchLang}
                    onColor="#5c6672"
                    offColor="gray"
                    label={t('English')}
                    labelStyle={{ color: "black", fontWeight: "900" }}
                    size="medium"
                    onToggle={isOn => setlang()}
                />
            </View>

            <Text style={{ textAlign: 'center', marginTop: '7%' }}>{t('Version')} : {DeviceInfo.getVersion() ? DeviceInfo.getVersion() : '16'}</Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageCont: { height: '9%', marginVertical: 10, alignItems: 'center', justifyContent: 'center' },
    tabBarLogo: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    userDetailCont: { flexDirection: 'row', alignItems: 'center',justifyContent: 'center', marginHorizontal: '8%' },
    userDetailsKey: { width: '50%',/* alignSelf:'flex-start' */textAlign: 'left' },
    inspectionHistory:{
        backgroundColor: '#5c6672', paddingHorizontal: 10, borderRadius: 5, marginHorizontal: 10, marginVertical: 10, paddingVertical: 18,
    },
    userDetailValueCont: { width: '50%', backgroundColor: '#5c6672', paddingHorizontal: 10, borderRadius: 5, marginHorizontal: 10, marginVertical: 10, paddingVertical: 18 },
    userDetailValue: { color: '#fff', textAlign: 'center', fontSize: 12 }
});

export default UserDetails;
