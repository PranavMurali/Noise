import React from 'react'
import { StyleSheet, Text, SafeAreaView, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'

const Card = () => {
    return (
        <SafeAreaView style ={tw`bg-gray-300 `}>
            <Text style={tw` text-center py-5 text-xl`}>Card</Text>
            <View style={tw` border-t border-gray-200 flex-shrink`}>
                <View>
                    <Text style={tw` text-center py-5 text-xl`}>Card</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Card
