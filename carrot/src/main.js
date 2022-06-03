'use strict';
import PopUp from "./popup.js";
import Field from "./field.js";

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const gameBtn = document.querySelector('.game_button');
const gameTimer = document.querySelector('.game_timer');
const gameScore = document.querySelector('.game_score');

const carrotSound = new Audio('./sound/carrot_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const windSound = new Audio('./sound/game_win.mp3');

let started = false;
let score = 0;
let timer = undefined;

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
    startGame();
})


const gameField = new Field();
gameField.onItemClick();

// (event) => onFieldClick(event)
field.addEventListener('click', onFieldClick)

gameBtn.addEventListener('click', () => {
   if (started) {
    stopGame();
   } else {
    startGame();
   }
});

function startGame() {
    started = true;
    initGame();
    showStopButton();
    showTimerAndScore();
    startGameTimer();
    playSound(bgSound);
}

function stopGame() {
    started = false;
    stopGameTimer();
    hideGameButton();
    gameFinishBanner.showWithText('REPLAY❓');
    playSound(alertSound);
    stopSound(bgSound);
}

function finishGame(win) {
    started = false;
    hideGameButton();
    if(win) {
        playSound(windSound);
    }else {
        playSound(bugSound);
    }
    stopGameTimer();
    stopSound(bgSound);
    gameFinishBanner.showWithText(win ? 'YOU WON 🎉' : 'YOU LOST 😱');
}

function showStopButton() {
    const icon = document.querySelector('.fa-play')
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-Play');
    gameBtn.style.visibility = 'visible';
}

function hideGameButton() {
    gameBtn.style.visibility = 'hidden';
}

function showTimerAndScore() {
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}

function startGameTimer() {
    let remainingTimeSec = GAME_DURATION_SEC;
    updateTimerText(remainingTimeSec);
    timer = setInterval(()=> {
        if(remainingTimeSec <= 0) {
            clearInterval(timer);
            finishGame(score === CARROT_COUNT);
            return;
        }
        updateTimerText(--remainingTimeSec);
    }, 1000);
}

function stopGameTimer() {
    clearInterval(timer);
}

function updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    gameTimer.innerHTML = `${minutes}:${seconds}`
}

function initGame() {
    score = 0;
    gameScore.innerText = CARROT_COUNT;
}

function onFieldClick(event) {
    if(!started) {
        return;
    }
    const target = event.target;
    
    // matches: css 셀렉터가 맞는지 확인.
    if(target.matches('.carrot')) {
        // 당근!!
        target.remove();
        score++;
        playSound(carrotSound);
        updateScoreBoard();
        if(score === CARROT_COUNT) {
            finishGame(true);
        }
    } else if(target.matches('.bug')) {
        // 벌레!!
        finishGame(false);
    }
}

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function stopSound(sound) {
    sound.pause();
}

function updateScoreBoard() {
    gameScore.innerText = CARROT_COUNT - score;
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}