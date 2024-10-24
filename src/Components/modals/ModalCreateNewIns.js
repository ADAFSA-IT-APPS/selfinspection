//import liraries
import React, { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image, TextInput, TouchableOpacity } from "react-native";
import { RadioButton } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";
import { AdhocInspection, } from "../../Redux/actions/SI_Action";
import Toast from 'react-native-root-toast';
import Loading from '../../Components/Loading';
import { RootSiblingParent } from 'react-native-root-siblings';
import ToastComp from "../ToastComp";

import ChecklistView from "../ChecklistView";
// create a component
const ModalCreateNewIns = ({ navigation, modalVisible, setModalVisible, lovDetails, image, text }) => {
  //const [modalVisible, setModalVisible] = useState(false);
  const [checked, setChecked] = React.useState('Direct Self Inspection');

  const [subChecked, setSubChecked] = React.useState(lovDetails[0]?.Value);
  const [subCheckedItem, setSubCheckedItem] = React.useState('');
  const [lovData, setLovData] = React.useState(lovDetails);
  const [vehicleText, setVehicleText] = React.useState("");
  const dispatch = useDispatch();
  const state = useSelector(state => state);

  useEffect(() => {
    setLovData(lovDetails)
  }, [lovDetails])

  const getInspectionType = (IType, subtype) => {
    console.log('lovDetails', lovDetails);
    console.log('subtypeitem', subtype);
    if (IType == 'Direct Self Inspection') {
      console.log('dsi');
      setChecked('Direct Self Inspection');
      setSubChecked(subtype?.Value)
      setSubCheckedItem(subtype)
      console.log('subtye', subChecked);

    } else {
      setSubChecked("")

      setChecked('Vehicle Self Inspection')
    }
  }


  const createInspection = () => {
    console.log('subtye', subChecked);

    if (checked == 'Direct Self Inspection') {
      if (subChecked) {
        console.log('subCheckedItem', subCheckedItem);
        dispatch(AdhocInspection(checked, '', subCheckedItem));
        setModalVisible(!modalVisible)

      } else {
        Toast.show('Please select checklist type', {
          duration: Toast.durations.LONG,
          position: 50,/* 
          shadow: true,
          animation: true,
          hideOnPress: true, */
          textColor: 'white',
        })
      }


    } else if (checked == 'Vehicle Self Inspection') {
      if (vehicleText === '') {
        console.log('testingtoast');
        //setModalVisible(!modalVisible)

        Toast.show('Please enter vehicle number', {
          duration: Toast.durations.LONG,
          position: 50,/* 
          shadow: true,
          animation: true,
          hideOnPress: true, */
          textColor: 'white',
        })
      } else {
        dispatch(AdhocInspection(checked, vehicleText));
        setModalVisible(!modalVisible)
      }
    }
  }
  return (
    /*  <RootSiblingParent> */
    <View style={styles.centeredView}>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ alignSelf: 'flex-start', }}>
              <Text style={{ color: '#5d6674', fontSize: 16, paddingBottom: 10 }}>Select Inspection Type</Text>
              <Pressable /* onPress={() => getInspectionType('Direct Self Inspection', '')} */ style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton
                  value="Direct Self Inspection"
                  color='#5d6674'
                  onPress={() => getInspectionType('Direct Self Inspection')}
                  status={checked === 'Direct Self Inspection' ? 'checked' : 'unchecked'}
                />
                <Text style={{ color: '#5d6674', }}>Direct Self Inspection</Text>
              </Pressable>
              {
                checked &&
                <ChecklistView subChecked={subChecked} getInspectionType={getInspectionType} />
                // <View style={{ paddingLeft: 25 }}>
                //   {
                //     lovData &&
                //     lovData.map((item, index) => (
                //       <Pressable key={index} onPress={() => getInspectionType('Direct Self Inspection', item)} style={{ flexDirection: 'row', alignItems: 'center' }}>
                //         <RadioButton
                //           value={item.Value}
                //           color='#5d6674'
                //           onPress={() => getInspectionType('Direct Self Inspection', item)}
                //           status={subChecked === item.Value ? 'checked' : 'unchecked'}
                //         />
                //         <Text style={{ color: '#5d6674', }}>{item.Value}</Text>
                //       </Pressable>
                //     ))
                //   }
                // </View>

              }
              <Pressable onPress={() => getInspectionType('Vehicle Self Inspection')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton
                  color='#5d6674'
                  value="Vehicle Self Inspection"
                  onPress={() => getInspectionType('Vehicle Self Inspection')}
                  status={checked === 'Vehicle Self Inspection' ? 'checked' : 'unchecked'}
                />
                <Text style={{ color: '#5d6674', }}>Vehicle Self Inspection</Text>
              </Pressable>
              {checked === 'Vehicle Self Inspection' &&
                <View style={{ addingVertical: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={{ color: '#5d6674' }}>Vehicle Number</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={setVehicleText}
                    placeholder="AUE-12345"
                    value={vehicleText}
                  />
                </View>}

            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={createInspection}
                >
                  <Text style={styles.textStyle}>Create</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Close</Text>
                </TouchableOpacity>
              </View>

            </View>

          </View>
        </View>
      </Modal>
    </View>
    /* </RootSiblingParent> */
  );
};

// define your styles
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    /*     marginTop: 22, */
    backgroundColor: '#00000030'
  },
  input: {
    height: 40,
    borderWidth: 1,
    width: '50%',
    borderColor: '#5d6674',
    padding: 10, margin: 12, color: '#5d6674',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    borderColor: '#5d6674',
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 5,
    paddingHorizontal: '14%',
    paddingVertical: '3%',
    elevation: 2
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
  imageCont: { width: 200, height: 200,/* borderColor:'red',borderWidth:1, */marginBottom: 15 /* height: '9%',  *//* marginVertical: 10, alignItems: 'center', justifyContent: 'center' */ },

});

//make this component available to the app
export default ModalCreateNewIns;
