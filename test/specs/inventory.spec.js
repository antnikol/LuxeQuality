import { expect } from '@wdio/globals'
import data from '../fixtures/data.json'
import { genTestData } from '../fixtures/genData.js'

import LoginPage from '../pageobjects/login.page.js'
import InvertoryPage from '../pageobjects/invertory.page.js'


const genData = genTestData()


describe('Inventory Page tests suite', () => {

  beforeEach(async () => {
    await LoginPage.open()
    await LoginPage.login(data.user.name, data.user.password)
  })

  data.sortingFilters.forEach(({ name, sortFunction, getFunction }) => {
    it(`Test Case #6 | Sorting products due to chosen filter: "${name}"`, async () => {
      await InvertoryPage.clickProductSortingButton()
      await InvertoryPage.selectSortOptionByText(name)

      await expect(await InvertoryPage[getFunction]()).toEqual(await InvertoryPage[sortFunction]())
    })
  })

  data.socialLinks.forEach(({ icon, clickFunction, expectedURL }) => {
    it(`Test Case #7 | Checking footer ${icon} icon & link`, async () => {
      await InvertoryPage[clickFunction]()
      await InvertoryPage.switchToNewTab()

      await expect(await browser.getUrl()).toContain(expectedURL)

      await InvertoryPage.closeCurrentTabAndSwitchBack()
    })
  })

})

