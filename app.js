function display_form(){
    document.getElementById("edit-form").style.display="block";

    /*
    Alternative syntax to blur bg.
    document.querySelector('.blur').style.filter=`blur(${2}px)`;
   */
    document.getElementById('blur').style.filter=`blur(${2}px)`;
}

function hide_form(){
    document.getElementById("edit-form").style.display="none";
    document.getElementById('blur').style.filter=`blur(${0}px)`;

}
function delete_card(){
    confirm("Jab delete hi karna tha tho bananya ku bhai?");
}