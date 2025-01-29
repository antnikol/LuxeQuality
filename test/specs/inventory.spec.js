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

  data.sortingFilters.forEach(({ name, sortFunction, getFunction }) => {
    it(`Sorting products due to chosen filter: "${name}"`, async () => {
      await InvertoryPage.clickProductSortingButton()
      await InvertoryPage.selectSortOptionByText(name)

      await expect(await InvertoryPage[getFunction]()).toEqual(await InvertoryPage[sortFunction]())
    })
  })

})

