import { $ } from '@wdio/globals'
import Page from './page.js';

class LoginPage extends Page {

  get inputUsername () { return $('input[data-test="username"]') }
  get inputPassword () { return $('input[data-test="password"]') }
  get btnSubmit () { return $('input[data-test="login-button"]') }


  async login (username, password) {
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);
    await this.btnSubmit.click();
  }

  open () {
    return super.open('login');
  }
}

export default new LoginPage();
