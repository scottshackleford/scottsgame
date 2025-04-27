// script.js

let selectedPlayer = null;
let selectedLady = null;

const gameContainer = document.getElementById('game-container');
const choiceContainer = document.getElementById('choice-container');
const messageContainer = document.getElementById('message-container');
const backgroundMusic = document.getElementById('background-music');

function startGame() {
    showPlayerChoices();
}

function showPlayerChoices() {
    document.body.style.backgroundImage = '';
    backgroundMusic.src = "assets/gameshow-music.mp3";
    backgroundMusic.play();

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
        <img src="assets/midget.png" class="choice-image" alt="Midget" onclick="selectLady('lady')">
        <img src="assets/minor.png" class="choice-image" alt="Minor" onclick="selectLady('lady')">
        <div>
            <img src="assets/home.png" class="button-image" alt="Go Home Alone" onclick="goHomeAlone()">
        </div>
    `;
}

function selectLady(lady) {
    selectedLady = lady;
    showProtectionChoice();
}

function showProtectionChoice() {
    messageContainer.innerHTML = "Do you want to play it safe?";
    choiceContainer.innerHTML = `
        <img src="assets/johnny.png" class="choice-image" alt="Johnny" onclick="chooseProtection('johnny')">
        <img src="assets/bare.png" class="choice-image" alt="Bare" onclick="chooseProtection('bare')">
    `;
}

function chooseProtection(option) {
    if (selectedPlayer === 'luke') {
        winGame("win-safe");
    } else {
        if (option === 'johnny') {
            winGame("win-safe");
        } else {
            loseGame();
        }
    }
}

function goHomeAlone() {
    if (selectedPlayer === 'luke') {
        winGame("win");
    } else {
        loseGame();
    }
}

function winGame(type) {
    backgroundMusic.pause();
    document.body.style.backgroundImage = "url('assets/fireworks.gif')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";

    let winMessage = (type === "win-safe") 
        ? "🎉 YOU PLAYED IT SAFE AND DON'T HAVE A ROTTING WILLY! 🎉" 
        : "🎉 YOU ARE A WINNER! 🎉";

    gameContainer.innerHTML = `
        <h1 style="font-size: 36px; margin-top: 100px;">${winMessage}</h1>
        <div>
            <img src="assets/again.png" class="button-image" alt="Play Again" onclick="startGame()">
        </div>
    `;
}

function loseGame() {
    backgroundMusic.pause();
    const sadMusic = new Audio('assets/sad-music.mp3');
    sadMusic.play();
    
    document.body.style.backgroundImage = '';
    
    gameContainer.innerHTML = `
        <img src="assets/lose.jpg" style="width: 90%; max-width: 600px; margin-top: 20px; border: 5px solid white; border-radius: 10px;">
        <h1 style="font-size: 30px; margin-top: 20px;">I'm sorry you lost this time, you have to visit the docs!</h1>
        <div>
            <img src="assets/again.png" class="button-image" alt="Play Again" onclick="startGame()">
        </div>
    `;
}

window.onload = startGame;
