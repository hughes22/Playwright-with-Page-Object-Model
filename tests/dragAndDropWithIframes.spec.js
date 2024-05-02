import {test, expect} from '@playwright/test'

test('visit WebPage', async({page}) => {
await page.goto(process.env.URL)

//simple drag & drop
const frame = await page.frameLocator('[rel-title="Photo Manager"] iframe')
await frame.locator('li', {hasText: "High Tatras 2"}).dragTo(frame.locator('#trash'))

//more precise control
await frame.locator('li', {hasText: "High Tatras 4"}).hover()
await page.mouse.down()
await frame.locator('#trash').hover()
await page.mouse.up()

//assertion
await expect(frame.locator('#trash li h5')).toHaveText(['High Tatras 2', "High Tatras 4"])

})