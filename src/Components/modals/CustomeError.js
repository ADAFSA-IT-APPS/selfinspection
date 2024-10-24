import React, { useState, useEffect, forwardRef, useImperativeHandle, } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image } from "react-native";
import { ShowModal, CloseModal } from "../../Redux/actions/SI_Action";
import { useDispatch, useSelector } from 'react-redux';

const CustomError = ({ ...props }, ref) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [desc, setDesc] = useState('');
    useImperativeHandle(ref, () => ({
        show: (desc) => {
            setDesc(desc);
            setModalVisible(true)
        },
    }));

    const customProps = {
        image: props.image ? props.image : () => { },
    };


 
    const closeModal = () => {
        setDesc('')
        setModalVisible(false) 
    }


    useEffect(() => {
        /*  dispatch(onPressHandle()); */
        //console.log('statefrom modal', state.custom_errorTxt)
    }, [])
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    /*  Alert.alert("Modal has been closed."); */
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{desc}</Text>

                        {customProps.image && <View style={styles.imageCont}>
                            <Image style={[styles.tabBarLogo, { alignSelf: 'center', }]} source={customProps.image} />
                        </View>}
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={closeModal}
                        >
                            <Text style={styles.textStyle}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

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
        borderRadius: 15,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 5,
        padding: 5,
        paddingHorizontal: 15,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 25,
        textAlign: "center"
    },
    buttonClose: {
        backgroundColor: "#5d6674",
    },
});

export default forwardRef((props, ref) => CustomError(props, ref));