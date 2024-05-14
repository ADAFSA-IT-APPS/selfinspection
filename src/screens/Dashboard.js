//import liraries
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Image, Button, BackHandler, Alert, TouchableOpacity, ScrollView, StatusBar, I18nManager, Platform, Dimensions } from 'react-native';
import Navbar from '../Components/Navbar/Navbar';
import TabToggle from '../Components/Navbar/tabToggle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProgressCircle from '../Components/ProgressCircle';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Config from "react-native-config";
import { GetCheckList, Search_Establishment_History, GetDeviceDetailsByLicenseNo, GetInspectionDetails, Get_Assessment, Search_Establishment_History_NOC } from '../Redux/actions/SI_Action';
import { FontFamily, Colors } from '../Util/CommonStyle';
import { toast, IconLeftActiveDaily, PendingtaskIcon, DownloadIcon, DelayedIcon, IconRightActiveDaily, IconLeftInActiveDaily, IconRightInActiveDaily, ActiveSelfIns, InactiveSelfIns, ActiveAdafsaIns, InactiveAdafsaIns, PendingTask, Delayed, InProgress } from '../Util/CommonStyle'
import SI_ImageCont from '../Components/SI_ImageCont';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Loading from '../Components/Loading';
import CommentModal from '../Components/modals/CommentModal';
import Toast from 'react-native-root-toast';
import ToastComp from '../Components/ToastComp';
import NavigationService from '../navigation/NavigationService';
import moment from 'moment';
import CustomeError from '../Components/modals/CustomeError';
import ForegroundHandler from '../../src/assets/Helpers/Foreground_Handler'
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';
import { useKeepAwake } from '@sayem314/react-native-keep-awake';

// create a component    
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const Dashboard = ({ navigation }) => {

    const dispatch = useDispatch()
    const alertRef = useRef();

    const { t, i18n } = useTranslation();
    const state = useSelector(state => state)
    const Eshtablisment_Count = useSelector(state => state.Eshtablisment_Count)
    const Search_Establishment_HistoryResult_NOC = useSelector(state => state.Search_Establishment_HistoryResult_NOC)
    
    const [focusedScreen, setFocusedScreen] = React.useState(1);
    const [visible, setVisible] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);

    const data = [
        {
            "PropertyChanged": null,
            "assess_idField": "1-IE93RR",
            "attributeNameField": "Always wash/disinfect their hands",
            "comment2Field": "",
            "orderField": "1",
            "scoreField": "",
            "valueField": "Yes",
            "weightField": "1"
        }
    ]
    useEffect(() => {
        /*   Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 5000, 
              useNativeDriver: true
          }).start();  */
        console.log('>>>>date', moment().add(7, 'days').format("MM/DD/YYYY HH:mm:ss"));
        //let parsedSiebeleport = JSON.parse(Search_Establishment_HistoryResult_NOC)
       //  console.log('Eshtablisment_parsedSiebeleport', parsedSiebeleport);
    });
    let pdfData = [];
    data.map((inspect, id) => {
        let html = `
            <tr>
                <td>${id + 1})</td>
                <td>${inspect.attributeNameField}</td>
            </tr>

            <tr style="border-bottom:1px solid gray">
                <td>Answer:</td>
                <td>${inspect.valueField}</td>
            </tr>
            `
        pdfData.push(html)
    })

    useEffect(() => {
        dispatch(Search_Establishment_History_NOC());

    }, [])

    useEffect(() => {
        console.log('moment().format)', moment().format('DD MMM YYYY'));
        // console.log('moment().format)',moment().format("HH:mm:ss"));
        //  dispatch(GetDeviceDetailsByLicenseNo());
        //  dispatch(GetCheckList());
        dispatch(Search_Establishment_History((result) => {
            // console.log('sssssss', result);
            alertRef.current.show(result.error);
        }));
        dispatch(Search_Establishment_History_NOC());
        const backAction = async () => {
            Alert.alert("", "Are you sure you want to Sign out?", [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "YES", onPress: () => { NavigationService.navigate('Login'); }/*  BackHandler.exitApp() */ }
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
        //  dispatch(Search_Establishment_History());
        // Promise.all([dispatch(Get_Assessment()), dispatch(GetCheckList()), dispatch(Search_Establishment_History())])
    }, [dispatch])



    /* pdf create */
    const generateHtml = (data) => {
        return `
                <html lang="en">
                <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
                <style>table {border: none; border-collapse: collapse;}</style>
                </head>

                <body>
                <table class="table" border="0">
                    ${data.join('')}
                </table>
                </body> 
                </html>
            `
    }
    const createPDF = async () => {
        let options = {
            html: generateHtml(pdfData),
            fileName: 'test',
            directory: 'Documents',
            base64: true
        };

        let file = await RNHTMLtoPDF.convert(options)
        RNPrint.print({ filePath: file.filePath })
    }
    /* pdf create end*/




    const onsubmit = (text) => {
        console.log(text)
    }

    const fadeAnim = useRef(new Animated.Value(0)).current;


    const Task = ({ icon, text, reading, item }) => {
        return (
            <>
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor={Colors.primary} height='5' translucent={true} />
                {/*  <ForegroundHandler /> */}
                <TouchableOpacity onPress={() => NavigationService.navigate('Notifications', { item: item, inspectionHist: false })} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: height / 55, marginHorizontal: '8%' }}>
                    {/*  <Logo width={120} height={20}/> */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: height / 50 }}>
                        <View style={{ backgroundColor: Colors.primary, padding: 10, borderRadius: 150 }}>
                            {/* <MaterialCommunityIcons name="clipboard-check-outline" color='#fff' size={35} />
                             */}
                            {icon}
                        </View>
                        <Text style={{ paddingLeft: 15, fontSize: 16, paddingRight: 10 }}>{reading}</Text>
                    </View>
                    <Text style={{ fontSize: 12, fontWeight: '500', fontFamily: FontFamily.regular }}>{/* Config.ESERVICE_GENERIC */text}</Text>
                </TouchableOpacity>
                {/*      {state.isLoading && <Loading />} */}
            </>
        )
    }


    return (
        <View style={styles.container}>
            {state.isLoading && <Loading />}

            <Navbar nav={'tab'} />
            {/* <View> */}
            <TabToggle focusedScreen={focusedScreen} setFocusedScreen={setFocusedScreen} leftText={t('SelfInspection')} rightText={t('ADAFSAInspection')} IconLeftActive={IconLeftActiveDaily} IconRightActive={IconRightActiveDaily} IconLeftInActive={IconLeftInActiveDaily} IconRightInActive={IconRightInActiveDaily} />
            {/*  </View> */}
            {focusedScreen == 1 ?
                <ScrollView style={{ flex: 1 }}>
                    {/* <Button onPress={() => setModalVisible(true)} title='open' />
                    <CommentModal visible={modalVisible} onClose={() => setModalVisible(false)} onsubmit={onsubmit} /> */}
                    <Animated.View style={[styles.container1,/*  { opacity: fadeAnim } */]}>
                        <SI_ImageCont />
                        {/*     <TouchableOpacity onPress={() => createPDF()} style={{ alignItems: 'center' }}>
                            <Text>pdf</Text>
                        </TouchableOpacity> */}
                        <View style={{ alignItems: 'center' }}>
                            <ProgressCircle percentage={100} number={(Eshtablisment_Count?.Satisfactory ? Eshtablisment_Count.Satisfactory.length : 0) + (Eshtablisment_Count.Unsatisfactory ? Eshtablisment_Count.Unsatisfactory.length : 0)} radius={height / 12} delay={500 + 100 * 1} max={100} strokeWidth={9} color={'#a0f04a'} textColor={'#000'} circle='1' />
                        </View>
                        <View style={styles.twoCircleCont}>
                            <View style={{ alignItems: 'center' }}>
                                <ProgressCircle percentage={80} number={Eshtablisment_Count.Satisfactory ? Eshtablisment_Count.Satisfactory.length : 0} radius={height / 15} color={'#a0f04a'} delay={500 + 100 * 1} max={100} textColor={'#000'} circle='2' />
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <ProgressCircle percentage={20} number={Eshtablisment_Count.Unsatisfactory ? Eshtablisment_Count.Unsatisfactory.length : 0} radius={height / 15} color={'#a0f04a'} delay={500 + 100 * 1} max={100} textColor={'#000'} circle='3' />
                            </View>
                        </View>
                        <View style={[styles.p10,]}>
                            <Task icon={DownloadIcon} text={t('In_Progress')}
                                item={Eshtablisment_Count?.Open?.filter(item =>
                                    item.inspectionTypeField === 'Direct Self Inspection' ||
                                    item.inspectionTypeField === 'Follow Up Self Inspection' ||
                                    item.inspectionTypeField === 'Vehicle Self Inspection'
                                )}
                                reading={Eshtablisment_Count?.Open ?
                                    Eshtablisment_Count?.Open?.filter(item =>
                                        item.inspectionTypeField === 'Direct Self Inspection' ||
                                        item.inspectionTypeField === 'Follow Up Self Inspection' ||
                                        item.inspectionTypeField === 'Vehicle Self Inspection'
                                    ).length
                                    : 0} />
                            <Task icon={PendingtaskIcon} text={t('PendingTasks')}
                                item={Eshtablisment_Count.Scheduled}
                                reading={Eshtablisment_Count?.Scheduled?.filter(item =>
                                    item.inspectionTypeField === 'Direct Self Inspection' ||
                                    item.inspectionTypeField === 'Follow Up Self Inspection' ||
                                    item.inspectionTypeField === 'Vehicle Self Inspection'
                                ) ?
                                    Eshtablisment_Count?.Scheduled?.filter(item =>
                                        item.inspectionTypeField === 'Direct Self Inspection' ||
                                        item.inspectionTypeField === 'Follow Up Self Inspection' ||
                                        item.inspectionTypeField === 'Vehicle Self Inspection'
                                    ).length
                                    : 0} />
                            <Task icon={DelayedIcon} item={Eshtablisment_Count.task} text={t('Delayed')} reading='0' />
                        </View>
                    </Animated.View>
                    {/*  {state.isLoading && <Loading />} */}
                    <CustomeError ref={alertRef} />
                </ScrollView>
                : <ScrollView style={{ flex: 1 }}>
                    <Animated.View style={[styles.container1, /* { opacity: fadeAnim } */]}>
                        <SI_ImageCont />
                        <View style={{ alignItems: 'center' }}>
                            <ProgressCircle percentage={100} radius={height / 12} delay={500 + 100 * 1} max={100} strokeWidth={9} color={'#a0f04a'} textColor={'#000'} circle='1' />
                        </View>
                        <View style={styles.twoCircleCont}>
                            <View style={{ alignItems: 'center' }}>
                                <ProgressCircle percentage={80} radius={height / 15} color={'#a0f04a'} delay={500 + 100 * 1} max={100} textColor={'#000'} circle='2' />
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <ProgressCircle percentage={20} radius={height / 15} color={'#a0f04a'} delay={500 + 100 * 1} max={100} textColor={'#000'} circle='3' />
                            </View>
                        </View>
                        <View style={[styles.p10,]}>
                            <Task icon={DownloadIcon} text={t('In_Progress')} reading='0' />
                            <Task icon={PendingtaskIcon} text='Pending Tasks' reading='0' />
                            <Task icon={DelayedIcon} text='Delayed' reading='0' />
                        </View>
                    </Animated.View>
                </ScrollView>}

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    twoCircleCont: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginTop: -25, marginBottom: Platform.OS === 'ios' ? -height / 30 : -height / 70 },
    p10: { marginTop: Platform.OS === 'ios' ? '10%' : '1%' }
});

//make this component available to the app
export default Dashboard;






