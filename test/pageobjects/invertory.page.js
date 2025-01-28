import { $ } from '@wdio/globals'
import Page from './page.js';

class InvertoryPage extends Page {

  getInvertoryList = () => $('div[data-test="inventory-list"]')
  getItemNames = () => $$('[data-test="inventory-item-name"]')
  getAddToCartButtons = () => $$('button.btn_inventory')


  async clickFirstAddToCartButton() {
    await this.getAddToCartButtons()[0].click()
    return this
  }

  async getFirstItemName() {
    return await this.getItemNames()[0].getText()
  }
}

export default new InvertoryPage();
