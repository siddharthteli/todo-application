//Map to store task id to object_id relation.
var task_id_to_object_id = new Map();

//Variable to store index of card to be updated.
var update_index = 0;

/*1.
Main Functions-
*/

//GET fetch request.
function get_todo_list() {
    fetch("http://127.0.0.1:8000/view-all-todo", {
            "Content-type": "application/json",
        })
        .then(function(response) {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response);
        })
        .then(function(data) {
            //Keep track of todo card count.
            var count = 0;
            //Map is cleared every time get fetch is called.
            task_id_to_object_id.clear();
            //Task_id to object id realtion for every document is db.
            data.data.forEach((element) => {
                count++;
                task_id_to_object_id.set(count, element._id.$oid);
                //Helper funtions returns card div.
                let card = get_todo_card(count, element.title, element.description);
                //Appending child card to parenet grid layout.
                append_child(card);
            });
        })
        .catch(function(error) {
            console.warn("Something went wrong.", error);
        });
}

//POST fetch request.
function create_new_todo(title, description) {
    fetch("http://127.0.0.1:8000/create-one-todo", {
            "Content-Type": "application/json",
            method: "POST",
            body: JSON.stringify({
                title: title,
                description: description,
            }),
        })
        .then(function(response) {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response);
        })

    .then(function(data) {
            count++;
            task_id_to_object_id.set(count, element._id.$oid);
            let card = get_todo_card(count, title, description);
            append_child(card);
        })
        .catch(function(error) {
            console.warn("Something went wrong.", error);
        });
}

//DELETE fetch request.
function delete_todo(task_id) {
    fetch(
            "http://127.0.0.1:8000/delete-one-todo/" +
            task_id_to_object_id.get(parseInt(task_id)), {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "DELETE",
            }
        )
        .then(function(response) {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response);
        })
        .then(function(data) {
            if (data.Success) {
                let parent = document.getElementById("grid-card-container");
                while (parent.firstChild) {
                    parent.removeChild(parent.firstChild);
                }

                get_todo_list();
            }
        })
        .catch(function(error) {
            console.warn("Something went wrong.", error);
        });
}
/*2.
UI function-
 */
//called by edit-task button to display edit form-
function display_edit_form(task_id) {
    update_index = parseInt(task_id);
    document.getElementById("edit-form").style.display = "block";
    document.getElementById("blur").style.filter = `blur(${2}px)`;
}

//When close is clicked on edit form.
function hide_edit_form() {
    document.getElementById("edit-form").style.display = "none";
    document.getElementById("blur").style.filter = `blur(${0}px)`;
    document.getElementById("edit-form-title").innerHTML = "Edit Task";
}

//Delete card ,triggered when delete button is clicked on card.
function delete_card(count) {
    confirm("Jab delete hi karna tha tho bananya ku bhai?");
    delete_todo(count);
}
//called by addtask button.
function display_add_task_form() {
    document.getElementById("edit-form-title").innerHTML = "New Task";
    document.getElementById("edit-form").style.display = "block";
    document.getElementById("blur").style.filter = `blur(${2}px)`;
}
/*2.
Helper function-
 */

//append card to grid container
function append_child(card) {
    var container = document.createElement("div");
    container.innerHTML = card;
    document.getElementById("grid-card-container").appendChild(container);
}

//returns card div
function get_todo_card(count, title, description) {
    var card = `<div class="card-wrapper" id="todo-card-wrapper">
         
  <div class="card-heading" id="todo-card-title">
      <div class="grid-layout-serial">
          <div id="todo-id">${count}.</div>
          <div> ${title} :- </div>
      </div>
  </div>
  <div class="task-list">
      <p id="todo-card-description">${description}</p>
  </div>
  <div class="grid-container-button">
      <div class="button-border" id=${count} onclick="display_edit_form(this.id)"><i class="fas fa-edit"></i>
      </div>
      <div class="button-border" id="${count}" onclick="delete_card(this.id)"><i class="fas fa-trash-alt"></i></div>

  </div>
</div>`;
    return card;
}

//Called by edit button & new task button.
function add_edit_task() {
    let edit_form_bool =
        document.getElementById("edit-form-title").innerHTML == "Edit Task";
    let description = document.getElementById("value-description-of-todo").value;
    let title = document.getElementById("value-title-of-todo").value;
    if (edit_form_bool) {
        delete_todo(update_index);
        create_new_todo(title, description);
    }
    let new_form_bool =
        document.getElementById("edit-form-title").innerHTML == "New Task";
    if (new_form_bool) {
        create_new_todo(String(title), String(description));
    }
}

//Bug function -When sending put request by default options request is sent which doesn't accept
//any struct as input causing data gaurd failure.
/*
    function update_todo(title, description, task_id) {
      console.log("Inside update_todo");
      fetch("http://127.0.0.1:8000/update-one-todo", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
          task_id: task_id,
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
          console.log("create-one-todo----->");
          console.log(data.data[0].title);
          console.log(data.data[0].description);
          let parent = document.getElementById("grid-card-container");
          while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
          }

          get_todo_list();
        })
        .catch(function (error) {
          console.warn("Something went wrong.", error);
        });
    }


    */