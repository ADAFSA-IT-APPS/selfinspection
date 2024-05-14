import React, { Component } from 'react';
import { View, Pressable, TouchableOpacity, Text, Dimensions, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../screens/Dashboard';
import Daily from '../screens/Daily';
import Live from '../screens/Live';
import Manuals from '../screens/Manuals';
import Recalls from '../screens/Recalls';
import RoutineSelf from '../screens/RoutineSelf';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import { BottomTabBarProps, BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import TaskDetails from '../screens/StackScreens/TaskDetails';
import TaskDetailsDaily from '../screens/StackScreens/TaskDetailsDaily';
import { DashboardIcon, DailyIcon, RecallsIcon, InProgress, ManualIcon } from '../Util/CommonStyle';
import Notifications from '../screens/StackScreens/Notifications';
import SRScreen from '../screens/StackScreens/SRScreen';
import { useTranslation } from 'react-i18next';
import CallScreen from '../screens/CallScreen';
import Join from '../screens/Join';
import { useDispatch, useSelector } from 'react-redux';
import ModalComp from '../Components/modals/ModalComp';
import LiveTest from '../screens/LiveTest'


const Tab = createBottomTabNavigator();
const RoutineStack = createStackNavigator();

const RoutineselfStack = ({ navigation }) => {
  return (
    <RoutineStack.Navigator>
      <RoutineStack.Screen options={{ headerShown: false }} name="Routineself" component={RoutineSelf} />
      <RoutineStack.Screen options={{ headerShown: false }} name="TaskDetails" component={TaskDetails} />
    </RoutineStack.Navigator>
  )
}

const DashboardStack = createStackNavigator();

const DashboardselfStack = ({ navigation }) => {
  return (

    <DashboardStack.Navigator>
      <DashboardStack.Screen options={{ headerShown: false }} name="Dashboard" component={Dashboard} />
      <DashboardStack.Screen options={{ headerShown: false }} name="TaskDetails" component={TaskDetails} />
      <DashboardStack.Screen options={{ headerShown: false }} name="CallScreen" component={CallScreen} />

    </DashboardStack.Navigator>
  )
}

const DailyStack = createStackNavigator();

const DailyselfStack = ({ navigation }) => {
  return (
    <DailyStack.Navigator>
      <DailyStack.Screen options={{ headerShown: false }} name="Daily" component={Daily} />
      <DailyStack.Screen options={{ headerShown: false }} name="TaskDetails" component={TaskDetails} />

    </DailyStack.Navigator>
  )
}

const LiveStack = createStackNavigator();

const LiveselfStack = ({ navigation }) => {
  return (
    <LiveStack.Navigator>
      <LiveStack.Screen options={{ headerShown: false }} name="Live" component={Live} />
    </LiveStack.Navigator>
  )
}

const NotificationStack = createStackNavigator();

const NotificationsStack = ({ navigation }) => {
  return (
    <DailyStack.Navigator>
      <NotificationStack.Screen options={{ headerShown: false }} name="Notifications" component={Notifications} />
      <NotificationStack.Screen options={{ headerShown: false }} name="SRScreen" component={SRScreen} />

      <NotificationStack.Screen options={{ headerShown: false }} name="TaskDetails" component={TaskDetails} />

    </DailyStack.Navigator>
  )
}


const ScreenOptions = ({ route }/* :{route:BottomTabNavigationOptions} */) => {
  const TabBarIcon = route.tabBarIcon({ color: '#fff', size: 20 })
  return TabBarIcon;
};


const TabBar = ({ state, descriptors, navigation }/* :BottomTabBarProps */) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }
  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.menu}
            key={index}
          >
            <View style={[styles.menuInner, { backgroundColor: isFocused ? '#485865' : '#738591', borderRadius: isFocused ? 15 : 0 }]}>
              <View style={{ paddingBottom: 5 }}>
                <ScreenOptions route={options} />
              </View>
              <Text numberOfLines={1} style={styles.menuText}>
                {label}
              </Text>
            </View>

          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Tabs = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const loginState = useSelector(state => state)
  const tabPressedEvent = (e, screen) => {
    e.preventDefault();
    if (loginState.userToken) { // check if user is logged in
    //  navigation.navigate(screen)
    } else {
      // alert("User is not logged in")
      // navigation.navigate('Login')

    }
  }

  return (
    <Tab.Navigator
      tabBar={props => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="dashboard"
        component={/* loginState.pushnotification ? CallScreen : */ DashboardselfStack}
        // component={CallScreen}
        /* listeners={{
          tabPress: (e) => tabPressedEvent(e, 'dashboard')
        }} */
        options={{
          tabBarLabel: t('Dashboard'),
          tabBarLabelStyle: { color: '#000' },
          tabBarIcon: ({ color, size }) => (
            <DashboardIcon width={20} height={20} />
          ),
        }} />

      <Tab.Screen name="routineself" component={RoutineselfStack}
        options={{ 
          tabBarLabel: t('RoutineSelf'),
          tabBarLabelStyle: { color: '#fff' },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar-month" color='#fff' size={20} />
          ),
        }}
      />

      <Tab.Screen name="daily" component={DailyselfStack}
        options={{
          tabBarLabelStyle: { color: '#fff' },
          tabBarLabel: t('Daily'), 
          tabBarIcon: ({ color, size }) => (
            <DailyIcon width={20} height={20} /> 
          ),
        }}
      />
      <Tab.Screen name="Live" component={LiveTest}
       listeners={{
        tabPress: (e) => tabPressedEvent(e, 'dashboard')
      }}
        options={{
          tabBarLabel: t('Live'),
          tabBarLabelStyle: { color: '#fff' },
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color='#fff' size={20} />
          ),
        }}
      />
      <Tab.Screen name="manuals" component={Manuals}
        options={{
          tabBarLabel: t('Manuals'),
          tabBarLabelStyle: { color: '#fff' },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="notebook-outline" color='#fff' size={20} />
          ),
        }}
      />
      <Tab.Screen name="recalls" component={Recalls}
        options={{
          tabBarLabel: t('Recalls'),
          tabBarLabelStyle: { color: '#fff' },
          tabBarIcon: ({ color, size }) => (
            <RecallsIcon width={20} height={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  menu: { flex: 1, backgroundColor: '#738591', alignItems: 'center', padding: 1 },
  menuInner: { flexGrow: 1, width: '100%', paddingHorizontal: 2, paddingVertical: 12, alignItems: 'center' },
  menuText: { color: '#fff', fontSize: 10/* ,paddingBottom:10  */ },
});
export default Tabs;