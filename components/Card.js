import React, { useState, useEffect } from 'react';
import {Text, View} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import * as Location from 'expo-location';
import NetInfo from '@react-native-community/netinfo';

const Card = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [type, setType] = useState(null);
  const [ipAdress, setIpAdress] = useState(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(
        `Is connected?: ${state.isConnected}`
      );
      setType(
      state.type,
      );
      setIpAdress(
      state.details.ipAddress,
      );
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let lats = 'Waiting..';
  let longs = 'Waiting..';
  if (errorMsg) {
    lats= errorMsg;
    longs =errorMsg;
  } else if (location) {
    lats = JSON.stringify(location.coords.latitude);
    longs = JSON.stringify(location.coords.longitude);
  }

  return (
    <>
    <View style={tw`p-2 pl-20 pb-8 pt-4 bg-gray-600 m-2 max-w-md rounded-lg`}>
      <Text style={tw`font-bold text-white`}>Latitude: {lats}</Text>
      <Text style={tw`font-bold text-white`}>Longitude: {longs}</Text>  
    </View>
    <View style={tw`p-2 pl-20 pb-8 pt-4 bg-gray-600 m-2 max-w-md rounded-lg`}>
      <Text style={tw`font-bold text-white`}>{type}</Text>
      <Text style={tw`font-bold text-white`}>{isConnected}</Text>
      <Text style={tw`font-bold text-white`}>{ipAdress}</Text>
    </View>
    </>
  );
}

export default Card


