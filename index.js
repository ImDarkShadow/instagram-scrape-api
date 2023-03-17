import puppeteer from "puppeteer";
import fs from "fs";

//load .env file
import dotenv from "dotenv";
dotenv.config();
const userName = process.env.USER_NAME;
let profileUrl = `https://imginn.com/${userName}`;

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 5.1; rv:5.0) Gecko/20100101 Firefox/5.0"
  );
  console.log(`https://imginn.com/${userName}`);
  // Navigate to the URL
  await page.goto(profileUrl);

  // // Set the viewport size
  await page.setViewport({ width: 1280, height: 5000 });

  // // Set the amount to scroll per step (in pixels)
  // const scrollStep = 2250;

  // // Loop through the page and scroll
  // let currentScroll = 0;
  // while (true) {
  //   // Scroll the page by the specified amount
  //   await page.evaluate(`window.scrollTo(0, ${currentScroll})`);

  //   // Wait for the page to render the new content
  //   await page.waitForTimeout(1000);

  //   // Get the height of the page
  //   const pageHeight = await page.evaluate(() => document.body.scrollHeight);

  //   // If we have reached the end of the page, exit the loop
  //   if (currentScroll + page.viewport().height >= pageHeight) {
  //     break;
  //   }

  //   // Increment the current scroll position
  //   currentScroll += scrollStep;
  try {
    while (true) {
      const loadMoreButton = await page.$(".load-more");
      if (!loadMoreButton) {
        break;
      }

      // const isClickable = await loadMoreButton.isIntersectingViewport();
      // if (!isClickable) {
      //   // Handle the case where the button is not clickable
      //   console.log("Button is not clickable");
      //   break;
      // }
      await page.evaluate(
        (loadMoreButton) => loadMoreButton.click(),
        loadMoreButton
      );
      await page.waitForSelector(".load-more", {
        visible: true,
      });
    }
  } catch (error) {
    console.log(error);
  }

  // Take a screenshot of the page
  await page.screenshot({ fullPage: true, path: "example.png" });
  const pageContent = await page.content();

  // Save the content to a file
  fs.writeFileSync("page.html", pageContent);

  // Close the browser
  await browser.close();
})();
