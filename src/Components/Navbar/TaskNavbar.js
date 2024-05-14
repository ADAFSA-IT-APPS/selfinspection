import React from "react";
import { View, Image, TouchableOpacity, StyleSheet, Text, I18nManager } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import NavigationService from "../../navigation/NavigationService";
import { useSelector, useDispatch } from 'react-redux';
import { GetCheckList, Search_Establishment_History } from '../../Redux/actions/SI_Action';
import { LeftLogo, RightLogo } from '../../Util/CommonStyle';



const TaskNavbar = ({ taskno }) => {/* 
    const navigation = useNavigation(); */
    const insets = useSafeAreaInsets();
    const dispatch = useDispatch();
    const Eshtablisment_Inspection_Type = useSelector(state => state.Eshtablisment_Inspection_Type);


    const back = () => {
        console.log('back');
        dispatch(Search_Establishment_History());

        NavigationService.goBack();
    }

    return (
        <View style={[styles.tabBar, { marginTop: insets.top /* ,justifyContent:'space-between',width:'100%' */ }]}>
            <TouchableOpacity onPress={() => { NavigationService.goBack(); }}
                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', width: '35%' }}>
                <View>
                    <MaterialCommunityIcons style={{ alignSelf: 'flex-start' }} name="chevron-left" color="#fff" size={32} onPress={back} />
                </View>
                <Text style={{ color: '#fff', fontWeight: '600' }}>{taskno}</Text>
            </TouchableOpacity>
            {/*   <View style={{ width: 170, height: '100%', paddingRight: 5 }} >
                <Image style={styles.tabBarLogo} source={require('../../assets/img/adfca.png')} />
            </View> */}
            <View style={{ width: 170, height: '100%', paddingRight: 5 }} >
                {I18nManager.isRTL ?   <LeftLogo />:<RightLogo />}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBar: {
        width: '100%',
        height: '8%',
        backgroundColor: '#738591',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    tabBarLogo: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    }
});

export default TaskNavbar;
