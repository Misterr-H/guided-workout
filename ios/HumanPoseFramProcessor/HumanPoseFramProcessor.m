#import <VisionCamera/FrameProcessorPlugin.h>
#import <VisionCamera/FrameProcessorPluginRegistry.h>

#if __has_include("guidedworkout/guidedworkout-Swift.h")
#import "guidedworkout/guidedworkout-Swift.h"
#else
#import "guidedworkout-Swift.h"
#endif

VISION_EXPORT_SWIFT_FRAME_PROCESSOR(HumanPoseFramProcessorPlugin, detectPose)