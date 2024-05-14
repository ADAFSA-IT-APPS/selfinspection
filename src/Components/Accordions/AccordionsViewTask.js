//import liraries
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Pressable, Image, Button, Alert } from 'react-native';
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
import CommentModal from '../modals/CommentModal';
import ImagePicker from 'react-native-image-crop-picker';
import SI_ImageCont from '../../Components/SI_ImageCont';
import { useCallback } from 'react';
import { CallToGetInspectionReport, Add_Questionnaires_Attachment } from '../../Redux/actions/SI_Action'
import { writeFile, appendFile, readFile, readFileAssets, DownloadDirectoryPath, mkdir, readDir } from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';


const _ = require('lodash');

// create a component
const Accordions = ({ data, taskid /* onPress  */ }) => {
  const dispatch = useDispatch();

  let dataCloned = _.cloneDeep(data)
  const [currentIndex, setCurrentIndex] = React.useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [Check, setCheck] = useState({});
  const [No, setNo] = useState(false);
  const [NA, setNA] = useState(false);
  const [comment, setComment] = useState('');
  const navigation = useNavigation();
  const alertRef = useRef();
  const state = useSelector(state => state);
  const get_Assessment = useSelector(state => state.get_Assessment);
  const get_siebelReport = useSelector(state => state.GET_INSPECTION_REPORT);
  const [attachment, setOfAttachment] = useState([]);
  const [listData, setListData] = useState(data);
  const [graceModalVisible, setGraceModalVisible] = useState(false);
  const [checkGraceValue, setCheckGraceValue] = useState('');
  const [taskItem, setTaskItem] = useState(null);

  // console.log('attachmentin', attachment);
  // console.log("clonedDataa", dataCloned)

  useEffect(() => {
    //console.log('list', JSON.stringify(listData));
  }, [])

  const renderItem = ({ item, index }) => {
    //console.log('item>>>?',item );
    setTaskItem(item)
    /*   return(
        <Text>{JSON.stringify(item)}</Text>
      ) */
    return (

      <View>
        <TouchableOpacity key={item.id} onPress={() => {
          setCurrentIndex(index === currentIndex ? null : index);
        }}>
          <View style={styles.headerCont}>
            <View style={styles.header}>
              <Text style={styles.headerText}>{item.title}</Text>
              {index === currentIndex ? <MaterialIcons name='keyboard-arrow-up' color='#fff' size={32} /> : <MaterialIcons name='keyboard-arrow-down' color='#fff' size={32} />}
            </View>
          </View>

          <>
            {index === currentIndex && (
              <View >
                {item.data.map((subItem, subIndex) => {
                  return (
                    <View key={subIndex}>
                      <View style={{ borderColor: subItem.valueField == 'Yes' ? 'green' : subItem.valueField == 'No' ? 'red' : subItem.valueField == 'NA' ? 'orange' : '#485865', borderWidth: 1, paddingVertical: 20, paddingHorizontal: 15, margin: '5%', borderRadius: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingBottom: '13%', paddingHorizontal: 10 }}>
                          <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={{ paddingRight: 10 }}>{subIndex + 1})</Text>
                            <Text style={{ width: '90%' }}>{subItem.attributeNameField}</Text>
                          </View>
                          {/* <IconCont size={25} iconName={'calendar-clock-outline'} /> */}
                          <MaterialCommunityIcons onPress={() => {
                            (subItem.valueField == 'No' && subItem.scoreField != '') &&
                              setGraceModalVisible(true)
                            setCheckGraceValue(subItem.scoreField)
                          }} name={'calendar-clock-outline'} color={/* subItem.scoreField  */(subItem.valueField == 'No' && subItem.scoreField != '' != '') ? 'green' : '#485865'} size={35} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                          <TouchableOpacity /* onPress={() => { changeItemValue(index, subIndex, "yes") }}  */ style={{ backgroundColor: subItem.valueField == 'Yes' ? 'green' : '#485865', borderRadius: 20, padding: 5 }}>
                            <MaterialCommunityIcons style={{}} name={'check-bold'} color='#fff' size={30} />
                          </TouchableOpacity>
                          <TouchableOpacity /* onPress={() => { changeItemValue(index, subIndex, "no") }} */ style={{ backgroundColor: subItem.valueField == 'No' ? 'red' : '#485865', borderRadius: 20, padding: 5 }}>
                            <MaterialCommunityIcons style={{}} name={'close-thick'} color='#fff' size={30} />
                          </TouchableOpacity>
                          <TouchableOpacity /* onPress={() => { changeItemValue(index, subIndex, "na") }} */ style={{ backgroundColor: subItem.valueField == 'NA' ? 'orange' : '#485865', borderRadius: 30, fontSize: 16, padding: 11, }}>
                            <Text style={{ color: '#fff' }}  >N/A</Text>
                          </TouchableOpacity>
                          <TouchableOpacity /* onPress={() => takePhotoFromCamera(data, index)} */ style={{ backgroundColor: '#485865', borderRadius: 20, padding: 8 }}>
                            <Entypo style={{}} name='attachment' color='#fff' size={22} />
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => {
                            setModalVisible(true)
                            setComment(subItem.comment2Field)
                          }} style={{ backgroundColor: (subItem.comment2Field ? 'green' : '#485865'), borderRadius: 20, padding: 5 }}>
                            <MaterialCommunityIcons /* style={{}}  */ name={'notebook-edit'} color='#fff' size={28} />
                          </TouchableOpacity>

                        </View>
                      </View>
                    </View>
                  )
                })}

              </View>
            )}
          </>
        </TouchableOpacity>


      </View>
    )
  }

  // const getSiebelReport = (inspectionNumberField) => {
  //   console.log('inspectionNumberField_inspectionNumberField', inspectionNumberField);
  //   dispatch(CallToGetInspectionReport(inspectionNumberField));
  //   var path = DownloadDirectoryPath + '/' + inspectionNumberField + "_SibleReport.pdf";

  //   let parsedSiebeleport = get_siebelReport?JSON.parse(get_siebelReport):'';
  //   console.log('EndDate?', parsedSiebeleport.FileBuffer);
  //   if (parsedSiebeleport?.FileBuffer) {
  //     writeFile(path, parsedSiebeleport.FileBuffer, 'base64')
  //       .then((success) => {
  //         console.log('FILE WRITTEN!');
  //         FileViewer.open(path)
  //           .then(() => {
  //             console.log('FILE Open!');
  //           })
  //           .catch(error => {
  //             console.log('FILE Open failed!::' + error);
  //           });
  //       })
  //       .catch((err) => {
  //         console.log(err.message);
  //       });
  //   } else {
  //     Alert.alert("", "There is no Data to show", [
  //       {
  //         text: "OK",
  //         onPress: () => null,
  //         style: "cancel"
  //       },
  //       // { text: "YES", onPress: () => { NavigationService.navigate('Login'); }/*  BackHandler.exitApp() */ }
  //     ]);
  //   }
  //   // setTimeout(() => {
  //   //   let parsedSiebeleport = JSON.parse(get_siebelReport);
  //   //   console.log('EndDate?', parsedSiebeleport.FileBuffer);
  //   //   console.log('ReferenceId?', parsedSiebeleport.ReferenceId);
  //   //   console.log('get_siebelReport?', typeof get_siebelReport);

  //   // }, 1000)
  // }

  const yesnona = useMemo(() => {
    let yes = 0; let no = 0; let na = 0;
    if (listData.length == 0) {
      return ({ yes, no, na })
    }
    for (let i = 0; i < listData.length; i++) {
      let item = listData[i];
      for (let y = 0; y < item.data.length; y++) {
        const obj = item.data[y];
        if (obj.valueField == 'Yes') {
          yes = yes + 1;
        } else if (obj.valueField == 'No') {
          no += 1;
        } else if (obj.valueField == 'NA') {
          na += 1;
        }
      }
      if (i == listData.length - 1) {
        return ({ yes, no, na })
      }
    }
  }, [listData])

  const renderCommentModal = useCallback(() => {
    return (
      <CommentModal defaultValue={comment} visible={modalVisible} onClose={() => setModalVisible(false)} /* onsubmit={onsubmitComment}  */ />
    )
  }, [modalVisible, comment])


  const renderGraceModal = useCallback(() => {
    return (
      <CommentModal defaultValue={checkGraceValue} visible={graceModalVisible} onClose={() => setGraceModalVisible(false)} /* onsubmit={onsubmitComment}  */ />
    )
  }, [graceModalVisible, checkGraceValue])


  return (
    <View style={styles.container}>

      <View style={{ flexDirection: 'row', alignItems: 'flex-end', width: '100%', justifyContent: 'flex-end', paddingTop: 5 }}>
        <Text style={styles.p10}>{`Yes:${yesnona.yes}`}</Text>
        <Text style={styles.p10}>{`No:${yesnona.no}`}</Text>
        <Text style={styles.p10}>{`N/A:${yesnona.na}`}</Text>
      </View>
      <SI_ImageCont />
      <FlatList
        data={listData}
        renderItem={renderItem}
        keyExtractor={(item, index) => {
          index.toString();
        }}
        style={{ flexGrow: 0, height: '90%' }}

      />
      {/* <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => getSiebelReport(taskid)}
        >
          <View style={{ backgroundColor: 'red', padding: 5,alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
            <Text style={{ textDecorationLine: 'underline', color: 'white', fontWeight: 'bold' }}>Print Siebel Report</Text>
          </View>
        </TouchableOpacity>


      </View> */}

      {renderCommentModal()}
      {renderGraceModal()}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    /*  marginTop: 30 */
  },
  p10: { paddingRight: 10, color: '#333232' },

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
export default Accordions;

