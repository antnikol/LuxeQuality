import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import InvertoryPage from '../pageobjects/invertory.page.js'
import data from '../fixtures/data.json'
import { genTestData } from '../fixtures/genData.js'

const genData = genTestData()


describe('Login Page tests suite', () => {

  beforeEach(async () => {
    await LoginPage.open()
  })

  it('Login with the user valid login and the valid password', async () => {
    await LoginPage.login(data.user.name, data.user.password)

    await expect(await InvertoryPage.getSecondaryHeaderTitle()).toHaveText('Products')
    await expect(await InvertoryPage.getCurrentUrl()).toContain('inventory.html')
    await expect(await InvertoryPage.getInvertoryList()).toBeDisplayed()
    await expect(await InvertoryPage.getCartIcon()).toBeDisplayed()
  })

  it('Login with the user valid login and the invalid password', async () => {
    await LoginPage.login(data.user.name, genData.userPassword)

    await expect(await LoginPage.getLoginErrorIcon()).toBeDisplayed()
    await expect(await LoginPage.getPasswordErrorIcon()).toBeDisplayed()
    await expect(await LoginPage.getInputUsername()).toHaveClass('error')
    await expect(await LoginPage.getInputPassword()).toHaveClass('error')
    await expect(await LoginPage.getEpicErrorMessage()).toHaveText(data.message.loginError)
  })

  it('Login with the user invalid login and the valid password', async () => {
    await LoginPage.login(genData.userName, data.user.password)

    await expect(await LoginPage.getLoginErrorIcon()).toBeDisplayed()
    await expect(await LoginPage.getPasswordErrorIcon()).toBeDisplayed()
    await expect(await LoginPage.getInputUsername()).toHaveClass('error')
    await expect(await LoginPage.getInputPassword()).toHaveClass('error')
    await expect(await LoginPage.getEpicErrorMessage()).toHaveText(data.message.loginError)
  })

    it('Check that user can logout', async () => {
      await LoginPage.login(data.user.name, data.user.password)
      await InvertoryPage.clickBurgerButton()
      await InvertoryPage.clickLogoutButton()
  
      await expect(await LoginPage.getCurrentUrl()).toBe(data.message.baseUrl)
      await expect(LoginPage.getInputUsername()).toHaveValue('')
      await expect(LoginPage.getInputPassword()).toHaveValue('')
    })

})

