import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
   import TitlesScreen from './TitlesScreen';
   import LibraryScreen from './LibraryScreen';
   
   const HamburgerNavigation = createDrawerNavigator(
       {
           TitlesScreen: TitlesScreen,
           LibraryScreen: {
               screen: LibraryScreen,
           }
           
       },
       {
           initialRouteName: 'LibraryScreen',
           
           
       }
    );
   
   
   export default createAppContainer(HamburgerNavigation);