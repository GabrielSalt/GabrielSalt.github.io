import AVFoundation
import Foundation

guard CommandLine.arguments.count == 3 else {
    fputs("usage: avi-to-mp4 input output\n", stderr)
    exit(64)
}

let input = URL(fileURLWithPath: CommandLine.arguments[1])
let output = URL(fileURLWithPath: CommandLine.arguments[2])
let asset = AVURLAsset(url: input)

guard let session = AVAssetExportSession(asset: asset, presetName: AVAssetExportPresetHighestQuality) else {
    fputs("Could not start export\n", stderr)
    exit(2)
}

session.outputURL = output
session.outputFileType = .mp4
session.shouldOptimizeForNetworkUse = true

Task {
    await session.export()
    if session.status == .completed {
        exit(0)
    }
    let message = session.error?.localizedDescription ?? "Export failed"
    fputs(message + "\n", stderr)
    exit(1)
}

dispatchMain()
