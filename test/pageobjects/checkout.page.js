import { $ } from '@wdio/globals'
import Page from './page.js';

class Checkout extends Page {

  getFirstNameField = () => $('[data-test="firstName"]')
  getLastNameField = () => $('[data-test="lastName"]') 
  getZipCodeField = () => $('[data-test="postalCode"]')
  getContinueButton = () => $('[data-test="continue"]')
  getItemNames = () => $$('[data-test="inventory-item-name"]')
  getItemTotalPrice = () => $('[data-test="subtotal-label"]')
  getFinishButton = () => $('button[data-test="finish"]')
  getOrderSuccessMessage = () => $('[data-test="complete-header"]')
  getBackHomeButton = () => $('button[data-test="back-to-products"]')
  getCheckoutForm = () => $('.checkout_info')

  async typeFirstNameField(firstName) {
    return await this.getFirstNameField().setValue(firstName)
  }

  async typeLastNameField(lastName) {
    return await this.getLastNameField().setValue(lastName)
  }

  async typeZipCodeField(zipCode) {
    return await this.getZipCodeField().setValue(zipCode)
  }

  async clickContinueButton() {
    return await this.getContinueButton().click()
  }

  async getFirstItemName() {
    return await this.getItemNames()[0].getText()
  }

  async getItemTotalPriceNumber() {
    const priceText = await this.getItemTotalPrice().getText()
    return parseFloat(priceText.replace(/[^0-9.]/g, ''))
  }

  async clickFinishButton() {
    return await this.getFinishButton().click()
  }

  async getOrderSuccessMessageText() {
    return await this.getOrderSuccessMessage().getText()
  }

  async clickBackHomeButton() {
    return await this.getBackHomeButton().click()
  }
}

export default new Checkout();
