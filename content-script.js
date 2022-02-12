let lastTime;
let counter = 0;
let clickOnPlayTries = 0;

function probPlaybackProgress() {
  const playbackElement = document.querySelector('[data-testid="playback-position"]');
  return playbackElement.innerHTML;
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


setInterval(() => {
  const currentTime = probPlaybackProgress();
  console.log(currentTime,lastTime)
  if (currentTime) {
    if (currentTime === lastTime) {
      counter++;
    } else {
      lastTime = currentTime;
      clickOnPlayTries = 0;
      counter = 0;
    }

    showStatus(counter === 0 ? 'playing': `not playing (${counter}), tries: ${clickOnPlay}`);
    if(clickOnPlayTries === 3) {
      location.reload();
    }

    if (counter > 20) {
      clickOnPlay();
      counter = 0;
      clickOnPlayTries++;
    }
  }
}, 1000);