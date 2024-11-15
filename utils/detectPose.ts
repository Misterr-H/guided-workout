import { VisionCameraProxy, Frame } from 'react-native-vision-camera'

const plugin = VisionCameraProxy.initFrameProcessorPlugin('detectPose', {})

export function detectPose(frame: Frame) {
  'worklet'
  if (plugin == null) {
    throw new Error("Failed to load Frame Processor Plugin!")
  }
  return plugin.call(frame)
}