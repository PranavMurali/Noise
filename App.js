import React from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {Provider} from 'react-redux';
import Homescreen from './screens/Homescreen';
import CamerScreen from './screens/CamerScreen';
import {store} from './store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import tw from "tailwind-react-native-classnames"
import Settings from './screens/Settings';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <KeyboardAvoidingView 
          style={tw`flex-1`} 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
          >
          <Stack.Navigator>
            <Stack.Screen 
              name="Home" 
              component={Homescreen} 
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen 
              name="Camera" 
              component={CamerScreen} 
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen 
              name="Settings" 
              component={Settings} 
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}


