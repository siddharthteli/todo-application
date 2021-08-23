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
//1st try-

function get_todo_list() {
  const card =
    '<div class="card-wrapper" id="todo-card-wrapper"><div class="card-heading" id="todo-card-title">Wake me :-</div><div class="task-list"><p id="todo-card-description">Wake me up at 5o clock on monday.For walking</p></div><div class="grid-container-button"><div class="button-border" onclick="display_edit_form()"><i class="fas fa-edit"></i></div><div class="button-border" onclick="delete_card()"><i class="fas fa-trash-alt"></i></div></div></div>';

  for (let i = 0; i < 10; i++) {
    var container = document.createElement("div");
    container.innerHTML = card;
    document.getElementById("grid-card-container").appendChild(container);
  }
}

/*
function get_todo_list() {
  let card = document.createElement("div");
  card.classList = "card-wrapper";
  element1 = "<h1>asfas</h1>";
  document.getElementById("grid-card-container")[0].appendChild(card);
}
*/

function get_todo_list1() {
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
      data.data.forEach((element) => {
        const card = document.createElement("div");
        card.classList.add("card-wrapper");
        document.getElementById("grid-card-container").appendChild(card);

        //let card = document.querySelector("#todo-card-wrapper");
        /*
        let card = document.getElementById("todo-card-wrapper");
        console.log(card.childNodes);
        document.getElementById("grid-card-container").appendChild(card);

        // document
        // .getElementById("grid-card-container")
        console.log(element.description);
        console.log(element.title);
        */
      });
    })
    .catch(function (error) {
      console.warn("Something went wrong.", error);
    });
}
