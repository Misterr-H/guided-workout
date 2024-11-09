import React, { useEffect } from "react"
import { Camera, useCameraDevice, useCameraPermission, useCameraFormat, useSkiaFrameProcessor, Frame } from "react-native-vision-camera"
import { StyleSheet, View, Text } from "react-native"
import { detectPose } from "@/utils/detectPose"
import { PaintStyle, Skia } from "@shopify/react-native-skia"


export default function App() {
  const device = useCameraDevice('front')
  const { hasPermission } = useCameraPermission()

  const format = useCameraFormat(device, [
    {
      videoResolution: { width: 640, height: 480 }
    }
  ])

  const POSE_CONNECTIONS = [
    [8, 5],
    [5, 0],
    [0, 2],
    [2, 7],
    [10, 9],
    [20, 18],
    [20, 16],
    [18, 16],
    [16, 22],
    [16, 14],
    [14, 12],
    [12, 11],
    [11, 13],
    [13, 15],
    [15, 17],
    [15, 19],
    [15, 21],
    [19, 17],
    [12, 24],
    [11, 23],
    [24, 23],
    [24, 26],
    [23, 25],
    [26, 28],
    [25, 27],
    [28, 32],
    [28, 30],
    [32, 30],
    [27, 31],
    [27, 29],
    [29, 31],
  ];

  const paint = Skia.Paint();
  paint.setStyle(PaintStyle.Fill);
  paint.setStrokeWidth(2);
  paint.setColor(Skia.Color('red'));

  const linePaint = Skia.Paint();
  linePaint.setStyle(PaintStyle.Fill);
  linePaint.setStrokeWidth(4);
  linePaint.setColor(Skia.Color('lime'));

  const frameProcessor = useSkiaFrameProcessor((frame) => {
    'worklet'
    frame.render();
    const data = detectPose(frame);

    const frameWidth = frame.width;
  const frameHeight = frame.height;

  const landmarks = data ? data[0] ? data[0]?.landmarks : [] : [];

  console.log(JSON.stringify(landmarks, null, 2));


    // Draw lines
    for (const [from, to] of POSE_CONNECTIONS) {
      if(landmarks.length > 0)
        // frame.drawLine(
        //   landmarks[from].x,
        //   landmarks[from].y,
        //   landmarks[to].x,
        //   landmarks[to].y,
        //   linePaint,
        // );
        for (const mark of landmarks) {
          frame.drawCircle(
            mark.x ,
            mark.y,
            3,
            paint,
          );
        }
    }

    // Draw circles
    
  }, [])

  if (!hasPermission) return <PermissionsPage />
  if (device == null) return <NoCameraDeviceError />
  return (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      format={format}
      isActive={true}
      frameProcessor={frameProcessor}
      pixelFormat="rgb"
      fps={60}
      videoHdr={false}
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
