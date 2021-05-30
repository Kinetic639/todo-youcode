{
  let tasks = [];
  let hideTasksDone = false;

  const toggleHideTasksDone = () => {
    hideTasksDone = !hideTasksDone;
    render();
  };

  const clearInputAndFocus = () => {
    const inputEl = document.querySelector(".js-newTask");
    inputEl.value = "";
    inputEl.focus();
  };

  const addNewTask = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent }];
    clearInputAndFocus();
    render();
  };
  const setAllTasksDone = () => {
    tasks = tasks.map((task) => ({
      ...task,
      done: true,
    }));

    render();
  };

  const removeTask = (i) => {
    tasks = [...tasks.slice(0, i), ...tasks.slice(i + 1)];
    render();
  };

  const toggleTaskDone = (i) => {
    tasks = [
      ...tasks.slice(0, i),
      { ...tasks[i], done: !tasks[i].done },
      ...tasks.slice(i + 1),
    ];

    render();
  };
  const bindEvents = () => {
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

  const renderTasks = () => {
    const taskToHtml = (task) => `
    <li class="js-tasks__item ${
      task.done && hideTasksDone ? " js-tasks__item--hidden" : ""
    }  ">
     <button class="tasks__button tasks__button--done js-done">${
       task.done ? `<i class="fas fa-check"></i>` : ""
     }</button>
      <p class="task-content ${task.done ? "task-content--done" : ""}">${
      task.content
    }</p>
     <button class="tasks__button tasks__button--remove js-remove"><i class="far fa-trash-alt"></i></button>
    </li>
    `;
    document.querySelector(".js-tasks").innerHTML = tasks
      .map(taskToHtml)
      .join("");
  };

  const bindButtonsEvents = () => {
    const setAllDoneButton = document.querySelector(
      ".display-options__button--set-all-done"
    );
    const hideDoneButton = document.querySelector(
      ".display-options__button--hide-done"
    );
    setAllDoneButton.addEventListener("click", setAllTasksDone);
    hideDoneButton.addEventListener("click", toggleHideTasksDone);
  };
  const renderButtons = () => {
    const buttonsContainer = document.querySelector(".section-options");
    if (!tasks.length) {
      buttonsContainer.innerHTML = "";
    } else {
      buttonsContainer.innerHTML = `
<button class="section-options__button display-options__button--hide-done">${
        hideTasksDone ? "Pokaż" : "Ukryj"
      } ukończone</button>
<button class="section-options__button display-options__button--set-all-done" ${
        tasks.every(({ done }) => done) ? " disabled" : ""
      }>Ukończ wszystkie</button>
`;
      bindButtonsEvents();
    }
  };

  const render = () => {
    renderTasks();
    renderButtons();
    bindEvents();
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
    clearInputAndFocus();
    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);
  };
  init();
}
