let habits = JSON.parse(localStorage.getItem("habits")) || [];

const habitInput = document.getElementById("habitInput");
const habitList = document.getElementById("habitList");

function renderHabits() {
    habitList.innerHTML = "";

    habits.forEach((habit, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            ${habit.name} 🔥 ${habit.streak}
        `;

        const doneBtn = document.createElement("button");
        doneBtn.textContent = "✅";
        doneBtn.onclick = () => increaseStreak(index);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.onclick = () => deleteHabit(index);

        li.appendChild(doneBtn);
        li.appendChild(deleteBtn);
        habitList.appendChild(li);
    });
}

function addHabit() {
    const habitName = habitInput.value.trim();
    if (habitName === "") return;

    habits.push({
        name: habitName,
        streak: 0
    });

    localStorage.setItem("habits", JSON.stringify(habits));

    habitInput.value = "";
    renderHabits();
}

function increaseStreak(index) {
    habits[index].streak += 1;
    localStorage.setItem("habits", JSON.stringify(habits));
    renderHabits();
}

function deleteHabit(index) {
    habits.splice(index, 1);
    localStorage.setItem("habits", JSON.stringify(habits));
    renderHabits();
}

renderHabits();