import { browser } from '@wdio/globals'

export default class Page {

  getSecondaryHeaderTitle = () => $('span[data-test="title"]')
  getCartIcon = () => $('a[data-test="shopping-cart-link"]')
  getLogoutButton = () => $('a[data-test="logout-sidebar-link"]')
  getBurgerButton = () => $('button#react-burger-menu-btn')
  getTwitterIcon = () => $('a[data-test="social-twitter"]')
  getFacebookIcon = () => $('a[data-test="social-facebook"]')
  getLinkedinIcon = () => $('a[data-test="social-linkedin"]')
  getSidebarLinkList = () => $$('.bm-item.menu-item')
  getCartIconQuantity = () => $('[data-test="shopping-cart-badge"]')

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

  async clickTwitterIcon() {
    await this.getTwitterIcon().click()
    return this
  }

  async clickFacebookIcon() {
    await this.getFacebookIcon().click()
    return this
  }

  async clickLinkedinIcon() {
    await this.getLinkedinIcon().click()
    return this
  }

  async switchToNewTab() {
    await browser.waitUntil(async () => {
        const handles = await browser.getWindowHandles();
        return handles.length > 1;
    }, { timeout: 5000, timeoutMsg: 'New tab did not open in time' });

    const handles = await browser.getWindowHandles();
    await browser.switchToWindow(handles[1]);
  }

  async closeCurrentTabAndSwitchBack() {
    const handles = await browser.getWindowHandles();
    if (handles.length > 1) {
        await browser.closeWindow();
        await browser.switchToWindow(handles[0]);
    }
  }

  async getCartIconQuantityText() {
    return await this.getCartIconQuantity().getText()
  }
}
