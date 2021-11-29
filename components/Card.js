import React, { useState, useEffect } from 'react';
import {Text, View ,TouchableOpacity} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import * as Location from 'expo-location';
import NetInfo from '@react-native-community/netinfo';

const Card = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [type, setType] = useState(null);
  const [ipAdress, setIpAdress] = useState(null);
  const [country, setCountry] = useState("Waiting...");
  const [region, setRegion] = useState("Waiting...");
  const [city, setCity] = useState("Waiting...");

  const [latitude, setLatitude] = useState("Waiting...");
  const [longitude, setLongitude] = useState("Waiting...");
  const [adv, setAdv] = useState(0);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(
        `Connected: ${state.isConnected}`
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
      setLatitude(JSON.stringify(location.coords.latitude));
      setLongitude(JSON.stringify(location.coords.longitude));
      let revLocation = await Location.reverseGeocodeAsync({latitude: location.coords.latitude, longitude: location.coords.longitude});
      setCity(revLocation[0].city);
      setRegion(revLocation[0].region);
      setCountry(revLocation[0].country);
    })();
  }, []);

  return (
    <>
    <View style={tw`p-2 pl-5 pb-8 pt-4 bg-gray-700 m-2 max-w-md rounded-lg`}>
    <Text style={tw`font-bold text-white text-left`}>City: {city}</Text>
    <Text style={tw`font-bold text-white text-left`}>State: {region}</Text>
    <Text style={tw`font-bold text-white text-left`}>Country: {country}</Text>
    { adv === 1 ? 
      <>
       <TouchableOpacity
      onPress={() => setAdv(0)}
      style={tw`p-2 bg-black w-9/12 h-10 mt-4 shadow-lg`}>
      <Text style={tw`font-bold text-white text-center`}>Basic</Text>
      </TouchableOpacity>
      <Text style={tw`font-bold text-white text-left`}>Latitude: {latitude}</Text>
      <Text style={tw`font-bold text-white text-left`}>longitude: {longitude}</Text>
      </>
      :
      <TouchableOpacity
      onPress={() => setAdv(1)}
      style={tw`p-2 bg-black w-9/12 h-10 mt-4 shadow-lg`}>
        <Text style={tw`font-bold text-white text-center`}>Advanced</Text>
      </TouchableOpacity>
    }
    </View>
    <View style={tw`p-2 pl-5 pb-8 pt-4 bg-gray-700 m-2 max-w-md rounded-lg`}>
      <Text style={tw`font-bold text-white text-left`}>{type}</Text>
      <Text style={tw`font-bold text-white text-left`}>{isConnected}</Text>
      <Text style={tw`font-bold text-white text-left`}>{ipAdress}</Text>
    </View>
    </>
  );
}

export default Card


