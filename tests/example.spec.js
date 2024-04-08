
import {test, expect} from '@playwright/test'
//Form fields
test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.click('text=Forms')
  await page.click('text=Form Layouts')
});

test('Inline form',async ({page}) => {

  await page.getByText('Inline form').isVisible()
  await page.fill('nb-card-body form input[placeholder="Jane Doe"]', "James Bond")
  await page.getByPlaceholder('Email').first().fill('ghanaman.com.gh')
  await page.click('text=Remember me')
  await page.click('text=SUBMIT')
});

test('Using the Grid',async ({page}) => { 
  await page.fill('form div input[id="inputEmail1"]', "Playwright.com")
  await page.fill('form div input[id="inputPassword2"]', 'Playwr@T')
  await page.click('form div[class="form-group row"] button[type="submit"]')
  await page.click('text=Option 1')
  const options = page.locator('text=Option 1')
  expect(options).toContainText('Option 1')
  await page.click('text=SIGN IN')
});

test('Basic form',async({page})=> {
  await page.fill('#exampleInputEmail1','ghanapolice.com.gh')
  await page.fill('#exampleInputPassword1','P@lice119')
  await page.click('text=Check me out')
  const checkme = page.locator('text=Check me out')
  expect(checkme).toBeChecked()
  await page.click('.appearance-filled.size-medium.shape-rectangle.status-danger.nb-transition')
});

test('Form without labels',async({page}) => {
  await page.fill('input[placeholder="Recipients"]', 'James Abekah')
  await page.fill('input[placeholder="Subject"]', 'QA')
  await page.fill('[placeholder="Message"]', 'This is a test automation on udemy.')
  await page.click('text=SEND')
});

test('Block form',async({page}) => {
  await page.fill('input[placeholder="First Name"]', "Ama")
  await page.fill('#inputLastName', 'Amoah')
  await page.fill('#inputEmail', 'kumasi.com.gh')
  await page.fill('#inputWebsite', 'ghanaweb.com')
  await page.click('.appearance-filled.size-medium.shape-rectangle.status-basic.nb-transition')
})

test('Horizontal form',async({page}) => {
  await page.fill('#inputEmail3', 'practice.com')
  await page.fill('#inputPassword3', "P@$$w0rd")
  await page.click("div[class='checkbox'] span[class='text']")
  const radioButton = page.locator("div[class='checkbox'] span[class='text']")
  expect(radioButton).toBeChecked()
  await page.click('.appearance-filled.size-medium.shape-rectangle.status-warning.nb-transition')

})

test('Reuse locator1', async({page}) => {
  await page.locator('.appearance-filled.size-medium.shape-rectangle.status-warning.nb-transition')
  const buttonText = await page.locator('.appearance-filled.size-medium.shape-rectangle.status-warning.nb-transition').textContent()
  expect(buttonText).toEqual('Sign in')
})

test('input fields', async({page}) => {
  const emailField = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"})
  await emailField.fill('kwametv.com.gh')
  const selector = page.locator('nb-card', {hasText: "Using the Grid"})
  await selector.getByRole('textbox', {name: "Password"}).fill('K@man123')
})

test('navigate to another page', async({ page }) => {
  await page.click('text=Modal & Overlays')
  await page.click('text=Toastr')
  //checkboxes
  await page.click('text=Hide on click')
  await page.click('text=Prevent arising of duplicate toast')
  await page.click('text=Show toast with icon')
});

//checking and unchecking checkboxes
test('checkboxes',async ({page})=>{
  await page.click('text=Modal & Overlays')
  await page.click('text=Toastr')
  const isCheck = page.getByRole('checkbox')
  for(const box of await isCheck.all()){
    await box.check({force: true})
    expect(await box.isChecked()).toBeTruthy()
  }
})

test('tooltips', async({page})=>{
  await page.click('text=Modal & Overlays')
  await page.click('text=Tooltip')
  const tooltipcard = page.locator('nb-card', {hasText: 'Tooltip Placements'})
  await tooltipcard.getByRole('button', {name:"TOP"}).hover()
})

test('tablePage', async({page}) => {
  await page.click('text=Tables & Data')
  await page.click('text=Smart Table')
  //click on dialog box
  page.on('dialog', dialog => {
    expect(dialog.message()).toEqual('Are you sure you want to delete?')
    dialog.accept()
  })
  await page.getByRole('table').locator('tr').filter({hasText: 'mdo@gmail.com'}).locator('.nb-trash').click()
  await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com')
})

//edit web table
test('web table', async({page})=>{
  await page.click('text=Tables & Data')
  await page.click('text=Smart Table')
//targeting a row
  const targetRow = page.getByRole('Row', {name: 'twitter@outlook.com'})
  await targetRow.locator('.nb-edit').click()
  //updating data in a row
  await page.locator('input-editor').getByPlaceholder('Age').clear()
  await page.locator('input-editor').getByPlaceholder('Age').fill('20')
  await page.locator('.nb-checkmark').click()
  
  //get the row on the value in the specified column
  await page.locator('.ng2-smart-pagination-nav.ng-star-inserted').getByText('2').click()
  const targetRowId = page.getByRole('Row', {name:'11'}).filter({has: page.locator('td').nth(1).getByText('11')})
  await targetRowId.locator('.nb-edit').click()
  //update the username
  await page.locator('input-editor').getByPlaceholder('Username').clear()
  await page.locator('input-editor').getByPlaceholder('Username').fill('@kweku')
  await page.locator('.nb-checkmark').click()
  await expect(targetRowId.locator('td').nth(4)).toHaveText('@kweku')

  //test filter of the table
  const ages = ['20','30','40','50','150']
  for(let age of  ages){
    await page.locator('input-filter').getByPlaceholder('Age').clear()
    await page.locator('input-filter').getByPlaceholder('Age').fill(age)
  }
})

// selecting a date from calendar
 test('datePicker',async({page})=>{
  await page.click('text=Forms')
  await page.click('text=Datepicker')

  const dateSelector = page.getByPlaceholder("Form Picker")
  await dateSelector.click()

  let date = new Date()
  date.setDate(date.getDate() + 17)
  const expectedDate = date.getDate().toString().padStart(2, '0')
  const expectedMonthShort = date.toLocaleString('en-US', {month: 'short'});
  const expectedMonthLong = date.toLocaleString('en-US', {month: 'long'})
  const expectedYear = date.getFullYear();
  const dateToPick = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`;

  let calenderMonthYear = await page.locator('nb-calendar-view-mode').textContent()
  const expectedMonthYear = `${expectedMonthLong} ${ expectedYear}`
 //const expectedMonthYear = `${date.toLocaleString('en-US', { month: 'long' })} ${expectedYear}`;
  while(!calenderMonthYear.includes(expectedMonthYear)){
    await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
    calenderMonthYear = await page.locator('nb-calendar-view-mode').textContent()
  }

  await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact: true}).click()
  //compare both dates and prints to the console
  console.log("Expected date:", dateToPick);
  const actualValue = await dateSelector.getAttribute('value');
  console.log("Actual value:", actualValue);
  await expect(dateSelector).toHaveValue(dateToPick)
 });

 //adjust the slider
 test('sliders',async({page}) => {
  await page.click('text=IoT Dashboard')

  // const tempSlider = await page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
  // await tempSlider.evaluate(node =>{
  //   node.setAttribute('cx', '232.630')
  //   node.setAttribute('cy', '232.630')
  // })
  // await tempSlider.click()
  const tempbox = await page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
  await tempbox.scrollIntoViewIfNeeded()

  const box = await tempbox.boundingBox()
  const x = box.x + box.width / 2
  const y = box.y + box.height / 2
  await page.mouse.move(x, y)
  await page.mouse.down()
  await page.mouse.move(x +50, y)
  await page.mouse.move(x +50, y +100)
  await page.mouse.up()
  //Prints the temperature to console
  const expectedTemp = await tempbox.textContent('value');
  console.log('temperature:', expectedTemp);
  await expect(tempbox).toContainText('30')
 })
 //drag & drop with iframes