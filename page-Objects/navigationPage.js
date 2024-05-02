const { Page, expect } = require ("@playwright/test");

class NavigationPage {

    constructor(page) {
        this.page = page;
    }

    async navigationPage(){
        await this.page.click('text=Forms')
        await this.page.click('text=Form Layouts')
        
    }

    async inlineform(){
        
        const data={
            username :"James 007",
            email :"ghanaman.com.gh"
        };
        await this.page.getByText('Inline form').isVisible()
        await this.page.fill('nb-card-body form input[placeholder="Jane Doe"]', data.username)
        await this.page.getByPlaceholder('Email').first().fill(data.email)
        await this.page.click('text=Remember me')
        await this.page.click('text=SUBMIT')
        //await this.page.waitForTimeout(50000);
        await this.page.screenshot({path:'screenshot/inlineForm.png'})
    }

    async UsingtheGrid(){
        await this.page.fill('form div input[id="inputEmail1"]', "Playwright.com")
        await this.page.fill('form div input[id="inputPassword2"]', 'Playwr@T')
        await this.page.click('form div[class="form-group row"] button[type="submit"]')
        await this.page.click('text=Option 1')
        const options = this.page.locator('text=Option 1')
        expect(options).toContainText('Option 1')
        await this.page.click('text=SIGN IN')
    }

    async Basicform(){
        await this.page.fill('#exampleInputEmail1','ghanapolice.com.gh')
        await this.page.fill('#exampleInputPassword1','P@lice119')
        await this.page.click('text=Check me out')
        const checkme = this.page.locator('text=Check me out')
        expect(checkme).toBeChecked()
        await this.page.click('.appearance-filled.size-medium.shape-rectangle.status-danger.nb-transition')
  
    }

    async FormWithoutLabels(){
        await this.page.fill('input[placeholder="Recipients"]', 'James Abekah')
        await this.page.fill('input[placeholder="Subject"]', 'QA')
        await this.page.fill('[placeholder="Message"]', 'This is a test automation on udemy.')
        await this.page.click('text=SEND')
    }

    async BlockForm(){
        await this.page.fill('input[placeholder="First Name"]', "Ama")
        await this.page.fill('#inputLastName', 'Amoah')
        await this.page.fill('#inputEmail', 'kumasi.com.gh')
        await this.page.fill('#inputWebsite', 'ghanaweb.com')
        await this.page.click('.appearance-filled.size-medium.shape-rectangle.status-basic.nb-transition')
    }

    async CheckBoxes(){
        await this.page.click('text=Modal & Overlays')
        await this.page.click('text=Toastr')
        const isCheck = this.page.getByRole('checkbox')
        for(const box of await isCheck.all()){
        await box.check({force: true})
        expect(await box.isChecked()).toBeTruthy()
        }
    }
    async TablePage(){
        await this.page.click('text=Tables & Data')
        await this.page.click('text=Smart Table')
        //click on dialog box
        this.page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?')
        dialog.accept()
        })
        await this.page.getByRole('table').locator('tr').filter({hasText: 'mdo@gmail.com'}).locator('.nb-trash').click()
        await expect(this.page.locator('table tr').first()).not.toHaveText('mdo@gmail.com')
    }

    async DateSelector(){
        await this.page.click('text=Forms')
        await this.page.click('text=Datepicker')

        const dateSelector = this.page.getByPlaceholder("Form Picker")
        await dateSelector.click()

        let date = new Date()
        date.setDate(date.getDate() + 17)
        const expectedDate = date.getDate().toString().padStart(2, '0')
        const expectedMonthShort = date.toLocaleString('en-US', {month: 'short'});
        const expectedMonthLong = date.toLocaleString('en-US', {month: 'long'})
        const expectedYear = date.getFullYear();
        const dateToPick = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`;

        let calenderMonthYear = await this.page.locator('nb-calendar-view-mode').textContent()
        const expectedMonthYear = `${expectedMonthLong} ${ expectedYear}`
        //const expectedMonthYear = `${date.toLocaleString('en-US', { month: 'long' })} ${expectedYear}`;
        while(!calenderMonthYear.includes(expectedMonthYear)){
        await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
        calenderMonthYear = await this.page.locator('nb-calendar-view-mode').textContent()
        }
    }

    async AdjustTheSlider(){
        await this.page.click('text=IoT Dashboard')
        const tempbox = await this.page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
        await tempbox.scrollIntoViewIfNeeded()

        const box = await tempbox.boundingBox()
        const x = box.x + box.width / 2
        const y = box.y + box.height / 2
        await this.page.mouse.move(x, y)
        await this.page.mouse.down()
        await this.page.mouse.move(x +50, y)
        await this.page.mouse.move(x +50, y +100)
        await this.page.mouse.up()
        //Prints the temperature to console
        const expectedTemp = await tempbox.textContent('value');
        console.log('temperature:', expectedTemp);
        await expect(tempbox).toContainText('30')
    }

}
export {NavigationPage};
