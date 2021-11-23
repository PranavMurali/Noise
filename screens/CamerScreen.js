import { Camera } from "expo-camera";
import React,{useState,useEffect} from "react";
import { Button} from 'react-native';

import { LoadingView } from "../src/LoadingView";
import { ModelView } from "../src/ModelView";
import { useTensorFlowLoaded } from "../src/useTensorFlow";

export default function App() {
  const isLoaded = useTensorFlowLoaded();
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (!hasPermission === "granted") {
    return (
      <LoadingView message="Camera permission is required to continue">
         <Button title="Grant permission" />
      </LoadingView>
    );
  }
  
  if (!isLoaded) {
    return <LoadingView message="Loading TensorFlow" />;
  }

  return <ModelView />;
}
