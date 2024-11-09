import VisionCamera
import CoreVideo
import MLImage
import MLKit

@objc(HumanPoseFramProcessorPlugin)
public class HumanPoseFramProcessorPlugin: FrameProcessorPlugin {
  public override init(proxy: VisionCameraProxyHolder, options: [AnyHashable: Any]! = [:]) {
    super.init(proxy: proxy, options: options)
  }

  public override func callback(_ frame: Frame, withArguments arguments: [AnyHashable: Any]?) -> Any? {
    let buffer = frame.buffer
    let orientation = frame.orientation
  
    // code goes here
    let options = PoseDetectorOptions()
    options.detectorMode = .stream
    
    let poseDetector = PoseDetector.poseDetector(options: options)
    
    let image = VisionImage(buffer: buffer)
    image.orientation = imageOrientation(deviceOrientation: .portrait, cameraPosition: .front)
    
    var results: [Pose]
    do {
      results = try poseDetector.results(in: image)
    } catch let error {
      print("Failed to detect pose with error: \(error.localizedDescription).")
      return []
    }
    guard !results.isEmpty else {
      print("Pose detector returned no results.")
      return []
    }

    // Success. Get pose landmarks here.
    
    var convertedResults: [[String: Any]] = []

      for pose in results {
        var landmarksArray: [[String: Any]] = []

        for landmark in pose.landmarks {
          let landmarkDict: [String: Any] = [
            "x": landmark.position.x,
            "y": landmark.position.y,
            "z": landmark.position.z,
            "inFrameLikelihood": landmark.inFrameLikelihood
          ]
          landmarksArray.append(landmarkDict)
        }

        let poseDict: [String: Any] = [
          "landmarks": landmarksArray
        ]
        convertedResults.append(poseDict)
      }

      return convertedResults
  }
  
  func imageOrientation(
    deviceOrientation: UIDeviceOrientation,
    cameraPosition: AVCaptureDevice.Position
  ) -> UIImage.Orientation {
    switch deviceOrientation {
    case .portrait:
      return cameraPosition == .front ? .leftMirrored : .right
    case .landscapeLeft:
      return cameraPosition == .front ? .downMirrored : .up
    case .portraitUpsideDown:
      return cameraPosition == .front ? .rightMirrored : .left
    case .landscapeRight:
      return cameraPosition == .front ? .upMirrored : .down
    case .faceDown, .faceUp, .unknown:
      return .up
    @unknown default:
      return .up
    }
  }
        
}
