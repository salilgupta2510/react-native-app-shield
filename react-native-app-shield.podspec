Pod::Spec.new do |s|
  s.name         = "react-native-app-shield"
  s.version      = "1.0.0"
  s.summary      = "React Native library for app security and privacy"
  s.description  = "A React Native library that provides security and privacy protections for apps"
  s.homepage     = "https://github.com/yourusername/react-native-app-shield"
  s.license      = { :type => "MIT", :file => "LICENSE" }
  s.author       = { "Salil Gupta" => "your.email@example.com" }
  s.platform     = :ios, "11.0"
  s.source       = { :git => "https://github.com/yourusername/react-native-app-shield.git", :tag => "#{s.version}" }
  s.source_files = "ios/**/*.{h,swift}"
  s.requires_arc = true
  s.dependency "React-Core"
end