let lastTime;
let counter = 0;
let clickOnPlayTries = 0;

function probPlaybackProgress() {
  const playbackElement = document.querySelector('[data-testid="playback-position"]');
  return playbackElement.innerHTML;
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
  const statusElement = document.querySelector('[id="blamos"]');
  if (!statusElement) {
    const div = document.createElement("div");
    div.style.width = "150px";
    div.style.background = "blue";
    div.style.display = "block";
    div.style.zIndex = 999999999
    div.style.position = "absolute";
    div.id = "blamos";
    document.body.appendChild(div);
  }
  statusElement.innerHTML = status;
}

function clickOnPlay() {
  document.querySelector('[data-testid="play-button"]').click()
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