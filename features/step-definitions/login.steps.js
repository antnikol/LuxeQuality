import { Given, When, Then } from '@wdio/cucumber-framework'
import LoginPage from '../../pageobjects/login.page.js'
import { expect } from 'chai'

Given('User is located on the main page of saucedemo website', async () => {
  await LoginPage.open()
});

When('User clicks the {string} button', async (button) => {
  await LoginPage.clickLoginButton()
});

Then('User should see {string} error message', async (errorMessage) => {
  const actualMessage = await LoginPage.getEpicErrorMessage().getText();
  expect(actualMessage).to.equal(errorMessage);
});