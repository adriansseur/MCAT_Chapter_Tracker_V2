
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
    console.log("Outside clicked.")  // remove ---------------------------------------
    deactivateTools()
})

const eraser = document.getElementById("eraser")
eraser.addEventListener("click", function(e) {
    console.log("Eraser clicked.")  // remove ---------------------------------------
    deactivateTools()
    eraser.classList.add("active")
    e.stopPropagation() // prevents parent (outside) from being clicked
})

const greenMarker = document.getElementById("green-marker")
greenMarker.addEventListener("click", function(e) {
    console.log("Green marker clicked.")  // remove ---------------------------------------
    deactivateTools()
    greenMarker.classList.add("active")
    e.stopPropagation()  // prevents parent (outside) from being clicked
})

const redMarker = document.getElementById("red-marker")
redMarker.addEventListener("click", function(e) {
    console.log("Red marker clicked.")  // remove ---------------------------------------
    deactivateTools()
    redMarker.classList.add("active")
    e.stopPropagation()  // prevents parent (outside) from being clicked
})

// Removes active class from eraser, greenMarker, and redMarker
function deactivateTools() {
    eraser.classList.remove("active")
    greenMarker.classList.remove("active")
    redMarker.classList.remove("active")
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
            if (greenMarker.classList.contains("active")) {
                const gottenData = JSON.parse(localStorage.getItem(storageKeys[h]))
                gottenData[i] = "g"
                localStorage.setItem(storageKeys[h], JSON.stringify(gottenData))
                e.stopPropagation()
                renderColors()
            }
        })

        btn.addEventListener("click", function(e) {
            if (redMarker.classList.contains("active")) {
                const gottenData = JSON.parse(localStorage.getItem(storageKeys[h]))
                gottenData[i] = "r"
                localStorage.setItem(storageKeys[h], JSON.stringify(gottenData))
                e.stopPropagation()
                renderColors()
            }
        })

        btn.addEventListener("click", function(e) {
            if (eraser.classList.contains("active")) {
                const gottenData = JSON.parse(localStorage.getItem(storageKeys[h]))
                gottenData[i] = "b"
                localStorage.setItem(storageKeys[h], JSON.stringify(gottenData))
                e.stopPropagation()
                renderColors()
            }
        })
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

