//import liraries
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Pressable, Image, Button, Platform } from 'react-native';
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
import DataDisplay from '../modals/DataDisplay';
import SI_ImageCont from '../../Components/SI_ImageCont';
import ImagePicker from 'react-native-image-crop-picker';
import { useMemo } from 'react';
import moment from "moment";
import Timer from '../../Components/Timer';
import NavigationService from '../../navigation/NavigationService';
import { Add_Questionnaires_Attachment, Update_Assessment, Search_Establishment_History } from '../../Redux/actions/SI_Action'
import Loading from '../Loading';
import { toast, getUserdetails } from '../../Util/CommonStyle';
import Toast from 'react-native-root-toast';
import { TemporaryDirectoryPath } from 'react-native-fs';


//import RNHTMLtoPDF from 'react-native-html-to-pdf';

const _ = require('lodash');

// create a component 'Grace can only be gven to unsatisfactory questions'
const Accordions = ({ data, taskid, inspectionItem, checklistDate, subChecked }) => {
  let dataCloned = _.cloneDeep(data)
  const [currentIndex, setCurrentIndex] = React.useState(null);
  /* ----------  Modal State  ---------- */
  const [modalVisible, setModalVisible] = useState(false);
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const [graceModalVisible, setGraceModalVisible] = useState(false);
  const [dataModalVisible, setDataModalVisible] = useState(false)
  const [graceEmpty, setGraceEmpty] = useState(false);
  const [timeValue, setTimeValue] = useState(null);

  const [alertText, setAlertText] = useState('');
  const alertRef = useRef();
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const get_Assessment = useSelector(state => state.get_Assessment);
  const [attachment, setOfAttachment] = useState([]);
  const [listData, setListData] = useState([]);
  const [modalData, setModalData] = useState([]);
  const [modalListData, setModalListData] = useState([]);
  const [commentset, setCommentset] = useState('');
  const [checkGraceValue, setCheckGraceValue] = useState('');
  const [graceEmptyIndex, setGraceEmptyIndex] = useState(0);
  const [graceEmptyText, setGraceEmptyText] = useState('');

  const [selectedParentIndex, setSelectedParentIndex] = useState(null)
  const [selectedChildIndex, setSelectedChildIndex] = useState(null)



  useEffect(() => {
    //  alert(JSON.stringify(data))
    changeDataFormat()

    console.log('moment().format)', moment(checklistDate, 'MM/DD/YYYY HH:mm:ss a').format("MM/DD/YYYY HH:mm:ss"));
    console.log('moment().format)', checklistDate);
    console.log('moment().format)', moment().format("HH:mm:ss"));
  }, []);


  const changeDataFormat = () => {
    let arr = [];
    for (let i = 0; i < dataCloned.length; i++) {
      let item = dataCloned[i];
      arr[i] = item;
      for (let y = 0; y < item.data.length; y++) {
        let obj = item.data[y];
        let theNewObj = {
          AttributeName: obj.attributeNameField,
          Comment: obj.comment2Field,
          DateOfRecovery: moment().format("MM/DD/YYYY HH:mm:ss"),
          Description3: item.title,
          Order: obj.orderField,
          Score: '' /* obj.scoreField */,
          Value: obj.valueField ? obj.valueField : 'Yes',
          Weight: obj.weightField
        }
        arr[i].data[y] = theNewObj;
      }
      if (i == dataCloned.length - 1) {
        console.log("\n\n\n\n", "array => ", JSON.stringify(arr), "\n\n\n\n");
        setListData(arr)
      }
    }
  }

  const changeItemValue = (parentIndex, childIndex, value) => {
    let dataCloned = _.cloneDeep(listData)
    dataCloned[parentIndex].data[childIndex].Value = value;
    setListData(dataCloned)
    // console.log('>>>parentbouwbclwjebc', parentIndex)
    // console.log('>>>bouwbclwjebc', childIndex)
  }

  const submit = () => {
    console.log('subChecked_submit', subChecked);
    let dataCloned = _.cloneDeep(listData);
    let arr = [];
    for (let i = 0; i < dataCloned.length; i++) {
      let item = dataCloned[i];
      for (let y = 0; y < item.data.length; y++) {
        const subItem = item.data[y]
        //alert(JSON.stringify(item))

        if (subItem.Value == 'No' && subItem.Score === '') {
          console.log('Check list message', item.title);
          setGraceEmptyIndex(y)
          setGraceEmptyText(`Please select an Grace for question number: ${y + 1} from section: ${item.title}`)
          setGraceEmpty(true)

          //toast(`Please select an Grace for question number:${y + 1} from section:${item.title}`)
        }
        arr.push(subItem)
      }
      if (i == dataCloned.length - 1) {
        // post request

        let countResult = (YesNoNA.Yes > 0 && YesNoNA.No == 0 && YesNoNA.NA == 0) ? 'Inspection Approved' : 'Inspection Rejected';


        let minValue = Math.min(...arr.filter(e => e.Score).map(e => (Number(e.Score))))
        // let current_Date=moment().format("MM/DD/YYYY HH:mm:ss");
        // let new_date = moment(moment(current_Date).format("MM/DD/YYYY HH:mm:ss").add(minValue, 'days'));
        //  console.log('new_date', new_date);
        //   let lowestGrace=arr.reduce(function(prev, curr) {
        //     return (prev.Score < curr.Score) ? prev : curr;
        // });
        // console.log('lowestGrace', lowestGrace);


        // arr.sort(function (a, b) {
        //   return a.Score - b.Score
        // })

        // let min = arr[0];
        // console.log('lowestGrace', min); 

        /* adding score */
        // let temarr = []
        // if (inspectionItem.inspectionTypeField == 'Direct Self Inspection') {
        //   for (let i = 0; i < arr.length; i++) {
        //     let item = arr[i];
        //     let score = ''
        //     if (item.Value == 'Yes') {
        //       score = 1
        //     } else if (item.Value == 'No') {
        //       score = 0
        //     } else {
        //       score = ''
        //     }
        //     temarr.push({
        //       // ...item,
        //       Comment: item.Comment,
        //       Order: item.Order,
        //       Score: score/* item.Score */,
        //       Value: item.Value,
        //       Weight: item.Weight,
        //       AttributeName: item.AttributeName,
        //       Category: item.Description3
        //     })
        //   }
        //   arr = temarr;
        // }
        let assessScore = 0;
        for (let i = 0; i < arr.length; i++) {
          let temp;
          let item = arr[i];

          if (item.Value == 'Yes') {
            temp = 1
          } else if (item.Value == 'No') {
            temp = 0
          } else {
            temp = 0
          }
          assessScore += temp
        }
        // let maxvalue=Math.max(...array.map(arr => arr.y))
        // console.log('arrlength', arr.length);
        // console.log('assessScore', assessScore);
        // console.log('percentage', assessScore / arr.length * 100);
        let data =
          (inspectionItem.inspectionTypeField == 'Direct Self Inspection' || inspectionItem.inspectionTypeField == 'Follow Up Self Inspection' || inspectionItem.inspectionTypeField == 'Self Inspection') ?
            {
              "InterfaceID": "ADFCA_CRM_SBL_066",
              "AssesmentChecklist": {
                "Inpsection": {
                  "DataLogger": "N",
                  "Flashlight": "N",
                  "LuxMeter": "N",
                  "UVLight": "N",
                  "TaskID": taskid,
                  "Thermometer": "N",
                  "InspectorId": "",
                  "InspectorName": "",
                  "LanguageType": "ENU",
                  "ListOfSalesAssessment": {
                    "AssessmentChecklist": {
                      "AssessmentScore": /* assessScore ? assessScore : */ "",
                      "Description": "",
                      "MaxScore": arr && arr.length ? (arr.length) : "",
                      "Name": "",
                      "Percent": /* (assessScore && arr.length) ? assessScore / arr.length * 100 : */ "",
                      "TemplateName": (subChecked && subChecked.LanguageIndependentCode) ? subChecked.LanguageIndependentCode : '',
                      "ListOfSalesAssessmentValue": {
                        "AssessmentChecklistValues": arr
                      }
                    }
                  }
                }
              },
              "Attrib1": countResult,
              "Attrib2": (subChecked && subChecked.LanguageIndependentCode) ? subChecked.LanguageIndependentCode : '',
              "Attrib3": moment.utc(timeValue * 1000).format('HH:mm:ss'),
              "Attrib4": minValue != 'Infinity' ? moment().add(minValue, 'days').format("MM/DD/YYYY HH:mm:ss") : '',
              "Attrib5": moment().format("MM/DD/YYYY HH:mm:ss")
            }
            :
            {
              "_Input":
              {
                "InterfaceID": "ADFCA_CRM_SBL_066",
                "AssesmentChecklist":
                  [{
                    "DataLogger": "N",
                    "Flashlight": "N",
                    "LuxMeter": "N",
                    "UVLight": "N",
                    "TaskID": taskid,
                    "Thermometer": "N",
                    "InspectorId": "",
                    "InspectorName": "",
                    "LanguageType": "ENU",
                    "ListOfSalesAssessment":
                      [{
                        "AssessmentScore": "",
                        "Description": "",
                        "MaxScore": "",
                        "Name": "",
                        "Percent": "",
                        "TemplateName": inspectionItem.inspectionTypeField + '-Food',
                        "ListOfSalesAssessmentValue": arr
                      }]

                  }],
                "Attrib1": countResult,
                "Attrib2": inspectionItem.inspectionTypeField,
                "Attrib3": moment.utc(timeValue * 1000).format('HH:mm:ss')/* moment(timeValue).format('ss:mm:HH') */,
                "Attrib4": /* "05/27/2022 13:53:11", */minValue != 'Infinity' ? moment().add(minValue, 'days').format("MM/DD/YYYY HH:mm:ss") : '',
                "Attrib5": /* "05/13/2022 13:53:11" */moment().format("MM/DD/YYYY HH:mm:ss")
              }
            }
        console.log('data_updateAssessnent', JSON.stringify(data));
        //let datacloned = _.cloneDeep(data)`
        setModalData(data)
        setModalListData(arr)
        // setTimeout(() => {
        //   console.log('modalListData>>>>>', data);
        // }, 1000);


        const graceCheckLength = arr.filter(item => item.Value == 'No' && item.Score === '');
        console.log('gracelength', graceCheckLength.length);
        if (graceCheckLength == 0) {
          setDataModalVisible(true)
        }
        //setDataModalVisible(true)
      }
    }
  }

  const onModalSubmitAction = () => {
    console.log("Modal submit button is pressed")
    dispatch(Update_Assessment(modalData, inspectionItem.inspectionTypeField, (result) => {
      if (result == 'Success') {
        console.log('checkout',);
        if (result == 'Failure') {
          console.log('checkin',);
          alertRef.current.show(result.error);
        }
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',);
        NavigationService.goBack();
        dispatch(Search_Establishment_History());
      }
    }))
  }


  const onsubmitComment = (text, parentIndex, childIndex) => {
    let dataCloned = _.cloneDeep(listData)
    dataCloned[parentIndex].data[childIndex].Comment = text;
    setListData(dataCloned);
    // setTimeout(() => {
    //   console.log('list>>>>>', JSON.stringify(dataCloned));

    // }, 500);
    text !== '' && setModalVisible(false);
  }


  const takePhotoFromCamera = async (parentIndex, childIndex) => {
    // console.log('orderField', item.orderField);
    // console.log('i', i);
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      compressImageQuality: 0.7,
      includeBase64: true,
    }).then(res => {
      console.log('mime', res.mime.split('/').pop());
      console.log('path', res.path);
      let arr = [];
      let newObj = {
        _Input: {
          InterfaceID: "ADFCA_CRM_SBL_039",
          LanguageType: "ENU",
          InspectorId: "",
          InspectorName: "",
          Checklistattachment: [
            {
              TaskId: taskid,
              ListOfActionAttachment: [
                {
                  FileAutoUpdFlg: "",
                  FileDeferFlg: "",
                  FileDockReqFlg: "",
                  FileDockStatFlg: "",
                  FileExt: res.mime.split('/').pop(),
                  FileName: Math.floor(Math.random() * 100) + 1,
                  FileSize: "",
                  FileSrcPath: "",
                  FileSrcType: "",
                  Comment: "",
                  FileBuffer: res.data
                }
              ]
            }
          ]
        }
      }
      // setDataModalVisible(true)
      dispatch(Add_Questionnaires_Attachment(newObj, (result) => {
        if (result == 'Success') {
          let dataCloned = _.cloneDeep(listData)
          dataCloned[parentIndex].data[childIndex].attachment = true;
          setListData(dataCloned)
        }
      }))
      //  arr.push(newObj);
      // console.log('dataaftersaving', JSON.stringify(newObj));
      // console.log('>>>>>>>>>arr', arr)
    });

  }

  const graceMethod = (data, index, subIndex, grace) => {
    console.log('data', data);

    if (data.Value == 'Yes' || data.Value == 'NA') {
      if (Platform.OS === 'ios') {
        console.log('test ios',);
        toast('Grace can only be given to unsatisfactory questions'/* ,{duration:5000} */);
      }
      setAlertText('Grace can only be given to unsatisfactory questions');

      setAlertModalVisible(true)
    } else if (data.Value == 'No') {
      setSelectedParentIndex(index);
      setSelectedChildIndex(subIndex)
      setGraceModalVisible(true)
      setCheckGraceValue(grace)
    }
  }

  const onsubmitGraceModal = (text, parentIndex, childIndex) => {
    if (text == 0 || text >= 30) {
      if (Platform.OS === 'ios') {
        console.log('test ios',);
        Toast.show('Invalid Grace(Can only be between 1 to 29)', {
          duration: Toast.durations.LONG,
          position: 200,/* 
          shadow: true,
          animation: true,
          hideOnPress: true, */
          textColor: 'white',
        })
      }
      setAlertText('Invalid Grace(Can only be between 1 to 29)');
      setAlertModalVisible(true)
    } else {
      let dataCloned = _.cloneDeep(listData)
      dataCloned[parentIndex].data[childIndex].Score = text;
      setListData(dataCloned);
      // setTimeout(() => {
      //   console.log('list>>>>>', JSON.stringify(dataCloned));

      // }, 500);
      text !== '' && setGraceModalVisible(false);
    }

  }
  const renderItem = ({ item, index }) => {

    return (

      <View>

        <TouchableOpacity key={item.id} onPress={() => {
          setCurrentIndex(index === currentIndex ? null : index);
        }}>
          <View style={styles.headerCont} key={index}>
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
                      <View style={{ borderColor: subItem.Value == 'Yes' ? 'green' : subItem.Value == 'No' ? 'red' : 'orange', borderWidth: 1, paddingVertical: 20, paddingHorizontal: 15, margin: '5%', borderRadius: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingBottom: '13%', paddingHorizontal: 10 }}>
                          <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={{ paddingRight: 10 }}>{subIndex + 1})</Text>
                            <Text style={{ width: '90%' }}>{subItem.AttributeName}</Text>
                          </View>
                          {/*  <IconCont size={25} iconName={'calendar-clock-outline'} /> */}
                          <MaterialCommunityIcons onPress={() => graceMethod(subItem, index, subIndex, subItem.Score)} style={{}} name={'calendar-clock-outline'} color={subItem.Score ? 'green' : '#485865'} size={35} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                          <TouchableOpacity onPress={() => { changeItemValue(index, subIndex, "Yes") }} style={{ backgroundColor: subItem.Value == 'Yes' ? 'green' : '#485865', borderRadius: 20, padding: 5 }}>
                            <MaterialCommunityIcons style={{}} name={'check-bold'} color='#fff' size={30} />
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => { changeItemValue(index, subIndex, "No") }} style={{ backgroundColor: subItem.Value == 'No' ? 'red' : '#485865', borderRadius: 20, padding: 5 }}>
                            <MaterialCommunityIcons style={{}} name={'close-thick'} color='#fff' size={30} />
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => { changeItemValue(index, subIndex, "NA") }} style={{ backgroundColor: subItem.Value == 'NA' ? 'orange' : '#485865', borderRadius: 30, fontSize: 16, padding: 11, }}>
                            <Text style={{ color: '#fff' }}  >N/A</Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => takePhotoFromCamera(index, subIndex)} style={{ backgroundColor: (subItem.attachment ? 'green' : '#485865'), borderRadius: 20, padding: 8 }}>
                            <Entypo style={{}} name='attachment' color='#fff' size={22} />
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => openCommentModal(index, subIndex, subItem.Comment)} style={{ backgroundColor: subItem.Comment ? 'green' : '#485865', borderRadius: 20, padding: 5 }}>
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

  const openCommentModal = (index, subIndex, comment) => {
    //console.log('date',moment().format('DD MMM YYYY') );
    setSelectedParentIndex(index);
    setSelectedChildIndex(subIndex)
    setModalVisible(true)
    setCommentset(comment)
  }


  const YesNoNA = useMemo(() => {
    let Yes = 0; let No = 0; let NA = 0;
    if (listData.length == 0) {
      return ({ Yes, No, NA })
    }
    for (let i = 0; i < listData.length; i++) {
      let item = listData[i];
      for (let y = 0; y < item.data.length; y++) {
        const obj = item.data[y];
        if (obj.Value == 'Yes') {
          Yes += 1;
        } else if (obj.Value == 'No') {
          No += 1;
        } else {
          NA += 1;
        }
      }
      if (i == listData.length - 1) {
        return ({ Yes, No, NA })
      }
    }
  }, [listData])

  const renderGraceEmpty = useCallback(() => {
    return (
      <CommentModal
        grace
        defaultValue={graceEmptyText}
        visible={graceEmpty}
        graceIndex={graceEmptyIndex}
        onClose={() => setGraceEmpty(false)} />
    )
  }, [graceEmpty, graceEmptyText, graceEmptyIndex])

  const renderModal = useCallback(() => {
    return (
      <CommentModal
        visible={modalVisible}
        parentIndex={selectedParentIndex}
        childIndex={selectedChildIndex}
        onClose={() => setModalVisible(false)}
        onsubmit={onsubmitComment}
        defaultValue={commentset}
      />
    )
  }, [modalVisible, selectedParentIndex, selectedChildIndex])

  const renderGrace = useCallback(() => {
    return (
      <CommentModal
        numeric
        visible={graceModalVisible} //graceVid
        parentIndex={selectedParentIndex}
        childIndex={selectedChildIndex}
        onClose={() => setGraceModalVisible(false)} //
        onsubmit={onsubmitGraceModal} //
        defaultValue={checkGraceValue}
      />
    )
  }, [graceModalVisible, selectedParentIndex, selectedChildIndex])

  return (
    <View style={styles.container}>
      {state.isLoading && <Loading />}
      <ModalComp modalVisible={alertModalVisible} setModalVisible={setAlertModalVisible} text={alertText} />
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', width: '100%', justifyContent: 'flex-end' }}>
        <Text style={styles.p10}>{`Yes:${YesNoNA.Yes}`}</Text>
        <Text style={styles.p10}>{`No:${YesNoNA.No}`}</Text>
        <Text style={styles.p10}>{`N/A:${YesNoNA.NA}`}</Text>
      </View>

      <SI_ImageCont />
      {renderGraceEmpty()}

      <FlatList
        data={listData}
        renderItem={renderItem}
        keyExtractor={(item, index) => {
          index.toString();
        }}
        style={{ flexGrow: 0, height: '90%' }}
      />
      <DataDisplay modalVisible={dataModalVisible} setModalVisible={setDataModalVisible} data={modalListData} onSubmitAction={onModalSubmitAction} />

      <CustomeError ref={alertRef} />
      {renderModal()}
      {renderGrace()}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 5 }}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text>Completion: 100%</Text>
        </View>
        <TouchableOpacity onPress={() => submit()} style={{ backgroundColor: '#738591', paddingHorizontal: 20, alignItems: 'center', flex: 1 / 2, paddingVertical: 18, borderTopLeftRadius: 100, borderWidth: 1, borderTopRightRadius: 100, borderColor: '#485865' }}>
          <Text style={{ color: '#fff' }}>Submit</Text>
        </TouchableOpacity>
        <View style={{ alignItems: 'center', flex: 1 }}>
          {/* <Text>Timer</Text> */}
          <Timer setTimeValue={setTimeValue} time={timeValue} />
        </View>
      </View>

    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1
    /*  marginVertical: 30 */
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

