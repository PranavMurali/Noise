import React from 'react';
import { StyleSheet, Text, View , SafeAreaView,Image} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Card from '../components/Card';
import NavOptions from '../components/NavOptions';


const Homescreen = () => {
    return (
        <SafeAreaView style={tw`bg-black h-full`}>
                <View style ={tw`p-5`}>
                    <Image 
                    style={{
                        width: 100,
                        height: 100,
                        resizeMode:"contain",
                    }}
                    source={require('../imgs/logo.png')} 
                    />
                    <NavOptions/>
                    <Card/>
                </View>
        </SafeAreaView>
    )
}

export default Homescreen

const styles = StyleSheet.create({})
