let counter = 0;
const IDLE_TIME_IN_SECONDS_BEFORE_TRIGGERING=20;
async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

async function getAllTabs() {
  let allTabs = await chrome.tabs.query({currentWindow: true});
  const spotifyTab = allTabs.find((tab) => tab.url.includes('spotify'));
  console.log(spotifyTab)
}


function showStatus(status) {
  const statusElement = document.querySelector('[id="blamos"]');
  if(!statusElement) {
    const div = document.createElement("div");
    div.style.width = "150px";
    div.style.background = "blue";
    div.style.display = "block";
    div.style.zIndex= 999999999
    div.style.position = "absolute";
    div.id = "blamos";
    document.body.appendChild(div);
  }
  statusElement.innerHTML = status;
}

function clickOnPlay() {
  document.querySelector('[data-testid="play-button"]').click()
}


async function runContentFunction(func, args = []) {
  const activeTab = await getCurrentTab();
  const tabId = activeTab.id;
  chrome.scripting.executeScript({
    target: { tabId },
    func,
    args
  });
}

setInterval(async () => {
  await getAllTabs();
 const activeTab = await getCurrentTab();
 if(activeTab && activeTab.url.includes('spotify')) {
   await runContentFunction(showStatus, [activeTab.audible ? 'playing': `not playing (${counter})`])

   if(!activeTab.audible) {
    counter++;
   } else {
     counter = 0;
   }

   if(counter > IDLE_TIME_IN_SECONDS_BEFORE_TRIGGERING) {
    counter = 0;
    await runContentFunction(clickOnPlay);
  }
 }
}, 1000)

