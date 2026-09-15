import asyncio
from playwright.async_api import async_playwright
import os

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(viewport={'width': 1280, 'height': 800}, record_video_dir="/home/jules/verification/videos/")
        page = await context.new_page()

        print("Navigating to app...")
        await page.goto("http://localhost:4173")
        await page.wait_for_timeout(2000)

        # Click on France or India to view dish images
        print("Clicking on country card...")
        france_card = page.locator("text=France")
        if await france_card.count() > 0:
            await france_card.first.click()
        else:
            # Click first country card
            await page.locator("text=Explore").first.click()

        await page.wait_for_timeout(2000)

        os.makedirs("/home/jules/verification/screenshots", exist_ok=True)
        screenshot_path = "/home/jules/verification/screenshots/verification_dishes.png"
        await page.screenshot(path=screenshot_path, full_page=True)
        print(f"Screenshot saved to {screenshot_path}")

        await context.close()
        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
