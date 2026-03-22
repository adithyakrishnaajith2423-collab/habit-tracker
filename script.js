let habits = JSON.parse(localStorage.getItem("habits")) || [];

const habitInput = document.getElementById("habitInput");
const habitList = document.getElementById("habitList");

function renderHabits() {
    habitList.innerHTML = "";

    habits.forEach((habit, index) => {
        const li = document.createElement("li");
        li.textContent = habit;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.onclick = () => deleteHabit(index);

        li.appendChild(deleteBtn);
        habitList.appendChild(li);
    });
}

function addHabit() {
    const habit = habitInput.value.trim();
    if (habit === "") return;

    habits.push(habit);
    localStorage.setItem("habits", JSON.stringify(habits));

    habitInput.value = "";
    renderHabits();
}

function deleteHabit(index) {
    habits.splice(index, 1);
    localStorage.setItem("habits", JSON.stringify(habits));
    renderHabits();
}

renderHabits();