import React from "react";
import { View,StyleSheet } from "react-native";

const Container = (props) => {
    return (
        <View {...props} style={styles.container}>
            {props.children}   
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'red'
    },
});
export default Container;
