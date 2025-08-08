const input = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask(){
    if(input.value === ''){
        alert("Please enter a task!")
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = input.value;
        listContainer.appendChild(li);
        
        // Contenedor para ambos íconos

        let iconContainer = document.createElement("div");
        iconContainer.classList.add("icon-container");

        // Botón de edición
        let editSpan = document.createElement("span");
        editSpan.classList.add("edit-icon");
        editSpan.innerHTML = `<i class="bi bi-pencil-square"></i>`;
        editSpan.title = "Edit task"; 
        iconContainer.appendChild(editSpan);

        // Botón de eliminación
        let deleteSpan = document.createElement("span");
        deleteSpan.classList.add("delete-icon");
        deleteSpan.innerHTML = `<i class="bi bi-trash3-fill"></i>`;
        deleteSpan.title = "Delete task";
        iconContainer.appendChild(deleteSpan);

        // Añadir contenedor de íconos al li
        li.appendChild(iconContainer);

    }
    input.value = "";
    saveData();
    updateProgress();

}

function updateProgress() {
    const totalTasks = document.querySelectorAll("#list-container li").length;
    const completedTasks = document.querySelectorAll("#list-container li.checked").length;
    const progress = document.getElementById("progress");
    const numbers = document.getElementById("numbers");

    if (totalTasks === 0) {
        progress.style.width = "0%";
        numbers.innerText = "0 / 0";
        return;
    }

    const percentage = (completedTasks / totalTasks) * 100;
    progress.style.width = `${percentage}%`;
    numbers.innerText = `${completedTasks} / ${totalTasks}`;

    if(totalTasks > 0 && completedTasks === totalTasks){
        blaskConfetti();
    }
}


listContainer.addEventListener("click", function(e){
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
        updateProgress();

    } else if (e.target.closest("span.delete-icon")) {
        e.target.closest("li").remove();
        saveData();
        updateProgress();
        
    } else if (e.target.closest("span.edit-icon")) {
        let li = e.target.closest("li");
        let currentText = li.firstChild.textContent.trim();
        let newText = prompt("Edit your task:", currentText);
        if (newText !== null && newText.trim() !== "") {
            li.firstChild.textContent = newText.trim();
            saveData();
        }
    }
});


function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}


function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
    updateProgress();
}

input.addEventListener('keydown', (e) => {
    if(e.key === 'Enter'){
        addTask();
    }
});

document.addEventListener("DOMContentLoaded", showTask);


const blaskConfetti = ()=>{
const count = 200,
    defaults = {
        origin: { y: 0.7 },
    };


function fire(particleRatio, opts) {
    confetti(
        Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * particleRatio),
        })
    );
}


fire(0.25, {
    spread: 26,
    startVelocity: 55,
});


fire(0.2, {
    spread: 60,
});


fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
});


fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
});


fire(0.1, {
    spread: 120,
    startVelocity: 45,
});
}

