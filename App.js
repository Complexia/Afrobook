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


const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={HomeScreen} options={{title: "Home"}} />
            <HomeStack.Screen name="Titles" component={TitlesStackScreen} options={{title: "New books"}} />
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
                <Tabs.Navigator>
                    <Tabs.Screen name="Home" component={HomeStackScreen} />
                    <Tabs.Screen name="Library" component={LibraryScreen} />
                </Tabs.Navigator>
            </NavigationContainer>
        );
};

export default App;



