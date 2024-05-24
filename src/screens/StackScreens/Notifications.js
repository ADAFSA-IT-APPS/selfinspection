import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import Navbar from "../../Components/Navbar/Navbar";
import SI_ImageCont from "../../Components/SI_ImageCont";
import Loading from "../../Components/Loading";
import NavigationService from '../../navigation/NavigationService';
import { AdhocInspection,Get_Assessment_New, Search_Establishment_History, Get_Assessment, GetCheckList } from '../../Redux/actions/SI_Action';
import { useDispatch, useSelector } from "react-redux";


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const Notifications = (props) => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true);
  const { item, inspectionHist } = props?.route?.params;
  const state = useSelector(state => state);
  const Eshtablisment_Inspection_Type = useSelector(state => state.Eshtablisment_Inspection_Type);
  const Search_Establishment_HistoryResult_NOC = useSelector(state => state.Search_Establishment_HistoryResult_NOC)

  // useEffect(() => {
  //  // console.log('item', item);
  //   if (item/* .length>0 */) {
  //     setIsLoading(false)
  //   } else {
  //     setIsLoading(false)

  //     /*    NavigationService.goBack();
  //        return */
  //   }
  // }, [item])

  const openTask = (taskId, item) => {
    /*     dispatch(Get_Assessment( taskId => {
            console.log('sssssss', result);
              navigation.navigate('TaskDetails', { taskId: task})
        })); */
   // console.log('item', item);
    console.log('taskId', taskId);
    // dispatch(Get_Assessment(item, (result) => {
    //   alertRef.current.show(result.error);
    // }));
    // dispatch(GetCheckList(item, (result) => {
    //   alertRef.current.show(result.error);
    // }));
    dispatch(Get_Assessment_New(item, (result) => {
      console.log('sssssss', result);
      alertRef.current.show(result.error);
  }));
  }
  return (
    <View style={styles.container}>
      {/* {isLoading && <Loading />} */}
      {state.isLoading && <Loading />}
      <Navbar nav={'stacksWithoutLogout'} />
      <SI_ImageCont />
      <ScrollView style={{ height: height / 3, width: width / 1.05, marginBottom: height / 7, marginLeft: 10 }}>
        {(item && inspectionHist) ?
          Eshtablisment_Inspection_Type.map((item, key) => (

            <View key={key}  style={{width:'100%',borderColor:'red'}}>
                {(item.title === 'Direct Self Inspection' || item.title === 'Vehicle Self Inspection'||item.title === 'Follow Up Self Inspection'|| item.title === 'Self Inspection') &&
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

        ))
          :
          item?.map((data, index) =>
            <TouchableOpacity onPress={() => openTask(data.inspectionNumberField, data)} style={styles.taskContelse}>
              <Text style={styles.textWhiteelse}>{inspectionHist ? data.statusField : 'New Task Assigned:'}</Text>
              <Text style={styles.textWhiteelse}>{data.inspectionNumberField}</Text>
            </TouchableOpacity>
          )
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
  textWhite: { flex:1,color: '#fff',alignItems:'center' ,justifyContent:'center',textAlign:'center'},
  textWhiteelse: { color: '#fff' }
});
export default Notifications;
