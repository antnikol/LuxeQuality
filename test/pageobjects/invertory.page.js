import { $ } from '@wdio/globals'
import Page from './page.js';

class InvertoryPage extends Page {

  getInvertoryList = () => $('div[data-test="inventory-list"]')
  getInvertoryArray = () => $$('div[data-test="inventory-list"]')
  getItemNames = () => $$('[data-test="inventory-item-name"]')
  getAddToCartButtons = () => $$('button.btn_inventory')
  getProductSortingButton = () => $('select[data-test="product-sort-container"]')
  getItemPricesElements = () => $$('[data-test="inventory-item-price"]')
  getItemNamesElements = () => $$('a div[data-test="inventory-item-name"]')
  getFullCartIcon = () => $('[data-test="shopping-cart-badge"]')
  

  async clickFirstAddToCartButton() {
    await this.getAddToCartButtons()[0].click()
    return this
  }

  async getFirstItemPriceNumber() {
    const priceText = await this.getItemPricesElements()[0].getText()
    return parseFloat(priceText.replace(/[^0-9.]/g, ''))
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
    const prices = await this.getItemPricesElements()
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

  async getItemNamesArray() {
    const names = await this.getItemNamesElements()
    const nameArray = []
    for (const name of names) {
        const nameText = await name.getText()
        nameArray.push(nameText.trim())
    }
    return nameArray;
}

  async sortItemNamesAZ() {
    const names = await this.getItemNamesArray()
    return names.sort()
  }

  async sortItemNamesZA() {
    const names = await this.getItemNamesArray()
    return names.sort((a, b) => b.localeCompare(a))
  }
}

export default new InvertoryPage();
