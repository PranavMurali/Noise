import { useNavigation} from '@react-navigation/core';
import React from 'react'
import { FlatList, Text, TouchableOpacity, View ,Image} from 'react-native'
import { Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames'


const data=[
    {
        id:"1",
        title:"Home",
        image:"https://i.imgur.com/2kr3TIL.jpeg",
        screen:"Camera",
    },
    {
        id:"2",
        title:"Settings",
        image:"https://i.imgur.com/2kr3TIL.jpeg",
        screen:"Settings",
    }
]

const NavOptions = () => {
    const navigation = useNavigation();
    return (
        <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
            <TouchableOpacity
            onPress={() => navigation.navigate(item.screen)}
            style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-700 m-2 w-40 rounded-lg`}>
                <View>
                    <Image 
                    source={{
                        uri:item.image
                    }}
                    style={{width: 120, height:120, resizeMode:"contain"}}/>
                    <Text style={tw`mt-2 text-lg font-semibold text-white`}>{item.title}</Text>
                    <Icon 
                    style={tw`p-2 bg-black rounded-full w-10 mt-4 `}
                    name='arrowright' color="white" type='antdesign' />
                </View>
            </TouchableOpacity>
        )}
    />
)};

export default NavOptions

