import React from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import Homescreen from './screens/Homescreen';
import CamerScreen from './screens/CamerScreen';
import {StateProvider} from "./StateProvider"
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import tw from "tailwind-react-native-classnames"
import Settings from './screens/Settings';
import { useKeepAwake } from 'expo-keep-awake';
import reducer, { initialState } from './reducer/reducer';

export default function App() {
  useKeepAwake();
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
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
    </StateProvider>
  );
}


