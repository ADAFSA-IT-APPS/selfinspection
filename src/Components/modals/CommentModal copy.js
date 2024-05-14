import React, { useState } from "react";
import { View, Modal, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { height, width } from '../../Util/CommonStyle/index'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { toast, getUserdetails } from '../../Util/CommonStyle';

const CommentModal = ({ visible,onClose,onsubmit }) => {
    const [comment, setComment] = useState('');
    const _check = () => {

    }
    const handleClose = () => {

    }
    const handleOnChangeComment = (text) => {
        setComment(text);
        console.log('text', comment);
    }

    const handleSubmit = () => {
       // if(!comment.trim() )return onClose();

        onsubmit(comment);
        setComment('');
    }
    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Modal visible={visible} animationType='fade' >
                <View style={styles.centeredView}>
                    <TextInput
                        multiline
                        color='#cecece'
                        placeholder='Enter Comment'
                        textAlign={'center'} style={{ textAlignVertical: 'top' }}
                        value={comment}
                        onChangeText={(text) => handleOnChangeComment(text)}
                    />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width / 1.4 }}>
                        <TouchableOpacity onPress={handleSubmit} style={styles.icon}>
                            <MaterialCommunityIcons style={{}} name={'check'} color='#fff' size={25} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleClose} style={styles.icon}>
                            <MaterialCommunityIcons onPress={onClose} style={{}} name={'close'} color='#fff' size={25} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>



    );
};

const styles = StyleSheet.create({
    centeredView: {
        justifyContent: 'space-around',
        alignItems: "center",
        /*     marginTop: 22, */
        borderRadius: 10,
        backgroundColor: '#5d6674',
        width: width / 1.2,
        height: '50%', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, /* marginHorizontal: 10 */

    },
    input: {
        height: 40,
        borderWidth: 1,
        width: '50%',
        borderColor: '#5d6674',
        padding: 10, /* margin: 12, */ color: '#5d6674',
    },
    icon: {
        borderColor: '#000',
        borderWidth: 1, paddingHorizontal: width / 10, borderRadius: 5
    }

});

export default CommentModal;



