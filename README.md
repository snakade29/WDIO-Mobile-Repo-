  📱 WDIO Mobile Automation Framework

A complete setup guide for Mobile Automation using **WebdriverIO** + **Appium** for Android and iOS testing.

---

## 📌 Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Installation & Setup](#installation--setup)
4. [Android Setup](#android-setup)
5. [iOS Setup](#ios-setup)
6. [WDIO Configuration](#wdio-configuration)
7. [Project Structure](#project-structure)
8. [Page Object Model](#page-object-model)
9. [Running Tests](#running-tests)
10. [Troubleshooting](#troubleshooting)
11. [Best Practices](#best-practices)
12. [Resources](#resources)
 add
---

## 📋 Overview

This framework provides:
- ✅ Mobile automation for **Android** and **iOS**
- ✅ **Page Object Model (POM)** pattern for maintainable tests
- ✅ Support for **Appium** for cross-platform testing
- ✅ Built with **WebdriverIO** and **Mocha**
- ✅ Element scrolling utilities
- ✅ Visual testing capabilities
- ✅ Allure reporting for test results

---

## 🛠️ Prerequisites

### Required Software

| Tool | Purpose | Version |
|------|---------|---------|
| **Node.js** | JavaScript runtime | v14+ |
| **Java JDK** | Required for Appium & Android | v11+ |
| **Android Studio** | Android emulator & SDK | Latest |
| **Xcode** | iOS automation (macOS only) | Latest |
| **Appium** | Mobile automation engine | v2.x |
| **npm** | Package manager | v6+ |

---

## ⚙️ Installation & Setup

### Step 1: Install Node.js

```bash
# macOS (using Homebrew)
brew install node

# Verify installation
node -v
npm -v
```

### Step 2: Clone or Initialize Project

```bash
# If cloning an existing project
git clone <repository-url>
cd Android_Automation

# Or create a new project
mkdir wdio-mobile
cd wdio-mobile
npm init -y
```

### Step 3: Install WebdriverIO & Dependencies

```bash
npm install --save-dev @wdio/cli @wdio/local-runner @wdio/mocha-framework \
  @wdio/spec-reporter @wdio/appium-service webdriverio
```

### Step 4: Install Appium Globally

```bash
npm install -g appium

# Verify installation
appium -v

# Start Appium server (run in a separate terminal)
appium
```

### Step 5: Install Appium Drivers

```bash
# Android driver
appium driver install uiautomator2

# iOS driver (macOS only)
appium driver install xcuitest

# Verify drivers
appium driver list
```

---

## 🤖 Android Setup

### Step 1: Install Android Studio

1. Download from [Android Studio Official](https://developer.android.com/studio)
2. Follow installation instructions for your OS
3. Open Android Studio

### Step 2: Install Android SDK

1. Open **Android Studio → SDK Manager**
2. Install SDK Platform for desired Android versions (API 28+)
3. Install **Android SDK Tools**
4. Install **Android Emulator**

### Step 3: Set ANDROID_HOME Environment Variable

```bash
# Add to ~/.zshrc (for macOS/Linux)
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$ANDROID_HOME/emulator:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools:$PATH

# For Linux, use:
# export ANDROID_HOME=$HOME/Android/Sdk

# Reload terminal
source ~/.zshrc

# Verify
echo $ANDROID_HOME
```

### Step 4: Create & Start Android Virtual Device (AVD)

```bash
# List available AVDs
avdmanager list avd

# Create a new AVD (interactive)
avdmanager create avd -n Pixel_4 -k "system-images;android-12;google_apis;arm64-v8a"

# Start emulator
emulator -avd Pixel_4
```

---

## 🍎 iOS Setup (macOS Only)

### Step 1: Install Xcode

```bash
# Install via App Store (recommended)
# Or use command line:
xcode-select --install

# Accept Xcode license
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
sudo xcodebuild -license accept
```

### Step 2: Install Dependencies

```bash
brew install carthage
npm install -g ios-deploy
```

### Step 3: Start iOS Simulator

```bash
# Open iOS Simulator
open -a Simulator

# List available simulators
xcrun simctl list devices
```

---

## ⚙️ WDIO Configuration

### File: `wdio.conf.js`

Update your WDIO configuration file with appropriate capabilities:

#### Android Capabilities

```javascript
const androidCapabilities = {
  platformName: 'Android',
  'appium:deviceName': 'Pixel_4',
  'appium:platformVersion': '12.0',
  'appium:automationName': 'UiAutomator2',
  'appium:app': '/path/to/your/app.apk',
  'appium:autoGrantPermissions': true,
};
```

#### iOS Capabilities

```javascript
const iosCapabilities = {
  platformName: 'iOS',
  'appium:deviceName': 'iPhone 14',
  'appium:platformVersion': '16.0',
  'appium:automationName': 'XCUITest',
  'appium:app': '/path/to/your/app.app',
  'appium:autoGrantPermissions': true,
};
```

#### Full Configuration Example

```javascript
exports.config = {
  runner: 'local',
  port: 4723,
  specs: ['./test/specs/**/*.spec.js'],
  capabilities: [
    {
      platformName: 'Android',
      'appium:deviceName': 'Pixel_4',
      'appium:platformVersion': '12.0',
      'appium:automationName': 'UiAutomator2',
      'appium:app': process.env.APP_PATH || '/path/to/app.apk',
    },
  ],
  framework: 'mocha',
  mochaOpts: {
    timeout: 60000,
  },
  reporters: ['spec'],
  services: ['appium'],
};
```

---

## 📂 Project Structure

```
Android_Automation/
├── test/
│   ├── pageobjects/
│   │   ├── ProductPage.js          # Product page object
│   │   ├── ProductDetailsPage.js   # Product details page object
│   │   ├── LoginPage.js            # Login page object
│   │   └── BasePage.js             # Base page (optional)
│   ├── specs/
│   │   └── android.simple.spec.js  # Test specs
│   ├── utils/
│   │   └── scroll.util.js          # Scroll utility functions
│   └── fixtures/
│       └── testdata.json           # Test data (optional)
├── allure-results/                 # Allure report results
├── wdio.conf.js                    # WebdriverIO configuration
├── package.json                    # npm dependencies
├── .gitignore                      # Git ignore file
└── README.md                       # This file
```

---

## 🏗️ Page Object Model

### What is POM?

The Page Object Model is a design pattern that improves test maintenance and readability by encapsulating page-specific selectors and actions.

### Example: ProductPage.js

```javascript
class ProductPage {
  
  productByName(productName) {
    return $(`android=new UiSelector().text("${productName}")`);
  }

  async openProduct(productName) {
    const product = await this.productByName(productName);
    await product.waitForDisplayed({ timeout: 5000 });
    await product.click();
  }
}

export default new ProductPage();
```

### Example: LoginPage.js

```javascript
class LoginPage {
  
  get usernameInput() {
    return $('//android.widget.EditText[@text="Username"]');
  }

  get passwordInput() {
    return $('//android.widget.EditText[@text="Password"]');
  }

  get loginButton() {
    return $('//android.widget.TextView[@text="LOGIN"]');
  }

  async login(username, password) {
    await this.usernameInput.setValue(username);
    await this.passwordInput.setValue(password);
    await this.loginButton.click();
  }

  async verifyLoginSuccess() {
    const productsTitle = await $('//android.widget.TextView[@text="PRODUCTS"]');
    await productsTitle.waitForDisplayed({ timeout: 5000 });
  }
}

export default new LoginPage();
```

### Using Page Objects in Tests

```javascript
import LoginPage from '../pageobjects/LoginPage.js';
import ProductPage from '../pageobjects/ProductPage.js';

describe('Mobile Automation', () => {
  it('should login and view product', async () => {
    await LoginPage.login('standard_user', 'secret_sauce');
    await LoginPage.verifyLoginSuccess();
    await ProductPage.openProduct('Sauce Labs Bike Light');
  });
});
```

---

## 🧪 Utility Functions

### Scroll to Element

**File:** `test/utils/scroll.util.js`

```javascript
export async function scrollToElement(uiSelector) {
  return await $(
    'android=new UiScrollable(new UiSelector().scrollable(true))' +
    `.scrollIntoView(${uiSelector})`
  );
}

export default {
  scrollToElement,
};
```

### Usage Example

```javascript
import { scrollToElement } from '../utils/scroll.util.js';

async addToCart() {
  const addToCartBtn = await scrollToElement(
    'new UiSelector().description("test-ADD TO CART")'
  );
  await addToCartBtn.waitForDisplayed({ timeout: 5000 });
  await addToCartBtn.click();
}
```

---

## ▶️ Running Tests

### Run All Tests

```bash
npm run wdio
```

### Run Specific Test File

```bash
npx wdio run wdio.conf.js --spec test/specs/android.simple.spec.js
```

### Run with Custom Capabilities

```bash
# Run on iOS
npx wdio run wdio.conf.js --capabilities '{"platformName":"iOS"}'

# Run on specific device
npx wdio run wdio.conf.js --deviceName "Pixel_4"
```

### Run in Watch Mode

```bash
npm run wdio -- --watch
```

---

## 📊 Test Reporting

### View Allure Report

```bash
# Install allure
brew install allure

# Generate report
allure generate allure-results -o allure-report

# Open in browser
allure open allure-report
```

---

## ⚠️ Troubleshooting

### Issue: Appium Not Found

```bash
# Solution: Install Appium globally
npm install -g appium
appium -v
```

### Issue: ANDROID_HOME Not Set

```bash
# Solution: Set environment variable
export ANDROID_HOME=$HOME/Library/Android/sdk
source ~/.zshrc
echo $ANDROID_HOME
```

### Issue: Emulator Not Starting

```bash
# Verify AVD exists
avdmanager list avd

# Start with verbose output
emulator -avd Pixel_4 -verbose

# Check for port conflicts
lsof -i :5037
```

### Issue: Element Not Found

- ✅ Use **Appium Inspector** to validate locators
- ✅ Check **UiSelector** syntax for Android
- ✅ Ensure element is **visible/scrolled** into view
- ✅ Add proper **waits** before interaction

### Issue: App Path Not Found

```bash
# Verify app exists
ls -la /path/to/app.apk

# Use absolute path in wdio.conf.js
'appium:app': '/Users/yourname/path/to/app.apk'
```

### Issue: Driver Not Installed

```bash
# List installed drivers
appium driver list

# Install missing driver
appium driver install uiautomator2  # Android
appium driver install xcuitest      # iOS
```

### Issue: Xcode Signing Error (iOS)

```bash
# Solution: Trust developer certificate
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
sudo xcodebuild -license accept
```

---

## ✅ Best Practices

### 1. Use Page Object Model
- Encapsulate selectors within page classes
- Improve test maintainability and readability
- Reduce code duplication

### 2. Implement Explicit Waits
```javascript
await element.waitForDisplayed({ timeout: 5000 });
```

### 3. Handle Permissions
```javascript
'appium:autoGrantPermissions': true
```

### 4. Use Meaningful Assertions
```javascript
expect(await element.isDisplayed()).toBe(true);
```

### 5. Keep Tests Independent
- Each test should be able to run independently
- Use proper setup/teardown hooks
- Don't rely on test execution order

### 6. Use Descriptive Test Names
```javascript
it('should login with valid credentials and verify products page', async () => {
  // Test logic
});
```

### 7. Implement Proper Error Handling
```javascript
try {
  await element.click();
} catch (error) {
  console.error('Failed to click element:', error);
}
```

### 8. Use Environment Variables
```bash
export APP_PATH="/path/to/app.apk"
export DEVICE_NAME="Pixel_4"
npx wdio run wdio.conf.js
```

---

## 📚 Resources

### Official Documentation
- [WebdriverIO Docs](https://webdriver.io/docs/gettingstarted)
- [Appium Documentation](https://appium.io/docs/en/latest/)
- [Mocha Testing Framework](https://mochajs.org/)

### Android Testing
- [Android UiAutomator](https://developer.android.com/training/testing/ui-automator)
- [UiSelector Reference](https://developer.android.com/reference/androidx/test/uiautomator/UiSelector)

### iOS Testing
- [XCUITest Framework](https://developer.apple.com/documentation/xctest)
- [Xcode Simulator Guide](https://developer.apple.com/documentation/xcode-release-notes/xcode-14-release-notes)

### Tools & Utilities
- [Appium Inspector](https://github.com/appium/appium-inspector) - Locate elements visually
- [Allure Reporting](https://docs.qameta.io/allure/) - Test reporting
- [JSONWire Protocol](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol)

---

## 🤝 Contributing

1. Create a new branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Commit: `git commit -am 'Add feature'`
4. Push: `git push origin feature/your-feature`
5. Create a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 📧 Support & Feedback

For issues, questions, or suggestions:
- 📌 Check the [Troubleshooting](#troubleshooting) section
- 🐛 Report bugs in the Issues section
- 💬 Start a Discussion for questions

---

**Happy Testing! 🚀**

