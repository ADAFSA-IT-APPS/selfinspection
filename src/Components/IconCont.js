import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Pressable, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const IconCont = ({ size, iconName }) => {
    return (
      <TouchableOpacity style={{ backgroundColor: '#485865', borderRadius: 100, padding: 5 ,/* height:'auto', *//* width:'15%', */alignItems:'center',justifyContent:'center'}}>
        <MaterialCommunityIcons style={{}} name={iconName} color='#fff' size={size} />
      </TouchableOpacity>
    )
  }

export default IconCont;
