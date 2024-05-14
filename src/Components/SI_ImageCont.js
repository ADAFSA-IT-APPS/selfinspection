import React from "react";
import { View ,Image,StyleSheet,I18nManager,Dimensions} from "react-native";
import { SI_Logo_Arabic,SI_Logo_English} from '../Util/CommonStyle'


const height= Dimensions.get('window').height;
const width= Dimensions.get('window').width;

const SI_ImageCont = () => {
    return (
        <View style={styles.imageCont}>
            {/* <Image style={[styles.tabBarLogo, { alignSelf: 'center', }]} source={require('../assets/img/icons/arabicSelfinspectionLogo.jpeg')} /> */}
            {I18nManager.isRTL?<SI_Logo_Arabic width={170} height={50} />:<SI_Logo_English width={170} height={50} />}
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBarLogo: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    imageCont: { /* height: '9%', */ marginVertical: height/60, alignItems: 'center', justifyContent: 'center' },

});
export default SI_ImageCont;
