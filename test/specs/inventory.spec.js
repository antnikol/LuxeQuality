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

  it('Sorting products due choosed filter', async () => {
    await InvertoryPage.clickProductSortingButton()
    await InvertoryPage.selectSortOptionByText(data.filter.priceLowHigh)
    await expect(await InvertoryPage.getItemPrices()).toEqual(await InvertoryPage.sortItemPricesLowToHigh())
  })


})

