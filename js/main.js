{
  const tasks = [
    {
      content: "Iść na zakupy",
    },
    {
      content: "skończyć moduł 6",
    },
  ];

  const addNewTask = (newTaskContent) => {
    tasks.push({
      content: newTaskContent,
    });

    render();
  };

  const removeTask = (i) => {
    tasks.splice(i, 1);
    render();
  };

  const toggleTaskDone = (i) => {
    tasks[i].done = !tasks[i].done
    render()
  }
  

  const render = () => {
    let htmlString = "";
    for (const task of tasks) {
      htmlString += `
      <button class="js-done">Czy zrobione?</button>
      <li ${task.done ? 'style="text-decoration: line-through"' : ""}>
      ${task.content}
      </li>
      <button class="js-remove">Usuń</button>
      `;
    }
    document.querySelector(".js-tasks").innerHTML = htmlString;

    const removeButtons = document.querySelectorAll(".js-remove");
    removeButtons.forEach((btn, i) => {
      btn.addEventListener("click", () => {
        removeTask(i);
      });
    });

    const doneButtons = document.querySelectorAll(".js-done");
    doneButtons.forEach((btn, i) => {
      btn.addEventListener("click", () => {
        toggleTaskDone(i);
      });
    });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const newTaskContent = document.querySelector(".js-newTask").value.trim();

    if (newTaskContent === "") {
      return;
    }

    addNewTask(newTaskContent);
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);
  };
  init();
}
