const grid = document.querySelector("#grid")
const colorPicker = document.querySelector("#colorPicker")
const colorPresetForm = document.querySelector("#colorPresetForm")

createDrawGrid = (x, y) => {
    grid.innerHTML = ""

    for (let i = 0; i < x * y; i++) {
        const pixel = document.createElement("div")
        pixel.style.width = `${600 / x - 2}px`
        pixel.style.height = `${600 / y - 2}px`
        pixel.style.display = "inline-block"
        pixel.style.backgroundColor = "black"
        pixel.classList.add("pixel")
        pixel.classList.add("drawPixel")
        grid.append(pixel)
    }
}

createDrawGrid(16, 16)
const pixels = document.querySelectorAll(".pixel")

colorInPixel = (event) => {
    event.preventDefault()

    if (event.target.id !== "grid"){
        if (colorPresetForm.colorPresets.value === "custom") {
            event.target.style.backgroundColor = colorPicker.value
        } else {
            event.target.style.backgroundColor = colorPresetForm.colorPresets.value
        }
    }
}

erasePixel = (event) => {
    event.preventDefault()

    event.target.style.backgroundColor = "white"
}

grid.addEventListener("click", colorInPixel)