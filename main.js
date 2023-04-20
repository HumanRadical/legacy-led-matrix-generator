import { sanitizeColorArrayIntoHex } from "./src/sanitizeColorArrayIntoHex"
import errorIconImg from "./img/error_icon.svg"

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
let frameCount = 0
let animationSequence = null

let frameBoxes = []

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
        if(index !== 0 && index % x.value === 0) {
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
        for(let frame of frameBoxes) {
         setupString += `\nconst long Frame${frame.count}[] PROGMEM = 
            { 
                ${sanitizeColorArrayIntoHex(frame.value, "0x")} 
            };\n`
        }
        return setupString
    }

    const showDisplay = () => {
        let showString = ""
        for(let frame of frameBoxes) {
            showString += `\nFastLED.clear();
            for(int i = 0; i < NUM_LEDS; i++) {
                leds[i] = pgm_read_dword(&(Frame${frame.count}[NUM_LEDS - i - 1]));
            } 

            FastLED.show();
            ${(frame.interval ? `delay(${frame.interval});\n` : "")}`
        }
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
                errorIcon.src = errorIconImg
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
    
    if (frameCount > 1) {
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

const handleInputErrors = () => {
    for(let frame of frameBoxes) {
        const frameValue = sanitizeColorArrayIntoHex(frame.value)
        if (frameValue.length !== x.value * y.value) {
            const lengthError = document.createElement("li")
            lengthError.classList.add("errorMessage")
            lengthError.textContent = `The number of colors in Frame ${frame.count} does not match the number of pixels.`
            errorMessages.appendChild(lengthError)
        }
        if (frameValue.some(color => color === "<Error>")) {
            const invalidColorError = document.createElement("li")
            invalidColorError.classList.add("errorMessage")
            invalidColorError.textContent = `One or more pixels in Frame ${frame.count} have an invalid color.`
            errorMessages.appendChild(invalidColorError)
        }
    }
}

const addGridColors = (event) => {
    event.preventDefault()

    createGrid()
    outputArduinoCode()
    colorInPixels()
}

const appendAnimationInterval = (value) => {
    const animationSettingsDiv = document.createElement("div")
    animationSettingsDiv.classList.add("animationSettings")

    const animationIntervalLabel = document.createElement("label")
    const animationIntervalInput = document.createElement("input")

    animationIntervalLabel.classList.add("settingLabel")
    animationIntervalLabel.setAttribute("for", "animationInterval")
    animationIntervalLabel.innerText = 'Animation Interval (ms): '

    animationIntervalInput.classList.add("intervalBox")
    animationIntervalInput.setAttribute("id", `animationInterval${frameCount}`)
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
    newFrame.setAttribute("id", count)
    newFrame.setAttribute("cols", "50")
    newFrame.setAttribute("rows", "20")

    frameBoxDiv.append(newFrame)
}

const updateFrameValue = (event) => {
    event.preventDefault()

    const boxId = event.target.id
    const boxValue = event.target.value
    for(let frame of frameBoxes) {
        if(frame.count = boxId) {
            frame.value = boxValue
        }
    }
}

const updateFrameInterval = (event) => {
    event.preventDefault()

    const boxId = event.target.id
    const boxValue = event.target.value
    for(let frame of frameBoxes) {
        if(frame.count = boxId) {
            frame.interval = boxValue
        }
    }
}

const addFrame = (event) => {
    if(event) {
        event.preventDefault()
    }

    frameCount++
    frameBoxes.push({
        count: frameCount,
        value: ""
    })
    if(frameCount !== 1) {
        frameBoxes[frameCount - 1].interval = 500
    }
    if (frameCount === 2) {
        frameBoxes[0].interval = 500
    }

    frameBoxDiv.innerHTML = ""

    for(let frame of frameBoxes) {
        appendNewFrame(frame.count, frame.value)
        if (frame.interval) {
            appendAnimationInterval(frame.interval)
        }
    }

    const inputBoxes = document.querySelectorAll('.inputBox') 
    for(let inputBox of inputBoxes) {
        inputBox.addEventListener("input", updateFrameValue)
    }

    const intervalBoxes = document.querySelectorAll('.intervalBox') 
    for(let intervalBox of intervalBoxes) {
        intervalBox.addEventListener("change", updateFrameInterval)
    }
}

const reset = (event) => {
    event.preventDefault()

    clearInterval(animationSequence)
    grid.innerHTML = ""
    outputBox.value = ""
    clipboardMessage.innerText = ""
    errorMessages.innerHTML = ""
    frameCount = 0
    frameBoxDiv.innerHTML = ""
    frameBoxes = []
    addFrame()
}

addFrameButton.addEventListener("click", addFrame)
resetButton.addEventListener("click", reset)
submitForm.addEventListener("submit", addGridColors)

window.onload = () => {
    addFrame()

    const firstFrame = document.querySelector('.inputBox')

    firstFrame.innerText = "0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0xcccccc, 0xcccccc, 0xcccccc, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0x000000, 0x000000, 0x000000, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x0066cc, 0x000000, 0x0066cc, 0x000000, 0x0066cc, 0x0066cc, 0x0066cc, 0x0066cc, 0xcccccc, 0xcccccc, 0xcccccc, 0x000000, 0x000000, 0xcccccc, 0xcccccc, 0xcccccc, 0x0066cc, 0x0066cc, 0x0066cc, 0x0066cc, 0x000000, 0x0066cc, 0x000000, 0x0066cc, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x0066cc, 0x0066cc, 0x0066cc, 0x0066cc, 0x0066cc, 0x0066cc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0x000000, 0x000000, 0x000000, 0x000000, 0x0066cc, 0x0066cc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0x000000, 0x000000, 0xff0000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0xff0000, 0xff0000, 0x000000, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0x0066cc, 0x0066cc, 0xcccccc, 0x000000, 0x000000, 0x000000, 0xff0000, 0xff0000, 0xff0000, 0x0066cc, 0x0066cc, 0x0066cc, 0x0066cc, 0xff0000, 0xff0000, 0xff0000, 0xff0000, 0xff0000, 0xff0000, 0xff0000, 0x000000, 0x000000, 0x000000, 0xff0000, 0xff0000, 0x000000, 0xcccccc, 0xcccccc, 0xcccccc, 0x0066cc, 0x0066cc, 0x0066cc, 0xcccccc, 0xcccccc, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0x000000, 0x000000, 0xff0000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0xcccccc, 0xcccccc, 0x000000, 0x000000, 0x000000, 0xcccccc, 0xcccccc, 0x000000, 0x000000, 0x000000, 0x000000, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0x000000, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000"
    frameBoxes[0].value = "0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0xcccccc, 0xcccccc, 0xcccccc, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0x000000, 0x000000, 0x000000, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x0066cc, 0x000000, 0x0066cc, 0x000000, 0x0066cc, 0x0066cc, 0x0066cc, 0x0066cc, 0xcccccc, 0xcccccc, 0xcccccc, 0x000000, 0x000000, 0xcccccc, 0xcccccc, 0xcccccc, 0x0066cc, 0x0066cc, 0x0066cc, 0x0066cc, 0x000000, 0x0066cc, 0x000000, 0x0066cc, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x0066cc, 0x0066cc, 0x0066cc, 0x0066cc, 0x0066cc, 0x0066cc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0x000000, 0x000000, 0x000000, 0x000000, 0x0066cc, 0x0066cc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0x000000, 0x000000, 0xff0000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0xff0000, 0xff0000, 0x000000, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0x0066cc, 0x0066cc, 0xcccccc, 0x000000, 0x000000, 0x000000, 0xff0000, 0xff0000, 0xff0000, 0x0066cc, 0x0066cc, 0x0066cc, 0x0066cc, 0xff0000, 0xff0000, 0xff0000, 0xff0000, 0xff0000, 0xff0000, 0xff0000, 0x000000, 0x000000, 0x000000, 0xff0000, 0xff0000, 0x000000, 0xcccccc, 0xcccccc, 0xcccccc, 0x0066cc, 0x0066cc, 0x0066cc, 0xcccccc, 0xcccccc, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0x000000, 0x000000, 0xff0000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0xcccccc, 0xcccccc, 0x000000, 0x000000, 0x000000, 0xcccccc, 0xcccccc, 0x000000, 0x000000, 0x000000, 0x000000, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0x000000, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000"
}