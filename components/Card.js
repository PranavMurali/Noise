import React, { useState, useEffect } from 'react';
import {Text, View ,Button} from 'react-native';
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
    <View style={tw`p-2 pl-20 pb-8 pt-4 bg-gray-600 m-2 max-w-md rounded-lg`}>
    <Text style={tw`font-bold text-white`}>City: {city}</Text>
    <Text style={tw`font-bold text-white`}>State: {region}</Text>
    <Text style={tw`font-bold text-white`}>Country: {country}</Text>
    { adv === 1 ? 
      <Button title="Basic" onPress={() => setAdv(0)}/>
      :
      <Button title="Advanced" onPress={() => setAdv(1)}/>
    }
    {adv === 1 ? (
      <>
      <Text style={tw`font-bold text-white`}>Latitude: {latitude}</Text>
      <Text style={tw`font-bold text-white`}>longitude: {longitude}</Text>
      </>):null}
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


