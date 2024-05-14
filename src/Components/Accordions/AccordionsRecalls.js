//import liraries
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Pressable, Image } from 'react-native';
import { Data, DataRoutine } from '../DummyData';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import ModalComp from '../modals/ModalComp';
import { Colors } from '../../Util/CommonStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import IconCont from '../IconCont';


// create a component
const AccordionsRecalls = ({ data, /* onPress  */ }) => {
  const [currentIndex, setCurrentIndex] = React.useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [Check, setCheck] = useState('check');
  const [No, setNo] = useState(false);
  const [NA, setNA] = useState(false);
  const [comment, setComment] = useState(false);
  const navigation = useNavigation();
  const alertRef = useRef();
  const state = useSelector(state => state);
  const get_Assessment = useSelector(state => state.get_Assessment);


  useEffect(() => {
    console.log('datafrom recalls', data)
  }, [])


const AccordionItem=({header,name})=>{
  return(
               <View style={{ flexDirection:'row',paddingVertical:10, borderBottomColor:'#5c6672',borderBottomWidth:1}}>
                  <Text style={[styles.widthff,{color:'gray'}]}>
                    {header}
                  </Text>
                  <Text style={{ alignSelf: 'center', width: '10%', textAlign: 'center' }}>:</Text>
                  <Text style={[styles.widthff,{color:'#141414'}]}>
                    {name}
                  </Text>
                </View>
  )
}
  const renderItem = ({ item, index }) => {
    return (

      <View>
        <TouchableOpacity key={item.id} onPress={() => {
          setCurrentIndex(index === currentIndex ? null : index);
        }}>
          <View style={styles.headerCont}>
            <View style={styles.header}>
              <Text style={styles.headerText}>{item.titleField}</Text>
              {index === currentIndex ? <MaterialIcons name='keyboard-arrow-up' color='#fff' size={32} /> : <MaterialIcons name='keyboard-arrow-down' color='#fff' size={32} />}
            </View>
          </View>

          {/*    {data == get_Assessment && */}
          <>
            {index === currentIndex && (
              <View style={{ margin: 15 ,borderColor: '#5c6672', borderWidth: 1,borderRadius:10,padding:15}}>
                
                <AccordionItem header={'Brand Name'} name={item.brandnameField?item.brandnameField:'-'}/>
                <AccordionItem header={'Company Name'} name={item.companynameField?item.companynameField:'-'}/>
                <AccordionItem header={'Expiry Date'} name={item.expirydateField?item.expirydateField:'-'}/>
                <AccordionItem header={'Manufacturing Date Packaging'} name={item.packingField?item.packingField:'-'}/>
                <AccordionItem header={'Recall Date'} name={item.manufacturingdateField?item.manufacturingdateField:'-'}/>
                <AccordionItem header={'Country Of Origins'} name={item.madeinField?item.madeinField:'-'}/>
                <AccordionItem header={'Recalls Reasons'} name={item.recalls_reasonField?item.recalls_reasonField:'-'}/>
                <AccordionItem header={'Batch Number'} name={item.recalls_batch_numberField?item.recalls_batch_numberField:'-'}/>
                <AccordionItem header={'Reason Field'} name={item.companynameField?item.companynameField:'-'}/>
                <AccordionItem header={'Weight Size'} name={item.weightsizeField?item.weightsizeField:'-'}/>
                <View style={{paddingVertical:15,flexDirection:'row',flex:1}}>
                  <Text style={[styles.widthff,{color:'gray'}]}>Production Image</Text>
                  <Text style={styles.tableColon}>:</Text>
                  <Pressable onPress={() => setModalVisible(true)} style={{ width: '40%', marginTop: '2%' }}>
                   <Image 
                        source={{uri:item.productimageField.split(',', 1)[0]}}  
                        style={{width: 80, height:80 }} 
                    />
                      <ModalComp modalVisible={modalVisible} setModalVisible={setModalVisible} image={item.productimageField.split(',', 1)[0]} />
                    </Pressable>
                </View>
              </View>)}
          </>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => {
          index.toString();
        }}
        style={{ flexGrow: 0, height: '90%',borderColor:'#cecece',borderWidth:1  }}
      /* ListFooterComponent={renderLoader} */
      /*  onEndReached={loadMoreItem} */
      /* onEndReachedThreshold={0} */
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30
  },
  widthff: { width: '45%' },
  headerCont: {
    backgroundColor: '#5c6672',
    borderBottomColor: '#fff',
    borderWidth: 1,
    borderTopColor: '#738591'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '4%',
    paddingVertical: '1%'
  },
  headerText: {
    color: '#fff',
    flexWrap: 'wrap',
    width: '90%',
  },
  table: { flex: 1, flexDirection: 'row', alignItems: 'center', paddingBottom: 5, borderBottomColor: '#5c6672', borderBottomWidth: 1 },
  table2: { flex: 1, flexDirection: 'row', alignItems: 'center', paddingBottom: 5, },
  /*    'table:last-child': {
         borderBottomWidth: 0
     }, */
  tableNoBorder: {
    borderBottomWidth: 0
  },
  pic: {
    width: 100,
    height:100,
    resizeMode: 'contain',
  },
  tableColon: { alignSelf: 'center', width: '10%', textAlign: 'center' }
});

//make this component available to the app
export default AccordionsRecalls;

