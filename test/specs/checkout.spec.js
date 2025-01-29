import { expect } from '@wdio/globals'
import data from '../fixtures/data.json'
import { genTestData } from '../fixtures/genData.js'

import CartPage from '../pageobjects/cart.page.js'
import CheckoutPage from '../pageobjects/checkout.page.js'
import LoginPage from '../pageobjects/login.page.js'
import InvertoryPage from '../pageobjects/invertory.page.js'

const genData = genTestData()

describe('Checkout Page tests suite', () => {

  beforeEach(async () => {
    await LoginPage.open()
    await LoginPage.login(data.user.name, data.user.password)
  })

  it('Test Case #8 | Valid checkout', async () => {
    const firstItemName = await InvertoryPage.getFirstItemName()
    const firstItemPrice = await InvertoryPage.getFirstItemPriceNumber()
    await InvertoryPage.clickFirstAddToCartButton()
    await expect(await InvertoryPage.getCartIconQuantityText()).toBe('1')

    await InvertoryPage.clickCartIcon()
    await expect(await CartPage.getCurrentUrl()).toContain(data.message.cartUrl)
    await expect(await CartPage.getFirstItemName()).toBe(firstItemName)

    await CartPage.clickCheckoutButton()
    await expect(await CheckoutPage.getCheckoutForm()).toBeDisplayed()

    await CheckoutPage.typeFirstNameField(genData.userFirstName)
    await CheckoutPage.typeLastNameField(genData.userLastName)
    await CheckoutPage.typeZipCodeField(genData.userZipCode)
    await CheckoutPage.clickContinueButton()
    await expect(await CheckoutPage.getSecondaryHeaderTitle()).toHaveText(data.page.checkoutOverviewTitle)
    await expect(await CheckoutPage.getFirstItemName()).toBe(firstItemName)
    await expect(await CheckoutPage.getItemTotalPriceNumber()).toBe(firstItemPrice)

    await CheckoutPage.clickFinishButton()
    await expect(await CheckoutPage.getSecondaryHeaderTitle()).toHaveText(data.page.checkoutCompleteTitle)
    await expect(await CheckoutPage.getOrderSuccessMessageText()).toContain(data.message.orderSuccessMessage)
    
    await CheckoutPage.clickBackHomeButton()
    await expect(await InvertoryPage.getCurrentUrl()).toContain(data.page.inventoryURL)
    await expect(await InvertoryPage.getInvertoryList()).toBeDisplayed()
    await expect(await InvertoryPage.getInvertoryArray().length).toBeGreaterThan(0)

    await expect(await InvertoryPage.getCartIcon()).toBeDisplayed()
    await expect(await InvertoryPage.getFullCartIcon()).not.toBeDisplayed()
    await InvertoryPage.clickCartIcon()
    await expect(await CartPage.getItemNames()).not.toBeDisplayed()
  })

  it('Test Case #9 | Checkout without products', async () => {
    await InvertoryPage.clickCartIcon()
    await expect(await CartPage.getSecondaryHeaderTitle()).toHaveText(data.page.cartPageTitle)
    await expect(await CartPage.getCurrentUrl()).toContain(data.message.cartUrl)
    await expect(await CartPage.getItemNames()).not.toBeDisplayed()

    await CartPage.clickCheckoutButton()
    await expect(await CartPage.getSecondaryHeaderTitle()).toHaveText(data.page.cartPageTitle)
    await expect(await CartPage.isTextPresent(data.message.cartIsEmpty)).toBe(true)
  })

})

