class ProductsPage {

  productByName(productName) {
    return $(`android=new UiSelector().text("${productName}")`);
  }

  async openProduct(productName) {
    const product = await this.productByName(productName);
    await product.waitForDisplayed({ timeout: 5000 });
    await product.click();
  }
}

export default new ProductsPage();
