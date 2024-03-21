let lastPing = Date.now();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === 'ping') {
    lastPing = Date.now();
  }
});

chrome.alarms.create('checkPing', { periodInMinutes: 5 });

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'checkPing') {
    const TWO_MINUTES = 2 * 60 * 1000;
    if (Date.now() - lastPing > TWO_MINUTES) {
      chrome.tabs.query({ active: true }, (tabs) => {
        const activeTab = tabs[0];
        if (activeTab) {
          if(activeTab.url.includes('spotify.com')) {
            chrome.tabs.reload(tabs[0].id);
          }
        }
      });
    }
  }
});
