// script.js

let selectedPlayer = null;
let backgroundMusicStarted = false;

const gameContainer = document.getElementById('game-container');
const backgroundMusic = document.getElementById('background-music');
const clickSound = new Audio('assets/click.mp3');

// Confetti library (optional, see bottom)

function startGame() {
    selectedPlayer = null;
    document.body.style.backgroundImage = '';
    backgroundMusic.src = "assets/gameshow-music.mp3";
    backgroundMusic.loop = true;
    backgroundMusic.pause();

    gameContainer.innerHTML = `
        <img id="top-image" src="assets/game.png" alt="Game Start" class="fade-in">
        <div id="message-container" class="fade-in">Choose your player:</div>
        <div id="choice-container" class="fade-in">
            <img src="assets/luke.png" class="choice-image" alt="Luke" onclick="selectPlayer('luke')">
            <img src="assets/adam.png" class="choice-image" alt="Adam" onclick="selectPlayer('adam')">
        </div>
    `;
}

function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.play();
}

function selectPlayer(player) {
    playClickSound();
    selectedPlayer = player;
    showLoading(() => {
        showPatpongScene();
    });
}

function showPatpongScene() {
    gameContainer.innerHTML = `
        <img id="top-image" src="assets/game.png" alt="Game Start" class="fade-in">
        <div id="message-container" class="fade-in">Welcome to Patpong Nightmarket. You had a great time and stumbled across a couple of ladies to take back to your hotel room.</div>
        <div id="choice-container" class="fade-in">
            <img src="assets/midget.png" class="choice-image" alt="Midget" onclick="selectLady()">
            <img src="assets/minor.png" class="choice-image" alt="Minor" onclick="selectLady()">
            <div>
                <img src="assets/home.png" class="button-image" alt="Go Home Alone" onclick="goHomeAlone()">
            </div>
        </div>
    `;
}

function selectLady() {
    playClickSound();
    showLoading(() => {
        if (selectedPlayer === 'luke') {
            winGame("good-boy");
        } else {
            showProtectionChoice();
        }
    });
}

function showProtectionChoice() {
    gameContainer.innerHTML = `
        <img id="top-image" src="assets/game.png" alt="Game Start" class="fade-in">
        <div id="message-container" class="fade-in">Do you want to play it safe?</div>
        <div id="choice-container" class="fade-in">
            <img src="assets/johnny.png" class="choice-image" alt="Johnny" onclick="chooseProtection('johnny')">
            <img src="assets/bare.png" class="choice-image" alt="Bare" onclick="chooseProtection('bare')">
        </div>
    `;
}

function chooseProtection(option) {
    playClickSound();
    showLoading(() => {
        if (option === 'johnny') {
            winGame("safe");
        } else {
            loseGame();
        }
    });
}

function goHomeAlone() {
    playClickSound();
    showLoading(() => {
        if (selectedPlayer === 'luke' || selectedPlayer === 'adam') {
            winGame("home-safe");
        } else {
            loseGame();
        }
    });
}

function winGame(type) {
    playClickSound();
    backgroundMusic.pause();
    document.body.style.backgroundImage = "url('assets/fireworks.gif')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed"; // make background stay when scrolling

    let winMessage = "";

    if (type === "good-boy") {
        winMessage = "🎉 You are a good boy and had a pocket for rubbers, no rotting willy for you! 🎉";
    } else if (type === "safe") {
        winMessage = "🎉 YOU PLAYED IT SAFE AND DON'T HAVE A ROTTING WILLY! 🎉";
    } else if (type === "home-safe") {
        winMessage = "🎉 YOU MADE A SAFE CHOICE GOING HOME ALONE! 🎉";
    } else {
        winMessage = "🎉 YOU ARE A WINNER! 🎉";
    }

    gameContainer.innerHTML = `
        <h1 class="fade-in" style="font-size: 32px; margin-top: 80px;">${winMessage}</h1>
        <div class="fade-in">
            <img src="assets/again.png" class="button-image" alt="Play Again" onclick="startGame()">
        </div>
    `;

    launchConfetti(); // launch confetti 🎉
}

function loseGame() {
    playClickSound();
    backgroundMusic.pause();
    const sadMusic = new Audio('assets/sad-music.mp3');
    sadMusic.play();
    
    document.body.style.backgroundImage = '';

    gameContainer.innerHTML = `
        <img src="assets/lose.jpg" class="fade-in" style="width: 90%; max-width: 600px; margin-top: 20px; border: 5px solid white; border-radius: 10px;">
        <br>
        <img src="assets/horse.png" class="fade-in" style="width: 50%; max-width: 300px; margin-top: 20px; border: 3px solid white; border-radius: 10px;">
        <h1 class="fade-in" style="font-size: 28px; margin-top: 20px;">I'm sorry you lost this time, you have to visit the docs!</h1>
        <div class="fade-in">
            <img src="assets/again.png" class="button-image" alt="Play Again" onclick="startGame()">
        </div>
    `;
}

// Fake loading screen for 1 second
function showLoading(callback) {
    gameContainer.innerHTML = `
        <div style="color:white; font-size: 28px; margin-top: 100px;" class="fade-in">
            Loading...
        </div>
    `;
    setTimeout(callback, 1000); // wait 1 second, then do the next thing
}

// Start background music after first user interaction
function startBackgroundMusic() {
    if (!backgroundMusicStarted) {
        backgroundMusic.play();
        backgroundMusicStarted = true;
    }
}

window.onload = () => {
    startGame();
    document.addEventListener('click', startBackgroundMusic, { once: true });
};

// Optional confetti celebration
function launchConfetti() {
    if (typeof confetti !== 'undefined') {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
}
