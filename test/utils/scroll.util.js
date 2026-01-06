/**
 * Scrolls vertically until the element is visible
 * @param {string} uiSelector - UiSelector string
 * Example: 'new UiSelector().text("Sauce Labs Backpack")'
 */
export async function scrollToElement(uiSelector) {
  return await $(
    'android=new UiScrollable(new UiSelector().scrollable(true))' +
    `.scrollIntoView(${uiSelector})`
  );
}

// Provide a default export (object) to be tolerant with different import styles
export default {
  scrollToElement,
};
