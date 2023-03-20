const checkError = async (page) => {
    return await page.evaluate(() => {
        const privateAccount = document.querySelector(".error");
        const accountNotFound = document.querySelector(".page-error");

        if (privateAccount) {
            return privateAccount.textContent.trim();
        } else if (accountNotFound) {
            return accountNotFound.textContent.trim();
        } else {
            return false;
        }

    });
};

const isPrivate = (page) => {
    return page.evaluate(() => {
        const privateAccount = document.querySelector(".error");
        return !!privateAccount
    });
};

const isVaidAccount = async (page) => {
    return await page.evaluate(() => {
        const accountNotFound = document.querySelector(".page-error");

        return !!accountNotFound
    });
};
export {checkError, isPrivate, isVaidAccount};
