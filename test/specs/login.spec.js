import { expect } from '@wdio/globals'
import data from '../fixtures/data.json'
import { genTestData } from '../fixtures/genData.js'

import LoginPage from '../pageobjects/login.page.js'
import InvertoryPage from '../pageobjects/invertory.page.js'


const genData = genTestData()


describe('Login Page tests suite', () => {

  beforeEach(async () => {
    await LoginPage.open()
  })

  it('Test Case #1 | Login with the user valid login and the valid password', async () => {
    await LoginPage.login(data.user.name, data.user.password)

    await expect(await InvertoryPage.getSecondaryHeaderTitle()).toHaveText(data.page.inventoryPageTitle)
    await expect(await InvertoryPage.getCurrentUrl()).toContain(data.page.inventoryURL)
    await expect(await InvertoryPage.getInvertoryList()).toBeDisplayed()
    await expect(await InvertoryPage.getInvertoryArray().length).toBeGreaterThan(0)
    await expect(await InvertoryPage.getCartIcon()).toBeDisplayed()
  })

  it('Test Case #2 | Login with the user valid login and the invalid password', async () => {
    await LoginPage.login(data.user.name, genData.userPassword)

    await expect(await LoginPage.getLoginErrorIcon()).toBeDisplayed()
    await expect(await LoginPage.getPasswordErrorIcon()).toBeDisplayed()
    await expect(await LoginPage.getInputUsername()).toHaveClass(data.page.errorClass)
    await expect(await LoginPage.getInputPassword()).toHaveClass(data.page.errorClass)
    await expect(await LoginPage.getEpicErrorMessage()).toHaveText(data.message.loginError)
  })

  it('Test Case #3 | Login with the user invalid login and the valid password', async () => {
    await LoginPage.login(genData.userName, data.user.password)

    await expect(await LoginPage.getLoginErrorIcon()).toBeDisplayed()
    await expect(await LoginPage.getPasswordErrorIcon()).toBeDisplayed()
    await expect(await LoginPage.getInputUsername()).toHaveClass(data.page.errorClass)
    await expect(await LoginPage.getInputPassword()).toHaveClass(data.page.errorClass)
    await expect(await LoginPage.getEpicErrorMessage()).toHaveText(data.message.loginError)
  })

    it('Test Case #4 | Check that user can logout', async () => {
      await LoginPage.login(data.user.name, data.user.password)
      await InvertoryPage.clickBurgerButton()
      await expect(await InvertoryPage.getSidebarLinkList().length).toBe(4)

      await InvertoryPage.clickLogoutButton()
      await expect(await LoginPage.getCurrentUrl()).toBe(data.message.baseUrl)
      await expect(LoginPage.getInputUsername()).toHaveValue('')
      await expect(LoginPage.getInputPassword()).toHaveValue('')
    })

})

