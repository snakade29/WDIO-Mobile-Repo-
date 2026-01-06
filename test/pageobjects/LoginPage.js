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

  get productsTitle() {
    return $('//android.widget.TextView[@text="PRODUCTS"]');
  }

  async login(username, password) {
    await this.usernameInput.waitForDisplayed({ timeout: 5000 });
    await this.usernameInput.setValue(username);

    await this.passwordInput.setValue(password);
    await this.loginButton.click();
  }

  async verifyLoginSuccess() {
    await this.productsTitle.waitForDisplayed({ timeout: 5000 });
  }
}

export default new LoginPage();
