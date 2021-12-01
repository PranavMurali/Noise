import React, { useEffect } from "react";
import { StyleSheet, Text, View ,TouchableOpacity} from "react-native";
import * as Speech from 'expo-speech';
import { useStateValue } from "../StateProvider";
import tw from 'tailwind-react-native-classnames';

export function PredictionList({ predictions = [] }) {
  const [{voice,pitchs,rates}] = useStateValue();
  // useEffect(() => {
  //   setTimeout(()=>{
  //     if (predictions.length > 0) {
  //       Speech.speak(predictions[0].className,{language:voice,pitch:pitchs,rate:rates});
  //     }
  //    }, 5000)
    
  // }, [predictions]);
  return (
    <View style={styles.container}>
      {predictions.map((p, i) => (
        <Text style={styles.text} key={`item-${i}`}>
          {p.className}
        </Text>
      ))}
       <TouchableOpacity
        onPress={() =>Speech.speak(predictions[0].className,{language:voice,pitch:pitchs,rate:rates})}
        style={tw`p-2 bg-gray-800 h-10 w-9/12 mt-4 shadow-lg rounded`}>
          <Text style={tw`font-bold text-white text-center`}>Speak</Text>
        </TouchableOpacity>
    </View>
  );
}

const margin = 24;

const styles = StyleSheet.create({
  container: {
    zIndex: 100,
    position: "absolute",
    bottom: margin,
    left: margin,
    right: margin,
    backgroundColor: "rgba(38, 38, 38,0.9)",
    padding: 8,
    borderRadius: 20,
    alignItems: "center",
  },
  text: {
    paddingVertical: 2,
    fontSize: 20,
    color: "white",
  },
});
