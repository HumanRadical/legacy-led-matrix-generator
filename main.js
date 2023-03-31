const inputBox = document.querySelector("#inputBox")
const submitForm = document.querySelector("#submitForm")
const grid = document.querySelector("#grid")
const snakeBox = document.querySelector("#snakeBox")
const outputBox = document.querySelector("#outputBox")
const clipboardMessage = document.querySelector("#clipboardMessage")

const createGrid = (x, y) => {
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
            ${colors.map((color) => color.replace("#", "0x"))}
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

    const x = document.querySelector("#x-axis").value
    const y = document.querySelector("#y-axis").value
    createGrid(x, y)
    const pixels = document.querySelectorAll(".pixel")

    let colorInput = JSON.parse(inputBox.value.replaceAll(/0x([\dA-F]+)/gi, '\"#$1\"'))
    
    outputArduinoCode(colorInput)

    if (snakeBox.checked) {
        colorInput = snakeGrid(colorInput, x, y)
    }

    colorInput.forEach((color, index) => {
        const pixel = pixels[index]
        // if (typeof color === "number") {
        //     color = color.toString(16)
        //     console.log(color)
        // }
        pixel.style.backgroundColor = color
    })

}

submitForm.addEventListener("submit", addGridColors)