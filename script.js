// script.js

let selectedPlayer = null;

const gameContainer = document.getElementById('game-container');
const choiceContainer = document.getElementById('choice-container');
const messageContainer = document.getElementById('message-container');
const backgroundMusic = document.getElementById('background-music');

function startGame() {
    selectedPlayer = null; // reset selected player
    document.body.style.backgroundImage = ''; // remove any background images
    backgroundMusic.src = "assets/gameshow-music.mp3";
    backgroundMusic.loop = true;
    backgroundMusic.play();

    gameContainer.innerHTML = `
        <img id="top-image" src="assets/game.png" alt="Game Start">
        <div id="message-container">Choose your player:</div>
        <div id="choice-container">
            <img src="assets/luke.png" class="choice-image" alt="Luke" onclick="selectPlayer('luke')">
            <img src="assets/adam.png" class="choice-image" alt="Adam" onclick="selectPlayer('adam')">
        </div>
    `;
}

function selectPlayer(player) {
    selectedPlayer = player;
    showPatpongScene();
}

function showPatpongScene() {
    if (selectedPlayer === 'luke') {
        winGame("good-boy");
    } else {
        // Adam picked - normal Patpong story
        gameContainer.innerHTML = `
            <img id="top-image" src="assets/game.png" alt="Game Start">
            <div id="message-container">Welcome to Patpong Nightmarket. You had a great time and stumbled across a couple of ladies to take back to your hotel room.</div>
            <div id="choice-container">
                <img src="assets/midget.png" class="choice-image" alt="Midget" onclick="selectLady()">
                <img src="assets/minor.png" class="choice-image" alt="Minor" onclick="selectLady()">
                <div>
                    <img src="assets/home.png" class="button-image" alt="Go Home Alone" onclick="goHomeAlone()">
                </div>
            </div>
        `;
    }
}

function selectLady() {
    showProtectionChoice();
}

function showProtectionChoice() {
    gameContainer.innerHTML = `
        <img id="top-image" src="assets/game.png" alt="Game Start">
        <div id="message-container">Do you want to play it safe?</div>
        <div id="choice-container">
            <img src="assets/johnny.png" class="choice-image" alt="Johnny" onclick="chooseProtection('johnny')">
            <img src="assets/bare.png" class="choice-image" alt="Bare" onclick="chooseProtection('bare')">
        </div>
    `;
}

function chooseProtection(option) {
    if (option === 'johnny') {
        winGame("safe");
    } else {
        loseGame();
    }
}

function goHomeAlone() {
    loseGame(); // Going home alone with Adam is treated as a loss
}

function winGame(type) {
    backgroundMusic.pause();
    document.body.style.backgroundImage = "url('assets/fireworks.gif')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";

    let winMessage = "";

    if (type === "good-boy") {
        winMessage = "🎉 You are a good boy and had a pocket for rubbers, no rotting willy for you! 🎉";
    } else if (type === "safe") {
        winMessage = "🎉 YOU PLAYED IT SAFE AND DON'T HAVE A ROTTING WILLY! 🎉";
    } else {
        winMessage = "🎉 YOU ARE A WINNER! 🎉";
    }

    gameContainer.innerHTML = `
        <h1 style="font-size: 32px; margin-top: 80px;">${winMessage}</h1>
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
        <h1 style="font-size: 28px; margin-top: 20px;">I'm sorry you lost this time, you have to visit the docs!</h1>
        <div>
            <img src="assets/again.png" class="button-image" alt="Play Again" onclick="startGame()">
        </div>
    `;
}

window.onload = startGame;
