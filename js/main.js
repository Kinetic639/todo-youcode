{
  const tasks = [
    {
      content: 'Iść na zakupy',
      done: true
    },
    {
      content: 'skończyc moduł 6',
      done: false
    },
  ]

  const render = () => {
    let htmlString = "";
    for(const task of tasks) {
      htmlString += `
      <li>
      ${task.content}
      </li>
      `
    }
    document.querySelector(".js-tasks").innerHTML = htmlString
  }
  

  const init = () => {
    render()
  }
  init()
}