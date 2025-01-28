import { $ } from '@wdio/globals'
import Page from './page.js';

class InvertoryPage extends Page {

  getInvertoryList = () => $('div[data-test="inventory-list"]')
  getItemNames = () => $$('[data-test="inventory-item-name"]')
  getAddToCartButtons = () => $$('button.btn_inventory')
  getProductSortingButton = () => $('select[data-test="product-sort-container"]')
  getItemPricesElements = () => $$('div[data-test="inventory-item-price"]')


  async clickFirstAddToCartButton() {
    await this.getAddToCartButtons()[0].click()
    return this
  }

  async getFirstItemName() {
    return await this.getItemNames()[0].getText()
  }

  async clickProductSortingButton() {
    await this.getProductSortingButton().click()
    return this
  }

  async selectSortOptionByText(text) {
    await this.getProductSortingButton().selectByVisibleText(text)
  }

  async getItemPrices() {
    const prices = await $$('[data-test="inventory-item-price"]')
    const priceArray = []
    for (const price of prices) {
      const priceText = await price.getText()
      priceArray.push(parseFloat(priceText.replace('$', '').trim()))
    }
    return priceArray
  }

  async sortItemPricesLowToHigh() {
    const prices = await this.getItemPrices()
    return prices.sort((a, b) => a - b)
  }

  async sortItemPricesHighToLow() {
    const prices = await this.getItemPrices()
    return prices.sort((a, b) => b - a)
  }
}

export default new InvertoryPage();
