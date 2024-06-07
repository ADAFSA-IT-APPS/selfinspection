//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import TaskNavbar from '../../Components/Navbar/TaskNavbar';
import SI_ImageCont from '../../Components/SI_ImageCont';
import Accordions from '../../Components/Accordions/Accordions';
import { Data, DataRoutine } from '../../Components/DummyData';
import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio';
import Timer from '../../Components/Timer';
import { useSelector, useDispatch } from 'react-redux';
import { Get_Assessment, Add_Questionnaires_Attachment } from '../../Redux/actions/SI_Action'
import ImagePicker from 'react-native-image-crop-picker';
import Loading from '../../Components/Loading';
import AccordionsViewTask from '../../Components/Accordions/AccordionsViewTask'

// create a component
const TaskDetails = props => {
    //const [taskId,setTaskId]=useState('');
    console.log('route', JSON.stringify(props));
    const dispatch = useDispatch();
    const { taskId, statusField, item, nearestDateField, subChecked,templatename } = props.route.params;



    const state = useSelector(state => state);
    const get_Assessment = useSelector(state => state.get_Assessment);
    const checkList = useSelector(state => state.checkList);
    const loading = useSelector(state => state.isLoading)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log('>>>>>>>>>checkListfrom task details comp', nearestDateField);
        console.log('subChecked_taskdetails', subChecked);

        if (taskId && get_Assessment) {
            setIsLoading(false);
        } else if (taskId) {
            setIsLoading(false);
        } else {
            return
        }
    }, [taskId, get_Assessment])

    const onSubmitPhoto = (task) => {
        console.log('attachment data from accordion', task);
        //dispatch(Add_Questionnaires_Attachment(task));
    }
    return (
        <View style={styles.container}>
            {isLoading && <Loading />}
            <TaskNavbar taskno={taskId} />
            {/* <ScrollView> */}
            {(statusField === 'Satisfactory' || statusField === 'Unsatisfactory' /* ||statusField==='Scheduled' */) ? <AccordionsViewTask data={checkList} taskid={taskId} /> : <Accordions data={checkList} taskid={taskId} inspectionItem={item} checklistDate={nearestDateField} subChecked={subChecked} templatename={templatename} />}
            {/* <Accordions data={checkList} /> */}
            {/*  </ScrollView> */}
            {/* (statusField==='Satisfactory' || statusField==='Unsatisfactory')?<Text></Text>:<Text></Text> */
                // <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 5 }}>
                //     <View style={{ flex: 1, alignItems: 'center' }}>
                //         <Text>Completion: 100%</Text>
                //     </View>
                //     <TouchableOpacity onPress={()=>onSubmit(taskId)} style={{ backgroundColor: '#738591', paddingHorizontal: 20, alignItems: 'center', flex: 1 / 2, paddingVertical: 18, borderTopLeftRadius: 100, borderWidth: 1, borderTopRightRadius: 100, borderColor: '#485865' }}>
                //         <Text style={{ color: '#fff' }}>Submit</Text>
                //     </TouchableOpacity>
                //     <View style={{ alignItems: 'center', flex: 1 }}> 
                //         {/* <Text>Timer</Text> */}
                //         <Timer />
                //     </View>   
                // </View>
            }
            <View style={{ backgroundColor: '#dedede', height: '4%', }}></View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    p10: { paddingRight: 10, color: '#333232' }
});

//make this component available to the app
export default TaskDetails;
