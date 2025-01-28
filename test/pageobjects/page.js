import { browser } from '@wdio/globals'

export default class Page {

  getSecondaryHeaderTitle = () => $('span[data-test="title"]')
  getCartIcon = () => $('a[data-test="shopping-cart-link"]')
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

  async clickCartIcon() {
    await this.getCartIcon().click()
    return this
  }

}
