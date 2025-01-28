import { $ } from '@wdio/globals'
import Page from './page.js';

class LoginPage extends Page {

  getXIcon = () => $('svg.error_icon')
  get inputUsername () { return $('input[data-test="username"]') }
  get inputPassword () { return $('input[data-test="password"]') }
  get btnSubmit () { return $('input[data-test="login-button"]') }


  async login (username, password) {
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);
    await this.btnSubmit.click();
  }

  async open () {
    return await browser.url('/');
  }
}

export default new LoginPage();
