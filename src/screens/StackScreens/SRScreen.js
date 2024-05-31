import React, { useEffect, useState } from "react";
import { View, Platform, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity, PermissionsAndroid, Alert } from "react-native";
import Navbar from "../../Components/Navbar/Navbar";
import SI_ImageCont from "../../Components/SI_ImageCont";
import Loading from "../../Components/Loading";
import NavigationService from '../../navigation/NavigationService';
import { AdhocInspection, Search_Establishment_History, Search_Establishment_History_NOC, Get_Assessment, GetCheckList, CallToGetInspectionReport } from '../../Redux/actions/SI_Action';
import { useDispatch, useSelector } from "react-redux";
import { writeFile, appendFile, readFile, readFileAssets, DownloadDirectoryPath, DocumentDirectoryPath, mkdir, readDir } from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import { toast, getUserdetails } from '../../Util/CommonStyle';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const SRScreen = (props) => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true);
    const [Inumber, setInumber] = useState(null);
    const { item, inspectionHist, serviceRequest, establishment } = props?.route?.params;
    const state = useSelector(state => state);
    const Eshtablisment_Inspection_Type = useSelector(state => state.Eshtablisment_Inspection_Type);
    const Search_Establishment_HistoryResult_NOC = useSelector(state => state.Search_Establishment_HistoryResult_NOC)
    const get_siebelReport = useSelector(state => state.GET_INSPECTION_REPORT);
    const [reportDataClick, setReportDataClick] = useState(false);


    useEffect(() => {
        //  console.log('serviceRequest', serviceRequest);
        console.log('establishment??', get_siebelReport);
        dispatch(Search_Establishment_History_NOC());

    }, [Search_Establishment_HistoryResult_NOC])


    useEffect(() => {
        if (get_siebelReport && reportDataClick) {
            setReportDataClick(false)
            const parsedSiebeleport = JSON.parse(get_siebelReport);
            console.log('EndDate?', parsedSiebeleport?.FileBuffer);
            console.log('Inumbertest', Inumber);
            var path = DocumentDirectoryPath + '/' + Inumber + "_SibleReport.pdf";

            if (parsedSiebeleport?.FileBuffer) {

                if (Platform.OS === 'ios') {
                    console.log('platform', Platform.OS);
                    writeFile(path, parsedSiebeleport.FileBuffer, 'base64')
                        .then((success) => {
                            console.log('FILE WRITTEN!');
                            FileViewer.open(path)
                                .then(() => {
                                    console.log('FILE Open!');
                                })
                                .catch(error => {
                                    console.log('FILE Open failed!::' + error);
                                });
                        })
                        .catch((err) => {
                            console.log(err.message);
                        });
                }
                console.log('platform', Platform.OS);

                const granted = PermissionsAndroid.requestMultiple(
                    [PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
                    ]
                ).then(async (result) => {

                    if (result['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted'
                        && result['android.permission.READ_EXTERNAL_STORAGE'] === 'granted') {

                        writeFile(path, parsedSiebeleport.FileBuffer, 'base64')
                            .then((success) => {
                                console.log('FILE WRITTEN!');
                                FileViewer.open(path)
                                    .then(() => {
                                        console.log('FILE Open!');
                                    })
                                    .catch(error => {
                                        console.log('FILE Open failed!::' + error);
                                    });
                            })
                            .catch((err) => {
                                console.log(err.message);
                            });

                    }
                    else if (result['android.permission.WRITE_EXTERNAL_STORAGE'] === 'denied'
                        || result['android.permission.READ_EXTERNAL_STORAGE']
                        === 'denied') {
                        debugger;

                    }
                    else if (result['android.permission.WRITE_EXTERNAL_STORAGE'] === 'never_ask_again'
                        || result['android.permission.READ_EXTERNAL_STORAGE']
                        === 'never_ask_again') {
                        debugger;
                    }
                });


            } else {
                Alert.alert("", "There is no Data to show", [
                    {
                        text: "OK",
                        onPress: () => null,
                        style: "cancel"
                    },
                    // { text: "YES", onPress: () => { NavigationService.navigate('Login'); }/*  BackHandler.exitApp() */ }
                ]);
            }
        }
    }, [get_siebelReport])


    const getSiebelReport = (inspectionNumberField, type) => new Promise((resolve, reject) => {
        // do anything here
        setInumber(inspectionNumberField);
        setReportDataClick(true);

        dispatch(CallToGetInspectionReport(inspectionNumberField, type));
        resolve();
    })

    return (
        <View style={styles.container}>
            {/* {isLoading && <Loading />} */}
            {state.isLoading && <Loading />}
            <Navbar nav={'stacksWithoutLogout'} />
            <SI_ImageCont />
            <ScrollView style={{ height: height / 3, width: width / 1.05, marginBottom: height / 7, marginLeft: 10 }}>
                {(/* serviceRequest &&  */inspectionHist && establishment) ?
                    Eshtablisment_Inspection_Type.map((item, key) => (

                        <View key={key} style={{ width: '100%', borderColor: 'red' }}>
                            {(item.title === 'Direct Inspection' || item.title === 'Routine Inspection' || item.title === 'Follow Up Inspection' /* || item.title === 'Self Inspection' */) &&
                                <View>
                                    {item.data.map((item, index) => (
                                        (item.statusField === 'Satisfactory' || item.statusField == 'Unsatisfactory') &&
                                        <View key={index} /* onPress={() => openTask(item.inspectionNumberField,item)} */ style={styles.taskCont}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', }}>
                                                <Text style={styles.textWhite}>{item.statusField ? item.statusField : 'Medium'}</Text>
                                                <Text style={styles.textWhite}>{item.inspectionNumberField}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', paddingTop: '5%' }}>
                                                <Text style={styles.textWhite}>{item.actualInspectionDateField ? item.actualInspectionDateField : '-'}</Text>
                                                <Text style={styles.textWhite}>{item.inspectionTypeField}</Text>
                                            </View>
                                            <TouchableOpacity onPress={() => getSiebelReport(item.inspectionNumberField)} style={{ alignItems: 'center', justifyContent: 'center', }}>
                                                <View style={{ width: '50%', backgroundColor: '#5c6672', padding: 5, marginTop: 10, alignItems: 'center', borderColor: 'white', borderWidth: 1, justifyContent: 'center', borderRadius: 5 }}>
                                                    <Text style={{ textDecorationLine: 'underline', color: 'white', fontWeight: 'bold' }}>Print Certificate</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </View>

                            }
                        </View>

                    ))
                    :
                    serviceRequest.map((item, key) => (

                        <View key={key} style={{ width: '100%', borderColor: 'red' }}>
                            {(item.Application === 'No Objection Certificate' && item.PermitStatus === 'Closed') &&
                                <View>
                                    {/* {item.map((item, index) => (
                            (item.statusField === 'Satisfactory' || item.statusField =='Unsatisfactory')&& */}
                                    <View key={key} /* onPress={() => openTask(item.inspectionNumberField,item)}  */ style={styles.taskCont}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', }}>
                                            <Text style={styles.textWhite}>{item.Application ? item.Application : '-'}</Text>
                                            <Text style={styles.textWhite}>{item.OpenedDate}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', paddingTop: '5%' }}>
                                            <Text style={styles.textWhite}>{item.PermitStatus ? item.PermitStatus : '-'}</Text>
                                            <Text style={styles.textWhite}>{item.SRNumber}</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => getSiebelReport(item.SRNumber, item.Application)} style={{ alignItems: 'center', justifyContent: 'center', }}>
                                            <View style={{ width: '50%', backgroundColor: '#5c6672', padding: 5, marginTop: 10, alignItems: 'center', justifyContent: 'center', borderColor: 'white', borderWidth: 1, borderRadius: 5 }}>
                                                <Text style={{ textDecorationLine: 'underline', color: 'white', fontWeight: 'bold' }}>Print Certificate</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    {/* ))} */}
                                </View>

                            }
                        </View>

                    ))
                    // ) :
                    // <View style={{ alignItems: 'center'/* ,justifyContent:'center' */, flex: 1, }}><Text style={{ color: '#5c6672' }}>No Tasks</Text></View>
                }
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    taskContelse: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', backgroundColor: '#5c6672', paddingHorizontal: 10, borderRadius: 5, marginHorizontal: 10, marginVertical: 10, paddingVertical: 15 },
    taskCont: { /* flexDirection: 'row', */ backgroundColor: '#5c6672', paddingHorizontal: 10, borderRadius: 5, marginHorizontal: 10, marginVertical: 10, paddingVertical: 15 },
    textWhite: { flex: 1, color: '#fff', alignItems: 'center', justifyContent: 'center', textAlign: 'center' },
    textWhiteelse: { color: '#fff' }
});
export default SRScreen;
