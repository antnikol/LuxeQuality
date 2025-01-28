import { $ } from '@wdio/globals'
import Page from './page.js';

class InvertoryPage extends Page {

  getSecondaryHeaderTitle = () => $('span[data-test="title"]')
  getInvertoryList = () => $('div[data-test="inventory-list"]')
  getCartIcon = () => $('a[data-test="shopping-cart-link"]')
  



}

export default new InvertoryPage();
