import React, { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image, TextInput, TouchableOpacity } from "react-native";
import { RadioButton } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";

const ChecklistView = (props) => {
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const lovDetails = useSelector(state => state.lovDetails);
    const [subChecked, setSubChecked] = React.useState(lovDetails[0]?.Value);
    const [subCheckedItem, setSubCheckedItem] = React.useState('');
    const [lovData, setLovData] = React.useState(lovDetails);

    useEffect(() => {
        setLovData(lovDetails)
    }, [lovDetails])


    return (
        <View style={{ paddingLeft: 25 }}>
            {
                lovData &&
                lovData.map((item, index) => (
                    <Pressable key={index} onPress={() => props.getInspectionType('Direct Self Inspection', item)} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton
                            value={item.Value}
                            color='#5d6674'
                            onPress={() => props.getInspectionType('Direct Self Inspection', item)}
                            status={props.subChecked === item.Value ? 'checked' : 'unchecked'}
                        />
                        <Text style={{ color: '#5d6674', }}>{item.Value}</Text>
                    </Pressable>
                ))
            }
        </View>
    );
};

export default ChecklistView;
