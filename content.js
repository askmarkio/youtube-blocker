function hideBlockedChannels(blocked) {
  const allVideos = document.querySelectorAll('ytd-grid-video-renderer, ytd-video-renderer, ytd-rich-item-renderer');
  allVideos.forEach(video => {
    const channelLink = video.querySelector('a[href*="/@"], a[href*="/channel/"]');
    if (channelLink && blocked.some(id => channelLink.href.includes(id))) {
      video.style.display = 'none';
    }
  });
}

function runBlocker() {
  chrome.storage.sync.get({ blockedChannels: [] }, (data) => {
    hideBlockedChannels(data.blockedChannels);
  });
}

const observer = new MutationObserver(runBlocker);
observer.observe(document.body, { childList: true, subtree: true });

runBlocker();
