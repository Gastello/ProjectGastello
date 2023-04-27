let sessionSettingsTime = 60;
let breakSettingsTime = 10;

let timerCurrentTime = 3600;

let isTimerActive = false;
let isSession = true;

let timerInterval;

const currentTimeContainer = document.querySelector('.tomb_timer__time');
const sessionTimeContainer = document.querySelector('.session_timer__time');
const breakTimeContainer = document.querySelector('.break_timer__time');

const timerControlButton = document.querySelector('.tomb_timer__play');
const timerRestartButton = document.querySelector('.tomb_timer__restart');

const sessionTimerLeftButton = document.querySelector('.session_timer__left');
const sessionTimerRightButton = document.querySelector('.session_timer__right');

const breakTimerLeftButton = document.querySelector('.break_timer__left');
const breakTimerRightButton = document.querySelector('.break_timer__right');

const timerStartButtonSrc = "./images/timer/play-tomb.png";
const timerPauseButtonSrc = "./images/timer/pause-tomb.png";

const bellMusicPlayer = document.querySelector('.bell');

const timerSessionLabel = document.querySelector('.tomb_timer__label1');
const timerBreakLabel = document.querySelector('.tomb_timer__label2');

function changeTime(container, time, isIncrease) {
    if (isIncrease && time != 999) {
        time += 1
    }
    else if (!isIncrease && time != 1) {
        time -= 1;
    }
    container.innerText = time;
    return time;
}

function controlButtonClicked() {
    if (!isTimerActive) {
        isTimerActive = !isTimerActive;
        timerControlButton.children[0].src = timerPauseButtonSrc;
        timerStart();
    } else {
        isTimerActive = !isTimerActive;
        timerControlButton.children[0].src = timerStartButtonSrc;
        timerPause();
    }
}
function timerStart() {
    isTimerActive = true;
    clearInterval(timerInterval);
    timerInterval = setInterval(
        () => {
            if (isTimerActive) {
                timerCurrentTime--;
                let leftTimerSide = Math.floor(timerCurrentTime / 60);
                let rightTimerSide = timerCurrentTime % 60;
                currentTimeContainer.innerText = `${leftTimerSide < 10 ? "0" + leftTimerSide : leftTimerSide}:${rightTimerSide < 10 ? "0" + rightTimerSide : rightTimerSide}`;
                if (timerCurrentTime == 0) {
                    timerAlarm();
                }
            }
        },
        1000
    )
}
function timerPause() {
    isTimerActive = false;

}
function timerRestart() {
    timerCurrentTime = sessionSettingsTime * 60;
    currentTimeContainer.innerText = `${sessionSettingsTime < 10 ? "0" + sessionSettingsTime : sessionSettingsTime}:00`;
    timerControlButton.children[0].src = timerStartButtonSrc;
    isSession = true;
    isTimerActive = false;
    clearInterval(timerInterval);
}
function timerAlarm() {
    if (isSession) {
        timerCurrentTime = breakSettingsTime * 60;
        bellMusicPlayer.play();
        timerSessionLabel.classList.remove('active');
        timerBreakLabel.classList.add('active');
    } else {
        timerCurrentTime = sessionSettingsTime * 60;
        bellMusicPlayer.play();
        timerSessionLabel.classList.add('active');
        timerBreakLabel.classList.remove('active');
    }
    isSession = !isSession;
    isTimerActive = !isTimerActive;
    controlButtonClicked();
}
sessionTimerLeftButton.onclick = () => {
    sessionSettingsTime = changeTime(sessionTimeContainer, sessionSettingsTime, false);
}
sessionTimerRightButton.onclick = () => {
    sessionSettingsTime = changeTime(sessionTimeContainer, sessionSettingsTime, true);
}
breakTimerLeftButton.onclick = () => {
    breakSettingsTime = changeTime(breakTimeContainer, breakSettingsTime, false);
}
breakTimerRightButton.onclick = () => {
    breakSettingsTime = changeTime(breakTimeContainer, breakSettingsTime, true);
}

timerControlButton.onclick = () => {
    controlButtonClicked();
}

timerRestartButton.onclick = () => {
    timerRestart();
}