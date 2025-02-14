import { $ } from '@wdio/globals'
import Page from './page.js';

class LoginPage extends Page {

  getErrorIcons = () => $$('svg.error_icon')
  getInputUsername = () => $('input[data-test="username"]')
  getInputPassword = () => $('input[data-test="password"]')
  getLoginButton = () => $('input[data-test="login-button"]')
  getEpicErrorMessage = () => $('h3[data-test="error"]')


  async login (username, password) {
    await this.getInputUsername().setValue(username);
    await this.getInputPassword().setValue(password);
    await this.getLoginButton().click();
  }

  async open () {
    return await browser.url('/');
  }

  async getLoginErrorIcon() {
    return await this.getErrorIcons()[0]
  }
  
  async getPasswordErrorIcon() {
    return await this.getErrorIcons()[1]
  }

  async clickLoginButton() {
    await this.getLoginButton().click()
  }

  async getLoginErrorMessage() {
    return this.getEpicErrorMessage().getText()
  }  

}

export default new LoginPage();
