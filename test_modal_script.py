from playwright.sync_api import sync_playwright
import time

def test_script():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:4173/")
        time.sleep(3)
        print("Page title:", page.title())
        print("Body text snippet:", page.inner_text("body")[:300])

        # Click first country link
        country_links = page.query_selector_all("a[href^='/country/']")
        print(f"Found {len(country_links)} country links.")
        if country_links:
            country_links[0].click()
            time.sleep(2)
            print("Country page text snippet:", page.inner_text("body")[:300])
            dish_cards = page.query_selector_all(".grid > div")
            print(f"Found {len(dish_cards)} dish cards.")
            if dish_cards:
                dish_cards[0].click()
                time.sleep(1.5)
                page.screenshot(path="/home/jules/verification/screenshots/verification_recipe_modal.png")
                print("Successfully took screenshot of modal popup!")
        browser.close()

if __name__ == "__main__":
    test_script()
