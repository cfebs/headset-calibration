
let offset = 0;
let interval = null;

let settings = {
    speed: 150,
    maxOffset: 190,
    startOffset: 140,
};

const parseHash = () => {
    let hash = window.location.hash;
    if (!hash) {
        return;
    }

    hash = hash.substr(1);

    hash.split('&').forEach((pair) => {
        let [key, value] = pair.split('=');
        settings[key] = value;
    });

};

parseHash();

console.log('Settings', settings);

const cursorLeft = document.querySelector('.cursor-left');
const cursorRight = document.querySelector('.cursor-right');

function moveCursors(x) {
    cursorLeft.setAttribute('style', `left: calc(50% - 100px); transform: translateX(${x * -1}px);`);
    cursorRight.setAttribute('style', `left: calc(50% - 100px); transform: translateX(${x}px);`);
    cursorLeft.innerHTML = x;
    cursorRight.innerHTML = x;
}

function restart() {
    offset = settings.startOffset;
    if (interval) {
        clearInterval(interval);
    }

    interval = setInterval(() => {
        if (settings.maxOffset && offset >= settings.maxOffset) {
            clearInterval(interval);
        }

        console.info('Moving cursor to', offset, 'from center', 'offset:', offset);
        moveCursors(++offset);
    }, settings.speed);
}

console.log('Api');
console.log('window.setSpeed(speed)', 'speed: in ms to itterate');
console.log('window.setMaxOffset(num)', 'num: max itterations');
console.log('window.setStartOffset(num)', 'num: which one to start on');
console.log('window.restart()', 'restarts the thing');
console.log('Starting in 5s');
setTimeout(() => {
    restart();
}, 5000);

window.restart = restart;
window.setSpeed = (s) => {
    settings.speed = s;
    restart();
}

window.setMaxOffset = (m) => {
    if (m > 1) {
        settings.maxOffset = m;
    }
    restart();
}

window.setStartOffset = (m) => {
    if (m > 1) {
        settings.startOffset = m;
    }
    restart();
}
