import React, {useState, useEffect, useContext} from 'react';
import { createStackNavigator} from '@react-navigation/stack';

import AuthStackScreens from '../navigation/AuthStackScreens';
import MainStackScreens from '../navigation/MainStackScreens';
import { NavigationContainer } from '@react-navigation/native';


import { authStateChange } from '../components/Firebase/firebase'


const AppStack = createStackNavigator();


function AppStackScreens() {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = authStateChange(onAuthStateChanged);
        return subscriber; 
    }, []);

    if (initializing) return null;

    return(
        <NavigationContainer >
            <AppStack.Navigator>
                {!user ? (
                    <AppStack.Screen name="Auth" component={AuthStackScreens}/>
                ):

                (
                    <AppStack.Screen name="Main" component={MainStackScreens}/>
                )}
                
            </AppStack.Navigator>
        </NavigationContainer>
    
    )
}

export default AppStackScreens;

