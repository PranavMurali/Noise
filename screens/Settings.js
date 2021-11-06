import React from 'react'
import { StyleSheet, Text, View ,TouchableOpacity,SafeAreaView} from 'react-native'
import tw from 'tailwind-react-native-classnames'
import {Icon} from 'react-native-elements'
import { useNavigation } from '@react-navigation/core'


const Settings = () => {
    const navigation=useNavigation();
    return (
        <SafeAreaView style={tw`bg-black h-full`}>
        <View>
            <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={tw`bg-gray-100 absolute top-16 left-8 z-50 p-3 rounded-full shadow-lg`}>
                <Icon name="menu" type="material-community" color="#000" size={30} />
            </TouchableOpacity>
        </View>
        <View style ={tw`bg-gray-300 mt-20`}>
            <Text style={tw` text-center py-5 text-xl`}>Voice Settings</Text>
            <View style={tw` border-t border-gray-200 flex-shrink`}>
                <View>
                    <Text style={tw` text-center py-5 text-xl`}>Location Settings</Text>
                </View>
            </View>
        </View>
        </SafeAreaView>
    )
}

export default Settings

