const HEIGHT = window.innerHeight / 2;
const MIN = 25;
const mapRange = function(n, start1, stop1, start2, stop2) {
    return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
};

function addChild(to, what, times) {
    for (let i = 0; i < times; i++) {
        to.appendChild(what.cloneNode(true));
    }
}
function removeChild(from, times) {
    for (let i = 0; i < times; i++) {
        from.removeChild(from.lastChild);
    }
}

function getRandomMappedNumber(min, max, minMap, maxMap) {
    const randomNum = Math.floor(Math.random() * max) + min;
    const randomNumMapped = mapRange(randomNum, min, max, minMap, maxMap);
    return randomNumMapped;
}

function randomIntArray(length) {
    return Array.from({ length }, () => {
        return getRandomMappedNumber(0, length, MIN, HEIGHT);
    });
}

const updateBars = intArray => {
    const bars = document.querySelectorAll(".bar");
    bars.forEach((bar, index) => {
        bar.style.height = intArray[index] + "px";
    });
};

const addRandomNumberTimes = (intArray, times, max) => {
    for (let i = 0; i < times; i++) {
        const randomNum = getRandomMappedNumber(0, max, MIN, HEIGHT);
        intArray.push(randomNum);
    }
};

const removeFromEnd = (intArray, times) => {
    for (let i = 0; i < times; i++) {
        intArray.pop();
    }
};

const main = () => {
    const barContainer = document.querySelector("#bar-container");

    const bar = document.createElement("span");
    bar.classList.add("bar");

    const slider = document.querySelector("#slider");
    let sliderValue = slider.value;

    addChild(barContainer, bar, sliderValue);

    let intArray = randomIntArray(sliderValue);

    updateBars(intArray);

    slider.addEventListener("input", () => {
        const sliderDifference = slider.value - sliderValue;
        if (sliderDifference > 0) {
            addChild(barContainer, bar, sliderDifference);
            addRandomNumberTimes(intArray, sliderDifference, slider.value);
        }
        if (sliderDifference < 0) {
            removeChild(barContainer, Math.abs(sliderDifference));
            removeFromEnd(intArray, Math.abs(sliderDifference, slider.value));
        }
        sliderValue = slider.value;
        updateBars(intArray);
    });
};



main();
