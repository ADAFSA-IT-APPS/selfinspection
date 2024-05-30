//import liraries
import React, { Component, useState, useRef, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Navbar from '../Components/Navbar/Navbar';
import TabToggle from '../Components/Navbar/tabToggle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SI_ImageCont from '../Components/SI_ImageCont';
import { IconLeftActiveRoutine, IconRightActive, IconRightInActive, IconLeftInActiveRoutine, ActiveScheduledTask, ActiveCompletedTask, InactiveScheduledTask, InactiveCompletedTask } from '../Util/CommonStyle'
import { useDispatch, useSelector } from 'react-redux';
import ModalCreateNewIns from '../Components/modals/ModalCreateNewIns';
import { GetLOVDetails,AdhocInspection, Get_Assessment, Get_Assessment_New, GetCheckList, Search_Establishment_History } from '../Redux/actions/SI_Action';
import CustomeError from '../Components/modals/CustomeError';
import Loading from '../Components/Loading';
import { useTranslation } from 'react-i18next';
import ChecklistView from '../Components/ChecklistView';

// create a component

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const RoutineSelf = ({ navigation }) => {
    const dispatch = useDispatch();
    const [focusedScreen, setFocusedScreen] = React.useState(1);
    const Eshtablisment_Inspection_Type = useSelector(state => state.Eshtablisment_Inspection_Type);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalChecklistVisible, setModalChecklistVisible] = useState(false);
    const [taskItem, setTaskItem] = useState('');
    const lovDetails = useSelector(state => state.lovDetails);

    const [subChecked, setSubChecked] = React.useState(lovDetails[0]?.Value);
    const [subCheckedItem, setSubCheckedItem] = React.useState('');
    const state = useSelector(state => state);
    const alertRef = useRef();
    const { t, i18n } = useTranslation();


    useEffect(() => {
        dispatch(Search_Establishment_History());
        dispatch(GetLOVDetails((result) => {
            console.log('sssssss', result);
            console.log('lovDetails', lovDetails);
            alertRef.current.show(result.error);
        }));
    }, [dispatch])


    const openTask = (taskId, item) => {
        // dispatch(Get_Assessment(item, (result) => {
        //     console.log('sssssss', result);
        //     alertRef.current.show(result.error);
        // }));
        // dispatch(GetCheckList(item, (result) => {
        //     console.log('sssssss', result);
        //     alertRef.current.show(result.error);
        // }));
        console.log('openTask', item);


        if (item.inspectionTypeField == 'Follow Up Self Inspection'&&item.statusField !== 'Satisfactory' && item.statusField !== 'Unsatisfactory') {
            dispatch(Get_Assessment_New(item, '', subCheckedItem));

        } else   if (item.inspectionTypeField == 'Self Inspection'&&item.statusField !== 'Satisfactory' && item.statusField !== 'Unsatisfactory') {
            dispatch(Get_Assessment_New(item, '', subCheckedItem));

        } else {
            /*Added Get_Assessment_New */
            dispatch(Get_Assessment(item, (result) => {
                alertRef.current.show(result.error);
            }));
            dispatch(GetCheckList(item, (result) => {
                alertRef.current.show(result.error);
            }));
        }
    }

    const getInspectionType = (IType, subtype) => {
        console.log('lovDetails', lovDetails);
        // console.log('subtypeitem', subtype);
        // if (IType == 'Direct Self Inspection') {
        //     console.log('dsi');
        //     setSubChecked(subtype?.Value)
        //     setSubCheckedItem(subtype)
        // } else {
        //     setSubChecked("")

        //     setChecked('Vehicle Self Inspection')
        // }
        setSubChecked(subtype?.Value)
        setSubCheckedItem(subtype)
    }
    const openChecklistModal = (item) => {
        console.log('taskItem', taskItem);

        setModalChecklistVisible(!modalChecklistVisible)
        setTaskItem(item)
    }
    return (
        <View style={styles.container}>
            {state.isLoading && <Loading />}
            <Navbar nav={'tab'} />
            <View>
                <TabToggle focusedScreen={focusedScreen} setFocusedScreen={setFocusedScreen} leftText={t('ScheduledTasks')} rightText={t('CompletedTasks')} IconLeftActive={IconLeftActiveRoutine} IconRightActive={IconRightActive} IconLeftInActive={IconLeftInActiveRoutine} IconRightInActive={IconRightInActive} />
            </View>
            <SI_ImageCont />
            {focusedScreen == 1 ?
                <View style={{ alignItems: 'center', justifyContent: 'center'/* , flex: 1 */, }}>
                    {modalChecklistVisible &&
                        <View style={styles.centeredView}>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalChecklistVisible}
                                onRequestClose={() => {
                                    setModalChecklistVisible(!modalChecklistVisible)
                                }}
                            >
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <View style={{ alignSelf: 'flex-start', }}>
                                            <Text style={{ color: '#5d6674', fontSize: 16, paddingBottom: 10 }}>Select Checklist Type</Text>
                                            <ChecklistView subChecked={subChecked} getInspectionType={getInspectionType} />
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <TouchableOpacity
                                                    style={[styles.button, styles.buttonClose]}
                                                    onPress={() => openTask(taskItem.inspectionNumberField, taskItem)}
                                                >
                                                    <Text style={styles.textStyle}>Open</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={[styles.button, styles.buttonClose]}
                                                    onPress={() => setModalChecklistVisible(!modalChecklistVisible)}
                                                >
                                                    <Text style={styles.textStyle}>Close</Text>
                                                </TouchableOpacity>
                                            </View>

                                        </View>

                                    </View>
                                </View>
                            </Modal>
                        </View>
                    }
                    <ScrollView style={{ height: height / 1.8, width: width / 1.05 }}>
                        {Eshtablisment_Inspection_Type.map((item, key) => (

                            <View style={{ width: '100%', borderColor: 'red' }}>
                                {(/* item.title === 'Routine Inspection' ||  */item.title === 'Follow Up Self Inspection' || item.title === 'Self Inspection') &&
                                    <View>
                                        {item.data.map((item, index) => (
                                            (item.statusField !== 'Satisfactory' && item.statusField !== 'Cancelled' && item.statusField !== 'Unsatisfactory') &&
                                            <TouchableOpacity key={index} onPress={() => openChecklistModal( item)} style={styles.taskCont}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', }}>
                                                    <Text style={styles.textWhite}>{item.priorityField ? item.priorityField : 'Medium'}</Text>
                                                    <Text style={styles.textWhite}>{item.inspectionNumberField}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingTop: '5%' }}>
                                                    <Text style={styles.textWhite}>{item.creationDateField}</Text>
                                                    <Text style={styles.textWhite}>{item.inspectionTypeField}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        ))}
                                    </View>

                                }
                            </View>

                        ))}
                    </ScrollView>
                </View>

                :
                <View style={{ alignItems: 'center', justifyContent: 'center'/* , flex: 1 */, }}>

                    <ScrollView style={{ height: height / 1.8, width: width / 1.05 }}>
                        {Eshtablisment_Inspection_Type.map((item, key) => (

                            <View style={{ width: '100%', borderColor: 'red' }}>
                                {(item.title === 'Self Inspection' || item.title === 'Follow Up Self Inspection') &&
                                    <View>
                                        {item.data.map((item, index) => (
                                            ((item.statusField === 'Satisfactory' || item.statusField === 'Unsatisfactory') && item.statusField !== 'Cancelled') &&
                                            <TouchableOpacity key={index} onPress={() => openTask(item.inspectionNumberField, item)} style={styles.taskCont}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', }}>
                                                    <Text style={styles.textWhite}>{item.statusField ? item.statusField : 'Medium'}</Text>
                                                    <Text style={styles.textWhite}>{item.inspectionNumberField}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingTop: '5%' }}>
                                                    <Text style={styles.textWhite}>{item.actualInspectionDateField ? item.actualInspectionDateField : '-'}</Text>
                                                    <Text style={styles.textWhite}>{item.inspectionTypeField}</Text>
                                                </View>
                                            </TouchableOpacity>

                                        ))}
                                    </View>

                                }
                            </View>

                        ))}
                    </ScrollView>
                </View>


            }
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    taskCont: { backgroundColor: '#5c6672', paddingHorizontal: 10, borderRadius: 5, marginHorizontal: 10, marginVertical: 10, paddingVertical: 15 },
    textWhite: { flex: 1, color: '#fff', alignItems: 'center', justifyContent: 'center', textAlign: 'center' },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        /*     marginTop: 22, */
        backgroundColor: '#00000030'
    },
    input: {
        height: 40,
        borderWidth: 1,
        width: '50%',
        borderColor: '#5d6674',
        padding: 10, margin: 12, color: '#5d6674',
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        borderColor: '#5d6674',
        borderWidth: 1,
        paddingHorizontal: 15,
        paddingVertical: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 5,
        paddingHorizontal: '14%',
        paddingVertical: '3%',
        elevation: 2
    },
    buttonClose: {
        backgroundColor: "#5d6674",
    },
    buttonOK: {
        backgroundColor: "#5d6674",
        marginRight: 5
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    tabBarLogo: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    imageCont: { width: 200, height: 200,/* borderColor:'red',borderWidth:1, */marginBottom: 15 /* height: '9%',  *//* marginVertical: 10, alignItems: 'center', justifyContent: 'center' */ },
});

//make this component available to the app
export default RoutineSelf;
