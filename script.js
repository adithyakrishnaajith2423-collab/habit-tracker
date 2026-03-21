let habits = JSON.parse(localStorage.getItem("habits")) || [];

function addHabit() {
  let input = document.getElementById("habitInput");
  let text = input.value.trim();

  if (text === "") return;

  habits.push({ text, done: false });
  input.value = "";

  save();
  display();
}

function display() {
  let list = document.getElementById("habitList");
  list.innerHTML = "";

  // 😴 Show message if empty
  if (habits.length === 0) {
    list.innerHTML = "<p style='opacity:0.6'>No habits yet 😴</p>";
  }

  let completed = 0;

  habits.forEach((h, i) => {
    if (h.done) completed++;

    let li = document.createElement("li");

    li.innerHTML = `
      <span onclick="playSound(); toggle(${i})" class="${h.done ? 'done' : ''}">
        ${h.text}
      </span>
      <button onclick="playSound(); removeHabit(${i})">❌</button>
    `;

    list.appendChild(li);
  });

  // 🔥 Update streak
  document.getElementById("streak").innerText =
    `🔥 Streak: ${completed} habits done`;

  // 📊 Progress bar
  let percent = habits.length === 0 ? 0 : (completed / habits.length) * 100;
  document.getElementById("progress").style.width = percent + "%";
}

function toggle(i) {
  habits[i].done = !habits[i].done;
  save();
  display();
}

function removeHabit(i) {
  habits.splice(i, 1);
  save();
  display();
}

function save() {
  localStorage.setItem("habits", JSON.stringify(habits));
}

// 🔊 Sound
function playSound() {
  document.getElementById("clickSound").play();
}

// Start app
display();