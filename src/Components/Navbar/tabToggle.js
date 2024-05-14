import * as React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, I18nManager,Platform } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';



const TabToggle = ({ focusedScreen, setFocusedScreen, leftText, rightText, IconLeftActive, IconRightActive,IconLeftInActive, IconRightInActive, }) => {
    return (
        <View style={styles.tabBarStyle}>
            <View style={styles.tabBarBtnsContainer}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => setFocusedScreen(1)}
                    style={{
                        ...styles.tabBarBtn,
                        ...styles.leftTabBarBtn,
                        ...(focusedScreen == 1
                            ? styles.focusedBtn
                            : styles.unfocusedTabBarBtn),
                    }}>
                    <View style={styles.container}>
                        {/* {IconLeft} */}
                        {focusedScreen == 1 ? IconLeftActive : IconLeftInActive    }
                        <View style={styles.lineCont}><Text style={[styles.line], { backgroundColor: focusedScreen == 1 ? '#fff' : '#000' }} ></Text></View>
                        <Text style={{ color: focusedScreen == 1 ? '#fff' : '#000', fontSize:Platform.OS === 'ios' ? 12 : 15}}>{leftText}</Text>
                    </View>
                    {focusedScreen == 1 && (
                        <View style={{ ...styles.arrawView, ...styles.leftArrow }}>
                            <View
                                style={{
                                    ...styles.triangle,
                                    ...styles.triangleCornerLeft,
                                }}
                            />
                            <View
                                style={{
                                    ...styles.triangle,
                                    ...styles.triangleCornerLeftChild,
                                }}
                            />
                        </View>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => setFocusedScreen(2)}
                    style={{
                        ...styles.tabBarBtn,
                        ...styles.rightTabBarBtn,
                        ...(focusedScreen == 2
                            ? styles.focusedBtn
                            : styles.unfocusedTabBarBtn),
                    }}>
                    <View style={styles.container}>
                    {focusedScreen == 2 ? IconRightActive : IconRightInActive}
                        <View style={styles.lineCont}><Text style={[styles.line], { backgroundColor: focusedScreen == 2 ? '#fff' : '#000' }} ></Text></View>
                        <Text style={{ color: focusedScreen == 2 ? '#fff' : '#000', fontSize:Platform.OS === 'ios' ? 12 : 15 }}>{rightText}</Text>
                    </View>
                    {focusedScreen == 2 && (
                        <View style={{ ...styles.arrawView, ...styles.rightArrow }}>
                            <View
                                style={{
                                    ...styles.triangle,
                                    ...styles.triangleCornerRight,
                                }}
                            />
                            <View
                                style={{
                                    ...styles.triangle,
                                    ...styles.triangleCornerRightChild,
                                }}
                            />
                        </View>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default TabToggle;

const TAB_BAR_HEIGHT = 50;
const FOCUSED_COLOR = '#5c6672';
const UNFOCUSED_COLOR = '#c9ced4';
const BORDER_COLOR = '#444e54';
const BORDER_WIDTH = 4;

const styles = StyleSheet.create({
    container: { flexDirection: 'row', alignItems: 'center' },
    tabBarStyle: {
        width: '100%',
        justifyContent: 'flex-end',
        height: TAB_BAR_HEIGHT + 4,
        backgroundColor: FOCUSED_COLOR,
        borderBottomWidth: 2,
        //  borderBottomColor: BORDER_COLOR,
    },
    tabBarBtnsContainer: {
        flexDirection: 'row',
        width: '100%',
        height: TAB_BAR_HEIGHT,
    },
    tabBarBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    leftTabBarBtn: { paddingRight: TAB_BAR_HEIGHT / 2 + 8 },
    rightTabBarBtn: { paddingLeft: TAB_BAR_HEIGHT / 2 + 8 },
    focusedBtn: { backgroundColor: FOCUSED_COLOR, zIndex: 1 },
    unfocusedTabBarBtn: { backgroundColor: UNFOCUSED_COLOR, zIndex: 0 },
    arrawView: {
        position: 'absolute',
        width: -TAB_BAR_HEIGHT,
        height: -TAB_BAR_HEIGHT,
        zIndex: 1,
    },
    leftArrow: {
        right: -TAB_BAR_HEIGHT / 2,
        backgroundColor: UNFOCUSED_COLOR,
    },
    rightArrow: {
        left: -TAB_BAR_HEIGHT / 2,
        backgroundColor: UNFOCUSED_COLOR,
    },
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderRightColor: 'transparent',
        borderStyle: 'solid',
    },
    triangleCornerLeft: {
        borderRightWidth: TAB_BAR_HEIGHT,
        borderTopWidth: TAB_BAR_HEIGHT,
        borderTopColor: BORDER_COLOR,
        transform: I18nManager.isRTL ? [{ rotate: '90deg' }] : [{ rotate: '270deg' }],
    },
    triangleCornerLeftChild: {
        borderRightWidth: TAB_BAR_HEIGHT - BORDER_WIDTH,
        borderTopWidth: TAB_BAR_HEIGHT - BORDER_WIDTH,
        borderTopColor: FOCUSED_COLOR,
        transform: I18nManager.isRTL ? [{ rotate: '90deg' }] : [{ rotate: '270deg' }],
        position: 'absolute',
        bottom: 0,
    },
    triangleCornerRight: {
        borderRightWidth: TAB_BAR_HEIGHT,
        borderTopWidth: TAB_BAR_HEIGHT,
        borderTopColor: BORDER_COLOR,
        transform: [{ rotate: '180deg' }],
    },
    triangleCornerRightChild: {
        borderRightWidth: TAB_BAR_HEIGHT - BORDER_WIDTH,
        borderTopWidth: TAB_BAR_HEIGHT - BORDER_WIDTH,
        borderTopColor: FOCUSED_COLOR,
        transform: [{ rotate: '180deg' }],
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    lineCont: { paddingHorizontal: 3, height: '55%' },
    line: {
        height: '100%',
        width: 1,
    }
});