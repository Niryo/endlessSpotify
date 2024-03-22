let lastPing = Date.now();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === 'ping') {
    lastPing = Date.now();
  }
});

chrome.alarms.create('checkPing', {periodInMinutes: 5});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'checkPing') {
    console.log('Checking ping, last was:', lastPing);
    const TWO_MINUTES = 2 * 60 * 1000;
    if (Date.now() - lastPing > TWO_MINUTES) {
      console.log('try reloading');
      chrome.tabs.query({url: "*://*.spotify.com/*"}, function (tabs) {
        tabs.forEach(function (tab) {
          console.log('detected spotify tab, reloading...');
          chrome.tabs.reload(tab.id);
        });
      });
    }
  }
});
