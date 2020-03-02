const HEIGHT = window.innerHeight / 2;
const MIN = 25;
const BAR_CONTAINER = document.querySelector("#bar-container");
const SLIDER = document.querySelector("#slider");
const QUICK_SORT_BUTTON = document.querySelector("#quick-sort");

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

const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

//SORTING ALGORITHMS

const switchItems = (array, i, j) => {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
};

//quicksort
async function partition(array, low, high) {
    let index = low - 1;
    const pivot = array[high];

    for (let i = low; i < high; i++) {
        if (array[i] <= pivot) {
            index++;
            await sleep(200 - SLIDER.value);
            switchItems(array, index, i);
            updateBars(array);
        }
    }

    switchItems(array, index + 1, high);
    return index + 1;
}

async function quickSort(array, low, high) {
    if (low < high) {
        partitionIndex = await partition(array, low, high);

        quickSort(array, low, partitionIndex - 1);
        quickSort(array, partitionIndex + 1, high);
    }
}

//mergesort

const main = () => {
    const bar = document.createElement("span");
    bar.classList.add("bar");

    let sliderValue = SLIDER.value;

    addChild(BAR_CONTAINER, bar, sliderValue);

    let intArray = randomIntArray(sliderValue);

    updateBars(intArray);

    SLIDER.addEventListener("input", () => {
        const newSliderValue = SLIDER.value;
        const sliderDifference = newSliderValue - sliderValue;
        if (sliderDifference > 0) {
            addChild(BAR_CONTAINER, bar, sliderDifference);
            addRandomNumberTimes(intArray, sliderDifference, newSliderValue);
        }
        if (sliderDifference < 0) {
            removeChild(BAR_CONTAINER, Math.abs(sliderDifference));
            removeFromEnd(intArray, Math.abs(sliderDifference, newSliderValue));
        }
        sliderValue = newSliderValue;
        updateBars(intArray);
    });

    QUICK_SORT_BUTTON.addEventListener("click", () => {
        quickSort(intArray, 0, intArray.length - 1);
    });
};

main();
