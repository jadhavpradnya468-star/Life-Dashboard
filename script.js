let data = JSON.parse(localStorage.getItem("lifeData")) || {
    tasks: [],
    habits: [],
    notes: ""
  };
  
  // -------- SECTION SWITCH --------
  function showSection(id) {
    document.querySelectorAll(".section").forEach(sec => sec.classList.add("hidden"));
    document.getElementById(id).classList.remove("hidden");
  }
  
  // -------- SAVE --------
  function save() {
    localStorage.setItem("lifeData", JSON.stringify(data));
  }
  
  // -------- TASKS --------
  function addTask() {
    const text = document.getElementById("taskInput").value;
    if (!text) return;
  
    data.tasks.push({ id: Date.now(), text, done: false });
    document.getElementById("taskInput").value = "";
    renderTasks();
  }
  
  function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";
  
    data.tasks.forEach(t => {
      const li = document.createElement("li");
      li.className = t.done ? "done" : "";
  
      li.innerHTML = `
        ${t.text}
        <div>
          <button onclick="toggleTask(${t.id})">✔</button>
          <button onclick="deleteTask(${t.id})">❌</button>
        </div>
      `;
  
      list.appendChild(li);
    });
  
    save();
  }
  
  function toggleTask(id) {
    let t = data.tasks.find(x => x.id === id);
    t.done = !t.done;
    renderTasks();
  }
  
  function deleteTask(id) {
    data.tasks = data.tasks.filter(t => t.id !== id);
    renderTasks();
  }
  
  // -------- HABITS --------
  function addHabit() {
    const text = document.getElementById("habitInput").value;
    if (!text) return;
  
    data.habits.push({ id: Date.now(), text, streak: 0 });
    document.getElementById("habitInput").value = "";
    renderHabits();
  }
  
  function renderHabits() {
    const list = document.getElementById("habitList");
    list.innerHTML = "";
  
    data.habits.forEach(h => {
      const li = document.createElement("li");
  
      li.innerHTML = `
        ${h.text} 🔥 ${h.streak}
        <button onclick="increaseHabit(${h.id})">+1</button>
      `;
  
      list.appendChild(li);
    });
  
    save();
  }
  
  function increaseHabit(id) {
    let h = data.habits.find(x => x.id === id);
    h.streak++;
    renderHabits();
  }
  
  // -------- NOTES --------
  const noteArea = document.getElementById("noteArea");
  
  noteArea.value = data.notes;
  
  noteArea.addEventListener("input", () => {
    data.notes = noteArea.value;
    save();
  });
  
  // -------- THEME --------
  function toggleTheme() {
    document.body.classList.toggle("dark");
  }
  
  // -------- INIT --------
  renderTasks();
  renderHabits();