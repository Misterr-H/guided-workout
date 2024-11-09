import VisionCamera
import MediaPipeTasksVision

@objc(HumanPoseFramProcessorPlugin)
public class HumanPoseFramProcessorPlugin: FrameProcessorPlugin {
  public override init(proxy: VisionCameraProxyHolder, options: [AnyHashable: Any]! = [:]) {
    super.init(proxy: proxy, options: options)
  }

  public override func callback(_ frame: Frame, withArguments arguments: [AnyHashable: Any]?) -> Any? {
    let buffer = frame.buffer
  
    // code goes here
    let options = PoseLandmarkerOptions()
//    options.baseOptions.modelAssetPath = "pose_landmarker_lite.task"
//    options.runningMode = .video
//    options.minTrackingConfidence = 0.5
//    options.minPosePresenceConfidence = 0.5
//    options.minPoseDetectionConfidence = 0.5
//    options.numPoses = 1
    
    do {
//      let poseLandmarker = try PoseLandmarker(options: options)
//      let image = try MPImage(sampleBuffer: buffer)
//      let result = try poseLandmarker.detect(videoFrame: image, timestampInMilliseconds: Int(frame.timestamp))
      
      var landmarks = [] as Array
      
//      for pose in result.landmarks {
//        var marks = [] as Array
//        
//        for poseMark in pose {
//          marks.append([
//            "x" : poseMark.x,
//            "y" : poseMark.y,
//            "z" : poseMark.z,
//            "visibility": poseMark.visibility ?? 0
//          ])
//        }
//        
//        landmarks.append(marks)
//      }
      
      return landmarks
      
    } catch {
      return nil
    }
  }
}
