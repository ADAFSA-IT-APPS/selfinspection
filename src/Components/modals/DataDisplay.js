//import liraries
import React, { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, FlatList, Text, TouchableOpacity, Pressable, View, Image, Dimensions } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Loading from "../Loading";
import CommentModal from "./CommentModal";
import { useCallback } from 'react';
import { Add_Questionnaires_Attachment, Update_Assessment, Search_Establishment_History } from '../../Redux/actions/SI_Action'
import { useDispatch } from "react-redux";

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
// create a component
const DataDisplay = ({ navigation, modalVisible, setModalVisible, data, text, onSubmitAction }) => {
  const dispatch = useDispatch();
  const [listData, setListData] = useState(data);
  const [loading, setLoading] = useState(true)
  const [commentModalVisible, setCommentModalVisible] = useState('');
  const [comment, setComment] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [graceModalVisible, setGraceModalVisible] = useState(false);
  const [checkGraceValue, setCheckGraceValue] = useState('');


  useEffect(() => {
    console.log('data from modal', listData);
    if (listData) setLoading(false)

  }, [])

  const submit = () => {
    console.log('submit');
    if(onSubmitAction) {
      onSubmitAction()
    }
    setModalVisible(!modalVisible)
  }

  const openCommentModal = (index, com) => {
    com&&
    setCommentModalVisible(true)
    setComment(com);
  }

  const openGraceModal =(index,grace)=>{
    grace&&
    setGraceModalVisible(true)
    setCheckGraceValue(grace)
  }

  const renderCommentModal = useCallback(() => {
    return (
      <CommentModal defaultValue={comment} visible={commentModalVisible} onClose={() => setCommentModalVisible(false)} /* onsubmit={onsubmitComment}  */ />
    )
  }, [commentModalVisible, comment])

  const renderGraceModal = useCallback(() => {
    return (
      <CommentModal defaultValue={checkGraceValue} visible={graceModalVisible} onClose={() => setGraceModalVisible(false)} /* onsubmit={onsubmitComment}  */ />
    )
  }, [graceModalVisible, checkGraceValue])

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.imageCont}>
        <Text style={{ letterSpacing: 0.4, fontSize: 13 }}>{index + 1}){' '} {item.AttributeName}</Text>
        <View style={{ /* flex:1, */flexDirection: 'row', marginVertical: 10,/*  marginHorizontal: 35,  */alignItems: 'center', justifyContent: 'space-around' }}>
          <Text>Answer:{'       '}</Text>
          <Text>{item.Value}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
            {/*   <TouchableOpacity onPress={() => console.log('pressed' )} style={{ backgroundColor: (false ? 'green' : '#485865'), borderRadius: 20, padding: 5, marginRight: 25 }}>
              <Entypo style={{}} name='attachment' color='#fff' size={18} />
            </TouchableOpacity> */}
            <TouchableOpacity onPress={() => openCommentModal(index, item.Comment)} style={{ backgroundColor: (item.Comment ? 'green' : '#485865'), borderRadius: 20, padding: 5, marginRight: 25 }}>
              <MaterialCommunityIcons /* style={{}}  */ name={'notebook-edit'} color='#fff' size={18} />
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => openGraceModal(index,item.Score)} style={{ backgroundColor: (item.Score ? 'green' : '#485865'), borderRadius: 20, padding: 5 }}>
              <MaterialCommunityIcons name={'calendar-clock-outline'} color='#fff' size={18} />
            </TouchableOpacity>
          </View>
        </View>

      </View>
    )
  }
  return (
    <View style={styles.centeredView}>
      {loading && <Loading />}
     {/*  {renderCommentModal()}
      {renderGraceModal()} */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          /*  Alert.alert("Modal has been closed."); */
          setModalVisible(!modalVisible);
        }}
      >
      
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => {
                index.toString();
              }}
              style={{ flexGrow: 0, height: '90%', paddingTop: 15 }}
            />
              {renderCommentModal()}
              {renderGraceModal()}
            <View style={{ flexDirection: 'row', /* marginTop: 35, */ justifyContent: 'space-around', alignItems: 'center', }}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => submit()}
              >
                <Text style={styles.textStyle}>Submit</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>


          </View>
        </View>
      </Modal>


    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  modalView: {
    // margin: 20,
    backgroundColor: "white",
    width: '100%',
    height: '95%',
    paddingVertical: 35,
    //  alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    paddingHorizontal: '11%',
    paddingVertical: '2%',
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
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
  imageCont: { marginLeft: 25,/* alignItems:'center', */justifyContent: 'space-around', paddingVertical: 10 },

});

//make this component available to the app
export default DataDisplay;
