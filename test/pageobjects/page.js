import { browser } from '@wdio/globals'

export default class Page {

  getLogoutButton = () => $('a[data-test="logout-sidebar-link"]')
  getBurgerButton = () => $('button#react-burger-menu-btn')

  async getCurrentUrl() {
    return await browser.getUrl()
  }

  async clickLogoutButton() {
    await this.getLogoutButton().click()
    return this
  }

  async clickBurgerButton() {
    await this.getBurgerButton().click()
    return this
  } 

}
