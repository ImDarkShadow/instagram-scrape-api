import puppeteer from "puppeteer";
import {checkError, isPrivate, isVaidAccount} from "./libs/isError.js";
import loadPosts from "./libs/loadPosts.js";
import searchPost from "./libs/searchPost.js";


const browser = await puppeteer.launch({
    headless: true,
});

class instagramUser {
    constructor(username) {
        this.profileUrl = `https://imginn.com/${username}`;
        this.page = null;
        this.isPageLoaded = false;
        this.fetchPage();
    }

    async fetchPage() {

        const page = await browser.newPage();
        await page.setUserAgent(
            "Mozilla/5.0 (Windows NT 5.1; rv:5.0) Gecko/20100101 Firefox/5.0"
        );
        // Navigate to the URL
        await page.goto(this.profileUrl, {waitUntil: "domcontentloaded"});

        // // Set the viewport size
        await page.setViewport({width: 1280, height: 5000});
        this.page = page;

        // browser.close();
    }

    async isAccountPrivate() {
        //delay execution for 1 second
        while (this.page == null) {
            //delay for 1 second
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("waiting for page object");
        }


        return await isPrivate(this.page)

    }

    async isUserExist() {
        while (this.page == null) {
            //delay for 1 second
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("waiting for page object");
        }


        return await isVaidAccount(this.page)

    }

    close() {
        browser.close();
    }

    async searchPosts(searchTerm) {
        let error = await checkError(this.page);
        if (error) {
            return error
        }
        if (!this.isPageLoaded) {
            await loadPosts(this.page);
            this.isPageLoaded = true;
        }
        return await searchPost(this.page, searchTerm);
    }

    async downloadLinks() {
        let error = await checkError(this.page);
        if (error) {
            return error
        }
        if (!this.isPageLoaded) {
            await loadPosts(this.page);
            this.isPageLoaded = true;
        }
        let links = [];
        const downloadLinks = await this.page.$$("a.download");
        for (const link of downloadLinks) {
            const href = await link.getProperty("href");
            const downloadUrl = await href.jsonValue();
            links.push(downloadUrl);
        }
        return links;
    }

}

export {instagramUser};
