let currentMode = localStorage.getItem('themeMode');
let text = document.getElementsByClassName('text')
let buttons = document.getElementsByClassName('buttons')
let modeButton = document.querySelector('#modeButton')
let grassButton = document.querySelector('#grass')
let woodButton = document.querySelector('#wood')
let stoneButton = document.querySelector('#stone')
let ironButton = document.querySelector('#iron')
let goldButton = document.querySelector('#gold')
let diamondButton = document.querySelector('#diamond')
let netheriteButton = document.querySelector('#netherite')

if (currentMode === null){
    localStorage.setItem('themeMode', 'light');
    currentMode = 'light';
}
else if (currentMode === 'dark'){
    document.body.style.transitionDuration = '0s'
    currentMode = 'light';
    changeStyleMode()
}

modeButton.onclick = changeStyleMode;
grassButton.onclick = function () {window.open('https://store.kowantify.com/checkout/config/1');}
woodButton.onclick = function () {window.open('https://store.kowantify.com/checkout/config/2');}
stoneButton.onclick = function () {window.open('https://store.kowantify.com/checkout/config/3');}
ironButton.onclick = function () {window.open('https://store.kowantify.com/checkout/config/4');}
goldButton.onclick = function () {window.open('https://store.kowantify.com/checkout/config/5');}
diamondButton.onclick = function () {window.open('https://store.kowantify.com/checkout/config/6');}
netheriteButton.onclick = function () {window.open('https://store.kowantify.com/checkout/config/7');}

function changeStyleMode(first = false) {
    if (currentMode === 'dark'){
        document.body.style.transitionDuration = '500ms'
        document.body.style.background = "#ffffff";
        currentMode = "light";
        localStorage.setItem('themeMode', 'light')
        modeButton.innerHTML = 'Change to dark mode'
        for (let i = 0; i < text.length; i++) {
            text[i].style.color = "#000000";
        }
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].style.background = "#646464";
            buttons[i].style.color = "#ffffff";
        }
    }
    else if (currentMode === 'light') {
        currentMode = 'dark';
        document.body.style.background = "#27252a";
        localStorage.setItem('themeMode', 'dark')
        modeButton.innerHTML = 'Change to light mode'
        for (let i = 0; i < text.length; i++) {
            text[i].style.color = "#ffffff";
        }
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].style.background = "#ffffff";
            buttons[i].style.color = "#000000";
        }
    }
}
woodButton.addEventListener('mouseover', () => {
});
woodButton.addEventListener('mouseout', () => {
});
stoneButton.addEventListener('mouseover', () => {
});
stoneButton.addEventListener('mouseout', () => {
});

