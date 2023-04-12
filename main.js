import { sanitizeColourArrayIntoHex } from "./src/sanitizeColourArrayIntoHex"
import errorIconImg from "./img/error_icon.svg"

const inputBox1 = document.querySelector("#inputBox1")
const submitForm = document.querySelector("#submitForm")
const grid = document.querySelector("#grid")
const snakeBox = document.querySelector("#snakeBox")
const outputBox = document.querySelector("#outputBox")
const clipboardMessage = document.querySelector("#clipboardMessage")
const errorMessage = document.querySelector('#errorMessage')
const x = document.querySelector("#x-axis")
const y = document.querySelector("#y-axis")
const resetButton = document.querySelector("#resetButton")
const frameBoxes = document.querySelector("#frameBoxes")
const addFrameButton = document.querySelector("#addFrameButton")
let frameCount = 1

const createGrid = (x, y) => {
    errorMessage.innerHTML = ""
    grid.innerHTML = ""

    for (let i = 0; i < x * y; i++) {
        const pixel = document.createElement("div")
        pixel.style.width = `${500 / x}px`
        pixel.style.height = `${500 / y}px`
        pixel.style.display = "inline-block"
        pixel.classList.add("pixel")
        grid.append(pixel)
    }
}

const snakeGrid = (arr, x, y) => {
    const newArray = []

    for(let i = 0; i < y; i++) {
        const row = []
        for(let j = 0; j < x; j++) {
            row.push(arr[x * i + j])
        }
        if(i % 2 === 1) {
            row.reverse()
        }
        newArray.push(row)
    }

    const finalArray = [].concat(...newArray) 
    return finalArray
}

const outputArduinoCode = (colors) => {
    const arduinoCode = 
        `#include <avr/pgmspace.h>  // Needed to store stuff in Flash using PROGMEM
        #include "FastLED.h"       // Fastled library to control the LEDs

        // How many leds are connected?
        #define NUM_LEDS 256

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

    createGrid(x.value, y.value)
    const pixels = document.querySelectorAll(".pixel")
    let colorInput = sanitizeColourArrayIntoHex(inputBox1.value)
    
    outputArduinoCode()

    if (snakeBox.checked) {
        colorInput = snakeGrid(colorInput, x.value, y.value)
    }

    colorInput.forEach((color, index) => {
        const pixel = pixels[index]
        if(color === '<Error>') {
            const errorIcon = document.createElement("img")
            errorIcon.classList.add("errorIcon")
            errorIcon.src = errorIconImg
            pixel.appendChild(errorIcon)

            return;
        }

        pixel.style.backgroundColor = color
    })

    handleInputErrors(colorInput, x.value, y.value)
}

function handleInputErrors(colorInput, x, y) {
    if (colorInput.length !== x * y) {
        const newError = document.createElement("li")
        newError.textContent = "The number of colours does not match the number of pixels."
        errorMessage.appendChild(newError)
    }
    if (colorInput.some(color => color === '<Error>')) {
        const newError = document.createElement("li")
        newError.textContent = 'One or more pixels has an invalid colour.'
        errorMessage.appendChild(newError)
    }
}

const addFrame = (event) => {
    event.preventDefault()

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
}

addFrameButton.addEventListener("click", addFrame)
resetButton.addEventListener("click", reset)
submitForm.addEventListener("submit", addGridColors)