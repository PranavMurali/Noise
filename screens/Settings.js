import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import { useNavigation} from '@react-navigation/core';
import React, {useEffect,useState} from 'react';
import { View, Button, TouchableOpacity,SafeAreaView, TextInput} from 'react-native';
import * as Speech from 'expo-speech';
import SearchableDropdown from 'react-native-searchable-dropdown';

const Settings = () => {
    const [prompt, setPrompt] = useState("Hello");
    const [voices, setVoices] = useState([]);
    const [activeVoice, setActiveVoice] = useState(null);
    const navigation = useNavigation();
    
    const getvoices = async () => {
      try {
        let response =await Speech.getAvailableVoicesAsync()
        setVoices(response);
      } catch (error) {
        console.log("Oh nuu" ,error);
      } 
    };

    const speak = () => {
        Speech.speak(prompt,{language:activeVoice});
      };
      getvoices();
      return (
        <SafeAreaView>
        <View style={tw`bg-black h-full`}>
        <View>
            <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={tw`bg-gray-100 absolute top-16 left-8 z-50 p-3 rounded-full shadow-lg`}>
                <Icon name="menu" type="material-community" color="#000" size={30} />
            </TouchableOpacity>
        </View>
        <SearchableDropdown
            onItemSelect={(item) => setActiveVoice(item.name)}
            containerStyle={{ padding: 5 ,marginTop:150}}
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
      <TextInput
        onChangeText={(text) => setPrompt(text)}
        value={prompt}
        placeholder="useless placeholder"
        style={tw`bg-gray-100 shadow-lg`}
      />
      <Button title="Speak" onPress={speak} />
        </View>
        </SafeAreaView>
      );
}

export default Settings;