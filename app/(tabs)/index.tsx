import React, { useEffect } from "react"
import { Camera, useCameraDevice, useCameraPermission, useFrameProcessor, useSkiaFrameProcessor } from "react-native-vision-camera"
import { StyleSheet, View, Text } from "react-native"
import { detectPose } from "@/utils/detectPose"

export default function App() {
  const device = useCameraDevice('front')
  const { hasPermission } = useCameraPermission()

  const frameProcessor = useSkiaFrameProcessor((frame) => {
    'worklet'
    frame.render();
    const data = detectPose(frame);
    console.log(data);
  }, [])

  if (!hasPermission) return <PermissionsPage />
  if (device == null) return <NoCameraDeviceError />
  return (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
      frameProcessor={frameProcessor}
      pixelFormat="rgb"
      fps={30}
      
    />
  )
}

const PermissionsPage = () => {
  const { requestPermission } = useCameraPermission()

  useEffect(() => {
    requestPermission();
  }, [])

  return (
    <View>
      <Text style={{
        color: '#fff'
      }}>No Permission</Text>
    </View>
  )
}

const NoCameraDeviceError = () => {
  return (
    <View>
      <Text>No Camera Device</Text>
    </View>
  )
}
