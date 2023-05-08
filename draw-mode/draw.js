import {sanitizeColorArrayIntoHex} from "../src/sanitizeColorArrayIntoHex";

const drawMode = document.querySelector("#drawMode")
const codeMode = document.querySelector("#codeMode")
const frameLeftButton = document.querySelector("#frameLeft")
const frameRightButton = document.querySelector("#frameRight")
const gridContainer = document.querySelector("#gridContainer")
const colorPicker = document.querySelector("#colorPicker")
const colorPresetForm = document.querySelector("#colorPresetForm")
const submit = document.querySelector("#submit")
const outputBox = document.querySelector("#outputBox")
const snakeBox = document.querySelector("#snakeBox")
const outputType = document.querySelector("#outputType")
const resetButton = document.querySelector("#resetButton")
const x = document.querySelector("#x-axis")
const y = document.querySelector("#y-axis")

let currentMode = "draw"
let pixels = []
let mouseDown = false

let frameBoxes = [
    {
        value: undefined
    },
    {
        value: undefined
    }
]
let currentFrameIndex = 0

const appendCurrentDrawFrame = () => {
    currentMode = "draw"
    gridContainer.innerHTML = ""

    const frameLabel = document.createElement("h2")
    frameLabel.innerText = `Frame ${currentFrameIndex + 1}`
    frameLabel.classList.add("drawFrameLabel")

    const grid = document.createElement("div")
    grid.classList.add("grid")
    grid.classList.add("drawGrid")

    const colorValues = sanitizeColorArrayIntoHex(frameBoxes[currentFrameIndex].value)
    for (let color of colorValues) {
        const pixel = document.createElement("div")
        pixel.style.width = `${550 / x.value - 2}px`
        pixel.style.height = `${550 / y.value - 2}px`
        pixel.style.display = "inline-block"
        pixel.style.backgroundColor = color
        pixel.classList.add("pixel")
        pixel.classList.add("drawPixel")
        grid.append(pixel)
    }

    grid.addEventListener("mousedown", () => {mouseDown = true})
    grid.addEventListener("mousemove", colorInPixelIfMouseDown)
    grid.addEventListener("mousedown", colorInPixel)

    gridContainer.append(frameLabel)
    gridContainer.append(grid)

    pixels = document.querySelectorAll(".pixel")
}

const appendCurrentCodeFrame = () => {
    currentMode = "code"
    gridContainer.innerHTML = ""

    const frameLabel = document.createElement("h2")
    frameLabel.innerText = `Frame ${currentFrameIndex + 1}`
    frameLabel.classList.add("drawFrameLabel")

    const frameCode = document.createElement("textarea")
    frameCode.value = frameBoxes[currentFrameIndex].value
    frameCode.classList.add("frameCodeBox")

    frameCode.addEventListener("input", () => {
        frameBoxes[currentFrameIndex].value = frameCode.value
    })

    gridContainer.append(frameLabel)
    gridContainer.append(frameCode)
}

const colorInPixel = (event) => {
    event.preventDefault()

    if (!event.target.classList.contains("grid")){
        if (colorPresetForm.colorPresets.value === "custom") {
            event.target.style.backgroundColor = colorPicker.value
        } else {
            event.target.style.backgroundColor = colorPresetForm.colorPresets.value
        }
    }

    frameBoxes[currentFrameIndex].value = readGridColors()
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

const convertToHex = (color) => {
    color = color.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (color && color.length === 4) ? 
        ("0" + parseInt(color[1],10).toString(16)).slice(-2) +
        ("0" + parseInt(color[2],10).toString(16)).slice(-2) +
        ("0" + parseInt(color[3],10).toString(16)).slice(-2) : ''
}

const readGridColors = () => {
    let pixelColors = []

    pixels.forEach((pixel, index) => {
        const color = pixel.style.backgroundColor

        if (outputType.value === "hex") {
            pixelColors[index] = `0x${convertToHex(color)}`
        } else {
            pixelColors[index] = `${color}`
        }
    })

    return pixelColors.toString();
}

const outputCode = (event) => {
    event.preventDefault()

    outputBox.innerText = ""

    let colorString = frameBoxes[currentFrameIndex].value
    if (snakeBox.checked) {
        colorString = snakeGrid(sanitizeColorArrayIntoHex(colorString, '0x'), x.value, y.value).toString()
    }

    outputBox.innerText = colorString
    navigator.clipboard.writeText(colorString)
    clipboardMessage.innerText = "Copied to clipboard."
}

const reset = (event) => {
    event.preventDefault()

    x.value = 16
    y.value = 16
    initializeDrawFrames()
    outputBox.innerText = ""
    clipboardMessage.innerText = ""
}

const colorInPixelIfMouseDown = (event) => {
    event.preventDefault()

    if (mouseDown) {
        colorInPixel(event)
    }
}

const switchFrameLeft = (event) => {
    event.preventDefault()

    if (frameBoxes[currentFrameIndex - 1]) {
        currentFrameIndex--

        if (currentMode === "draw") {
            appendCurrentDrawFrame()
        } 
        else if (currentMode === "code") {
            appendCurrentCodeFrame()
        }
    }
}

const switchFrameRight = (event) => {
    event.preventDefault()

    if (frameBoxes[currentFrameIndex + 1]) {
        currentFrameIndex++

        if (currentMode === "draw") {
            appendCurrentDrawFrame()
        } 
        else if (currentMode === "code") {
            appendCurrentCodeFrame()
        }
    }
}

const initializeDrawFrames = () => {
    for (let frame of frameBoxes) {
        frame.value = ""
        
        for (let i = 0; i < (x.value * y.value) - 1; i++) {
            frame.value += "0x000000,"
        }
        frame.value += "0x000000"
    }

    appendCurrentDrawFrame()
}

document.addEventListener("mouseup", () => {mouseDown = false})
drawMode.addEventListener("click", appendCurrentDrawFrame)
codeMode.addEventListener("click", appendCurrentCodeFrame)
frameLeftButton.addEventListener("click", switchFrameLeft)
frameRightButton.addEventListener("click", switchFrameRight)
resetButton.addEventListener("click", reset)
submit.addEventListener("click", outputCode)
x.addEventListener("change", initializeDrawFrames)
y.addEventListener("change", initializeDrawFrames)

window.onload = initializeDrawFrames()