import {sanitizeColorArrayIntoHex} from "./src/sanitizeColorArrayIntoHex.js"
//import errorIconImg from "../img/error_icon.svg"

const submitForm = document.querySelector("#submitForm")
const grid = document.querySelector("#grid")
const snakeBox = document.querySelector("#snakeBox")
const outputBox = document.querySelector("#outputBox")
const clipboardMessage = document.querySelector("#clipboardMessage")
const errorMessages = document.querySelector('#errorMessages')
const x = document.querySelector("#x-axis")
const y = document.querySelector("#y-axis")
const resetButton = document.querySelector("#resetButton")
const frameBoxDiv = document.querySelector("#frameBoxDiv")
const addFrameButton = document.querySelector("#addFrameButton")
const sampleDropdown = document.querySelector("#sampleSelection");
let animationSequence = null
let samples = {};

let frameBoxes = samples.digdug

const createGrid = () => {
    errorMessages.innerHTML = ""
    grid.innerHTML = ""

    for (let i = 0; i < x.value * y.value; i++) {
        const pixel = document.createElement("div")
        pixel.style.width = `${500 / x.value}px`
        pixel.style.height = `${500 / y.value}px`
        pixel.style.display = "inline-block"
        pixel.classList.add("pixel")
        grid.append(pixel)
    }
}

const snakeColors = (colorInput) => {
    const newArray = []
    let row = []
    colorInput.forEach((color, index) => {
        if (index !== 0 && index % x.value === 0) {
            if (newArray.length % 2 === 1) {
                row.reverse()
            }
            newArray.push(row)
            row = []
        }
        row.push(color)
    })
    if (newArray.length % 2 === 1) {
        row.reverse()
    }
    newArray.push(row)

    const finalArray = [].concat(...newArray)
    return finalArray
}

const outputArduinoCode = (colors) => {
    const setupDisplay = () => {
        let setupString = ""
        frameBoxes.forEach((frame, idx) => {
            setupString += `\nconst long Frame${idx + 1}[] PROGMEM = 
            { 
                ${sanitizeColorArrayIntoHex(frame.value, "0x")} 
            };\n`
        });
        return setupString
    }

    const showDisplay = () => {
        let showString = ""
        frameBoxes.forEach((frame, idx) => {
            showString += `\nFastLED.clear();
            for(int i = 0; i < NUM_LEDS; i++) {
                leds[i] = pgm_read_dword(&(Frame${idx + 1}[NUM_LEDS - i - 1]));
            } 

            FastLED.show();
            ${(frame.interval ? `delay(${frame.interval});\n` : "")}`
        });
        return showString
    }

    const arduinoCode =
        `#include <avr/pgmspace.h>
        #include "FastLED.h"  

        #define NUM_LEDS ${x.value * y.value}

        #define DATA_PIN 7 

        CRGB leds[NUM_LEDS];

        ${setupDisplay()}
        void setup() { 
        FastLED.addLeds<WS2812B, DATA_PIN, GRB>(leds, NUM_LEDS);
        }

        void loop() { 
            ${showDisplay()}
        }`
    navigator.clipboard.writeText(arduinoCode)
    clipboardMessage.innerHTML = "Copied to clipboard."
    outputBox.value = arduinoCode
}

const colorInPixels = () => {
    const displayCurrentFrame = (inputBoxIndex) => {
        createGrid()
        handleInputErrors()
        const pixels = document.querySelectorAll(".pixel")

        let inputBoxColors = sanitizeColorArrayIntoHex(frameBoxes[inputBoxIndex].value)
        if (snakeBox.checked) {
            inputBoxColors = snakeColors(inputBoxColors)
        }
        inputBoxColors.forEach((color, pixelIndex) => {
            const pixel = pixels[pixelIndex]
            if (color === "<Error>") {
                const errorIcon = document.createElement("img")
                errorIcon.classList.add("errorIcon")
                errorIcon.src = '/img/error_icon.svg'
                //                errorIcon.src = errorIconImg
                pixel.appendChild(errorIcon)

                return
            }
            if (pixel) {
                pixel.style.backgroundColor = color
            }
        })
    }

    let inputBoxCount = 0
    let currentAnimationInterval = frameBoxes[0].interval

    clearInterval(animationSequence)
    displayCurrentFrame(inputBoxCount)
    inputBoxCount++

    if (frameBoxes.length > 1) {
        animationSequence = setInterval(() => {
            displayCurrentFrame(inputBoxCount)
            if (inputBoxCount < frameBoxes.length - 1) {
                inputBoxCount++
            } else {
                inputBoxCount = 0
            }
        }, currentAnimationInterval)
    }
}

const updateFrameBoxes = (event) => {
    frameBoxes = samples[event.target.value];
    frameBoxDiv.innerHTML = ""
    appendFrameBoxes();
}

const handleInputErrors = () => {
    frameBoxes.forEach((frame, idx) => {
        const frameValue = sanitizeColorArrayIntoHex(frame.value)
        if (frameValue.length !== x.value * y.value) {
            const lengthError = document.createElement("li")
            lengthError.classList.add("errorMessage")
            lengthError.textContent = `The number of colors in Frame ${idx + 1} does not match the number of pixels.`
            errorMessages.appendChild(lengthError)
        }
        if (frameValue.some(color => color === "<Error>")) {
            const invalidColorError = document.createElement("li")
            invalidColorError.classList.add("errorMessage")
            invalidColorError.textContent = `One or more pixels in Frame ${idx + 1} have an invalid color.`
            errorMessages.appendChild(invalidColorError)
        }
    });
}

const addGridColors = (event) => {
    if (event) {
        event.preventDefault()
    }

    createGrid()
    outputArduinoCode()
    colorInPixels()
}

const appendAnimationInterval = (count, value) => {
    const animationSettingsDiv = document.createElement("div")
    animationSettingsDiv.classList.add("animationSettings")

    const animationIntervalLabel = document.createElement("label")
    const animationIntervalInput = document.createElement("input")

    animationIntervalLabel.classList.add("settingLabel")
    animationIntervalLabel.setAttribute("for", "animationInterval")
    animationIntervalLabel.innerText = 'Animation Interval (ms): '

    animationIntervalInput.classList.add("intervalBox")
    animationIntervalInput.setAttribute("id", `animationInterval${count}`)
    animationIntervalInput.setAttribute("type", "number")
    animationIntervalInput.setAttribute("value", value)
    animationIntervalInput.setAttribute("min", "0")
    animationIntervalInput.setAttribute("step", "100")

    animationSettingsDiv.appendChild(animationIntervalLabel)
    animationSettingsDiv.appendChild(animationIntervalInput)

    frameBoxDiv.append(animationSettingsDiv)
}

const appendNewFrame = (count, value) => {
    const newFrameLabel = document.createElement("label")
    newFrameLabel.innerHTML = `<h3 class="frameLabel">Frame ${count}:</h3>`
    frameBoxDiv.append(newFrameLabel)

    const newFrame = document.createElement("textarea")
    newFrame.classList.add("inputBox")
    newFrame.classList.add("textbox")
    newFrame.innerText = value
    newFrame.setAttribute("id", `frameBox${count}`)
    newFrame.setAttribute("cols", "50")
    newFrame.setAttribute("rows", "20")

    frameBoxDiv.append(newFrame)
}

const renderAvailableSampleOptions = () => {
    for (const sampleName of Object.keys(samples)) {
        const sampleOption = document.createElement('option');
        sampleOption.innerText = sampleName;
        sampleOption.value = sampleName;
        sampleDropdown.appendChild(sampleOption)
    }
}

const loadAvailableSamples = async () => {
    let availableSamples = localStorage.getItem("available-samples");
    if (!availableSamples) {
        availableSamples = (await import("../../samples/retro.json")).default;
        localStorage.setItem("available-samples", JSON.stringify(availableSamples))
    }
    samples = JSON.parse(availableSamples);
    frameBoxes = samples.digdug;
}

const initializeApplication = async () => {
    await loadAvailableSamples();
    renderAvailableSampleOptions();
    appendFrameBoxes();
}

const appendFrameBoxes = () => {
    frameBoxes.forEach((frame, idx) => {
        appendNewFrame(idx + 1, frame.value)
        if (frame.interval) {
            appendAnimationInterval(idx + 1, frame.interval)
        }
    })


    const inputBoxes = document.querySelectorAll('.inputBox')
    for (let inputBox of inputBoxes) {
        inputBox.addEventListener("input", updateFrameValue)
    }

    const intervalBoxes = document.querySelectorAll('.intervalBox')
    for (let intervalBox of intervalBoxes) {
        intervalBox.addEventListener("change", updateFrameInterval)
    }
}

const updateFrameValue = (event) => {
    event.preventDefault()

    const boxId = event.target.id
    const boxValue = event.target.value
    frameBoxes.forEach((frame, idx) => {
        if (`frameBox${idx + 1}` === boxId) {
            frame.value = boxValue
        }
    });
}

const updateFrameInterval = (event) => {
    event.preventDefault()

    const boxId = event.target.id
    const boxValue = event.target.value
    frameBoxes.forEach((frame, idx) => {
        if (`animationInterval${idx + 1}` === boxId) {
            frame.interval = boxValue
        }
    });
}

const addFrame = (event) => {
    if (event) {
        event.preventDefault()
    }

    frameBoxes.push({
        value: ""
    })
    if (frameBoxes.length !== 1) {
        frameBoxes[frameBoxes.length - 1].interval = 500
    }
    if (frameBoxes.length === 2) {
        frameBoxes[0].interval = 500
    }

    frameBoxDiv.innerHTML = ""

    appendFrameBoxes()
}

const reset = (event) => {
    event.preventDefault()

    clearInterval(animationSequence)
    grid.innerHTML = ""
    outputBox.value = ""
    clipboardMessage.innerText = ""
    errorMessages.innerHTML = ""
    frameBoxDiv.innerHTML = ""
    frameBoxes = []
    addFrame()
}

addFrameButton.addEventListener("click", addFrame)
resetButton.addEventListener("click", reset)
submitForm.addEventListener("submit", addGridColors)
sampleDropdown.addEventListener("change", updateFrameBoxes)
window.onload = initializeApplication()