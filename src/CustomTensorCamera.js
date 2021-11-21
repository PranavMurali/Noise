import { cameraWithTensors } from '@tensorflow/tfjs-react-native';
import { Camera } from 'expo-camera';
import {View ,TouchableOpacity} from 'react-native'
import tw from 'tailwind-react-native-classnames'
import {Icon} from 'react-native-elements'
import { useNavigation } from '@react-navigation/core'
import React from 'react';

const TEXTURE_SIZE = { width: 1080, height: 1920 };
const TENSOR_WIDTH = 152;
const CAMERA_RATIO = TEXTURE_SIZE.height / TEXTURE_SIZE.width;

const TENSOR_SIZE = {
  width: TENSOR_WIDTH,
  height: TENSOR_WIDTH * CAMERA_RATIO,
};

const TensorCamera = cameraWithTensors(Camera);

export function CustomTensorCamera({ style, width, ...props }) {
  const sizeStyle = React.useMemo(() => {
    const ratio = width / TEXTURE_SIZE.width;
    const cameraWidth = TEXTURE_SIZE.width * ratio;
    const cameraHeight = TEXTURE_SIZE.height * ratio;
    return {
      maxWidth: cameraWidth,
      minWidth: cameraWidth,
      maxHeight: cameraHeight,
      minHeight: cameraHeight,
    };
  }, [width]);
  const navigation=useNavigation();
  return (
    <>
    <View>
        <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={tw`bg-gray-100 absolute top-16 left-8 z-50 p-3 rounded-full shadow-lg`}>
            <Icon name="menu" type="material-community" color="#000" size={30} />
        </TouchableOpacity>
    </View>
    <TensorCamera
      {...props}
      style={[style, sizeStyle]}
      cameraTextureWidth={TEXTURE_SIZE.width}
      cameraTextureHeight={TEXTURE_SIZE.height}
      resizeWidth={TENSOR_SIZE.width}
      resizeHeight={TENSOR_SIZE.height}
      resizeDepth={3}
    />
    </>
  );
}
