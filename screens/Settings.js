import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import { useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import { View,TouchableOpacity,SafeAreaView, TextInput,Text} from 'react-native';
import Slider from '@react-native-community/slider';
import * as Speech from 'expo-speech';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { useStateValue } from "../StateProvider";

const Settings = () => {
    const [prompt, setPrompt] = useState("Hello");
    const [voices, setVoices] = useState([]);
    const [activeVoice, setActiveVoice] = useState("en-US");
    const [pitch, setPitch] = useState(1);
    const [rate, setRate] = useState(1);
    const navigation = useNavigation();
    const [{voice,pitchs,rates},dispatch] = useStateValue();
  
    useEffect(() => {
      dispatch({
        type: "SET_VOICE",
        payload: activeVoice,
    })}, [activeVoice]);

    useEffect(() => {
      dispatch({
        type: "SET_PITCH",
        payload: pitch,
    })}, [pitch]);

    useEffect(() => {
    dispatch({
      type: "SET_RATE",
      payload: rate,
    })}, [rate]);

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
        Speech.speak(prompt,{language:voice,pitch:pitchs,rate:rates});
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
            items={voices.map(item=> ({id:item.identifier,name:item.language+"("+item.quality+")"}))}
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
        <Text style={tw`text-white text-center`}>{pitchs}</Text>
        <Slider
            style={tw` self-center w-11/12 p-2 bg-black h-10 mt-4 shadow-lg`}
            minimumValue={1}
            maximumValue={3}
            minimumTrackTintColor="#00FFFF"
            maximumTrackTintColor="#008080"
            onValueChange={value => setPitch(value)}
            step={0.1}
          />

        <Text style={tw`text-white text-center mt-2`}>Rate of the voice</Text>
        <Text style={tw`text-white text-center`}>{rates}</Text>
        <Slider
            style={tw` self-center w-11/12 p-2 bg-black h-10 mt-4 shadow-lg`}
            minimumValue={1}
            maximumValue={2}
            minimumTrackTintColor="#00FFFF"
            maximumTrackTintColor="#008080"
            onValueChange={value => setRate(value)}
            step={0.1}
          />
      <TextInput
        onChangeText={(text) => setPrompt(text)}
        value={prompt}
        style={tw` self-center w-11/12 p-2 bg-black border-gray-50 h-10 mt-4 shadow-lg text-white border`}
      />
      <View style={tw`self-center w-9/12`}>
      <TouchableOpacity
      onPress={() => speak()}
      style={tw`p-2 bg-gray-800 h-10 mt-4 shadow-lg rounded`}>
        <Text style={tw`font-bold text-white text-center`}>Test</Text>
      </TouchableOpacity>
      </View>
        </View>
        </SafeAreaView>
        </>
      );
}

export default Settings;