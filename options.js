function loadBlockedChannels() {
  chrome.storage.sync.get({ blockedChannels: [] }, (data) => {
    const list = document.getElementById('channelList');
    list.innerHTML = '';

    if (data.blockedChannels.length === 0) {
      const empty = document.createElement('p');
      empty.textContent = 'No channels blocked.';
      list.appendChild(empty);
      return;
    }

    data.blockedChannels.forEach((id) => {
      const li = document.createElement('li');
      const span = document.createElement('span');
      span.textContent = id;

      const btn = document.createElement('button');
      btn.textContent = 'Unblock';
      btn.addEventListener('click', () => {
        unblockChannel(id);
      });

      li.appendChild(span);
      li.appendChild(btn);
      list.appendChild(li);
    });
  });
}

function unblockChannel(channelId) {
  chrome.storage.sync.get({ blockedChannels: [] }, (data) => {
    const updated = data.blockedChannels.filter(id => id !== channelId);
    chrome.storage.sync.set({ blockedChannels: updated }, () => {
      loadBlockedChannels(); // refresh UI
    });
  });
}

document.addEventListener('DOMContentLoaded', loadBlockedChannels);
