import 'react-native-gesture-handler';
import {StatusBar} from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Image,
    SafeAreaView
} from 'react-native';
import WelcomeScreen from './app/components/WelcomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './app/components/HomeScreen';
import TitlesScreen from './app/components/TitlesScreen';
import LibraryScreen from './app/components/LibraryScreen';
import ReaderScreen from './app/components/ReaderScreen';
import ExperimentScreen from './app/components/ExperimentScreen';
import DescriptionScreen from './app/components/DescriptionScreen';
import ExperimentScreen2 from './app/components/ExperimentScreen2';
import FlatListScreen from './app/components/FlatListScreen';
import DownloadScreen from './app/components/DownloadScreen';
import DescriptionAsyncScreen from './app/components/DescriptionAsyncScreen';
import ReaderAsyncScreen from './app/components/ReaderAsyncScreen';
import HamburgerNavigation from './app/components/HamburgerNavigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';


const Tabs = createMaterialBottomTabNavigator();
const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator screenOptions = {{headerStyle:{backgroundColor: 'black'}}}>
            <HomeStack.Screen name="Home" component={HomeScreen} options={{title: "Home"}} />
            <HomeStack.Screen name="Description" component={DescriptionStackScreen} options={{title: "Description"}} />
            
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
                      inactiveColor="#3e2465"
                      barStyle={{ backgroundColor: '#22236a', paddingBottom: 2 }}
                >
                    <Tabs.Screen style={styles.barIconStyle} name="Home" component={HomeStackScreen} />
                    <Tabs.Screen name="About" component={HomeStackScreen} />
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



