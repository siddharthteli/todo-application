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
      data.data.forEach((element) => {
        console.log(element.description);
        console.log(element.title);
      });
    })
    .catch(function (error) {
      console.warn("Something went wrong.", error);
    });
}
