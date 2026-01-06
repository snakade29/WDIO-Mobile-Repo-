import * as ScrollUtil from '../utils/scroll.util.js';

class ProductDetailsPage {

  async addToCart() {
    const addToCartBtn = await ScrollUtil.scrollToElement(
      'new UiSelector().description("test-ADD TO CART")'
    );

    await addToCartBtn.waitForDisplayed({ timeout: 5000 });
    await addToCartBtn.click();
  }
}

export default new ProductDetailsPage();
