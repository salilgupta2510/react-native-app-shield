import Foundation
import UIKit
import React

@objc(AppShield)
class AppShield: RCTEventEmitter {

  private var screenCaptureObserver: NSObjectProtocol?

  override static func requiresMainQueueSetup() -> Bool {
    return true
  }

  override func supportedEvents() -> [String]! {
    return ["onScreenRecording"]
  }

  @objc
  func enableSecureView(_ enabled: Bool) {
    DispatchQueue.main.async {
      if let window = UIApplication.shared.windows.first {
        if enabled {
          // Add secure overlay to prevent screenshots
          let secureView = UIView(frame: window.bounds)
          secureView.backgroundColor = UIColor.clear
          secureView.tag = 999999
          window.addSubview(secureView)
        } else {
          // Remove secure overlay
          window.viewWithTag(999999)?.removeFromSuperview()
        }
      }
    }
  }

  @objc
  func startScreenRecordingDetection() {
    screenCaptureObserver = NotificationCenter.default.addObserver(
      forName: UIScreen.capturedDidChangeNotification,
      object: nil,
      queue: .main
    ) { [weak self] _ in
      let isCaptured = UIScreen.main.isCaptured
      self?.sendEvent(withName: "onScreenRecording", body: ["isRecording": isCaptured])
    }
  }

  @objc
  func stopScreenRecordingDetection() {
    if let observer = screenCaptureObserver {
      NotificationCenter.default.removeObserver(observer)
      screenCaptureObserver = nil
    }
  }

  @objc
  func getSecurityStatus(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    let isJailbroken = checkJailbreak()
    let isSimulator = checkSimulator()
    let result: [String: Any] = [
      "isRooted": isJailbroken,
      "isEmulator": isSimulator
    ]
    resolve(result)
  }

  private func checkJailbreak() -> Bool {
    let jailbreakPaths = [
      "/Applications/Cydia.app",
      "/Library/MobileSubstrate/MobileSubstrate.dylib",
      "/bin/bash",
      "/usr/sbin/sshd",
      "/etc/apt",
      "/private/var/lib/apt/"
    ]

    for path in jailbreakPaths {
      if FileManager.default.fileExists(atPath: path) {
        return true
      }
    }

    // Check if can write to system paths
    let testPath = "/private/jailbreak.txt"
    do {
      try "test".write(toFile: testPath, atomically: true, encoding: .utf8)
      try FileManager.default.removeItem(atPath: testPath)
      return true
    } catch {
      return false
    }
  }

  private var backgroundObserver: NSObjectProtocol?
  private var foregroundObserver: NSObjectProtocol?
  private var blurView: UIVisualEffectView?

  @objc
  func enableBackgroundBlur(_ enabled: Bool) {
    if enabled {
      backgroundObserver = NotificationCenter.default.addObserver(
        forName: UIApplication.didEnterBackgroundNotification,
        object: nil,
        queue: .main
      ) { [weak self] _ in
        self?.addBlurView()
      }
      foregroundObserver = NotificationCenter.default.addObserver(
        forName: UIApplication.willEnterForegroundNotification,
        object: nil,
        queue: .main
      ) { [weak self] _ in
        self?.removeBlurView()
      }
    } else {
      if let observer = backgroundObserver {
        NotificationCenter.default.removeObserver(observer)
        backgroundObserver = nil
      }
      if let observer = foregroundObserver {
        NotificationCenter.default.removeObserver(observer)
        foregroundObserver = nil
      }
      removeBlurView()
    }
  }

  private func addBlurView() {
    DispatchQueue.main.async {
      if let window = UIApplication.shared.windows.first, self.blurView == nil {
        let blurEffect = UIBlurEffect(style: .light)
        let blurView = UIVisualEffectView(effect: blurEffect)
        blurView.frame = window.bounds
        blurView.tag = 999998
        window.addSubview(blurView)
        self.blurView = blurView
      }
    }
  }

  private func removeBlurView() {
    DispatchQueue.main.async {
      self.blurView?.removeFromSuperview()
      self.blurView = nil
    }
  }