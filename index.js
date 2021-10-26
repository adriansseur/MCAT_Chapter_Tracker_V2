// Adding number buttons to each subject block

const blockSubjects = document.querySelectorAll(".block-subject")

blockSubjects.forEach(addNumbers)

function addNumbers(item) {
    for (let i = 0; i < 12; i++) {
        const btn = document.createElement("button")
        item.appendChild(btn)
        btn.textContent = i + 1
    }
}

// Connect markers to actions