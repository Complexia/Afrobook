import 'react-native-gesture-handler';
import {StatusBar} from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import WelcomeScreen from './app/components/WelcomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './app/components/HomeScreen';
import TitlesScreen from './app/components/TitlesScreen';

import ReaderScreen from './app/components/ReaderScreen';

import DescriptionScreen from './app/components/DescriptionScreen';

import DownloadScreen from './app/components/DownloadScreen';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

const Tabs = createMaterialBottomTabNavigator();
const HomeStack = createStackNavigator();


const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator headerMode = "screen" screenOptions = {{headerTintColor: '#f0edf6', headerTitleAlign: "center", headerStyle:{backgroundColor: '#22236a'}}}>
            <HomeStack.Screen name="Home" component={HomeScreen} options={{title: "Home"}} />
            <HomeStack.Screen name="Description" component={DescriptionStackScreen} options={{title: "Description"}} />
            <HomeStack.Screen name="Download" component={DownloadScreen} options={{title: "Downloading"}} />
        </HomeStack.Navigator>
    )
}


const DescriptionStackScreen = () => {
    return (
        <HomeStack.Navigator >
            <HomeStack.Screen name="Description" component={DescriptionScreen} options={{title: "Description"}} />
            <HomeStack.Screen name="Reader" component={ReaderScreen} options={{title: "Reader"}} />
            <HomeStack.Screen name="Download" component={DownloadScreen} options={{title: "Downloading"}} />
        </HomeStack.Navigator>
    )
}

const TitlesStackScreen = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Titles" component={TitlesScreen} options={{title: "New books"}} />
            <HomeStack.Screen name="Description" component={DescriptionScreen} options={{title: "Description"}} />
        </HomeStack.Navigator>
    )
}



const App = () => {
        return (  
            <NavigationContainer>
                <Tabs.Navigator
                      initialRouteName="Home"
                      activeColor="#f0edf6"
                      inactiveColor="#C0C0C0"
                      barStyle={{ backgroundColor: '#22236a', paddingBottom: 2 }}
                >
                    <Tabs.Screen name="Home" component={HomeStackScreen} options = {{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="home" color={color} size={26} />
                        ),
                    }} />
                   <Tabs.Screen name="About" component={HomeStackScreen} options = {{
                        tabBarLabel: 'About',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="information-outline" color={color} size={26} />
                        ),
                    }} />
                </Tabs.Navigator>
            </NavigationContainer>
        );
};

const styles = StyleSheet.create({
    
    barIconStyle: {
        alignItems: "center",
        justifyContent: "center",
        
    },
    bottomTabsStyle: {
        backgroundColor: "goldenrod",
        
        justifyContent: "center",

    }
})

export default App;



