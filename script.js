// script.js

let selectedPlayer = null;

const gameContainer = document.getElementById('game-container');
const choiceContainer = document.getElementById('choice-container');
const messageContainer = document.getElementById('message-container');
const backgroundMusic = document.getElementById('background-music');

// Initial function to start the game
function startGame() {
    showPlayerChoices();
}

function showPlayerChoices() {
    messageContainer.innerHTML = "Choose your player:";

    choiceContainer.innerHTML = `
        <img src="assets/luke.png" class="choice-image" alt="Luke" onclick="selectPlayer('luke')">
        <img src="assets/adam.png" class="choice-image" alt="Adam" onclick="selectPlayer('adam')">
    `;
}

function selectPlayer(player) {
    selectedPlayer = player;
    showPatpongScene();
}

function showPatpongScene() {
    messageContainer.innerHTML = "Welcome to Patpong Nightmarket. You had a great time and stumbled across a couple of ladies to take back to your hotel room.";
    choiceContainer.innerHTML = `
        <img src="assets/midget.png" class="choice-image" alt="Midget" onclick="selectLady()">
        <img src="assets/minor.png" class="choice-image" alt="Minor" onclick="selectLady()">
        <div style="margin-top: 20px;">
            <button onclick="goHomeAlone()" style="padding: 10px 20px; font-size: 18px; margin-top: 20px;">Go Home Alone</button>
        </div>
    `;
}

function selectLady() {
    if (selectedPlayer === 'luke') {
        winGame();
    } else {
        loseGame();
    }
}

function goHomeAlone() {
    if (selectedPlayer === 'luke') {
        winGame();
    } else {
        loseGame();
    }
}

function winGame() {
    backgroundMusic.pause();
    document.body.style.backgroundImage = "url('assets/fireworks.gif')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    
    gameContainer.innerHTML = `
        <h1 style="font-size: 48px; margin-top: 100px;">🎉 YOU ARE A WINNER! 🎉</h1>
    `;
}

function loseGame() {
    backgroundMusic.pause();
    const sadMusic = new Audio('assets/sad-music.mp3');
    sadMusic.play();
    
    gameContainer.innerHTML = `
        <img src="assets/lose.jpg" style="width: 80%; max-width: 600px; margin-top: 20px; border: 5px solid white; border-radius: 10px;">
        <h1 style="font-size: 36px; margin-top: 20px;">I'm sorry you lost this time, you have to visit the docs!</h1>
    `;
}

// Start the game when page loads
window.onload = startGame;
