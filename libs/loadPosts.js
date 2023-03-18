const loadPosts = async (page) => {
  try {
    while (true) {
      const loadMoreButton = await page.$(".load-more");
      if (!loadMoreButton) {
        break;
      }
      await page.evaluate(
        (loadMoreButton) => loadMoreButton.click(),
        loadMoreButton
      );
      await page.waitForSelector(".load-more", {
        visible: true,
        timeout: 5000,
      });
    }
  } catch (error) {}
};

export default loadPosts;
