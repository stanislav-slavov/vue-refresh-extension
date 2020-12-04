import browser from "webextension-polyfill";

browser.runtime.onMessage.addListener((request) => {
  if (request.msg) {
    console.log(request.msg);
  }
});
