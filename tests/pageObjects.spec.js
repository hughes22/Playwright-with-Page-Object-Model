const { test, expect } = require("@playwright/test");
const NavigationPage = require("../page-Objects/navigationPage.js").NavigationPage;
 
test.beforeEach(async ({ page }) => {
    await page.goto('/')
})

test('NavigateToFormPage', async({page}) => {
 const navigateTo = new NavigationPage(page);
 await navigateTo.navigationPage();
 await navigateTo.inlineform();
 await navigateTo.UsingtheGrid();
 await navigateTo.Basicform();
 await navigateTo.FormWithoutLabels()
 await navigateTo.BlockForm();
 await navigateTo.CheckBoxes();
 await navigateTo.TablePage();
 await navigateTo.DateSelector();
 await navigateTo.AdjustTheSlider();
});