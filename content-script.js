let lastTime;
let counter = 0;
let clickOnPlayTries = 0;
setInterval(() => {
  chrome.runtime.sendMessage('ping');
}, 2*60*1000);

function probPlaybackProgress() {
  const playbackElement = document.querySelector('[data-testid="playback-position"]');
  return playbackElement?.innerHTML;
}

async function checkConnection() {
  try {
    await fetch('https://google.com', {mode: 'no-cors'});
    return true;
  } catch {
    return false;
  }
}

function showStatus(status) {
  let statusElement = document.querySelector('[id="blamos"]');
  if (!statusElement) {
    statusElement= document.createElement("div");
    statusElement.style.width = "150px";
    statusElement.style.background = "blue";
    statusElement.style.display = "block";
    statusElement.style.zIndex = 999999999
    statusElement.style.position = "absolute";
    statusElement.id = "blamos";
    document.body.appendChild(statusElement);
  }
  statusElement.innerHTML = status;
}

function clickOnPlay() {
  try { 
    document.querySelector('[data-testid="play-button"]').click()
  } catch(e) {
  }
}


setInterval(async () => {
  const currentTime = probPlaybackProgress();
  if (currentTime) {
    if (currentTime === lastTime) {
      counter++;
    } else {
      lastTime = currentTime;
      clickOnPlayTries = 0;
      counter = 0;
    }

    showStatus(counter === 0 ? 'playing' : `not playing (${counter}), tries: ${clickOnPlayTries}`);
    if (clickOnPlayTries >= 3) {
      const isConnected = await checkConnection();
      if (isConnected) {
        location.reload();
      }
    }

    if (counter > 20) {
      clickOnPlay();
      counter = 0;
      clickOnPlayTries++;
    }
  }
}, 1000);