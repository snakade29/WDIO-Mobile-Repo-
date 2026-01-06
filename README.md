📱 WDIO Mobile Automation Setup (Beginner Friendly)

This repository contains a complete setup guide for Mobile Automation using WebdriverIO + Appium for Android and iOS.

📌 What this project covers

1️⃣ Prerequisites
2️⃣ Install Node & WebdriverIO
3️⃣ Install Appium
4️⃣ Android setup
5️⃣ iOS setup
6️⃣ WDIO configuration for mobile
7️⃣ Sample test execution

🛠️ 1️⃣ Prerequisites
Required Software
Tool	Purpose
Node.js	JavaScript runtime
Java JDK	Required for Appium + Android
Android Studio	Emulator + SDK
Xcode (macOS only)	iOS automation
Appium	Mobile automation engine
WebdriverIO	Test automation framework
⚙️ 2️⃣ Install Node.js
brew install node
node -v
npm -v

📁 3️⃣ Create a WDIO Project
mkdir wdio-mobile
cd wdio-mobile
npm init -y
npm install @wdio/cli
npx wdio config

Select the following options during setup:

Language: JavaScript or TypeScript

Framework: Mocha

Reporter: spec

Services: Appium

Test specs location:

./test/specs/**/*.js

🚀 4️⃣ Install Appium
Install globally
npm install -g appium
appium -v

Start Appium server
appium

🔌 5️⃣ Install Appium Drivers
Android driver
appium driver install uiautomator2

iOS driver
appium driver install xcuitest

🤖 6️⃣ Android Setup
Install Android Studio

Open Android Studio

Install Android SDK

Create AVD (Emulator)

Set ANDROID_HOME

Add this to ~/.zshrc:

export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$ANDROID_HOME/emulator:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools:$PATH


Reload terminal:

source ~/.zshrc

Start Emulator
avdmanager list avd
emulator -avd <emulator_name>

🍎 7️⃣ iOS Setup (macOS Only)
Install Xcode

Open App Store

Install Xcode

Open Xcode once and accept license

Install dependencies
brew install carthage
npm install -g ios-deploy
xcode-select --install

Start iOS Simulator
open -a Simulator

⚙️ 8️⃣ WDIO Mobile Configuration
Android Capabilities (Example)

Add inside capabilities in wdio.conf.js:

{
  platformName: "Android",
  "appium:deviceName": "Pixel_4",
  "appium:platformVersion": "12.0",
  "appium:automationName": "UiAutomator2",
  "appium:app": "/Users/yourpath/app.apk"
}

iOS Capabilities (Example)
{
  platformName: "iOS",
  "appium:deviceName": "iPhone 14",
  "appium:platformVersion": "16.0",
  "appium:automationName": "XCUITest",
  "appium:app": "/Users/yourpath/app.app"
}

🧪 9️⃣ Sample WDIO Test

📁 ./test/specs/sample.e2e.js

describe('Mobile Demo', () => {
  it('verify app launch', async () => {
    await driver.pause(2000);
    console.log('App launched successfully');
  });
});

▶️ 🔟 Run the Test
npx wdio run wdio.conf.js

📂 Project Folder Structure
wdio-mobile
 ├── test
 │   └── specs
 │       └── sample.e2e.js
 ├── wdio.conf.js
 ├── package.json

⭐ Recommended Package Versions
Package	Version
WebdriverIO	Latest
Appium	Latest (2.x)
uiautomator2	Latest
xcuitest	Latest
⚠️ Common Errors & Fixes
Issue	Fix
App not found	Check correct app path
Driver missing	appium driver install <driver>
Emulator not running	Start emulator first
ANDROID_HOME error	Set env variables correctly
Xcode signing issue	Trust developer certificate
✅ Final Notes

Always start emulator/simulator first

Appium server must be running

Use Appium Inspector to validate locators

Keep APK/APP paths correct
