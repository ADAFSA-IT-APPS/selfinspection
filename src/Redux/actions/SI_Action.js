import React, { useEffect, useState } from 'react';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { Encrypt, getDateInUtc, getCurrentDate, GetAsync, SetAsync, removeAsync } from "../../assets/Helpers/helpers";
import Config from "react-native-config";
import { post } from '../requestmanager';
import NavigationService from '../../navigation/NavigationService';
import { dataAssesment } from '../../Components/DummyData'
import { toast, getUserdetails } from '../../Util/CommonStyle';
import { useDispatch } from 'react-redux';
import { writeFile, appendFile, readFile, readFileAssets, DownloadDirectoryPath, mkdir, readDir } from 'react-native-fs';


const { SERVERDATE_TIME, COMMON_SERVICE, UpdateAssessment, LOV, APP_SERVICE_URL, SMARTCONTROL, GetAssessment, ESERVICE_GENERIC, SELFINSPECTION_SERVICE, MOBILE_SERVICE, STAGE_API } = Config;

/* export const GetServerDateTime = () => async () => {

    const dateStringPar = getCurrentDate();
    let dateString = dateStringPar;
    const encryptedServerDatePar = Encrypt(dateString);
    let encryptedServerDate = encryptedServerDatePar;
    let ur = APP_SERVICE_URL + COMMON_SERVICE + "/" + encryptedServerDate + "/" + dateString + "/GetServerDateTime";
    try {
        const msgArray = { val: 7 }
        axios({
            method: "POST",
            url: ur,
            data: JSON.stringify(msgArray),
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(function (response) {
                const dateObj = response.data.GetServerDateTimeResult.serverDate;
                //global.DateObj = dateObj;
                return { date: dateObj };
            })
    } catch (e) {  }
} */

export const getDateTimeFromServer = async () => {
    const dateStringPar = getCurrentDate();
    let dateString = dateStringPar;
    const encryptedServerDatePar = Encrypt(dateString);
    let encryptedServerDate = encryptedServerDatePar;
    let ur = SERVERDATE_TIME + COMMON_SERVICE + "/" + encryptedServerDate + "/" + dateString + "/GetServerDateTime";
    console.log('getserverdateapi', ur);

    try {
        const msgArray = { val: 7 }
        return withTimeout(
            10000,
            axios({
                method: "POST",
                url: ur,
                timeout: 1000 * 20,
                data: JSON.stringify(msgArray),
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                }
            })
                .then((response) => {
                    let dateObj = response.data.GetServerDateTimeResult.serverDate;
                    // console.log('responseFromDateMethod', response);
                    return { status: response.status, data: dateObj };
                })
                .catch((err) => {

                    // console.error('error_from serverdate_in_then', err.Error);
                    toast('Network Error')
                    // dispatch({ type: 'HIDE_LOADER' });

                    return /* { status: 'failure' } */
                })

        ).catch(e => {
            // alert('Timeout')
            toast('TIME_OUT')
            return
        });

    } catch (e) {
        console.log('error_from serverdate_in_try', e.ErrorMsg)
        // dispatch({ type: 'HIDE_LOADER' });

        toast('TIME_OUT')
        return { status: 'failure' }
        // withTimeout(1000, toast('Dear customer please try again later'));
        // return 
    }

}

function withTimeout(msecs, promise) {
    const timeout = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error("timeout"));
            // return
            //toast('Dear customer please try again later')

        }, msecs);
    });
    return Promise.race([timeout, promise]);
}


// export const signIn = (userName, password, toggle, result) => async (dispatch) => {

//     dispatch({ type: 'SHOW_LOADER' });

//     let userToken;
//     userToken = null;

//     const userNameEcrypted = Encrypt(userName);
//     const userPasswordEcrypted = Encrypt(password);
//     console.log('test');
//     const dateob = await getDateTimeFromServer();
//     if (typeof dateob == 'undefined') {
//         toast('Network Error')
//         console.log('failure from server assess',);
//         dispatch({ type: 'HIDE_LOADER' });

//     }
//     console.log('new111 date object', dateob);
//     console.log('new date object', dateob.data);

//     let checkToken = await AsyncStorage.getItem('fcmToken');
//     console.log('checktoken>>', );
//     console.log('checkToken', checkToken);

//     const dateInUtc = getDateInUtc(dateob.data);
//     const encryptedServerDate = Encrypt(dateInUtc);

//     let postUrl = STAGE_API + ESERVICE_GENERIC + "/" + encryptedServerDate + "/" + dateInUtc + "/" + "DoLogin";
//     console.log('mainurl', postUrl);

//     if (userName === '') {
//         return result({ error: 'Please enter Username' })
//     } else if (password === '') {
//         return result({ error: 'Please enter Password' })
//     }
//     let postData = { 
//         UserName: userNameEcrypted, 
//         Password: userPasswordEcrypted,
//         DeviceToken:checkToken?checkToken:'',
//         DeviceType:Platform.OS ==='ios'? 'IOS' : 'ANDROID'  ,
//     };
//     console.log('userdata', postData);


//     try {
//         return withTimeout( 
//             30000,
//             axios({
//                 method: "POST",
//                 url: postUrl, 
//                 mode: "cors",
//                 timeout: 1000 * 20,
//                 data: JSON.stringify(postData),
//                 headers: {
//                     "Content-Type": "application/json",
//                 }
//             })
//                 .then(async function (response) {
//                     dispatch({ type: 'HIDE_LOADER' });
//                     console.log('response_from _login', response.data.DoLoginResult.UserAccountDetails);
//                     console.log('response', response.data.DoLoginResult.ErrorCode);
//                     console.log('response_from _STUlogin', response.status);

//                     if (response.data.DoLoginResult.ErrorCode === "0") {
//                         console.log('enter');
//                         let userDetails = response.data.DoLoginResult.UserAccountDetails.CompanyInfo;
//                         let LicenseNO = response.data.DoLoginResult.UserAccountDetails.CompanyInfo.LicenseNO;
//                         let TradeName = response.data.DoLoginResult.UserAccountDetails.CompanyInfo.TradeName;
//                         let errorCode = response.data.DoLoginResult.UserAccountDetails.ErrorCode;
//                         console.log('errorCode', errorCode);
//                         console.log('TradeName>>>>>', TradeName);

//                         let ErrorMsg = response.data.DoLoginResult.UserAccountDetails.ErrorMsg;
//                         // userToken = LicenseNO.DeviceToken;
//                         if (errorCode == 0) {
//                             userToken = await AsyncStorage.getItem('userToken');

//                             /* 'asdf';

//                             AsyncStorage.setItem('userToken', userToken) */
//                             let userdetails = JSON.stringify(userDetails);
//                             AsyncStorage.setItem('userdetails', userdetails)
//                             AsyncStorage.setItem('LicenseNO', LicenseNO)
//                             AsyncStorage.setItem('TradeName', TradeName)
//                             console.log('token_login', userToken);
//                             /*  let testUser= await AsyncStorage.getItem('userdetails')
//                              console.log('userdetails',testUser ); */
//                             dispatch({ type: 'LOGIN', id: userName, token: userToken ? userToken : null, UserAccountDetails: userDetails });
//                             NavigationService.navigate('Tabs');

//                         }
//                         else if (errorCode == 1001) {
//                             return result({ error: ErrorMsg })
//                         }
//                         else if (errorCode == 1002) {
//                             return result({ error: ErrorMsg })
//                         }
//                         else if (errorCode == 1003) {
//                             return result({ error: ErrorMsg })
//                         }
//                         else if (errorCode == 1004) {
//                             return result({ error: ErrorMsg })
//                         }
//                     }
//                     else if (response.data.DoLoginResult.ErrorCode == "101") {
//                         return result({ error: 'Please correct time on your device' })
//                     }
//                     else if (response.data.DoLoginResult.ErrorCode == "102") {
//                         return result({ error: 'Please correct date&time on your device' })
//                     }
//                     else if (response.data.DoLoginResult.ErrorCode == "103") {
//                         return result({ error: 'Dear employee,this service has been stopped temporary' })
//                     } else if (response.data.DoLoginResult.ErrorCode == "104") {
//                         return result({ error: response.data.DoLoginResult.UserAccountDetails.ErrorMsg })
//                     }
//                     else if (response.data.DoLoginResult.ErrorCode == "404") {
//                         return result({ error: 'Dear Customer, we are unable to load. Please try again later. Sorry for the inconvenience caused. ' })
//                     }
//                     else if (response.data.DoLoginResult.ErrorCode == "402") {
//                         return result({ error: 'Dear Customer,server error occured. Please try again later.' })
//                     }
//                     else {
//                         console.log('nodata');
//                         return result({ error: 'No_Data_Found' })
//                     }
//                 })
//                 .catch((err) => {
//                     dispatch({ type: 'HIDE_LOADER' });
//                     console.log('error_from login_in_then', err.ErrorMsg);
//                     return result({ error: 'Please check the username and password' })
//                 })
//         );

//     } catch (e) {
//         dispatch({ type: 'HIDE_LOADER' });
//         console.log('error_from login_in_catch', e.ErrorMsg);
//     }
// };








export const signIn = (userName, password, toggle, result) => async (dispatch) => {

    dispatch({ type: 'SHOW_LOADER' });

    let userToken;
    userToken = null;

    // const userNameEcrypted = Encrypt(userName);
    // const userPasswordEcrypted = Encrypt(password);
    const dateob = await getDateTimeFromServer();
    if (typeof dateob == 'undefined') {
        toast('Network Error')
        console.log('failure from server assess',);
        dispatch({ type: 'HIDE_LOADER' });

    }

    let checkToken = await AsyncStorage.getItem('fcmToken');
    console.log('checkToken', checkToken);

    const dateInUtc = getDateInUtc(dateob.data);
    const encryptedServerDate = Encrypt(dateInUtc);

    let postUrl = STAGE_API + SELFINSPECTION_SERVICE + "/" + encryptedServerDate + "/" + dateInUtc + "/" + "DoLogin";
    console.log('mainurl', postUrl);

    if (userName === '') {
        return result({ error: 'Please enter Username' })
    } else if (password === '') {
        return result({ error: 'Please enter Password' })
    }
    let postData = {
        UserName: userName,
        Password: password,
        DeviceToken: checkToken ? checkToken : '',
        DeviceType: Platform.OS === 'ios' ? 'IOS' : 'ANDROID',
    };
    console.log('userdata', postData);


    try {
        /*  return withTimeout( 
             30000, */
        axios({
            method: "POST",
            url: postUrl,
            mode: "cors",
            timeout: 1000 * 20,
            data: JSON.stringify(postData),
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(async function (response) {
                dispatch({ type: 'HIDE_LOADER' });
                console.log('response_from _login', response.data.DoLoginResult);
                console.log('response', response.data.DoLoginResult.ErrorCode);
                console.log('response_from _STUlogin', response.status);

                if (response.data.DoLoginResult.ErrorCode === "0") {
                    console.log('enter');
                    let userDetails = response.data.DoLoginResult.CompanyInfoDetails;
                    let LicenseNO = response.data.DoLoginResult.CompanyInfoDetails.LicenseNO;
                    let TradeName = response.data.DoLoginResult.CompanyInfoDetails.TradeName;
                    let errorCode = response.data.DoLoginResult.ErrorCode;
                    console.log('errorCode', errorCode);
                    console.log('TradeName>>>>>', TradeName);

                    let ErrorMsg = response.data.DoLoginResult.ErrorDesc;
                    // userToken = LicenseNO.DeviceToken;
                    if (errorCode == 0) {
                        console.log('inside login',);
                        userToken = await AsyncStorage.getItem('userToken');

                        /* 'asdf';
                        
                        AsyncStorage.setItem('userToken', userToken) */
                        let userdetails = JSON.stringify(userDetails);
                        AsyncStorage.setItem('userdetails', userdetails)
                        AsyncStorage.setItem('LicenseNO', LicenseNO)
                        AsyncStorage.setItem('TradeName', TradeName)
                        console.log('token_login', userToken);
                        /*  let testUser= await AsyncStorage.getItem('userdetails')
                         console.log('userdetails',testUser ); */
                        dispatch({ type: 'LOGIN', id: userName, token: userToken ? userToken : null, UserAccountDetails: userDetails });
                        NavigationService.navigate('Tabs');

                    }
                    else if (errorCode == 1001) {
                        return result({ error: ErrorMsg })
                    }
                    else if (errorCode == 1002) {
                        return result({ error: ErrorMsg })
                    }
                    else if (errorCode == 1003) {
                        return result({ error: ErrorMsg })
                    }
                    else if (errorCode == 1004) {
                        return result({ error: ErrorMsg })
                    }
                }
                else if (response.data.DoLoginResult.ErrorCode == "101") {
                    return result({ error: 'Please correct time on your device' })
                }
                else if (response.data.DoLoginResult.ErrorCode == "102") {
                    return result({ error: 'Please correct date&time on your device' })
                }
                else if (response.data.DoLoginResult.ErrorCode == "103") {
                    return result({ error: 'Dear employee,this service has been stopped temporary' })
                } else if (response.data.DoLoginResult.ErrorCode == "104") {
                    return result({ error: response.data.DoLoginResult.UserAccountDetails.ErrorMsg })
                }
                else if (response.data.DoLoginResult.ErrorCode == "404") {
                    return result({ error: 'Dear Customer, we are unable to load. Please try again later. Sorry for the inconvenience caused. ' })
                }
                else if (response.data.DoLoginResult.ErrorCode == "402") {
                    return result({ error: 'Dear Customer,server error occured. Please try again later.' })
                }
                else {
                    console.log('nodata');
                    return result({ error: 'No_Data_Found' })
                }
            })
            .catch((err) => {
                dispatch({ type: 'HIDE_LOADER' });
                console.log('error_from login_in_then', err.ErrorMsg);
                return result({ error: 'Please check the username and password' })
            })
        /* ); */

    } catch (e) {
        dispatch({ type: 'HIDE_LOADER' });
        console.log('error_from login_in_catch', e.ErrorMsg);
    }

};
export const Search_Establishment_History = (result) => async (dispatch) => {
    console.log('');
    dispatch({ type: 'SHOW_LOADER' });

    const dateob = await getDateTimeFromServer();
    if (typeof dateob == 'undefined') {
        toast('Network Error')
        console.log('failure from server assess',);
        dispatch({ type: 'HIDE_LOADER' });

    }
    const dateInUtc = getDateInUtc(dateob.data);

    const encryptedServerDate = Encrypt(dateInUtc);


    let postUrl = APP_SERVICE_URL + SELFINSPECTION_SERVICE + "/" + encryptedServerDate + "/" + dateInUtc + "/" + "Search_Establishment_History";

    console.log('Search_Establishment_History', postUrl);
    const LicenseNO = await AsyncStorage.getItem('LicenseNO');

    let postData =
    {
        _Input: {
            InterfaceID: "ADFCA_CRM_SBL_005",
            LanguageType: "ENU",
            TradeLicenseNumber: LicenseNO/* ?LicenseNO:"CN-1700160" */,
            InspectorName: "",
            LicenseSource: "",
            EnglishName: "",
            InspectorId: "",
            ArabicName: "",
            AdditionalTag1: "",
            Sector: "",
            AdditionalTag2: "",
            Area: "",
            AdditionalTag3: ""
        }
    };

    try {
        axios({
            method: "POST",
            url: postUrl,
            timeout: 1000 * 10,
            data: /* JSON.stringify(postData) */postData,
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(function (response) {
                console.log('history_resp', response.data);
                if (response.data.Search_Establishment_HistoryResult.ErrorCode == 402) {
                    return result({ error: response.data.Search_Establishment_HistoryResult.ErrorDesc })

                }
                let data = response.data.Search_Establishment_HistoryResult.Search_Establishment_History_Output.tradelicenseHistoryField[0].listOfActionField;
                let dataSR = response.data.Search_Establishment_HistoryResult.Search_Establishment_History_Output.tradelicenseHistoryField[0].listOfServiceRequestField;

                let dataObjCount = {};
                data.forEach(e => {
                    if (dataObjCount[e.statusField]) {
                        dataObjCount[e.statusField].push(e)
                    } else {
                        dataObjCount[e.statusField] = [e]
                    }
                });
                let dataObjInspection = {};
                data.forEach(e => {
                    if (dataObjInspection[e.inspectionTypeField]) {
                        dataObjInspection[e.inspectionTypeField].push(e)
                    } else {
                        dataObjInspection[e.inspectionTypeField] = [e]
                    }
                });
                const formattedObj = Object.values(dataObjInspection).map((item, index) => ({
                    title: item[0].inspectionTypeField,
                    data: item
                }
                ))

                //console.log('count', dataObjCount/* .Acknowledged.length */);
                dispatch({ type: 'HIDE_LOADER' });
                if (response.data.Search_Establishment_HistoryResult.Search_Establishment_History_Output.statusField == "Success") {
                    console.log('enterhistory')
                    dispatch({ type: 'SEARCH_ESHTABLISHMENT_RESULT', payload: data, eshtablish_count: dataObjCount, eshtablish_inspection_type: formattedObj });
                    // toast('Success')

                } else {
                    toast('FAILURE')

                    console.log('wrong');
                    return
                }
            })
            .catch((err) => {
                dispatch({ type: 'HIDE_LOADER' });

            })
    } catch (e) {
        // console.log('GET_INSPECTION_DETAILS_ERROR', e.ErrorMsg);
        dispatch({ type: 'HIDE_LOADER' });
        //  return result({ error: e.ErrorMsg })

    }

    // dispatch({ type: 'GET_CHECK_LIST', payload: false });
}

export const Search_Establishment_History_NOC = (/* result */) => async (dispatch) => {
    dispatch({ type: 'SHOW_LOADER' });



    let postUrl = 'https://smartcontrol.adafsa.gov.ae/GBL_ADAFSA_MOB_Application/SERV_HistorySearchRestService/HistorySearch';

    const LicenseNO = await AsyncStorage.getItem('LicenseNO');

    let postData =
    {
        InterfaceID: "ADFCA_CRM_SBL_005",
        LanguageType: "ENU",
        TradeLicenseNumber: LicenseNO/* ?LicenseNO:"CN-1700160" */,
        InspectorName: "",
        LicenseSource: "",
        EnglishName: "",
        InspectorId: "",
        ArabicName: "",
        AdditionalTag1: "",
        Sector: "",
        AdditionalTag2: "",
        Area: "",
        AdditionalTag3: ""
    };

    try {
        axios({
            method: "POST",
            url: postUrl,
            timeout: 1000 * 10,
            data: JSON.stringify(postData),
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(function (response) {
                const data = response.data.Data;

                dispatch({ type: 'HIDE_LOADER' });
                if (response.data) {
                    console.log('enterhistory')
                    dispatch({ type: 'SEARCH_ESHTABLISHMENT_RESULT_NOC', payload: data });
                    // toast('Success')

                } else {
                    toast('FAILURE')

                    console.log('wrong');
                    return
                }
            })
            .catch((err) => {
                dispatch({ type: 'HIDE_LOADER' });

            })
    } catch (e) {
        // console.log('GET_INSPECTION_DETAILS_ERROR', e.ErrorMsg);
        dispatch({ type: 'HIDE_LOADER' });
        // return result({ error: e.ErrorMsg })

    }

    // dispatch({ type: 'GET_CHECK_LIST', payload: false });
}

export const AdhocInspection = (IType, VNumber, subChecked) => async (dispatch) => {
    console.log('itype', IType);
    console.log('VNumber', VNumber);
    console.log('subChecked_AdhocInspectionsubChecked', subChecked);
    dispatch({ type: 'SHOW_LOADER' });



    // dispatch({ type: 'SHOW_LOADER' });

    const dateob = await getDateTimeFromServer();

    if (typeof dateob == 'undefined') {
        toast('Network Error')
        console.log('failure from server assess',);
        dispatch({ type: 'HIDE_LOADER' });

    }

    const dateInUtc = getDateInUtc(dateob.data);
    const encryptedServerDate = Encrypt(dateInUtc);


    let postUrl = APP_SERVICE_URL + SELFINSPECTION_SERVICE + "/" + encryptedServerDate + "/" + dateInUtc + "/" + "AdhocInspection";
    const LicenseNO = await AsyncStorage.getItem('LicenseNO');
    const TradeName = await AsyncStorage.getItem('TradeName');

    console.log('AdhocInspection', postUrl);
    let postData = {
        _Input:
        {
            InterfaceID: "ADFCA_CRM_SBL_034",
            Longitude: "",
            PostalCode: "",
            Address2: "",
            InspectionType: IType,
            AccountArabicName: "",
            PhoneNumber: "",
            LanguageType: (IType == 'Direct Self Inspection' && subChecked?.LanguageIndependentCode) ? subChecked?.LanguageIndependentCode : "",
            City: "",
            TradeLicenseNumber: LicenseNO/* "CN-1700160" */,
            Latitude: "",
            InspectorName: "SADMIN",
            AccountName: TradeName,
            Score: "",
            MailAddress: "",
            Address1: "",
            AccountType: "Customer",
            Action: "",
            LicenseExpDate: "",
            InspectorId: "",
            LicenseRegDate: "",
            Grade: VNumber ? VNumber : ''
        }

    };
    console.log('AdhocInspection_postData', postData);

    try {
        axios({
            method: "POST",
            url: postUrl,
            timeout: 1000 * 28,
            data: JSON.stringify(postData),
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((response) => {
                console.log('adhocResponse', response.data.AdhocInspectionResult);
                let data = response.data;
                console.log('Adhocdata', data);


                // if (IType == 'Direct Self Inspection') {
                //     let postUrl = APP_SERVICE_URL + SELFINSPECTION_SERVICE + "/" + encryptedServerDate + "/" + dateInUtc + "/" + "Send_Acknowledge";
                //     let postData = {
                //         _Input: {
                //             InterfaceID: "ADFCA_CRM_SBL_068",
                //             Longitude: "",
                //             Latitude: "",
                //             DateTime: "",
                //             Comments: "",
                //             LanguageType: "ENU",
                //             InspectorName: subChecked?.LanguageIndependentCode ? subChecked.LanguageIndependentCode : '',
                //             RequestType: "",
                //             Reason: "",
                //             TaskStatus: "Acknowledged",
                //             TaskId: response.data.AdhocInspectionResult.NewInspection_Output.taskIdField,
                //             InspectorId: "",
                //             PreposedDateTime: ""
                //         }
                //     }
                //     console.log('postData from send acknowledge AdhocInspection', postData);

                //     try {
                //         axios({
                //             method: "POST",
                //             url: postUrl,
                //             timeout: 1000 * 13,
                //             data: JSON.stringify(postData),
                //             headers: {
                //                 "Content-Type": "application/json",
                //             }
                //         })
                //             .then(async function (response) {
                //                 var data = response.data;
                //                 console.log('sendAcKnowledgedata', data);
                //                 if (data.Send_AcknowledgeResult.Send_Acknowledge_Output.statusField === 'Failed') {
                //                     toast(data.Send_AcknowledgeResult.Send_Acknowledge_Output.errorMessageField)

                //                 }
                //             }).catch((err) => {
                //                 dispatch({ type: 'HIDE_LOADER' });
                //                 return
                //             })
                //     } catch (e) {
                //         console.log('GET_ACKNOWLEDGE_ERROR', e.ErrorMsg); toast('Network Error');
                //         dispatch({ type: 'HIDE_LOADER' });
                //         return
                //     }
                // }
                response.data?.AdhocInspectionResult?.NewInspection_Output?.Error && toast(response.data.AdhocInspectionResult.NewInspection_Output.Error)
                if (response.data.AdhocInspectionResult.ErrorCode == 402) {
                    return result({ error: response.data.AdhocInspectionResult.ErrorDesc })

                }
                if (response.data.AdhocInspectionResult.NewInspection_Output.statusField == "Success") {
                    dispatch({ type: 'ADHOC_INSPECTION', payload: data });
                    toast('Inspection Created Successfully')
                    // dispatch({ type: 'HIDE_LOADER' });

                    let taskid = IType ? {
                        inspectionNumberField: response.data.AdhocInspectionResult.NewInspection_Output.taskIdField,
                        inspectionTypeField: IType,
                        statusField: "Scheduled"
                    }
                        : {
                            inspectionNumberField: response.data.AdhocInspectionResult.NewInspection_Output.taskIdField,
                            inspectionTypeField: 'Direct Self Inspection',
                            statusField: "Acknowledged"
                        }


                    console.log('taskid_check>>>>>>>', taskid);
                    dispatch(Get_Assessment(subChecked, taskid));
                    dispatch(GetCheckList(subChecked, taskid));
                    // if (IType == 'Vehicle Self Inspection') {
                    //     dispatch(Get_Assessment(taskid));
                    //     dispatch(GetCheckList(taskid));
                    // } else {
                    //     dispatch(Get_Assessment_New(taskid, '', subChecked));
                    // }
                    // NavigationService.navigate('TaskDetails', { taskId: taskid });
                    // return result({ error: response.data.AdhocInspectionResult.NewInspection_Output.statusField })
                } else {
                    toast(response.data.AdhocInspectionResult.NewInspection_Output.errorMessageField);
                    dispatch({ type: 'HIDE_LOADER' });
                    return;
                }
            }).catch((err) => {
                dispatch({ type: 'HIDE_LOADER' });
                toast('Time Out')
            })


    } catch (e) {
        console.log('GET_INSPECTION_DETAILS_ERROR', e.ErrorMsg);
        dispatch({ type: 'HIDE_LOADER' });

    }

    // dispatch({ type: 'GET_CHECK_LIST', payload: false });
}

export const Get_Assessment = (subChecked, item, result) => async (dispatch) => {
    // console.log('task_Get_Assessment', item.inspectionNumberField);
    console.log('itemfrom action', item);
    dispatch({ type: 'SHOW_LOADER' });
    const dateob = await getDateTimeFromServer();
    console.log('itemfrom getassess', dateob);

    if (typeof dateob == 'undefined') {
        toast('Network Error')
        console.log('failure from server assess',);
        dispatch({ type: 'HIDE_LOADER' });

    }


    const dateInUtc = getDateInUtc(dateob.data);
    const encryptedServerDate = Encrypt(dateInUtc);


    let postUrl = APP_SERVICE_URL + SELFINSPECTION_SERVICE + "/" + encryptedServerDate + "/" + dateInUtc + "/" + "Get_Assessment";

    console.log('Get_Assessment', postUrl);
    console.log('checktaskid', item.inspectionTypeField !== 'Vehicle Self Inspection' && item.inspectionTypeField);
    var TaskId;
    if ((item.inspectionTypeField === 'Vehicle Self Inspection') && (item.statusField == 'Scheduled' || item.statusField == 'Acknowledged')) {
        //For dev
        // TaskId = '1-1046099439';
        //For prod
        TaskId = '1-13602897619';

    } else if ((item.inspectionTypeField === 'Vehicle Self Inspection') && (item.statusField == 'Satisfactory' || item.statusField == 'Unsatisfactory')) {
        TaskId = item.inspectionNumberField
    } else {
        TaskId = item.inspectionNumberField
    }

    let postDataAssessment = {
        _Input: {
            InterfaceID: "ADFCA_CRM_SBL_065",
            LanguageType: "ENU",
            InspectorName: "",
            TaskId: TaskId,
            InspectorId: "",
        }
    };
    console.log('payload_getAssement', postDataAssessment);
    if (/* item.inspectionTypeField == 'Direct Self Inspection' && */ item.statusField == 'Scheduled') {
        let postUrl = APP_SERVICE_URL + SELFINSPECTION_SERVICE + "/" + encryptedServerDate + "/" + dateInUtc + "/" + "Send_Acknowledge";
        let postData = {
            _Input: {
                InterfaceID: "ADFCA_CRM_SBL_068",
                Longitude: "",
                Latitude: "",
                DateTime: "",
                Comments: "",
                LanguageType: "ENU",
                InspectorName: subChecked?.LanguageIndependentCode ? subChecked.LanguageIndependentCode : '',
                RequestType: "",
                Reason: "",
                TaskStatus: "Acknowledged",
                TaskId: TaskId,
                InspectorId: "",
                PreposedDateTime: ""
            }
        }
        console.log('postData from send acknowledge Get_Assessment', postData);

        try {
            axios({
                method: "POST",
                url: postUrl,
                timeout: 1000 * 13,
                data: JSON.stringify(postData),
                headers: {
                    "Content-Type": "application/json",
                }
            })
                .then(async function (response) {
                    var data = await response.data;
                    console.log('sendAcKnowledgedata', data);
                    console.log('payload_getAssement_inside_Acknowledge', postDataAssessment);

                    if (data.Send_AcknowledgeResult.Send_Acknowledge_Output.statusField === 'Failed') {
                        toast(data.Send_AcknowledgeResult.Send_Acknowledge_Output.errorMessageField)

                    }
                }).catch((err) => {
                    dispatch({ type: 'HIDE_LOADER' });
                    return
                })
        } catch (e) {
            console.log('GET_ACKNOWLEDGE_ERROR', e.ErrorMsg); toast('Network Error');
            dispatch({ type: 'HIDE_LOADER' });
            return
        }
    }



    console.log('conditionTASKID', TaskId);


    try {
        axios({
            method: "POST",
            url: postUrl,
            timeout: 1000 * 16,
            data: JSON.stringify(postDataAssessment),
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(function (response) {
                // console.log('Get_AssessmentResponse', response.data.Get_AssessmentResult);
                //  if (response.data.Get_AssessmentResult.GetAssesment_Output?.listOfAdfcaMobilitySalesAssessmentField === '') {
                if (response.data.Get_AssessmentResult.GetAssesment_Output?.statusField === 'Failed') {
                    toast('Empty Checklist');
                    dispatch({ type: 'HIDE_LOADER' });
                    return;
                }
                console.log('dataAssessmentt', JSON.stringify(response.data))

                const data = response.data.Get_AssessmentResult.GetAssesment_Output.listOfAdfcaMobilitySalesAssessmentField[0].listOfSalesAssessmentAttributeField;
                AsyncStorage.setItem('dataAssessmentt', JSON.stringify(data))
                console.log('Get_Assessment--------'/* dataObj */ /* JSON.stringify(formattedObj) */);

                // dispatch({ type: 'HIDE_LOADER' });

                if (response.data.Get_AssessmentResult.ErrorDesc !== "Failed") {
                    console.log('comi------', item.inspectionNumberField);
                    toast('Please wait...')
                    // dispatch({ type: 'GET_ASSESSMENT', payload: formattedObj/*  payload: {data:formattedObj,loading:false}  */ });

                    dispatch({ type: 'HIDE_LOADER' });
                    //  NavigationService.navigate('TaskDetails', { taskId: TaskId });

                } else {
                    console.log('wrong');
                    return result({ error: ErrorMsg })
                }
            }).catch((err) => {
                console.log('catch');
                toast('Network Error');

                dispatch({ type: 'HIDE_LOADER' });
            })
    } catch (e) {
        //console.log('GET_INSPECTION_DETAILS_ERROR', e.ErrorMsg);
        dispatch({ type: 'HIDE_LOADER' });
        toast('Network Error');
        return
    }

    // dispatch({ type: 'GET_CHECK_LIST', payload: false });
}

export const Get_Assessment_New = (item, result, subChecked) => async (dispatch) => {
    // console.log('task_Get_Assessment', item.inspectionNumberField);
    console.log('itemfrom action', item);
    console.log('subCheckedfrom_action_Get_Assessment_New', subChecked);
    dispatch({ type: 'SHOW_LOADER' });


    let postUrl = SMARTCONTROL + GetAssessment;

    console.log('Get_Assessment_new', postUrl);

    let postData = {
        "TemplateName": subChecked?.LanguageIndependentCode ? subChecked.LanguageIndependentCode : 'Self Inspection-Food'
        // "TemplateName": "Final FSMS Audit Inspection"
        //"TemplateName": "Self Inspection-Food"


    };
    console.log('Get_Assessment_new_postData', postData);

    try {
        axios({
            method: "POST",
            url: postUrl,
            timeout: 1000 * 16,
            data: JSON.stringify(postData),
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(function (response) {
                // console.log('Get_Assessment_new_Response', response.data.Data);
                // let resp = response.data.Data; 
                let resp = JSON.parse(response.data.Data)
                if (resp.ListOfAdfcaMobilitySalesAssessment == null) {
                    toast('Empty Checklist');
                    dispatch({ type: 'HIDE_LOADER' });
                    return;
                }
                const data = resp.ListOfAdfcaMobilitySalesAssessment.SalesAssessmentTemplate[0].ListOfSalesAssessmentAttribute;
                console.log('FSMS_data', data);
                console.log('to test',);
                // console.log('response.data.Message', response.data.Message);

                // if (true) {
                console.log('test',);
                //toast('Please wait...')
                // dispatch({ type: 'GET_ASSESSMENT', payload: formattedObj/*  payload: {data:formattedObj,loading:false}  */ });
                toast('Please wait...')
                let salesAssessmentArray = [];
                let salesAssessmentTemplate = resp.ListOfAdfcaMobilitySalesAssessment.SalesAssessmentTemplate;
                // console.log('salesAssessmentTemplate test',);
                // console.log('salesAssessmentTemplate', resp.ListOfAdfcaMobilitySalesAssessment.SalesAssessmentTemplate);
                // console.log('salesAssessmentTemplatesalesAssessmentTemplate', salesAssessmentTemplate);
                for (let index = 0; index < salesAssessmentTemplate.length; index++) {
                    const element = salesAssessmentTemplate[index];
                    let salesAssessmentAttribute = element.ListOfSalesAssessmentAttribute.SalesAssessmentAttribute;
                    for (let indexSalesAssessment = 0; indexSalesAssessment < salesAssessmentAttribute.length; indexSalesAssessment++) {
                        const elementSalesAssessment = salesAssessmentAttribute[indexSalesAssessment];
                        // const elementSalesAssessmentValue=elementSalesAssessment.ListOfSalesAssessmentAttributeValue
                        // let decs=elementSalesAssessmentValue.SalesAssessmentAttributeValue[indexSalesAssessment].Description;
                        let saleAssessmentObj = {};
                        saleAssessmentObj.attributeNameField = elementSalesAssessment.Name;
                        saleAssessmentObj.orderField = elementSalesAssessment.Order;
                        saleAssessmentObj.Description3 = elementSalesAssessment.Category;
                        saleAssessmentObj.comment2Field = /* elementSalesAssessment.Description ? elementSalesAssessment.Description : */ '';
                        saleAssessmentObj.scoreField = ""/* elementSalesAssessment.ListOfSalesAssessmentAttributeValue.SalesAssessmentAttributeValue */;
                        //  saleAssessmentObj.scoredata = elementSalesAssessment.ListOfSalesAssessmentAttributeValue.SalesAssessmentAttributeValue;
                        saleAssessmentObj.valueField = '';
                        saleAssessmentObj.weightField = 1;
                        salesAssessmentArray.push(saleAssessmentObj);
                    }
                    // console.log('salesAssessmentArray', salesAssessmentArray);

                    let DataObj = {};

                    salesAssessmentArray.forEach(e => {
                        console.log('ee', e);
                        if (DataObj[e.Description3]) {
                            DataObj[e.Description3].push(e);
                        } else {
                            DataObj[e.Description3] = [e];
                        }
                    });
                    // console.log('salesAssessmentArray', salesAssessmentArray);
                    // console.log('salesAssessmentArray_DataObj', DataObj);

                    let formattedObj = Object.values(DataObj).map((item, index) => ({
                        title: item[0].Description3,
                        data: item
                    }))
                    // console.log('formattedObjformattedObj', formattedObj);

                    dispatch({ type: 'GET_CHECK_LIST', payload: formattedObj, dataObj: salesAssessmentArray });
                    NavigationService.navigate('TaskDetails', { taskId: item.inspectionNumberField, statusField: item.statusField, item: item, nearestDateField: "", subChecked: subChecked });
                    dispatch({ type: 'HIDE_LOADER' });
                }
                dispatch({ type: 'HIDE_LOADER' });

            }).catch((err) => {
                console.log('catch', err);
                toast('Network Error');

                dispatch({ type: 'HIDE_LOADER' });
            })
    } catch (e) {
        //console.log('GET_INSPECTION_DETAILS_ERROR', e.ErrorMsg);
        dispatch({ type: 'HIDE_LOADER' });
        toast('Network Error');
        return
    }

    // dispatch({ type: 'GET_CHECK_LIST', payload: false });
}

export const GetLOVDetails = () => async (dispatch) => {
    dispatch({ type: 'SHOW_LOADER' });

    let postUrl = SMARTCONTROL + LOV;

    console.log('GetLOVDetails', postUrl);

    let postData = {
        "InterfaceID": "ADFCA_CRM_SBL_061",
        "ApplicationType": "ADAFSA_SI_TEMP_NAME",
        "LanguageName": ""
    };

    try {
        axios({
            method: "POST",
            url: postUrl,
            data: JSON.stringify(postData),
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(function (response) {
                let resp = JSON.parse(response.data.Data)
                if (resp.GetLookupValuesResponse == null) {
                    toast('Empty Checklist Template');
                    dispatch({ type: 'HIDE_LOADER' });
                    return;
                }
                const data = resp.GetLookupValuesResponse.Lookup;
                console.log('LOVlength', data);
                if (data.length) {
                    dispatch({ type: 'GET_LOV_DETAILS', payload: data });
                    dispatch({ type: 'HIDE_LOADER' });

                } else {
                    console.log('wrong');
                    return result({ error: data.Status })
                    dispatch({ type: 'HIDE_LOADER' });

                }
            }).catch((err) => async (dispatch) => {
                dispatch({ type: 'HIDE_LOADER' });
            })
    } catch (e) {
        console.log('GET_INSPECTION_DETAILS_ERROR', e.ErrorMsg);
        // dispatch({ type: 'HIDE_LOADER' });
    }
}

export const GetInspectionDetails = () => async (dispatch) => {
    console.log('');
    // dispatch({ type: 'SHOW_LOADER' });

    const dateob = await getDateTimeFromServer();

    const dateInUtc = getDateInUtc(dateob.data);
    const encryptedServerDate = Encrypt(dateInUtc);


    let postUrl = APP_SERVICE_URL + SELFINSPECTION_SERVICE + "/" + encryptedServerDate + "/" + dateInUtc + "/" + "Get_Inspection_Details";

    console.log('getchecklist', postUrl);
    let postData = {
        _Input: {
            Attribute1: "1-7SCZKK",
        }
    };

    try {
        axios({
            method: "POST",
            url: postUrl,
            data: JSON.stringify(postData),
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(function (response) {
                console.log('getcl', response.data.Get_Inspection_DetailsResult.Get_Inspection_Details_Output.getTaskField);
                let data = response.data.Get_Inspection_DetailsResult.Get_Inspection_Details_Output.getTaskField[0];
                console.log('data', data);
                dispatch({ type: 'HIDE_LOADER' });
                console.log('getmethod_inside');

                if (response.data.Get_Inspection_DetailsResult.ErrorCode == "0") {
                    dispatch({ type: 'GET_INSPECTION_DETAILS', payload: data });
                } else {
                    console.log('wrong');
                    return result({ error: response.data.Get_Inspection_DetailsResult.Get_Inspection_Details_Output.statusField })
                }
            }).catch((err) => async (dispatch) => {
                dispatch({ type: 'HIDE_LOADER' });
            })
    } catch (e) {
        console.log('GET_INSPECTION_DETAILS_ERROR', e.ErrorMsg);
        // dispatch({ type: 'HIDE_LOADER' });
    }
}

export const GetCheckList = (subChecked, item, result) => async (dispatch) => {
    dispatch({ type: 'SHOW_LOADER' });

    console.log('task_GetCheckList', item.inspectionNumberField);
    console.log('task_GetCheckList item', item?.statusField);
    console.log('subChecked_GetCheckList', subChecked);

    const dateob = await getDateTimeFromServer();
    if (typeof dateob == 'undefined') {
        console.log('failure from server check',);
        dispatch({ type: 'HIDE_LOADER' });

    }
    let templatename = '';

    let dateInUtc = getDateInUtc(dateob.data);
    const encryptedServerDate = Encrypt(dateInUtc);


    // if (item.statusField === 'Scheduled') {
    //     let postUrl = APP_SERVICE_URL + SELFINSPECTION_SERVICE + "/" + encryptedServerDate + "/" + dateInUtc + "/" + "Send_Acknowledge";
    //     console.log('post url from send acknowledge', postUrl);
    //     let postData = {
    //         _Input: {
    //             InterfaceID: "ADFCA_CRM_SBL_068",
    //             Longitude: "",
    //             Latitude: "",
    //             DateTime: "",
    //             Comments: "",
    //             LanguageType: "ENU",
    //             InspectorName: "",
    //             RequestType: "",
    //             Reason: "",
    //             TaskStatus: "Acknowledged",
    //             TaskId: item.inspectionNumberField,
    //             InspectorId: "",
    //             PreposedDateTime: ""
    //         }
    //     }
    //     console.log('postData from send acknowledge', postData);

    //     try {
    //         axios({
    //             method: "POST",
    //             url: postUrl,
    //             timeout: 1000 * 13,
    //             data: JSON.stringify(postData),
    //             headers: {
    //                 "Content-Type": "application/json",
    //             }
    //         })
    //             .then(async function (response) {
    //                 var data = response.data;
    //                 console.log('sendAcKnowledgedata', data);
    //                 if (data.Send_AcknowledgeResult.Send_Acknowledge_Output.statusField === 'Failed') {
    //                     toast(data.Send_AcknowledgeResult.Send_Acknowledge_Output.errorMessageField)

    //                 }
    //             }).catch((err) => {
    //                 dispatch({ type: 'HIDE_LOADER' });
    //                 return
    //             })
    //     } catch (e) {
    //         console.log('GET_ACKNOWLEDGE_ERROR', e.ErrorMsg); toast('Network Error');
    //         dispatch({ type: 'HIDE_LOADER' });
    //         return
    //     }
    // }

    let postUrl = APP_SERVICE_URL + SELFINSPECTION_SERVICE + "/" + encryptedServerDate + "/" + dateInUtc + "/" + "Get_Check_List";
    console.log('GetCheckList', postUrl);

    let TaskId;
    if ((item.inspectionTypeField === 'Vehicle Self Inspection') && (item.statusField == 'Scheduled' || item.statusField == 'Acknowledged')) {
        //For dev
        // TaskId = '1-1046099439';
        //For prod
        TaskId = '1-13602897619';

    } else if ((item.inspectionTypeField === 'Vehicle Self Inspection') && (item.statusField == 'Satisfactory' || item.statusField == 'Unsatisfactory')) {
        TaskId = item.inspectionNumberField
    } else {
        TaskId = item.inspectionNumberField
    }

    let postData = {
        _Input: {
            InterfaceID: "ADFCA_CRM_SBL_067",
            LanguageType: "ENU",
            InspectorName: "",
            TaskId: TaskId,
            InspectorId: "",
        }
    };
    console.log('payload_getchecklist', postData);

    try {
        axios({
            method: "POST",
            url: postUrl,
            timeout: 1000 * 13,
            data: JSON.stringify(postData),
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(async function (response) {
                if (!subChecked) {
                    console.log('emptysubChecked_GetCheckList',);
                    templatename=response.data.Get_Check_ListResult.Get_Check_List_Output.inspectionCheckListField[0].listOfSalesAssessmentField[0].template_NameField;
                    console.log('templatename', templatename);
                }
                var data = response.data.Get_Check_ListResult.Get_Check_List_Output.inspectionCheckListField[0].listOfSalesAssessmentField[0].listOfSalesAssessmentValueField/* .inspectionCheckListField[0].listOfSalesAssessmentField[0].listOfSalesAssessmentValueField */;
                console.log('checkdataChecklist', response.data);
                let testData = response.data.Get_Check_ListResult.Get_Check_List_Output.inspectionCheckListField[0].listOfSalesAssessmentField;
                console.log('testData', testData);
                console.log('length', testData.length);
                if (response.data.Get_Check_ListResult.ErrorCode == "0") {
                    if (response.data.Get_Check_ListResult.Get_Check_List_Output.inspectionCheckListField[0].listOfSalesAssessmentField.length > 0) {
                        let nearestDateField = response.data.Get_Check_ListResult.Get_Check_List_Output.inspectionCheckListField[0].nearestDateField
                        // alert(nearestDateField)
                        console.log('before fetching',);
                        await AsyncStorage.getItem("dataAssessmentt").then((value) => {
                            console.log('after fetching',);

                            let valueFormatted = JSON.parse(value);
                            const dataObj = data.map(item => {
                                const filteredData = valueFormatted.filter(e => e.nameField === item.attributeNameField)
                                console.log('filterdata',);
                                console.log('filterdata', filteredData);
                                if (filteredData.length) {
                                    return {
                                        ...item,
                                        /*     Comment:item.comment2Field, 
                                            Order:item.orderField,
                                            Score:item.scoreField,
                                            valueField:item.Value,
                                            Weight:item.weightField,
                                            AttributeName:item.attributeNameField, */
                                        Description3: filteredData[0].descriptionField
                                    }
                                }
                            });
                            //   console.log('dataobj', dataObj);

                            let DataObj = {};
                            console.log('DataObjbefore', dataObj)

                            dataObj.forEach(e => {
                                if (DataObj[e.Description3]) {
                                    DataObj[e.Description3].push(e);
                                } else {
                                    DataObj[e.Description3] = [e];
                                }
                            });
                            console.log('DataObj', DataObj)
                            const formattedObj = Object.values(DataObj).map((item, index) => ({
                                title: item[0].Description3,
                                data: item
                            }
                            ))
                            console.log('formattedobj', JSON.stringify(formattedObj));
                            dispatch({ type: 'GET_CHECK_LIST', payload: formattedObj, dataObj: dataObj });
                            // toast('Success')

                            //  console.log('formattedObj', JSON.stringify(formattedObj));

                            console.log('TaskIdfrom action in checklist', item.inspectionNumberField);

                            // NavigationService.navigate('TaskDetails', { taskId: item.inspectionNumberField, statusField: item.statusField, item: item, nearestDateField: nearestDateField });
                            NavigationService.navigate('TaskDetails', { taskId: item.inspectionNumberField, statusField: item.statusField, item: item, nearestDateField: "", subChecked: subChecked, templatename: templatename });

                            dispatch({ type: 'HIDE_LOADER' });

                            //   console.log('dataObj', dataObj);
                        })
                            .then(res => {
                                //do something else
                            });
                    } else {
                        toast('Network Error');
                        return
                    }

                } else {

                    return result({ error: response.data.Get_Inspection_DetailsResult.Get_Inspection_Details_Output.statusField })
                }
            }).catch((err) => {
                console.log('catch');

                dispatch({ type: 'HIDE_LOADER' });
                return
            })
    } catch (e) {
        console.log('GET_CHECK_LIST_ERROR', e.ErrorMsg); toast('Network Error');
        dispatch({ type: 'HIDE_LOADER' });

        return
    }

    // dispatch({ type: 'GET_CHECK_LIST', payload: false });
}

export const CallToGetInspectionReport = (data, type) => async (dispatch) => {
    dispatch({ type: 'SHOW_LOADER' });

    console.log('CallToGetInspectionReport_taskid', data);
    // var path = DownloadDirectoryPath + '/' + data + "_SibleReport.pdf";
    // console.log('path callToGetInspectionReport', path);
    // "ReferenceId": "1-2796924481",
    let postData = {
        "InterfaceID": "ADFCA_CRM_SBL_058",
        "LanguageType": "ENG",
        "ReferenceId": data,
        "EntityName": type == 'No Objection Certificate' ? "SR" : "Inspection"
    }

    console.log('postData_report', postData);
    let postUrl = 'https://smartcontrol.adafsa.gov.ae/resources/SOA_PROD/GBL_ADFCA_SERV_GetPaymentReport_RestSC/GetPaymentRestService/InspectionReport'

    try {
        axios({
            method: "POST",
            url: postUrl,
            timeout: 1000 * 3,
            data: JSON.stringify(postData),
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(function (response) {

                const data = response.data.Data;


                // dispatch({ type: 'HIDE_LOADER' });
                // console.log('Error_REPORT', data.ErrorMessage);
                if (response.data) {
                    // console.log('GET_INSPECTION_REPORT', JSON.stringify(response));
                    console.log('GET_INSPECTION_REPORT', response.data.Data);
                    dispatch({ type: 'HIDE_LOADER' });
                    dispatch({ type: 'GET_INSPECTION_REPORT', payload: data });
                    //toast('Attached Successfully')
                    //  return callback('Success')
                    // NavigationService.navigate('TaskDetails');

                } else {
                    toast(response.data.Data.ErrorMessage)
                    console.log('wrong');
                    //   return callback('Failed')

                }
            }).catch((err) => {
                console.log('catch', err);

                dispatch({ type: 'HIDE_LOADER' });
            })
    } catch (e) {
        //console.log('GET_INSPECTION_DETAILS_ERROR', e.ErrorMsg);
        dispatch({ type: 'HIDE_LOADER' });
    }

    // dispatch({ type: 'GET_CHECK_LIST', payload: false });
}

export const Add_Questionnaires_Attachment = (data, callback) => async (dispatch) => {
    console.log('Add_Questionnaires_Attachment123', data);
    dispatch({ type: 'SHOW_LOADER' });

    const dateob = await getDateTimeFromServer();

    if (typeof dateob == 'undefined') {
        toast('Network Error')
        console.log('failure from server assess',);
        dispatch({ type: 'HIDE_LOADER' });

    }

    const dateInUtc = getDateInUtc(dateob.data);
    const encryptedServerDate = Encrypt(dateInUtc);


    let postUrl = APP_SERVICE_URL + SELFINSPECTION_SERVICE + "/" + encryptedServerDate + "/" + dateInUtc + "/" + "Add_Questionnaires_Attachment";

    console.log('Add_Questionnaires_Attachment', postUrl);
    let postData = data
    console.log('payload_Add_Questionnaires_Attachment', postData);
    try {
        axios({
            method: "POST",
            url: postUrl,
            timeout: 1000 * 3,
            data: JSON.stringify(postData),
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(function (response) {
                console.log('Add_Questionnaires_Attachment', response.data);
                const data = response.data.Add_Questionnaires_AttachmentResult.Add_Questionnaires_Attachment_Output;
                console.log('edited_Add_Questionnaires_Attachment', data);


                // dispatch({ type: 'HIDE_LOADER' });

                if (data.statusField == "Success") {
                    dispatch({ type: 'HIDE_LOADER' });
                    // dispatch({ type: 'ADD_QUESTIONNAIRES_ATTACHMENT', payload: data.statusField });
                    toast('Attached Successfully')
                    return callback('Success')
                    // NavigationService.navigate('TaskDetails');

                } else {
                    console.log('wrong');
                    return callback('Failed')

                }
            }).catch((err) => {
                console.log('catch');

                dispatch({ type: 'HIDE_LOADER' });
            })
    } catch (e) {
        //console.log('GET_INSPECTION_DETAILS_ERROR', e.ErrorMsg);
        dispatch({ type: 'HIDE_LOADER' });
    }

    // dispatch({ type: 'GET_CHECK_LIST', payload: false });
}

export const Update_Assessment = (data, IType, callback) => async (dispatch) => {
    //console.log('task_Get_Assessment', data.inspectionNumberField);
    console.log('updateassesment action', JSON.stringify(data));
    dispatch({ type: 'SHOW_LOADER' });

    const dateob = await getDateTimeFromServer();

    if (typeof dateob == 'undefined') {
        toast('Network Error')
        console.log('failure from server assess',);
        dispatch({ type: 'HIDE_LOADER' });

    }

    const dateInUtc = getDateInUtc(dateob.data);
    const encryptedServerDate = Encrypt(dateInUtc);


    //  let postUrl = IType == 'Direct Self Inspection' ? SMARTCONTROL + UpdateAssessment : APP_SERVICE_URL + SELFINSPECTION_SERVICE + "/" + encryptedServerDate + "/" + dateInUtc + "/" + "Update_Assessment";
    // let postUrl = IType == 'Vehicle Self Inspection' ? APP_SERVICE_URL + SELFINSPECTION_SERVICE + "/" + encryptedServerDate + "/" + dateInUtc + "/" + "Update_Assessment" : SMARTCONTROL + UpdateAssessment;
    let postUrl = APP_SERVICE_URL + SELFINSPECTION_SERVICE + "/" + encryptedServerDate + "/" + dateInUtc + "/" + "Update_Assessment";

    console.log('Update_Assessment', postUrl);
    // console.log('checktaskid', item.inspectionTypeField !== 'Vehicle Self Inspection' && item.inspectionTypeField);

    // let TaskId = item.inspectionTypeField === 'Vehicle Self Inspection' ? '1-1046099439' : item.inspectionNumberField;
    //console.log('conditionTASKID', TaskId);
    let postData = data;

    //  console.log('payload_getAssement', JSON.parse(postData));

    try {
        axios({
            method: "POST",
            url: postUrl,
            data: JSON.stringify(postData),
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(function (response) {
                //dispatch({ type: 'HIDE_LOADER' });
                console.log('Update_AssessmentResponse', response.data);
                if (response?.data?.Data) {
                    let data = JSON.parse(response.data.Data)
                    if (data.Status == 'Failed') {
                        toast(data.ErrorMessage);
                        dispatch({ type: 'HIDE_LOADER' });
                        return callback('Success')
                    } else {
                        dispatch({ type: 'HIDE_LOADER' });
                        return callback('Success')
                    }
                } else if (response?.data?.Update_AssessmentResult) {
                    let data = response.data.Update_AssessmentResult;
                    console.log('Update_Assessment--------', data);



                    if (data.ErrorDesc === "Success") {

                        console.log('data.ErrorDesc ', data.errorMessageField);
                        toast('Success');

                        dispatch({ type: 'HIDE_LOADER' });
                        return callback('Success')
                    } else if (data.ErrorCode == "402") {
                        toast(data.ErrorDesc);
                        dispatch({ type: 'HIDE_LOADER' });
                        return;
                    }
                }
                else {
                    console.log('wrong');
                    dispatch({ type: 'HIDE_LOADER' });
                    NavigationService.goBack();
                    //console.log('data.ErrorDesc ', data.errorMessageField);
                    toast(response?.data?.Update_AssessmentResult.ErrorDesc)
                    return result({ error: ErrorMsg })
                }
            }).catch((err) => async (dispatch) => {
                dispatch({ type: 'HIDE_LOADER' });
            })
    } catch (e) {
        //console.log('GET_INSPECTION_DETAILS_ERROR', e.ErrorMsg);
        dispatch({ type: 'HIDE_LOADER' });
        toast('Network Error');
        return
    }

    // dispatch({ type: 'GET_CHECK_LIST', payload: false });
}

export const Recall = () => async (dispatch) => {
    dispatch({ type: 'SHOW_LOADER' });

    const dateob = await getDateTimeFromServer();

    const dateInUtc = getDateInUtc(dateob.data);
    const encryptedServerDate = Encrypt(dateInUtc);


    let postUrl = STAGE_API + MOBILE_SERVICE + "/" + encryptedServerDate + "/" + dateInUtc + "/" + "GetRecalls?P_Lang=en";

    console.log('Recall', postUrl);

    try {
        axios({
            method: "GET",
            timeout: 1000 * 10,
            url: postUrl,
        })
            .then((response) => {
                console.log('recall response', response.data.GetRecallsResult);
                let resp = response.data;
                if (resp.GetRecallsResult.ErrorDesc == "Success") {
                    console.log('recall success',);
                    dispatch({ type: 'HIDE_LOADER' });

                    // toast('Success')
                    console.log('toast success',);
                    dispatch({ type: 'RECALL', payload: response.data?.GetRecallsResult?.RecallEntities });

                } else {
                    dispatch({ type: 'HIDE_LOADER' });
                    return;
                }
            }).catch((err) => async (dispatch) => {
                dispatch({ type: 'HIDE_LOADER' });
            })
    } catch (e) {
        dispatch({ type: 'HIDE_LOADER' });
    }

    // dispatch({ type: 'GET_CHECK_LIST', payload: false });
}

export const GetDeviceDetailsByLicenseNo = () => async (dispatch) => {
    dispatch({ type: 'SHOW_LOADER' });

    const dateob = await getDateTimeFromServer();

    const dateInUtc = getDateInUtc(dateob.data);
    const encryptedServerDate = Encrypt(dateInUtc);


    let postUrl = APP_SERVICE_URL + SELFINSPECTION_SERVICE + "/" + encryptedServerDate + "/" + dateInUtc + "/" + "GetDeviceDetailsByLicenseNo";
    const LicenseNO = await AsyncStorage.getItem('LicenseNO');

    console.log('GetDeviceDetailsByLicenseNo', postUrl);
    let postData = {
        _Input:
        {
            LicenseNo: LicenseNO
        }
    };

    try {
        axios({
            method: "POST",
            url: postUrl,
            data: JSON.stringify(postData),
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((response) => {
                console.log('GetDeviceDetailsByLicenseNo', response.data.GetDeviceDetailsByLicenseNoResult);
                let resp = response.data;
                console.log('GetDeviceDetailsByLicenseNo', resp);
                const userList = [];
                if (resp.GetDeviceDetailsByLicenseNoResult.ErrorDesc == "Success") {

                    resp = resp.GetDeviceDetailsByLicenseNoResult.DeviceDetails;
                    for (let j = 0; j < resp.length; j++) {
                        let obj = {};
                        if (resp[j].DeviceType) {
                            obj.deviceType = resp[j].DeviceType;
                        }
                        if (resp[j].DeviceToken) {
                            obj.deviceToken = resp[j].DeviceToken;
                            userList.push(obj);
                        }
                    }
                    if (userList.length) {

                    }

                    //  dispatch({ type: 'GET_DEVICE_DETAILS_BY_LICENSE_NO', payload: data });
                    // toast('Success')
                    dispatch({ type: 'HIDE_LOADER' });
                    dispatch(Get_Assessment(taskid));
                } else {
                    toast('FAILURE');
                    dispatch({ type: 'HIDE_LOADER' });

                    return;
                }
            }).catch((err) => async (dispatch) => {
                dispatch({ type: 'HIDE_LOADER' });

            })


    } catch (e) {
        dispatch({ type: 'HIDE_LOADER' });

    }

    // dispatch({ type: 'GET_CHECK_LIST', payload: false });
}



export const signOut = () => async (dispatch) => {
    //removeAsync('userToken')
    try {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userdetails');
        await AsyncStorage.removeItem('dataAssessmentt');

    } catch (e) {
        // saving error
    }
    dispatch({ type: 'LOGOUT' });
    NavigationService.navigate('Login');

}

export const retrieveToken = () => async (dispatch) => {
    setTimeout(async () => {
        let userToken;
        userToken = null;
        //   userToken=GetAsync('userToken');
        try {
            userToken = await AsyncStorage.getItem('userToken')
        } catch (e) {
            // saving error
        }
        console.log('usertoken_from_retrive',);
        dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });

    }, 1000);

}

export const ShowModal = () => async (dispatch) => {
    console.log('modalpreseed')
    dispatch({ type: 'SHOW_MODAL' });
}

export const Pushnotificationcreen = () => async (dispatch) => {
    console.log('Pushnotificationcreen')
    dispatch({ type: 'PUSHNOTIFICATION_SCREEN' });
}


