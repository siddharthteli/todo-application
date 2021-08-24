//called by edit-task button-
var task_id_to_object_id = new Map();
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
function delete_card(count) {
  confirm("Jab delete hi karna tha tho bananya ku bhai?");
  console.log("Value of Count:=" + count);
  console.log(task_id_to_object_id.get(parseInt(count)));
  delete_todo(count);
}
//called by addtask button.
function display_add_task_form() {
  document.getElementById("edit-form-title").innerHTML = "New Task";
  document.getElementById("edit-form").style.display = "block";
  document.getElementById("blur").style.filter = `blur(${2}px)`;
}

function add_edit_task() {
  if (document.getElementById("edit-form-title").innerHTML == "Edit Task") {
    console.log("First");
    console.log(document.getElementById("value-title-of-todo").value);
    console.log(document.getElementById("value-description-of-todo").value);
  }
  if (document.getElementById("edit-form-title").innerHTML == "New Task") {
    console.log("Second");
    let title = document.getElementById("value-title-of-todo").value;
    let description = document.getElementById(
      "value-description-of-todo"
    ).value;
    console.log(title);
    console.log(description);
    create_new_todo(String(title), String(description));
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
      var count = 0;
      task_id_to_object_id.clear();
      let input = ``;
      data.data.forEach((element) => {
        count++;
        task_id_to_object_id.set(count, element._id.$oid);
        console.log(
          "Value of count:" +
            count +
            "Value of oid:" +
            task_id_to_object_id.get(count)
        );
        var card = `<div class="card-wrapper" id="todo-card-wrapper">
         
        <div class="card-heading" id="todo-card-title">
            <div class="grid-layout-serial">
                <div id="todo-id">${count}.)</div>
                <div> ${element.title} :- </div>
            </div>
        </div>
        <div class="task-list">
            <p id="todo-card-description">${element.description}</p>
        </div>
        <div class="grid-container-button">
            <div class="button-border" onclick="display_edit_form()"><i class="fas fa-edit"></i>
            </div>
            <div class="button-border" id="${count}" onclick="delete_card(this.id)"><i class="fas fa-trash-alt"></i></div>

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
function create_new_todo(title, description) {
  console.log("Inside create_new_todo line 100");
  fetch("http://127.0.0.1:8000/create-one-todo", {
    "Content-Type": "application/json",
    method: "POST",
    body: JSON.stringify({
      title: title,
      description: description,
    }),
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    })

    .then(function (data) {
      console.log("Inside post fetch:----" + data.data.title);
      console.log(data.data.description);
      count++;
      task_id_to_object_id.set(count, element._id.$oid);
      var card = `<div class="card-wrapper" id="todo-card-wrapper">
         
        <div class="card-heading" id="todo-card-title-${count}">
            <div class="grid-layout-serial">
                <div id="todo-id">${count}.)</div>
                <div> ${title} :- </div>
            </div>
        </div>
        <div class="task-list">
            <p id="todo-card-description">${description}</p>
        </div>
        <div class="grid-container-button">
            <div class="button-border" onclick="display_edit_form()"><i class="fas fa-edit"></i>
            </div>
            <div class="button-border" id="${count}" onclick="delete_card(this.id)"><i class="fas fa-trash-alt"></i></div>

        </div>
    </div>`;
      var container = document.createElement("div");
      container.innerHTML = card;
      document.getElementById("grid-card-container").appendChild(container);
    })
    .catch(function (error) {
      console.warn("Something went wrong.", error);
    });
}

function delete_todo(task_id) {
  fetch(
    "http://127.0.0.1:8000/delete-one-todo/" +
      task_id_to_object_id.get(parseInt(task_id)),
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }
  )
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    })
    .then(function (data) {
      console.log("Data value :" + data);
      if (data.Success) {
        console.log("Value of id : task card:-" + task_id);
        let parent = document.getElementById("grid-card-container");
        parent.removeChild(parent.childNodes[parseInt(task_id)]);
        console.log("Child element contents:-" + element);
      }
    })
    .catch(function (error) {
      console.warn("Something went wrong.", error);
    });
}
