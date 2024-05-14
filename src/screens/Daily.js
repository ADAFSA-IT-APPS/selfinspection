//import liraries
import React, { useState, useRef, useEffect } from 'react';
import TabToggle from '../Components/Navbar/tabToggle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SI_ImageCont from '../Components/SI_ImageCont';
import { IconRightActive, IconLeftActive, IconLeftInActive, IconRightInActive } from '../Util/CommonStyle'
import { View, Text, StyleSheet, Pressable, Image, TouchableOpacity, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import Navbar from '../Components/Navbar/Navbar';
import { AdhocInspection, Get_Assessment ,GetCheckList,Search_Establishment_History} from '../Redux/actions/SI_Action';
import ModalCreateNewIns from '../Components/modals/ModalCreateNewIns';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomeError from '../Components/modals/CustomeError';
import { useDispatch, useSelector } from 'react-redux';
import IconCont from '../Components/IconCont';
import Loading from '../Components/Loading';
import { useTranslation } from 'react-i18next';
import NavigationService from '../navigation/NavigationService'

// create a component


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const Daily = ({ navigation }) => {
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const [modalVisible, setModalVisible] = useState(false);
    const [E_history, setE_History] = useState(false);
    const [focusedScreen, setFocusedScreen] = React.useState(1);
    const [task, setTask] = useState('');
    const alertRef = useRef();
    const { t, i18n } = useTranslation();
    const get_Assessment = useSelector(state => state.get_Assessment);
    const Eshtablisment_Inspection_Type = useSelector(state => state.Eshtablisment_Inspection_Type);
    const SR_Data = useSelector(state => state.SR_Data);




    useEffect(() => {
        setModalVisible(false)
console.log('SR_Data', SR_Data);
        dispatch(Search_Establishment_History((result) => {
            console.log('sssssss', result);
            alertRef.current.show(result.error);
        }));
        console.log('modalstate', modalVisible);
    }, [dispatch])


    const openTask = (taskId,item) => {
        /*     dispatch(Get_Assessment( taskId => { 
                console.log('sssssss', result);
                  navigation.navigate('TaskDetails', { taskId: task})
            })); */
          //  console.log('item',item );
            console.log('taskId',taskId );
        setTask(task);
        dispatch(Get_Assessment(item, (result) => {
            alertRef.current.show(result.error);
        }));
        dispatch(GetCheckList(item, (result) => {
            alertRef.current.show(result.error);
        }));
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

                    <ScrollView style={{ height: height / 2.12 ,width:width/1.05}}>
                        {Eshtablisment_Inspection_Type.map((item, key) => (

                            <View style={{width:'100%',borderColor:'red'}}>
                                {(item.title === 'Direct Self Inspection' || item.title === 'Vehicle Self Inspection') &&
                                    <View>
                                        {item.data.map((item, index) => (
                                            (item.statusField !== 'Satisfactory' && item.statusField !=='Unsatisfactory'/* &&item.statusField !=='Scheduled' */)&&
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

                    <TouchableOpacity onPress={() => setModalVisible(true)} style={[/* styles.taskCont,Acknowledged */{ width: width / 2, backgroundColor: '#5c6672', alignSelf: 'center', marginTop: height / 20, paddingHorizontal: 10, paddingVertical: 15, borderRadius: 5 }]}>
                        <Text style={{ color: '#fff', textAlign: 'center' }}>Create New Inspection</Text>
                        <ModalCreateNewIns modalVisible={modalVisible} setModalVisible={setModalVisible}/>
                    </TouchableOpacity>
                    <CustomeError ref={alertRef} />
                </View>
                :
                <View style={{ alignItems: 'center', justifyContent: 'center'/* , flex: 1 */, }}>

                    <ScrollView style={{ height: height / 1.8 ,width:width/1.05}}>
                        {Eshtablisment_Inspection_Type.map((item, key) => (

                            <View key={key}  style={{width:'100%',borderColor:'red'}}>
                                {(item.title === 'Direct Self Inspection' || item.title === 'Vehicle Self Inspection') &&
                                    <View>
                                        {item.data.map((item, index) => (
                                            (item.statusField === 'Satisfactory' || item.statusField =='Unsatisfactory')&&
                                            <TouchableOpacity key={index} onPress={() => openTask(item.inspectionNumberField,item)} style={styles.taskCont}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', }}>
                                                    <Text style={styles.textWhite}>{item.statusField ? item.statusField : 'Medium'}</Text>
                                                    <Text style={styles.textWhite}>{item.inspectionNumberField}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', paddingTop: '5%' }}>
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
    textWhite: { flex:1,color: '#fff',alignItems:'center' ,justifyContent:'center',textAlign:'center'}
});

//make this component available to the app
export default Daily;


