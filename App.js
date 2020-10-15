import 'react-native-gesture-handler';

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
import { useIsFocused } from '@react-navigation/native';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import AboutScreen from './app/components/AboutScreen';

const Tabs = createMaterialBottomTabNavigator();
const HomeStack = createStackNavigator();


const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator headerMode = "screen" screenOptions = {{ headerTintColor: '#f0edf6', headerTitleAlign: "center", headerStyle:{backgroundColor: '#22236a'}}}>
            <HomeStack.Screen name="Home" component={HomeScreen} options={{title: "AfroStory", headerLeft: null,}} />
            <HomeStack.Screen name="Description" component={DescriptionStackScreen} options={{title: "Description"}} />
            <HomeStack.Screen name="Download" component={DownloadStackScreen} options={{title: "Downloading"}} />
            <HomeStack.Screen name="HomeStack" component={HomeStackScreen} options={{title: "AfroStory", headerLeft: null,}} />
        </HomeStack.Navigator>
    )
}


const DescriptionStackScreen = () => {
    return (
        <HomeStack.Navigator headerMode = "screen" screenOptions = {{headerTintColor: '#f0edf6', headerTitleAlign: "center", headerStyle:{backgroundColor: '#22236a'}}} >
            <HomeStack.Screen name="Description" component={DescriptionScreen} options={{title: "Description"}} />
            <HomeStack.Screen name="Reader" component={ReaderScreen} options={{title: "Reader"}} />
            <HomeStack.Screen name="Download" component={DownloadStackScreen} options={{title: "Downloading"}} />
            <HomeStack.Screen name="Home" component={HomeScreen} options={{title: "AfroStory"}} />
        </HomeStack.Navigator>
    )
}

const AboutStackScreen = () => {
    return (
        <HomeStack.Navigator headerMode = "screen" screenOptions = {{headerTintColor: '#f0edf6', headerTitleAlign: "center", headerStyle:{backgroundColor: '#22236a'}}}>
            <HomeStack.Screen name="About" component={AboutScreen} options={{title: "About"}} />
            <HomeStack.Screen name="Home" component={HomeScreen} options={{title: "AfroStory"}} />
        </HomeStack.Navigator>
        
    )
}

const DownloadStackScreen = () => {
    return (
        <HomeStack.Navigator headerMode = "screen" screenOptions = {{headerTintColor: '#f0edf6', headerTitleAlign: "center", headerStyle:{backgroundColor: '#22236a'}}} >
            <HomeStack.Screen name="Download" component={DownloadScreen} options={{title: "Downloading"}} />
            <HomeStack.Screen name="Home" component={HomeScreen} options={{title: "AfroStory"}} />
            
        </HomeStack.Navigator>
    )
}



const HomeTabScreen = () => {
    
    
    return (
        
            <Tabs.Navigator
            
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
                <Tabs.Screen name="About" component={AboutStackScreen} options = {{
                    tabBarLabel: 'About',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="information-outline" color={color} size={26} />
                    ),
                }} />
            </Tabs.Navigator>
        
        
                
    )
}

const LoadStackScreen = () => {
    return (
        <NavigationContainer>
            
            <HomeStack.Navigator headerMode = "screen" screenOptions = {{headerLeft: null, headerTintColor: '#f0edf6', headerTitleAlign: "center", headerStyle:{backgroundColor: '#22236a'}}}>
                <HomeStack.Screen name="Welcome" component={WelcomeScreen} options={{title: "AfroStory"}}/>
                <HomeStack.Screen name="Home" component ={HomeTabScreen} options={{title: "AfroStory" }} />
            </HomeStack.Navigator>
        </NavigationContainer>
    )
}



const App = () => {
        return (  
            
            <LoadStackScreen />
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



