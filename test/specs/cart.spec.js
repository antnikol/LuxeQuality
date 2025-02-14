import { expect } from '@wdio/globals'
import data from '../fixtures/data.json'
import { genTestData } from '../fixtures/genData.js'

import LoginPage from '../../pageobjects/login.page.js'
import InvertoryPage from '../../pageobjects/invertory.page.js'
import CartPage from '../../pageobjects/cart.page.js'

const genData = genTestData()


describe('Cart Page tests suite', () => {

  beforeEach(async () => {
    await LoginPage.open()
    await LoginPage.login(data.user.name, data.user.password)
  })

  it('Test Case #5 | Saving cart contents after logout/login', async () => {
    const firstItemName = await InvertoryPage.getFirstItemName()
    await InvertoryPage.clickFirstAddToCartButton()
    await expect(await InvertoryPage.getCartIconQuantityText()).toBe('1')

    await InvertoryPage.clickBurgerButton()
    await expect(await InvertoryPage.getSidebarLinkList().length).toBe(4)

    await InvertoryPage.clickLogoutButton()
    await expect(await LoginPage.getCurrentUrl()).toBe(data.message.baseUrl)
    await expect(LoginPage.getInputUsername()).toHaveValue('')
    await expect(LoginPage.getInputPassword()).toHaveValue('')

    await LoginPage.login(data.user.name, data.user.password)
    await expect(await InvertoryPage.getCurrentUrl()).toContain(data.page.inventoryURL)
    
    await InvertoryPage.clickCartIcon()
    await expect(await CartPage.getCurrentUrl()).toContain(data.message.cartUrl)
    await expect(await CartPage.getSecondaryHeaderTitle()).toHaveText(data.page.cartPageTitle)
    await expect(await CartPage.getFirstItemName()).toBe(firstItemName)
  })

})

