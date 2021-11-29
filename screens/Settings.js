import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import { useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import { View, Button, TouchableOpacity,SafeAreaView, TextInput,Text} from 'react-native';
import Slider from '@react-native-community/slider';
import * as Speech from 'expo-speech';
import SearchableDropdown from 'react-native-searchable-dropdown';

const Settings = () => {
    const [prompt, setPrompt] = useState("Hello");
    const [voices, setVoices] = useState([]);
    const [activeVoice, setActiveVoice] = useState(null);
    const [pitch, setPitch] = useState(1);
    const [rate, setRate] = useState(1);
    const navigation = useNavigation();
    
    useEffect(() => {
      (async () => {
        try {
          let response =await Speech.getAvailableVoicesAsync();
          setVoices(response);
        } catch (error) {
          console.log("Oh nuu" ,error);
        } 
      })();
  }, []);

    const speak = () => {
        Speech.speak(prompt,{language:activeVoice,pitch:pitch,rate:rate});
      };
      return (
        <>
        <SafeAreaView>
        <View style={tw`bg-black h-full`}>
        <View>
            <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={tw`bg-gray-100 absolute top-16 left-8 z-50 p-3 rounded-full shadow-lg`}>
                <Icon name="menu" type="material-community" color="#000" size={30} />
            </TouchableOpacity>
        </View>
        <Text style={tw`text-white text-center mt-40`}>Choose the language/Accent of voice</Text>
        <Text style={tw`text-white text-center`}>{activeVoice}</Text>
        <SearchableDropdown
            onItemSelect={(item) => setActiveVoice(item.name)}
            containerStyle={{ padding: 5 ,marginTop:20}}
            itemStyle={{
              padding: 10,
              marginTop: 2,
              backgroundColor: '#ddd',
              borderColor: '#bbb',
              borderWidth: 1,
              borderRadius: 5,
            }}
            itemTextStyle={{ color: '#222' }}
            itemsContainerStyle={{ maxHeight: 140}}
            placeholderTextColor="#fff"
            items={voices.map(item=> ({id:item.identifier,name:item.language}))}
            resetValue={false}
            textInputProps={
              {
                placeholder: "Choose Language",

                underlineColorAndroid: "transparent",
                style: {
                    color : "#fff",
                    padding: 12,
                    borderRadius: 5,
                    backgroundColor: '#1a1a1a',
                },
                onTextChange: text => console.log(text)
              }
            }
            listProps={
              {
                nestedScrollEnabled: true,
              }
            }
        />
        <Text style={tw`text-white text-center mt-2`}>Pitch of the voice</Text>
        <Text style={tw`text-white text-center`}>{pitch}</Text>
        <Slider
            style={{width: 400, height: 40,marginTop:30 ,backgroundColor:'#fff'}}
            minimumValue={1}
            maximumValue={3}
            minimumTrackTintColor="#333333"
            maximumTrackTintColor="#0d0d0d"
            onValueChange={value => setPitch(value)}
            step={0.1}
          />

        <Text style={tw`text-white text-center mt-2`}>Rate of the voice</Text>
        <Text style={tw`text-white text-center`}>{rate}</Text>
        <Slider
            style={{width: 400, height: 40,marginTop:30 ,backgroundColor:'#fff'}}
            minimumValue={1}
            maximumValue={2}
            minimumTrackTintColor="#333333"
            maximumTrackTintColor="#0d0d0d"
            onValueChange={value => setRate(value)}
            step={0.1}
          />
      <TextInput
        onChangeText={(text) => setPrompt(text)}
        value={prompt}
        style={tw`bg-gray-100 shadow-lg mt-10`}
      />
      
      <Button title="Speak" onPress={speak}/>
        </View>
        </SafeAreaView>
        </>
      );
}

export default Settings;