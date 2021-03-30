import 'react-native-gesture-handler';
import React from 'react';

import DrawerNavigation from './navigation/DrawerNavigation';
import { NavigationContainer } from '@react-navigation/native';

class App extends React.Component{
  render(){
    return (
      <NavigationContainer>
          <DrawerNavigation/>
      </NavigationContainer>
    );
  }
  
}

export default App;