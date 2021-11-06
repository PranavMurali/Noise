import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet ,SafeAreaView} from 'react-native';
import tw from 'tailwind-react-native-classnames'
import * as Location from 'expo-location';
const Card = () => {
    const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

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
    <View >
      <Text style={tw`text-white`}>Latitude: {lats}</Text>
      <Text style={tw`text-white`}>Longitude: {longs}</Text>
    </View>
  );
}

export default Card


