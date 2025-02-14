import { $ } from '@wdio/globals'
import Page from './page.js';

class CartPage extends Page {

  getItemNames = () => $('[data-test="inventory-item-name"]')
  getItemNamesArray = () => $$('[data-test="inventory-item-name"]')
  getCheckoutButton = () => $('[data-test="checkout"]')
  

  async getFirstItemName() {
    return await this.getItemNamesArray()[0].getText()
  }

  async clickCheckoutButton() {
    await this.getCheckoutButton().click()
    return this
  }

  async isTextPresent(text) {
    const pageContent = await $('body').getText()
    return pageContent.includes(text)
  }
}

export default new CartPage();
