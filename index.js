// Adding number buttons to each subject block

const blockSubjects = document.querySelectorAll(".block-subject")

blockSubjects.forEach(function(block) {
    for (let i = 0; i < 12; i++) {
        const btn = document.createElement("button")
        block.appendChild(btn)
        btn.textContent = i + 1
    }
})

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


// Connect markers to actions

const outside = document.getElementById("html")
outside.addEventListener("click", function() {
    console.log("Outside clicked.")
    deactivateTools()
})

const eraser = document.getElementById("eraser")
eraser.addEventListener("click", function(e) {
    console.log("Eraser clicked.")
    deactivateTools()
    eraser.classList.add("active")
    e.stopPropagation() // prevents parent (outside) from being clicked
})

const greenMarker = document.getElementById("green-marker")
greenMarker.addEventListener("click", function(e) {
    console.log("Green marker clicked.")
    deactivateTools()
    greenMarker.classList.add("active")
    e.stopPropagation()  // prevents parent (outside) from being clicked
})

const redMarker = document.getElementById("red-marker")
redMarker.addEventListener("click", function(e) {
    console.log("Red marker clicked.")
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
