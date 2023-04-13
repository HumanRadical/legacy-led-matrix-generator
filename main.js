import { sanitizeColourArrayIntoHex } from "./src/sanitizeColourArrayIntoHex"
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

const snakeGrid = (colorInput) => {
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
    const arduinoCode = 
        `#include <avr/pgmspace.h>  // Needed to store stuff in Flash using PROGMEM
        #include "FastLED.h"       // Fastled library to control the LEDs

        // How many leds are connected?
        #define NUM_LEDS ${x.value * y.value}

        // Define the Data Pin
        #define DATA_PIN 7  // Connected to the data pin of the first LED strip

        // Define the array of leds
        CRGB leds[NUM_LEDS];

        // Create the array of retro arcade characters and store it in Flash memory
        const long Display[] PROGMEM =
        {
            ${sanitizeColourArrayIntoHex(inputBox1.value, "0x")}
        };
        void setup() { 
        FastLED.addLeds<WS2812B, DATA_PIN, GRB>(leds, NUM_LEDS);
        FastLED.clear();
        for(int i = 0; i < NUM_LEDS; i++) {
            leds[i] = pgm_read_dword(&(Display[NUM_LEDS - i - 1]));
        }
        
        FastLED.show();
        }

        void loop() { 

        }`
    navigator.clipboard.writeText(arduinoCode)
    clipboardMessage.innerHTML = "<em>Copied to clipboard.</em>"
    outputBox.value = arduinoCode
}

const addGridColors = (event) => {
    event.preventDefault()

    createGrid()
    const pixels = document.querySelectorAll(".pixel")
    let colorInput = sanitizeColourArrayIntoHex(inputBox1.value)
    
    outputArduinoCode()

    if (snakeBox.checked) {
        colorInput = snakeGrid(colorInput)
    }

    colorInput.forEach((color, index) => {
        const pixel = pixels[index]
        if(color === '<Error>') {
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

    handleInputErrors(colorInput)
}

function handleInputErrors(colorInput) {
    if (colorInput.length !== x.value * y.value) {
        const lengthError = document.createElement("li")
        lengthError.textContent = "The number of colours does not match the number of pixels."
        errorMessages.appendChild(lengthError)
    }
    if (colorInput.some(color => color === '<Error>')) {
        const invalidColourError = document.createElement("li")
        invalidColourError.textContent = 'One or more pixels has an invalid colour.'
        errorMessages.appendChild(invalidColourError)
    }
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
    newFrame.classList.add("textbox")
    newFrame.setAttribute("id", `inputBox${frameCount}`)
    newFrame.setAttribute("cols", "50")
    newFrame.setAttribute("rows", "20")
    frameBoxes.append(newFrame)
}

const reset = (event) => {
    event.preventDefault()

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