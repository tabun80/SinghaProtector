// @ts-ignore
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url.indexOf("https://singha.coiney.com/") > -1) {
    // @ts-ignore
    chrome.tabs.executeScript(null, { file: "stop.js" }, () => {
    });
  }
});
