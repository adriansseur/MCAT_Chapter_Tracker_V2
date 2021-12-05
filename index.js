
// Preparing local Storage

let bioChapterNums = []
let chemChapterNums = []
let physChapterNums = []
let behChapterNums = []
let orgChapterNums = []
let biochemChapterNums = []
let carsChapterNums = []
const chapterNums = [bioChapterNums, chemChapterNums, physChapterNums, behChapterNums, orgChapterNums, biochemChapterNums, carsChapterNums]
const storageKeys = ["bioChapterNums", "chemChapterNums", "physChapterNums", "behChapterNums", "orgChapterNums", "biochemChapterNums", "carsChapterNums"]

// If localStorage is empty, populate it. Else, leave it alone.
for (let i = 0; i < storageKeys.length; i++) {
    if (localStorage.getItem(storageKeys[i]) === null) {    
        // put things inside localStorage                   
        for (let i = 0; i < chapterNums.length; i++) {
            for (let j = 0; j < 12; j++) {
                chapterNums[i][j] = "b" // b for black
            }
        }
        localStorage.setItem(storageKeys[i], JSON.stringify(chapterNums[i]))
    } 
}


// Detect which tool (eraser, greenMarker, redMarker, or none) is active -------------------------

const outside = document.getElementById("html")
outside.addEventListener("click", function() {
    deactivateTools()
    aliveOrDeadBtns()
    updateToolStyles()
})

const eraser = document.getElementById("eraser")
eraser.addEventListener("click", function(e) {
    deactivateTools()
    eraser.classList.add("active")
    aliveOrDeadBtns()
    updateToolStyles()
    e.stopPropagation() // prevents parent (outside) from being clicked
})

const greenMarker = document.getElementById("green-marker")
greenMarker.addEventListener("click", function(e) {
    deactivateTools()
    greenMarker.classList.add("active")
    aliveOrDeadBtns()
    updateToolStyles()
    e.stopPropagation()  // prevents parent (outside) from being clicked
})

const redMarker = document.getElementById("red-marker")
redMarker.addEventListener("click", function(e) {
    deactivateTools()
    redMarker.classList.add("active")
    aliveOrDeadBtns()
    updateToolStyles()
    e.stopPropagation()  // prevents parent (outside) from being clicked
})

// Removes active class from eraser, greenMarker, and redMarker
function deactivateTools() {
    eraser.classList.remove("active")
    greenMarker.classList.remove("active")
    redMarker.classList.remove("active")
}

// Styles Tool to denote it is active
function styleTool(tool) {
    if (tool.classList.contains("active")) {
        tool.style.border = "5px solid red"
    } else {
        tool.style.border = "1px solid rgb(79, 79, 79)"
    }
}

// Styles all tools according to current active status
function updateToolStyles() {
    styleTool(eraser)
    styleTool(greenMarker)
    styleTool(redMarker)
}
// -----------------------------------------------------------------------------------------------------------

// Number Buttons

const blockSubjects = document.querySelectorAll(".block-subject")
const btnPrefixes = ["bio", "chem", "phys", "beh", "org", "biochem", "cars"]

for (let h = 0; h < 7; h++) {
    for (let i = 0; i < 12; i++) {
        const btn = document.createElement("button")
        
        btn.id = `${btnPrefixes[h]}-btn-${i + 1}`
        blockSubjects[h].appendChild(btn)
        btn.textContent = i + 1
        
        btn.addEventListener("click", function(e) {
            const gottenData = JSON.parse(localStorage.getItem(storageKeys[h]))
            if (greenMarker.classList.contains("active")) {
                gottenData[i] = "g"
            } else if (redMarker.classList.contains("active")) {
                gottenData[i] = "r"
            } else if (eraser.classList.contains("active")) {
                gottenData[i] = "b"
            }
            localStorage.setItem(storageKeys[h], JSON.stringify(gottenData))
            e.stopPropagation()
            renderColors()
        })
    }      
}

// Make buttons come alive if any tool is selected
function aliveOrDeadBtns() {
    if (greenMarker.classList.contains("active")) {
        for (let h = 0; h < 7; h++) {
            for (let i = 0; i < 12; i++) {
                const btn = document.getElementById(`${btnPrefixes[h]}-btn-${i + 1}`)
                btn.style.cursor = `url(pointers/green_pointer.png), auto`
                btn.classList.add("activated")
            }
        }
    } else if (redMarker.classList.contains("active")) {
        for (let h = 0; h < 7; h++) {
            for (let i = 0; i < 12; i++) {
                const btn = document.getElementById(`${btnPrefixes[h]}-btn-${i + 1}`)
                btn.style.cursor = `url(pointers/red_pointer.png), auto`
                btn.classList.add("activated")
            }
        }
    } else if (eraser.classList.contains("active")) {
        for (let h = 0; h < 7; h++) {
            for (let i = 0; i < 12; i++) {
                const btn = document.getElementById(`${btnPrefixes[h]}-btn-${i + 1}`)
                btn.style.cursor = `url(pointers/eraser_pointer.png), auto`
                btn.classList.add("activated")
            }
        }
    } else {
        for (let h = 0; h < 7; h++) {
            for (let i = 0; i < 12; i++) {
                const btn = document.getElementById(`${btnPrefixes[h]}-btn-${i + 1}`)
                btn.style.cursor = "auto"
                btn.classList.remove("activated")
            }
        }
    }
}

// Render data from local Storage
renderColors()

function renderColors() {
    for (let h = 0; h < 7; h++) {
        for (let i = 0; i < 12; i++) {
            const gottenData = JSON.parse(localStorage.getItem(storageKeys[h]))
            const btn = document.getElementById(`${btnPrefixes[h]}-btn-${i + 1}`)
            if (gottenData[i] === "g") {
                btn.style.color = "green"
                btn.style.fontWeight = "700"
            } else if (gottenData[i] === "r") {
                btn.style.color = "red"
                btn.style.fontWeight = "700"
            } else if (gottenData[i] === "b"){
                btn.style.color = "black"
                btn.style.fontWeight = "300"
            }
        }
    }
}
