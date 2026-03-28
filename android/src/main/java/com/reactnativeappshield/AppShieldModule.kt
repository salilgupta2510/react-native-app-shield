package com.reactnativeappshield

import android.app.Activity
import android.content.Context
import android.os.Build
import android.provider.Settings
import android.view.WindowManager
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import java.io.File

class AppShieldModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return "AppShield"
  }

  @ReactMethod
  fun enableSecureView(enabled: Boolean) {
    val activity = currentActivity
    activity?.runOnUiThread {
      if (enabled) {
        activity.window.setFlags(
          WindowManager.LayoutParams.FLAG_SECURE,
          WindowManager.LayoutParams.FLAG_SECURE
        )
      } else {
        activity.window.clearFlags(WindowManager.LayoutParams.FLAG_SECURE)
      }
    }
  }

  @ReactMethod
  fun getSecurityStatus(promise: Promise) {
    val isRooted = checkRoot()
    val isEmulator = checkEmulator()
    val result = Arguments.createMap().apply {
      putBoolean("isRooted", isRooted)
      putBoolean("isEmulator", isEmulator)
    }
    promise.resolve(result)
  }

  private fun checkRoot(): Boolean {
    val paths = arrayOf(
      "/system/app/Superuser.apk",
      "/sbin/su",
      "/system/bin/su",
      "/system/xbin/su",
      "/data/local/xbin/su",
      "/data/local/bin/su",
      "/system/sd/xbin/su",
      "/system/bin/failsafe/su",
      "/data/local/su"
    )
    for (path in paths) {
      if (File(path).exists()) return true
    }

    // Check build tags
    val buildTags = Build.TAGS
    if (buildTags != null && buildTags.contains("test-keys")) return true

    return false
  }

  private fun checkEmulator(): Boolean {
    return (Build.FINGERPRINT.startsWith("generic")
            || Build.FINGERPRINT.startsWith("unknown")
            || Build.MODEL.contains("google_sdk")
            || Build.MODEL.contains("Emulator")
            || Build.MODEL.contains("Android SDK built for x86")
            || Build.MANUFACTURER.contains("Genymotion")
            || (Build.BRAND.startsWith("generic") && Build.DEVICE.startsWith("generic"))
            || "google_sdk" == Build.PRODUCT)
  }

  // Screen recording detection is more complex on Android
  // For now, we'll implement a basic check
  @ReactMethod
  fun startScreenRecordingDetection() {
    // This is a placeholder - full implementation would require
    // monitoring MediaProjection or accessibility services
    // For now, we'll emit events based on activity lifecycle
  }

  @ReactMethod
  fun enableBackgroundBlur(enabled: Boolean) {
    // On Android, FLAG_SECURE prevents task manager preview
    enableSecureView(enabled)
  }