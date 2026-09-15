from playwright.sync_api import sync_playwright
import time

def verify_recipe_modal():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        print("Navigating to home page...")
        page.goto("http://localhost:4173/")
        time.sleep(2)

        print("Clicking India card...")
        page.click("text=India")
        time.sleep(2)

        print("Clicking dish card...")
        page.click("h2:has-text('Butter Chicken')")
        time.sleep(1.5)

        print("Saving recipe modal popup screenshot...")
        page.screenshot(path="/home/jules/verification/screenshots/verification_recipe_modal.png")
        browser.close()
        print("Screenshot saved!")

if __name__ == "__main__":
    verify_recipe_modal()
