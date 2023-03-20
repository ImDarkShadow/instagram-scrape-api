import puppeteer from "puppeteer";
import { checkError, isPrivate, isVaidAccount } from "./libs/isError.js";
// import loadPosts from "./libs/loadPosts.js";
// import searchPost from "./libs/searchPost.js";

//load .env file
// import dotenv from "dotenv";
// dotenv.config();
// const userName = process.env.USER_NAME;
// let profileUrl = `https://imginn.com/${userName}`;

// (async () => {
// const browser = await puppeteer.launch({
//   headless: true,
// });
// const page = await browser.newPage();
// await page.setUserAgent(
//   "Mozilla/5.0 (Windows NT 5.1; rv:5.0) Gecko/20100101 Firefox/5.0"
// );
// // Navigate to the URL
// await page.goto(profileUrl);

// // // Set the viewport size
// await page.setViewport({ width: 1280, height: 5000 });

//   console.log(await checkError(page));

//   // console.log(errorText);
//   // // Set the amount to scroll per step (in pixels)
//   // const scrollStep = 2250;

//   // // Loop through the page and scroll
//   // let currentScroll = 0;
//   // while (true) {
//   //   // Scroll the page by the specified amount
//   //   await page.evaluate(`window.scrollTo(0, ${currentScroll})`);

//   //   // Wait for the page to render the new content
//   //await page.waitForTimeout(10000);

//   //   // Get the height of the page
//   //   const pageHeight = await page.evaluate(() => document.body.scrollHeight);

//   //   // If we have reached the end of the page, exit the loop
//   //   if (currentScroll + page.viewport().height >= pageHeight) {
//   //     break;
//   //   }

//   //   // Increment the current scroll position
//   //   currentScroll += scrollStep;
//   // try {
//   //   while (true) {
//   //     const loadMoreButton = await page.$(".load-more");
//   //     if (!loadMoreButton) {
//   //       break;
//   //     }
//   //     await page.evaluate(
//   //       (loadMoreButton) => loadMoreButton.click(),
//   //       loadMoreButton
//   //     );
//   //     await page.waitForSelector(".load-more", {
//   //       visible: true,
//   //       timeout: 5000,
//   //     });
//   //   }
//   // } catch (error) {
//   //   console.log(error);
//   // }
//   await loadPosts(page);
//   // Take a screenshot of the page
//   await page.screenshot({ fullPage: true, path: "example.png" });
//   const pageContent = await page.content();

//   // Save the content to a file
//   // fs.writeFileSync("page.html", pageContent);
//   // const downloadLinks = await page.$$("a.download");
//   // let links = [];
//   // // Iterate through the links and extract their 'href' attributes
//   // for (const link of downloadLinks) {
//   //   const href = await link.getProperty("href");
//   //   const downloadUrl = await href.jsonValue();
//   //   links.push(downloadUrl);
//   // }
//   // links = links.join("\n");
//   // fs.writeFileSync("links.txt", links);
//   const links = await page.$$eval('a[href^="/p/"]', (links) => {
//     const hrefs = links.map((link) => link.href);
//     const alts = links.map((link) => link.getAttribute("alt"));
//     return { hrefs, alts };
//   });
//   // const linksArray = await links();
//   // console.log(linksArray); // prints the array of links and alt texts
//   // pr
//   //   let postLinks = await page.$$eval('a[href^="/p/"]', (postLinks) =>
//   //     postLinks.map((link) => link.href)
//   //   );

//   // let postLinks = await page.$$eval('a[href^="/p/"]', (postLinks) =>
//   //   postLinks.map((link, index) => {
//   //     const img = link.querySelector("img");
//   //     return {
//   //       id: index + 1,
//   //       link: link.href,
//   //       thumbnail: img.src,
//   //       alt: img.alt,
//   //     };
//   //   })
//   // );

//   // // postLinks = postLinks.join("\n");
//   // // fs.writeFileSync("links2.txt", postLinks);

//   // let miniSearch = new MiniSearch({
//   //   idField: "id", // the name of the field used as unique identifier
//   //   fields: ["alt", "link"], // fields to index for full-text search
//   //   storeFields: ["link", "thumbnail", "alt"], // fields to return with search results
//   // });
//   // miniSearch.addAll(postLinks);

//   //let results = miniSearch.search("euphoricbish");
//   console.log(await searchPost(page, "euphoricbish"));
//   // console.log(results);
//   // Close the browser
//   await browser.close();
// })();

// console.log(page);
const browser = await puppeteer.launch({
  headless: true,
});
class instagramUser {
  constructor(username) {
    this.profileUrl = `https://imginn.com/${username}`;
    this.page = null;
    this.fetchPage();
  }
  async fetchPage() {

    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 5.1; rv:5.0) Gecko/20100101 Firefox/5.0"
    );
    // Navigate to the URL
    await page.goto(this.profileUrl);

    // // Set the viewport size
    await page.setViewport({ width: 1280, height: 5000 });
    this.page = page;

   // browser.close();
  }

  async isAccountPrivate() {
    //delay execution for 1 second
   await new Promise((resolve) => setTimeout(resolve, 5000));

    await isPrivate(this.page)
        .then(xj => {
          console.log('isPrivate Promise resolved with:', xj);
          browser.close();
          return xj;
        })
        .catch(error => {
          console.log('isPrivate Promise rejected with:', error);
        });

  }
  async isUserExist() {
    while (this.page == null) {
      //delay for 1 second
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("waiting for page object");
    }
    return await isVaidAccount(this.page);
  }
}

export { instagramUser };
