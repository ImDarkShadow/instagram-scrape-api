import MiniSearch from "minisearch";

const searchPost = async (page, searchTerm) => {
  console.log("searching for posts");
  console.log(searchTerm)
  let postLinks = await page.$$eval('a[href^="/p/"]', (postLinks) =>
    postLinks.map((link, index) => {
      const img = link.querySelector("img");
      return {
        id: index + 1,
        link: link.href,
        thumbnail: img.src,
        alt: img.alt,
      };
    })
  );
  const miniSearch = new MiniSearch({
    idField: "id", // the name of the field used as unique identifier
    fields: ["alt", "link"], // fields to index for full-text search
    storeFields: ["link", "thumbnail", "alt"], // fields to return with search results
  });
 // console.log(postLinks)
  miniSearch.addAll(postLinks);

  return  miniSearch.search(searchTerm);
};

export default searchPost;
