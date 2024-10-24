import React, { Component } from 'react';
import Toast from 'react-native-root-toast';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


/* --------------------------------   FontFamily   -------------------------- */
const FontFamily = {
    bold: "OpenSans-Bold",
    regular: "OpenSans-Regular",
    italic: "OpenSans-Italic",
};

/* -------------------------------    Color   -------------------------------- */
const Colors = {
    primary: '#5c6672',
    secondary: '#738591'
};

/* --------------------------------    Icons  ------------------------------- */
export { FontFamily, Colors };
import LeftLogo from '../../assets/img/icons/leftLogo.svg';
import RightLogo from '../../assets/img/icons/rightLogo.svg';
import ActiveAdafsaIns from '../../assets/img/icons/svg/activeAdafsaInspectionIcon.svg';
import ActiveCompletedTask from '../../assets/img/icons/svg/activeCompleredTaskIcon.svg';
import ActiveDirectTask from '../../assets/img/icons/svg/ActiveDirectTaskIcon.svg';
import ActiveScheduledTask from '../../assets/img/icons/svg/activeScheduledTaskIcon.svg';
import ActiveSelfIns from '../../assets/img/icons/svg/activeSelfInspectionIcon.svg';
import DailyIcon from '../../assets/img/icons/svg/dailyIcon.svg';
import DashboardIcon from '../../assets/img/icons/svg/dashboardIcon.svg';
import Delayed from '../../assets/img/icons/svg/delayedIcon.svg';
import Download from '../../assets/img/icons/svg/download.svg';
import InactiveAdafsaIns from '../../assets/img/icons/svg/inactiveADAFSAInspectionIcon.svg';
import InactiveCompletedTask from '../../assets/img/icons/svg/inactiveCompletedTaskIcon.svg';
import InactiveDirectTask from '../../assets/img/icons/svg/inactiveDirectTaskIcon.svg';
import InactiveScheduledTask from '../../assets/img/icons/svg/inactiveScheduledTaskIcon.svg';
import InactiveSelfIns from '../../assets/img/icons/svg/inactiveSelfinspectionIcon.svg';
import PendingTask from '../../assets/img/icons/svg/pendingtaskIcon.svg';
import RecallsIcon from '../../assets/img/icons/svg/recallsIcon.svg';
import InProgress from '../../assets/img/icons/svg/inprogress.svg';
import ManualIcon from '../../assets/img/icons/manualsIcon.jpg';
import SI_Logo_Arabic from '../../assets/img/icons/arabicSelfinspectionLogo.svg'
import SI_Logo_English from '../../assets/img/icons/selfInspectionImage.svg'

export const IconLeftActive = <ActiveDirectTask width={25} height={25} />;
export const IconRightActive = <ActiveCompletedTask width={25} height={25} />;
export const IconLeftInActive = <InactiveDirectTask width={25} height={25} />;
export const IconRightInActive = <InactiveCompletedTask width={25} height={25} />;
export const IconLeftActiveRoutine = <ActiveScheduledTask width={25} height={25} />;
export const IconLeftInActiveRoutine = <InactiveScheduledTask width={25} height={25} />;
export const IconLeftActiveDaily = <ActiveSelfIns width={25} height={25} />;
export const IconRightActiveDaily = <ActiveAdafsaIns width={25} height={25} />;
export const IconLeftInActiveDaily = <InactiveSelfIns width={25} height={25} />;
export const IconRightInActiveDaily = <InactiveAdafsaIns width={25} height={25} />;

export const PendingtaskIcon = <PendingTask width={35} height={35} />;
export const DownloadIcon = <InProgress width={35} height={35} />;
export const DelayedIcon = <Delayed width={35} height={35} />;


export {
    ManualIcon, SI_Logo_Arabic, SI_Logo_English, LeftLogo, RightLogo, DailyIcon, DashboardIcon, Download
    , RecallsIcon
}

export const toast = (text) => {
    Toast.show(text, {
        duration: Toast.durations.SHORT,
        position: 0,
    })
}

export async function getUserdetails() {
    try {
        return JSON.parse(await AsyncStorage.getItem('userdetails'));
    } catch (e) {
        console.log('getUser -> e', e);
    }
}

export const height = Dimensions.get('window').height;
export const width = Dimensions.get('window').width;