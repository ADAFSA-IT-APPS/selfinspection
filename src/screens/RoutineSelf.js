//import liraries
import React, { Component, useState, useRef,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Navbar from '../Components/Navbar/Navbar';
import TabToggle from '../Components/Navbar/tabToggle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SI_ImageCont from '../Components/SI_ImageCont';
import { IconLeftActiveRoutine, IconRightActive, IconRightInActive, IconLeftInActiveRoutine, ActiveScheduledTask, ActiveCompletedTask, InactiveScheduledTask, InactiveCompletedTask } from '../Util/CommonStyle'
import { useDispatch, useSelector } from 'react-redux';
import ModalCreateNewIns from '../Components/modals/ModalCreateNewIns';
import { AdhocInspection, Get_Assessment,Get_Assessment_New,GetCheckList,Search_Establishment_History } from '../Redux/actions/SI_Action';
import CustomeError from '../Components/modals/CustomeError';
import Loading from '../Components/Loading';
import { useTranslation } from 'react-i18next';

// create a component

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const RoutineSelf = ({ navigation }) => {
    const dispatch = useDispatch();
    const [focusedScreen, setFocusedScreen] = React.useState(1);
    const Eshtablisment_Inspection_Type = useSelector(state => state.Eshtablisment_Inspection_Type);
    const [modalVisible, setModalVisible] = useState(false);
    const state = useSelector(state => state);
    const alertRef = useRef();
    const { t, i18n } = useTranslation();


    useEffect(() => {
        dispatch(Search_Establishment_History());
    }, [dispatch])


    const openTask = (taskId,item) => {
        // dispatch(Get_Assessment(item, (result) => {
        //     console.log('sssssss', result);
        //     alertRef.current.show(result.error);
        // }));
        // dispatch(GetCheckList(item, (result) => {
        //     console.log('sssssss', result);
        //     alertRef.current.show(result.error);
        // }));
        dispatch(Get_Assessment_New(item, '', ''));
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

                    <ScrollView style={{ height: height / 1.8, width: width / 1.05 }}>
                        {Eshtablisment_Inspection_Type.map((item, key) => (

                            <View style={{ width: '100%', borderColor: 'red' }}>
                                {(/* item.title === 'Routine Inspection' ||  */item.title === 'Follow Up Self Inspection'||item.title === 'Self Inspection') &&
                                    <View>
                                        {item.data.map((item, index) => (
                                            (item.statusField !== 'Satisfactory' && item.statusField !=='Unsatisfactory')&&
                                            <TouchableOpacity key={index} onPress={() => openTask(item.inspectionNumberField,item)} style={styles.taskCont}>
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
                                        (item.statusField === 'Satisfactory' || item.statusField ==='Unsatisfactory')&&
                                        <TouchableOpacity key={index} onPress={() => openTask(item.inspectionNumberField,item)} style={styles.taskCont}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', }}>
                                                <Text style={styles.textWhite}>{item.statusField ? item.statusField : 'Medium'}</Text>
                                                <Text style={styles.textWhite}>{item.inspectionNumberField}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingTop: '5%' }}>
                                                <Text style={styles.textWhite}>{item.actualInspectionDateField?item.actualInspectionDateField:'-'}</Text>
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
    textWhite: { flex:1,color: '#fff',alignItems:'center' ,justifyContent:'center',textAlign:'center'}
});

//make this component available to the app
export default RoutineSelf;
