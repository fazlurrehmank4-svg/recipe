import { chromium } from 'playwright';

async function verifyModal() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('Navigating to India country page...');
  await page.goto('http://localhost:4173/country/IN', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  console.log('Clicking on Butter Chicken dish card...');
  await page.click('text=Butter Chicken');
  await page.waitForTimeout(1000);

  console.log('Taking screenshot of open Recipe Modal Popup...');
  await page.screenshot({ path: '/home/jules/verification/screenshots/verification_recipe_modal.png', fullPage: true });

  await browser.close();
  console.log('Modal verification screenshot saved successfully.');
}

verifyModal().catch(err => {
  console.error(err);
  process.exit(1);
});
