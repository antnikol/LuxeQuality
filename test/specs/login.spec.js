import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import InvertoryPage from '../pageobjects/invertory.page.js'
import data from '../fixtures/data.json'


describe('Login Page tests suite', () => {

  beforeEach(async () => {
    await LoginPage.open()
  })

  it('Login with the user valid login and the valid password', async () => {
    await LoginPage.login(data.user.name, data.user.password)

    await expect(InvertoryPage.getSecondaryHeaderTitle()).toHaveText('Products')
    await expect(InvertoryPage.getInvertoryList()).toBeDisplayed()
    await expect(InvertoryPage.getCartIcon()).toBeDisplayed()
  })

  it('Login with the user invalid login and the valid password', async () => {
    await LoginPage.login(data.user.name, data.user.invalid_password)

    await expect(await LoginPage.getLoginErrorIcon()).toBeDisplayed()
    await expect(await LoginPage.getPasswordErrorIcon()).toBeDisplayed()
    // await expect(await LoginPage)
  })

})

