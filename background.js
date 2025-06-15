chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "blockChannel",
    title: "Block this YouTube channel",
    contexts: ["link"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "blockChannel") {
    const url = new URL(info.linkUrl);
    const channelId = url.pathname.split('/').pop();

    chrome.storage.sync.get({ blockedChannels: [] }, (data) => {
      if (!data.blockedChannels.includes(channelId)) {
        data.blockedChannels.push(channelId);
        chrome.storage.sync.set({ blockedChannels: data.blockedChannels });
      }
    });

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => location.reload()
    });
  }
});
