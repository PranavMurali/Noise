import React from 'react'
import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import tw from 'tailwind-react-native-classnames'
import {Icon} from 'react-native-elements'
import { useNavigation } from '@react-navigation/core'


const Settings = () => {
    const navigation=useNavigation();
    return (
        <View>
            <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={tw`bg-gray-100 absolute top-16 left-8 z-50 p-3 rounded-full shadow-lg`}>
                <Icon name="menu" type="material-community" color="#000" size={30} />
            </TouchableOpacity>
            <Text>Settings</Text>
        </View>
    )
}

export default Settings

