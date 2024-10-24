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
import CustomeError from '../modals/CustomeError';
import { useSelector, useDispatch } from 'react-redux';
import IconCont from '../IconCont';

// create a component
const AccordionManuals = ({ data }) => {
  const [currentIndex, setCurrentIndex] = React.useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const alertRef = useRef();
  const state = useSelector(state => state);
  const get_Assessment = useSelector(state => state.get_Assessment);


  useEffect(() => {
    console.log('datafrom redux get assement', get_Assessment)
  }, [])


  const renderItem = ({ item, index }) => {
    return (
      <View style={{}}>
        <TouchableOpacity key={item.id} onPress={() => {
          setCurrentIndex(index === currentIndex ? null : index);
        }}>
          <View style={styles.headerCont}>
            <View style={styles.header}>
              <Text style={styles.headerText}>{item.question}</Text>
              {index === currentIndex ? <MaterialIcons name='keyboard-arrow-up' color='#fff' size={32} /> : <MaterialIcons name='keyboard-arrow-down' color='#fff' size={32} />}
            </View>
          </View>


          {data == DataRoutine && <>
            {index === currentIndex && (
              <View style={{}} >
                <View style={{ padding: 10 }}>
                  {item.DataInner.map((item, i) => (
                    <View style={{ padding: 10 }}>
                      <Text style={{ color: Colors.primary, paddingBottom: 5 }}>{item.question}</Text>
                      {item.DataInnerLayer.length!==0&&
                        <TouchableOpacity onPress={() => navigation.navigate('HygieneManual', { header: item.question, item: item.DataInnerLayer })} style={{ backgroundColor: Colors.primary, width: '30%', alignItems: 'center', borderRadius: 10 }}>
                          <Ionicons name='eye' color='#fff' size={32} /> 
                        </TouchableOpacity>
                      }
                    </View>
                  ))}
                  <ModalComp modalVisible={modalVisible} setModalVisible={setModalVisible} image={'item.image'} />
                </View>
              </View>
            )}
          </>}
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
        style={{ flexGrow: 0, height: '90%',borderColor:'#cecece',borderWidth:1 }}

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
    textAlign: 'center'
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
    width: '100%',
    resizeMode: 'contain',
  },
  tableColon: { alignSelf: 'center', width: '10%', textAlign: 'center' }
});

//make this component available to the app
export default AccordionManuals;

