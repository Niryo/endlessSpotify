let lastPing = Date.now();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === 'ping') {
    lastPing = Date.now();
  }
});

chrome.alarms.create('checkPing', {periodInMinutes: 5});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'checkPing') {
    const TWO_MINUTES = 2 * 60 * 1000;
    if (Date.now() - lastPing > TWO_MINUTES) {
      chrome.tabs.query({url: "*://*.spotify.com/*"}, function (tabs) {
        tabs.forEach(function (tab) {
          chrome.tabs.reload(tab.id);
        });
      });
    }
  }
});
