import { $ } from '@wdio/globals'
import Page from './page.js';

class LoginPage extends Page {

  getErrorIcons = () => $$('svg.error_icon')
  getInputUsername = () => $('input[data-test="username"]')
  getInputPassword = () => $('input[data-test="password"]')
  getBtnSubmit = () => $('input[data-test="login-button"]')
  getEpicErrorMessage = () => $('h3[data-test="error"]')


  async login (username, password) {
    await this.getInputUsername().setValue(username);
    await this.getInputPassword().setValue(password);
    await this.getBtnSubmit().click();
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


}

export default new LoginPage();
