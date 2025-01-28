import { $ } from '@wdio/globals'
import Page from './page.js';

class CartPage extends Page {

  getItemNames = () => $$('[data-test="inventory-item-name"]')
  

  async getFirstItemName() {
    return await this.getItemNames()[0].getText()
  }
}

export default new CartPage();
