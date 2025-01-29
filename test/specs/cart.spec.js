import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import InvertoryPage from '../pageobjects/invertory.page.js'
import data from '../fixtures/data.json'
import { genTestData } from '../fixtures/genData.js'
import CartPage from '../pageobjects/cart.page.js'

const genData = genTestData()


describe('Login Page tests suite', () => {

  beforeEach(async () => {
    await LoginPage.open()
    await LoginPage.login(data.user.name, data.user.password)
  })

  it('Test Case #5 | Saving cart contents after logout/login', async () => {
    const firstItemName = await InvertoryPage.getFirstItemName()
    await InvertoryPage.clickFirstAddToCartButton()
    await InvertoryPage.clickBurgerButton()
    await InvertoryPage.clickLogoutButton()
    await expect(await LoginPage.getCurrentUrl()).toBe(data.message.baseUrl)
    await expect(LoginPage.getInputUsername()).toHaveValue('')
    await expect(LoginPage.getInputPassword()).toHaveValue('')

    await LoginPage.login(data.user.name, data.user.password)
    await InvertoryPage.clickCartIcon()
    await expect(await CartPage.getCurrentUrl()).toContain(data.message.cartUrl)
    await expect(await CartPage.getSecondaryHeaderTitle()).toHaveText('Your Cart')
    await expect(await CartPage.getFirstItemName()).toBe(firstItemName)
  })


})

