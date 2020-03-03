let HEIGHT = window.innerHeight / 2;
const MIN = 25;
const MAX = 125;
const SPEED_MIN = 2;
const SPEED_MAX = 100;

const barContainerDOM = document.querySelector("#bar-container");
const SIZE = document.querySelector("#size");
const SPEED = document.querySelector("#speed");
const quickSortButtonDOM = document.querySelector("#quick-sort");
const mergeSortButtonDOM = document.querySelector("#merge-sort");
const heapSortButtonDOM = document.querySelector("#heap-sort");
const bubbleSortButtonDOM = document.querySelector("#bubble-sort");
const shuffleButtonDOM = document.querySelector("#shuffle");
let barsDOM = document.querySelectorAll(".bar");

let animationSpeed = SPEED.value;
let arraySize = SIZE.value;
const COLORS = {
    ORANGE: "#f39c12",
    BLUE: "#48c7eb",
    GREEN: "#1abc9c"
};
//Dom manipulation

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

const updateBars = intArray => {
    barsDOM = document.querySelectorAll(".bar");
    barsDOM.forEach((bar, index) => {
        bar.style.height = intArray[index] + "px";
    });
};

const addColor = (element, color) => {
    element.style.backgroundColor = color;
};

const removeColor = element => {
    element.style.backgroundColor = COLORS.BLUE;
};

const disableControls = () => {};

//Utility

const mapRange = function(n, start1, stop1, start2, stop2) {
    return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
};

function getRandomMappedNumber(min, max, minMap, maxMap) {
    const randomNum = Math.floor(Math.random() * max) + min;
    const randomNumMapped = mapRange(randomNum, min, max, minMap, maxMap);
    return randomNumMapped;
}

const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

//Array manipulation

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function randomIntArray(length) {
    return Array.from({ length }, () => {
        return getRandomMappedNumber(0, length, MIN, HEIGHT);
    });
}

const addRandomNumberTimes = (intArray, times, max) => {
    for (let i = 0; i < times; i++) {
        const randomNum = getRandomMappedNumber(0, max, MIN, HEIGHT);
        intArray.push(randomNum);
    }
};

const removeFromEnd = (array, times) => {
    for (let i = 0; i < times; i++) {
        array.pop();
    }
};

const switchItems = (array, i, j) => {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
};

//SORTING ALGORITHMS

//quicksort
async function partition(array, low, high) {
    let index = low - 1;
    const pivot = array[high];
    addColor(barsDOM[high], COLORS.GREEN);

    for (let i = low; i < high; i++) {
        addColor(barsDOM[i], COLORS.ORANGE);
        await sleep(SPEED_MAX + SPEED_MIN - animationSpeed);
        if (array[i] <= pivot) {
            index++;
            switchItems(array, index, i);
            updateBars(array);
            removeColor(barsDOM[index]);
        }
        removeColor(barsDOM[i]);
    }

    switchItems(array, index + 1, high);
    removeColor(barsDOM[high]);
    return index + 1;
}

async function quickSort(array, low, high) {
    if (low < high) {
        partitionIndex = await partition(array, low, high);

        await quickSort(array, low, partitionIndex - 1);
        await quickSort(array, partitionIndex + 1, high);
    }
}

//mergesort
async function merge(array, left, middle, right) {
    array1size = middle - left + 1;
    array2size = right - middle;

    let leftTemp, rightTemp;

    leftTemp = array.slice(left, left + array1size);
    rightTemp = array.slice(middle + 1, middle + 1 + array2size);

    let i = 0,
        j = 0;

    let k = left;
    while (i < array1size && j < array2size) {
        addColor(barsDOM[k], COLORS.ORANGE);
        await sleep(SPEED_MAX + SPEED_MIN - animationSpeed);
        if (leftTemp[i] <= rightTemp[j]) {
            array[k] = leftTemp[i];

            i++;
        } else {
            array[k] = rightTemp[j];
            j++;
        }
        updateBars(array);
        removeColor(barsDOM[k]);
        k++;
    }

    while (i < array1size) {
        addColor(barsDOM[k], COLORS.ORANGE);
        await sleep(SPEED_MAX + SPEED_MIN - animationSpeed);
        array[k] = leftTemp[i];
        updateBars(array);
        removeColor(barsDOM[k]);
        i++;
        k++;
    }

    while (k < array2size) {
        addColor(barsDOM[k], COLORS.ORANGE);
        await sleep(SPEED_MAX + SPEED_MIN - animationSpeed);
        array[k] = rightTemp[i];
        updateBars(array);
        removeColor(barsDOM[k]);
        j++;
        k++;
    }
}

async function mergeSort(array, left, right) {
    if (left < right) {
        const middle = Math.floor((left + right) / 2);

        await mergeSort(array, left, middle);
        await mergeSort(array, middle + 1, right);

        await merge(array, left, middle, right);
    }
}

//heapsort

function heapify(array, length, i) {
    largest = i;
    left = 2 * i + 1;
    right = 2 * i + 2;

    if (left < length && array[largest] < array[left]) {
        largest = left;
    }
    if (right < length && array[largest] < array[right]) {
        largest = right;
    }

    if (largest != i) {
        switchItems(array, i, largest);
        updateBars(array);
        heapify(array, length, largest);
    }
}

function heapSort(array) {
    const length = array.length;

    for (let i = length; i >= -1; i--) {
        heapify(array, length, i);
    }

    for (let i = length - 1; i >= 0; i--) {
        switchItems(array, 0, i);
        updateBars(array);
        heapify(array, i, 0);
    }
}

//bubblesort

async function bubbleSort(array) {
    length = array.length;

    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length - i - 1; j++) {
            addColor(barsDOM[j], COLORS.ORANGE);

            if (array[j] > array[j + 1]) {
                addColor(barsDOM[j + 1], COLORS.ORANGE);
                switchItems(array, j, j + 1);
            }
            await sleep(SPEED_MAX + SPEED_MIN - animationSpeed);
            removeColor(barsDOM[j], COLORS.ORANGE);
            removeColor(barsDOM[j + 1], COLORS.ORANGE);
            updateBars(array);
        }
    }
}

//main

const main = () => {
    const bar = document.createElement("span");
    bar.classList.add("bar");

    addChild(barContainerDOM, bar, arraySize);

    let intArray = randomIntArray(arraySize);

    updateBars(intArray);

    SIZE.addEventListener("input", () => {
        const newSliderValue = SIZE.value;
        const sliderDifference = newSliderValue - arraySize;
        if (sliderDifference > 0) {
            addChild(barContainerDOM, bar, sliderDifference);
            addRandomNumberTimes(intArray, sliderDifference, newSliderValue);
        }
        if (sliderDifference < 0) {
            removeChild(barContainerDOM, Math.abs(sliderDifference));
            removeFromEnd(intArray, Math.abs(sliderDifference, newSliderValue));
        }
        arraySize = newSliderValue;
        updateBars(intArray);
    });

    window.addEventListener("resize", () => {
        HEIGHT = window.innerHeight / 2;
    });

    SPEED.addEventListener("input", e => {
        animationSpeed = SPEED.value;
    });

    quickSortButtonDOM.addEventListener("click", () => {
        quickSort(intArray, 0, intArray.length - 1);
        updateBars(intArray);
    });

    mergeSortButtonDOM.addEventListener("click", () => {
        mergeSort(intArray, 0, intArray.length - 1);
        updateBars(intArray);
    });

    heapSortButtonDOM.addEventListener("click", () => {
        heapSort(intArray);
        updateBars(intArray);
    });

    bubbleSortButtonDOM.addEventListener("click", () => {
        bubbleSort(intArray);
        updateBars(intArray);
    });

    shuffleButtonDOM.addEventListener("click", () => {
        shuffle(intArray);
        updateBars(intArray);
    });
};

main();
