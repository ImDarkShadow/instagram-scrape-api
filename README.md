**Instagram Tools it's a collection of functions to scrape Instagram via Imginn**
Example:

    (async () => {  
        let user = await new instagramUser("usename");  
      console.log( await user.isAccountPrivate());  
      console.log(await user.isUserExist());
        let searchResult = await user.searchPosts("searchTerm");  
      console.log(searchResult);  
     let links = await user.downloadLinks();  
      console.log(links);  
      //close the user
      user.close();  
    })();
*New features will be added to new versions*