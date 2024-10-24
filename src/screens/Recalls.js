//import liraries
import React, { useState ,useEffect} from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ViewComponent } from 'react-native';
import Navbar from '../Components/Navbar/Navbar';
import AccordionsRecalls from '../Components/Accordions/AccordionsRecalls';
import SI_ImageCont from '../Components/SI_ImageCont';
import { Data, DataRoutine } from '../Components/DummyData'
import { Get_Assessment, Recall } from '../Redux/actions/SI_Action';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Components/Loading';

//import Accordion from 'react-native-collapsible/Accordion';

// create a component
const Recalls = () => {
const dispatch=useDispatch();
const state = useSelector(state => state)
const Recall_Data = useSelector(state => state.recall)
const [load,setLoad]=useState(true)

useEffect(()=>{
    dispatch(Recall()); 
},[])



useEffect(()=>{
    console.log('Recall_Data',Recall_Data );
    if(Recall_Data){
        setLoad(false)
    }else{
<Loading />
    }

},[])
    return (
        <View style={styles.container}>
        {state.isLoading && <Loading />}
            <Navbar nav={'tab'} />
            <SI_ImageCont />
            <View style={{ height: '70%' }}> 
                {/* <ScrollView> */} 
                {Recall_Data.length > 0?
                    <AccordionsRecalls data={Recall_Data}/>:
                    <Text style={{alignSelf:'center',color:'gray'}}>No Data</Text>
}


                {/* </ScrollView> */} 
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({ 
    container: {
        flex: 1,
    },
    tabBarLogo: { 
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    imageCont: { height: '9%', marginVertical: 10, alignItems: 'center', justifyContent: 'center' },

});

//make this component available to the app
export default Recalls;
