import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import { useNavigation} from '@react-navigation/core';
import React, {useEffect,useState} from 'react';
import { View, Button,Text, TouchableOpacity,SafeAreaView} from 'react-native';
import * as Speech from 'expo-speech';
import SearchableDropdown from 'react-native-searchable-dropdown';

const Settings = () => {
    const [prompt, setPrompt] = useState(null);
    const [voices, setVoices] = useState([]);
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
        Speech.speak(prompt);
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
          onTextChange={(text) => console.log(text)}
          onItemSelect={(item) => alert(JSON.stringify(item))}
          containerStyle={{ padding: 5, margin: 100}}
          textInputStyle={{
            padding: 12,
            borderWidth: 1,
            borderColor: '#ccc',
            backgroundColor: '#FFFFFF',
          }}
          itemStyle={{
            padding: 10,
            marginTop: 2,
            backgroundColor: '#FFFFFF',
            borderColor: '#bbb',
            borderWidth: 1,
          }}
          itemTextStyle={
            { color: '#290' }
          }
          itemsContainerStyle={{
            maxHeight: '60%',
          }}
          items={voices.map(item=> ({id:item.identifier,name:item.language}))}
          defaultIndex={2}
          placeholder="placeholder"
          resetValue={false}
          underlineColorAndroid="transparent"
        />

        </View>
        </SafeAreaView>
      );
}

export default Settings;