// describe('Android Simple Sanity', () => {
//     it('should click the LOGIN button', async () => {
//         // Wait for the app to launch
//         await driver.pause(3000);

//         const usernameInput = await $('//android.widget.EditText[@text="Username"]');
//         const passwordInput = await $('//android.widget.EditText[@text="Password"]');
//         const loginButton = await $('//android.widget.TextView[@text="LOGIN"]');

//         await usernameInput.waitForDisplayed();
//         await usernameInput.setValue('standard_user');

//         await passwordInput.setValue('secret_sauce');

//         await loginButton.click();

//         // Example assertion after login (Products screen)
//         const productsTitle = await $('//android.widget.TextView[@text="PRODUCTS"]');
//         await productsTitle.waitForDisplayed();

//         // Add a small pause to observe the action
//         await driver.pause(2000);


//         // Optional: Assert the button exists (sanity check)

//     });

//     it('should check product visibility and add to cart', async () => {

//     // 1️⃣ Product container
//     const productItem = await $('android=new UiSelector().text("Sauce Labs Bike Light")');

//     // Check visibility
//     const isVisible = await productItem.isDisplayed();

//     if (isVisible) {
//       console.log('✅ Product is visible');

//       // 2️⃣ Click on product
//       await productItem.click();

//       // 3️⃣ Add to Cart button
//       const addToCartBtn = await $('~test-ADD TO CART');

//       await addToCartBtn.waitForDisplayed({ timeout: 5000 });
//       await addToCartBtn.click();

//       console.log('🛒 Product added to cart');

//     } else {
//       throw new Error('❌ Product is not visible');
//     }
//   });
// });

import LoginPage from '../pageobjects/LoginPage.js';
import ProductsPage from '../pageobjects/ProductsPage.js';
import ProductDetailsPage from '../pageobjects/ProductDetailsPage.js';

describe('Android Simple Sanity', () => {

  it('should login successfully', async () => {
    await driver.pause(3000);

    await LoginPage.login('standard_user', 'secret_sauce');
    await LoginPage.verifyLoginSuccess();
  });

  it('should check product visibility and add to cart', async () => {

    const productName = 'Sauce Labs Bike Light';

    await ProductsPage.openProduct(productName);
    await ProductDetailsPage.addToCart();
  });
});
 