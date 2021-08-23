function display_edit_form() {
  document.getElementById("edit-form").style.display = "block";

  /*
    Alternative syntax to blur bg.
    document.querySelector('.blur').style.filter=`blur(${2}px)`;
   */
  document.getElementById("blur").style.filter = `blur(${2}px)`;
}

function hide_edit_form() {
  document.getElementById("edit-form").style.display = "none";
  document.getElementById("blur").style.filter = `blur(${0}px)`;
  document.getElementById("edit-form-title").innerHTML = "Edit Task";
}
function delete_card() {
  confirm("Jab delete hi karna tha tho bananya ku bhai?");
}

function display_add_task_form() {
  document.getElementById("edit-form-title").innerHTML = "New Task";
  document.getElementById("edit-form").style.display = "block";
  document.getElementById("blur").style.filter = `blur(${2}px)`;
}

function add_edit_task() {
  if (document.getElementById("edit-form-title").innerHTML == "Edit Task") {
    console.log("First");
  }
  if (document.getElementById("edit-form-title").innerHTML == "New Task") {
    console.log("Second");
  }
}
function get_todo_list() {
  fetch("http://127.0.0.1:8000/view-all-todo", {
    "Content-type": "application/json",
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    })
    .then(function (data) {
      var count = 1;
      data.data.forEach((element) => {
        const card = `<div class="card-wrapper" id="todo-card-wrapper">
         
        <div class="card-heading" id="todo-card-title">
            <div class="grid-layout-serial">
                <div id="todo-id">${count++}.)</div>
                <div> ${element.title} :- </div>
            </div>
        </div>
        <div class="task-list">
            <p id="todo-card-description">${element.description}</p>
        </div>
        <div class="grid-container-button">
            <div class="button-border" onclick="display_edit_form()"><i class="fas fa-edit"></i>
            </div>
            <div class="button-border" onclick="delete_card()"><i class="fas fa-trash-alt"></i></div>

        </div>
    </div>`;
        var container = document.createElement("div");
        container.innerHTML = card;
        document.getElementById("grid-card-container").appendChild(container);
      });
    })
    .catch(function (error) {
      console.warn("Something went wrong.", error);
    });
}
/*
function delete_todo_card() {
  fetch("http://127.0.0.1:8000/view-all-todo", {
    "Content-type": "application/json",
    method: "DELETE",
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    })
    .then(function (data) {
      data.data.forEach((element) => {
        const card = `<div class="card-wrapper" id="todo-card-wrapper"><div class="card-heading" id="todo-card-title">${element.title}</div><div class="task-list"><p id="todo-card-description">${element.title}</p></div><div class="grid-container-button"><div class="button-border" onclick="display_edit_form()"><i class="fas fa-edit"></i></div><div class="button-border" onclick="delete_card()"><i class="fas fa-trash-alt"></i></div></div></div> `;
        var container = document.createElement("div");
        container.innerHTML = card;
        document.getElementById("grid-card-container").appendChild(container);
      });
    })
    .catch(function (error) {
      console.warn("Something went wrong.", error);
    });
}
*/
