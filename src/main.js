
let offset = 0;
let interval = null;

let settings = {
    speed: 100,
    maxOffset: 400,
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
    cursorLeft.style.cssText = `left: calc(50% - ${x}px - 25px)`;
    cursorRight.style.cssText = `left: calc(50% + ${x}px - 25px)`;
}

function restart() {
    offset = 0;
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
console.log('window.restart()', 'restarts the thing');
console.log('Starting in 3, 2, 1');
setTimeout(() => {
    restart();
}, 3000);

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
