let vorpalButton = document.querySelector('#vorpalButton')
let testButton = document.querySelector('#testButton')
let sandButton = document.querySelector('#sandButton')
let circleButton = document.querySelector('#circleButton')
let bookmarklet = document.querySelector('#bookmarklets')
let physicsButton = document.querySelector('#circlePhysics')

vorpalButton.onclick = function () {window.open('./vorpal_dive/index.html', '_self');}
testButton.onclick = function () {window.open('./test_page/Kowantify/index.html', '_self');}
sandButton.onclick = function () {window.open('./Simulations/Sand_Simulation/index.html', '_self');}
circleButton.onclick = function () {window.open('./Simulations/Circle_Thing/index.html', '_self');}
bookmarklet.onclick = function () {window.open('./extensions/Bookmarklet/index.html', '_self');}
physicsButton.onclick = function () {window.open('./Simulations/ConservationOfMomentum/index.html', '_self')}
