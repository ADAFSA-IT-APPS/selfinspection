//import liraries
import React, { useState, useRef, useEffect } from 'react';
import TabToggle from '../Components/Navbar/tabToggle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SI_ImageCont from '../Components/SI_ImageCont';
import { RadioButton } from 'react-native-paper';
import { IconRightActive, IconLeftActive, IconLeftInActive, IconRightInActive } from '../Util/CommonStyle'
import { View, Text, Modal, StyleSheet, Pressable, Image, TouchableOpacity, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import Navbar from '../Components/Navbar/Navbar';
import { GetLOVDetails, Get_Assessment, Get_Assessment_New, GetCheckList, Search_Establishment_History } from '../Redux/actions/SI_Action';
import ModalCreateNewIns from '../Components/modals/ModalCreateNewIns';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomeError from '../Components/modals/CustomeError';
import { useDispatch, useSelector } from 'react-redux';
import IconCont from '../Components/IconCont';
import Loading from '../Components/Loading';
import { useTranslation } from 'react-i18next';
import NavigationService from '../navigation/NavigationService'
import ChecklistView from '../Components/ChecklistView';
// create a component


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const Daily = ({ navigation }) => {
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalChecklistVisible, setModalChecklistVisible] = useState(false);
    const [taskItem, setTaskItem] = useState('');
    const [focusedScreen, setFocusedScreen] = React.useState(1);
    const [task, setTask] = useState('');
    const alertRef = useRef();
    const { t, i18n } = useTranslation();
    const get_Assessment = useSelector(state => state.get_Assessment);
    const Eshtablisment_Inspection_Type = useSelector(state => state.Eshtablisment_Inspection_Type);
    const lovDetails = useSelector(state => state.lovDetails);
    const SR_Data = useSelector(state => state.SR_Data);
    const [subChecked, setSubChecked] = React.useState(lovDetails[0]?.Value);
    const [subCheckedItem, setSubCheckedItem] = React.useState('');



    useEffect(() => {
        // setModalVisible(false)
        // setModalChecklistVisible(false)
        console.log('SR_Data', SR_Data);
        dispatch(Search_Establishment_History((result) => {
            alertRef.current.show(result.error);
        }));
        dispatch(GetLOVDetails((result) => {
            console.log('sssssss', result);
            console.log('lovDetails', lovDetails);
            alertRef.current.show(result.error);
        }));

    }, [dispatch])

    const getInspectionType = (IType, subtype) => {
        console.log('lovDetails', lovDetails);
        console.log('subtypeitem', subtype);
        if (IType == 'Direct Self Inspection') {
            console.log('dsi');
            setSubChecked(subtype?.Value)
            setSubCheckedItem(subtype)
        } else {
            setSubChecked("")

            setChecked('Vehicle Self Inspection')
        }
    }

    const openTask = (taskId, item) => {
        /*     dispatch(Get_Assessment( taskId => { 
                console.log('sssssss', result);
                  navigation.navigate('TaskDetails', { taskId: task})
            })); */
        console.log('itemopenTask', item);
        console.log('taskId', taskId);
        setTask(task);
        if (item.inspectionTypeField == 'Direct Self Inspection'&&item.statusField !== 'Satisfactory' && item.statusField !== 'Unsatisfactory') {
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
        // dispatch(Get_Assessment_New(item, (result) => {
        //     alertRef.current.show(result.error);
        // }));
    }
    const openChecklistModal = (item) => {
        console.log('taskItem', taskItem);

        setModalChecklistVisible(!modalChecklistVisible)
        setTaskItem(item)
    }
    const { Search_Establishment_HistoryResult } = state;

    return (
        <View style={styles.container}>
            {state.isLoading && <Loading />}

            <Navbar nav={'tab'} />
            <View>
                <TabToggle focusedScreen={focusedScreen} setFocusedScreen={setFocusedScreen} leftText={t('DirectTasks')} rightText={t('CompletedTasks')} IconLeftActive={IconLeftActive} IconRightActive={IconRightActive} IconLeftInActive={IconLeftInActive} IconRightInActive={IconRightInActive} />
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
                    <ScrollView style={{ height: height / 2.12, width: width / 1.05 }}>
                        {Eshtablisment_Inspection_Type.map((item, key) => (

                            <View style={{ width: '100%', borderColor: 'red' }}>
                                {(item.title === 'Direct Self Inspection') &&
                                    <View>
                                        {item.data.map((item, index) => (
                                            (item.statusField !== 'Satisfactory' && item.statusField !== 'Unsatisfactory'/* &&item.statusField !=='Scheduled' */) &&
                                            <TouchableOpacity key={index} onPress={() => openChecklistModal(item)} style={styles.taskCont}>
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

                                {(item.title === 'Vehicle Self Inspection') &&
                                    <View>
                                        {item.data.map((item, index) => (
                                            (item.statusField !== 'Satisfactory' && item.statusField !== 'Unsatisfactory'/* &&item.statusField !=='Scheduled' */) &&
                                            <TouchableOpacity key={index} onPress={() => openTask(item.inspectionNumberField, item)} style={styles.taskCont}>
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

                    <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={[/* styles.taskCont,Acknowledged */{ width: width / 2, backgroundColor: '#5c6672', alignSelf: 'center', marginTop: height / 20, paddingHorizontal: 10, paddingVertical: 15, borderRadius: 5 }]}>
                        <Text style={{ color: '#fff', textAlign: 'center' }}>Create New Inspection</Text>
                        <ModalCreateNewIns modalVisible={modalVisible} setModalVisible={setModalVisible} lovDetails={lovDetails} />
                    </TouchableOpacity>
                    <CustomeError ref={alertRef} />
                </View>
                :
                <View style={{ alignItems: 'center', justifyContent: 'center'/* , flex: 1 */, }}>

                    <ScrollView style={{ height: height / 1.8, width: width / 1.05 }}>
                        {Eshtablisment_Inspection_Type.map((item, key) => (

                            <View key={key} style={{ width: '100%', borderColor: 'red' }}>
                                {(item.title === 'Direct Self Inspection' || item.title === 'Vehicle Self Inspection') &&
                                    <View>
                                        {item.data.map((item, index) => (
                                            (item.statusField === 'Satisfactory' || item.statusField == 'Unsatisfactory') &&
                                            <TouchableOpacity key={index} onPress={() => openTask(item.inspectionNumberField, item)} style={styles.taskCont}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', }}>
                                                    <Text style={styles.textWhite}>{item.statusField ? item.statusField : 'Medium'}</Text>
                                                    <Text style={styles.textWhite}>{item.inspectionNumberField}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', paddingTop: '5%' }}>
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
            <CustomeError ref={alertRef} />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    taskCont: { /* flexDirection: 'row', */ backgroundColor: '#5c6672', paddingHorizontal: 10, borderRadius: 5, marginHorizontal: 10, marginVertical: 10, paddingVertical: 15 },
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
export default Daily;


