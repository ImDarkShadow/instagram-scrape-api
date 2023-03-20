**Instagram Tools it's a collection of functions to scrape Instagram via Imginn**
Example:

    import {
    	instagramUser
    } from "instagram-tools";
    
    (async () => {
    	//create object with username
    	let user = await new instagramUser("usename");
    	//check if the account is private or not  
    	console.log(await user.isAccountPrivate());
    	//check if the account is exsist or not    
    	console.log(await user.isUserExist());
    	//search for post inside a profile
    	//it searches for the text with the posts
    	let searchResult = await user.searchPosts("searchTerm");
    	console.log(searchResult);
    	//get array of links of all the images or videos 
    	let links = await user.downloadLinks();
    	console.log(links);
    	//close the user
    	user.close();
    })();

*New features will be added to new versions*