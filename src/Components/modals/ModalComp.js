//import liraries
import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image ,Dimensions} from "react-native";


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
// create a component
const ModalComp = ({ navigation, modalVisible, setModalVisible, image, text }) => {
  // const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
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
            <View style={styles.imageCont}>
              {image && <Image style={{width: 180, height:180 }}                         source={{uri:image}}  
/>}
              {text && <Text style={{textAlign:'center',paddingBottom:10,fontSize:height*0.017}}>{text}</Text>}
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        {/*       <Pressable
                style={[styles.button, styles.buttonOK]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>OK</Text>
              </Pressable> */}
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
      {/*         <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable> */}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width:'75%',
    borderColor: '#5d6674',
    borderWidth: 1,
    paddingVertical: 35,
    alignItems: "center",
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
    paddingHorizontal: '16%',
    paddingVertical: '3%',
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
  imageCont: { /* width: 200, height: 200, *//* borderColor:'red',borderWidth:1, */marginBottom: 15 /* height: '9%',  *//* marginVertical: 10, alignItems: 'center', justifyContent: 'center' */ },

});

//make this component available to the app
export default ModalComp;
