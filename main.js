import { sanitizeColorArrayIntoHex } from "./src/sanitizeColorArrayIntoHex"
import errorIconImg from "./img/error_icon.svg"

let inputBox1 = document.querySelector("#inputBox1")
const submitForm = document.querySelector("#submitForm")
const grid = document.querySelector("#grid")
const snakeBox = document.querySelector("#snakeBox")
const outputBox = document.querySelector("#outputBox")
const clipboardMessage = document.querySelector("#clipboardMessage")
const errorMessages = document.querySelector('#errorMessages')
const x = document.querySelector("#x-axis")
const y = document.querySelector("#y-axis")
const resetButton = document.querySelector("#resetButton")
const frameBoxes = document.querySelector("#frameBoxes")
const addFrameButton = document.querySelector("#addFrameButton")
let frameCount = 1
let animationSequence = null

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
    const inputBoxes = document.querySelectorAll(".inputBox")

    const setupDisplay = () => {
        let setupString = ""
        inputBoxes.forEach((box, index) => {
         setupString += `\nconst long Frame${index + 1}[] PROGMEM = 
            { 
                ${sanitizeColorArrayIntoHex(box.value, "0x")} 
            };\n`
        })
        return setupString
    }

    const showDisplay = () => {
        let showString = ""
        inputBoxes.forEach((box, index) => {
            showString += `\nFastLED.clear();
            for(int i = 0; i < NUM_LEDS; i++) {
                leds[i] = pgm_read_dword(&(Frame${index + 1}[NUM_LEDS - i - 1]));
            }
            FastLED.show();
            delay(500);\n`
        })
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
    const inputBoxes = document.querySelectorAll(".inputBox")
    const displayCurrentFrame = (inputBoxIndex) => {
        createGrid()
        handleInputErrors()
        const pixels = document.querySelectorAll(".pixel")

        let inputBoxColors = sanitizeColorArrayIntoHex(inputBoxes[inputBoxIndex].value)
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

    displayCurrentFrame(inputBoxCount)
    if (inputBoxCount < inputBoxes.length - 1) {
        inputBoxCount++
    } else {
        inputBoxCount = 0
    }
    animationSequence = setInterval(() => {
        displayCurrentFrame(inputBoxCount)
        if (inputBoxCount < inputBoxes.length - 1) {
            inputBoxCount++
        } else {
            inputBoxCount = 0
        }
    }, 500)
}

const handleInputErrors = () => {
    const inputBoxes = document.querySelectorAll(".inputBox")

    inputBoxes.forEach((inputBox, index) => {
        inputBox = sanitizeColorArrayIntoHex(inputBox.value)
        if (inputBox.length !== x.value * y.value) {
            const lengthError = document.createElement("li")
            lengthError.classList.add("errorMessage")
            lengthError.textContent = `The number of colors in Frame ${index + 1} does not match the number of pixels.`
            errorMessages.appendChild(lengthError)
        }
        if (inputBox.some(color => color === "<Error>")) {
            const invalidcolorError = document.createElement("li")
            invalidcolorError.classList.add("errorMessage")
            invalidcolorError.textContent = `One or more pixels in Frame ${index + 1} have an invalid color.`
            errorMessages.appendChild(invalidcolorError)
        }
    })
}

const addGridColors = (event) => {
    event.preventDefault()

    createGrid()

    let colorInput = sanitizeColorArrayIntoHex(inputBox1.value)
    if (snakeBox.checked) {
        colorInput = snakeColors(colorInput)
    }

    outputArduinoCode()
    colorInPixels()
}

const addFrame = (event) => {
    if(event) {
        event.preventDefault()
    }

    frameCount++

    const newFrameLabel = document.createElement("label")
    newFrameLabel.innerHTML = `<h3 class="frameLabel">Frame ${frameCount}:</h3>`
    frameBoxes.append(newFrameLabel)

    const newFrame = document.createElement("textarea")
    newFrame.classList.add("inputBox")
    newFrame.classList.add("textbox")
    newFrame.setAttribute("id", `inputBox${frameCount}`)
    newFrame.setAttribute("cols", "50")
    newFrame.setAttribute("rows", "20")
    frameBoxes.append(newFrame)
}

const reset = (event) => {
    event.preventDefault()

    clearInterval(animationSequence)
    grid.innerHTML = ""
    outputBox.value = ""
    clipboardMessage.innerText = ""
    errorMessages.innerHTML = ""
    frameCount = 0
    frameBoxes.innerHTML = ""
    addFrame()
    inputBox1 = document.querySelector("#inputBox1")
}

addFrameButton.addEventListener("click", addFrame)
resetButton.addEventListener("click", reset)
submitForm.addEventListener("submit", addGridColors)