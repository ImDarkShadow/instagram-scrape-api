const checkError = async (page) => {
  return await page.evaluate(() => {
    const privateAccount = document.querySelector(".error");
    const accountNotFound = document.querySelector(".error-page");

    if (privateAccount) {
      return privateAccount.textContent.trim();
    } else if (accountNotFound) {
      return accountNotFound.textContent.trim();
    } else {
      return null;
    }
  });
};
export default checkError;
